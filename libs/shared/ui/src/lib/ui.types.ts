import type { MaterialSymbol } from 'material-symbols';

/** Semantic color of a status-aware UI element. */
export type UiTone = 'neutral' | 'success' | 'warning' | 'danger';

export type UiIconSize = 'sm' | 'md' | 'lg' | 'xl';

export type UiButtonAppearance = 'text' | 'filled' | 'outlined' | 'tonal';

/** Anything the Angular router accepts as a `routerLink`. */
export type UiLink = string | readonly (string | number)[];

export interface UiStatus {
  readonly tone: UiTone;
  readonly icon: MaterialSymbol;
  readonly label: string;
}

export interface UiNavItem {
  readonly id: string;
  readonly label: string;
  readonly link: UiLink;
  readonly status: UiStatus;
}

export type { MaterialSymbol };
