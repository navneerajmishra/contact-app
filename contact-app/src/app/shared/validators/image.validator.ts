import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

export function validateImageUrl(): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const url = control.value;

    if (!url) {
      return of(); // Don't validate empty values here (leave to required validator)
    }
    return new Observable(observer => {
      const img = new Image();

      img.onload = () => {
        observer.next(null);      // ✅ valid image
        observer.complete();
      };

      img.onerror = () => {
        observer.next({ invalidImage: true }); // ❌ not a valid image
        observer.complete();
      };

      img.src = url;
    })
  };
}
