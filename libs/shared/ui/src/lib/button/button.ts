import { Component, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import type { MaterialSymbol } from 'material-symbols';
import { UiIcon } from '../icon/icon';
import type { UiButtonAppearance } from '../ui.types';

@Component({
  selector: 'ui-button',
  imports: [MatButton, UiIcon],
  template: `
    <button
      [matButton]="appearance()"
      [type]="type()"
      [disabled]="disabled()"
      (click)="pressed.emit()"
    >
      @if (icon(); as iconName) {
        <ui-icon matButtonIcon size="sm" [name]="iconName" />
      }
      <ng-content />
    </button>
  `,
})
export class UiButton {
  readonly appearance = input<UiButtonAppearance>('filled');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly icon = input<MaterialSymbol>();
  readonly disabled = input(false);
  readonly pressed = output();
}
