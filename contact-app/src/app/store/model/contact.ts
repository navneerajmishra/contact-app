export type Phone = {
    number: string;
    extension: string;
};

export type Contact = {
    id: string | null; // null only before creating a new contact
    phone: Phone;
    firstName: string;
    lastName?: string;
    avatar?: string;
    email?: string;
    company?: string;
    jobTitle?: string;
    createdOn?: Date;
};
