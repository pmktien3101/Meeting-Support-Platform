import { Routes } from '@angular/router';

export const PM_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.PmDashboard)
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects').then(m => m.PmProjects)
  },
  {
    path: 'milestones',
    loadComponent: () => import('./pages/milestones/milestones.component').then(m => m.PmMilestones)
  },
  {
    path: 'meetings',
    loadComponent: () => import('./pages/meetings/meetings.component').then(m => m.PmMeetings)
  },
  {
    path: 'tasks',
    loadComponent: () => import('./pages/tasks/tasks.component').then(m => m.PmTasks)
  },
  {
    path: 'team',
    loadComponent: () => import('./pages/team/team').then(m => m.Team)
  },
  {
    path: 'documents',
    loadComponent: () => import('./pages/documents/documents.component').then(m => m.PmDocuments)
  },
  {
    path: 'reports',
    loadComponent: () => import('./pages/reports/reports').then(m => m.Reports)
  }
];
