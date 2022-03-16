import React from "react";
import "./Contact.css";

type ContactProps = {
  info?: string;
};

const Contact: React.FC<ContactProps> = ({ info = "" }: ContactProps) => {
  return (
    <div className="contact">
      <div className="info">{info}</div>
      <button type="button">Edit</button>
      <button type="button" className="delete">
        Delete
      </button>
    </div>
  );
};

export default Contact;
