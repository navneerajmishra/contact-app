/* export type PhoneNumber = {
    number: string;
    country_code?: string;
    extension?: string;
}; */

//export type ContactId = string;

export type Phone = {
    number: string;
    extension: string;
};

export type Contact = {
    id: string;
    phone: Phone;
    firstName: string;
    lastName?: string;
    avatar?: string;
    email?: string;
    company?: string;
    jobTitle?: string; 
    createdOn?: Date;
};
