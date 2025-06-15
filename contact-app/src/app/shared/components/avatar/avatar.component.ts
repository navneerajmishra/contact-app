import { Component, computed, effect, input, signal } from '@angular/core';

@Component({
    selector: 'ca-avatar',
    imports: [],
    templateUrl: './avatar.component.html',
    styleUrl: './avatar.component.css',
})
export class AvatarComponent {
    readonly name = input<string>();
    readonly imageUrl = input<string>();
    readonly size = input<'sm' | 'md' | 'lg'>('sm');

    protected readonly isValidImage = signal<boolean>(false);
    protected readonly initials = computed(() => this.name()?.split(' ').reduce(
        (previous, current) => (previous ?? '').concat(current.charAt(0)), ''
    ));

    constructor() {
        effect(() => {
            const imageUrl = this.imageUrl();
            if (!imageUrl) {
                this.isValidImage.set(false);
                return;
            }
            const image = new Image();
            image.onload = () => this.isValidImage.set(true);
            image.onerror = () => this.isValidImage.set(false);
            image.src = imageUrl;
        })
    }
}
