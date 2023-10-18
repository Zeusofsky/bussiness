import { ITimeProgressState as TimeProgressState } from '../../models/timeProgressState';
import { MultiResponseType } from '../../models/multiResponseType';

export enum ActionType {
    FETCH_TIMEPROGRESSSTATES = 'FETCH_TIMEPROGRESSSTATES',
    FETCH_TIMEPROGRESSSTATES_SUCCESS = 'FETCH_TIMEPROGRESSSTATES_SUCCESS',
    FETCH_TIMEPROGRESSSTATES_FAIL = 'FETCH_TIMEPROGRESSSTATES_FAIL',
    ADD_TIMEPROGRESSSTATE = 'ADD_TIMEPROGRESSSTATE',
    ADD_TIMEPROGRESSSTATE_SUCCESS = 'ADD_TIMEPROGRESSSTATE_SUCCESS',
    ADD_TIMEPROGRESSSTATE_FAIL = 'ADD_TIMEPROGRESSSTATE_FAIL',
    EDIT_TIMEPROGRESSSTATE = 'EDIT_TIMEPROGRESSSTATE',
    EDIT_TIMEPROGRESSSTATE_SUCCESS = 'EDIT_TIMEPROGRESSSTATE_SUCCESS',
    EDIT_TIMEPROGRESSSTATE_FAIL = 'EDIT_TIMEPROGRESSSTATE_FAIL',
    DELETE_TIMEPROGRESSSTATE = 'DELETE_TIMEPROGRESSSTATE',
    DELETE_TIMEPROGRESSSTATE_SUCCESS = 'DELETE_TIMEPROGRESSSTATE_SUCCESS',
    DELETE_TIMEPROGRESSSTATE_FAIL = 'DELETE_TIMEPROGRESSSTATE_FAIL'
}

export interface IFetchTimeProgressStates {
    type: ActionType.FETCH_TIMEPROGRESSSTATES;
}
export interface IFetchTimeProgressStatesSuccess {
    type: ActionType.FETCH_TIMEPROGRESSSTATES_SUCCESS;
    payload: MultiResponseType<TimeProgressState>;
}
export interface IFetchTimeProgressStatesFail {
    type: ActionType.FETCH_TIMEPROGRESSSTATES_FAIL;
    payload: String | null;
}

export interface IAddTimeProgressState {
    type: ActionType.ADD_TIMEPROGRESSSTATE;
}
export interface IAddTimeProgressStateSuccess {
    type: ActionType.ADD_TIMEPROGRESSSTATE_SUCCESS;
    payload: TimeProgressState;
}
export interface IAddTimeProgressStateFail {
    type: ActionType.ADD_TIMEPROGRESSSTATE_FAIL;
    payload: String | null;
}

export interface IEditTimeProgressState {
    type: ActionType.EDIT_TIMEPROGRESSSTATE;
}
export interface IEditTimeProgressStateSuccess {
    type: ActionType.EDIT_TIMEPROGRESSSTATE_SUCCESS;
    payload: TimeProgressState;
}
export interface IEditTimeProgressStateFail {
    type: ActionType.EDIT_TIMEPROGRESSSTATE_FAIL;
    payload: String | null;
}
export interface IDeleteTimeProgressState {
    type: ActionType.DELETE_TIMEPROGRESSSTATE;
}
export interface IDeleteTimeProgressStateSuccess {
    type: ActionType.DELETE_TIMEPROGRESSSTATE_SUCCESS;
    payload: number;
}
export interface IDeleteTimeProgressStateFail {
    type: ActionType.DELETE_TIMEPROGRESSSTATE_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchTimeProgressStates
    | IFetchTimeProgressStatesSuccess
    | IFetchTimeProgressStatesFail
    | IAddTimeProgressState
    | IAddTimeProgressStateSuccess
    | IAddTimeProgressStateFail
    | IEditTimeProgressState
    | IEditTimeProgressStateSuccess
    | IEditTimeProgressStateFail
    | IDeleteTimeProgressState
    | IDeleteTimeProgressStateSuccess
    | IDeleteTimeProgressStateFail
