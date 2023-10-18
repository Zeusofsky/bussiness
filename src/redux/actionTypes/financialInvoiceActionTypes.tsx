import { IFinancialInvoice as FinancialInvoice } from '../../models/financialInvoice';
import { MultiResponseType } from '../../models/multiResponseType';

export enum ActionType {
    FETCH_FINANCIALINVOICES = 'FETCH_FINANCIALINVOICES',
    FETCH_FINANCIALINVOICES_SUCCESS = 'FETCH_FINANCIALINVOICES_SUCCESS',
    FETCH_FINANCIALINVOICES_FAIL = 'FETCH_FINANCIALINVOICES_FAIL',
    ADD_FINANCIALINVOICE = 'ADD_FINANCIALINVOICE',
    ADD_FINANCIALINVOICE_SUCCESS = 'ADD_FINANCIALINVOICE_SUCCESS',
    ADD_FINANCIALINVOICE_FAIL = 'ADD_FINANCIALINVOICE_FAIL',
    EDIT_FINANCIALINVOICE = 'EDIT_FINANCIALINVOICE',
    EDIT_FINANCIALINVOICE_SUCCESS = 'EDIT_FINANCIALINVOICE_SUCCESS',
    EDIT_FINANCIALINVOICE_FAIL = 'EDIT_FINANCIALINVOICE_FAIL',
    DELETE_FINANCIALINVOICE = 'DELETE_FINANCIALINVOICE',
    DELETE_FINANCIALINVOICE_SUCCESS = 'DELETE_FINANCIALINVOICE_SUCCESS',
    DELETE_FINANCIALINVOICE_FAIL = 'DELETE_FINANCIALINVOICE_FAIL'
}

export interface IFetchFinancialInvoices {
    type: ActionType.FETCH_FINANCIALINVOICES;
}
export interface IFetchFinancialInvoicesSuccess {
    type: ActionType.FETCH_FINANCIALINVOICES_SUCCESS;
    payload: MultiResponseType<FinancialInvoice>;
}
export interface IFetchFinancialInvoicesFail {
    type: ActionType.FETCH_FINANCIALINVOICES_FAIL;
    payload: String | null;
}

export interface IAddFinancialInvoice {
    type: ActionType.ADD_FINANCIALINVOICE;
}
export interface IAddFinancialInvoiceSuccess {
    type: ActionType.ADD_FINANCIALINVOICE_SUCCESS;
    payload: FinancialInvoice;
}
export interface IAddFinancialInvoiceFail {
    type: ActionType.ADD_FINANCIALINVOICE_FAIL;
    payload: String | null;
}

export interface IEditFinancialInvoice {
    type: ActionType.EDIT_FINANCIALINVOICE;
}
export interface IEditFinancialInvoiceSuccess {
    type: ActionType.EDIT_FINANCIALINVOICE_SUCCESS;
    payload: FinancialInvoice;
}
export interface IEditFinancialInvoiceFail {
    type: ActionType.EDIT_FINANCIALINVOICE_FAIL;
    payload: String | null;
}
export interface IDeleteFinancialInvoice {
    type: ActionType.DELETE_FINANCIALINVOICE;
}
export interface IDeleteFinancialInvoiceSuccess {
    type: ActionType.DELETE_FINANCIALINVOICE_SUCCESS;
    payload: number;
}
export interface IDeleteFinancialInvoiceFail {
    type: ActionType.DELETE_FINANCIALINVOICE_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchFinancialInvoices
    | IFetchFinancialInvoicesSuccess
    | IFetchFinancialInvoicesFail
    | IAddFinancialInvoice
    | IAddFinancialInvoiceSuccess
    | IAddFinancialInvoiceFail
    | IEditFinancialInvoice
    | IEditFinancialInvoiceSuccess
    | IEditFinancialInvoiceFail
    | IDeleteFinancialInvoice
    | IDeleteFinancialInvoiceSuccess
    | IDeleteFinancialInvoiceFail
