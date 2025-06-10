import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({
      runCoalescing: false // We will use OnPush change detection strategy with Signals
    }),
    provideRouter(routes),
  ]
};
