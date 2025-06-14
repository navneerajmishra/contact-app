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
    readonly #searchString: WritableSignal<string> = signal('');
    constructor() {

    }
    filteredContactList = computed(() => {
        const contacts = this.#store.contactEntities();
        const searchString = this.#searchString();
        console.log(searchString);
        if (!searchString) {
            
            
            return contacts;
        }
        return contacts.filter((contact) => 
            [contact.firstName, contact.lastName, contact.email].some(v => v?.includes(searchString)));
    });

    updateSearchString(searchString: string) {
        this.#searchString.update(() => searchString);
    }

}
