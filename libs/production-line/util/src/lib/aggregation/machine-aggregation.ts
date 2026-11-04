import { MACHINE_STATE_SEVERITY, type Machine, type MachineState } from '../models/machine.model';

/** Number of machines in every state, states without machines count `0`. */
export function countMachineStates(
  machines: readonly Pick<Machine, 'state'>[],
): Record<MachineState, number> {
  return machines.reduce<Record<MachineState, number>>(
    (counts, { state }) => ({ ...counts, [state]: counts[state] + 1 }),
    { running: 0, warning: 0, alarm: 0 },
  );
}

/** Most severe state of all machines – the state of the whole line. */
export function worstMachineState(machines: readonly Pick<Machine, 'state'>[]): MachineState {
  return machines.reduce<MachineState>(
    (worst, { state }) =>
      MACHINE_STATE_SEVERITY[state] > MACHINE_STATE_SEVERITY[worst] ? state : worst,
    'running',
  );
}
