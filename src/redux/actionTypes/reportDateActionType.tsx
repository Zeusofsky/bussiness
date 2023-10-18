import { IReportDate as ReportDate } from '../../models/reportDate';
import { MultiResponseType } from '../../models/multiResponseType'
// import { MultiRecordResponse } from '../actionCreators/actionResultTypes';

export enum ActionType {
    FETCH_REPORTDATES = 'FETCH_REPORTDATES',
    FETCH_REPORTDATES_SUCCESS = 'FETCH_REPORTDATES_SUCCESS',
    FETCH_REPORTDATES_FAIL = 'FETCH_REPORTDATES_FAIL',
    FETCH_REPORTDATE = 'FETCH_REPORTDATE',
    FETCH_REPORTDATE_SUCCESS = 'FETCH_REPORTDATE_SUCCESS',
    FETCH_REPORTDATE_FAIL = 'FETCH_REPORTDATE_FAIL',
    ADD_REPORTDATE = 'ADD_REPORTDATE',
    ADD_REPORTDATE_SUCCESS = 'ADD_REPORTDATE_SUCCESS',
    ADD_REPORTDATE_FAIL = 'ADD_REPORTDATE_FAIL',
    EDIT_REPORTDATE = 'EDIT_REPORTDATE',
    EDIT_REPORTDATE_SUCCESS = 'EDIT_REPORTDATE_SUCCESS',
    EDIT_REPORTDATE_FAIL = 'EDIT_REPORTDATE_FAIL',
    DELETE_REPORTDATE = 'DELETE_REPORTDATE',
    DELETE_REPORTDATE_SUCCESS = 'DELETE_REPORTDATE_SUCCESS',
    DELETE_REPORTDATE_FAIL = 'DELETE_REPORTDATE_FAIL',
    SELECTED_CURRENT_REPORTDATE = 'SELECTED_CURRENT_REPORTDATE',
}

export interface IFetchReportDates {
    type: ActionType.FETCH_REPORTDATES;
}
export interface IFetchReportDatesSuccess {
    type: ActionType.FETCH_REPORTDATES_SUCCESS;
    // payload: MultiRecordResponse;
    payload: MultiResponseType<ReportDate>
}
export interface IFetchReportDatesFail {
    type: ActionType.FETCH_REPORTDATES_FAIL;
    payload: string | null;
}

export interface IFetchReportDate {
    type: ActionType.FETCH_REPORTDATE;
}
export interface IFetchReportDateSuccess {
    type: ActionType.FETCH_REPORTDATE_SUCCESS;
    payload: ReportDate;
}
export interface IFetchReportDateFail {
    type: ActionType.FETCH_REPORTDATE_FAIL;
    payload: String | null;
}

export interface IAddReportDate {
    type: ActionType.ADD_REPORTDATE;
}
export interface IAddReportDateSuccess {
    type: ActionType.ADD_REPORTDATE_SUCCESS;
    payload: ReportDate;
}
export interface IAddReportDateFail {
    type: ActionType.ADD_REPORTDATE_FAIL;
    payload: String | null;
}

export interface IEditReportDate {
    type: ActionType.EDIT_REPORTDATE;
}
export interface IEditReportDateSuccess {
    type: ActionType.EDIT_REPORTDATE_SUCCESS;
    payload: ReportDate;
}
export interface IEditReportDateFail {
    type: ActionType.EDIT_REPORTDATE_FAIL;
    payload: String | null;
}

export interface IDeleteReportDate {
    type: ActionType.DELETE_REPORTDATE;
}
export interface IDeleteReportDateSuccess {
    type: ActionType.DELETE_REPORTDATE_SUCCESS;
    payload: number;
}
export interface IDeleteReportDateFail {
    type: ActionType.DELETE_REPORTDATE_FAIL;
    payload: String | null;
}
export interface ISelectCurrentReportDate {
    type: ActionType.SELECTED_CURRENT_REPORTDATE;
    payload: number;
}

export type Action =
    | IFetchReportDates
    | IFetchReportDatesSuccess
    | IFetchReportDatesFail
    | IFetchReportDate
    | IFetchReportDateSuccess
    | IFetchReportDateFail
    | IAddReportDate
    | IAddReportDateSuccess
    | IAddReportDateFail
    | IEditReportDate
    | IEditReportDateSuccess
    | IEditReportDateFail
    | IDeleteReportDate
    | IDeleteReportDateSuccess
    | IDeleteReportDateFail
    | ISelectCurrentReportDate;