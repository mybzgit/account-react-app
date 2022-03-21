import React from "react";
import { useDispatch } from "react-redux";
import { Contact } from "../helpers/types";
import styles from "./ContactItem.module.css";

type ContactProps = {
  info: Contact;
  onContactEditHandler(info: Contact): void;
};

const ContactItem: React.FC<ContactProps> = ({ info, onContactEditHandler }: ContactProps) => {

  const dispatch = useDispatch();

  const onDeleteHanlder = (info: Contact) => {
    const action = {
      type: "DELETE_CONTACT",
      contact: { ...info}
    };
    dispatch(action);
  }

  return (
    <div className={styles.contact}>
      <div className={styles.info}>{info?.name}</div>
      <div className={styles.info}>{info?.phone}</div>
      <button type="button" onClick={() => onContactEditHandler(info)}>
        Edit
      </button>
      <button type="button" className={styles.delete} onClick={() => onDeleteHanlder(info)}>
        Delete
      </button>
    </div>
  );
};

export default ContactItem;
