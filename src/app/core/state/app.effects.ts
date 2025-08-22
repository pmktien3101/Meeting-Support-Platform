import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import {
  initializeApp,
  initializeAppSuccess,
  initializeAppFailure,
  loadAppConfig,
  loadAppConfigSuccess,
  loadAppConfigFailure
} from './app.actions';
import { CacheService } from '../services/cache.service';
import { SeoService } from '../services/seo.service';

@Injectable({ providedIn: 'root' })
export class AppEffects {
  private readonly actions$ = inject(Actions);
  private readonly cacheService = inject(CacheService);
  private readonly seoService = inject(SeoService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initializeApp),
      switchMap(() => from(this.loadAppConfiguration()).pipe(
        tap((config) => this.initializeSEO(config)),
        map(() => initializeAppSuccess()),
        catchError((err) => of(initializeAppFailure({ error: String(err) })))
      ))
    )
  );

  loadConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAppConfig),
      switchMap(() => from(this.loadAppConfiguration()).pipe(
        map((config) => loadAppConfigSuccess({ config })),
        catchError((err) => of(loadAppConfigFailure({ error: String(err) })))
      ))
    )
  );

  private async loadAppConfiguration() {
    try {
      const cached = this.cacheService.get('app_config');
      if (cached) return cached;
      const config = await this.loadConfigFromSource();
      this.cacheService.set('app_config', config, { ttl: 3600000 });
      return config;
    } catch {
      return this.getDefaultConfig();
    }
  }

  private initializeSEO(config: any) {
    if (config?.seo) this.seoService.setSeoData(config.seo);
  }

  // Helpers
  private async loadConfigFromSource(): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ apiUrl: 'https://api.example.com', appName: 'Meeting Support Platform', version: '1.0.0' });
      }, 100);
    });
  }

  private getDefaultConfig(): any {
    return { apiUrl: '', appName: 'Meeting Support Platform', version: '1.0.0' };
  }
}
