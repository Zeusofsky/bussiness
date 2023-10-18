import { Dispatch } from 'redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { http } from '../../services';
import { 
    ICustomer as Customer, 
    // ICustomer, ICustomerEdit, 
    ICustomerPost, ICustomerPut 
} from '../../models/customer';
import { MultiRecordResponse, ThunkResult } from './actionResultTypes';
import { 
    Action,
    ActionType,
    IFetchCustomers, 
    IFetchCustomersSuccess, 
    IFetchCustomersFail, 
    IFetchCustomer, 
    IFetchCustomerSuccess, 
    IFetchCustomerFail,
    // IAddCustomer,
    // IAddCustomerSuccess,
    // IAddCustomerFail,
    // IEditCustomer,
    // IEditCustomerSuccess,
    // IEditCustomerFail,
    IDeleteCustomer,
    IDeleteCustomerSuccess,
    IDeleteCustomerFail,
} from '../actionTypes/customerActionTypes';

// export interface ResponseType
// {
//     Customers: Customer[];
//     Success: boolean;
//     Message: string;
//     Errors: String[] | null;
// }

export const getCustomers = (): ThunkResult<void> => async (dispatch: Dispatch<Action>) => { 
    dispatch<IFetchCustomers>({  
        type: ActionType.FETCH_CUSTOMERS 
    });
    try {
        const response: AxiosResponse<MultiRecordResponse> = await http.get(`customers`);
        dispatch<IFetchCustomersSuccess>({
            type: ActionType.FETCH_CUSTOMERS_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)
    } catch(err: any) {
        dispatch<IFetchCustomersFail>({
            type: ActionType.FETCH_CUSTOMERS_FAIL,
            payload: err
        });
    }
}
export const getCustomer = (id: number): ThunkResult<void> => async (dispatch: Dispatch<Action>) => { 
    dispatch<IFetchCustomer>({
        type: ActionType.FETCH_CUSTOMER
    });

    try {
        const response: AxiosResponse<Customer> = await http.get(`customers/${id}`);
        dispatch<IFetchCustomerSuccess>({
            type: ActionType.FETCH_CUSTOMER_SUCCESS,
            payload: response.data  
        });

    } catch(err:any) {
        dispatch<IFetchCustomerFail>({
            type: ActionType.FETCH_CUSTOMER_FAIL,
            payload: err
        });
    }
}

export const addCustomer = createAsyncThunk("customer/addCustomer", async (customer: ICustomerPost) => {
    try {
        const response = await http.post("customers", customer)
        // console.log("response.data: ", response.data)

        return response.data
    } catch (error) {
        console.log(error)
    }
})
// export const addCustomer = (customer: ICustomerEdit): ThunkResult<void> => async (dispatch: Dispatch<Action>) => {
//     console.log("addCustomer run") 
//     dispatch<IAddCustomer>({ 
//         type: ActionType.ADD_CUSTOMER
//     });
//     try {
//         const response: AxiosResponse<Customer> = await http.post(`customers`, customer);
//         dispatch<IAddCustomerSuccess>({
//             type: ActionType.ADD_CUSTOMER_SUCCESS,
//             payload: response.data  
//         });

//     } catch(err:any) {
//         dispatch<IAddCustomerFail>({
//             type: ActionType.ADD_CUSTOMER_FAIL,
//             payload: err
//         });
//     }
// };
export const editCustomer = createAsyncThunk("customer/editCustomer", async (editedCustomer: ICustomerPut) => {
        try {
            const response = await http.put(`customers/${editedCustomer.Id}`, editedCustomer);
            return response.data
        } catch (error) {
            console.log(error)
        }
    }) 
// export const editCustomer = (id: number, editedCustomer: ICustomerPost): ThunkResult<void> => async (dispatch: Dispatch<Action>) => { 
//     dispatch<IEditCustomer>({ type: ActionType.EDIT_CUSTOMER });
//     try {
//         const response: AxiosResponse<Customer> = await http.put(`customers/${id}`, editedCustomer);
//         dispatch<IEditCustomerSuccess>({ 
//             type: ActionType.EDIT_CUSTOMER_SUCCESS, 
//             payload: response.data
//         });
//     } catch (err: any) {
//         dispatch<IEditCustomerFail>({ 
//             type: ActionType.EDIT_CUSTOMER_FAIL,
//             payload: err
//         });
//     }
// };
export const deleteCustomer = (deletedId: number): ThunkResult<void> => async (dispatch: Dispatch<Action>) => { 
    dispatch<IDeleteCustomer>({ type: ActionType.DELETE_CUSTOMER });
    try {
        const response: AxiosResponse<number> = await http.delete(`customers/${deletedId}`);
        dispatch<IDeleteCustomerSuccess>({
            type: ActionType.DELETE_CUSTOMER_SUCCESS,
            payload: response.data
        });
    } catch (err: any) {
        dispatch<IDeleteCustomerFail>({ 
            type: ActionType.DELETE_CUSTOMER_FAIL,
            payload: err
        });
    }
};


