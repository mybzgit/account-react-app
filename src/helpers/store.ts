import { createStore, Reducer, Store } from 'redux';

import { State, Action } from './types';

const initialState: State = {
    currentUserId: 0,
    currentUserName: '',
    currentUserContacts: [],
};

const reducer: Reducer<State, Action> = (
    state: State = initialState,
    action: Action
) => {
    if (action.type === 'SET_CURRENT_USER') {
        return {
            currentUserId: action.userPayload!.id,
            currentUserName: action.userPayload!.name,
            currentUserContacts: [...action.userPayload!.contacts],
        };
    }

    if (action.type === 'ADD_CONTACT') {
        return {
            currentUserId: state.currentUserId,
            currentUserName: state.currentUserName,
            currentUserContacts: [
                action.contactPayload!,
                ...state.currentUserContacts!,
            ],
        };
    }
    if (action.type === 'UPDATE_CONTACT') {
        const contact = state.currentUserContacts!.find(
            (c) => c.contactId === action.contactPayload!.contactId
        );
        if (contact) {
            contact.name = action.contactPayload!.name;
            contact.phone = action.contactPayload!.phone;
        }
        return {
            currentUserId: state.currentUserId,
            currentUserName: state.currentUserName,
            currentUserContacts: [...state.currentUserContacts!],
        };
    }
    if (action.type === 'DELETE_CONTACT') {
        return {
            currentUserId: state.currentUserId,
            currentUserName: state.currentUserName,
            currentUserContacts: [
                ...state.currentUserContacts!.filter(
                    (c) => c.contactId !== action.contactPayload!.contactId
                ),
            ],
        };
    }

    return state;
};

const store: Store<State, Action> = createStore(reducer);

export default store;
