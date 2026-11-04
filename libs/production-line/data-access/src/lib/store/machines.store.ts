import { computed, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withHooks,
  withLinkedState,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import {
  MACHINE_STATE_SEVERITY,
  type Machine,
  type MachineState,
} from '../models/machine.model';
import { parseMachines } from '../models/machine.parser';
import { simulateStep } from '../simulation/machine-simulation';
import { PRODUCTION_LINE_CONFIG } from './production-line.config';

interface MachinesUiState {
  readonly selectedMachineId: string | null;
  readonly simulationEnabled: boolean;
}

const initialState = {
  selectedMachineId: null,
  simulationEnabled: true,
} satisfies MachinesUiState;

const emptyStateCounts = (): Record<MachineState, number> => ({
  running: 0,
  warning: 0,
  alarm: 0,
});

/**
 * Local state of the production line feature: machines loaded from JSON,
 * the selected machine and the live state simulation.
 *
 * Provide it on the feature route so its lifetime follows the feature.
 */
export const MachinesStore = signalStore(
  withState<MachinesUiState>(initialState),
  withProps(() => {
    const config = inject(PRODUCTION_LINE_CONFIG);
    return {
      _config: config,
      _machinesResource: httpResource(() => config.machinesUrl, {
        parse: (raw: unknown) => parseMachines(raw),
        defaultValue: [],
      }),
    };
  }),
  // Writable copy of the loaded machines; reset whenever the resource reloads.
  withLinkedState(({ _machinesResource }) => ({
    machines: (): readonly Machine[] =>
      _machinesResource.hasValue() ? _machinesResource.value() : [],
  })),
  withComputed(({ machines, selectedMachineId, _machinesResource }) => ({
    isLoading: computed(() => _machinesResource.isLoading()),
    loadError: computed(() => {
      const error = _machinesResource.error();
      return error ? error.message : null;
    }),
    selectedMachine: computed(
      () => machines().find(({ id }) => id === selectedMachineId()) ?? null,
    ),
    stateCounts: computed(() =>
      machines().reduce((counts, { state }) => {
        counts[state] += 1;
        return counts;
      }, emptyStateCounts()),
    ),
    /** Most severe state of all machines – the state of the whole line. */
    lineState: computed(() =>
      machines().reduce<MachineState>(
        (worst, { state }) =>
          MACHINE_STATE_SEVERITY[state] > MACHINE_STATE_SEVERITY[worst]
            ? state
            : worst,
        'running',
      ),
    ),
  })),
  withMethods((store) => {
    const setMachineState = (id: string, state: MachineState): void => {
      const now = new Date();
      patchState(store, ({ machines }) => ({
        machines: machines.map((machine) =>
          machine.id === id && machine.state !== state
            ? { ...machine, state, stateSince: now }
            : machine,
        ),
      }));
    };

    return {
      /** Accepts a plain value or a signal (e.g. a route input) to follow. */
      selectMachine: signalMethod<string | null | undefined>((id) =>
        patchState(store, { selectedMachineId: id ?? null }),
      ),
      setMachineState,
      resetMachine: (id: string): void => setMachineState(id, 'running'),
      setSimulationEnabled: (simulationEnabled: boolean): void =>
        patchState(store, { simulationEnabled }),
      simulateStep: (random: () => number = Math.random): void =>
        patchState(store, ({ machines }) => ({
          machines: simulateStep(machines, random, new Date()),
        })),
      reload: (): void => {
        store._machinesResource.reload();
      },
    };
  }),
  withHooks((store) => {
    let timer: ReturnType<typeof setInterval> | undefined;

    return {
      onInit() {
        const { simulationIntervalMs } = store._config;
        if (simulationIntervalMs > 0) {
          timer = setInterval(() => {
            if (store.simulationEnabled() && store.machines().length > 0) {
              store.simulateStep();
            }
          }, simulationIntervalMs);
        }
      },
      onDestroy() {
        clearInterval(timer);
      },
    };
  }),
);
