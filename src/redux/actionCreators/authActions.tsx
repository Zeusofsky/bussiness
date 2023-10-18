import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';

import { http } from '../../services/axios';
import { IAuth as Auth, IChangePassword } from '../../models/auth';
import { 
    // MultiRecordResponse, 
    ThunkResult } from './actionResultTypes';
import { 
    Action,
    ActionType, 
    IAuthFail, 
    IAuthStart, 
    IAuthSuccess,
    IChangePasswordActive,
    IChangePasswordFail,
    IChangePasswordStart,
    IChangePasswordSuccess
} from '../actionTypes/authActionTypes';
import { toastError, toastSuccess } from "../../services/toasters";


// Headers
type Config = {
    headers: Record<string, string>
};
   
export const AuthStart = (username: string, password: string, navigation: () => void): ThunkResult<void> => 
    async (dispatch: Dispatch<Action>) => {
        dispatch<IAuthStart>({ type: ActionType.AUTH_START 
    });
    // Request Header
    const config: Config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    // Request Body
    const body = JSON.stringify({
        username,
        password
    });
    sessionStorage.removeItem('persist:root');
    // console.log('=======token=======', localStorage.getItem("token"))
    try {
        const response: AxiosResponse<Auth> = await http.post(`auth/login`, body, config);
        dispatch<IAuthSuccess>({
            type: ActionType.AUTH_SUCCESS,
            payload: response.data
        });    

        // localStorage.setItem("token", response.data.authToken);
        sessionStorage.setItem("token", response.data.authToken);
        // console.log("action token: ", response.data.authToken);
        navigation();
    } catch (err: any) {
        dispatch<IAuthFail>({
            type: ActionType.AUTH_FAIL,
            payload: err
        });        
        console.log('Error: ', err.toString())
        toastError("نام کاربری یا کلمه عبور اشتباه می باشد!");
    }
};

export const ActivateChangeUserPassword = (is_active: boolean) => {
    return (dispatch: Dispatch<Action>)=> {
        dispatch<IChangePasswordActive>({ 
            type: ActionType.CHANGEPASSWORD_ACTIVE,
            payload: is_active
        });
    }
}

export const ChangeUserPassword = (request: IChangePassword): ThunkResult<void> => async (dispatch: Dispatch<Action>) => {
    dispatch<IChangePasswordStart>({ 
        type: ActionType.CHANGEPASSWORD_START 
    });

    try {
        const response: AxiosResponse<any> = await http.put(`auth/changePassword`, request);
        dispatch<IChangePasswordSuccess>({
            type: ActionType.CHANGEPASSWORD_SUCCESS,
            payload: response.data
        });    
        // console.log("response.data", response.data);
        toastSuccess("Your password changed correctly");

    } catch (err: any) {
        dispatch<IChangePasswordFail>({
            type: ActionType.CHANGEPASSWORD_FAIL,
            payload: err
        });        
        console.log('Error: ', err.toString())
        toastError("Password did not change correctly!");
    }
}

export const LogOut = () => {
    return (dispatch: Dispatch<Action>)=> {

        localStorage.removeItem('persist:root');
        // localStorage.clear();
        sessionStorage.clear();
        dispatch({
            type : ActionType.LOGOUT,            
        })
    }
}


