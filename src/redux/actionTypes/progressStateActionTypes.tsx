import { IProgressState as ProgressState } from '../../models/progressState';
import { MultiResponseType } from '../../models/multiResponseType';

export enum ActionType {
    FETCH_PROGRESSSTATES = 'FETCH_PROGRESSSTATES',
    FETCH_PROGRESSSTATES_SUCCESS = 'FETCH_PROGRESSSTATES_SUCCESS',
    FETCH_PROGRESSSTATES_FAIL = 'FETCH_PROGRESSSTATES_FAIL',
    ADD_PROGRESSSTATE = 'ADD_PROGRESSSTATE',
    ADD_PROGRESSSTATE_SUCCESS = 'ADD_PROGRESSSTATE_SUCCESS',
    ADD_PROGRESSSTATE_FAIL = 'ADD_PROGRESSSTATE_FAIL',
    EDIT_PROGRESSSTATE = 'EDIT_PROGRESSSTATE',
    EDIT_PROGRESSSTATE_SUCCESS = 'EDIT_PROGRESSSTATE_SUCCESS',
    EDIT_PROGRESSSTATE_FAIL = 'EDIT_PROGRESSSTATE_FAIL',
    DELETE_PROGRESSSTATE = 'DELETE_PROGRESSSTATE',
    DELETE_PROGRESSSTATE_SUCCESS = 'DELETE_PROGRESSSTATE_SUCCESS',
    DELETE_PROGRESSSTATE_FAIL = 'DELETE_PROGRESSSTATE_FAIL'
}

export interface IFetchProgressStates {
    type: ActionType.FETCH_PROGRESSSTATES;
}
export interface IFetchProgressStatesSuccess {
    type: ActionType.FETCH_PROGRESSSTATES_SUCCESS;
    payload: MultiResponseType<ProgressState>;
}
export interface IFetchProgressStatesFail {
    type: ActionType.FETCH_PROGRESSSTATES_FAIL;
    payload: String | null;
}

export interface IAddProgressState {
    type: ActionType.ADD_PROGRESSSTATE;
}
export interface IAddProgressStateSuccess {
    type: ActionType.ADD_PROGRESSSTATE_SUCCESS;
    payload: ProgressState;
}
export interface IAddProgressStateFail {
    type: ActionType.ADD_PROGRESSSTATE_FAIL;
    payload: String | null;
}

export interface IEditProgressState {
    type: ActionType.EDIT_PROGRESSSTATE;
}
export interface IEditProgressStateSuccess {
    type: ActionType.EDIT_PROGRESSSTATE_SUCCESS;
    payload: ProgressState;
}
export interface IEditProgressStateFail {
    type: ActionType.EDIT_PROGRESSSTATE_FAIL;
    payload: String | null;
}
export interface IDeleteProgressState {
    type: ActionType.DELETE_PROGRESSSTATE;
}
export interface IDeleteProgressStateSuccess {
    type: ActionType.DELETE_PROGRESSSTATE_SUCCESS;
    payload: number;
}
export interface IDeleteProgressStateFail {
    type: ActionType.DELETE_PROGRESSSTATE_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchProgressStates
    | IFetchProgressStatesSuccess
    | IFetchProgressStatesFail
    | IAddProgressState
    | IAddProgressStateSuccess
    | IAddProgressStateFail
    | IEditProgressState
    | IEditProgressStateSuccess
    | IEditProgressStateFail
    | IDeleteProgressState
    | IDeleteProgressStateSuccess
    | IDeleteProgressStateFail
