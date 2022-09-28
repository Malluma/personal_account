import React from 'react';
import LoginForm from './components/loginForm/LoginForm';
import Contacts from './components/contacts/Contacts';
import { useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import './App.css';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { loadContacts } from './app/reducers/contactsSlice';


function App() {
  
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  
  function loadContactsFromDB() {
    fetch(`http://localhost:3001/contacts`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => dispatch(loadContacts(json)))
      .catch((error) => console.error("error", error));
  }

  useEffect(() => {
    loadContactsFromDB();
  }, []);

  return (
      <div className="App">
        <Routes>
          <Route path='/' element={<LoginForm />} />
          {isAuth && <Route path='/contacts' element={<Contacts />} />}
        </Routes> 
      </div>
  );
}

export default App;
