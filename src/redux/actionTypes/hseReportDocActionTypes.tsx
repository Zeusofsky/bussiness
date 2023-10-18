import { IHseReportDoc as HseReportDoc } from '../../models/hseReportDox';
import { MultiResponseType } from '../../models/multiResponseType';

export enum ActionType {
    FETCH_HSEREPORTDOX = 'FETCH_HSEREPORTDOX',
    FETCH_HSEREPORTDOX_SUCCESS = 'FETCH_HSEREPORTDOX_SUCCESS',
    FETCH_HSEREPORTDOX_FAIL = 'FETCH_HSEREPORTDOX_FAIL',
    ADD_HSEREPORTDOX = 'ADD_HSEREPORTDOX',
    ADD_HSEREPORTDOX_SUCCESS = 'ADD_HSEREPORTDOX_SUCCESS',
    ADD_HSEREPORTDOX_FAIL = 'ADD_HSEREPORTDOX_FAIL',
    EDIT_HSEREPORTDOX = 'EDIT_HSEREPORTDOX',
    EDIT_HSEREPORTDOX_SUCCESS = 'EDIT_HSEREPORTDOX_SUCCESS',
    EDIT_HSEREPORTDOX_FAIL = 'EDIT_HSEREPORTDOX_FAIL',
    DELETE_HSEREPORTDOX = 'DELETE_HSEREPORTDOX',
    DELETE_HSEREPORTDOX_SUCCESS = 'DELETE_HSEREPORTDOX_SUCCESS',
    DELETE_HSEREPORTDOX_FAIL = 'DELETE_HSEREPORTDOX_FAIL'
}

export interface IFetchHseReportDoc {
    type: ActionType.FETCH_HSEREPORTDOX;
}
export interface IFetchHseReportDocSuccess {
    type: ActionType.FETCH_HSEREPORTDOX_SUCCESS;
    payload: MultiResponseType<HseReportDoc>;
}
export interface IFetchHseReportDocFail {
    type: ActionType.FETCH_HSEREPORTDOX_FAIL;
    payload: String | null;
}

export interface IAddHseReportDoc {
    type: ActionType.ADD_HSEREPORTDOX;
}
export interface IAddHseReportDocSuccess {
    type: ActionType.ADD_HSEREPORTDOX_SUCCESS;
    payload: HseReportDoc;
}
export interface IAddHseReportDocFail {
    type: ActionType.ADD_HSEREPORTDOX_FAIL;
    payload: String | null;
}

export interface IEditHseReportDoc {
    type: ActionType.EDIT_HSEREPORTDOX;
}
export interface IEditHseReportDocSuccess {
    type: ActionType.EDIT_HSEREPORTDOX_SUCCESS;
    payload: HseReportDoc;
}
export interface IEditHseReportDocFail {
    type: ActionType.EDIT_HSEREPORTDOX_FAIL;
    payload: String | null;
}
export interface IDeleteHseReportDoc {
    type: ActionType.DELETE_HSEREPORTDOX;
}
export interface IDeleteHseReportDocSuccess {
    type: ActionType.DELETE_HSEREPORTDOX_SUCCESS;
    payload: number;
}
export interface IDeleteHseReportDocFail {
    type: ActionType.DELETE_HSEREPORTDOX_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchHseReportDoc
    | IFetchHseReportDocSuccess
    | IFetchHseReportDocFail
    | IAddHseReportDoc
    | IAddHseReportDocSuccess
    | IAddHseReportDocFail
    | IEditHseReportDoc
    | IEditHseReportDocSuccess
    | IEditHseReportDocFail
    | IDeleteHseReportDoc
    | IDeleteHseReportDocSuccess
    | IDeleteHseReportDocFail
