import { Reducer } from 'redux';
import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/contractActionTypes';
import { IContract as Contract } from '../../models/contract';

export interface IContractsState {
    contracts: Contract[];
    currentContractId: number,
    loading: boolean;
    error: String | null,
}
const initialState = {
    contracts: [],
    currentContractId: 0,
    loading: false,
    error: null,   
};
export const ContractReducer: Reducer<IContractsState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_CONTRACT:
        case ActionType.FETCH_CONTRACTS:
        case ActionType.ADD_CONTRACT:
        case ActionType.EDIT_CONTRACT:
        case ActionType.DELETE_CONTRACT:
            return { ...state, loading: true };

        case ActionType.FETCH_CONTRACT_FAIL:
        case ActionType.FETCH_CONTRACTS_FAIL:
        case ActionType.ADD_CONTRACT_FAIL:
        case ActionType.EDIT_CONTRACT_FAIL:
        case ActionType.DELETE_CONTRACT_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.FETCH_CONTRACT_SUCCESS:
        case ActionType.ADD_CONTRACT_SUCCESS:
            // const { id } = action.payload;[id]: 
            return {
                ...state,
                contracts: [ ...state.contracts, action.payload ],
                loading: false
            };

        case ActionType.FETCH_CONTRACTS_SUCCESS:
            return {
                ...state,
                contracts: action.payload.data,
                loading: false
            };
            //[ ...state.contracts, ..._.mapKeys(action.payload, 'id')]

        case ActionType.EDIT_CONTRACT_SUCCESS:
            const contract: Contract = action.payload
            const index = state.contracts.findIndex(itm => itm.contractid === contract.contractid)
            const contractsPart1 = state.contracts.slice(0, index)
            const contractsPart2 = state.contracts.slice(index + 1)
            return {
                ...state,
                contracts: [ ...contractsPart1, contract, ...contractsPart2 ],
                loading: false
            };
        case ActionType.DELETE_CONTRACT_SUCCESS:
            return {
                ...state,
                contracts: [ ..._.omit(state.contracts, action.payload) ]
            };
        case ActionType.SELECTED_CURRENT_CONTRACT:
            // console.log('currentContractId = action.payload: ', action.payload)
            return {
                ...state,
                currentContractId: action.payload
            };
        default:
            return state;
    }
};
