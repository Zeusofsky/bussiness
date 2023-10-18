import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    // MultiRecordResponse, 
    ThunkResult } from "./actionResultTypes";
import { 
    Action,
    ActionType, 
    IFetchContracts,
    IFetchContractsSuccess,
    IFetchContractsFail,
    ISelectedCurrentContract,
} from "../actionTypes/contractActionTypes";
import { toastError } from '../../services/toasters';
import { 
    IContract as Contract, 
} from '../../models/contract';
import { MultiResponseType } from '../../models/multiResponseType'
import { httpGenerator } from '../../services';


export const GetContracts = (userid: number | undefined): ThunkResult<void> => async (dispatch: Dispatch<Action>) => { 
    dispatch<IFetchContracts>({  
        type: ActionType.FETCH_CONTRACTS 
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<MultiResponseType<Contract>> = await httpGenerator(authToken!).get(`contracts/${userid}`);
        dispatch<IFetchContractsSuccess>({
            type: ActionType.FETCH_CONTRACTS_SUCCESS,
            payload: response.data
        });

    } catch(err: any) {
        dispatch<IFetchContractsFail>({
            type: ActionType.FETCH_CONTRACTS_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("Error: could not read contracts data!");
    }
}

export const SetCurrentContract = (contractId: number) => {
    return (dispatch: Dispatch<Action>)=> {
        dispatch<ISelectedCurrentContract>({ 
            type: ActionType.SELECTED_CURRENT_CONTRACT,
            payload: contractId
        });
    }
}