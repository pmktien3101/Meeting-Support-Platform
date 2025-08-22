import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private router = inject(Router);

  private isRefreshing = false; // flag to prevent multiple refresh calls
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip authentication for public endpoints
    if (this.shouldSkipAuth(request.url)) {
      return next.handle(request);
    }

    // Attach access token to the request if available
    request = this.addAuthToken(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle Unauthorized error (possibly expired token)
          return this.handle401(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  /** Define endpoints that should not include the access token */
  private shouldSkipAuth(url: string): boolean {
    const skipUrls = ['/auth/login', '/auth/register', '/auth/refresh'];
    return skipUrls.some(u => url.includes(u));
  }

  /** Clone request with Authorization header if token exists */
  private addAuthToken(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.authService.getAccessToken();
    return token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;
  }

  /** Handle 401 Unauthorized by trying to refresh the token */
  private handle401(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isRefreshing) {
      // Wait until the refreshTokenSubject emits a new token
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(() => next.handle(this.addAuthToken(req)))
      );
    }

    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);

    return this.authService.refreshToken().pipe(
      switchMap(tokens => {
        // Save new tokens and retry original request
        this.isRefreshing = false;
        this.authService.setTokens(tokens); // update tokens in AuthService
        this.refreshTokenSubject.next(tokens.accessToken);
        return next.handle(this.addAuthToken(req));
      }),
      catchError(err => {
        // Refresh token failed → logout and redirect to login
        this.isRefreshing = false;
        this.authService.logout();
        this.router.navigate(['/login']);
        return throwError(() => err);
      })
    );
  }
}
