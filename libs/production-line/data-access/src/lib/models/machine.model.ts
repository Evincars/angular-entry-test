export type MachineState = 'running' | 'warning' | 'alarm';

export type MachineType = 'scale' | 'bag-attacher' | 'packer' | 'bag-closer';

export interface Machine {
  readonly id: string;
  readonly name: string;
  readonly type: MachineType;
  readonly state: MachineState;
  /** When the machine entered its current state. */
  readonly stateSince: Date;
  readonly description: string;
}

export const MACHINE_STATES: readonly MachineState[] = ['running', 'warning', 'alarm'];

export const MACHINE_TYPES: readonly MachineType[] = [
  'scale',
  'bag-attacher',
  'packer',
  'bag-closer',
];

/** Higher means more severe; used to derive the overall line state. */
export const MACHINE_STATE_SEVERITY = {
  running: 0,
  warning: 1,
  alarm: 2,
} satisfies Record<MachineState, number>;
