import React, { useState } from "react";
import "./ContactsList.css";
import Contact from "./Contact";

const ContactsList: React.FC = () => {
  const [contacts, setContacts] = useState(["User1", "User2", "User3","User1", "User2", "User3","User1", "User2", "User3"]);
  return (
    <div className="contact-list">
      {contacts.map((c: string) => {
        return <Contact info={c} />;
      })}
    </div>
  );
};

export default ContactsList;
