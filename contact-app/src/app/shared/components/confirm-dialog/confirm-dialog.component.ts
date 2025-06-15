import {
    ChangeDetectionStrategy,
    Component,
    input,
} from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'ca-confirm-dialog',
    imports: [],
    templateUrl: './confirm-dialog.component.html',
    styleUrl: './confirm-dialog.component.css',
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0, transform: 'scale(0.9)' }),
                animate(
                    '200ms ease-out',
                    style({ opacity: 1, transform: 'scale(1)' })
                ),
            ]),
            transition(':leave', [
                animate(
                    '150ms ease-in',
                    style({ opacity: 0, transform: 'scale(0.9)' })
                ),
            ]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
    readonly title = input.required<string>();
    readonly message = input.required<string>();
    readonly onClose = input<(confirmed: boolean) => void>();

    close(confirmed: boolean) {
        this.onClose()?.(confirmed);
    }
}
