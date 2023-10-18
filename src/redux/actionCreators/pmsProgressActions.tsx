import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    ThunkResult } from "./actionResultTypes";
import { 
    Action as PmsProgressAction,
    ActionType as PmsProgressActionType, 
    IFetchPmsProgresses,
    IFetchPmsProgressesSuccess,
    IFetchPmsProgressesFail,
    IEditPmsProgress,
    IEditPmsProgressSuccess,
    IEditPmsProgressFail,
    IDeletePmsProgress,
    IDeletePmsProgressSuccess,
    IDeletePmsProgressFail,
    IAddPmsProgress,
    IAddPmsProgressSuccess,
    IAddPmsProgressFail,
} from "../actionTypes/pmsProgressActionTypes";
import { toastError, 
     toastSuccess 
} from '../../services/toasters';
import { 
    IPmsProgress as PmsProgress, 
    IRequestPmsProgress,
} from '../../models/pmsProgress';

import { httpGenerator } from '../../services';
import { MultiResponseType } from '../../models/multiResponseType';
// import { IPmsProgress } from '../../models/pmsProgress';


export const GetPmsProgress = (contractId: number, dateId: number): ThunkResult<void> => async (dispatch: Dispatch<PmsProgressAction>) => { 
    dispatch<IFetchPmsProgresses>({  
        type: PmsProgressActionType.FETCH_PMSPROGRESSES
    });

    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<MultiResponseType<PmsProgress>> = await httpGenerator(authToken!).get(`pmsProgresses/contractMonthList/${contractId}/${dateId}/`);
        dispatch<IFetchPmsProgressesSuccess>({
            type: PmsProgressActionType.FETCH_PMSPROGRESSES_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)

    } catch(err: any) {
        dispatch<IFetchPmsProgressesFail>({
            type: PmsProgressActionType.FETCH_PMSPROGRESSES_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در بازیابی اطلاعات!");
    }
}

export const AddPmsProgress = (request: IRequestPmsProgress): ThunkResult<void> => async (dispatch: Dispatch<PmsProgressAction>) => {
    // console.log("request: ", request) 
    dispatch<IAddPmsProgress>({ 
        type: PmsProgressActionType.ADD_PMSPROGRESS
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<PmsProgress> = await httpGenerator(authToken!).post(`pmsProgresses/`, request);
        dispatch<IAddPmsProgressSuccess>({
            type: PmsProgressActionType.ADD_PMSPROGRESS_SUCCESS,
            payload: response.data  
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات جدید با موفقیت ذخیره گردید.");

    } catch(err:any) {
        dispatch<IAddPmsProgressFail>({
            type: PmsProgressActionType.ADD_PMSPROGRESS_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ذخیره سازی اطلاعات جدید!");
    }
};

export const EditPmsProgress = (id: number, request: IRequestPmsProgress): ThunkResult<void> => async (dispatch: Dispatch<PmsProgressAction>) => { 
    dispatch<IEditPmsProgress>({ 
        type: PmsProgressActionType.EDIT_PMSPROGRESS 
    });
    // console.log('EditPmsProgress ... ')
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<PmsProgress> = await httpGenerator(authToken!).put(`pmsProgresses/${id}/`, request);
        dispatch<IEditPmsProgressSuccess>({ 
            type: PmsProgressActionType.EDIT_PMSPROGRESS_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditPmsProgressFail>({ 
            type: PmsProgressActionType.EDIT_PMSPROGRESS_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const DeletePmsProgress = (deletedId: number): ThunkResult<void> => async (dispatch: Dispatch<PmsProgressAction>) => { 
    dispatch<IDeletePmsProgress>({ type: PmsProgressActionType.DELETE_PMSPROGRESS });
    try {
        const authToken = sessionStorage.getItem("token")
        await httpGenerator(authToken!).delete(`pmsProgresses/${deletedId}/`);
        dispatch<IDeletePmsProgressSuccess>({
            type: PmsProgressActionType.DELETE_PMSPROGRESS_SUCCESS,
            payload: deletedId
        });
        // console.log("response: ", response)
        toastSuccess("اطلاعات مورد نظر با موفقیت حذف گردید.");

    } catch (err: any) {
        dispatch<IDeletePmsProgressFail>({ 
            type: PmsProgressActionType.DELETE_PMSPROGRESS_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در خذف اطلاعات مورد نظر!");
    }
};