import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date', 'setInterval', 'clearInterval'] });
    vi.setSystemTime(new Date(2020, 4, 1, 12, 44));
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the header with logo, clock and operator', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const host: HTMLElement = fixture.nativeElement;

    expect(host.querySelector('img')?.getAttribute('alt')).toBe('Bühler');
    expect(host.querySelector('time')?.textContent).toBe('01.05.2020 12:44');
    expect(host.textContent).toContain('Operator');
  });
});
