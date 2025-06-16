import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL } from '../../../api-url';
import { Contact, Phone } from '../../../store/model/contact';
import { Observable, map } from 'rxjs';

interface ContactApiModel {
    id: string;
    phone: string;
    first_name: string;
    last_name?: string;
    avatar?: string;
    email?: string;
    company?: string;
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
                        phone,
                        ...contacts
                    }): Contact => ({
                        ...contacts,
                        firstName: first_name,
                        lastName: last_name,
                        jobTitle: job_title,
                        createdOn: created_on,
                        phone: this.getPhoneNumber(phone)
                    })
                )
            )
        );
    }

    createContact(contact: ContactApiModel): Observable<Contact> {
        return this.#http.post<ContactApiModel>(this.#baseUrl, JSON.stringify(contact)).pipe(
            map((createdContact: ContactApiModel): Contact => ({
                ...createdContact,
                firstName: createdContact.first_name,
                lastName: createdContact.last_name,
                jobTitle: createdContact.job_title,
                createdOn: createdContact.created_on,
                phone: this.getPhoneNumber(createdContact.phone),
            })));
    }

    updateContact(id: string, contact: ContactApiModel): Observable<Contact> {
        return this.#http.put<ContactApiModel>(
            `${this.#baseUrl}/${id}`,
            JSON.stringify(contact)
        ).pipe(
            map((updatedContact: ContactApiModel): Contact => ({
                ...updatedContact,
                firstName: updatedContact.first_name,
                lastName: updatedContact.last_name,
                jobTitle: updatedContact.job_title,
                createdOn: updatedContact.created_on,
                phone: this.getPhoneNumber(updatedContact.phone),
            }))
        );
    }

    deleteContact(id: string): Observable<Contact> {
        return this.#http.delete<ContactApiModel>(`${this.#baseUrl}/${id}`).pipe(
            map((deletedContact: ContactApiModel): Contact => ({
                ...deletedContact,
                firstName: deletedContact.first_name,
                lastName: deletedContact.last_name,
                jobTitle: deletedContact.job_title,
                createdOn: deletedContact.created_on,
                phone: this.getPhoneNumber(deletedContact.phone),
            })),
        );
    }

    getPhoneNumber(phoneNumberWithExtension: string): Phone {
        const [number, extension] = phoneNumberWithExtension?.split('x');
        return {
            number: (number ?? '').trim(),
            extension: (extension ?? '').trim(),
        }
    }
}
