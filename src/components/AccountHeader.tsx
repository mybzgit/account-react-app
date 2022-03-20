import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AccountHeader.module.css";

const AccountHeader: React.FC = () => {

  const navigate = useNavigate();
  const onSignOutHandler = () => {
    navigate("/");
  };
  return (
    <header className={styles.header}>
      <div className={styles.title}>My Contacts</div>
      <div>Hello, 'username'!</div>
      <button type="button" onClick={() => onSignOutHandler()}>
        Sign out
      </button>
    </header>
  );
};

export default AccountHeader;
