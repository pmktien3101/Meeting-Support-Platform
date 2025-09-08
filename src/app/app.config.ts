import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { appReducer } from './core/state/app.reducer';
import { APP_FEATURE_KEY } from './core/state/app.actions';
import { AppEffects } from './core/state/app.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true
    }),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),

    provideStore({ [APP_FEATURE_KEY]: appReducer }),
    provideEffects([AppEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
    
  ]
};
