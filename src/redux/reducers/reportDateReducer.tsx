import { Reducer } from 'redux';
import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/reportDateActionType';
import { IReportDate as ReportDate } from '../../models/reportDate';

export interface IReportDatesState {
    reportDates: ReportDate[];
    currentReportDateId: number,
    loading: boolean;
    error: String | null,
}
const initialState = {
    reportDates: [],
    currentReportDateId: 0,
    loading: false,
    error: null,   
};
export const ReportDateReducer: Reducer<IReportDatesState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_REPORTDATE:
        case ActionType.FETCH_REPORTDATES:
        case ActionType.ADD_REPORTDATE:
        case ActionType.EDIT_REPORTDATE:
        case ActionType.DELETE_REPORTDATE:
            return { ...state, loading: true };

        case ActionType.FETCH_REPORTDATE_FAIL:
        case ActionType.FETCH_REPORTDATES_FAIL:
        case ActionType.ADD_REPORTDATE_FAIL:
        case ActionType.EDIT_REPORTDATE_FAIL:
        case ActionType.DELETE_REPORTDATE_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.FETCH_REPORTDATE_SUCCESS:
        case ActionType.ADD_REPORTDATE_SUCCESS:
            // const { id } = action.payload;[id]: 
            return {
                ...state,
                reportDates: [ ...state.reportDates, action.payload ],
                loading: false
            };

        case ActionType.FETCH_REPORTDATES_SUCCESS:
            return {
                ...state,
                reportDates: action.payload.data,
                loading: false
            };
            //[ ...state.reportDates, ..._.mapKeys(action.payload, 'id')]

        case ActionType.EDIT_REPORTDATE_SUCCESS:
            const reportDate: ReportDate = action.payload
            const index = state.reportDates.findIndex(itm => itm.dateid === reportDate.dateid)
            const reportDatesPart1 = state.reportDates.slice(0, index)
            const reportDatesPart2 = state.reportDates.slice(index + 1)
            return {
                ...state,
                reportDates: [ ...reportDatesPart1, reportDate, ...reportDatesPart2 ],
                loading: false
            };
        case ActionType.DELETE_REPORTDATE_SUCCESS:
            return {
                ...state,
                reportDates: [ ..._.omit(state.reportDates, action.payload) ]
            };
        case ActionType.SELECTED_CURRENT_REPORTDATE:
            return {
                ...state,
                currentReportDateId: action.payload
            };
        default:
            return state;
    }
};
