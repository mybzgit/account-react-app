import axios from "axios";
import { createStore, Reducer, Store } from "redux";

import { Contact, State, Action } from './types';

const initialState: State = {
    currentUserId: 0,
    currentUserName: "",
    contacts: []
}

const reducer: Reducer<State, Action> = (state: State = initialState, action: Action) => {
    if (action.type === 'SET_CURRENT_USER') {
        console.log(action)
        return {
            currentUserId: action.user!.id,
            currentUserName: action.user!.name,
            contacts: [...action.user!.contacts]
        }
    }

    if (action.type === 'ADD_CONTACT') {
        return {
            currentUserId: state.currentUserId,
            currentUserName: state.currentUserName,
            contacts: [...state.contacts!, action.contact!]
        }
    }
    if (action.type === 'UPDATE_CONTACT') {
        const contact = state.contacts!.find(c => c.contactId === action.contact!.contactId);
        if (contact) {
            contact.name = action.contact!.name;
            contact.phone = action.contact!.phone;
        }
        return {
            currentUserId: state.currentUserId,
            currentUserName: state.currentUserName,
            contacts: [...state.contacts!]
        }
    }
    if (action.type === 'DELETE_CONTACT') {
        return {
            currentUserId: state.currentUserId,
            currentUserName: state.currentUserName,
            contacts: [...state.contacts!.filter(c => c.contactId !== action.contact!.contactId)]
        }
    }

    return state;
}

const store: Store<State, Action> = createStore(reducer);

export default store;