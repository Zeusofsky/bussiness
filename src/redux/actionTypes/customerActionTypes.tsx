import { ICustomer as Customer } from '../../models/customer';
import { MultiRecordResponse } from '../actionCreators/actionResultTypes';

export enum ActionType {
    FETCH_CUSTOMERS = 'FETCH_CUSTOMERS',
    FETCH_CUSTOMERS_SUCCESS = 'FETCH_CUSTOMERS_SUCCESS',
    FETCH_CUSTOMERS_FAIL = 'FETCH_CUSTOMERS_FAIL',
    FETCH_CUSTOMER = 'FETCH_CUSTOMER',
    FETCH_CUSTOMER_SUCCESS = 'FETCH_CUSTOMER_SUCCESS',
    FETCH_CUSTOMER_FAIL = 'FETCH_CUSTOMER_FAIL',
    ADD_CUSTOMER = 'ADD_CUSTOMER',
    ADD_CUSTOMER_SUCCESS = 'ADD_CUSTOMER_SUCCESS',
    ADD_CUSTOMER_FAIL = 'ADD_CUSTOMER_FAIL',
    EDIT_CUSTOMER = 'EDIT_CUSTOMER',
    EDIT_CUSTOMER_SUCCESS = 'EDIT_CUSTOMER_SUCCESS',
    EDIT_CUSTOMER_FAIL = 'EDIT_CUSTOMER_FAIL',
    DELETE_CUSTOMER = 'DELETE_CUSTOMER',
    DELETE_CUSTOMER_SUCCESS = 'DELETE_CUSTOMER_SUCCESS',
    DELETE_CUSTOMER_FAIL = 'DELETE_CUSTOMER_FAIL'
}

export interface IFetchCustomers {
    type: ActionType.FETCH_CUSTOMERS;
}
export interface IFetchCustomersSuccess {
    type: ActionType.FETCH_CUSTOMERS_SUCCESS;
    payload: MultiRecordResponse;
}
export interface IFetchCustomersFail {
    type: ActionType.FETCH_CUSTOMERS_FAIL;
    payload: string | null;
}

export interface IFetchCustomer {
    type: ActionType.FETCH_CUSTOMER;
}
export interface IFetchCustomerSuccess {
    type: ActionType.FETCH_CUSTOMER_SUCCESS;
    payload: Customer;
}
export interface IFetchCustomerFail {
    type: ActionType.FETCH_CUSTOMER_FAIL;
    payload: String | null;
}

export interface IAddCustomer {
    type: ActionType.ADD_CUSTOMER;
}
export interface IAddCustomerSuccess {
    type: ActionType.ADD_CUSTOMER_SUCCESS;
    payload: Customer;
}
export interface IAddCustomerFail {
    type: ActionType.ADD_CUSTOMER_FAIL;
    payload: String | null;
}

export interface IEditCustomer {
    type: ActionType.EDIT_CUSTOMER;
}
export interface IEditCustomerSuccess {
    type: ActionType.EDIT_CUSTOMER_SUCCESS;
    payload: Customer;
}
export interface IEditCustomerFail {
    type: ActionType.EDIT_CUSTOMER_FAIL;
    payload: String | null;
}

export interface IDeleteCustomer {
    type: ActionType.DELETE_CUSTOMER;
}
export interface IDeleteCustomerSuccess {
    type: ActionType.DELETE_CUSTOMER_SUCCESS;
    payload: number;
}
export interface IDeleteCustomerFail {
    type: ActionType.DELETE_CUSTOMER_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchCustomers
    | IFetchCustomersSuccess
    | IFetchCustomersFail
    | IFetchCustomer
    | IFetchCustomerSuccess
    | IFetchCustomerFail
    | IAddCustomer
    | IAddCustomerSuccess
    | IAddCustomerFail
    | IEditCustomer
    | IEditCustomerSuccess
    | IEditCustomerFail
    | IDeleteCustomer
    | IDeleteCustomerSuccess
    | IDeleteCustomerFail;