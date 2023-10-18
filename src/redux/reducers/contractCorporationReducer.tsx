import { Reducer } from 'redux';

import { Action, ActionType } from '../actionTypes/contractCorporationActionTypes';
import { IContractCorporation as ContractCorporation } from '../../models/contractCorporation';

export interface IContractCorporationsState {
    contractCorporations: ContractCorporation | null;
    loading: boolean;
    error: String | null,
}
const initialState = {
    contractCorporations: null,
    loading: false,
    error: null,   
};
export const ContractCorporationReducer: Reducer<IContractCorporationsState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_CONTRACTCORPORATIONS:
            return { ...state, loading: true };

        case ActionType.FETCH_CONTRACTCORPORATIONS_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.FETCH_CONTRACTCORPORATIONS_SUCCESS:
            // console.log('action.payload.data: ', action.payload.data)
            return {
                ...state,
                contractCorporations: action.payload.data,
                loading: false
            };
            //[ ...state.contractCorporations, ..._.mapKeys(action.payload, 'id')]

        default:
            return state;
    }
};
