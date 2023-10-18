import { Reducer } from 'redux';
// import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/criticalActionActionTypes';
import { ICriticalAction as CriticalAction } from '../../models/criticalAction';

export interface ICriticalActionsState {
    criticalActions: CriticalAction[];
    loading: boolean;
    error: String | null,
    isModalOpen: boolean,
    criticalActionInEditStage: CriticalAction | null,
}
const initialState = {
    criticalActions: [],
    loading: false,
    error: null,   
    isModalOpen: false,
    criticalActionInEditStage: null,
};
export const CriticalActionReducer: Reducer<ICriticalActionsState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_CRITICALACTIONS:
        case ActionType.ADD_CRITICALACTION:
        case ActionType.EDIT_CRITICALACTION:
        case ActionType.DELETE_CRITICALACTION:
            return { ...state, loading: true };

        case ActionType.FETCH_CRITICALACTIONS_FAIL:
        case ActionType.ADD_CRITICALACTION_FAIL:
        case ActionType.EDIT_CRITICALACTION_FAIL:
        case ActionType.DELETE_CRITICALACTION_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.ADD_CRITICALACTION_SUCCESS:
            return {
                ...state,
                criticalActions: [ ...state.criticalActions, action.payload ],
                loading: false
            };

        case ActionType.FETCH_CRITICALACTIONS_SUCCESS:
            return {
                ...state,
                criticalActions: action.payload.data,
                loading: false
            };

        // case ActionType.EDIT_CRITICALACTION_SUCCESS:
        //     const criticalAction: CriticalAction = action.payload

        //     // console.log('================================================================')
        //     // console.log('@@@criticalAction: ', criticalAction)
        //     console.log('@@@state.criticalActions: ', state.criticalActions)
        //     const index = state.criticalActions.findIndex(itm => 
        //         Number(itm.criticalactionid) === Number(criticalAction.criticalactionid)
        //     )
        //     // console.log('@@@index: ', index)
        //     const criticalActionsPart1 = state.criticalActions.slice(0, index)
        //     // console.log('@@@criticalActionsPart1: ', criticalActionsPart1)
        //     const criticalActionsPart2 = state.criticalActions.slice(index + 1)
        //     // console.log('@@@criticalActionsPart2: ', criticalActionsPart2)
        //     // console.log('@@@after edit reducer: ', [ ...criticalActionsPart1, criticalAction, ...criticalActionsPart2 ])
        //     // console.log('================================================================')
        //     return {
        //         ...state,
        //         criticalActions: [ ...criticalActionsPart1, criticalAction, ...criticalActionsPart2 ],
        //         loading: false
        //     };
        case ActionType.DELETE_CRITICALACTION_SUCCESS:
            return {
                ...state,
                criticalActions: state.criticalActions.filter(criticalAction => criticalAction.criticalactionid !== action.payload),
            };
        case ActionType.START_ADD_CRITICALACTION:
            return {
                ...state,
                isModalOpen: true,
                criticalActionInEditStage: null,
            };
        case ActionType.START_EDIT_CRITICALACTION:
            return {
                ...state,
                isModalOpen: true,
                criticalActionInEditStage: action.payload,
            };
        case ActionType.TOGGLE_CRITICALACTION_MODAL:
            return {
                ...state,
                isModalOpen: !state.isModalOpen
            };
        default:
            return state;
    }
};
