# production-line-data-access

`type:data-access` · `scope:production-line` · `@bagging-line/production-line/data-access`

Domain model and local state of the production line feature.

- `Machine`, `MachineState`, `MachineType` – domain model
- `parseMachines` – validates the untyped JSON with type guards (no casts)
- `MachinesStore` – NgRx `signalStore` provided on the feature route:
  loads `machines.json` via `httpResource`, keeps a writable linked copy of
  the machines, the selected machine, derived counts / overall line state and
  a live state simulation
- `PRODUCTION_LINE_CONFIG` – JSON url and simulation interval

`src/assets/machines.json` is served by the application as `data/machines.json`.

May only depend on other `type:data-access` libraries.

Run `nx test production-line-data-access` to execute the unit tests.
