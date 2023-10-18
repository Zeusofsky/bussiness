import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    ThunkResult } from "./actionResultTypes";
import { 
    Action as MachineryAction,
    ActionType as MachineryActionType, 
    IFetchMachineries,
    IFetchMachineriesSuccess,
    IFetchMachineriesFail,
    IEditMachinery,
    IEditMachinerySuccess,
    IEditMachineryFail,
    IDeleteMachinery,
    IDeleteMachinerySuccess,
    IDeleteMachineryFail,
    IAddMachinery,
    IAddMachinerySuccess,
    IAddMachineryFail,
} from "../actionTypes/machineryActionTypes";
import { toastError, 
     toastSuccess 
} from '../../services/toasters';
import { 
    IMachinery as Machinery, 
    IRequestMachinery,
} from '../../models/machinery';

import { httpGenerator } from '../../services';
import { MultiResponseType } from '../../models/multiResponseType';
// import { IMachinery } from '../../models/machinery';


export const GetMachinery = (contractId: number, dateId: number): ThunkResult<void> => async (dispatch: Dispatch<MachineryAction>) => { 
    dispatch<IFetchMachineries>({  
        type: MachineryActionType.FETCH_MACHINERIES
    });

    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<MultiResponseType<Machinery>> = await httpGenerator(authToken!).get(`machineries/contractMonthList/${contractId}/${dateId}/`);
        dispatch<IFetchMachineriesSuccess>({
            type: MachineryActionType.FETCH_MACHINERIES_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)

    } catch(err: any) {
        dispatch<IFetchMachineriesFail>({
            type: MachineryActionType.FETCH_MACHINERIES_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در بازیابی اطلاعات!");
    }
}

export const AddMachinery = (request: IRequestMachinery): ThunkResult<void> => async (dispatch: Dispatch<MachineryAction>) => {
    // console.log("request: ", request) 
    dispatch<IAddMachinery>({ 
        type: MachineryActionType.ADD_MACHINERY
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<Machinery> = await httpGenerator(authToken!).post(`machineries/`, request);
        dispatch<IAddMachinerySuccess>({
            type: MachineryActionType.ADD_MACHINERY_SUCCESS,
            payload: response.data  
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات جدید با موفقیت ذخیره گردید.");

    } catch(err:any) {
        dispatch<IAddMachineryFail>({
            type: MachineryActionType.ADD_MACHINERY_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ذخیره سازی اطلاعات جدید!");
    }
};

export const EditMachinery = (id: number, request: IRequestMachinery): ThunkResult<void> => async (dispatch: Dispatch<MachineryAction>) => { 
    dispatch<IEditMachinery>({ 
        type: MachineryActionType.EDIT_MACHINERY 
    });
    // console.log('EditMachinery ... ')
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<Machinery> = await httpGenerator(authToken!).put(`machineries/${id}/`, request);
        dispatch<IEditMachinerySuccess>({ 
            type: MachineryActionType.EDIT_MACHINERY_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditMachineryFail>({ 
            type: MachineryActionType.EDIT_MACHINERY_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const DeleteMachinery = (deletedId: number): ThunkResult<void> => async (dispatch: Dispatch<MachineryAction>) => { 
    dispatch<IDeleteMachinery>({ type: MachineryActionType.DELETE_MACHINERY });
    try {
        const authToken = sessionStorage.getItem("token")
        await httpGenerator(authToken!).delete(`machineries/${deletedId}/`);
        dispatch<IDeleteMachinerySuccess>({
            type: MachineryActionType.DELETE_MACHINERY_SUCCESS,
            payload: deletedId
        });
        // console.log("response: ", response)
        toastSuccess("اطلاعات مورد نظر با موفقیت حذف گردید.");

    } catch (err: any) {
        dispatch<IDeleteMachineryFail>({ 
            type: MachineryActionType.DELETE_MACHINERY_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در خذف اطلاعات مورد نظر!");
    }
};