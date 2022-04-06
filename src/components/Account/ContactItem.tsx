import React, { useCallback } from 'react';
import styles from './ContactItem.module.css';
import { useDispatch } from 'react-redux';
import { Action, Contact } from '../../helpers/types';

type ContactProps = {
    contactInfo: Contact;
    onContactEditHandler: (info: Contact) => void;
};

const ContactItem: React.FC<ContactProps> = ({
    contactInfo,
    onContactEditHandler,
}: ContactProps) => {
    const dispatch = useDispatch();

    const onDeleteHanlder = useCallback((info: Contact) => {
        const action: Action = {
            type: 'DELETE_CONTACT',
            contactPayload: { ...info },
        };
        dispatch(action);
    }, []);

    return (
        <div className={styles.contact}>
            <div className={styles.info}>{contactInfo?.name}</div>
            <div className={styles.phone}>{contactInfo?.phone}</div>
            <div className={styles.buttons}>
                <button
                    type="button"
                    onClick={() => onContactEditHandler(contactInfo)}>
                    Edit
                </button>
                <button
                    type="button"
                    className={styles.delete}
                    onClick={() => onDeleteHanlder(contactInfo)}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ContactItem;
