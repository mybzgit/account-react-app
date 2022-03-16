import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Contact.module.css";

type ContactProps = {
  info?: string;
};

const Contact: React.FC<ContactProps> = ({ info = "" }: ContactProps) => {

  const navigate = useNavigate();
  const onEditClick = () => {
    navigate(`/mycontacts/${info}`, { replace: false });
  };

  return (
    <div className={styles.contact}>
      <div className={styles.info}>{info}</div>
      <button type="button" onClick={() => onEditClick()}>
        Edit
      </button>
      <button type="button" className={styles.delete}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
