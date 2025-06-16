import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ToastMessageComponent } from '@shared/components/toast-message/toast-message.component';
import { ToastMessage } from '@shared/models';

@Injectable()
export class ToastService {
    containerRef?: ViewContainerRef;
    componentRef?: ComponentRef<ToastMessageComponent>;
    toastTimeOut?: ReturnType<typeof setTimeout>;

    setContainerRef(ref: ViewContainerRef) {
        this.containerRef = ref;
    }

    show(toastMessage: ToastMessage): Promise<boolean> {
        if (!this.containerRef) {
            throw new Error('Toast host container not set');
        }
        
        return new Promise<boolean>(() => {
            this.componentRef = this.containerRef?.createComponent(
                ToastMessageComponent
            );
            this.componentRef?.setInput('toastMessage', toastMessage);
            this.componentRef?.instance.onClose.subscribe(() => {
                this.componentRef?.destroy();
                clearTimeout(this.toastTimeOut);
            });
            this.toastTimeOut = setTimeout(() => {
                this.componentRef?.destroy();
            }, toastMessage.duration ?? 3000);
        });
    }
}
