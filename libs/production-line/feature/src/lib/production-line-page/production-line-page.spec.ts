import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import {
  MachinesStore,
  PRODUCTION_LINE_CONFIG,
  type ProductionLineConfig,
} from '@bagging-line/production-line/data-access';
import { ProductionLinePage } from './production-line-page';

const MACHINES_JSON = [
  { id: 'scale', name: 'Scale', type: 'scale', state: 'running' },
  { id: 'attacher', name: 'Attacher', type: 'bag-attacher', state: 'alarm' },
  { id: 'packer', name: 'Packer', type: 'packer', state: 'running' },
  { id: 'closer', name: 'Closer', type: 'bag-closer', state: 'warning' },
];

describe('ProductionLinePage', () => {
  const config = {
    machinesUrl: 'test/machines.json',
    simulationIntervalMs: 0,
  } satisfies ProductionLineConfig;

  async function render(machineId?: string) {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PRODUCTION_LINE_CONFIG, useValue: config },
        MachinesStore,
      ],
    });
    const fixture = TestBed.createComponent(ProductionLinePage);
    fixture.componentRef.setInput('machineId', machineId);
    // Starts the request; whenStable() would wait for it to finish.
    TestBed.tick();
    TestBed.inject(HttpTestingController).expectOne(config.machinesUrl).flush(MACHINES_JSON);
    await fixture.whenStable();
    const host: HTMLElement = fixture.nativeElement;
    return { fixture, host, store: TestBed.inject(MachinesStore) };
  }

  const texts = (elements: NodeListOf<Element>) =>
    Array.from(elements, (element) => element.textContent?.trim());

  it('shows every machine in the navigation and in the overview', async () => {
    const { host } = await render();

    expect(texts(host.querySelectorAll('[mat-tab-link] .ui-nav-tabs__label'))).toEqual([
      'Scale',
      'Attacher',
      'Packer',
      'Closer',
    ]);
    expect(
      Array.from(host.querySelectorAll('ui-status-tile'), (tile) => tile.getAttribute('data-tone')),
    ).toEqual(['success', 'danger', 'success', 'warning']);
    expect(host.querySelector('pl-machine-detail')).toBeNull();
  });

  it('shows the machine selected by the route and reacts to state changes', async () => {
    const { fixture, host, store } = await render('packer');

    expect(host.querySelector('pl-machine-detail')?.textContent).toContain('Packer');

    store.setMachineState('packer', 'alarm');
    await fixture.whenStable();

    expect(host.querySelector('.ui-status-tile--selected')?.getAttribute('data-tone')).toBe(
      'danger',
    );
    expect(host.querySelector('pl-line-summary')?.textContent).toContain('2 Alarm');
  });
});
