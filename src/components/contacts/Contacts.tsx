import styles from "./Contacts.module.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addContact, delContact } from "../../app/reducers/contactsSlice";
import React, { MouseEvent, useState } from "react";
import { ReactComponent as Plus } from "../../assets/plus-icon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete-icon.svg";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import { ReactComponent as EditIcon } from "../../assets/edit-icon.svg";
import { ReactComponent as SaveIcon } from "../../assets/save-icon.svg";
import Input from "../common/input/Input";

function Contacts() {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contacts.contacts);
  
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [searchText, setSearchText] = useState("");

  function handlePlusBtnClick(event: MouseEvent): void {
    event.preventDefault();
    dispatch(addContact({ name: newContactName, phone: newContactPhone }));
    cleanLocalContactData();
  }

  function handleDeleteBtnClick(event: MouseEvent, contactId: string): void {
    event.preventDefault();
    dispatch(delContact({ id: contactId}));
  }

  function cleanLocalContactData() {
    setNewContactName((newContactName) => (newContactName = ""));
    setNewContactPhone((newContactPhone) => (newContactPhone = ""));
  }

  function handleSearchTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText((text) => (text = e.target.value));
  }

  function handleNewContactNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewContactName((newContactName) => (newContactName = e.target.value));
  }

  function handleNewContactPhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewContactPhone((newContactPhone) => (newContactPhone = e.target.value));
  }

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchText.toLowerCase()))

  return (
    <form className={styles.contacts}>
      <h2 className={styles.title}>Контакты</h2>
      <div className={styles.header}>
        <div className={styles.searchWrapper}>
          <div className={styles.searchInput}>
            <Input
              name="contactsSearch"
              type="text"
              placeholder="Поиск"
              value={searchText}
              onChange={(e) => handleSearchTextChange(e)}
            ></Input></div>
            <div className={styles.searchIcon}>
              <SearchIcon /> 
            </div>
          </div>
        <div className={styles.newContactWrapper}>
          <div className={styles.input}>
            <Input
              name="contactName"
              type="text"
              placeholder="Новый контакт"
              value={newContactName}
              onChange={(e) => handleNewContactNameChange(e)}
            ></Input>
          </div>
          <div className={styles.input}>
            <Input
              name="contactPhone"
              type="tel"
              placeholder="+7 999 999 9999"
              value={newContactPhone}
              onChange={(e) => handleNewContactPhoneChange(e)}
            ></Input>
          </div>
          <button
            className={styles.iconBtn}
            onClick={(e) => handlePlusBtnClick(e)}>
            <Plus />
          </button>
        </div>
      </div>
    <div>
      {filteredContacts.map((el, index) => {
        return (
          <div key={index} className={styles.contactWrapper}>
            <div className={styles.contact}>
              <input className={styles.contactName}
                type="text"
                value={el.name}
                disabled
                //onChange={(e) => handleNewContactPhoneChange(e)}
              ></input>
              <div className={styles.contactPhone}>
                {el.phone}
              </div>
            </div>
            <div>
              <button
                  className={`${styles.iconBtn} ${styles.contactEditBtn}`}
                  onClick={(e) => handleDeleteBtnClick(e, el.id)}>
                <EditIcon /> 
              </button>
              <button
                  className={`${styles.iconBtn} ${styles.contactEditBtn}`}
                  onClick={(e) => handleDeleteBtnClick(e, el.id)}>
                <SaveIcon /> 
              </button>
              <button
                  className={`${styles.iconBtn} ${styles.contactEditBtn} ${styles.deleteBtn}`}
                  onClick={(e) => handleDeleteBtnClick(e, el.id)}>
                <DeleteIcon /> 
              </button>
            </div>
          </div>
        );
        })}
      </div>
      <div></div>
    </form>
  );
}

export default Contacts;
