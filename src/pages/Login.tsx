
import React, { ChangeEvent, FormEvent, ChangeEventHandler, FormEventHandler, useState, useEffect } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Action, Contact, User } from '../helpers/types';
import { useDispatch } from "react-redux";

const mainUrl = 'https://my-json-server.typicode.com/mybzgit/test-json-server/';

const Login: React.FC = () => {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [bothFilled, setBothFilled] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBothFilled(username.trim().length !== 0 && password.trim().length !== 0);
    }, 500);
    return () => {
      clearTimeout(timeout);
    }
  }, [username, password]);


  const userNameChangeHandler: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => setUserName(e.target.value);
  const passwordChangeHandler: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => setPassword(e.target.value);

  const getContactsByUserId = async (id: string = "") => {
    const url: string = `${mainUrl}contacts?userId=${id}`;

    let contacts: Contact[] = [];
    let response = await axios.get<Contact[]>(url);
    if (response.data.length) {
      contacts = [...response.data];
    }
    return contacts;
  }

  const getExistedUser = async () => {
    const url: string = `${mainUrl}users?name${username}&password=${password}`;

    let users = await axios.get<User[]>(url);
    if (users.data.length) {
      return {
        id: users.data[0].userId,
        name: users.data[0].name
      }
    }
    else
      return {
        id: 0,
        name: ""
      };
  }

  const onSignInHandler: FormEventHandler<HTMLFormElement> = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotFound(false);

    let contacts: Contact[] = [];
    let { id, name } = await getExistedUser();
    if (id || name) {
      contacts = await getContactsByUserId(id.toString());
      const action: Action = {
        type: 'SET_CURRENT_USER', user: {
          id: id,
          name: name,
          contacts: contacts
        }
      };
      dispatch(action);
      navigate("/mycontacts", { replace: true });
    }
    else {
      setUserName("");
      setPassword("");
      setNotFound(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Welcome!</div>
      <div className={styles.tip}>Please login with your credentials:</div>

      <form onSubmit={(e) => onSignInHandler(e)}>
        <label htmlFor="username">Name:</label>
        <input
          id="username"
          value={username}
          onChange={(e) => userNameChangeHandler(e)}></input>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password" value={password}
          onChange={(e) => passwordChangeHandler(e)}
        ></input>
        <button className={styles.signin} type="submit" disabled={!bothFilled}>
          Sign in
        </button>
      </form>
      
      {notFound && (
        <div className={styles.notfound}>
          Name or password are incorrect. Try again.
        </div>
      )}
    </div>
  );
};

export default Login;
