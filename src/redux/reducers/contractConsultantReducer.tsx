import { Reducer } from 'redux';

import { Action, ActionType } from '../actionTypes/contractConsultantActionTypes';
import { IContractConsultant as ContractConsultant } from '../../models/contractConsultant';

export interface IContractConsultantsState {
    contractConsultants: ContractConsultant[];
    loading: boolean;
    error: String | null,
}
const initialState = {
    contractConsultants: [],
    loading: false,
    error: null,   
};
export const ContractConsultantReducer: Reducer<IContractConsultantsState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_CONTRACTCONSULTANTS:
            return { ...state, loading: true };

        case ActionType.FETCH_CONTRACTCONSULTANTS_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.FETCH_CONTRACTCONSULTANTS_SUCCESS:
            return {
                ...state,
                contractConsultants: action.payload.data,
                loading: false
            };
            //[ ...state.contractConsultants, ..._.mapKeys(action.payload, 'id')]

        default:
            return state;
    }
};
