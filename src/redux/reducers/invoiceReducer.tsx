import { Reducer } from 'redux';
// import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/invoiceActionTypes';
import { IInvoice as Invoice } from '../../models/invoice';

export interface IInvoicesState {
    invoices: Invoice[];
    loading: boolean;
    error: String | null,
}
const initialState = {
    invoices: [],
    loading: false,
    error: null,   
};
export const InvoiceReducer: Reducer<IInvoicesState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_INVOICES:
        case ActionType.ADD_INVOICE:
        case ActionType.EDIT_INVOICE:
        case ActionType.DELETE_INVOICE:
            return { ...state, loading: true };

        case ActionType.FETCH_INVOICES_FAIL:
        case ActionType.ADD_INVOICE_FAIL:
        case ActionType.EDIT_INVOICE_FAIL:
        case ActionType.DELETE_INVOICE_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.ADD_INVOICE_SUCCESS:
            // console.log("action.payload: ", action.payload)
            return {
                ...state,
                invoices: [ ...state.invoices, action.payload ],
                loading: false
            };

        case ActionType.FETCH_INVOICES_SUCCESS:
            return {
                ...state,
                invoices: action.payload.data,
                loading: false
            };

        // case ActionType.EDIT_INVOICE_SUCCESS:
        //     const invoice: Invoice = action.payload
        //     // console.log('================================================================')
        //     // console.log('@@@invoice: ', invoice)
        //     console.log('@@@state.invoices: ', state.invoices)
        //     const index = state.invoices.findIndex(itm => 
        //         Number(itm.invoiceid) === Number(invoice.invoiceid)
        //     )
        //     // console.log('@@@index: ', index)
        //     const invoicesPart1 = state.invoices.slice(0, index)
        //     // console.log('@@@invoicesPart1: ', invoicesPart1)
        //     const invoicesPart2 = state.invoices.slice(index + 1)
        //     // console.log('@@@invoicesPart2: ', invoicesPart2)
        //     // console.log('@@@after edit reducer: ', [ ...invoicesPart1, invoice, ...invoicesPart2 ])
        //     // console.log('================================================================')
        //     return {
        //         ...state,
        //         invoices: [ ...invoicesPart1, invoice, ...invoicesPart2 ],
        //         loading: false
        //     };
        case ActionType.DELETE_INVOICE_SUCCESS:
            return {
                ...state,
                invoices: state.invoices.filter(invoice => invoice.invoiceid !== action.payload),
            };

        default:

            return state;
    }
};
