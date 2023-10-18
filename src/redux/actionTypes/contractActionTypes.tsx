import { IContract as Contract } from '../../models/contract';
import { MultiResponseType } from '../../models/multiResponseType'
// import { MultiRecordResponse } from '../actionCreators/actionResultTypes';

export enum ActionType {
    FETCH_CONTRACTS = 'FETCH_CONTRACTS',
    FETCH_CONTRACTS_SUCCESS = 'FETCH_CONTRACTS_SUCCESS',
    FETCH_CONTRACTS_FAIL = 'FETCH_CONTRACTS_FAIL',
    FETCH_CONTRACT = 'FETCH_CONTRACT',
    FETCH_CONTRACT_SUCCESS = 'FETCH_CONTRACT_SUCCESS',
    FETCH_CONTRACT_FAIL = 'FETCH_CONTRACT_FAIL',
    ADD_CONTRACT = 'ADD_CONTRACT',
    ADD_CONTRACT_SUCCESS = 'ADD_CONTRACT_SUCCESS',
    ADD_CONTRACT_FAIL = 'ADD_CONTRACT_FAIL',
    EDIT_CONTRACT = 'EDIT_CONTRACT',
    EDIT_CONTRACT_SUCCESS = 'EDIT_CONTRACT_SUCCESS',
    EDIT_CONTRACT_FAIL = 'EDIT_CONTRACT_FAIL',
    DELETE_CONTRACT = 'DELETE_CONTRACT',
    DELETE_CONTRACT_SUCCESS = 'DELETE_CONTRACT_SUCCESS',
    DELETE_CONTRACT_FAIL = 'DELETE_CONTRACT_FAIL',
    SELECTED_CURRENT_CONTRACT = 'SELECTED_CURRENT_CONTRACT',
}

export interface IFetchContracts {
    type: ActionType.FETCH_CONTRACTS;
}
export interface IFetchContractsSuccess {
    type: ActionType.FETCH_CONTRACTS_SUCCESS;
    // payload: MultiRecordResponse;
    payload: MultiResponseType<Contract>;
}
export interface IFetchContractsFail {
    type: ActionType.FETCH_CONTRACTS_FAIL;
    payload: string | null;
}

export interface IFetchContract {
    type: ActionType.FETCH_CONTRACT;
}
export interface IFetchContractSuccess {
    type: ActionType.FETCH_CONTRACT_SUCCESS;
    payload: Contract;
}
export interface IFetchContractFail {
    type: ActionType.FETCH_CONTRACT_FAIL;
    payload: String | null;
}

export interface IAddContract {
    type: ActionType.ADD_CONTRACT;
}
export interface IAddContractSuccess {
    type: ActionType.ADD_CONTRACT_SUCCESS;
    payload: Contract;
}
export interface IAddContractFail {
    type: ActionType.ADD_CONTRACT_FAIL;
    payload: String | null;
}

export interface IEditContract {
    type: ActionType.EDIT_CONTRACT;
}
export interface IEditContractSuccess {
    type: ActionType.EDIT_CONTRACT_SUCCESS;
    payload: Contract;
}
export interface IEditContractFail {
    type: ActionType.EDIT_CONTRACT_FAIL;
    payload: String | null;
}

export interface IDeleteContract {
    type: ActionType.DELETE_CONTRACT;
}
export interface IDeleteContractSuccess {
    type: ActionType.DELETE_CONTRACT_SUCCESS;
    payload: number;
}
export interface IDeleteContractFail {
    type: ActionType.DELETE_CONTRACT_FAIL;
    payload: String | null;
}

export interface ISelectedCurrentContract {
    type: ActionType.SELECTED_CURRENT_CONTRACT;
    payload: number;
}

export type Action =
    | IFetchContracts
    | IFetchContractsSuccess
    | IFetchContractsFail
    | IFetchContract
    | IFetchContractSuccess
    | IFetchContractFail
    | IAddContract
    | IAddContractSuccess
    | IAddContractFail
    | IEditContract
    | IEditContractSuccess
    | IEditContractFail
    | IDeleteContract
    | IDeleteContractSuccess
    | IDeleteContractFail
    | ISelectedCurrentContract;