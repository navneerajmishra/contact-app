import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    Renderer2,
    inject,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription, tap } from 'rxjs';

@Directive({
    selector: '[caFormFieldError]',
})
export class FormFieldErrorDirective implements OnInit {
    readonly #formControl = inject(NgControl);
    readonly #elementRef = inject(ElementRef);
    readonly #renderer = inject(Renderer2);
    readonly #changeDetectorRef = inject(ChangeDetectorRef);

    #errorEl: HTMLInputElement;
    #formControlElement: HTMLInputElement;
    #statusChangesSub: Subscription | null = null;

    @Input('caFormFieldError') customMessages: Record<string, string> | '' = '';
    constructor() {
        this.#formControlElement = this.#elementRef.nativeElement;
        this.#errorEl = this.#renderer.createElement('small');
    }

    //TODO: Check if this can be improved
    @HostListener('blur', ['$event'])
    onBlur(): void {
        this.#updateErrorDisplay(this.#formControl);
    }
    ngOnInit(): void {
        this.#statusChangesSub =
            this.#formControl.statusChanges
                ?.pipe(tap(() => this.#updateErrorDisplay(this.#formControl)))
                .subscribe() ?? null;
        // Initial update
        this.#updateErrorDisplay(this.#formControl);
    }

    #updateErrorDisplay(control: NgControl) {
        const parent = this.#elementRef.nativeElement.parentElement;
        if (control.invalid && control.touched) {
            const errorKey = Object.keys(control.errors ?? {})[0];
            const message = this.customMessages
                ? this.customMessages[errorKey]
                : this.#defaultMessages[errorKey] ?? 'Invalid field';
            this.#errorEl.textContent = message;
            this.#renderer.addClass(this.#errorEl, 'text-red-500');
            this.#renderer.addClass(this.#formControlElement, 'border-red-300');
            if (!parent.contains(this.#errorEl)) {
                this.#renderer.appendChild(parent, this.#errorEl);
            }
        } else {
            if (parent.contains(this.#errorEl)) {
                this.#renderer.removeChild(parent, this.#errorEl);
                this.#renderer.removeClass(
                    this.#formControlElement,
                    'border-red-300'
                );
            }
        }
        this.#changeDetectorRef.detectChanges();
    }

    #defaultMessages: Record<string, string> = {
        required: 'This field is required.',
        email: 'Invalid email address.',
        minlength: 'Too short.',
        maxlength: 'Too long.',
        pattern: 'Invalid format.',
    };

    ngOnDestroy(): void {
        this.#statusChangesSub?.unsubscribe();
    }
}
