import { Reducer } from 'redux';
// import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/addendumActionTypes';
import { IAddendum as Addendum } from '../../models/addendum';

export interface IAddendumsState {
    addendums: Addendum[];
    loading: boolean;
    error: String | null,
}
const initialState = {
    addendums: [],
    loading: false,
    error: null,   
};
export const AddendumReducer: Reducer<IAddendumsState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_ADDENDUMS:
        case ActionType.ADD_ADDENDUM:
        case ActionType.EDIT_ADDENDUM:
        case ActionType.DELETE_ADDENDUM:
            return { ...state, loading: true };

        case ActionType.FETCH_ADDENDUMS_FAIL:
        case ActionType.ADD_ADDENDUM_FAIL:
        case ActionType.EDIT_ADDENDUM_FAIL:
        case ActionType.DELETE_ADDENDUM_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.ADD_ADDENDUM_SUCCESS:
            // console.log("action.payload: ", action.payload)
            return {
                ...state,
                addendums: [ ...state.addendums, action.payload ],
                loading: false
            };

        case ActionType.FETCH_ADDENDUMS_SUCCESS:
            return {
                ...state,
                addendums: action.payload.data,
                loading: false
            };

        case ActionType.EDIT_ADDENDUM_SUCCESS:
            const addendum: Addendum = action.payload
            // console.log('================================================================')
            // console.log('@@@addendum: ', addendum)
            // console.log('@@@state.addendums: ', state.addendums)
            const index = state.addendums.findIndex(itm => 
                Number(itm.addendumid) === Number(addendum.addendumid)
            )
            // console.log('@@@index: ', index)
            const addendumsPart1 = state.addendums.slice(0, index)
            // console.log('@@@addendumsPart1: ', addendumsPart1)
            const addendumsPart2 = state.addendums.slice(index + 1)
            // console.log('@@@addendumsPart2: ', addendumsPart2)
            // console.log('@@@after edit reducer: ', [ ...addendumsPart1, addendum, ...addendumsPart2 ])
            // console.log('================================================================')
            return {
                ...state,
                addendums: [ ...addendumsPart1, addendum, ...addendumsPart2 ],
                loading: false
            };
        case ActionType.DELETE_ADDENDUM_SUCCESS:
            return {
                ...state,
                addendums: state.addendums.filter(addendum => addendum.addendumid !== action.payload),
            };

        default:

            return state;
    }
};
