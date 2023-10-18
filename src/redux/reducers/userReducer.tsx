import { Reducer } from 'redux';
import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/userActionTypes';
import { IUser as User } from '../../models/user';

export interface IUsersState {
    users: User[];
    // loading: boolean;
    // error: String | null,
}
const initialState = {
    users: [],
    loading: false,
    error: null,   
};
export const UserReducer: Reducer<IUsersState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_USER:
        case ActionType.FETCH_USERS:
        case ActionType.ADD_USER:
        case ActionType.EDIT_USER:
        case ActionType.DELETE_USER:
            return { ...state, loading: true };

        case ActionType.FETCH_USER_FAIL:
        case ActionType.FETCH_USERS_FAIL:
        case ActionType.ADD_USER_FAIL:
        case ActionType.EDIT_USER_FAIL:
        case ActionType.DELETE_USER_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.FETCH_USER_SUCCESS:
        case ActionType.ADD_USER_SUCCESS:
            // const { id } = action.payload;[id]: 
            return {
                ...state,
                users: [ ...state.users, action.payload ],
                loading: false
            };

        case ActionType.FETCH_USERS_SUCCESS:
            // console.log('====Users: ', action.payload)
            return {
                ...state,
                users: action.payload,
                loading: false
            };
            //[ ...state.users, ..._.mapKeys(action.payload, 'id')]

        case ActionType.EDIT_USER_SUCCESS:
            const user: User = action.payload
            const index = state.users.findIndex(itm => itm.id === user.id)
            const usersPart1 = state.users.slice(0, index)
            const usersPart2 = state.users.slice(index + 1)
            return {
                ...state,
                users: [ ...usersPart1, user, ...usersPart2 ],
                loading: false
            };
        case ActionType.DELETE_USER_SUCCESS:
            return {
                ...state,
                users: [ ..._.omit(state.users, action.payload) ]
            };

        default:
            return state;
    }
};
