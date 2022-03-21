import React, { ChangeEvent, ChangeEventHandler, Fragment, useState } from "react";
import styles from "./PopupEditForm.module.css";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Contact, State } from "../helpers/types";

type EditFormProps = {
  info: Contact;
  onCloseHandler(): void;
}

const PopupEditForm: React.FC<EditFormProps> = ({ info, onCloseHandler }: EditFormProps) => {
  const dispatch = useDispatch();

  const [contactName, setContactName] = useState(info.name);
  const [contactPhone, setcontactPhone] = useState(info.phone);

  const isNew: boolean = (!info.contactId);

  const onNameChangeHandler: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setContactName(e.target.value);
  };
  const onPhoneChangeHandler: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setcontactPhone(e.target.value);
  };

  const userId: number | undefined = useSelector<State, number | undefined>(state => state?.currentUserId);

  const onSaveHandler = () => {  
    const action = {
      type: isNew ? "ADD_CONTACT" : "UPDATE_CONTACT",
      contact: { 
        contactId: isNew ? Math.random() : info.contactId, name: contactName, phone: contactPhone, userId: userId  }
    };
    dispatch(action);
    onCloseHandler();
  };

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={styles.modal}>
          <div className={styles["edit-form"]}>
            <header>{isNew ? "Add new contact" : "Edit contact"}</header>
            <label htmlFor="contactInfo">
              Name:
            </label>
            <input
              className={styles.info}
              id="contactInfo"
              value={contactName}
              onChange={(e) => onNameChangeHandler(e)}
            ></input>
            <label htmlFor="phone">
              Phone:
            </label>
            <input
              className={styles.info}
              id="phone"
              value={contactPhone}
              onChange={(e) => onPhoneChangeHandler(e)}
            ></input>
            <div className={styles.buttons}>
              <button type="button" onClick={() => onSaveHandler()}>
                Save
              </button>
              <button type="button" onClick={() => onCloseHandler()}>
                Cancel
              </button>
            </div>

          </div>
        </div>
        , document.getElementById("modal")!)}
    </Fragment>
  );
};

export default PopupEditForm;
