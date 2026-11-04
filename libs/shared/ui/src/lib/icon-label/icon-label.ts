import { Component, input } from '@angular/core';
import type { MaterialSymbol } from 'material-symbols';
import { UiIcon } from '../icon/icon';

/**
 * Inline icon followed by projected text, e.g. a clock or a user name.
 * The icon color can be changed via `--ui-icon-label-icon-color`.
 */
@Component({
  selector: 'ui-icon-label',
  imports: [UiIcon],
  template: `
    <ui-icon [name]="icon()" size="sm" />
    <span class="ui-icon-label__text"><ng-content /></span>
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font: var(--mat-sys-label-large);
      white-space: nowrap;
    }

    ui-icon {
      color: var(--ui-icon-label-icon-color, inherit);
    }
  `,
})
export class UiIconLabel {
  readonly icon = input.required<MaterialSymbol>();
}
