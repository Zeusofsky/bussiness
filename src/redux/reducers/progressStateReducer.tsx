import { Reducer } from 'redux';
// import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/progressStateActionTypes';
import { IProgressState as ProgressState } from '../../models/progressState';

export interface IProgressStatesState {
    progressStates: ProgressState[];
    loading: boolean;
    error: String | null,
}
const initialState = {
    progressStates: [],
    loading: false,
    error: null,   
};
export const ProgressStateReducer: Reducer<IProgressStatesState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_PROGRESSSTATES:
        case ActionType.ADD_PROGRESSSTATE:
        case ActionType.EDIT_PROGRESSSTATE:
        case ActionType.DELETE_PROGRESSSTATE:
            return { ...state, loading: true };

        case ActionType.FETCH_PROGRESSSTATES_FAIL:
        case ActionType.ADD_PROGRESSSTATE_FAIL:
        case ActionType.EDIT_PROGRESSSTATE_FAIL:
        case ActionType.DELETE_PROGRESSSTATE_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.ADD_PROGRESSSTATE_SUCCESS:
            // console.log("action.payload: ", action.payload)
            return {
                ...state,
                progressStates: [ ...state.progressStates, action.payload ],
                loading: false
            };

        case ActionType.FETCH_PROGRESSSTATES_SUCCESS:
            return {
                ...state,
                progressStates: action.payload.data,
                loading: false
            };

        // case ActionType.EDIT_PROGRESSSTATE_SUCCESS:
        //     const progressState: ProgressState = action.payload
        //     // console.log('================================================================')
        //     // console.log('@@@progressState: ', progressState)
        //     console.log('@@@state.progressStates: ', state.progressStates)
        //     const index = state.progressStates.findIndex(itm => 
        //         Number(itm.progressStateid) === Number(progressState.progressStateid)
        //     )
        //     // console.log('@@@index: ', index)
        //     const progressStatesPart1 = state.progressStates.slice(0, index)
        //     // console.log('@@@progressStatesPart1: ', progressStatesPart1)
        //     const progressStatesPart2 = state.progressStates.slice(index + 1)
        //     // console.log('@@@progressStatesPart2: ', progressStatesPart2)
        //     // console.log('@@@after edit reducer: ', [ ...progressStatesPart1, progressState, ...progressStatesPart2 ])
        //     // console.log('================================================================')
        //     return {
        //         ...state,
        //         progressStates: [ ...progressStatesPart1, progressState, ...progressStatesPart2 ],
        //         loading: false
        //     };
        case ActionType.DELETE_PROGRESSSTATE_SUCCESS:
            return {
                ...state,
                progressStates: state.progressStates.filter(progressState => progressState.progressstateid !== action.payload),
            };

        default:

            return state;
    }
};
