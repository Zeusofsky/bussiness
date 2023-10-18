import { Reducer } from 'redux';

import { Action, ActionType } from '../actionTypes/financialInfoActionTypes';
import { IFinancialInfo as FinancialInfo } from '../../models/financialInfo';

export interface IFinancialInfoState {
    financialInfo: FinancialInfo;
    loading: boolean;
    error: String | null,
}
const initialState = {
    financialInfo: {
        financialinfoid: 0,
        contractid: 0,
        dateid: 0,
        lastclaimedinvoice_r: 0,
        lastclaimedinvoice_fc: 0,
        lci_no: 0,
        lastverifiedinvoice_r: 0,
        lastverifiedinvoice_fc: 0,
        lvi_no: 0,
        lastclaimedadjustmentinvoice_r: 0,
        lastclaimedadjustmentinvoice_fc: 0,
        lcai_no: 0,
        lastverifiedadjustmentinvoice_r: 0,
        lastverifiedadjustmentinvoice_fc: 0,
        lvai_no: 0,
        lastclaimedextraworkinvoice_r: 0,
        lastclaimedextraworkinvoice_fc: 0,
        lcewi_no: 0,
        lastverifiedextraworkinvoice_r: 0,
        lastverifiedextraworkinvoice_fc: 0,
        lvewi_no: 0,
        lastclaimbill_r: 0,
        lastclaimbill_fc: 0,
        lcb_no: 0,
        lastclaimbillverified_r: 0,
        lastclaimbillverified_fc: 0,
        lcbv_no: 0,
        lastclaimbillrecievedamount_r: 0,
        lastclaimbillrecievedamount_fc: 0,
        cumulativeclientpayment_r: 0,
        cumulativeclientpayment_fc: 0,
        clientprepaymentdeferment_r: 0,
        clientprepaymentdeferment_fc: 0,
        estcost_r: 0,
        estcost_fc: 0,
        estclientpayment_r: 0,
        estclientpayment_fc: 0,
        estdebitcredit_r: 0,
        estdebitcredit_fc: 0
    
    },
    loading: false,
    error: null,   
};
export const FinancialInfoReducer: Reducer<IFinancialInfoState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_FINANCIALINFO:
        case ActionType.ADD_FINANCIALINFO:
        case ActionType.EDIT_FINANCIALINFO:
            return { ...state, loading: true };

        case ActionType.FETCH_FINANCIALINFO_FAIL:
        case ActionType.ADD_FINANCIALINFO_FAIL:
        case ActionType.EDIT_FINANCIALINFO_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.FETCH_FINANCIALINFO_SUCCESS:
            // console.log('action.payload.data: ', action.payload.data)
            return {
                ...state,
                financialInfo: action.payload.data,
                loading: false
            };


        case ActionType.ADD_FINANCIALINFO_SUCCESS:
            return {
                ...state,
                financialInfo: action.payload,
                loading: false
            };


        case ActionType.EDIT_FINANCIALINFO_SUCCESS:
            const financialInfo: FinancialInfo = action.payload
            return {
                ...state,
                financialInfo: financialInfo, 
                loading: false
            };

        default:
            return state;
    }
};
