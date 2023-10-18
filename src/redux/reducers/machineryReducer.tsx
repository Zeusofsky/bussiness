import { Reducer } from 'redux';
// import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/machineryActionTypes';
import { IMachinery as Machinery } from '../../models/machinery';

export interface IMachineriesState {
    machineries: Machinery[];
    loading: boolean;
    error: String | null,
}
const initialState = {
    machineries: [],
    loading: false,
    error: null,   
};
export const MachineryReducer: Reducer<IMachineriesState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_MACHINERIES:
        case ActionType.ADD_MACHINERY:
        case ActionType.EDIT_MACHINERY:
        case ActionType.DELETE_MACHINERY:
            return { ...state, loading: true };

        case ActionType.FETCH_MACHINERIES_FAIL:
        case ActionType.ADD_MACHINERY_FAIL:
        case ActionType.EDIT_MACHINERY_FAIL:
        case ActionType.DELETE_MACHINERY_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.ADD_MACHINERY_SUCCESS:
            // console.log("action.payload: ", action.payload)
            return {
                ...state,
                machineries: [ ...state.machineries, action.payload ],
                loading: false
            };

        case ActionType.FETCH_MACHINERIES_SUCCESS:
            return {
                ...state,
                machineries: action.payload.data,
                loading: false
            };

        // case ActionType.EDIT_MACHINERY_SUCCESS:
        //     const machinery: Machinery = action.payload
        //     // console.log('================================================================')
        //     // console.log('@@@machinery: ', machinery)
        //     console.log('@@@state.machineries: ', state.machineries)
        //     const index = state.machineries.findIndex(itm => 
        //         Number(itm.machinaryid) === Number(machinery.machinaryid)
        //     )
        //     // console.log('@@@index: ', index)
        //     const machineriesPart1 = state.machineries.slice(0, index)
        //     // console.log('@@@machineriesPart1: ', machineriesPart1)
        //     const machineriesPart2 = state.machineries.slice(index + 1)
        //     // console.log('@@@machineriesPart2: ', machineriesPart2)
        //     // console.log('@@@after edit reducer: ', [ ...machineriesPart1, machinery, ...machineriesPart2 ])
        //     // console.log('================================================================')
        //     return {
        //         ...state,
        //         machineries: [ ...machineriesPart1, machinery, ...machineriesPart2 ],
        //         loading: false
        //     };
        case ActionType.DELETE_MACHINERY_SUCCESS:
            return {
                ...state,
                machineries: state.machineries.filter(machinery => machinery.machinaryid !== action.payload),
            };

        default:

            return state;
    }
};
