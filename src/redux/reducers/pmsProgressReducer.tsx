import { Reducer } from 'redux';
// import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/pmsProgressActionTypes';
import { IPmsProgress as PmsProgress } from '../../models/pmsProgress';

export interface IPmsProgressesState {
    pmsProgresses: PmsProgress[];
    loading: boolean;
    error: String | null,
}
const initialState = {
    pmsProgresses: [],
    loading: false,
    error: null,   
};
export const PmsProgressReducer: Reducer<IPmsProgressesState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_PMSPROGRESSES:
        case ActionType.ADD_PMSPROGRESS:
        case ActionType.EDIT_PMSPROGRESS:
        case ActionType.DELETE_PMSPROGRESS:
            return { ...state, loading: true };

        case ActionType.FETCH_PMSPROGRESSES_FAIL:
        case ActionType.ADD_PMSPROGRESS_FAIL:
        case ActionType.EDIT_PMSPROGRESS_FAIL:
        case ActionType.DELETE_PMSPROGRESS_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.ADD_PMSPROGRESS_SUCCESS:
            // console.log("action.payload: ", action.payload)
            return {
                ...state,
                pmsProgresses: [ ...state.pmsProgresses, action.payload ],
                loading: false
            };

        case ActionType.FETCH_PMSPROGRESSES_SUCCESS:
            return {
                ...state,
                pmsProgresses: action.payload.data,
                loading: false
            };

        // case ActionType.EDIT_PMSPROGRESS_SUCCESS:
        //     const pmsProgress: PmsProgress = action.payload
        //     // console.log('================================================================')
        //     // console.log('@@@pmsProgress: ', pmsProgress)
        //     console.log('@@@state.pmsProgresses: ', state.pmsProgresses)
        //     const index = state.pmsProgresses.findIndex(itm => 
        //         Number(itm.pmsprogressid) === Number(pmsProgress.pmsprogressid)
        //     )
        //     // console.log('@@@index: ', index)
        //     const pmsProgressesPart1 = state.pmsProgresses.slice(0, index)
        //     // console.log('@@@pmsProgressesPart1: ', pmsProgressesPart1)
        //     const pmsProgressesPart2 = state.pmsProgresses.slice(index + 1)
        //     // console.log('@@@pmsProgressesPart2: ', pmsProgressesPart2)
        //     // console.log('@@@after edit reducer: ', [ ...pmsProgressesPart1, pmsProgress, ...pmsProgressesPart2 ])
        //     // console.log('================================================================')
        //     return {
        //         ...state,
        //         pmsProgresses: [ ...pmsProgressesPart1, pmsProgress, ...pmsProgressesPart2 ],
        //         loading: false
        //     };
        case ActionType.DELETE_PMSPROGRESS_SUCCESS:
            return {
                ...state,
                pmsProgresses: state.pmsProgresses.filter(pmsProgress => pmsProgress.pmsprogressid !== action.payload),
            };

        default:

            return state;
    }
};
