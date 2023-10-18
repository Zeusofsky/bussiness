import { IProjectDoc as ProjectDoc } from '../../models/projectDox';
import { MultiResponseType } from '../../models/multiResponseType';

export enum ActionType {
    FETCH_PROJECTDOX = 'FETCH_PROJECTDOX',
    FETCH_PROJECTDOX_SUCCESS = 'FETCH_PROJECTDOX_SUCCESS',
    FETCH_PROJECTDOX_FAIL = 'FETCH_PROJECTDOX_FAIL',
    ADD_PROJECTDOX = 'ADD_PROJECTDOX',
    ADD_PROJECTDOX_SUCCESS = 'ADD_PROJECTDOX_SUCCESS',
    ADD_PROJECTDOX_FAIL = 'ADD_PROJECTDOX_FAIL',
    EDIT_PROJECTDOX = 'EDIT_PROJECTDOX',
    EDIT_PROJECTDOX_SUCCESS = 'EDIT_PROJECTDOX_SUCCESS',
    EDIT_PROJECTDOX_FAIL = 'EDIT_PROJECTDOX_FAIL',
    DELETE_PROJECTDOX = 'DELETE_PROJECTDOX',
    DELETE_PROJECTDOX_SUCCESS = 'DELETE_PROJECTDOX_SUCCESS',
    DELETE_PROJECTDOX_FAIL = 'DELETE_PROJECTDOX_FAIL'
}

export interface IFetchProjectDoc {
    type: ActionType.FETCH_PROJECTDOX;
}
export interface IFetchProjectDocSuccess {
    type: ActionType.FETCH_PROJECTDOX_SUCCESS;
    payload: MultiResponseType<ProjectDoc>;
}
export interface IFetchProjectDocFail {
    type: ActionType.FETCH_PROJECTDOX_FAIL;
    payload: String | null;
}

export interface IAddProjectDoc {
    type: ActionType.ADD_PROJECTDOX;
}
export interface IAddProjectDocSuccess {
    type: ActionType.ADD_PROJECTDOX_SUCCESS;
    payload: ProjectDoc;
}
export interface IAddProjectDocFail {
    type: ActionType.ADD_PROJECTDOX_FAIL;
    payload: String | null;
}

export interface IEditProjectDoc {
    type: ActionType.EDIT_PROJECTDOX;
}
export interface IEditProjectDocSuccess {
    type: ActionType.EDIT_PROJECTDOX_SUCCESS;
    payload: ProjectDoc;
}
export interface IEditProjectDocFail {
    type: ActionType.EDIT_PROJECTDOX_FAIL;
    payload: String | null;
}
export interface IDeleteProjectDoc {
    type: ActionType.DELETE_PROJECTDOX;
}
export interface IDeleteProjectDocSuccess {
    type: ActionType.DELETE_PROJECTDOX_SUCCESS;
    payload: number;
}
export interface IDeleteProjectDocFail {
    type: ActionType.DELETE_PROJECTDOX_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchProjectDoc
    | IFetchProjectDocSuccess
    | IFetchProjectDocFail
    | IAddProjectDoc
    | IAddProjectDocSuccess
    | IAddProjectDocFail
    | IEditProjectDoc
    | IEditProjectDocSuccess
    | IEditProjectDocFail
    | IDeleteProjectDoc
    | IDeleteProjectDocSuccess
    | IDeleteProjectDocFail
