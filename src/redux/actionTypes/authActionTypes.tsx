import { IAuth as Auth } from '../../models/auth';

export enum ActionType {
    AUTH_START = 'AUTH_START',
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_FAIL = 'AUTH_FAIL',
    CHANGEPASSWORD_ACTIVE = 'CHANGEPASSWORD_ACTIVE',
    CHANGEPASSWORD_START = 'CHANGEPASSWORD_START',
    CHANGEPASSWORD_SUCCESS = 'CHANGEPASSWORD_SUCCESS',
    CHANGEPASSWORD_FAIL = 'CHANGEPASSWORD_FAIL',
    LOGOUT = 'LOGOUT',
}

export interface IAuthStart {
    type: ActionType.AUTH_START;
}
export interface IAuthSuccess {
    type: ActionType.AUTH_SUCCESS;
    payload: Auth;
}
export interface IAuthFail {
    type: ActionType.AUTH_FAIL;
    payload: string | null;
}
export interface IChangePasswordActive {
    type: ActionType.CHANGEPASSWORD_ACTIVE;
    payload: boolean;
}
export interface IChangePasswordStart {
    type: ActionType.CHANGEPASSWORD_START;
}
export interface IChangePasswordSuccess {
    type: ActionType.CHANGEPASSWORD_SUCCESS;
    payload: Auth;
}
export interface IChangePasswordFail {
    type: ActionType.CHANGEPASSWORD_FAIL;
    payload: string | null;
}
export interface ILogout {
    type: ActionType.LOGOUT;
}

export type Action =
    | IAuthStart
    | IAuthSuccess
    | IAuthFail
    | IChangePasswordActive
    | IChangePasswordStart
    | IChangePasswordSuccess
    | IChangePasswordFail
    | ILogout;