import { ApplicationRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PRODUCTION_LINE_CONFIG, type ProductionLineConfig } from './production-line.config';
import { MachinesStore } from './machines.store';

const MACHINES_JSON = [
  { id: 'scale', name: 'Scale', type: 'scale', state: 'running' },
  { id: 'attacher', name: 'Attacher', type: 'bag-attacher', state: 'alarm' },
  { id: 'packer', name: 'Packer', type: 'packer', state: 'running' },
  { id: 'closer', name: 'Closer', type: 'bag-closer', state: 'warning' },
];

describe('MachinesStore', () => {
  const config = {
    machinesUrl: 'test/machines.json',
    simulationIntervalMs: 1_000,
  } satisfies ProductionLineConfig;

  function setup() {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PRODUCTION_LINE_CONFIG, useValue: config },
        MachinesStore,
      ],
    });
    return {
      store: TestBed.inject(MachinesStore),
      http: TestBed.inject(HttpTestingController),
    };
  }

  async function loaded(response: object = MACHINES_JSON) {
    const { store, http } = setup();
    TestBed.tick();
    http.expectOne(config.machinesUrl).flush(response);
    await TestBed.inject(ApplicationRef).whenStable();
    return { store, http };
  }

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('loads the machines from the configured JSON url', async () => {
    const { store } = await loaded();

    expect(store.isLoading()).toBe(false);
    expect(store.loadError()).toBeNull();
    expect(store.machines().map(({ id }) => id)).toEqual(['scale', 'attacher', 'packer', 'closer']);
    expect(store.stateCounts()).toEqual({ running: 2, warning: 1, alarm: 1 });
    expect(store.lineState()).toBe('alarm');
  });

  it('exposes invalid payloads as a load error', async () => {
    const { store } = await loaded([{ id: 'x' }]);

    expect(store.machines()).toEqual([]);
    expect(store.loadError()).toMatch(/non-empty "id"/);
  });

  it('changes and resets a machine state', async () => {
    const { store } = await loaded();

    store.setMachineState('closer', 'alarm');
    expect(store.stateCounts()).toEqual({ running: 2, warning: 0, alarm: 2 });

    store.resetMachine('attacher');
    store.resetMachine('closer');
    expect(store.stateCounts()).toEqual({ running: 4, warning: 0, alarm: 0 });
    expect(store.lineState()).toBe('running');
  });

  it('follows the selected machine id, also from a signal', async () => {
    const { store } = await loaded();
    const routeParam = signal<string | undefined>('packer');

    // Components call this in a field initializer, i.e. in an injection context.
    TestBed.runInInjectionContext(() => store.selectMachine(routeParam));
    TestBed.tick();
    expect(store.selectedMachine()?.name).toBe('Packer');

    routeParam.set(undefined);
    TestBed.tick();
    expect(store.selectedMachine()).toBeNull();
  });

  it('runs the simulation only while it is enabled', async () => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval'] });
    // Picks the last machine (closer) and the most severe state (alarm).
    vi.spyOn(Math, 'random').mockReturnValue(0.99);
    const { store } = await loaded();

    vi.advanceTimersByTime(config.simulationIntervalMs);
    expect(store.machines().find(({ id }) => id === 'closer')?.state).toBe('alarm');

    store.setSimulationEnabled(false);
    store.resetMachine('closer');
    vi.advanceTimersByTime(config.simulationIntervalMs * 3);
    expect(store.machines().find(({ id }) => id === 'closer')?.state).toBe('running');
  });
});
