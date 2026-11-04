import { Component, input } from '@angular/core';

/** Line between two `ui-pipeline` items; `active` marks a flowing connection. */
@Component({
  selector: 'ui-flow-connector',
  template: '',
  styles: `
    :host {
      flex: 1 1 24px;
      min-width: 24px;
      height: 4px;
      background: var(--ui-flow-idle);
      transition: background-color 300ms ease;
    }

    :host(.ui-flow-connector--active) {
      background: var(--ui-flow-active);
    }

    @media (max-width: 720px) {
      :host {
        flex: none;
        min-width: 0;
        width: 4px;
        height: 32px;
      }
    }
  `,
  host: {
    role: 'presentation',
    '[class.ui-flow-connector--active]': 'active()',
  },
})
export class UiFlowConnector {
  readonly active = input(true);
}
