import React, { useState } from "react";
import styles from "./ContactsList.module.css";
import ContactItem from "./ContactItem";

import { useSelector } from "react-redux";
import { State, Contact } from "../helpers/types";

type ContactListProps = {
  filter?: string;
  onEditContactHandler(contact: Contact): void;
};

const ContactsList: React.FC<ContactListProps> = ({
  filter = "", onEditContactHandler
}: ContactListProps) => {


  const contacts: Contact[] = useSelector<State, Contact[]>(state => state.contacts ? state.contacts : []);

  const filteredContacts = contacts.filter(c => (c.name.indexOf(filter) !== -1 || c.phone.indexOf(filter) !== -1));

  return (
    <div className={styles["contact-list"]}>
      {filteredContacts.length === 0 && <p>No contacts found</p>}
      {filteredContacts.length > 0 &&
        filteredContacts.map((c: Contact) => <ContactItem key={c.contactId} contactInfo={c} onContactEditHandler={onEditContactHandler} />)
      }
    </div>
  );
};

export default ContactsList;
