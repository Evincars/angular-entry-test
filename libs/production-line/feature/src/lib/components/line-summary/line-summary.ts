import { Component, input } from '@angular/core';
import { UiIconLabel, type UiStatus } from '@bagging-line/shared/ui';
import type { MachineStateCount } from '../../view-models/machine-view';

/** Overall line state followed by the number of machines in every state. */
@Component({
  selector: 'pl-line-summary',
  imports: [UiIconLabel],
  template: `
    <span class="line-summary__overall" [attr.data-tone]="status().tone">
      Line
      <ui-icon-label [icon]="status().icon">{{ status().label }}</ui-icon-label>
    </span>
    <ul class="line-summary__counts" aria-label="Machines per state">
      @for (item of counts(); track item.status.label) {
        <li [attr.data-tone]="item.status.tone">
          <ui-icon-label [icon]="item.status.icon"
            >{{ item.count }} {{ item.status.label }}</ui-icon-label
          >
        </li>
      }
    </ul>
  `,
  styleUrl: './line-summary.scss',
})
export class LineSummary {
  readonly status = input.required<UiStatus>();
  readonly counts = input.required<readonly MachineStateCount[]>();
}
