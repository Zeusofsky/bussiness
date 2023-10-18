import { Reducer } from 'redux';
// import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/projectDoxActionTypes';
import { IProjectDoc as ProjectDoc } from '../../models/projectDox';

export interface IProjectDoxState {
    projectDox: ProjectDoc[];
    loading: boolean;
    error: String | null,
}
const initialState = {
    projectDox: [],
    loading: false,
    error: null,   
};
export const ProjectDoxReducer: Reducer<IProjectDoxState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_PROJECTDOX:
        case ActionType.ADD_PROJECTDOX:
        case ActionType.EDIT_PROJECTDOX:
        case ActionType.DELETE_PROJECTDOX:
            return { ...state, loading: true };

        case ActionType.FETCH_PROJECTDOX_FAIL:
        case ActionType.ADD_PROJECTDOX_FAIL:
        case ActionType.EDIT_PROJECTDOX_FAIL:
        case ActionType.DELETE_PROJECTDOX_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.ADD_PROJECTDOX_SUCCESS:
            // console.log("action.payload: ", action.payload)
            return {
                ...state,
                projectDox: [ ...state.projectDox, action.payload ],
                loading: false
            };

        case ActionType.FETCH_PROJECTDOX_SUCCESS:
            return {
                ...state,
                projectDox: action.payload.data,
                loading: false
            };

        case ActionType.EDIT_PROJECTDOX_SUCCESS:
            const projectDoc: ProjectDoc = action.payload
            const index = state.projectDox.findIndex(itm => itm.projectdoxid === projectDoc.projectdoxid)
            const projectDoxPart1 = state.projectDox.slice(0, index)
            const projectDoxPart2 = state.projectDox.slice(index + 1)
            return {
                ...state,
                projectDox: [ ...projectDoxPart1, projectDoc, ...projectDoxPart2 ],
                loading: false
            };
        case ActionType.DELETE_PROJECTDOX_SUCCESS:
            return {
                ...state,
                projectDox: state.projectDox.filter(projectDoc => projectDoc.projectdoxid !== action.payload),
                // projectDox: [ ..._.omit(state.projectDox, action.payload) ]
            };
        default:
            return state;
    }
};
