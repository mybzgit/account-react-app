import React, { ChangeEvent, ChangeEventHandler, Fragment, useEffect, useState } from "react";
import styles from "./Account.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { State, Contact } from "../helpers/types";
import AccountHeader from "../components/AccountHeader";
import ContactsList from "../components/ContactsList";
import PopupEditForm from "../components/PopupEditForm";

const Account: React.FC = () => {
  const navigate = useNavigate();

  const [editedContact, setEditedContact] = useState({ contactId: 0, name: "", phone: "", userId: 0 });
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [filter, setFilter] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const onAddNewContactHandler = () => {
    setEditedContact({ contactId: 0, name: "", phone: "", userId: 0 });
    setEditFormVisible(true);
  }
  const onContactEditHandler = (contact: Contact) => {
    setEditedContact({ ...contact });
    setEditFormVisible(true);
  }
  const onEditFormCloseHandler = () => {
    setEditFormVisible(false);
  }

  const onSearchHandler: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(e.target.value);
  };


  const userName: string | undefined = useSelector<State, string | undefined>(state => state?.currentUserName);

  useEffect(() => {
    if (userName === "") {
      navigate("/");
    }
  }, [userName]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilter(searchValue);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    }
  }, [searchValue]);


  return (
    <Fragment>
      <AccountHeader />
      <div className={styles["main-container"]}>
        <input className={styles.search} placeholder="Type to search..."
          onChange={(e) => onSearchHandler(e)} />

        <ContactsList filter={filter} onEditContactHandler={onContactEditHandler} />

        <div className={styles["bottom-bar"]}>
          <button type="button" onClick={() => onAddNewContactHandler()}>Add contact</button>
        </div>
      </div>

      {editFormVisible && <PopupEditForm info={editedContact} onCloseHandler={onEditFormCloseHandler} />}
    </Fragment>
  );
};

export default Account;
