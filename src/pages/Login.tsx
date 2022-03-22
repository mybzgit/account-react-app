import React from 'react';
import styles from './Login.module.css';
import LoginHeader from '../components/Login/LoginHeader';
import LoginForm from '../components/Login/LoginForm';

const Login: React.FC = () => {
    return (
        <div className={styles.container}>
            <LoginHeader />
            <LoginForm />
        </div>
    );
};

export default Login;
