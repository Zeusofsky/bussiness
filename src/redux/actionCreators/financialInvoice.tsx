import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    ThunkResult } from "./actionResultTypes";
import { 
    Action as FinancialInvoiceAction,
    ActionType as FinancialInvoiceActionType, 
    IFetchFinancialInvoices,
    IFetchFinancialInvoicesSuccess,
    IFetchFinancialInvoicesFail,
    IEditFinancialInvoice,
    IEditFinancialInvoiceSuccess,
    IEditFinancialInvoiceFail,
    IDeleteFinancialInvoice,
    IDeleteFinancialInvoiceSuccess,
    IDeleteFinancialInvoiceFail,
    IAddFinancialInvoice,
    IAddFinancialInvoiceSuccess,
    IAddFinancialInvoiceFail,
} from "../actionTypes/financialInvoiceActionTypes";
import { toastError, 
     toastSuccess 
} from '../../services/toasters';
import { 
    IFinancialInvoice as FinancialInvoice, 
    IRequestFinancialInvoice,
} from '../../models/financialInvoice';

import { httpGenerator } from '../../services';
import { MultiResponseType } from '../../models/multiResponseType';
// import { IFinancialInvoice } from '../../models/financialInvoice';


export const GetFinancialInvoice = (contractId: number, dateId: number): ThunkResult<void> => async (dispatch: Dispatch<FinancialInvoiceAction>) => { 
    dispatch<IFetchFinancialInvoices>({  
        type: FinancialInvoiceActionType.FETCH_FINANCIALINVOICES
    });

    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<MultiResponseType<FinancialInvoice>> = await httpGenerator(authToken!).get(`financialInvoices/contractMonthList/${contractId}/${dateId}/`);
        dispatch<IFetchFinancialInvoicesSuccess>({
            type: FinancialInvoiceActionType.FETCH_FINANCIALINVOICES_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)

    } catch(err: any) {
        dispatch<IFetchFinancialInvoicesFail>({
            type: FinancialInvoiceActionType.FETCH_FINANCIALINVOICES_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در بازیابی اطلاعات!");
    }
}

export const AddFinancialInvoice = (request: IRequestFinancialInvoice): ThunkResult<void> => async (dispatch: Dispatch<FinancialInvoiceAction>) => {
    // console.log("request: ", request) 
    dispatch<IAddFinancialInvoice>({ 
        type: FinancialInvoiceActionType.ADD_FINANCIALINVOICE
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<FinancialInvoice> = await httpGenerator(authToken!).post(`financialInvoices/`, request);
        dispatch<IAddFinancialInvoiceSuccess>({
            type: FinancialInvoiceActionType.ADD_FINANCIALINVOICE_SUCCESS,
            payload: response.data  
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات جدید با موفقیت ذخیره گردید.");

    } catch(err:any) {
        dispatch<IAddFinancialInvoiceFail>({
            type: FinancialInvoiceActionType.ADD_FINANCIALINVOICE_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ذخیره سازی اطلاعات جدید!");
    }
};

export const EditFinancialInvoice = (id: number, request: IRequestFinancialInvoice): ThunkResult<void> => async (dispatch: Dispatch<FinancialInvoiceAction>) => { 
    dispatch<IEditFinancialInvoice>({ 
        type: FinancialInvoiceActionType.EDIT_FINANCIALINVOICE 
    });
    // console.log('EditFinancialInvoice ... ')
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<FinancialInvoice> = await httpGenerator(authToken!).put(`financialInvoices/${id}/`, request);
        dispatch<IEditFinancialInvoiceSuccess>({ 
            type: FinancialInvoiceActionType.EDIT_FINANCIALINVOICE_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditFinancialInvoiceFail>({ 
            type: FinancialInvoiceActionType.EDIT_FINANCIALINVOICE_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const DeleteFinancialInvoice = (deletedId: number): ThunkResult<void> => async (dispatch: Dispatch<FinancialInvoiceAction>) => { 
    dispatch<IDeleteFinancialInvoice>({ type: FinancialInvoiceActionType.DELETE_FINANCIALINVOICE });
    try {
        const authToken = sessionStorage.getItem("token")
        await httpGenerator(authToken!).delete(`financialInvoices/${deletedId}/`);
        dispatch<IDeleteFinancialInvoiceSuccess>({
            type: FinancialInvoiceActionType.DELETE_FINANCIALINVOICE_SUCCESS,
            payload: deletedId
        });
        // console.log("response: ", response)
        toastSuccess("اطلاعات مورد نظر با موفقیت حذف گردید.");

    } catch (err: any) {
        dispatch<IDeleteFinancialInvoiceFail>({ 
            type: FinancialInvoiceActionType.DELETE_FINANCIALINVOICE_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در خذف اطلاعات مورد نظر!");
    }
};