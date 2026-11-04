import { Component, input } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';

/** Indeterminate progress indicator, e.g. while data is loading. */
@Component({
  selector: 'ui-progress-bar',
  imports: [MatProgressBar],
  template: `<mat-progress-bar
    mode="indeterminate"
    [attr.aria-label]="label()"
  />`,
  styles: `
    :host {
      display: block;
      --mat-progress-bar-active-indicator-color: var(--ui-brand);
    }
  `,
})
export class UiProgressBar {
  readonly label = input('Loading');
}
