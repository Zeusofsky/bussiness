import { Reducer } from 'redux';
// import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/contractorDoxActionTypes';
import { IContractorDoc as ContractorDoc } from '../../models/contractorDox';

export interface IContractorDoxState {
    contractorDox: ContractorDoc[];
    loading: boolean;
    error: String | null,
}
const initialState = {
    contractorDox: [],
    loading: false,
    error: null,   
};
export const ContractorDoxReducer: Reducer<IContractorDoxState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_CONTRACTORDOX:
        case ActionType.ADD_CONTRACTORDOX:
        case ActionType.EDIT_CONTRACTORDOX:
        case ActionType.DELETE_CONTRACTORDOX:
            return { ...state, loading: true };

        case ActionType.FETCH_CONTRACTORDOX_FAIL:
        case ActionType.ADD_CONTRACTORDOX_FAIL:
        case ActionType.EDIT_CONTRACTORDOX_FAIL:
        case ActionType.DELETE_CONTRACTORDOX_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.ADD_CONTRACTORDOX_SUCCESS:
            // console.log("action.payload: ", action.payload)
            return {
                ...state,
                contractorDox: [ ...state.contractorDox, action.payload ],
                loading: false
            };

        case ActionType.FETCH_CONTRACTORDOX_SUCCESS:
            return {
                ...state,
                contractorDox: action.payload.data,
                loading: false
            };

        case ActionType.EDIT_CONTRACTORDOX_SUCCESS:
            const contractorDoc: ContractorDoc = action.payload
            const index = state.contractorDox.findIndex(itm => itm.contractordoxid === contractorDoc.contractordoxid)
            const contractorDoxPart1 = state.contractorDox.slice(0, index)
            const contractorDoxPart2 = state.contractorDox.slice(index + 1)
            return {
                ...state,
                contractorDox: [ ...contractorDoxPart1, contractorDoc, ...contractorDoxPart2 ],
                loading: false
            };
        case ActionType.DELETE_CONTRACTORDOX_SUCCESS:
            return {
                ...state,
                contractorDox: state.contractorDox.filter(contractorDoc => contractorDoc.contractordoxid !== action.payload),
                // contractorDox: [ ..._.omit(state.contractorDox, action.payload) ]
            };
        default:
            return state;
    }
};
