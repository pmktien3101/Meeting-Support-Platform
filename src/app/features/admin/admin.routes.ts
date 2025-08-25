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
    path: 'business',
    loadComponent: () => import('./pages/business/business').then(m => m.BusinessManagement)
  },
  {
    path: 'system',
    loadComponent: () => import('./pages/system/system').then(m => m.SystemManagement)
  },
  {
    path: 'revenue',
    loadComponent: () => import('./pages/revenue/revenue').then(m => m.AdminRevenue)
  },
];
