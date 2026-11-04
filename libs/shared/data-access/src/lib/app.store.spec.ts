import { TestBed } from '@angular/core/testing';
import { AppStore } from './app.store';

describe('AppStore', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2020, 4, 1, 12, 44, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with the current time and the default operator', () => {
    const store = TestBed.inject(AppStore);

    expect(store.now()).toEqual(new Date(2020, 4, 1, 12, 44, 0));
    expect(store.userName()).toBe('Operator');
  });

  it('keeps the clock ticking', () => {
    const store = TestBed.inject(AppStore);

    vi.advanceTimersByTime(61_000);

    expect(store.now()).toEqual(new Date(2020, 4, 1, 12, 45, 1));
  });
});
