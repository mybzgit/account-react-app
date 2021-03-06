import React, {
    ChangeEvent,
    ChangeEventHandler,
    FormEvent,
    FormEventHandler,
    useCallback,
    useEffect,
    useState,
} from 'react';
import styles from './LoginForm.module.css';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Action, Contact, User } from '../../helpers/types';

const mainUrl = 'https://my-json-server.typicode.com/mybzgit/test-json-server/';

const LoginForm: React.FC = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [bothFilled, setBothFilled] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setBothFilled(
                username.trim().length !== 0 && password.trim().length !== 0
            );
        }, 200);
        return () => {
            clearTimeout(timeout);
        };
    }, [username, password]);

    const userNameChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback((
        e: ChangeEvent<HTMLInputElement>
    ) => setUserName(e.target.value), []);
    const passwordChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback((
        e: ChangeEvent<HTMLInputElement>
    ) => setPassword(e.target.value), []);

    const getContactsByUserId = useCallback(async (id: string = '') => {
        const url: string = `${mainUrl}contacts?userId=${id}`;

        let contacts: Contact[] = [];
        try {
            let response = await axios.get<Contact[]>(url);
            if (response.data.length) {
                contacts = [...response.data];
            }
        } catch (error) {
            const err = error as AxiosError;
            setError(err.message);
            throw err;
        }

        return contacts;
    }, []);

    const getExistedUser = useCallback(async () => {
        const url: string = `${mainUrl}users?name${username}&password=${password}`;

        let users = await axios.get<User[]>(url);
        if (users.data.length) {
            return {
                id: users.data[0].userId,
                name: users.data[0].name,
            };
        } else
            return {
                id: 0,
                name: '',
            };
    }, [username, password, mainUrl]);

    const onSignInHandler: FormEventHandler<HTMLFormElement> = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setNotFound(false);

        let contacts: Contact[] = [];
        let { id, name } = await getExistedUser();
        if (id || name) {
            contacts = await getContactsByUserId(id.toString());
            const action: Action = {
                type: 'SET_CURRENT_USER',
                userPayload: {
                    id: id,
                    name: name,
                    contacts: contacts,
                },
            };
            dispatch(action);
            navigate('/mycontacts', { replace: true });
        } else {
            setUserName('');
            setPassword('');
            setNotFound(true);
            setError('');
        }
    };

    return (
        <form onSubmit={(e) => onSignInHandler(e)}>
            <label htmlFor="username">Name:</label>
            <input
                id="username"
                value={username}
                onChange={(e) => userNameChangeHandler(e)}></input>
            <label htmlFor="password">Password:</label>
            <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => passwordChangeHandler(e)}></input>
            <button
                className={styles.signin}
                type="submit"
                disabled={!bothFilled}>
                Sign in
            </button>

            {notFound && (
                <div className={styles.notfound}>
                    Name or password are incorrect. Try again.
                </div>
            )}
            {error && <div className={styles.notfound}>{error}</div>}
        </form>
    );
};

export default LoginForm;
