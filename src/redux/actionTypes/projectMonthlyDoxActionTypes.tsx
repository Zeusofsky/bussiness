import { IProjectMonthlyDoc as ProjectMonthlyDoc } from '../../models/projectMonthlyDox';
import { MultiResponseType } from '../../models/multiResponseType';

export enum ActionType {
    FETCH_PROJECTMONTHLYDOX = 'FETCH_PROJECTMONTHLYDOX',
    FETCH_PROJECTMONTHLYDOX_SUCCESS = 'FETCH_PROJECTMONTHLYDOX_SUCCESS',
    FETCH_PROJECTMONTHLYDOX_FAIL = 'FETCH_PROJECTMONTHLYDOX_FAIL',
    ADD_PROJECTMONTHLYDOX = 'ADD_PROJECTMONTHLYDOX',
    ADD_PROJECTMONTHLYDOX_SUCCESS = 'ADD_PROJECTMONTHLYDOX_SUCCESS',
    ADD_PROJECTMONTHLYDOX_FAIL = 'ADD_PROJECTMONTHLYDOX_FAIL',
    EDIT_PROJECTMONTHLYDOX = 'EDIT_PROJECTMONTHLYDOX',
    EDIT_PROJECTMONTHLYDOX_SUCCESS = 'EDIT_PROJECTMONTHLYDOX_SUCCESS',
    EDIT_PROJECTMONTHLYDOX_FAIL = 'EDIT_PROJECTMONTHLYDOX_FAIL',
    DELETE_PROJECTMONTHLYDOX = 'DELETE_PROJECTMONTHLYDOX',
    DELETE_PROJECTMONTHLYDOX_SUCCESS = 'DELETE_PROJECTMONTHLYDOX_SUCCESS',
    DELETE_PROJECTMONTHLYDOX_FAIL = 'DELETE_PROJECTMONTHLYDOX_FAIL'
}

export interface IFetchProjectMonthlyDoc {
    type: ActionType.FETCH_PROJECTMONTHLYDOX;
}
export interface IFetchProjectMonthlyDocSuccess {
    type: ActionType.FETCH_PROJECTMONTHLYDOX_SUCCESS;
    payload: MultiResponseType<ProjectMonthlyDoc>;
}
export interface IFetchProjectMonthlyDocFail {
    type: ActionType.FETCH_PROJECTMONTHLYDOX_FAIL;
    payload: String | null;
}

export interface IAddProjectMonthlyDoc {
    type: ActionType.ADD_PROJECTMONTHLYDOX;
}
export interface IAddProjectMonthlyDocSuccess {
    type: ActionType.ADD_PROJECTMONTHLYDOX_SUCCESS;
    payload: ProjectMonthlyDoc;
}
export interface IAddProjectMonthlyDocFail {
    type: ActionType.ADD_PROJECTMONTHLYDOX_FAIL;
    payload: String | null;
}

export interface IEditProjectMonthlyDoc {
    type: ActionType.EDIT_PROJECTMONTHLYDOX;
}
export interface IEditProjectMonthlyDocSuccess {
    type: ActionType.EDIT_PROJECTMONTHLYDOX_SUCCESS;
    payload: ProjectMonthlyDoc;
}
export interface IEditProjectMonthlyDocFail {
    type: ActionType.EDIT_PROJECTMONTHLYDOX_FAIL;
    payload: String | null;
}
export interface IDeleteProjectMonthlyDoc {
    type: ActionType.DELETE_PROJECTMONTHLYDOX;
}
export interface IDeleteProjectMonthlyDocSuccess {
    type: ActionType.DELETE_PROJECTMONTHLYDOX_SUCCESS;
    payload: number;
}
export interface IDeleteProjectMonthlyDocFail {
    type: ActionType.DELETE_PROJECTMONTHLYDOX_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchProjectMonthlyDoc
    | IFetchProjectMonthlyDocSuccess
    | IFetchProjectMonthlyDocFail
    | IAddProjectMonthlyDoc
    | IAddProjectMonthlyDocSuccess
    | IAddProjectMonthlyDocFail
    | IEditProjectMonthlyDoc
    | IEditProjectMonthlyDocSuccess
    | IEditProjectMonthlyDocFail
    | IDeleteProjectMonthlyDoc
    | IDeleteProjectMonthlyDocSuccess
    | IDeleteProjectMonthlyDocFail
