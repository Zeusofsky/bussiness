import { IProjectPersonal as ProjectPersonal } from '../../models/projectPersonal';
import { MultiResponseType } from '../../models/multiResponseType';

export enum ActionType {
    FETCH_PROJECTPERSONALS = 'FETCH_PROJECTPERSONALS',
    FETCH_PROJECTPERSONALS_SUCCESS = 'FETCH_PROJECTPERSONALS_SUCCESS',
    FETCH_PROJECTPERSONALS_FAIL = 'FETCH_PROJECTPERSONALS_FAIL',
    ADD_PROJECTPERSONAL = 'ADD_PROJECTPERSONAL',
    ADD_PROJECTPERSONAL_SUCCESS = 'ADD_PROJECTPERSONAL_SUCCESS',
    ADD_PROJECTPERSONAL_FAIL = 'ADD_PROJECTPERSONAL_FAIL',
    EDIT_PROJECTPERSONAL = 'EDIT_PROJECTPERSONAL',
    EDIT_PROJECTPERSONAL_SUCCESS = 'EDIT_PROJECTPERSONAL_SUCCESS',
    EDIT_PROJECTPERSONAL_FAIL = 'EDIT_PROJECTPERSONAL_FAIL',
    DELETE_PROJECTPERSONAL = 'DELETE_PROJECTPERSONAL',
    DELETE_PROJECTPERSONAL_SUCCESS = 'DELETE_PROJECTPERSONAL_SUCCESS',
    DELETE_PROJECTPERSONAL_FAIL = 'DELETE_PROJECTPERSONAL_FAIL'
}

export interface IFetchProjectPersonals {
    type: ActionType.FETCH_PROJECTPERSONALS;
}
export interface IFetchProjectPersonalsSuccess {
    type: ActionType.FETCH_PROJECTPERSONALS_SUCCESS;
    payload: MultiResponseType<ProjectPersonal>;
}
export interface IFetchProjectPersonalsFail {
    type: ActionType.FETCH_PROJECTPERSONALS_FAIL;
    payload: String | null;
}

export interface IAddProjectPersonal {
    type: ActionType.ADD_PROJECTPERSONAL;
}
export interface IAddProjectPersonalSuccess {
    type: ActionType.ADD_PROJECTPERSONAL_SUCCESS;
    payload: ProjectPersonal;
}
export interface IAddProjectPersonalFail {
    type: ActionType.ADD_PROJECTPERSONAL_FAIL;
    payload: String | null;
}

export interface IEditProjectPersonal {
    type: ActionType.EDIT_PROJECTPERSONAL;
}
export interface IEditProjectPersonalSuccess {
    type: ActionType.EDIT_PROJECTPERSONAL_SUCCESS;
    payload: ProjectPersonal;
}
export interface IEditProjectPersonalFail {
    type: ActionType.EDIT_PROJECTPERSONAL_FAIL;
    payload: String | null;
}
export interface IDeleteProjectPersonal {
    type: ActionType.DELETE_PROJECTPERSONAL;
}
export interface IDeleteProjectPersonalSuccess {
    type: ActionType.DELETE_PROJECTPERSONAL_SUCCESS;
    payload: number;
}
export interface IDeleteProjectPersonalFail {
    type: ActionType.DELETE_PROJECTPERSONAL_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchProjectPersonals
    | IFetchProjectPersonalsSuccess
    | IFetchProjectPersonalsFail
    | IAddProjectPersonal
    | IAddProjectPersonalSuccess
    | IAddProjectPersonalFail
    | IEditProjectPersonal
    | IEditProjectPersonalSuccess
    | IEditProjectPersonalFail
    | IDeleteProjectPersonal
    | IDeleteProjectPersonalSuccess
    | IDeleteProjectPersonalFail
