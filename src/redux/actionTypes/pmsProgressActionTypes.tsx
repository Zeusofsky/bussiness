import { IPmsProgress as PmsProgress } from '../../models/pmsProgress';
import { MultiResponseType } from '../../models/multiResponseType';

export enum ActionType {
    FETCH_PMSPROGRESSES = 'FETCH_PMSPROGRESSES',
    FETCH_PMSPROGRESSES_SUCCESS = 'FETCH_PMSPROGRESSES_SUCCESS',
    FETCH_PMSPROGRESSES_FAIL = 'FETCH_PMSPROGRESSES_FAIL',
    ADD_PMSPROGRESS = 'ADD_PMSPROGRESS',
    ADD_PMSPROGRESS_SUCCESS = 'ADD_PMSPROGRESS_SUCCESS',
    ADD_PMSPROGRESS_FAIL = 'ADD_PMSPROGRESS_FAIL',
    EDIT_PMSPROGRESS = 'EDIT_PMSPROGRESS',
    EDIT_PMSPROGRESS_SUCCESS = 'EDIT_PMSPROGRESS_SUCCESS',
    EDIT_PMSPROGRESS_FAIL = 'EDIT_PMSPROGRESS_FAIL',
    DELETE_PMSPROGRESS = 'DELETE_PMSPROGRESS',
    DELETE_PMSPROGRESS_SUCCESS = 'DELETE_PMSPROGRESS_SUCCESS',
    DELETE_PMSPROGRESS_FAIL = 'DELETE_PMSPROGRESS_FAIL'
}

export interface IFetchPmsProgresses {
    type: ActionType.FETCH_PMSPROGRESSES;
}
export interface IFetchPmsProgressesSuccess {
    type: ActionType.FETCH_PMSPROGRESSES_SUCCESS;
    payload: MultiResponseType<PmsProgress>;
}
export interface IFetchPmsProgressesFail {
    type: ActionType.FETCH_PMSPROGRESSES_FAIL;
    payload: String | null;
}

export interface IAddPmsProgress {
    type: ActionType.ADD_PMSPROGRESS;
}
export interface IAddPmsProgressSuccess {
    type: ActionType.ADD_PMSPROGRESS_SUCCESS;
    payload: PmsProgress;
}
export interface IAddPmsProgressFail {
    type: ActionType.ADD_PMSPROGRESS_FAIL;
    payload: String | null;
}

export interface IEditPmsProgress {
    type: ActionType.EDIT_PMSPROGRESS;
}
export interface IEditPmsProgressSuccess {
    type: ActionType.EDIT_PMSPROGRESS_SUCCESS;
    payload: PmsProgress;
}
export interface IEditPmsProgressFail {
    type: ActionType.EDIT_PMSPROGRESS_FAIL;
    payload: String | null;
}
export interface IDeletePmsProgress {
    type: ActionType.DELETE_PMSPROGRESS;
}
export interface IDeletePmsProgressSuccess {
    type: ActionType.DELETE_PMSPROGRESS_SUCCESS;
    payload: number;
}
export interface IDeletePmsProgressFail {
    type: ActionType.DELETE_PMSPROGRESS_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchPmsProgresses
    | IFetchPmsProgressesSuccess
    | IFetchPmsProgressesFail
    | IAddPmsProgress
    | IAddPmsProgressSuccess
    | IAddPmsProgressFail
    | IEditPmsProgress
    | IEditPmsProgressSuccess
    | IEditPmsProgressFail
    | IDeletePmsProgress
    | IDeletePmsProgressSuccess
    | IDeletePmsProgressFail
