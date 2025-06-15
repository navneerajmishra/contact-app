import {
    EnvironmentInjector,
    Injectable,
    ViewContainerRef,
    createComponent,
    inject,
} from '@angular/core';
import { ConfirmDialogComponent } from '@shared/components';

@Injectable({
    providedIn: 'root',
})
export class ConfirmDialogService {
    private containerRef?: ViewContainerRef;

    constructor(private injector: EnvironmentInjector) {}

    setContainerRef(ref: ViewContainerRef) {
        this.containerRef = ref;
    }

    confirm(title: string, message: string): Promise<boolean> {
        if (!this.containerRef) {
            throw new Error('Dialog host container not set');
        }

        return new Promise<boolean>((resolve) => {
            const componentRef = createComponent(ConfirmDialogComponent, {
                environmentInjector: this.injector,
                elementInjector: this.containerRef!.injector,
            });

            componentRef.setInput('title', title);
            componentRef.setInput('message', message);
            componentRef.setInput('onClose', (result: boolean) => {
                componentRef.destroy();
                resolve(result);
            });

            this.containerRef!.insert(componentRef.hostView);
        });
    }
}
