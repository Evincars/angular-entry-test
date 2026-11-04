import { Component, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import type { MaterialSymbol } from 'material-symbols';
import { UiIcon } from '../icon/icon';

@Component({
  selector: 'ui-icon-button',
  imports: [MatIconButton, UiIcon],
  template: `
    <button
      matIconButton
      type="button"
      [disabled]="disabled()"
      [attr.aria-label]="label()"
      (click)="pressed.emit()"
    >
      <ui-icon [name]="icon()" />
    </button>
  `,
})
export class UiIconButton {
  readonly icon = input.required<MaterialSymbol>();
  /** Accessible name, required because the button has no visible text. */
  readonly label = input.required<string>();
  readonly disabled = input(false);
  readonly pressed = output();
}
