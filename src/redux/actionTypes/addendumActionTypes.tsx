import { IAddendum as Addendum } from '../../models/addendum';
import { MultiResponseType } from '../../models/multiResponseType';

export enum ActionType {
    FETCH_ADDENDUMS = 'FETCH_ADDENDUMS',
    FETCH_ADDENDUMS_SUCCESS = 'FETCH_ADDENDUMS_SUCCESS',
    FETCH_ADDENDUMS_FAIL = 'FETCH_ADDENDUMS_FAIL',
    ADD_ADDENDUM = 'ADD_ADDENDUM',
    ADD_ADDENDUM_SUCCESS = 'ADD_ADDENDUM_SUCCESS',
    ADD_ADDENDUM_FAIL = 'ADD_ADDENDUM_FAIL',
    EDIT_ADDENDUM = 'EDIT_ADDENDUM',
    EDIT_ADDENDUM_SUCCESS = 'EDIT_ADDENDUM_SUCCESS',
    EDIT_ADDENDUM_FAIL = 'EDIT_ADDENDUM_FAIL',
    DELETE_ADDENDUM = 'DELETE_ADDENDUM',
    DELETE_ADDENDUM_SUCCESS = 'DELETE_ADDENDUM_SUCCESS',
    DELETE_ADDENDUM_FAIL = 'DELETE_ADDENDUM_FAIL'
}

export interface IFetchAddendums {
    type: ActionType.FETCH_ADDENDUMS;
}
export interface IFetchAddendumsSuccess {
    type: ActionType.FETCH_ADDENDUMS_SUCCESS;
    payload: MultiResponseType<Addendum>;
}
export interface IFetchAddendumsFail {
    type: ActionType.FETCH_ADDENDUMS_FAIL;
    payload: String | null;
}

export interface IAddAddendum {
    type: ActionType.ADD_ADDENDUM;
}
export interface IAddAddendumSuccess {
    type: ActionType.ADD_ADDENDUM_SUCCESS;
    payload: Addendum;
}
export interface IAddAddendumFail {
    type: ActionType.ADD_ADDENDUM_FAIL;
    payload: String | null;
}

export interface IEditAddendum {
    type: ActionType.EDIT_ADDENDUM;
}
export interface IEditAddendumSuccess {
    type: ActionType.EDIT_ADDENDUM_SUCCESS;
    payload: Addendum;
}
export interface IEditAddendumFail {
    type: ActionType.EDIT_ADDENDUM_FAIL;
    payload: String | null;
}
export interface IDeleteAddendum {
    type: ActionType.DELETE_ADDENDUM;
}
export interface IDeleteAddendumSuccess {
    type: ActionType.DELETE_ADDENDUM_SUCCESS;
    payload: number;
}
export interface IDeleteAddendumFail {
    type: ActionType.DELETE_ADDENDUM_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchAddendums
    | IFetchAddendumsSuccess
    | IFetchAddendumsFail
    | IAddAddendum
    | IAddAddendumSuccess
    | IAddAddendumFail
    | IEditAddendum
    | IEditAddendumSuccess
    | IEditAddendumFail
    | IDeleteAddendum
    | IDeleteAddendumSuccess
    | IDeleteAddendumFail
