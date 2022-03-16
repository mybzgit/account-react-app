import axios from "axios";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

type User = {
  userid: string;
  name: string;
  password: string;
};

const Login: React.FC = () => {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const url: string = `https://my-json-server.typicode.com/mybzgit/test-json-server/users?name${username}&password=${password}`;

  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const userNameChangeHandler: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => setUserName(e.target.value);
  const passwordChangeHandler: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => setPassword(e.target.value);

  const onSignInHandler = () => {
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
      <input id="username" onChange={(e) => userNameChangeHandler(e)}></input>
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        onChange={(e) => passwordChangeHandler(e)}
      ></input>
      <button className={styles.signin} type="button" onClick={() => onSignInHandler()}>
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
