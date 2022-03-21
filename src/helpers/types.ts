export type User = {
    userId: number;
    name: string;
    password: string;
};

export type Contact = {
    contactId: number;
    name: string;
    phone: string;
    userId: number;
}

export type State = {
    currentUserId: number | undefined;
    currentUserName: string | undefined;
    contacts: Contact[] | undefined;
};

export type Action = {
    type: string;
    user?: { id: number, name: string, contacts: Contact[] };
    contact?: Contact;
}