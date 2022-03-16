import React from "react";
import styles from "./AccountHeader.module.css";

const AccountHeader: React.FC = () => {
  return (
    <div className={styles.header}>
      <div>Hello, 'username'!</div>
      <button type="button">Sign out</button>
    </div>
  );
};

export default AccountHeader;
