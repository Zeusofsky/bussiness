import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    ThunkResult } from "./actionResultTypes";
import { 
    Action as AddendumAction,
    ActionType as AddendumActionType, 
    IFetchAddendums,
    IFetchAddendumsSuccess,
    IFetchAddendumsFail,
    IEditAddendum,
    IEditAddendumSuccess,
    IEditAddendumFail,
    IDeleteAddendum,
    IDeleteAddendumSuccess,
    IDeleteAddendumFail,
    IAddAddendum,
    IAddAddendumSuccess,
    IAddAddendumFail,
} from "../actionTypes/addendumActionTypes";
import { toastError, 
     toastSuccess 
} from '../../services/toasters';
import { 
    IAddendum as Addendum, 
    IRequestAddendum,
} from '../../models/addendum';

import { httpGenerator } from '../../services';
import { MultiResponseType } from '../../models/multiResponseType';
// import { IAddendum } from '../../models/addendum';


export const GetAddendum = (contractId: number): ThunkResult<void> => async (dispatch: Dispatch<AddendumAction>) => { 
    dispatch<IFetchAddendums>({  
        type: AddendumActionType.FETCH_ADDENDUMS
    });

    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<MultiResponseType<Addendum>> = await httpGenerator(authToken!).get(`contractAddendums/contractAddendumList/${contractId}/`);
        dispatch<IFetchAddendumsSuccess>({
            type: AddendumActionType.FETCH_ADDENDUMS_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)

    } catch(err: any) {
        dispatch<IFetchAddendumsFail>({
            type: AddendumActionType.FETCH_ADDENDUMS_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در بازیابی اطلاعات!");
    }
}

export const AddAddendum = (request: IRequestAddendum): ThunkResult<void> => async (dispatch: Dispatch<AddendumAction>) => {
    // console.log("request: ", request) 
    dispatch<IAddAddendum>({ 
        type: AddendumActionType.ADD_ADDENDUM
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<Addendum> = await httpGenerator(authToken!).post(`contractAddendums/`, request);
        dispatch<IAddAddendumSuccess>({
            type: AddendumActionType.ADD_ADDENDUM_SUCCESS,
            payload: response.data  
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات جدید با موفقیت ذخیره گردید.");

    } catch(err:any) {
        dispatch<IAddAddendumFail>({
            type: AddendumActionType.ADD_ADDENDUM_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ذخیره سازی اطلاعات جدید!");
    }
};

export const EditAddendum = (id: number, request: IRequestAddendum): ThunkResult<void> => async (dispatch: Dispatch<AddendumAction>) => { 
    dispatch<IEditAddendum>({ 
        type: AddendumActionType.EDIT_ADDENDUM 
    });
    // console.log('EditAddendum ... ')
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<Addendum> = await httpGenerator(authToken!).put(`contractAddendums/${id}/`, request);
        dispatch<IEditAddendumSuccess>({ 
            type: AddendumActionType.EDIT_ADDENDUM_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditAddendumFail>({ 
            type: AddendumActionType.EDIT_ADDENDUM_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const DeleteAddendum = (deletedId: number): ThunkResult<void> => async (dispatch: Dispatch<AddendumAction>) => { 
    dispatch<IDeleteAddendum>({ type: AddendumActionType.DELETE_ADDENDUM });
    try {
        const authToken = sessionStorage.getItem("token")
        await httpGenerator(authToken!).delete(`contractAddendums/${deletedId}/`);
        dispatch<IDeleteAddendumSuccess>({
            type: AddendumActionType.DELETE_ADDENDUM_SUCCESS,
            payload: deletedId
        });
        // console.log("response: ", response)
        toastSuccess("اطلاعات مورد نظر با موفقیت حذف گردید.");

    } catch (err: any) {
        dispatch<IDeleteAddendumFail>({ 
            type: AddendumActionType.DELETE_ADDENDUM_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در خذف اطلاعات مورد نظر!");
    }
};