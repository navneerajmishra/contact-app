import { Contact, Phone } from '@store/model';
import { ContactApiModel } from './contacts-service';

export const mapContactResponse = (response: ContactApiModel): Contact => {
    return {
        id: response.id,
        firstName: response.first_name,
        lastName: response.last_name,
        email: response.email,
        company: response.company,
        jobTitle: response.job_title,
        createdOn: response.created_on,
        phone: getPhoneNumber(response.phone),
        avatar: response.avatar,
        // Ensure all fields are mapped correctly
    };
};

export const mapContactToResponse = (contact: Contact): ContactApiModel => {
    return {
        id: contact.id,
        first_name: contact.firstName,
        last_name: contact.lastName,
        email: contact.email,
        company: contact.company,
        job_title: contact.jobTitle,
        created_on: contact.createdOn,
        phone: `${contact.phone.number}${
            contact.phone.extension ? ' x' + contact.phone.extension : ''
        }`,
        avatar: contact.avatar,
    };
};

export const getPhoneNumber = (phoneNumberWithExtension: string): Phone => {
    const [number, extension] = phoneNumberWithExtension?.split('x');
    return {
        number: (number ?? '').trim(),
        extension: (extension ?? '').trim(),
    };
};
// This function maps the API response to a more usable format for the application.
