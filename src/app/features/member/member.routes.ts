import { Routes } from '@angular/router';

export const MEMBER_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.MemberDashboardComponent)
  },
  {
    path: 'meetings',
    loadComponent: () => import('./pages/meetings/meetings.component').then(m => m.MemberMeetingsComponent)
  },
  {
    path: 'tasks',
    loadComponent: () => import('./pages/tasks/tasks.component').then(m => m.MemberTasksComponent)
  },
  {
    path: 'meeting-history',
    loadComponent: () => import('./pages/meeting-history/meeting-history.component').then(m => m.MemberMeetingHistoryComponent)
  },
  {
    path: 'project-progress',
    loadComponent: () => import('./pages/project-progress/project-progress.component').then(m => m.MemberProjectProgressComponent)
  },
  {
    path: 'communication',
    loadComponent: () => import('./pages/communication/communication.component').then(m => m.MemberCommunicationComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile').then(m => m.MemberProfileComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.component').then(m => m.MemberSettingsComponent)
  },
  {
    path: 'change-password',
    loadComponent: () => import('./pages/change-password/change-password.component').then(m => m.MemberChangePasswordComponent)
  }
];
