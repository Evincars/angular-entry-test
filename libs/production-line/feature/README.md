# production-line-feature

`type:feature` · `scope:production-line` · `@bagging-line/production-line/feature`

The production line screen: machines shown in the **navigation** (status tabs)
and in the **overview** (flow of status tiles), plus a detail card of the
selected machine.

- `productionLineRoutes` – lazy routes, provides the local `MachinesStore`
- `ProductionLinePage` – container connecting the stores to the UI
- `LineOverview`, `LineSummary`, `MachineDetail` – presentational components
  (inputs / outputs only)
- `machine-view.ts` – maps the domain model to `shared-ui` view models

May depend on `type:data-access`, `type:ui` and `type:util` libraries.

Run `nx test production-line-feature` to execute the unit tests.
