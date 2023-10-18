import { IContractConsultant as ContractConsultant } from '../../models/contractConsultant';
import { MultiResponseType } from '../../models/multiResponseType'
// import { MultiRecordResponse } from '../actionCreators/actionResultTypes';

export enum ActionType {
    FETCH_CONTRACTCONSULTANTS = 'FETCH_CONTRACTCONSULTANTS',
    FETCH_CONTRACTCONSULTANTS_SUCCESS = 'FETCH_CONTRACTCONSULTANTS_SUCCESS',
    FETCH_CONTRACTCONSULTANTS_FAIL = 'FETCH_CONTRACTCONSULTANTS_FAIL',
}

export interface IFetchContractConsultants {
    type: ActionType.FETCH_CONTRACTCONSULTANTS;
}
export interface IFetchContractConsultantsSuccess {
    type: ActionType.FETCH_CONTRACTCONSULTANTS_SUCCESS;
    // payload: MultiRecordResponse;
    payload: MultiResponseType<ContractConsultant>
}
export interface IFetchContractConsultantsFail {
    type: ActionType.FETCH_CONTRACTCONSULTANTS_FAIL;
    payload: string | null;
}

export type Action =
    | IFetchContractConsultants
    | IFetchContractConsultantsSuccess
    | IFetchContractConsultantsFail


