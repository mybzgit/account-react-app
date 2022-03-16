import axios from "axios";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

type User = {
  userid: string;
  name: string;
  password: string;
};

const Login: React.FC = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const usernameChanged: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => setUserName(e.target.value);
  const passwordChanged: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => setPassword(e.target.value);

  const url: string = `https://my-json-server.typicode.com/mybzgit/test-json-server/users?name${username}&password=${password}`;
  const SignIn = () => {
    setVisible(false);
    axios.get<User[]>(url).then((response) => {
      if (response.data.length) {
        navigate("/mycontacts", { replace: true });
      } else {
        setUserName("");
        setPassword("");
        setVisible(true);
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Welcome!</div>
      <div className={styles.tip}>Please login with your credentials:</div>
      <label htmlFor="username">Name:</label>
      <input id="username" onChange={(e) => usernameChanged(e)}></input>
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        onChange={(e) => passwordChanged(e)}
      ></input>
      <button className={styles.signin} type="button" onClick={() => SignIn()}>
        Sign in
      </button>
      {visible && (
        <div className={styles.notfound}>
          Name or password are incorrect. Try again.
        </div>
      )}
    </div>
  );
};

export default Login;
