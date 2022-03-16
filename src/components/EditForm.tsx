import React, { ChangeEvent, ChangeEventHandler } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditForm.module.css";

const EditForm: React.FC = () => {
  const params = useParams();
  const info = params.contactId === "newcontact" ? "" : params.contactId;
  const navigate = useNavigate();

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    //setInfo(e.target.value);
  };

  const onSaveHandler = () => {
    navigate("/mycontacts");
  };
  const onCancelHandler = () => {
    navigate("/mycontacts");
  };

  return (
    <div className={styles.modal}>
      <div className={styles["edit-form"]}>
        <label htmlFor="contactInfo">
          {info ? "Edit contact:" : "Add new contact:"}
        </label>
        <input
          className={styles.info}
          id="contactInfo"
          value={info}
          onChange={(e) => onChangeHandler(e)}
        ></input>
        <button type="button" onClick={() => onSaveHandler()}>
          Save
        </button>
        <button type="button" onClick={() => onCancelHandler()}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditForm;
