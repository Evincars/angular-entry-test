import { Component, computed, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import type { MaterialSymbol } from 'material-symbols';
import type { UiIconSize } from '../ui.types';

const ICON_SIZE_PX = {
  sm: 18,
  md: 24,
  lg: 32,
  xl: 48,
} satisfies Record<UiIconSize, number>;

/**
 * Material Symbols icon. Decorative by default; pass `label` to expose it to
 * assistive technology.
 */
@Component({
  selector: 'ui-icon',
  imports: [MatIcon],
  template: `
    <mat-icon
      fontSet="material-symbols-outlined"
      [class.ui-icon--filled]="filled()"
      [attr.aria-hidden]="label() ? null : 'true'"
      [attr.aria-label]="label()"
      [attr.role]="label() ? 'img' : null"
      >{{ name() }}</mat-icon
    >
  `,
  styles: `
    :host {
      display: inline-flex;
      line-height: 1;
    }

    mat-icon {
      width: var(--ui-icon-size);
      height: var(--ui-icon-size);
      font-size: var(--ui-icon-size);
    }

    .ui-icon--filled {
      font-variation-settings: 'FILL' 1;
    }
  `,
  host: {
    '[style.--ui-icon-size.px]': 'sizePx()',
  },
})
export class UiIcon {
  readonly name = input.required<MaterialSymbol>();
  readonly size = input<UiIconSize>('md');
  readonly filled = input(false);
  readonly label = input<string>();

  protected readonly sizePx = computed(() => ICON_SIZE_PX[this.size()]);
}
