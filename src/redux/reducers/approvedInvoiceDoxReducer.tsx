import { Reducer } from 'redux';
// import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/approvedInvoiceDoxActionTypes';
import { IApprovedInvoiceDoc as ApprovedInvoiceDoc } from '../../models/approvedInvoiceDox';

export interface IApprovedInvoiceDoxState {
    approvedInvoiceDox: ApprovedInvoiceDoc[];
    loading: boolean;
    error: String | null,
}
const initialState = {
    approvedInvoiceDox: [],
    loading: false,
    error: null,   
};
export const ApprovedInvoiceDoxReducer: Reducer<IApprovedInvoiceDoxState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_APPROVEDINVOICEDOX:
        case ActionType.ADD_APPROVEDINVOICEDOX:
        case ActionType.EDIT_APPROVEDINVOICEDOX:
        case ActionType.DELETE_APPROVEDINVOICEDOX:
            return { ...state, loading: true };

        case ActionType.FETCH_APPROVEDINVOICEDOX_FAIL:
        case ActionType.ADD_APPROVEDINVOICEDOX_FAIL:
        case ActionType.EDIT_APPROVEDINVOICEDOX_FAIL:
        case ActionType.DELETE_APPROVEDINVOICEDOX_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.ADD_APPROVEDINVOICEDOX_SUCCESS:
            // console.log("action.payload: ", action.payload)
            return {
                ...state,
                approvedInvoiceDox: [ ...state.approvedInvoiceDox, action.payload ],
                loading: false
            };

        case ActionType.FETCH_APPROVEDINVOICEDOX_SUCCESS:
            return {
                ...state,
                approvedInvoiceDox: action.payload.data,
                loading: false
            };

        case ActionType.EDIT_APPROVEDINVOICEDOX_SUCCESS:
            const approvedInvoiceDoc: ApprovedInvoiceDoc = action.payload
            const index = state.approvedInvoiceDox.findIndex(itm => itm.approvedinvoicedoxid === approvedInvoiceDoc.approvedinvoicedoxid)
            const approvedInvoiceDoxPart1 = state.approvedInvoiceDox.slice(0, index)
            const approvedInvoiceDoxPart2 = state.approvedInvoiceDox.slice(index + 1)
            return {
                ...state,
                approvedInvoiceDox: [ ...approvedInvoiceDoxPart1, approvedInvoiceDoc, ...approvedInvoiceDoxPart2 ],
                loading: false
            };
        case ActionType.DELETE_APPROVEDINVOICEDOX_SUCCESS:
            return {
                ...state,
                approvedInvoiceDox: state.approvedInvoiceDox.filter(approvedInvoiceDoc => approvedInvoiceDoc.approvedinvoicedoxid !== action.payload),
                // approvedInvoiceDox: [ ..._.omit(state.approvedInvoiceDox, action.payload) ]
            };
        default:
            return state;
    }
};
