import { Reducer } from 'redux';
// import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/projectMonthlyDoxActionTypes';
import { IProjectMonthlyDoc as ProjectMonthlyDoc } from '../../models/projectMonthlyDox';

export interface IProjectMonthlyDoxState {
    projectMonthlyDox: ProjectMonthlyDoc[];
    loading: boolean;
    error: String | null,
}
const initialState = {
    projectMonthlyDox: [],
    loading: false,
    error: null,   
};
export const ProjectMonthlyDoxReducer: Reducer<IProjectMonthlyDoxState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_PROJECTMONTHLYDOX:
        case ActionType.ADD_PROJECTMONTHLYDOX:
        case ActionType.EDIT_PROJECTMONTHLYDOX:
        case ActionType.DELETE_PROJECTMONTHLYDOX:
            return { ...state, loading: true };

        case ActionType.FETCH_PROJECTMONTHLYDOX_FAIL:
        case ActionType.ADD_PROJECTMONTHLYDOX_FAIL:
        case ActionType.EDIT_PROJECTMONTHLYDOX_FAIL:
        case ActionType.DELETE_PROJECTMONTHLYDOX_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.ADD_PROJECTMONTHLYDOX_SUCCESS:
            // console.log("action.payload: ", action.payload)
            return {
                ...state,
                projectMonthlyDox: [ ...state.projectMonthlyDox, action.payload ],
                loading: false
            };

        case ActionType.FETCH_PROJECTMONTHLYDOX_SUCCESS:
            return {
                ...state,
                projectMonthlyDox: action.payload.data,
                loading: false
            };

        case ActionType.EDIT_PROJECTMONTHLYDOX_SUCCESS:
            const projectMonthlyDoc: ProjectMonthlyDoc = action.payload
            const index = state.projectMonthlyDox.findIndex(itm => itm.projectmonthlydoxid === projectMonthlyDoc.projectmonthlydoxid)
            const projectMonthlyDoxPart1 = state.projectMonthlyDox.slice(0, index)
            const projectMonthlyDoxPart2 = state.projectMonthlyDox.slice(index + 1)
            return {
                ...state,
                projectMonthlyDox: [ ...projectMonthlyDoxPart1, projectMonthlyDoc, ...projectMonthlyDoxPart2 ],
                loading: false
            };
        case ActionType.DELETE_PROJECTMONTHLYDOX_SUCCESS:
            return {
                ...state,
                projectMonthlyDox: state.projectMonthlyDox.filter(projectMonthlyDoc => projectMonthlyDoc.projectmonthlydoxid !== action.payload),
                // projectMonthlyDox: [ ..._.omit(state.projectMonthlyDox, action.payload) ]
            };
        default:
            return state;
    }
};
