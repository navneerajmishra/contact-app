import {
    signalStore,
    withMethods,
    withHooks,
    patchState,
    type,
} from '@ngrx/signals';
import {
    withEntities,
    addEntities,
    entityConfig,
    addEntity,
    updateEntity,
    removeEntity,
    upsertEntity,
} from '@ngrx/signals/entities';

import { Contact } from '../model/contact';
import { firstValueFrom } from 'rxjs';
import { ContactsService } from '../../features/contacts/services/contacts-service';
import { inject } from '@angular/core';
import {
    setError,
    setFulfilled,
    setPending,
    withRequestStatus,
} from './with-request-status';

export const config = entityConfig({
    entity: type<Contact>(),
    collection: 'contact',
    selectId: (contact) => contact.id!,
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
        async create(contact: Contact) {
            if (!contact) {
                throw new Error('Contact is required');
            }

            try {
                const created = await firstValueFrom(
                    contactsService.createOrUpdateContact(contact)
                );
                patchState(store, addEntity(created, config));
            } catch (err) {
                patchState(store, setError('Failed to create contact'));
                throw err;
            }
        },
        async optimisticUpdate(id: string, contact: Contact) {
            if (!contact || !id) {
                throw new Error('Contact is required');
            }
            // Save previous state for rollback
            const prev = store.contactEntityMap()[id];
            patchState(store, upsertEntity(contact, config));
            try {
                const updated = await firstValueFrom(
                    contactsService.createOrUpdateContact(contact)
                );
                // 🐛 Api doesn't always update the entity, so we update the entity again in the store.
                patchState(store, upsertEntity(updated, config));
            } catch (err) {
                // Rollback on error
                patchState(
                    store,
                    updateEntity({ id, changes: prev }, config),
                    setError('Failed to update contact')
                );
                throw err;
            }
        },
        async optimisticDelete(id: string) {
            if (!id) {
                throw new Error('Contact ID is required');
            }
            // Save previous state for rollback
            const prev = store.contactEntityMap()[id];
            patchState(store, removeEntity(id, config));
            try {
                await firstValueFrom(contactsService.deleteContact(id));
            } catch (err) {
                // Rollback on error
                patchState(store, addEntity(prev, config));
                throw err;
            }
        },
    })),

    withHooks({
        onInit({ loadAll }) {
            loadAll();
        },
    })
);
