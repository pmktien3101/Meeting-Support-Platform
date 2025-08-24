import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.AdminDashboard)
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users').then(m => m.Users)
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects').then(m => m.AdminProjects)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings').then(m => m.Settings)
  }
];
