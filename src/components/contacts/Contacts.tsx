import styles from "./Contacts.module.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addContact, delContact } from "../../app/reducers/contactsSlice";
import React, { MouseEvent, useState, useRef } from "react";
import { ReactComponent as Plus } from "../../assets/plus-icon.svg";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import MaskedInput from 'react-text-mask';
import Contact from "../contact/Contact";

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
          <input
            className={`${styles.input} ${styles.searchInput}`}
            name="contactsSearch"
            type="text"
            placeholder="Поиск"
            value={searchText}
            onChange={(e) => handleSearchTextChange(e)}
          ></input>
          <div className={styles.searchIcon}>
            <SearchIcon /> 
          </div>
        </div>
        <div className={styles.newContactWrapper}>
          <input
            className={`${styles.input} ${styles.input_add}`}
            name="contactName"
            type="text"
            placeholder="Новый контакт"
            value={newContactName}
            onChange={(e) => handleNewContactNameChange(e)}
          ></input>
          <MaskedInput
            className={`${styles.input} ${styles.input_add}`}
            name="contactPhone"
            type="tel"
            placeholder="8 (999) 999-99-99"
            mask={[/(8|7|\+7)/, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
            value={newContactPhone}
            onChange={(e) => handleNewContactPhoneChange(e)}
          ></MaskedInput>
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
          <Contact key ={el.id} id={el.id} name={el.name} phone={el.phone} />
        );})}
      </div>
      <div></div>
    </form>
  );
}

export default Contacts;
