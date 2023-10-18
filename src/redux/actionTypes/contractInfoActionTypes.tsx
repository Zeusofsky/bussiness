import { IContractInfo as ContractInfo } from '../../models/contractInfo';
import { SingleResponseTypeEx } from '../../models/singleResponseTypeEx';
// import { MultiRecordResponse } from '../actionCreators/actionResultTypes';

export enum ActionType {
    FETCH_CONTRACTINFO = 'FETCH_CONTRACTINFO',
    FETCH_CONTRACTINFO_SUCCESS = 'FETCH_CONTRACTINFO_SUCCESS',
    FETCH_CONTRACTINFO_FAIL = 'FETCH_CONTRACTINFO_FAIL',
    EDIT_CONTRACTINFO = 'EDIT_CONTRACTINFO',
    EDIT_CONTRACTINFO_SUCCESS = 'EDIT_CONTRACTINFO_SUCCESS',
    EDIT_CONTRACTINFO_FAIL = 'EDIT_CONTRACTINFO_FAIL',
    EDIT_CONTRACTDATES_SUCCESS = 'EDIT_CONTRACTDATES_SUCCESS',
    EDIT_PROJECTMANAGERCONFIRM_SUCCESS = 'EDIT_PROJECTMANAGERCONFIRM_SUCCESS',
}

export interface IFetchContractInfo {
    type: ActionType.FETCH_CONTRACTINFO;
}
export interface IFetchContractInfoSuccess {
    type: ActionType.FETCH_CONTRACTINFO_SUCCESS;
    payload: SingleResponseTypeEx<ContractInfo>
}
export interface IFetchContractInfoFail {
    type: ActionType.FETCH_CONTRACTINFO_FAIL;
    payload: String | null;
}
export interface IEditContractInfo {
    type: ActionType.EDIT_CONTRACTINFO;
}
export interface IEditContractInfoSuccess {
    type: ActionType.EDIT_CONTRACTINFO_SUCCESS;
    payload: SingleResponseTypeEx<ContractInfo>
}
export interface IEditContractDatesSuccess {
    type: ActionType.EDIT_CONTRACTDATES_SUCCESS;
}
export interface IProjectManagerConfirmSuccess {
    type: ActionType.EDIT_PROJECTMANAGERCONFIRM_SUCCESS;
}
export interface IEditContractInfoFail {
    type: ActionType.EDIT_CONTRACTINFO_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchContractInfo
    | IFetchContractInfoSuccess
    | IFetchContractInfoFail
    | IEditContractInfo
    | IEditContractInfoSuccess
    | IEditContractInfoFail
    | IEditContractDatesSuccess
    | IProjectManagerConfirmSuccess
