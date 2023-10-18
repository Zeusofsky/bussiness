import { IUser as User } from '../../models/user';
// import { MultiRecordResponse } from '../actionCreators/actionResultTypes';

export enum ActionType {
    FETCH_USERS = 'FETCH_USERS',
    FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
    FETCH_USERS_FAIL = 'FETCH_USERS_FAIL',
    FETCH_USER = 'FETCH_USER',
    FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
    FETCH_USER_FAIL = 'FETCH_USER_FAIL',
    ADD_USER = 'ADD_USER',
    ADD_USER_SUCCESS = 'ADD_USER_SUCCESS',
    ADD_USER_FAIL = 'ADD_USER_FAIL',
    EDIT_USER = 'EDIT_USER',
    EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS',
    EDIT_USER_FAIL = 'EDIT_USER_FAIL',
    DELETE_USER = 'DELETE_USER',
    DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS',
    DELETE_USER_FAIL = 'DELETE_USER_FAIL'
}

export interface IFetchUsers {
    type: ActionType.FETCH_USERS;
}
export interface IFetchUsersSuccess {
    type: ActionType.FETCH_USERS_SUCCESS;
    payload: User[];
}
export interface IFetchUsersFail {
    type: ActionType.FETCH_USERS_FAIL;
    payload: string | null;
}

export interface IFetchUser {
    type: ActionType.FETCH_USER;
}
export interface IFetchUserSuccess {
    type: ActionType.FETCH_USER_SUCCESS;
    payload: User;
}
export interface IFetchUserFail {
    type: ActionType.FETCH_USER_FAIL;
    payload: String | null;
}

export interface IAddUser {
    type: ActionType.ADD_USER;
}
export interface IAddUserSuccess {
    type: ActionType.ADD_USER_SUCCESS;
    payload: User;
}
export interface IAddUserFail {
    type: ActionType.ADD_USER_FAIL;
    payload: String | null;
}

export interface IEditUser {
    type: ActionType.EDIT_USER;
}
export interface IEditUserSuccess {
    type: ActionType.EDIT_USER_SUCCESS;
    payload: User;
}
export interface IEditUserFail {
    type: ActionType.EDIT_USER_FAIL;
    payload: String | null;
}

export interface IDeleteUser {
    type: ActionType.DELETE_USER;
}
export interface IDeleteUserSuccess {
    type: ActionType.DELETE_USER_SUCCESS;
    payload: number;
}
export interface IDeleteUserFail {
    type: ActionType.DELETE_USER_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchUsers
    | IFetchUsersSuccess
    | IFetchUsersFail
    | IFetchUser
    | IFetchUserSuccess
    | IFetchUserFail
    | IAddUser
    | IAddUserSuccess
    | IAddUserFail
    | IEditUser
    | IEditUserSuccess
    | IEditUserFail
    | IDeleteUser
    | IDeleteUserSuccess
    | IDeleteUserFail;