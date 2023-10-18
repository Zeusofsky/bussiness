import { IInvoice as Invoice } from '../../models/invoice';
import { MultiResponseType } from '../../models/multiResponseType';

export enum ActionType {
    FETCH_INVOICES = 'FETCH_INVOICES',
    FETCH_INVOICES_SUCCESS = 'FETCH_INVOICES_SUCCESS',
    FETCH_INVOICES_FAIL = 'FETCH_INVOICES_FAIL',
    ADD_INVOICE = 'ADD_INVOICE',
    ADD_INVOICE_SUCCESS = 'ADD_INVOICE_SUCCESS',
    ADD_INVOICE_FAIL = 'ADD_INVOICE_FAIL',
    EDIT_INVOICE = 'EDIT_INVOICE',
    EDIT_INVOICE_SUCCESS = 'EDIT_INVOICE_SUCCESS',
    EDIT_INVOICE_FAIL = 'EDIT_INVOICE_FAIL',
    DELETE_INVOICE = 'DELETE_INVOICE',
    DELETE_INVOICE_SUCCESS = 'DELETE_INVOICE_SUCCESS',
    DELETE_INVOICE_FAIL = 'DELETE_INVOICE_FAIL'
}

export interface IFetchInvoices {
    type: ActionType.FETCH_INVOICES;
}
export interface IFetchInvoicesSuccess {
    type: ActionType.FETCH_INVOICES_SUCCESS;
    payload: MultiResponseType<Invoice>;
}
export interface IFetchInvoicesFail {
    type: ActionType.FETCH_INVOICES_FAIL;
    payload: String | null;
}

export interface IAddInvoice {
    type: ActionType.ADD_INVOICE;
}
export interface IAddInvoiceSuccess {
    type: ActionType.ADD_INVOICE_SUCCESS;
    payload: Invoice;
}
export interface IAddInvoiceFail {
    type: ActionType.ADD_INVOICE_FAIL;
    payload: String | null;
}

export interface IEditInvoice {
    type: ActionType.EDIT_INVOICE;
}
export interface IEditInvoiceSuccess {
    type: ActionType.EDIT_INVOICE_SUCCESS;
    payload: Invoice;
}
export interface IEditInvoiceFail {
    type: ActionType.EDIT_INVOICE_FAIL;
    payload: String | null;
}
export interface IDeleteInvoice {
    type: ActionType.DELETE_INVOICE;
}
export interface IDeleteInvoiceSuccess {
    type: ActionType.DELETE_INVOICE_SUCCESS;
    payload: number;
}
export interface IDeleteInvoiceFail {
    type: ActionType.DELETE_INVOICE_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchInvoices
    | IFetchInvoicesSuccess
    | IFetchInvoicesFail
    | IAddInvoice
    | IAddInvoiceSuccess
    | IAddInvoiceFail
    | IEditInvoice
    | IEditInvoiceSuccess
    | IEditInvoiceFail
    | IDeleteInvoice
    | IDeleteInvoiceSuccess
    | IDeleteInvoiceFail
