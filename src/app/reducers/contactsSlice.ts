import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IContact {
  id: string;
  name:string;
  phone: string;
}

export interface IContacts {
  contacts: IContact[];
}

const initialState: IContacts = {
  contacts:[]
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<{ name: string, phone: string }>) => {
      state.contacts.push({id: new Date().toISOString(), name: action.payload.name, phone: action.payload.phone });
    },
    delContact: (state, action: PayloadAction<{ id: string }>) => {

      let indexToDelete: number = -1;
      state.contacts.find((contact, index) => {
        if (contact.id === action.payload.id) {
          indexToDelete = index;
        }
        return contact.id === action.payload.id;
      })
      state.contacts.splice(indexToDelete, 1);
  
    },
    loadContacts: (state, action: PayloadAction<any>) => {
      state.contacts = [];
      const contactsJSON = action.payload;
      for (const i in contactsJSON){
        const {id, name, phone } = contactsJSON[i];
        state.contacts.push({ id: id, name: name, phone: phone });
      }
    },
  },
});

export const { loadContacts, addContact, delContact } = contactsSlice.actions;

export default contactsSlice.reducer;
