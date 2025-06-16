import {
    ComponentRef,
    EnvironmentInjector,
    Injectable,
    ViewContainerRef,
    createComponent,
    inject,
} from '@angular/core';
import { ConfirmDialogComponent } from '@shared/components';

@Injectable()
export class ConfirmDialogService {
    private containerRef?: ViewContainerRef;
    componentRef?: ComponentRef<ConfirmDialogComponent>;

    setContainerRef(ref: ViewContainerRef) {
        this.containerRef = ref;
    }

    confirm(title: string, message: string): Promise<boolean> {
        if (!this.containerRef) {
            throw new Error('Dialog host container not set');
        }

        return new Promise<boolean>((resolve) => {
            this.componentRef = this.containerRef?.createComponent(ConfirmDialogComponent);
            this.componentRef?.setInput('title', title);
            this.componentRef?.setInput('message', message);
            this.componentRef?.instance.onClose.subscribe(result => {
                this.componentRef?.destroy();
                resolve(result);
            })
        });
    }
}
