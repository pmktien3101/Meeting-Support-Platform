import { Route } from "@angular/router";

export const MEETING_ROUTES: Route[] = [
    {
        path: ':id',
        loadComponent: () => import('./pages/meeting.component').then(m => m.MeetingRoomComponent)
    }
]