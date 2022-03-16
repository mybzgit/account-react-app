import React, { ChangeEvent, ChangeEventHandler, EventHandler, MouseEventHandler, useState } from "react";
import styles from "./Account.module.css";
import AccountHeader from "../components/AccountHeader";
import ContactsList from "../components/ContactsList";
import { Route, Routes, useNavigate } from "react-router-dom";
import EditForm from "../components/EditForm";

const Account: React.FC = () => {
  const navigate = useNavigate();
  const onAddNewContactHandler = () => {    
    navigate("/mycontacts/newcontact");
  }

  const onSearchHandler: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setTimeout(() => {
      setFilter(e.target.value);
    }, 2000);  
  };

  const [filter, setFilter] = useState("");

  return (
    <div>
      <AccountHeader />
      <div className={styles["main-container"]}>
        <input className={styles.search} placeholder="Type to search..." onChange={(e) => onSearchHandler(e)} />
        <ContactsList filter={filter} />
        <div className={styles["bottom-bar"]}>
          <button type="button" onClick={() => onAddNewContactHandler()}>Add contact</button>
        </div>
      </div>
      <Routes>
        <Route path="/mycontacts/newcontact" element={<EditForm />} />
        <Route path=":contactId" element={<EditForm />} />
      </Routes>
    </div>
  );
};

export default Account;
