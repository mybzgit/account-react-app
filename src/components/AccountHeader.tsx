import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AccountHeader.module.css";

const AccountHeader: React.FC = () => {

  const navigate = useNavigate();
  const SignOut = () => {
    navigate("/");
  };
  return (
    <div className={styles.header}>
      <div className={styles.title}>My Contacts List</div>
      <div>Hello, 'username'!</div>
      <button type="button" onClick={() => SignOut()}>
        Sign out
      </button>
    </div>
  );
};

export default AccountHeader;
