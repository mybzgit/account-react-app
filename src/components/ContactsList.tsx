import React, { useState } from "react";
import styles from "./ContactsList.module.css";
import Contact from "./Contact";

type ContactListProps = {
  filter?: string;
};

const ContactsList: React.FC<ContactListProps> = ({
  filter = "",
}: ContactListProps) => {

  const [contacts, setContacts] = useState([
    "User1",
    "User2",
    "User3",
    "User5",
    "User6",
    "User7",
  ]);

  const filteredContacts = contacts.filter(c => c.indexOf(filter) !== -1);

  return (
    <div className={styles["contact-list"]}>
      {filteredContacts.length === 0 && <p>No contacts found</p>}
      {filteredContacts.length > 0 &&
        filteredContacts.map((c: string) => <Contact key={c} info={c} />)
      }
    </div>
  );
};

export default ContactsList;
