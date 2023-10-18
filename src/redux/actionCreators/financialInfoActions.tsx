import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    ThunkResult } from "./actionResultTypes";
import { 
    Action as FinancialInfoAction,
    ActionType as FinancialInfoActionType, 
    IFetchFinancialInfo,
    IFetchFinancialInfoSuccess,
    IFetchFinancialInfoFail,
    IEditFinancialInfo,
    IEditFinancialInfoSuccess,
    IEditFinancialInfoFail,
    IAddFinancialInfo,
    IAddFinancialInfoSuccess,
    IAddFinancialInfoFail,
} from "../actionTypes/financialInfoActionTypes";
import { toastError, 
     toastSuccess 
} from '../../services/toasters';
import { 
    IFinancialInfo as FinancialInfo, 
} from '../../models/financialInfo';

import { SingleResponseType } from '../../models/singleResponseType'

import { httpGenerator } from '../../services';


export const GetFinancialInfo = (contractId: number, dateId: number): ThunkResult<void> => async (dispatch: Dispatch<FinancialInfoAction>) => { 
    dispatch<IFetchFinancialInfo>({  
        type: FinancialInfoActionType.FETCH_FINANCIALINFO
    });

    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<SingleResponseType<FinancialInfo>> = await httpGenerator(authToken!).get(`financialInfos/contractMonthList/${contractId}/${dateId}/`);
        dispatch<IFetchFinancialInfoSuccess>({
            type: FinancialInfoActionType.FETCH_FINANCIALINFO_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)

    } catch(err: any) {
        dispatch<IFetchFinancialInfoFail>({
            type: FinancialInfoActionType.FETCH_FINANCIALINFO_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در بازیابی اطلاعات!");
    }
}

export const AddFinancialInfo = (request: FinancialInfo): ThunkResult<void> => async (dispatch: Dispatch<FinancialInfoAction>) => { 
    dispatch<IAddFinancialInfo>({ 
        type: FinancialInfoActionType.ADD_FINANCIALINFO 
    });
    // console.log('AddFinancialInfo ... ')
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<FinancialInfo> = await httpGenerator(authToken!).post(`financialInfos/`, request);
        dispatch<IAddFinancialInfoSuccess>({ 
            type: FinancialInfoActionType.ADD_FINANCIALINFO_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات جدید با موفقیت ذخیره گردید.");

    } catch (err: any) {
        dispatch<IAddFinancialInfoFail>({ 
            type: FinancialInfoActionType.ADD_FINANCIALINFO_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ذخیره سازی اطلاعات جدید!");
    }
};

export const EditFinancialInfo = (id: number, request: FinancialInfo): ThunkResult<void> => async (dispatch: Dispatch<FinancialInfoAction>) => { 
    dispatch<IEditFinancialInfo>({ 
        type: FinancialInfoActionType.EDIT_FINANCIALINFO 
    });
    // console.log('EditFinancialInfo ... ')
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<FinancialInfo> = await httpGenerator(authToken!).put(`financialInfos/${id}/`, request);
        dispatch<IEditFinancialInfoSuccess>({ 
            type: FinancialInfoActionType.EDIT_FINANCIALINFO_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditFinancialInfoFail>({ 
            type: FinancialInfoActionType.EDIT_FINANCIALINFO_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};