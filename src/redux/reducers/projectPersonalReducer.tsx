import { Reducer } from 'redux';
// import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/projectPersonalActionTypes';
import { IProjectPersonal as ProjectPersonal } from '../../models/projectPersonal';

export interface IProjectPersonalsState {
    projectPersonals: ProjectPersonal[];
    loading: boolean;
    error: String | null,
}
const initialState = {
    projectPersonals: [],
    loading: false,
    error: null,   
};
export const ProjectPersonalReducer: Reducer<IProjectPersonalsState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_PROJECTPERSONALS:
        case ActionType.ADD_PROJECTPERSONAL:
        case ActionType.EDIT_PROJECTPERSONAL:
        case ActionType.DELETE_PROJECTPERSONAL:
            return { ...state, loading: true };

        case ActionType.FETCH_PROJECTPERSONALS_FAIL:
        case ActionType.ADD_PROJECTPERSONAL_FAIL:
        case ActionType.EDIT_PROJECTPERSONAL_FAIL:
        case ActionType.DELETE_PROJECTPERSONAL_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.ADD_PROJECTPERSONAL_SUCCESS:
            // console.log("action.payload: ", action.payload)
            return {
                ...state,
                projectPersonals: [ ...state.projectPersonals, action.payload ],
                loading: false
            };

        case ActionType.FETCH_PROJECTPERSONALS_SUCCESS:
            return {
                ...state,
                projectPersonals: action.payload.data,
                loading: false
            };

        // case ActionType.EDIT_PROJECTPERSONAL_SUCCESS:
        //     const projectPersonal: ProjectPersonal = action.payload
        //     // console.log('================================================================')
        //     // console.log('@@@projectPersonal: ', projectPersonal)
        //     console.log('@@@state.projectPersonals: ', state.projectPersonals)
        //     const index = state.projectPersonals.findIndex(itm => 
        //         Number(itm.projectpersonelid) === Number(projectPersonal.projectpersonelid)
        //     )
        //     // console.log('@@@index: ', index)
        //     const projectPersonalsPart1 = state.projectPersonals.slice(0, index)
        //     // console.log('@@@projectPersonalsPart1: ', projectPersonalsPart1)
        //     const projectPersonalsPart2 = state.projectPersonals.slice(index + 1)
        //     // console.log('@@@projectPersonalsPart2: ', projectPersonalsPart2)
        //     // console.log('@@@after edit reducer: ', [ ...projectPersonalsPart1, projectPersonal, ...projectPersonalsPart2 ])
        //     // console.log('================================================================')
        //     return {
        //         ...state,
        //         projectPersonals: [ ...projectPersonalsPart1, projectPersonal, ...projectPersonalsPart2 ],
        //         loading: false
        //     };
        case ActionType.DELETE_PROJECTPERSONAL_SUCCESS:
            return {
                ...state,
                projectPersonals: state.projectPersonals.filter(projectPersonal => projectPersonal.projectpersonelid !== action.payload),
            };

        default:

            return state;
    }
};
