import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    ThunkResult } from "./actionResultTypes";
import { 
    Action as ProgressStateAction,
    ActionType as ProgressStateActionType, 
    IFetchProgressStates,
    IFetchProgressStatesSuccess,
    IFetchProgressStatesFail,
    IEditProgressState,
    IEditProgressStateSuccess,
    IEditProgressStateFail,
    IDeleteProgressState,
    IDeleteProgressStateSuccess,
    IDeleteProgressStateFail,
    IAddProgressState,
    IAddProgressStateSuccess,
    IAddProgressStateFail,
} from "../actionTypes/progressStateActionTypes";
import { toastError, 
     toastSuccess 
} from '../../services/toasters';
import { 
    IProgressState as ProgressState, 
    IRequestProgressState,
} from '../../models/progressState';

import { httpGenerator } from '../../services';
import { MultiResponseType } from '../../models/multiResponseType';
// import { IProgressState } from '../../models/progressState';


export const GetProgressState = (contractId: number, dateId: number): ThunkResult<void> => async (dispatch: Dispatch<ProgressStateAction>) => { 
    dispatch<IFetchProgressStates>({  
        type: ProgressStateActionType.FETCH_PROGRESSSTATES
    });

    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<MultiResponseType<ProgressState>> = await httpGenerator(authToken!).get(`progressStates/contractMonthList/${contractId}/${dateId}/`);
        dispatch<IFetchProgressStatesSuccess>({
            type: ProgressStateActionType.FETCH_PROGRESSSTATES_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)

    } catch(err: any) {
        dispatch<IFetchProgressStatesFail>({
            type: ProgressStateActionType.FETCH_PROGRESSSTATES_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در بازیابی اطلاعات!");
    }
}

export const AddProgressState = (request: IRequestProgressState): ThunkResult<void> => async (dispatch: Dispatch<ProgressStateAction>) => {
    // console.log("request: ", request) 
    dispatch<IAddProgressState>({ 
        type: ProgressStateActionType.ADD_PROGRESSSTATE
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<ProgressState> = await httpGenerator(authToken!).post(`progressStates/`, request);
        dispatch<IAddProgressStateSuccess>({
            type: ProgressStateActionType.ADD_PROGRESSSTATE_SUCCESS,
            payload: response.data  
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات جدید با موفقیت ذخیره گردید.");

    } catch(err:any) {
        dispatch<IAddProgressStateFail>({
            type: ProgressStateActionType.ADD_PROGRESSSTATE_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ذخیره سازی اطلاعات جدید!");
    }
};

export const EditProgressState = (id: number, request: IRequestProgressState): ThunkResult<void> => async (dispatch: Dispatch<ProgressStateAction>) => { 
    dispatch<IEditProgressState>({ 
        type: ProgressStateActionType.EDIT_PROGRESSSTATE 
    });
    // console.log('EditProgressState ... ')
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<ProgressState> = await httpGenerator(authToken!).put(`progressStates/${id}/`, request);
        dispatch<IEditProgressStateSuccess>({ 
            type: ProgressStateActionType.EDIT_PROGRESSSTATE_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditProgressStateFail>({ 
            type: ProgressStateActionType.EDIT_PROGRESSSTATE_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const DeleteProgressState = (deletedId: number): ThunkResult<void> => async (dispatch: Dispatch<ProgressStateAction>) => { 
    dispatch<IDeleteProgressState>({ type: ProgressStateActionType.DELETE_PROGRESSSTATE });
    try {
        const authToken = sessionStorage.getItem("token")
        await httpGenerator(authToken!).delete(`progressStates/${deletedId}/`);
        dispatch<IDeleteProgressStateSuccess>({
            type: ProgressStateActionType.DELETE_PROGRESSSTATE_SUCCESS,
            payload: deletedId
        });
        // console.log("response: ", response)
        toastSuccess("اطلاعات مورد نظر با موفقیت حذف گردید.");

    } catch (err: any) {
        dispatch<IDeleteProgressStateFail>({ 
            type: ProgressStateActionType.DELETE_PROGRESSSTATE_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در خذف اطلاعات مورد نظر!");
    }
};