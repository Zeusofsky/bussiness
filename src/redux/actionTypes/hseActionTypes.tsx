import { IHse as Hse } from '../../models/hse';
import { SingleResponseType } from '../../models/singleResponseType';

export enum ActionType {
    FETCH_HSES = 'FETCH_HSES',
    FETCH_HSES_SUCCESS = 'FETCH_HSES_SUCCESS',
    FETCH_HSES_FAIL = 'FETCH_HSES_FAIL',
    ADD_HSE = 'ADD_HSE',
    ADD_HSE_SUCCESS = 'ADD_HSE_SUCCESS',
    ADD_HSE_FAIL = 'ADD_HSE_FAIL',
    EDIT_HSE = 'EDIT_HSE',
    EDIT_HSE_SUCCESS = 'EDIT_HSE_SUCCESS',
    EDIT_HSE_FAIL = 'EDIT_HSE_FAIL',
    DELETE_HSE = 'DELETE_HSE',
    DELETE_HSE_SUCCESS = 'DELETE_HSE_SUCCESS',
    DELETE_HSE_FAIL = 'DELETE_HSE_FAIL'
}

export interface IFetchHses {
    type: ActionType.FETCH_HSES;
}
export interface IFetchHsesSuccess {
    type: ActionType.FETCH_HSES_SUCCESS;
    payload: SingleResponseType<Hse>;
}
export interface IFetchHsesFail {
    type: ActionType.FETCH_HSES_FAIL;
    payload: String | null;
}

export interface IAddHse {
    type: ActionType.ADD_HSE;
}
export interface IAddHseSuccess {
    type: ActionType.ADD_HSE_SUCCESS;
    payload: Hse;
}
export interface IAddHseFail {
    type: ActionType.ADD_HSE_FAIL;
    payload: String | null;
}

export interface IEditHse {
    type: ActionType.EDIT_HSE;
}
export interface IEditHseSuccess {
    type: ActionType.EDIT_HSE_SUCCESS;
    payload: Hse;
}
export interface IEditHseFail {
    type: ActionType.EDIT_HSE_FAIL;
    payload: String | null;
}
export interface IDeleteHse {
    type: ActionType.DELETE_HSE;
}
export interface IDeleteHseSuccess {
    type: ActionType.DELETE_HSE_SUCCESS;
    payload: number;
}
export interface IDeleteHseFail {
    type: ActionType.DELETE_HSE_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchHses
    | IFetchHsesSuccess
    | IFetchHsesFail
    | IAddHse
    | IAddHseSuccess
    | IAddHseFail
    | IEditHse
    | IEditHseSuccess
    | IEditHseFail
    | IDeleteHse
    | IDeleteHseSuccess
    | IDeleteHseFail
