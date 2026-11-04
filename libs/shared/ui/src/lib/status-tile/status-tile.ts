import { Component, input } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatRipple } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import type { MaterialSymbol } from 'material-symbols';
import { UiIcon } from '../icon/icon';
import type { UiLink, UiStatus } from '../ui.types';

/** Clickable tile showing an entity icon, its label and its status. */
@Component({
  selector: 'ui-status-tile',
  imports: [MatCard, MatRipple, RouterLink, UiIcon],
  templateUrl: './status-tile.html',
  styleUrl: './status-tile.scss',
  host: {
    '[attr.data-tone]': 'status().tone',
    '[class.ui-status-tile--selected]': 'selected()',
  },
})
export class UiStatusTile {
  readonly label = input.required<string>();
  readonly icon = input.required<MaterialSymbol>();
  readonly status = input.required<UiStatus>();
  readonly link = input.required<UiLink>();
  readonly selected = input(false);
}
