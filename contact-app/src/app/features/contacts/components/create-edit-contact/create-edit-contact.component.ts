import {
    Component,
    computed,
    effect,
    inject,
    input,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormFieldErrorDirective } from '@shared/directives';
import { ContactsStore } from '@store/store';
import { AvatarComponent } from '@shared/components';
import { Router } from '@angular/router';

@Component({
    selector: 'ca-create-edit-contact',
    imports: [CommonModule, ReactiveFormsModule, FormFieldErrorDirective, AvatarComponent],
    templateUrl: './create-edit-contact.component.html',
    styleUrl: './create-edit-contact.component.css',
})
export class CreateEditContactComponent {
    readonly #store = inject(ContactsStore);
    readonly #formBuilder = inject(FormBuilder);
    readonly #router = inject(Router);

    readonly id = input<string | null>(null);

    readonly selectedContact = computed(() => {
        const contactId = this.id();
        
        return contactId
            ? this.#store.contactEntityMap()[contactId]
            : null;
    });

    protected readonly contactForm = this.#formBuilder.group({
        firstName: ['', [
            Validators.required,
            Validators.minLength(3),
        ]],
        lastName: [''],
        phone: this.#formBuilder.group({
            number: ['', [Validators.required, Validators.pattern(/^(?:1[-\s]?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/)]],
            extension: ['', [Validators.maxLength(5), Validators.pattern(/^\d{0,5}$/)]],
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
        const id = this.id();
        if (this.contactForm.invalid) {
            this.contactForm.markAllAsTouched();
            return;
        }
        const contactToCreateOrUpdate = {
            id,
            firstName: this.contactForm.get('firstName')!.value!.trim(),
            lastName: this.contactForm.get('lastName')?.value?.trim() ?? '',
            phone: {
                number: this.contactForm.get('phone.number')!.value!.trim(),
                extension: this.contactForm.get('phone.extension')?.value?.trim() ?? '',
            },
            email: this.contactForm.get('email')?.value?.trim() ?? '',
            company: this.contactForm.get('company')?.value?.trim() ?? '',
            jobTitle: this.contactForm.get('jobTitle')?.value?.trim() ?? '',
            avatar: this.contactForm.get('avatar')?.value?.trim() ?? '',
        };
        const response = id ? this.#store.optimisticUpdate(id, contactToCreateOrUpdate) : this.#store.create(contactToCreateOrUpdate);
        response.then(() => {
            this.contactForm.reset();
            this.#router.navigate(['/contacts']);
        })
        
    }
}
