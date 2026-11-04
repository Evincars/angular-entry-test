import { TestBed } from '@angular/core/testing';
import type { MachineState } from '@bagging-line/production-line/util';
import { toMachineView } from '../view-models/machine-view';
import { MachineDetail } from './machine-detail';

describe('MachineDetail', () => {
  async function render() {
    const fixture = TestBed.createComponent(MachineDetail);
    const view = toMachineView(
      {
        id: 'packer',
        name: 'Packer',
        type: 'packer',
        state: 'warning',
        stateSince: new Date(2020, 4, 1, 12, 0),
        description: 'Fills the bag',
      },
      '/machines/packer',
    );
    fixture.componentRef.setInput('machine', view);
    fixture.componentRef.setInput('now', new Date(2020, 4, 1, 12, 44));
    await fixture.whenStable();
    const host: HTMLElement = fixture.nativeElement;
    return { fixture, host };
  }

  it('shows the machine details', async () => {
    const { host } = await render();

    expect(host.textContent).toContain('Packer');
    expect(host.textContent).toContain('Fills the bag');
    expect(host.textContent).toContain('12:00 (44 min)');
  });

  it('emits the chosen state and disables the current one', async () => {
    const { fixture, host } = await render();
    const emitted: MachineState[] = [];
    fixture.componentInstance.stateChange.subscribe((state) => emitted.push(state));

    const buttons = Array.from(
      host.querySelectorAll<HTMLButtonElement>('.machine-detail__actions button'),
    );
    const byLabel = (label: string) =>
      buttons.find((button) => button.textContent?.includes(label));

    expect(byLabel('Warning')?.disabled).toBe(true);
    byLabel('Alarm')?.click();

    expect(emitted).toEqual(['alarm']);
  });
});
