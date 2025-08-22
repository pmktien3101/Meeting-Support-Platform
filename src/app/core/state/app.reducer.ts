import { createReducer, on } from '@ngrx/store';
import {
  APP_FEATURE_KEY,
  initializeApp,
  initializeAppSuccess,
  initializeAppFailure,
  loadAppConfigSuccess,
  loadAppConfigFailure,
  setTheme,
  setLanguage,
  toggleSidebar,
  setSidebarOpen
} from './app.actions';

export interface AppState {
  isInitialized: boolean;
  isInitializing: boolean;
  config: any | null;
  theme: 'light' | 'dark' | 'auto';
  language: string;
  sidebar: { isOpen: boolean };
  globalError: string | null;
}

export const initialState: AppState = {
  isInitialized: false,
  isInitializing: false,
  config: null,
  theme: 'auto',
  language: 'en',
  sidebar: { isOpen: true },
  globalError: null
};

export const appReducer = createReducer(
  initialState,
  on(initializeApp, (state) => ({ ...state, isInitializing: true })),
  on(initializeAppSuccess, (state) => ({ ...state, isInitializing: false, isInitialized: true })),
  on(initializeAppFailure, (state, { error }) => ({ ...state, isInitializing: false, globalError: error })),

  on(loadAppConfigSuccess, (state, { config }) => ({ ...state, config })),
  on(loadAppConfigFailure, (state, { error }) => ({ ...state, globalError: error })),

  on(setTheme, (state, { theme }) => ({ ...state, theme })),
  on(setLanguage, (state, { language }) => ({ ...state, language })),
  on(toggleSidebar, (state) => ({ ...state, sidebar: { isOpen: !state.sidebar.isOpen } })),
  on(setSidebarOpen, (state, { isOpen }) => ({ ...state, sidebar: { isOpen } }))
);

export const featureKey = APP_FEATURE_KEY;
