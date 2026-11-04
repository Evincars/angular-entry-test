import type { MachineState } from '../models/machine.model';
import { countMachineStates, worstMachineState } from './machine-aggregation';

describe('machine aggregation', () => {
  const machines = (...states: MachineState[]) => states.map((state) => ({ state }));

  it('counts the machines per state', () => {
    expect(countMachineStates(machines('running', 'alarm', 'running', 'warning'))).toEqual({
      running: 2,
      warning: 1,
      alarm: 1,
    });
    expect(countMachineStates([])).toEqual({ running: 0, warning: 0, alarm: 0 });
  });

  it.each<[MachineState[], MachineState]>([
    [[], 'running'],
    [['running', 'running'], 'running'],
    [['running', 'warning'], 'warning'],
    [['warning', 'alarm', 'running'], 'alarm'],
  ])('derives the line state of %j as %s', (states, expected) => {
    expect(worstMachineState(machines(...states))).toBe(expected);
  });
});
