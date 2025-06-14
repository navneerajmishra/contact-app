/* export type PhoneNumber = {
    number: string;
    country_code?: string;
    extension?: string;
}; */

//export type ContactId = string;

export type Contact = {
    id: string;
    // req, min
    phone: string; // TODO: Could be of type PhoneNumber
    // req, 
    firstName: string;
    // 
    lastName?: string; // A person may not have last name
    // url only
    avatar?: string;
    // email pattern
    email?: string;
    // 
    company?: string;
    // 
    jobTitle?: string; 
    createdOn?: Date;
};
