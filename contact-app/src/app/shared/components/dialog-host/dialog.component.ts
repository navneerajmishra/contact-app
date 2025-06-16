import { Component, inject, ViewContainerRef } from '@angular/core';
import { ConfirmDialogService } from '@shared/services';

@Component({
    selector: 'ca-dialog',
    template: `<ng-container #container></ng-container>`,
})
export class DialogComponent {
    readonly #container = inject(ViewContainerRef);
    readonly #dialogService = inject(ConfirmDialogService);

    constructor() {
        this.#dialogService.setContainerRef(this.#container);
    }
}
