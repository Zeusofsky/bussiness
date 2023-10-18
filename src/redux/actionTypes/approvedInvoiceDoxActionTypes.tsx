import { IApprovedInvoiceDoc as ApprovedInvoiceDoc } from '../../models/approvedInvoiceDox';
import { MultiResponseType } from '../../models/multiResponseType';

export enum ActionType {
    FETCH_APPROVEDINVOICEDOX = 'FETCH_APPROVEDINVOICEDOX',
    FETCH_APPROVEDINVOICEDOX_SUCCESS = 'FETCH_APPROVEDINVOICEDOX_SUCCESS',
    FETCH_APPROVEDINVOICEDOX_FAIL = 'FETCH_APPROVEDINVOICEDOX_FAIL',
    ADD_APPROVEDINVOICEDOX = 'ADD_APPROVEDINVOICEDOX',
    ADD_APPROVEDINVOICEDOX_SUCCESS = 'ADD_APPROVEDINVOICEDOX_SUCCESS',
    ADD_APPROVEDINVOICEDOX_FAIL = 'ADD_APPROVEDINVOICEDOX_FAIL',
    EDIT_APPROVEDINVOICEDOX = 'EDIT_APPROVEDINVOICEDOX',
    EDIT_APPROVEDINVOICEDOX_SUCCESS = 'EDIT_APPROVEDINVOICEDOX_SUCCESS',
    EDIT_APPROVEDINVOICEDOX_FAIL = 'EDIT_APPROVEDINVOICEDOX_FAIL',
    DELETE_APPROVEDINVOICEDOX = 'DELETE_APPROVEDINVOICEDOX',
    DELETE_APPROVEDINVOICEDOX_SUCCESS = 'DELETE_APPROVEDINVOICEDOX_SUCCESS',
    DELETE_APPROVEDINVOICEDOX_FAIL = 'DELETE_APPROVEDINVOICEDOX_FAIL'
}

export interface IFetchApprovedInvoiceDoc {
    type: ActionType.FETCH_APPROVEDINVOICEDOX;
}
export interface IFetchApprovedInvoiceDocSuccess {
    type: ActionType.FETCH_APPROVEDINVOICEDOX_SUCCESS;
    payload: MultiResponseType<ApprovedInvoiceDoc>;
}
export interface IFetchApprovedInvoiceDocFail {
    type: ActionType.FETCH_APPROVEDINVOICEDOX_FAIL;
    payload: String | null;
}

export interface IAddApprovedInvoiceDoc {
    type: ActionType.ADD_APPROVEDINVOICEDOX;
}
export interface IAddApprovedInvoiceDocSuccess {
    type: ActionType.ADD_APPROVEDINVOICEDOX_SUCCESS;
    payload: ApprovedInvoiceDoc;
}
export interface IAddApprovedInvoiceDocFail {
    type: ActionType.ADD_APPROVEDINVOICEDOX_FAIL;
    payload: String | null;
}

export interface IEditApprovedInvoiceDoc {
    type: ActionType.EDIT_APPROVEDINVOICEDOX;
}
export interface IEditApprovedInvoiceDocSuccess {
    type: ActionType.EDIT_APPROVEDINVOICEDOX_SUCCESS;
    payload: ApprovedInvoiceDoc;
}
export interface IEditApprovedInvoiceDocFail {
    type: ActionType.EDIT_APPROVEDINVOICEDOX_FAIL;
    payload: String | null;
}
export interface IDeleteApprovedInvoiceDoc {
    type: ActionType.DELETE_APPROVEDINVOICEDOX;
}
export interface IDeleteApprovedInvoiceDocSuccess {
    type: ActionType.DELETE_APPROVEDINVOICEDOX_SUCCESS;
    payload: number;
}
export interface IDeleteApprovedInvoiceDocFail {
    type: ActionType.DELETE_APPROVEDINVOICEDOX_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchApprovedInvoiceDoc
    | IFetchApprovedInvoiceDocSuccess
    | IFetchApprovedInvoiceDocFail
    | IAddApprovedInvoiceDoc
    | IAddApprovedInvoiceDocSuccess
    | IAddApprovedInvoiceDocFail
    | IEditApprovedInvoiceDoc
    | IEditApprovedInvoiceDocSuccess
    | IEditApprovedInvoiceDocFail
    | IDeleteApprovedInvoiceDoc
    | IDeleteApprovedInvoiceDocSuccess
    | IDeleteApprovedInvoiceDocFail
