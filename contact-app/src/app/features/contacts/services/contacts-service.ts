import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL } from '../../../api-url';
import { Contact, Phone } from '../../../store/model/contact';
import { Observable, map, of, throwError } from 'rxjs';
import { mapContactResponse, mapContactToResponse } from './mapper';

export type ContactApiModel = {
    id: string | null; // null only before creating a new contact
    phone: string;
    first_name: string;
    last_name?: string;
    avatar?: string;
    email?: string;
    company?: string;
    job_title?: string;
    created_on?: Date;
};

@Injectable({
    providedIn: 'root',
})
export class ContactsService {
    readonly #http = inject(HttpClient);
    readonly #baseUrl = inject(API_URL);

    getAllContacts(): Observable<Contact[]> {
        return this.#http
            .get<ContactApiModel[]>(this.#baseUrl)
            .pipe(
                map((contacts: ContactApiModel[]): Contact[] =>
                    contacts.map((contact) => mapContactResponse(contact))
                )
            );
    }

    deleteContact(id: string): Observable<Contact> {
        return this.#http
            .delete<ContactApiModel>(`${this.#baseUrl}/${id}`)
            .pipe(map((createdContact) => mapContactResponse(createdContact)));
    }

    createOrUpdateContact(contact: Contact): Observable<Contact> {
        const apiContact = mapContactToResponse(contact);

        if (contact.id) {
            return this.#updateContact(contact.id, apiContact);
        } else {
            return this.#createContact(apiContact);
        }
    }

    #createContact(contact: ContactApiModel): Observable<Contact> {
        return this.#http
            .post<ContactApiModel>(this.#baseUrl, JSON.stringify(contact))
            .pipe(map((createdContact) => mapContactResponse(createdContact)));
    }

    #updateContact(id: string, contact: ContactApiModel): Observable<Contact> {
        return this.#http
            .put<ContactApiModel>(
                `${this.#baseUrl}/${id}`,
                JSON.stringify(contact)
            )
            .pipe(map((createdContact) => mapContactResponse(createdContact)));
    }
}
