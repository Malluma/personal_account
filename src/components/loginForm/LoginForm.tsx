import styles from "./LoginForm.module.scss";
import Input from "../common/input/Input";
import Button from "../common/button/Button";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { login } from "../../app/reducers/authSlice";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

function LoginForm() {
  const [authData, setauthData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setauthData({ ...authData, [e.target.name]: e.target.value });
  }

  function checkLogin(registrationRecord: []) {
    if (registrationRecord && registrationRecord.length > 0) {
      dispatch(login(authData));
      navigate('./contacts');
    } 
  }

  function validateAccount(email: string, password: string) {
    fetch(`http://localhost:3001/users?email=${email}&&password=${password}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => checkLogin(json))
      .catch((error) => console.error("error", error));
  }

  function submitLogin(event: React.FormEvent<EventTarget>): void {
    event.preventDefault();
    validateAccount(authData.email, authData.password);
  }

  return (
    <form className={styles.loginForm} onSubmit={(event) => submitLogin(event)}>
      <h2 className={styles.title}>Войти</h2>
      <div className={styles.email}>
        <Input
          name="email"
          type="email"
          placeholder="email"
          value={authData.email}
          onChange={(e) => inputHandler(e)}
        ></Input>
      </div>
      <div className={styles.password}>
        <Input
          name="password"
          type="password"
          placeholder="password"
          value={authData.password}
          onChange={(e) => inputHandler(e)}
        ></Input>
      </div>
      <Button type="submit">Войти</Button>
    </form>
  );
}

export default LoginForm;
