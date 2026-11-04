import { InjectionToken } from '@angular/core';

export interface ProductionLineConfig {
  /** URL of the machines JSON, relative to the document base URL. */
  readonly machinesUrl: string;
  /** How often the simulation changes a machine state; `0` disables the timer. */
  readonly simulationIntervalMs: number;
}

export const PRODUCTION_LINE_CONFIG = new InjectionToken<ProductionLineConfig>(
  'PRODUCTION_LINE_CONFIG',
  {
    factory: () =>
      ({
        machinesUrl: 'data/machines.json',
        simulationIntervalMs: 4_000,
      }) satisfies ProductionLineConfig,
  },
);
