import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

/**
 * Application header. Content marked with `uiToolbarBrand` is placed on the
 * left, everything else is aligned to the right.
 */
@Component({
  selector: 'ui-toolbar',
  imports: [MatToolbar],
  template: `
    <mat-toolbar class="ui-toolbar">
      <div class="ui-toolbar__brand">
        <ng-content select="[uiToolbarBrand]" />
      </div>
      <div class="ui-toolbar__actions"><ng-content /></div>
    </mat-toolbar>
  `,
  styles: `
    :host {
      display: block;
    }

    .ui-toolbar {
      --mat-toolbar-container-background-color: var(--ui-surface-header);
      --mat-toolbar-container-text-color: var(--mat-sys-on-surface);
      justify-content: space-between;
      gap: 24px;
      border-bottom: 4px solid var(--ui-brand);
    }

    .ui-toolbar__brand,
    .ui-toolbar__actions {
      display: flex;
      align-items: center;
      gap: 32px;
      min-width: 0;
    }
  `,
})
export class UiToolbar {}
