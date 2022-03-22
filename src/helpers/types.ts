export type User = {
    userId: number;
    name: string;
    password: string;
};

export class Contact {
    contactId: number;
    name: string;
    phone: string;
    userId: number;

    constructor(name: string, phone: string, userId: number) {
        this.contactId = Math.round(Math.random() * 10000);
        this.name = name;
        this.phone = phone;
        this.userId = userId;
    }
}

export type State = {
    currentUserId: number;
    currentUserName: string;
    currentUserContacts: Contact[];
};

export type Action = {
    type: string;
    userPayload?: { id: number; name: string; contacts: Contact[] };
    contactPayload?: Contact;
};
