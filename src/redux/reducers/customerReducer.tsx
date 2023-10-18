import { Reducer } from 'redux';
import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/customerActionTypes';
import { ICustomer as Customer } from '../../models/customer';

export interface ICustomersState {
    customers: Customer[];
    loading: boolean;
    error: String | null,
}
const initialState = {
    customers: [],
    loading: false,
    error: null,   
};
export const CustomerReducer: Reducer<ICustomersState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_CUSTOMER:
        case ActionType.FETCH_CUSTOMERS:
        case ActionType.ADD_CUSTOMER:
        case ActionType.EDIT_CUSTOMER:
        case ActionType.DELETE_CUSTOMER:
            return { ...state, loading: true };

        case ActionType.FETCH_CUSTOMER_FAIL:
        case ActionType.FETCH_CUSTOMERS_FAIL:
        case ActionType.ADD_CUSTOMER_FAIL:
        case ActionType.EDIT_CUSTOMER_FAIL:
        case ActionType.DELETE_CUSTOMER_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.FETCH_CUSTOMER_SUCCESS:
        case ActionType.ADD_CUSTOMER_SUCCESS:
            // const { id } = action.payload;[id]: 
            return {
                ...state,
                customers: [ ...state.customers, action.payload ],
                loading: false
            };

        case ActionType.FETCH_CUSTOMERS_SUCCESS:
            console.log('Customers: ', action.payload.customers)
            return {
                ...state,
                customers: action.payload.customers,
                loading: false
            };
            //[ ...state.customers, ..._.mapKeys(action.payload, 'id')]

        case ActionType.EDIT_CUSTOMER_SUCCESS:
            const customer: Customer = action.payload
            const index = state.customers.findIndex(itm => itm.id === customer.id)
            const customersPart1 = state.customers.slice(0, index)
            const customersPart2 = state.customers.slice(index + 1)
            return {
                ...state,
                customers: [ ...customersPart1, customer, ...customersPart2 ],
                loading: false
            };
        case ActionType.DELETE_CUSTOMER_SUCCESS:
            return {
                ...state,
                customers: [ ..._.omit(state.customers, action.payload) ]
            };

        default:
            return state;
    }
};
