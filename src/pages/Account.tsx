import React from "react";
import styles from "./Account.module.css";
import AccountHeader from "../components/AccountHeader";
import ContactsList from "../components/ContactsList";

const Account: React.FC = () => {
  return (
    <div>
      <AccountHeader />
      <div className={styles['main-container']}>
        <input className={styles.search} placeholder="Type to search..." />
        <ContactsList />
        <div className={styles['bottom-bar']}>
          <button type="button">Add contact</button>
        </div>
      </div>
    </div>
  );
};

export default Account;
