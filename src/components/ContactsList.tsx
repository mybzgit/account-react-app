import React, { useState } from "react";
import styles from "./ContactsList.module.css";
import Contact from "./Contact";

const ContactsList: React.FC = () => {
  const [contacts, setContacts] = useState(["User1", "User2", "User3","User1", "User2", "User3","User1", "User2", "User3"]);
  return (
    <div className={styles['contact-list']}>
      {contacts.map((c: string) => {
        return <Contact info={c} />;
      })}
    </div>
  );
};

export default ContactsList;
