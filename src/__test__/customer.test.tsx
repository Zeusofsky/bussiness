import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import configureStore from 'redux-mock-store';
import * as ReactRedux from 'react-redux'
import thunk from 'redux-thunk';
import moment from 'moment'

import CustomerEdit from "../pages/baseInfo/customer/components/CustomerEdit"
import { ICustomerPost } from '../models/customer'
import { addCustomer, editCustomer, getCustomers } from '../redux/actionCreators/customerActions'
import Customer from '../pages/baseInfo/customer/customer'

describe('Test Customer', () => {
    const initialState = {
        customers: {
            customers: [  
                {
                    id: 1,
                    firstName: 'Tom',
                    lastName: 'Hangs',
                    dateOfBirth: '1954-04-12',
                    countryCode: '+01',
                    phoneNumber: '85947261',
                    email: 'hangs.tom@gmail.com',
                    bankAccountNumber: '74847878787888568'
                },
                {
                    id: 2,
                    firstName: 'Harrison',
                    lastName: 'Ford',
                    dateOfBirth: '1943-05-21',
                    countryCode: '+01',
                    phoneNumber: '92176453',
                    email: 'ford.harrison@gmail.com',
                    bankAccountNumber: '31313131313131313'
                }     
            ], 
            loading: false, 
            error: null 
        }
    };
    const middleware = [ thunk ];
    const mockStore = configureStore(middleware);
    let store;

    it('Renders Customer correctly', async () => {
        store = mockStore(initialState);
        render(
            <ReactRedux.Provider store={store}>
                <Customer />
            </ReactRedux.Provider>
        );

        expect(screen.getByTestId('customer-box')).toBeInTheDocument();
        expect(initialState.customers.customers.length).toBe(2)
    });

    let customer:ICustomerPost ={
        FirstName: "",
        LastName: "",
        DateOfBirth: moment(new Date()).format("YYYY-MM-DD"),
        CountryCode: "",
        PhoneNumber: "",
        Email: "",
        BankAccountNumber: ""
    };
    const setCustomer = (value: ICustomerPost) => {
        customer = value;
    }

    let editRecordId: number = 1
    const setEditRecordId = (value: number) => {
        editRecordId = value;
    }

    let showValidation: boolean = false
    const setShowValidation = (value: boolean) => {
        showValidation = value;
    }

    let isOpen: boolean = false
    const setIsOpen = (value: boolean) => {
        isOpen = value;
    }

    test('Renders CustomerEdit correctly', async () => {
        store = mockStore(initialState);
        render(
            <ReactRedux.Provider store={store}>
                <CustomerEdit    
                    customer={customer} 
                    setCustomer={setCustomer}
                    editRecordId={editRecordId}
                    setEditRecordId={setEditRecordId}
                    showValidation={showValidation}
                    setShowValidation={setShowValidation}
                    setIsOpen={setIsOpen}
                    addCustomer={addCustomer}
                    getCustomers={getCustomers}
                    editCustomer={editCustomer}
                />
            </ReactRedux.Provider>
        );
        expect(screen.getByTestId('customer-edit-box')).toBeInTheDocument();
    });

})
