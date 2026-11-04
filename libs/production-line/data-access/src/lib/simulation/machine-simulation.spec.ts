import type { Machine } from '../models/machine.model';
import { pickWeightedState, simulateStep } from './machine-simulation';

const machine = (id: string, state: Machine['state']): Machine => ({
  id,
  name: id,
  type: 'scale',
  state,
  description: '',
  stateSince: new Date(0),
});

/** Returns the given values one after another. */
const sequence = (...values: number[]) => {
  let index = 0;
  return () => values[index++] ?? 0;
};

describe('machine simulation', () => {
  it.each([
    [0, 'running'],
    [0.59, 'running'],
    [0.6, 'warning'],
    [0.84, 'warning'],
    [0.85, 'alarm'],
    [0.99, 'alarm'],
  ])('picks the weighted state for random %d', (random, expected) => {
    expect(pickWeightedState(random)).toBe(expected);
  });

  it('switches the randomly picked machine to the next state', () => {
    const now = new Date(2020, 4, 1);
    const machines = [machine('a', 'running'), machine('b', 'running')];

    const next = simulateStep(machines, sequence(0.5, 0.9), now);

    expect(next[0]).toBe(machines[0]);
    expect(next[1]).toEqual({
      ...machines[1],
      state: 'alarm',
      stateSince: now,
    });
  });

  it('returns the same array when the state does not change', () => {
    const machines = [machine('a', 'running')];

    expect(simulateStep(machines, sequence(0, 0), new Date())).toBe(machines);
    expect(simulateStep([], Math.random, new Date())).toEqual([]);
  });
});
