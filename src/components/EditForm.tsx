import React, { ChangeEvent, ChangeEventHandler } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditForm.module.css";

const EditForm: React.FC = () => {
  const params = useParams();
  const info = params.contactId === "newcontact" ? "" : params.contactId;
  const navigate = useNavigate();

  const onChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    //setInfo(e.target.value);
  };

  const onSave = () => {
    navigate("/mycontacts");
  };
  const onCancel = () => {
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
          onChange={(e) => onChange(e)}
        ></input>
        <button type="button" onClick={() => onSave()}>
          Save
        </button>
        <button type="button" onClick={() => onCancel()}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditForm;
