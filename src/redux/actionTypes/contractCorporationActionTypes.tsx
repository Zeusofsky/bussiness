import { IContractCorporation as ContractCorporation } from '../../models/contractCorporation';
// import { MultiResponseType } from '../../models/multiResponseType'
import { SingleResponseType } from '../../models/singleResponseType'

// import { MultiRecordResponse } from '../actionCreators/actionResultTypes';

export enum ActionType {
    FETCH_CONTRACTCORPORATIONS = 'FETCH_CONTRACTCORPORATIONS',
    FETCH_CONTRACTCORPORATIONS_SUCCESS = 'FETCH_CONTRACTCORPORATIONS_SUCCESS',
    FETCH_CONTRACTCORPORATIONS_FAIL = 'FETCH_CONTRACTCORPORATIONS_FAIL',
}

export interface IFetchContractCorporations {
    type: ActionType.FETCH_CONTRACTCORPORATIONS;
}
export interface IFetchContractCorporationsSuccess {
    type: ActionType.FETCH_CONTRACTCORPORATIONS_SUCCESS;
    // payload: MultiRecordResponse;
    payload: SingleResponseType<ContractCorporation>
}
export interface IFetchContractCorporationsFail {
    type: ActionType.FETCH_CONTRACTCORPORATIONS_FAIL;
    payload: string | null;
}

export type Action =
    | IFetchContractCorporations
    | IFetchContractCorporationsSuccess
    | IFetchContractCorporationsFail


