import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppStore } from '@bagging-line/shared/data-access';
import { UiIconLabel, UiToolbar } from '@bagging-line/shared/ui';
import { formatDateTime } from '@bagging-line/shared/util';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UiToolbar, UiIconLabel],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly appStore = inject(AppStore);

  protected readonly clock = computed(() => formatDateTime(this.appStore.now()));
  protected readonly clockIso = computed(() => this.appStore.now().toISOString());
}
