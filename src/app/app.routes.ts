import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // Default redirect
  {
    path: '',
    redirectTo: '/public/landing',
    pathMatch: 'full'
  },

  // Public routes - Using feature routes
  {
    path: 'public',
    loadComponent: () => import('./features/public/layout/public-layout.component').then(m => m.PublicLayoutComponent),
    loadChildren: () => import('./features/public/public.routes').then(m => m.PUBLIC_ROUTES)
  },

  // Auth routes - Using feature routes
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },

  // Admin routes - Using feature routes
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [roleGuard(['admin'])],
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },

  // Project Manager routes - Using feature routes
  {
    path: 'pm',
    loadComponent: () => import('./features/pm/layout/pm-layout.component').then(m => m.PmLayoutComponent),
    canActivate: [roleGuard(['pm', 'admin'])],
    loadChildren: () => import('./features/pm/pm.routes').then(m => m.PM_ROUTES)
  },

  // Business Owner routes - Using feature routes
  {
    path: 'business-owner',
    loadComponent: () => import('./features/business-owner/layout/business-owner-layout.component').then(m => m.BusinessOwnerLayoutComponent),
    canActivate: [roleGuard(['business-owner', 'admin'])],
    loadChildren: () => import('./features/business-owner/business-owner.routes').then(m => m.BUSINESS_OWNER_ROUTES)
  },

  // Member routes - Using feature routes
  {
    path: 'member',
    loadComponent: () => import('./features/member/layout/member-layout.component').then(m => m.MemberLayoutComponent),
    canActivate: [roleGuard(['member', 'pm', 'admin'])],
    loadChildren: () => import('./features/member/member.routes').then(m => m.MEMBER_ROUTES)
  },

  // Project routes - Using feature routes
  {
    path: 'project',
    canActivate: [roleGuard(['pm', 'admin'])],
    loadChildren: () => import('./features/project/project.routes').then(m => m.PROJECT_ROUTES)
  },

  // Meeting routes - Using feature routes
  {
    path: 'meeting',
    canActivate: [roleGuard(['member', 'pm', 'admin'])],
    loadChildren: () => import('./features/meeting/meeting.routes').then(m => m.MEETING_ROUTES)
  },

  // Task routes - Using feature routes
  {
    path: 'task',
    canActivate: [roleGuard(['member', 'pm', 'admin'])],
    loadChildren: () => import('./features/task/task.routes').then(m => m.TASK_ROUTES)
  },

  // Catch all route
  {
    path: '**',
    redirectTo: '/public/landing'
  }
];
