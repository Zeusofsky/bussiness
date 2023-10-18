import { ICriticalAction as CriticalAction } from '../../models/criticalAction';
import { MultiResponseType } from '../../models/multiResponseType';

export enum ActionType {
    FETCH_CRITICALACTIONS = 'FETCH_CRITICALACTIONS',
    FETCH_CRITICALACTIONS_SUCCESS = 'FETCH_CRITICALACTIONS_SUCCESS',
    FETCH_CRITICALACTIONS_FAIL = 'FETCH_CRITICALACTIONS_FAIL',
    ADD_CRITICALACTION = 'ADD_CRITICALACTION',
    ADD_CRITICALACTION_SUCCESS = 'ADD_CRITICALACTION_SUCCESS',
    ADD_CRITICALACTION_FAIL = 'ADD_CRITICALACTION_FAIL',
    EDIT_CRITICALACTION = 'EDIT_CRITICALACTION',
    EDIT_CRITICALACTION_SUCCESS = 'EDIT_CRITICALACTION_SUCCESS',
    EDIT_CRITICALACTION_FAIL = 'EDIT_CRITICALACTION_FAIL',
    DELETE_CRITICALACTION = 'DELETE_CRITICALACTION',
    DELETE_CRITICALACTION_SUCCESS = 'DELETE_CRITICALACTION_SUCCESS',
    DELETE_CRITICALACTION_FAIL = 'DELETE_CRITICALACTION_FAIL',
    TOGGLE_CRITICALACTION_MODAL = 'TOGGLE_CRITICALACTION_MODAL',
    START_ADD_CRITICALACTION = 'START_ADD_CRITICALACTION',
    START_EDIT_CRITICALACTION = 'START_EDIT_CRITICALACTION',
}

export interface IFetchCriticalActions {
    type: ActionType.FETCH_CRITICALACTIONS;
}
export interface IFetchCriticalActionsSuccess {
    type: ActionType.FETCH_CRITICALACTIONS_SUCCESS;
    payload: MultiResponseType<CriticalAction>;
}
export interface IFetchCriticalActionsFail {
    type: ActionType.FETCH_CRITICALACTIONS_FAIL;
    payload: String | null;
}

export interface IAddCriticalAction {
    type: ActionType.ADD_CRITICALACTION;
}
export interface IAddCriticalActionSuccess {
    type: ActionType.ADD_CRITICALACTION_SUCCESS;
    payload: CriticalAction;
}
export interface IAddCriticalActionFail {
    type: ActionType.ADD_CRITICALACTION_FAIL;
    payload: String | null;
}

export interface IEditCriticalAction {
    type: ActionType.EDIT_CRITICALACTION;
}
export interface IEditCriticalActionSuccess {
    type: ActionType.EDIT_CRITICALACTION_SUCCESS;
    payload: CriticalAction;
}
export interface IEditCriticalActionFail {
    type: ActionType.EDIT_CRITICALACTION_FAIL;
    payload: String | null;
}
export interface IDeleteCriticalAction {
    type: ActionType.DELETE_CRITICALACTION;
}
export interface IDeleteCriticalActionSuccess {
    type: ActionType.DELETE_CRITICALACTION_SUCCESS;
    payload: number;
}
export interface IDeleteCriticalActionFail {
    type: ActionType.DELETE_CRITICALACTION_FAIL;
    payload: String | null;
}

export interface IToggleCriticalActionModel {
    type: ActionType.TOGGLE_CRITICALACTION_MODAL;
}
export interface IStartAddCriticalAction {
    type: ActionType.START_ADD_CRITICALACTION;
}
export interface IStartEditCriticalAction {
    type: ActionType.START_EDIT_CRITICALACTION;
    payload: CriticalAction;
}

export type Action =
    | IFetchCriticalActions
    | IFetchCriticalActionsSuccess
    | IFetchCriticalActionsFail
    | IAddCriticalAction
    | IAddCriticalActionSuccess
    | IAddCriticalActionFail
    | IEditCriticalAction
    | IEditCriticalActionSuccess
    | IEditCriticalActionFail
    | IDeleteCriticalAction
    | IDeleteCriticalActionSuccess
    | IDeleteCriticalActionFail
    | IToggleCriticalActionModel
    | IStartAddCriticalAction
    | IStartEditCriticalAction
