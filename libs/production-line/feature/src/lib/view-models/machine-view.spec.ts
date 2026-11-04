import type { Machine } from '@bagging-line/production-line/util';
import { machineStatus, toMachineView, toNavItem, toStateCounts } from './machine-view';

describe('machine view mappers', () => {
  const machine = {
    id: 'attacher',
    name: 'Attacher',
    type: 'bag-attacher',
    state: 'alarm',
    stateSince: new Date(0),
    description: 'Attaches bags',
  } satisfies Machine;

  it('maps every state to a UI status', () => {
    expect(machineStatus('running')).toEqual({
      tone: 'success',
      icon: 'settings_backup_restore',
      label: 'Running',
    });
    expect(machineStatus('warning')).toEqual({
      tone: 'warning',
      icon: 'warning',
      label: 'Warning',
    });
    expect(machineStatus('alarm')).toEqual({
      tone: 'danger',
      icon: 'error',
      label: 'Alarm',
    });
  });

  it('maps a machine to its view model', () => {
    expect(toMachineView(machine, '/machines/attacher')).toEqual({
      id: 'attacher',
      name: 'Attacher',
      typeLabel: 'Bag attacher',
      icon: 'chrome_reader_mode',
      state: 'alarm',
      status: machineStatus('alarm'),
      stateSince: new Date(0),
      description: 'Attaches bags',
      link: '/machines/attacher',
      flowing: false,
    });
  });

  it('maps a view model to a navigation item', () => {
    const view = toMachineView({ ...machine, state: 'running' }, ['machines', 'attacher']);

    expect(toNavItem(view)).toEqual({
      id: 'attacher',
      label: 'Attacher',
      link: ['machines', 'attacher'],
      status: machineStatus('running'),
    });
    expect(view.flowing).toBe(true);
  });

  it('lists the state counts in a stable order', () => {
    expect(toStateCounts({ alarm: 1, running: 2, warning: 0 })).toEqual([
      { status: machineStatus('running'), count: 2 },
      { status: machineStatus('warning'), count: 0 },
      { status: machineStatus('alarm'), count: 1 },
    ]);
  });
});
