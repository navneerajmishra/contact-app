import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL } from '../../../api-url';
import { Contact } from '../../../store/model/contact';
import { Observable, map, tap } from 'rxjs';

interface ContactApiModel {
    id: string;
    // req, min
    phone: string; // TODO: Could be of type PhoneNumber
    // req,
    first_name: string;
    //
    last_name?: string; // A person may not have last name
    // url only
    avatar?: string;
    // email pattern
    email?: string;
    //
    company?: string;
    //
    job_title?: string;
    created_on?: Date;
}

@Injectable({
    providedIn: 'root',
})
export class ContactsService {
    constructor() {}

    readonly #http = inject(HttpClient);
    readonly #baseUrl = inject(API_URL);

    getAllContacts(): Observable<Contact[]> {
        return this.#http.get<ContactApiModel[]>(this.#baseUrl).pipe(
            map((contacts: ContactApiModel[]): Contact[] =>
                contacts.map(
                    ({
                        first_name,
                        last_name,
                        job_title,
                        created_on,
                        ...contacts
                    }): Contact => ({
                        ...contacts,
                        firstName: first_name,
                        lastName: last_name,
                        jobTitle: job_title,
                        createdOn: created_on,
                    })
                )
            )
        );
    }

    createContact(contact: Contact): Observable<Contact> {
        return this.#http.post<Contact>(this.#baseUrl, JSON.stringify(contact));
    }

    updateContact(id: string, contact: Contact): Observable<Contact> {
        return this.#http.put<Contact>(
            `${this.#baseUrl}/${id}`,
            JSON.stringify(contact)
        );
    }

    deleteContact(id: string): Observable<unknown> {
        return this.#http.delete(`${this.#baseUrl}/${id}`);
    }
}
