import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withState } from '@ngrx/signals';

export interface CurrentUser {
  readonly displayName: string;
  readonly role: 'operator' | 'engineer';
}

export interface AppState {
  readonly now: Date;
  readonly user: CurrentUser;
}

const CLOCK_TICK_MS = 1_000;

const initialState = {
  now: new Date(),
  user: { displayName: 'Operator', role: 'operator' },
} satisfies AppState;

/**
 * Global, application-wide state: wall clock and the signed-in user.
 */
export const AppStore = signalStore(
  { providedIn: 'root' },
  withState<AppState>(initialState),
  withComputed(({ user }) => ({
    userName: computed(() => user().displayName),
  })),
  withHooks((store) => {
    let timer: ReturnType<typeof setInterval> | undefined;

    return {
      onInit() {
        patchState(store, { now: new Date() });
        timer = setInterval(() => patchState(store, { now: new Date() }), CLOCK_TICK_MS);
      },
      onDestroy() {
        clearInterval(timer);
      },
    };
  }),
);
