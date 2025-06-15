import {
    Component,
    computed,
    effect,
    inject,
    input,
    untracked,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormFieldErrorDirective } from '@shared/directives';
import { ContactsStore } from '@store/store';
import { AvatarComponent } from "../../../../shared/components/avatar/avatar.component";

@Component({
    selector: 'ca-create-edit-contact',
    imports: [CommonModule, ReactiveFormsModule, FormFieldErrorDirective, AvatarComponent],
    templateUrl: './create-edit-contact.component.html',
    styleUrl: './create-edit-contact.component.css',
})
export class CreateEditContactComponent {
    readonly #store = inject(ContactsStore);
    readonly #formBuilder = inject(FormBuilder);
    readonly id = input<string | null>(null);

    readonly selectedContact = computed(() => {
        const contactId = this.id();
        
        return contactId
            ? untracked(() => this.#store.contactEntityMap()[contactId])
            : null;
    });

    protected readonly contactForm = this.#formBuilder.group({
        firstName: ['', [
            Validators.required,
            Validators.minLength(3),
        ]],
        lastName: [''],
        phone: this.#formBuilder.group({
            number: ['', [Validators.pattern(/^(?:1[-\s]?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/)]],
            extension: ['', [Validators.maxLength(5), Validators.pattern(/^\d{1,5}$/)]],
        }),
        email: ['', [
            Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        ]],
        company: [''],
        jobTitle: [''],
        avatar: ['', [Validators.pattern(/^(https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+(:\d+)?(\/[^\s]*)?(\?[^\s]*)?(#[^\s]*)?$/)]]
    });

    contactName = computed(() => `${this.contactForm.get('firstName')?.value ?? ''} ${this.contactForm.get('lastName')?.value ?? ''}`.trim())

    constructor() {
        effect(() => {
            const contact = this.selectedContact();
            
            if (!contact) {
                return;
            }
            this.contactForm.patchValue({...contact})
        });
    }

    submit() {
    }

    onImageError() {
        this.contactForm.get('profilePicture')?.setErrors({

        })
    }
}
