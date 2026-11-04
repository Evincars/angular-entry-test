import { Component, computed, input, output } from '@angular/core';
import type { MachineState } from '@bagging-line/production-line/data-access';
import { UiButton, UiCard, UiIconButton, UiIconLabel } from '@bagging-line/shared/ui';
import { formatDuration, formatTime } from '@bagging-line/shared/util';
import { MACHINE_STATE_OPTIONS, type MachineView } from '../../view-models/machine-view';

/** Details of the selected machine with manual state switches. */
@Component({
  selector: 'pl-machine-detail',
  imports: [UiCard, UiButton, UiIconButton, UiIconLabel],
  templateUrl: './machine-detail.html',
  styleUrl: './machine-detail.scss',
})
export class MachineDetail {
  readonly machine = input.required<MachineView>();
  /** Current time, drives the "in state since" label. */
  readonly now = input.required<Date>();

  readonly stateChange = output<MachineState>();
  readonly closed = output();

  protected readonly stateOptions = MACHINE_STATE_OPTIONS;

  protected readonly since = computed(() => {
    const since = this.machine().stateSince;
    const duration = formatDuration(this.now().getTime() - since.getTime());
    return `${formatTime(since)} (${duration})`;
  });
}
