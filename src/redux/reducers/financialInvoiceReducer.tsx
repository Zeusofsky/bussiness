import { Reducer } from 'redux';
// import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/financialInvoiceActionTypes';
import { IFinancialInvoice as FinancialInvoice } from '../../models/financialInvoice';

export interface IFinancialInvoicesState {
    financialInvoices: FinancialInvoice[];
    loading: boolean;
    error: String | null,
}
const initialState = {
    financialInvoices: [],
    loading: false,
    error: null,   
};
export const FinancialInvoiceReducer: Reducer<IFinancialInvoicesState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_FINANCIALINVOICES:
        case ActionType.ADD_FINANCIALINVOICE:
        case ActionType.EDIT_FINANCIALINVOICE:
        case ActionType.DELETE_FINANCIALINVOICE:
            return { ...state, loading: true };

        case ActionType.FETCH_FINANCIALINVOICES_FAIL:
        case ActionType.ADD_FINANCIALINVOICE_FAIL:
        case ActionType.EDIT_FINANCIALINVOICE_FAIL:
        case ActionType.DELETE_FINANCIALINVOICE_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.ADD_FINANCIALINVOICE_SUCCESS:
            // console.log("action.payload: ", action.payload)
            return {
                ...state,
                financialInvoices: [ ...state.financialInvoices, action.payload ],
                loading: false
            };

        case ActionType.FETCH_FINANCIALINVOICES_SUCCESS:
            return {
                ...state,
                financialInvoices: action.payload.data,
                loading: false
            };

        // case ActionType.EDIT_FINANCIALINVOICE_SUCCESS:
        //     const financialInvoice: FinancialInvoice = action.payload
        //     // console.log('================================================================')
        //     // console.log('@@@financialInvoice: ', financialInvoice)
        //     console.log('@@@state.financialInvoices: ', state.financialInvoices)
        //     const index = state.financialInvoices.findIndex(itm => 
        //         Number(itm.financialInvoiceid) === Number(financialInvoice.financialInvoiceid)
        //     )
        //     // console.log('@@@index: ', index)
        //     const financialInvoicesPart1 = state.financialInvoices.slice(0, index)
        //     // console.log('@@@financialInvoicesPart1: ', financialInvoicesPart1)
        //     const financialInvoicesPart2 = state.financialInvoices.slice(index + 1)
        //     // console.log('@@@financialInvoicesPart2: ', financialInvoicesPart2)
        //     // console.log('@@@after edit reducer: ', [ ...financialInvoicesPart1, financialInvoice, ...financialInvoicesPart2 ])
        //     // console.log('================================================================')
        //     return {
        //         ...state,
        //         financialInvoices: [ ...financialInvoicesPart1, financialInvoice, ...financialInvoicesPart2 ],
        //         loading: false
        //     };
        case ActionType.DELETE_FINANCIALINVOICE_SUCCESS:
            return {
                ...state,
                financialInvoices: state.financialInvoices.filter(financialInvoice => financialInvoice.invoiceid !== action.payload),
            };

        default:

            return state;
    }
};
