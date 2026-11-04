import type { Route } from '@angular/router';
import { MachinesStore } from '@bagging-line/production-line/data-access';
import { ProductionLinePage } from './production-line-page/production-line-page';

export const productionLineRoutes: Route[] = [
  {
    path: '',
    // Local feature state, shared by both child routes and kept while navigating between them.
    providers: [MachinesStore],
    children: [
      { path: '', component: ProductionLinePage, title: 'Line overview' },
      {
        path: 'machines/:machineId',
        component: ProductionLinePage,
        title: 'Machine detail',
      },
    ],
  },
];
