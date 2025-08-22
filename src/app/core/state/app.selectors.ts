import { Injectable } from '@angular/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, featureKey } from './app.reducer';

@Injectable({ providedIn: 'root' })
export class AppSelectors {
  readonly selectAppState = createFeatureSelector<AppState>(featureKey);

  // Lifecycle
  readonly selectIsInitialized = createSelector(this.selectAppState, (s) => s.isInitialized);
  readonly selectIsInitializing = createSelector(this.selectAppState, (s) => s.isInitializing);
  readonly selectIsAppReady = createSelector(
    this.selectAppState,
    (s) => s.isInitialized && !s.isInitializing
  );

  // Config
  readonly selectAppConfig = createSelector(this.selectAppState, (s) => s.config);
  readonly selectAppName = createSelector(
    this.selectAppState,
    (s) => s.config?.appName ?? 'Meeting Support Platform'
  );
  readonly selectApiUrl = createSelector(this.selectAppState, (s) => s.config?.apiUrl ?? '');

  // UI
  readonly selectTheme = createSelector(this.selectAppState, (s) => s.theme);
  readonly selectLanguage = createSelector(this.selectAppState, (s) => s.language);
  readonly selectSidebarOpen = createSelector(this.selectAppState, (s) => s.sidebar.isOpen);

  // Errors
  readonly selectGlobalError = createSelector(this.selectAppState, (s) => s.globalError);
}
