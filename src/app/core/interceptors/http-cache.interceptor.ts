import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from '../services/cache.service';

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {
  private cacheService = inject(CacheService);
  private readonly ttl = 5 * 60 * 1000; // 5 minutes

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only cache GET requests
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const key = this.generateCacheKey(request);
    const cachedResponse = this.cacheService.get(key);

    if (cachedResponse) {
      return of(new HttpResponse({ body: cachedResponse, status: 200 }));
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cacheService.set(key, event.body, { ttl: this.ttl });
        }
      })
    );
  }

  private generateCacheKey(request: HttpRequest<any>): string {
    let key = `${request.method}:${request.url}`;
    if (request.params.keys().length) {
      const params = request.params.keys()
        .sort()
        .map(k => `${k}=${request.params.get(k)}`)
        .join('&');
      key += `?${params}`;
    }
    return key;
  }
}
