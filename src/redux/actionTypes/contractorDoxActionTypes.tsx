import { IContractorDoc as ContractorDoc } from '../../models/contractorDox';
import { MultiResponseType } from '../../models/multiResponseType';

export enum ActionType {
    FETCH_CONTRACTORDOX = 'FETCH_CONTRACTORDOX',
    FETCH_CONTRACTORDOX_SUCCESS = 'FETCH_CONTRACTORDOX_SUCCESS',
    FETCH_CONTRACTORDOX_FAIL = 'FETCH_CONTRACTORDOX_FAIL',
    ADD_CONTRACTORDOX = 'ADD_CONTRACTORDOX',
    ADD_CONTRACTORDOX_SUCCESS = 'ADD_CONTRACTORDOX_SUCCESS',
    ADD_CONTRACTORDOX_FAIL = 'ADD_CONTRACTORDOX_FAIL',
    EDIT_CONTRACTORDOX = 'EDIT_CONTRACTORDOX',
    EDIT_CONTRACTORDOX_SUCCESS = 'EDIT_CONTRACTORDOX_SUCCESS',
    EDIT_CONTRACTORDOX_FAIL = 'EDIT_CONTRACTORDOX_FAIL',
    DELETE_CONTRACTORDOX = 'DELETE_CONTRACTORDOX',
    DELETE_CONTRACTORDOX_SUCCESS = 'DELETE_CONTRACTORDOX_SUCCESS',
    DELETE_CONTRACTORDOX_FAIL = 'DELETE_CONTRACTORDOX_FAIL'
}

export interface IFetchContractorDoc {
    type: ActionType.FETCH_CONTRACTORDOX;
}
export interface IFetchContractorDocSuccess {
    type: ActionType.FETCH_CONTRACTORDOX_SUCCESS;
    payload: MultiResponseType<ContractorDoc>;
}
export interface IFetchContractorDocFail {
    type: ActionType.FETCH_CONTRACTORDOX_FAIL;
    payload: String | null;
}

export interface IAddContractorDoc {
    type: ActionType.ADD_CONTRACTORDOX;
}
export interface IAddContractorDocSuccess {
    type: ActionType.ADD_CONTRACTORDOX_SUCCESS;
    payload: ContractorDoc;
}
export interface IAddContractorDocFail {
    type: ActionType.ADD_CONTRACTORDOX_FAIL;
    payload: String | null;
}

export interface IEditContractorDoc {
    type: ActionType.EDIT_CONTRACTORDOX;
}
export interface IEditContractorDocSuccess {
    type: ActionType.EDIT_CONTRACTORDOX_SUCCESS;
    payload: ContractorDoc;
}
export interface IEditContractorDocFail {
    type: ActionType.EDIT_CONTRACTORDOX_FAIL;
    payload: String | null;
}
export interface IDeleteContractorDoc {
    type: ActionType.DELETE_CONTRACTORDOX;
}
export interface IDeleteContractorDocSuccess {
    type: ActionType.DELETE_CONTRACTORDOX_SUCCESS;
    payload: number;
}
export interface IDeleteContractorDocFail {
    type: ActionType.DELETE_CONTRACTORDOX_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchContractorDoc
    | IFetchContractorDocSuccess
    | IFetchContractorDocFail
    | IAddContractorDoc
    | IAddContractorDocSuccess
    | IAddContractorDocFail
    | IEditContractorDoc
    | IEditContractorDocSuccess
    | IEditContractorDocFail
    | IDeleteContractorDoc
    | IDeleteContractorDocSuccess
    | IDeleteContractorDocFail
