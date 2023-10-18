import { Reducer } from 'redux';
// import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/hseActionTypes';
import { IHse as Hse } from '../../models/hse';

export interface IHseState {
    hse: Hse;
    loading: boolean;
    error: String | null,
}
const initialState = {
    hse: {
        hseid: 0,
        contractid: 0,
        dateid: 0,
        totaloperationdays: 0,
        withouteventdays: 0,
        deathno: 0,
        woundno: 0,
        disadvantageeventno: 0,
    },
    loading: false,
    error: null,   
};
export const HseReducer: Reducer<IHseState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_HSES:
        case ActionType.ADD_HSE:
        case ActionType.EDIT_HSE:
        case ActionType.DELETE_HSE:
            return { ...state, loading: true };

        case ActionType.FETCH_HSES_FAIL:
        case ActionType.ADD_HSE_FAIL:
        case ActionType.EDIT_HSE_FAIL:
        case ActionType.DELETE_HSE_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.ADD_HSE_SUCCESS:
            // console.log("action.payload: ", action.payload)
            return {
                ...state,
                hse: action.payload,
                loading: false
            };

        case ActionType.FETCH_HSES_SUCCESS:
            // console.log("action.payload: ", action.payload.data)
            return {
                ...state,
                hse: action.payload.data,
                loading: false
            };

        case ActionType.EDIT_HSE_SUCCESS:
            const hse: Hse = action.payload
            return {
                ...state,
                hse: hse, 
                loading: false
            };

        default:
            return state;
    }
};
