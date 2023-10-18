import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    ThunkResult } from "./actionResultTypes";
import { 
    Action as HseAction,
    ActionType as HseActionType, 
    IFetchHses,
    IFetchHsesSuccess,
    IFetchHsesFail,
    IEditHse,
    IEditHseSuccess,
    IEditHseFail,
    IDeleteHse,
    IDeleteHseSuccess,
    IDeleteHseFail,
    IAddHse,
    IAddHseSuccess,
    IAddHseFail,
} from "../actionTypes/hseActionTypes";
import { toastError, 
     toastSuccess 
} from '../../services/toasters';
import { 
    IHse as Hse, 
    IRequestHse,
} from '../../models/hse';

import { httpGenerator } from '../../services';
// import { MultiResponseType } from '../../models/multiResponseType';
import { SingleResponseType } from '../../models/singleResponseType';
// import { IHse } from '../../models/hse';


export const GetHse = (contractId: number, dateId: number): ThunkResult<void> => async (dispatch: Dispatch<HseAction>) => { 
    dispatch<IFetchHses>({  
        type: HseActionType.FETCH_HSES
    });

    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<SingleResponseType<Hse>> = await httpGenerator(authToken!).get(`hses/contractMonthList/${contractId}/${dateId}/`);
        dispatch<IFetchHsesSuccess>({
            type: HseActionType.FETCH_HSES_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)

    } catch(err: any) {
        dispatch<IFetchHsesFail>({
            type: HseActionType.FETCH_HSES_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در بازیابی اطلاعات!");
    }
}

export const AddHse = (request: IRequestHse): ThunkResult<void> => async (dispatch: Dispatch<HseAction>) => {
    // console.log("request: ", request) 
    dispatch<IAddHse>({ 
        type: HseActionType.ADD_HSE
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<Hse> = await httpGenerator(authToken!).post(`hses/`, request);
        dispatch<IAddHseSuccess>({
            type: HseActionType.ADD_HSE_SUCCESS,
            payload: response.data  
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات جدید با موفقیت ذخیره گردید.");

    } catch(err:any) {
        dispatch<IAddHseFail>({
            type: HseActionType.ADD_HSE_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ذخیره سازی اطلاعات جدید!");
    }
};

export const EditHse = (id: number, request: IRequestHse): ThunkResult<void> => async (dispatch: Dispatch<HseAction>) => { 
    dispatch<IEditHse>({ 
        type: HseActionType.EDIT_HSE 
    });
    // console.log('EditHse ... ')
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<Hse> = await httpGenerator(authToken!).put(`hses/${id}/`, request);
        dispatch<IEditHseSuccess>({ 
            type: HseActionType.EDIT_HSE_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditHseFail>({ 
            type: HseActionType.EDIT_HSE_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const DeleteHse = (deletedId: number): ThunkResult<void> => async (dispatch: Dispatch<HseAction>) => { 
    dispatch<IDeleteHse>({ type: HseActionType.DELETE_HSE });
    try {
        const authToken = sessionStorage.getItem("token")
        await httpGenerator(authToken!).delete(`hses/${deletedId}/`);
        dispatch<IDeleteHseSuccess>({
            type: HseActionType.DELETE_HSE_SUCCESS,
            payload: deletedId
        });
        // console.log("response: ", response)
        toastSuccess("اطلاعات مورد نظر با موفقیت حذف گردید.");

    } catch (err: any) {
        dispatch<IDeleteHseFail>({ 
            type: HseActionType.DELETE_HSE_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در خذف اطلاعات مورد نظر!");
    }
};