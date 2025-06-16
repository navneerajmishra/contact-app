import { Component, effect, inject } from '@angular/core';
import { ToastService } from '@shared/services';
import { ContactsStore } from '@store/store';

@Component({
  selector: 'ca-error',
  template: '',
})
export class ErrorComponent {
  readonly #store = inject(ContactsStore);
  readonly #toastService = inject(ToastService);

  constructor() {
    effect(() => {
      const error = this.#store.error();
      
      if (error) {
        this.#toastService.show({
          message: error,
          type: 'error',
          duration: 50000,
        });
      }
    }
    );
  }
}
