import { Reducer } from 'redux';
// import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/timeProgressStateActionTypes';
import { ITimeProgressState as TimeProgressState } from '../../models/timeProgressState';

export interface ITimeProgressStatesState {
    timeProgressStates: TimeProgressState[];
    loading: boolean;
    error: String | null,
}
const initialState = {
    timeProgressStates: [],
    loading: false,
    error: null,   
};
export const TimeProgressStateReducer: Reducer<ITimeProgressStatesState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_TIMEPROGRESSSTATES:
        case ActionType.ADD_TIMEPROGRESSSTATE:
        case ActionType.EDIT_TIMEPROGRESSSTATE:
        case ActionType.DELETE_TIMEPROGRESSSTATE:
            return { ...state, loading: true };

        case ActionType.FETCH_TIMEPROGRESSSTATES_FAIL:
        case ActionType.ADD_TIMEPROGRESSSTATE_FAIL:
        case ActionType.EDIT_TIMEPROGRESSSTATE_FAIL:
        case ActionType.DELETE_TIMEPROGRESSSTATE_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.ADD_TIMEPROGRESSSTATE_SUCCESS:
            // console.log("action.payload: ", action.payload)
            return {
                ...state,
                timeProgressStates: [ ...state.timeProgressStates, action.payload ],
                loading: false
            };

        case ActionType.FETCH_TIMEPROGRESSSTATES_SUCCESS:
            return {
                ...state,
                timeProgressStates: action.payload.data,
                loading: false
            };

        // case ActionType.EDIT_TIMEPROGRESSSTATE_SUCCESS:
        //     const timeProgressState: TimeProgressState = action.payload
        //     // console.log('================================================================')
        //     // console.log('@@@timeProgressState: ', timeProgressState)
        //     console.log('@@@state.timeProgressStates: ', state.timeProgressStates)
        //     const index = state.timeProgressStates.findIndex(itm => 
        //         Number(itm.timeProgressStateid) === Number(timeProgressState.timeProgressStateid)
        //     )
        //     // console.log('@@@index: ', index)
        //     const timeProgressStatesPart1 = state.timeProgressStates.slice(0, index)
        //     // console.log('@@@timeProgressStatesPart1: ', timeProgressStatesPart1)
        //     const timeProgressStatesPart2 = state.timeProgressStates.slice(index + 1)
        //     // console.log('@@@timeProgressStatesPart2: ', timeProgressStatesPart2)
        //     // console.log('@@@after edit reducer: ', [ ...timeProgressStatesPart1, timeProgressState, ...timeProgressStatesPart2 ])
        //     // console.log('================================================================')
        //     return {
        //         ...state,
        //         timeProgressStates: [ ...timeProgressStatesPart1, timeProgressState, ...timeProgressStatesPart2 ],
        //         loading: false
        //     };
        case ActionType.DELETE_TIMEPROGRESSSTATE_SUCCESS:
            return {
                ...state,
                timeProgressStates: state.timeProgressStates.filter(timeProgressState => timeProgressState.timeprogressstateid !== action.payload),
            };

        default:

            return state;
    }
};
