import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'ca-loading-indicator',
    imports: [],
    templateUrl: './loading-indicator.component.html',
    styleUrl: './loading-indicator.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingIndicatorComponent {
    readonly show = input.required<boolean>();
}
