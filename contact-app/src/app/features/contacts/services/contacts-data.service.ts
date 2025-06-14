import {
    Injectable,
    WritableSignal,
    computed,
    inject,
    signal,
} from '@angular/core';
import { ContactListComponent } from '../components/contact-list/contact-list.component';
import { ContactsStore } from '../../../store/store/contacts-store';

@Injectable({
    providedIn: ContactListComponent,
})
export class ContactsDataService {
    readonly #store = inject(ContactsStore);
    readonly #filters: WritableSignal<{
        sort: {
            fieldId: string;
            order: 'asc' | 'desc';
        };
        filter: string;
    }> = signal({
        filter: '',
        sort: {
            fieldId: 'firstName',
            order: 'asc',
        },
    });
    constructor() {}
    filteredContactList = computed(() => {
        const contacts = this.#store.contactEntities();
        const filter = this.#filters();
        if (!filter) {
            return;
        }
        contacts.filter((contact) => {
            Object.values(contact).some(
                (c) => typeof c === 'string' && c.includes(filter.filter)
            );
        });
    });
}
