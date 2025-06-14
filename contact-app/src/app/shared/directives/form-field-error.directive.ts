import {
  ChangeDetectorRef,
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    Renderer2,
    effect,
    inject,
    input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, NgControl } from '@angular/forms';
import { Subscription, delay, map, of, tap } from 'rxjs';

@Directive({
    selector: '[caFormFieldError]',
})
export class FormFieldErrorDirective implements OnInit {
  errorEl;
  formControl = inject(NgControl);
  formControlElement;
  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);
  changeDetectorRef = inject(ChangeDetectorRef);
  statusChangesSub: Subscription | null = null;

  @Input('caFormFieldError') customMessages: Record<string, string> | ''= '';
  constructor() {
    this.formControlElement = this.elementRef.nativeElement;
    this.errorEl = this.renderer.createElement('small');
    /* this.renderer.addClass(this.errorEl, '')
    this.renderer.setStyle(this.errorEl, 'color', '#dc2626'); // Tailwind red-600
    this.renderer.setStyle(this.errorEl, 'fontSize', '0.875rem');
    this.renderer.setStyle(this.errorEl, 'marginTop', '0.25rem'); */

    
  }

  //TODO: Check if this can be improved
  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent): void {
    const parent = this.elementRef.nativeElement.parentElement;
    this.updateErrorDisplay(this.formControl);
  }
  ngOnInit(): void {
    this.statusChangesSub = this.formControl.statusChanges?.pipe(
      tap(x => console.log(this.formControl.name, x)),
      map(x => this.updateErrorDisplay(this.formControl))
    ).subscribe() ?? null;
    // Initial update
    this.updateErrorDisplay(this.formControl);
  }

  private updateErrorDisplay(control: NgControl) {
    console.log(control.invalid, control.dirty, control.touched, control.pristine);
    
    const parent = this.elementRef.nativeElement.parentElement;
    if (control.invalid && control.touched) {
      const errorKey = Object.keys(control.errors ?? {})[0];
      const message = this.customMessages ?
        this.customMessages[errorKey] :
        this.defaultMessages[errorKey] ??
        'Invalid field';
      this.errorEl.textContent = message;
      this.renderer.addClass(this.errorEl, 'text-red-500');
      this.renderer.addClass(this.formControlElement, 'border-red-300')
      if (!parent.contains(this.errorEl)) {
        this.renderer.appendChild(parent, this.errorEl);
      }
    } else {
      if (parent.contains(this.errorEl)) {
        this.renderer.removeChild(parent, this.errorEl);
        this.renderer.removeClass(this.formControlElement, 'border-red-300')
      }
    }
    this.changeDetectorRef.detectChanges();
  }

  private defaultMessages: Record<string, string> = {
    required: 'This field is required.',
    email: 'Invalid email address.',
    minlength: 'Too short.',
    maxlength: 'Too long.',
    pattern: 'Invalid format.'
  };

  ngOnDestroy(): void {
    this.statusChangesSub?.unsubscribe();
  }
}
