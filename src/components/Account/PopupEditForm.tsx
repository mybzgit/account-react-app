import React, {
    ChangeEvent,
    ChangeEventHandler,
    Fragment,
    useCallback,
    useEffect,
    useState,
} from 'react';
import styles from './PopupEditForm.module.css';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Action, Contact, State } from '../../helpers/types';

type EditFormProps = {
    info: Contact;
    onCloseHandler: () => void;
};

const PopupEditForm: React.FC<EditFormProps> = ({
    info,
    onCloseHandler,
}: EditFormProps) => {
    const dispatch = useDispatch();

    const [contactName, setContactName] = useState(info.name);
    const [contactPhone, setcontactPhone] = useState(info.phone);
    const [bothFilled, setBothFilled] = useState(false);
    const userId: number = useSelector<State, number>(
        (state) => state.currentUserId
    );
    const isNew: boolean = !info.userId;

    const onNameChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback((
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setContactName(e.target.value);
    }, []);
    const onPhoneChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback((
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setcontactPhone(e.target.value);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setBothFilled(
                contactName.trim().length !== 0 &&
                    contactPhone.trim().length !== 0
            );
        }, 200);
        return () => {
            clearTimeout(timeout);
        };
    }, [contactName, contactPhone]);

    const onSaveHandler = useCallback(() => {
        const contact = new Contact(contactName, contactPhone, userId);
        if (!isNew) {
            contact.contactId = info.contactId;
        }
        const action: Action = {
            type: isNew ? 'ADD_CONTACT' : 'UPDATE_CONTACT',
            contactPayload: contact,
        };
        dispatch(action);
        onCloseHandler();
    }, [contactName, contactPhone, userId]);

    return (
        <Fragment>
            {ReactDOM.createPortal(
                <div className={styles.modal}>
                    <div className={styles['edit-form']}>
                        <header>
                            {isNew ? 'ADD NEW CONTACT' : 'EDIT CONTACT'}
                        </header>
                        <label htmlFor="contactInfo">Name:</label>
                        <input
                            className={styles.info}
                            id="contactInfo"
                            value={contactName}
                            onChange={(e) => onNameChangeHandler(e)}></input>
                        <label htmlFor="phone">Phone:</label>
                        <input
                            className={styles.info}
                            id="phone"
                            value={contactPhone}
                            onChange={(e) => onPhoneChangeHandler(e)}></input>
                        <div className={styles.buttons}>
                            <button
                                type="button"
                                onClick={() => onSaveHandler()}
                                disabled={!bothFilled}>
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => onCloseHandler()}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>,
                document.getElementById('modal')!
            )}
        </Fragment>
    );
};

export default React.memo(PopupEditForm);
