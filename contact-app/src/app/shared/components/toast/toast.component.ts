import { Component, inject, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '@shared/services';

@Component({
    selector: 'ca-toast',
    imports: [CommonModule],
    template: `<ng-container #container></ng-container>`,
    
})
export class ToastComponent {
    readonly #container = inject(ViewContainerRef);
    readonly #toastService = inject(ToastService);

    constructor() {
        this.#toastService.setContainerRef(this.#container);
    }
}
