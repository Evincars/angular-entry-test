import { Component } from '@angular/core';

/**
 * Lays out projected items as a horizontal flow that wraps into a vertical
 * one on narrow screens. Use `ui-flow-connector` between the items.
 */
@Component({
  selector: 'ui-pipeline',
  template: `<ng-content />`,
  styles: `
    :host {
      display: flex;
      align-items: center;
      width: 100%;
    }

    @media (max-width: 720px) {
      :host {
        flex-direction: column;
      }
    }
  `,
})
export class UiPipeline {}
