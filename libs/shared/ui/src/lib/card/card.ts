import { Component, input } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';

/**
 * Outlined content card. Projected elements marked with `uiCardHeaderEnd` sit
 * next to the title, `uiCardActions` go to the footer.
 */
@Component({
  selector: 'ui-card',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>{{ heading() }}</mat-card-title>
        @if (subheading(); as text) {
          <mat-card-subtitle>{{ text }}</mat-card-subtitle>
        }
        <div class="ui-card__header-end">
          <ng-content select="[uiCardHeaderEnd]" />
        </div>
      </mat-card-header>
      <mat-card-content>
        <ng-content />
      </mat-card-content>
      <mat-card-actions align="end">
        <ng-content select="[uiCardActions]" />
      </mat-card-actions>
    </mat-card>
  `,
  styles: `
    :host {
      display: block;
    }

    mat-card-header {
      align-items: flex-start;
      padding-bottom: 8px;
    }

    .ui-card__header-end {
      margin-left: auto;
    }
  `,
})
export class UiCard {
  readonly heading = input.required<string>();
  readonly subheading = input<string>();
}
