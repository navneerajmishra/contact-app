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
import { validateImageUrl } from '@shared/validators';
import { ContactsStore } from '@store/store';

@Component({
    selector: 'ca-create-edit-contact',
    imports: [CommonModule, ReactiveFormsModule, FormFieldErrorDirective],
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
        phone: ['', [
            Validators.required,
            Validators.minLength(10),
        ]],
        email: ['', [
            Validators.email,
        ]],
        company: [''],
        jobTitle: [''],
        profilePicture: ['', [], [validateImageUrl()]] // TODO: URL validator
    });

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
