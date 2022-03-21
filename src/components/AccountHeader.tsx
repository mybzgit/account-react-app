import React from "react";
import styles from "./AccountHeader.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Action, State } from "../helpers/types";

const AccountHeader: React.FC = () => {
  const dispatch = useDispatch();
  
  const onSignOutHandler = () => {
    const action: Action = { type: 'SET_CURRENT_USER', user: {
      id: 0,
      name: "",
      contacts: []
    }};
    dispatch(action);
  };
  const userName: string | undefined = useSelector<State, string | undefined>(state => state?.currentUserName);
  return (
    <header className={styles.header}>
      <div className={styles.title}>My Contacts</div>
      <div>Hello, {userName}!</div>
      <button type="button" onClick={() => onSignOutHandler()}>
        Sign out
      </button>
    </header>
  );
};

export default AccountHeader;
