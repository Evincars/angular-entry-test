import { Component, computed, inject, input } from '@angular/core';
import { ActivatedRoute, Router, type UrlTree } from '@angular/router';
import { MachinesStore } from '@bagging-line/production-line/data-access';
import { AppStore } from '@bagging-line/shared/data-access';
import { UiButton, UiCard, UiNavTabs, UiProgressBar, UiSlideToggle } from '@bagging-line/shared/ui';
import { LineOverview } from '../components/line-overview/line-overview';
import { LineSummary } from '../components/line-summary/line-summary';
import { MachineDetail } from '../components/machine-detail/machine-detail';
import {
  machineStatus,
  toMachineView,
  toNavItem,
  toStateCounts,
} from '../view-models/machine-view';

/**
 * Container of the production line feature. Connects the stores to the
 * presentational components; all state changes are delegated to the stores.
 */
@Component({
  selector: 'pl-production-line-page',
  imports: [
    UiNavTabs,
    UiProgressBar,
    UiSlideToggle,
    UiCard,
    UiButton,
    LineOverview,
    LineSummary,
    MachineDetail,
  ],
  templateUrl: './production-line-page.html',
  styleUrl: './production-line-page.scss',
})
export class ProductionLinePage {
  /** Bound from the `:machineId` route parameter. */
  readonly machineId = input<string>();

  protected readonly store = inject(MachinesStore);
  protected readonly appStore = inject(AppStore);

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  /** Route the feature is mounted on, links are relative to it. */
  private readonly featureRoute = this.route.parent ?? this.route;

  protected readonly machines = computed(() =>
    this.store.machines().map((machine) => toMachineView(machine, this.machineLink(machine.id))),
  );
  protected readonly navItems = computed(() => this.machines().map(toNavItem));
  protected readonly selectedMachine = computed(
    () => this.machines().find(({ id }) => id === this.store.selectedMachineId()) ?? null,
  );
  protected readonly lineStatus = computed(() => machineStatus(this.store.lineState()));
  protected readonly stateCounts = computed(() => toStateCounts(this.store.stateCounts()));

  constructor() {
    this.store.selectMachine(this.machineId);
  }

  protected closeDetail(): void {
    void this.router.navigate(['.'], { relativeTo: this.featureRoute });
  }

  private machineLink(id: string): UrlTree {
    return this.router.createUrlTree(['machines', id], {
      relativeTo: this.featureRoute,
    });
  }
}
