import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ViewChild,
    inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogHostComponent } from './shared/components/dialog-host/dialog-host.component';
import { ConfirmDialogService } from '@shared/services';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, DialogHostComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
    @ViewChild('host', { static: true }) host!: DialogHostComponent;

    readonly #dialogService = inject(ConfirmDialogService);
    title = 'contact-app';

    ngAfterViewInit() {
        this.#dialogService.setContainerRef(this.host.container);
    }
}
