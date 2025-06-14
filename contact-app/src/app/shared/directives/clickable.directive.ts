import {
    Directive,
    ElementRef,
    HostListener,
    effect,
    inject,
    input,
    output,
} from '@angular/core';

@Directive({
    selector: '[caClickable]',
})
export class ClickableDirective {
    readonly caClickable = input<boolean>(false);
    readonly caClick = output<Event>();
    readonly #elementRef = inject(ElementRef<HTMLElement>);

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.caClickable()) {
            this.caClick.emit(event);
        }
    }

    constructor() {
        // Reactively update cursor style based on signal
        effect(() => {
            const isClickable = this.caClickable();
            this.#elementRef.nativeElement.style.cursor = isClickable
                ? 'pointer'
                : 'default';
        });
    }
}
