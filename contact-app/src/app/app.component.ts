import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogComponent } from './shared/components/dialog-host/dialog.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ErrorComponent } from "./core/components/error/error.component";
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    imports: [CommonModule, ReactiveFormsModule, RouterOutlet, DialogComponent, ToastComponent, ErrorComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    title = 'contact-app';
}
