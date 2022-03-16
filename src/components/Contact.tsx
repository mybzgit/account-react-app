import React from "react";
import styles from "./Contact.module.css";

type ContactProps = {
  info?: string;
};

const Contact: React.FC<ContactProps> = ({ info = "" }: ContactProps) => {
  return (
    <div className={styles.contact}>
      <div className={styles.info}>{info}</div>
      <button type="button">Edit</button>
      <button type="button" className={styles.delete}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
