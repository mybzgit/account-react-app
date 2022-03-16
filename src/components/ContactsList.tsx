import React, { useState } from "react";
import styles from "./ContactsList.module.css";
import Contact from "./Contact";
import { useSearchParams } from "react-router-dom";

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

  return (
    <div className={styles["contact-list"]}>
      {contacts
        .filter((c) => c.indexOf(filter) !== -1)
        .map((c: string) => {
          return <Contact key={c} info={c} />;
        })}
    </div>
  );
};

export default ContactsList;
