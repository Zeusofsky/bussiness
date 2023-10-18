import { IFinancialInfo as FinancialInfo } from '../../models/financialInfo';
import { SingleResponseType } from '../../models/singleResponseType';

export enum ActionType {
    FETCH_FINANCIALINFO = 'FETCH_FINANCIALINFO',
    FETCH_FINANCIALINFO_SUCCESS = 'FETCH_FINANCIALINFO_SUCCESS',
    FETCH_FINANCIALINFO_FAIL = 'FETCH_FINANCIALINFO_FAIL',
    ADD_FINANCIALINFO = 'ADD_FINANCIALINFO',
    ADD_FINANCIALINFO_SUCCESS = 'ADD_FINANCIALINFO_SUCCESS',
    ADD_FINANCIALINFO_FAIL = 'ADD_FINANCIALINFO_FAIL',
    EDIT_FINANCIALINFO = 'EDIT_FINANCIALINFO',
    EDIT_FINANCIALINFO_SUCCESS = 'EDIT_FINANCIALINFO_SUCCESS',
    EDIT_FINANCIALINFO_FAIL = 'EDIT_FINANCIALINFO_FAIL',
}

export interface IFetchFinancialInfo {
    type: ActionType.FETCH_FINANCIALINFO;
}
export interface IFetchFinancialInfoSuccess {
    type: ActionType.FETCH_FINANCIALINFO_SUCCESS;
    payload: SingleResponseType<FinancialInfo>;
}
export interface IFetchFinancialInfoFail {
    type: ActionType.FETCH_FINANCIALINFO_FAIL;
    payload: String | null;
}

export interface IAddFinancialInfo {
    type: ActionType.ADD_FINANCIALINFO;
}
export interface IAddFinancialInfoSuccess {
    type: ActionType.ADD_FINANCIALINFO_SUCCESS;
    payload: FinancialInfo;
}
export interface IAddFinancialInfoFail {
    type: ActionType.ADD_FINANCIALINFO_FAIL;
    payload: String | null;
}

export interface IEditFinancialInfo {
    type: ActionType.EDIT_FINANCIALINFO;
}
export interface IEditFinancialInfoSuccess {
    type: ActionType.EDIT_FINANCIALINFO_SUCCESS;
    payload: FinancialInfo;
}
export interface IEditFinancialInfoFail {
    type: ActionType.EDIT_FINANCIALINFO_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchFinancialInfo
    | IFetchFinancialInfoSuccess
    | IFetchFinancialInfoFail
    | IAddFinancialInfo
    | IAddFinancialInfoSuccess
    | IAddFinancialInfoFail
    | IEditFinancialInfo
    | IEditFinancialInfoSuccess
    | IEditFinancialInfoFail
