import React, { Fragment } from 'react';
import styles from './LoginHeader.module.css';

const LoginHeader: React.FC = () => {
    return (
        <Fragment>
            <div className={styles.title}>Welcome!</div>
            <div className={styles.tip}>
                Please login with your credentials:
            </div>
        </Fragment>
    );
};

export default LoginHeader;
