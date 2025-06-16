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
        async optimisticCreate(contact: Contact) {
            // Generate a temporary id if not present
            let tempId = contact.id ?? crypto.randomUUID();
            const contactWithId = { ...contact, id: tempId };

            // Optimistically add to state
            patchState(store, addEntity(contactWithId, config));

            try {
                const created = await firstValueFrom(
                    contactsService.createContact({
                        ...contactWithId,
                        first_name: contactWithId.firstName,
                        last_name: contactWithId.lastName,
                        job_title: contactWithId.jobTitle,
                        created_on: contactWithId.createdOn,
                        phone: contactWithId.phone.number,
                    })
                );

                // If server returns a new id, update the entity in the store
                if (created?.id && created.id !== tempId) {
                    patchState(
                        store,
                        updateEntity(
                            { id: tempId, changes: { id: created.id } },
                            config
                        )
                    );
                }
            } catch (err) {
                // Rollback on error
                patchState(
                    store,
                    removeEntity(tempId, config),
                    setError('Failed to create contact')
                );
                throw err;
            }
        },
        async optimisticUpdate(id: string, contact: Contact) {
            // Save previous state for rollback
            const prev = store.contactEntityMap()[id];
            patchState(store, upsertEntity(contact, config));
            try {
                await firstValueFrom(
                    contactsService.updateContact(id, {
                        ...contact,
                        first_name: contact.firstName,
                        last_name: contact.lastName,
                        job_title: contact.jobTitle,
                        created_on: contact.createdOn,
                        phone: contact.phone.number,
                    })
                );
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
