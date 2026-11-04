import { Component, input } from '@angular/core';
import { UiFlowConnector, UiPipeline, UiStatusTile } from '@bagging-line/shared/ui';
import type { MachineView } from '../view-models/machine-view';

/** The machines of the line as a flow of status tiles. */
@Component({
  selector: 'pl-line-overview',
  imports: [UiPipeline, UiStatusTile, UiFlowConnector],
  template: `
    <ui-pipeline role="list" aria-label="Machines of the line">
      @for (machine of machines(); track machine.id) {
        <ui-status-tile
          role="listitem"
          [label]="machine.name"
          [icon]="machine.icon"
          [status]="machine.status"
          [link]="machine.link"
          [selected]="machine.id === selectedId()"
        />
        @if (!$last) {
          <ui-flow-connector [active]="machine.flowing" />
        }
      }
    </ui-pipeline>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      max-width: 880px;
    }
  `,
})
export class LineOverview {
  readonly machines = input.required<readonly MachineView[]>();
  readonly selectedId = input<string | null>(null);
}
