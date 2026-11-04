import { TestBed } from '@angular/core/testing';
import { UiIcon } from './icon';

describe('UiIcon', () => {
  async function render(inputs: Partial<{ name: string; size: string; label: string }>) {
    const fixture = TestBed.createComponent(UiIcon);
    for (const [key, value] of Object.entries(inputs)) {
      fixture.componentRef.setInput(key, value);
    }
    await fixture.whenStable();
    const host: HTMLElement = fixture.nativeElement;
    const icon = host.querySelector('mat-icon');
    if (!icon) throw new Error('mat-icon not rendered');
    return { host, icon };
  }

  it('renders the symbol ligature with the outlined font set', async () => {
    const { icon } = await render({ name: 'warning' });

    expect(icon.textContent?.trim()).toBe('warning');
    expect(icon.classList).toContain('material-symbols-outlined');
  });

  it('is decorative unless a label is given', async () => {
    const decorative = await render({ name: 'error' });
    expect(decorative.icon.getAttribute('aria-hidden')).toBe('true');

    const labelled = await render({ name: 'error', label: 'Alarm' });
    expect(labelled.icon.getAttribute('aria-hidden')).toBeNull();
    expect(labelled.icon.getAttribute('aria-label')).toBe('Alarm');
    expect(labelled.icon.getAttribute('role')).toBe('img');
  });

  it('maps the size to a pixel value', async () => {
    const { host } = await render({ name: 'error', size: 'xl' });

    expect(host.style.getPropertyValue('--ui-icon-size')).toBe('48px');
  });
});
