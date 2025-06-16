import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { API_URL } from './api-url';
import { environment } from '../environments/environment';
import { ConfirmDialogService, ToastService } from '@shared/services';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({
            eventCoalescing: true,
        }),
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(),
        {
            provide: API_URL,
            useValue: environment.apiUrl,
        },
        ConfirmDialogService,
        ToastService,
    ],
};
