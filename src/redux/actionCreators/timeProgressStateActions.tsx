import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    ThunkResult } from "./actionResultTypes";
import { 
    Action as TimeProgressStateAction,
    ActionType as TimeProgressStateActionType, 
    IFetchTimeProgressStates,
    IFetchTimeProgressStatesSuccess,
    IFetchTimeProgressStatesFail,
    IEditTimeProgressState,
    IEditTimeProgressStateSuccess,
    IEditTimeProgressStateFail,
    IDeleteTimeProgressState,
    IDeleteTimeProgressStateSuccess,
    IDeleteTimeProgressStateFail,
    IAddTimeProgressState,
    IAddTimeProgressStateSuccess,
    IAddTimeProgressStateFail,
} from "../actionTypes/timeProgressStateActionTypes";
import { toastError, 
     toastSuccess 
} from '../../services/toasters';
import { 
    ITimeProgressState as TimeProgressState, 
    IRequestTimeProgressState,
} from '../../models/timeProgressState';

import { httpGenerator } from '../../services';
import { MultiResponseType } from '../../models/multiResponseType';
// import { ITimeProgressState } from '../../models/timeProgressState';


export const GetTimeProgressState = (contractId: number, dateId: number): ThunkResult<void> => async (dispatch: Dispatch<TimeProgressStateAction>) => { 
    dispatch<IFetchTimeProgressStates>({  
        type: TimeProgressStateActionType.FETCH_TIMEPROGRESSSTATES
    });

    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<MultiResponseType<TimeProgressState>> = await httpGenerator(authToken!).get(`timeProgressStates/contractMonthList/${contractId}/${dateId}/`);
        dispatch<IFetchTimeProgressStatesSuccess>({
            type: TimeProgressStateActionType.FETCH_TIMEPROGRESSSTATES_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)

    } catch(err: any) {
        dispatch<IFetchTimeProgressStatesFail>({
            type: TimeProgressStateActionType.FETCH_TIMEPROGRESSSTATES_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در بازیابی اطلاعات!");
    }
}

export const AddTimeProgressState = (request: IRequestTimeProgressState): ThunkResult<void> => async (dispatch: Dispatch<TimeProgressStateAction>) => {
    // console.log("request: ", request) 
    dispatch<IAddTimeProgressState>({ 
        type: TimeProgressStateActionType.ADD_TIMEPROGRESSSTATE
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<TimeProgressState> = await httpGenerator(authToken!).post(`timeProgressStates/`, request);
        dispatch<IAddTimeProgressStateSuccess>({
            type: TimeProgressStateActionType.ADD_TIMEPROGRESSSTATE_SUCCESS,
            payload: response.data  
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات جدید با موفقیت ذخیره گردید.");

    } catch(err:any) {
        dispatch<IAddTimeProgressStateFail>({
            type: TimeProgressStateActionType.ADD_TIMEPROGRESSSTATE_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ذخیره سازی اطلاعات جدید!");
    }
};

export const EditTimeProgressState = (id: number, request: IRequestTimeProgressState): ThunkResult<void> => async (dispatch: Dispatch<TimeProgressStateAction>) => { 
    dispatch<IEditTimeProgressState>({ 
        type: TimeProgressStateActionType.EDIT_TIMEPROGRESSSTATE 
    });
    // console.log('EditTimeProgressState ... ')
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<TimeProgressState> = await httpGenerator(authToken!).put(`timeProgressStates/${id}/`, request);
        dispatch<IEditTimeProgressStateSuccess>({ 
            type: TimeProgressStateActionType.EDIT_TIMEPROGRESSSTATE_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditTimeProgressStateFail>({ 
            type: TimeProgressStateActionType.EDIT_TIMEPROGRESSSTATE_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const DeleteTimeProgressState = (deletedId: number): ThunkResult<void> => async (dispatch: Dispatch<TimeProgressStateAction>) => { 
    dispatch<IDeleteTimeProgressState>({ type: TimeProgressStateActionType.DELETE_TIMEPROGRESSSTATE });
    try {
        const authToken = sessionStorage.getItem("token")
        await httpGenerator(authToken!).delete(`timeProgressStates/${deletedId}/`);
        dispatch<IDeleteTimeProgressStateSuccess>({
            type: TimeProgressStateActionType.DELETE_TIMEPROGRESSSTATE_SUCCESS,
            payload: deletedId
        });
        // console.log("response: ", response)
        toastSuccess("اطلاعات مورد نظر با موفقیت حذف گردید.");

    } catch (err: any) {
        dispatch<IDeleteTimeProgressStateFail>({ 
            type: TimeProgressStateActionType.DELETE_TIMEPROGRESSSTATE_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در خذف اطلاعات مورد نظر!");
    }
};