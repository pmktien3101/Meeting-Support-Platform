import { Route } from "@angular/router";

export const MEETING_ROUTES: Route[] = [
    {
        path: ':callId',
        loadComponent: () => import('./pages/meeting.component').then(m => m.MeetingComponent)
    }
]