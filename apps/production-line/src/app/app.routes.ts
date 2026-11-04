import type { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@bagging-line/production-line/feature-monitoring').then(
        (m) => m.productionLineRoutes,
      ),
  },
  { path: '**', redirectTo: '' },
];
