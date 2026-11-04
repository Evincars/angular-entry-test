import { Component, input, model } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';

/** On/off switch with a projected label, supports `[(checked)]`. */
@Component({
  selector: 'ui-slide-toggle',
  imports: [MatSlideToggle],
  template: `
    <mat-slide-toggle
      [checked]="checked()"
      [disabled]="disabled()"
      (change)="checked.set($event.checked)"
    >
      <ng-content />
    </mat-slide-toggle>
  `,
})
export class UiSlideToggle {
  readonly checked = model(false);
  readonly disabled = input(false);
}
