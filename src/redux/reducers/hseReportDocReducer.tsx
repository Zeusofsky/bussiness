import { Reducer } from 'redux';
// import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/hseReportDocActionTypes';
import { IHseReportDoc as HseReportDoc } from '../../models/hseReportDox';

export interface IHseReportDoxState {
    hseReportDox: HseReportDoc[];
    loading: boolean;
    error: String | null,
}
const initialState = {
    hseReportDox: [],
    loading: false,
    error: null,   
};
export const HseReportDoxReducer: Reducer<IHseReportDoxState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_HSEREPORTDOX:
        case ActionType.ADD_HSEREPORTDOX:
        case ActionType.EDIT_HSEREPORTDOX:
        case ActionType.DELETE_HSEREPORTDOX:
            return { ...state, loading: true };

        case ActionType.FETCH_HSEREPORTDOX_FAIL:
        case ActionType.ADD_HSEREPORTDOX_FAIL:
        case ActionType.EDIT_HSEREPORTDOX_FAIL:
        case ActionType.DELETE_HSEREPORTDOX_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.ADD_HSEREPORTDOX_SUCCESS:
            // console.log("action.payload: ", action.payload)
            return {
                ...state,
                hseReportDox: [ ...state.hseReportDox, action.payload ],
                loading: false
            };

        case ActionType.FETCH_HSEREPORTDOX_SUCCESS:
            return {
                ...state,
                hseReportDox: action.payload.data,
                loading: false
            };

        case ActionType.EDIT_HSEREPORTDOX_SUCCESS:
            const hseReportDoc: HseReportDoc = action.payload
            const index = state.hseReportDox.findIndex(itm => itm.hsereportdoxid === hseReportDoc.hsereportdoxid)
            const hseReportDoxPart1 = state.hseReportDox.slice(0, index)
            const hseReportDoxPart2 = state.hseReportDox.slice(index + 1)
            return {
                ...state,
                hseReportDox: [ ...hseReportDoxPart1, hseReportDoc, ...hseReportDoxPart2 ],
                loading: false
            };
        case ActionType.DELETE_HSEREPORTDOX_SUCCESS:
            return {
                ...state,
                hseReportDox: state.hseReportDox.filter(hseReportDoc => hseReportDoc.hsereportdoxid !== action.payload),
                // hseReportDox: [ ..._.omit(state.hseReportDox, action.payload) ]
            };
        default:
            return state;
    }
};
