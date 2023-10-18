import { Dispatch } from 'redux';
import { IUserPost, IUser as User } from '../../models/user';
import { AxiosResponse } from 'axios';
import { http } from '../../services';
import { 
    // MultiRecordResponse, 
    ThunkResult } from './actionResultTypes';
import { 
    Action,
    ActionType,
    IFetchUsers, 
    IFetchUsersSuccess, 
    IFetchUsersFail, 
    IFetchUser, 
    IFetchUserSuccess, 
    IFetchUserFail,
    // IAddUser,
    // IAddUserSuccess,
    // IAddUserFail,
    // IEditUser,
    // IEditUserSuccess,
    // IEditUserFail,
    IDeleteUser,
    IDeleteUserSuccess,
    IDeleteUserFail,
} from '../actionTypes/userActionTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastSuccess, toastError} from "../../services/toasters"

// export interface ResponseType
// {
//     Users: User[];
//     Success: boolean;
//     Message: string;
//     Errors: String[] | null;
// }

export const getUsers = (): ThunkResult<void> => async (dispatch: Dispatch<Action>) => { 
    dispatch<IFetchUsers>({  
        type: ActionType.FETCH_USERS 
    });
    try {
        const response: AxiosResponse<User[]> = await http.get(`auth/users`);
        dispatch<IFetchUsersSuccess>({
            type: ActionType.FETCH_USERS_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)

    } catch(err: any) {
        dispatch<IFetchUsersFail>({
            type: ActionType.FETCH_USERS_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("Error: could not read users data!");
    }
}
export const getUser = (id: number): ThunkResult<void> => async (dispatch: Dispatch<Action>) => { 
    dispatch<IFetchUser>({
        type: ActionType.FETCH_USER
    });

    try {
        const response: AxiosResponse<User> = await http.get(`auth/users/${id}`);
        dispatch<IFetchUserSuccess>({
            type: ActionType.FETCH_USER_SUCCESS,
            payload: response.data  
        });

    } catch(err:any) {
        dispatch<IFetchUserFail>({
            type: ActionType.FETCH_USER_FAIL,
            payload: err
        });
    }
}

export const addUser = createAsyncThunk("user/addUser", async (user: IUserPost) => {
    try {
        const response = await http.post("auth/users/", user)
        // console.log("response.data: ", response.data)

        toastSuccess('Succeeded');
        return response.data

    } catch (error) {
        console.log("Error: ", error)
        toastError("Error: could not create new user!");
    }
})
// export const addUser = (user: IUserEdit): ThunkResult<void> => async (dispatch: Dispatch<Action>) => {
//     console.log("addUser run") 
//     dispatch<IAddUser>({ 
//         type: ActionType.ADD_USER
//     });
//     try {
//         const response: AxiosResponse<User> = await axios.post(`api/users`, user);
//         dispatch<IAddUserSuccess>({
//             type: ActionType.ADD_USER_SUCCESS,
//             payload: response.data  
//         });

//     } catch(err:any) {
//         dispatch<IAddUserFail>({
//             type: ActionType.ADD_USER_FAIL,
//             payload: err
//         });
//     }
// };
export const editUser = createAsyncThunk("user/editUser", async (editedUser: User) => {
        try {
            const response = await http.put(`auth/users/${editedUser.id}`, editedUser);

            toastSuccess('Succeeded');
            return response.data
        } catch (error) {
            console.log(error)
            toastError("Error: could not update user!");
        }
    }) 
// export const editUser = (id: number, editedUser: IUserPost): ThunkResult<void> => async (dispatch: Dispatch<Action>) => { 
//     dispatch<IEditUser>({ type: ActionType.EDIT_USER });
//     try {
//         const response: AxiosResponse<User> = await axios.put(`api/users/${id}`, editedUser);
//         dispatch<IEditUserSuccess>({ 
//             type: ActionType.EDIT_USER_SUCCESS, 
//             payload: response.data
//         });
//     } catch (err: any) {
//         dispatch<IEditUserFail>({ 
//             type: ActionType.EDIT_USER_FAIL,
//             payload: err
//         });
//     }
// };
export const deleteUser = (deletedId: number): ThunkResult<void> => async (dispatch: Dispatch<Action>) => { 
    dispatch<IDeleteUser>({ type: ActionType.DELETE_USER });
    try {
        const response: AxiosResponse<number> = await http.delete(`api/users/${deletedId}`);
        dispatch<IDeleteUserSuccess>({
            type: ActionType.DELETE_USER_SUCCESS,
            payload: response.data
        });
        toastSuccess('Succeeded');

    } catch (err: any) {
        dispatch<IDeleteUserFail>({ 
            type: ActionType.DELETE_USER_FAIL,
            payload: err
        });
        toastError("Error: could not delete user!");
    }
};


