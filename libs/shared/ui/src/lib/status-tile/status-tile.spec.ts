import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { UiStatus } from '../ui.types';
import { UiStatusTile } from './status-tile';

describe('UiStatusTile', () => {
  const alarm = {
    tone: 'danger',
    icon: 'error',
    label: 'Alarm',
  } satisfies UiStatus;

  async function render(selected = false) {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(UiStatusTile);
    fixture.componentRef.setInput('label', 'Attacher');
    fixture.componentRef.setInput('icon', 'chrome_reader_mode');
    fixture.componentRef.setInput('status', alarm);
    fixture.componentRef.setInput('link', ['/machines', 'attacher']);
    fixture.componentRef.setInput('selected', selected);
    await fixture.whenStable();
    const host: HTMLElement = fixture.nativeElement;
    return host;
  }

  it('renders label, link and tone', async () => {
    const host = await render();

    expect(host.textContent).toContain('Attacher');
    expect(host.getAttribute('data-tone')).toBe('danger');
    expect(host.querySelector('a')?.getAttribute('href')).toBe('/machines/attacher');
  });

  it('exposes the status icon with an accessible label', async () => {
    const host = await render();

    expect(host.querySelector('[aria-label="Alarm"]')?.textContent?.trim()).toBe('error');
  });

  it('marks the selected tile', async () => {
    const host = await render(true);

    expect(host.classList).toContain('ui-status-tile--selected');
    expect(host.querySelector('a')?.getAttribute('aria-current')).toBe('true');
  });
});
