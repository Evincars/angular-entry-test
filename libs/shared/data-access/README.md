# shared-data-access

`type:data-access` · `scope:shared` · `@bagging-line/shared/data-access`

Global state shared by the whole application, implemented as NgRx
`signalStore`s provided in `root`:

- `AppStore` – ticking wall clock and the signed-in user.

May only depend on other `type:data-access` libraries.

Run `nx test shared-data-access` to execute the unit tests.
