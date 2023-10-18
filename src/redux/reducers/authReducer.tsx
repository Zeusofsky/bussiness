import { Reducer } from 'redux';

import { IAuth as Auth } from '../../models/auth';
import { IUserResponse } from '../../models/user';
import { Action, ActionType } from '../actionTypes/authActionTypes';
import { IUserContractPermission } from '../../models/permission';


export interface IAuthState {
    authToken : string ,
    isPasswordChanged: boolean,
    user : IUserResponse | undefined | null;
    userContractPermissions: IUserContractPermission[];
    loading: boolean;
    error? : string | null;
}

const initialState = {
    authToken : "" ,
    isPasswordChanged: false,
    user : null , 
    userContractPermissions: [],
    loading: false,
    error : null
}

export const AuthReducer: Reducer<IAuthState, Action> = (
    state = initialState,
    action
) => {
    // const navigate = useNavigate()
    switch (action.type) {
        case ActionType.AUTH_START:
            return { ...state, loading: true };
        case ActionType.AUTH_SUCCESS:
            const auth: Auth = action.payload
            // console.log('auth.permissions: ', auth.userContractPermissions)
            return {
                ...state,
                authToken : auth.authToken , 
                user : auth.user ,
                userContractPermissions : auth.userContractPermissions,
                error : null , 
                loading: false
            };
        case ActionType.AUTH_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case ActionType.CHANGEPASSWORD_ACTIVE:
            return {
                ...state,
                isPasswordChanged: action.payload,
            };
        case ActionType.CHANGEPASSWORD_SUCCESS:
            return {
                ...state,
                isPasswordChanged: false,
            };
        case ActionType.LOGOUT:
            return {
                ...state,
                authToken : '' , 
                isPasswordChanged: false,
                user : null ,
                loading: false,
                error : null , 
            };
        default:
            return state;
    }
};