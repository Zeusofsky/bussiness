import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    ThunkResult } from "./actionResultTypes";
import { 
    Action as InvoiceAction,
    ActionType as InvoiceActionType, 
    IFetchInvoices,
    IFetchInvoicesSuccess,
    IFetchInvoicesFail,
    IEditInvoice,
    IEditInvoiceSuccess,
    IEditInvoiceFail,
    IDeleteInvoice,
    IDeleteInvoiceSuccess,
    IDeleteInvoiceFail,
    IAddInvoice,
    IAddInvoiceSuccess,
    IAddInvoiceFail,
} from "../actionTypes/invoiceActionTypes";
import { toastError, 
     toastSuccess 
} from '../../services/toasters';
import { 
    IInvoice as Invoice, 
    IRequestInvoice,
} from '../../models/invoice';

import { httpGenerator } from '../../services';
import { MultiResponseType } from '../../models/multiResponseType';
// import { IInvoice } from '../../models/invoice';


export const GetInvoice = (contractId: number, dateId: number): ThunkResult<void> => async (dispatch: Dispatch<InvoiceAction>) => { 
    dispatch<IFetchInvoices>({  
        type: InvoiceActionType.FETCH_INVOICES
    });

    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<MultiResponseType<Invoice>> = await httpGenerator(authToken!).get(`invoices/contractMonthList/${contractId}/${dateId}/`);
        dispatch<IFetchInvoicesSuccess>({
            type: InvoiceActionType.FETCH_INVOICES_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)

    } catch(err: any) {
        dispatch<IFetchInvoicesFail>({
            type: InvoiceActionType.FETCH_INVOICES_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در بازیابی اطلاعات!");
    }
}

export const AddInvoice = (request: IRequestInvoice): ThunkResult<void> => async (dispatch: Dispatch<InvoiceAction>) => {
    // console.log("request: ", request) 
    dispatch<IAddInvoice>({ 
        type: InvoiceActionType.ADD_INVOICE
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<Invoice> = await httpGenerator(authToken!).post(`invoices/`, request);
        dispatch<IAddInvoiceSuccess>({
            type: InvoiceActionType.ADD_INVOICE_SUCCESS,
            payload: response.data  
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات جدید با موفقیت ذخیره گردید.");

    } catch(err:any) {
        dispatch<IAddInvoiceFail>({
            type: InvoiceActionType.ADD_INVOICE_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ذخیره سازی اطلاعات جدید!");
    }
};

export const EditInvoice = (id: number, request: IRequestInvoice): ThunkResult<void> => async (dispatch: Dispatch<InvoiceAction>) => { 
    dispatch<IEditInvoice>({ 
        type: InvoiceActionType.EDIT_INVOICE 
    });
    // console.log('EditInvoice ... ')
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<Invoice> = await httpGenerator(authToken!).put(`invoices/${id}/`, request);
        dispatch<IEditInvoiceSuccess>({ 
            type: InvoiceActionType.EDIT_INVOICE_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditInvoiceFail>({ 
            type: InvoiceActionType.EDIT_INVOICE_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const DeleteInvoice = (deletedId: number): ThunkResult<void> => async (dispatch: Dispatch<InvoiceAction>) => { 
    dispatch<IDeleteInvoice>({ type: InvoiceActionType.DELETE_INVOICE });
    try {
        const authToken = sessionStorage.getItem("token")
        await httpGenerator(authToken!).delete(`invoices/${deletedId}/`);
        dispatch<IDeleteInvoiceSuccess>({
            type: InvoiceActionType.DELETE_INVOICE_SUCCESS,
            payload: deletedId
        });
        // console.log("response: ", response)
        toastSuccess("اطلاعات مورد نظر با موفقیت حذف گردید.");

    } catch (err: any) {
        dispatch<IDeleteInvoiceFail>({ 
            type: InvoiceActionType.DELETE_INVOICE_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در خذف اطلاعات مورد نظر!");
    }
};