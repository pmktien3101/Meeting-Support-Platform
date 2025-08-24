import { Routes } from '@angular/router';

export const MEETING_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/meeting-list/meeting-list').then(m => m.MeetingList)
  },
  {
    path: 'schedule',
    loadComponent: () => import('./pages/meeting-schedule/meeting-schedule').then(m => m.MeetingSchedule)
  },
  {
    path: 'join/:id',
    loadComponent: () => import('./pages/meeting-join/meeting-join').then(m => m.MeetingJoin)
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/meeting-detail/meeting-detail').then(m => m.MeetingDetail)
  },
  {
    path: ':id/transcript',
    loadComponent: () => import('./pages/meeting-transcript/meeting-transcript').then(m => m.MeetingTranscript)
  },
  {
    path: ':id/summary',
    loadComponent: () => import('./pages/meeting-summary/meeting-summary').then(m => m.MeetingSummary)
  }
];
