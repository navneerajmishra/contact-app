import { Component, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'ca-dialog-host',
    template: `<ng-container #container></ng-container>`,
})
export class DialogHostComponent {
    @ViewChild('container', { read: ViewContainerRef, static: true })
    container!: ViewContainerRef;
}
