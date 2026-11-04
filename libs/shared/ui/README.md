# shared-ui

`type:ui` · `scope:shared` · `@bagging-line/shared/ui`

Presentational ("dumb") building blocks shared across the whole application.
Components wrap Angular Material so features never import `@angular/material`
directly; all of them only talk through signal inputs and outputs.

| Component           | Wraps                         |
| ------------------- | ----------------------------- |
| `ui-icon`           | `mat-icon` + Material Symbols |
| `ui-icon-label`     | `ui-icon` + text              |
| `ui-toolbar`        | `mat-toolbar`                 |
| `ui-nav-tabs`       | `mat-tab-nav-bar`             |
| `ui-status-tile`    | `mat-card` + `matRipple`      |
| `ui-pipeline`       | flex layout                   |
| `ui-flow-connector` | –                             |
| `ui-card`           | `mat-card`                    |
| `ui-button`         | `matButton`                   |
| `ui-icon-button`    | `matIconButton`               |
| `ui-slide-toggle`   | `mat-slide-toggle`            |
| `ui-progress-bar`   | `mat-progress-bar`            |

Design tokens (`--ui-*` CSS custom properties) live in
`src/styles/_tokens.scss` and are included once by the application.

Run `nx test shared-ui` to execute the unit tests.
