import {
  MACHINE_STATES,
  type Machine,
  type MachineState,
  type MachineType,
} from '@bagging-line/production-line/data-access';
import type { MaterialSymbol, UiLink, UiNavItem, UiStatus } from '@bagging-line/shared/ui';
import { createLookup } from '@bagging-line/shared/util';

/** Everything the presentational components need to render one machine. */
export interface MachineView {
  readonly id: string;
  readonly name: string;
  readonly typeLabel: string;
  readonly icon: MaterialSymbol;
  readonly state: MachineState;
  readonly status: UiStatus;
  readonly stateSince: Date;
  readonly description: string;
  readonly link: UiLink;
  /** Product keeps flowing to the next machine unless this one is in alarm. */
  readonly flowing: boolean;
}

export interface MachineStateOption {
  readonly state: MachineState;
  readonly status: UiStatus;
}

export interface MachineStateCount {
  readonly status: UiStatus;
  readonly count: number;
}

export const machineStatus = createLookup<MachineState, UiStatus>({
  running: {
    tone: 'success',
    icon: 'settings_backup_restore',
    label: 'Running',
  },
  warning: { tone: 'warning', icon: 'warning', label: 'Warning' },
  alarm: { tone: 'danger', icon: 'error', label: 'Alarm' },
});

const machineTypeIcon = createLookup<MachineType, MaterialSymbol>({
  scale: 'move_to_inbox',
  'bag-attacher': 'chrome_reader_mode',
  packer: 'call_to_action',
  'bag-closer': 'grid_on',
});

const machineTypeLabel = createLookup<MachineType, string>({
  scale: 'Scale',
  'bag-attacher': 'Bag attacher',
  packer: 'Packer',
  'bag-closer': 'Bag closer',
});

export const MACHINE_STATE_OPTIONS: readonly MachineStateOption[] = MACHINE_STATES.map((state) => ({
  state,
  status: machineStatus(state),
}));

export function toMachineView(machine: Machine, link: UiLink): MachineView {
  return {
    id: machine.id,
    name: machine.name,
    typeLabel: machineTypeLabel(machine.type),
    icon: machineTypeIcon(machine.type),
    state: machine.state,
    status: machineStatus(machine.state),
    stateSince: machine.stateSince,
    description: machine.description,
    link,
    flowing: machine.state !== 'alarm',
  };
}

export function toNavItem({ id, name, link, status }: MachineView): UiNavItem {
  return { id, label: name, link, status };
}

export function toStateCounts(counts: Readonly<Record<MachineState, number>>): MachineStateCount[] {
  return MACHINE_STATES.map((state) => ({
    status: machineStatus(state),
    count: counts[state],
  }));
}
