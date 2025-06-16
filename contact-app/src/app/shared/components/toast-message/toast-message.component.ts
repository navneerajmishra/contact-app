import { CommonModule } from '@angular/common';
import { Component, input, OnDestroy, output } from '@angular/core';
import { ToastMessage } from '@shared/models';

@Component({
  selector: 'ca-toast-message',
  imports: [CommonModule],
  templateUrl: './toast-message.component.html',
  styleUrl: './toast-message.component.css',
  host: {
        class: 'fixed bottom-5 right-5 z-50 p-4',
    }
})
export class ToastMessageComponent {
  readonly toastMessage = input.required<ToastMessage>();

  readonly onClose = output();
}
