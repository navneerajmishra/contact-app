import {
    signalStore,
    withMethods,
    withHooks,
    patchState,
    type,
} from '@ngrx/signals';
import { withEntities, addEntities, entityConfig } from '@ngrx/signals/entities';

import { Contact } from '../model/contact';
import { catchError, firstValueFrom } from 'rxjs';
import { ContactsService } from '../../features/contacts/services/contacts-service';
import { inject } from '@angular/core';
import {
    setFulfilled,
    setPending,
    withRequestStatus,
} from './with-request-status';

const config = entityConfig({
    entity: type<Contact>(),
    collection: 'contact',
    selectId: (contact) => contact.id,
  });

export const ContactsStore = signalStore(
    { providedIn: 'root' },
    withEntities(config),
    withRequestStatus(),
    withMethods((store, contactsService = inject(ContactsService)) => ({
        async loadAll() {
            patchState(store, setPending());
            const contacts = await firstValueFrom(
                contactsService.getAllContacts()
            );
            patchState(store, addEntities(contacts, config), setFulfilled());
        },
    })),

    withHooks({
        onInit({ loadAll }) {
            loadAll();
        },
    })
);
