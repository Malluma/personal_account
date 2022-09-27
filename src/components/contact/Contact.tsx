import styles from "./Contact.module.scss";
import { useAppDispatch } from "../../app/hooks";
import { delContact, editContact } from "../../app/reducers/contactsSlice";
import React, { MouseEvent, useState } from "react";
import { ReactComponent as DeleteIcon } from "../../assets/delete-icon.svg";
import { ReactComponent as EditIcon } from "../../assets/edit-icon.svg";
import { ReactComponent as SaveIcon } from "../../assets/save-icon.svg";

type ContactProps = {
  id: string;
  name: string;
  phone: string;
};

const Contact: React.FC<ContactProps> = function (props) {
  const dispatch = useAppDispatch();

  const { id, name, phone } = props;

  const [nameLocalState, setNameLocalState] = useState(name);
  const [phoneLocalState, setPhoneLocalState] = useState(phone);
  const [editMode, setEditMode] = useState(true);

  function handleDeleteBtnClick(event: MouseEvent): void {
    event.preventDefault();
    dispatch(delContact({ id }));
  }

  function handleEditBtn(event: MouseEvent) {
    event.preventDefault();
    setEditMode((state) => (state = false));
  }

  function handleSaveBtn(event: MouseEvent) {
    event.preventDefault();
    setEditMode((state) => (state = true));
    dispatch(editContact({ id, name: nameLocalState, phone: phoneLocalState }));
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNameLocalState((nameLocal) => (nameLocal = event.target.value));
  }

  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPhoneLocalState((phoneLocal) => (phoneLocal = event.target.value));
  }

  return (
    <div key={id} className={styles.contactWrapper}>
      <div className={styles.contact}>
        <input
          className={styles.contactName}
          type="text"
          value={nameLocalState}
          disabled={editMode}
          onChange={(e) => handleNameChange(e)}
        ></input>
        <input
          className={styles.contactPhone}
          type="text"
          value={phoneLocalState}
          disabled={editMode}
          onChange={(e) => handlePhoneChange(e)}
        ></input>
      </div>
      <div>
        <button
          className={`${styles.iconBtn} ${styles.contactBtn}`}
          onClick={(e) => handleEditBtn(e)}
        >
          <EditIcon />
        </button>
        <button
          className={`${styles.iconBtn} ${styles.contactBtn}`}
          onClick={(e) => handleSaveBtn(e)}
        >
          <SaveIcon />
        </button>
        <button
          className={`${styles.iconBtn} ${styles.contactBtn} ${styles.deleteBtn}`}
          onClick={(e) => handleDeleteBtnClick(e)}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default Contact;
