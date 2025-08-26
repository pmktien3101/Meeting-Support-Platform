import { Routes } from '@angular/router';

export const BUSINESS_OWNER_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.BusinessOwnerDashboard)
  },
  {
    path: 'analytics',
    loadComponent: () => import('./pages/analytics/analytics').then(m => m.BusinessOwnerAnalytics)
  },
  {
    path: 'reports',
    loadComponent: () => import('./pages/reports/reports').then(m => m.BusinessOwnerReports)
  },
  {
    path: 'team',
    loadComponent: () => import('./pages/team/team').then(m => m.BusinessOwnerTeam)
  },
  {
    path: 'organization',
    loadComponent: () => import('./pages/organization/organization').then(m => m.BusinessOwnerOrganization)
  }
];
