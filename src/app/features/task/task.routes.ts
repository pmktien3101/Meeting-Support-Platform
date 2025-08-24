import { Routes } from '@angular/router';

export const TASK_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/task-list/task-list').then(m => m.TaskList)
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/task-create/task-create').then(m => m.TaskCreate)
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/task-detail/task-detail').then(m => m.TaskDetail)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./pages/task-edit/task-edit').then(m => m.TaskEdit)
  }
];
