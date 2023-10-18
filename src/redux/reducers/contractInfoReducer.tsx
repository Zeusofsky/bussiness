import { Reducer } from 'redux';

import { Action, ActionType } from '../actionTypes/contractInfoActionTypes';
import { IContractInfo as ContractInfo } from '../../models/contractInfo';

export interface IContractInfoState {
    contractInfo: ContractInfo;
    projectManagerConfirmed: boolean;
    loading: boolean;
    error: String | null,
}
const initialState = {
    contractInfo: {
        contractid: 0,
        totalprice_r: 0,
        totalprice_fc: 0,
        projectManager: '',
        projectManagerImage: '',
        customer: '',
        currency: '',
        startoperationdate: new Date(),
        notificationdate: new Date(),
        finishdate: new Date(),
        planstartdate: new Date(),
        duration: 0,
        passedDuration: 0,
        addendumDuration: 0,
        // startOperationShamsiDate: '',
        // notificationShamsiDate: '',
        // finishShamsiDate: '',
        // planStartShamsiDate: '',
        attachmentcontractprice1_r: 0,
        attachmentcontractprice1_fc: 0,
        attachmentcontractprice2_r: 0,
        attachmentcontractprice2_fc: 0,
        attachmentcontractprice3_r: 0,
        attachmentcontractprice3_fc: 0,
        attachmentcontractprice4_r: 0,
        attachmentcontractprice4_fc: 0,
        attachmentcontractprice5_r: 0,
        attachmentcontractprice5_fc: 0,
    },
    projectManagerConfirmed: false,
    loading: false,
    error: null,   
};
export const ContractInfoReducer: Reducer<IContractInfoState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_CONTRACTINFO:
        case ActionType.EDIT_CONTRACTINFO:
            return { ...state, loading: true };

        case ActionType.FETCH_CONTRACTINFO_FAIL:
        case ActionType.EDIT_CONTRACTINFO_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.FETCH_CONTRACTINFO_SUCCESS:
            // console.log('action.payload: ', action.payload.contractInfo)
            return {
                ...state,
                contractInfo: action.payload.contractInfo,
                projectManagerConfirmed: action.payload.projectManagerConfirmed,
                loading: false
            };
            //[ ...state.projectInfos, ..._.mapKeys(action.payload, 'id')]

        case ActionType.EDIT_CONTRACTINFO_SUCCESS:
            // console.log('action.payload.data: ', action.payload.contractInfo)
            const contractInfo: ContractInfo = action.payload.contractInfo
            return {
                ...state,
                contractInfo: contractInfo,
                projectManagerConfirmed: action.payload.projectManagerConfirmed,
                loading: false
            };

        default:
            return state;
    }
};
