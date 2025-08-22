import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { User } from '../../shared/models/user.model';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = inject(ApiService);
  private router = inject(Router);

  /** Login and store tokens + user */
  login(credentials: { email: string; password: string }): Observable<User> {
    return this.api.post<{ user: User; tokens: AuthTokens }>('/auth/login', credentials).pipe(
      tap(res => {
        if (res.success) {
          this.setTokens(res.data.tokens);
          this.setCurrentUser(res.data.user);
        }
      }),
      map(res => res.data.user)
    );
  }

  /** Logout user and clear storage */
  logout(): void {
    this.clearAuth();
    this.router.navigate(['/login']);
  }

  /** Refresh access token */
  refreshToken(): Observable<AuthTokens> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return throwError(() => new Error('No refresh token'));

    return this.api.post<AuthTokens>('/auth/refresh', { refreshToken }).pipe(
      tap(res => {
        if (res.success) this.setTokens(res.data);
      }),
      map(res => res.data),
      catchError(err => {
        this.clearAuth();
        this.router.navigate(['/login']);
        return throwError(() => err);
      })
    );
  }

  /** Getters */
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }
  public isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  public setTokens(tokens: AuthTokens): void {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('tokenExpiresAt', (Date.now() + tokens.expiresIn * 1000).toString());
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private clearAuth(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiresAt');
    localStorage.removeItem('currentUser');
  }
}
