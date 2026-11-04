import { Component, input } from '@angular/core';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UiIcon } from '../icon/icon';
import type { UiNavItem } from '../ui.types';

/**
 * Router-aware tab navigation where every tab carries a status (tone + icon).
 * The routed content is projected into the tab panel.
 */
@Component({
  selector: 'ui-nav-tabs',
  imports: [MatTabNav, MatTabLink, MatTabNavPanel, RouterLink, RouterLinkActive, UiIcon],
  templateUrl: './nav-tabs.html',
  styleUrl: './nav-tabs.scss',
})
export class UiNavTabs {
  readonly items = input.required<readonly UiNavItem[]>();
  readonly ariaLabel = input('Navigation');
}
