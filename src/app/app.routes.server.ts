import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pm/projects/:projectId/milestones',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Return some sample project IDs for prerendering
      return [
        { projectId: '1' },
        { projectId: '2' },
        { projectId: '3' }
      ];
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
