import { createAction, props } from '@ngrx/store';

export const APP_FEATURE_KEY = 'app';

// Lifecycle
export const initializeApp = createAction('[App] Initialize');
export const initializeAppSuccess = createAction('[App] Initialize Success');
export const initializeAppFailure = createAction('[App] Initialize Failure', props<{ error: string }>());

// Config
export const loadAppConfig = createAction('[App] Load Config');
export const loadAppConfigSuccess = createAction('[App] Load Config Success', props<{ config: any }>());
export const loadAppConfigFailure = createAction('[App] Load Config Failure', props<{ error: string }>());

// Theme & language
export const setTheme = createAction('[App] Set Theme', props<{ theme: 'light' | 'dark' | 'auto' }>());
export const setLanguage = createAction('[App] Set Language', props<{ language: string }>());

// Sidebar
export const toggleSidebar = createAction('[App] Toggle Sidebar');
export const setSidebarOpen = createAction('[App] Set Sidebar Open', props<{ isOpen: boolean }>());
