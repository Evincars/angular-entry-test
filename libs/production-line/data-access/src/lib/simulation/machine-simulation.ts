import type { Machine, MachineState } from '../models/machine.model';

/** Relative chance of the state a machine switches to during a simulation step. */
const NEXT_STATE_WEIGHTS: readonly {
  readonly state: MachineState;
  readonly weight: number;
}[] = [
  { state: 'running', weight: 0.6 },
  { state: 'warning', weight: 0.25 },
  { state: 'alarm', weight: 0.15 },
];

export function pickWeightedState(random: number): MachineState {
  let threshold = random;
  for (const { state, weight } of NEXT_STATE_WEIGHTS) {
    if (threshold < weight) {
      return state;
    }
    threshold -= weight;
  }
  return 'running';
}

/**
 * One step of the line simulation: a random machine switches to a random
 * (weighted) state. Returns the same array when nothing changed.
 */
export function simulateStep(
  machines: readonly Machine[],
  random: () => number,
  now: Date,
): readonly Machine[] {
  if (machines.length === 0) {
    return machines;
  }
  const target = machines[Math.floor(random() * machines.length)];
  const nextState = pickWeightedState(random());

  if (!target || target.state === nextState) {
    return machines;
  }
  return machines.map((machine) =>
    machine.id === target.id
      ? { ...machine, state: nextState, stateSince: now }
      : machine,
  );
}
