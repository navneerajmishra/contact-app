import { Component, computed, inject, input, untracked } from '@angular/core';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { ContactsStore } from '@store/store';

@Component({
    selector: 'ca-contact-detail',
    imports: [AvatarComponent],
    templateUrl: './contact-detail.component.html',
    styleUrl: './contact-detail.component.css',
})
export class ContactDetailComponent {
    readonly id = input.required<string>();
    readonly #store = inject(ContactsStore);

    readonly selectedContact = computed(() => {
        const contactId = this.id();
        
        return contactId
            ? untracked(() => this.#store.contactEntityMap()[contactId])
            : null;
    });
}
