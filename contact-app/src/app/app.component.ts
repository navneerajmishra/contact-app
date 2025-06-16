import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogComponent } from './shared/components/dialog-host/dialog.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ErrorComponent } from "./core/components/error/error.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, DialogComponent, ToastComponent, ErrorComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    title = 'contact-app';
}
