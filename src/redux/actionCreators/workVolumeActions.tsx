import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    ThunkResult } from "./actionResultTypes";
import { 
    Action as WorkVolumeAction,
    ActionType as WorkVolumeActionType, 
    IFetchWorkVolumes,
    IFetchWorkVolumesSuccess,
    IFetchWorkVolumesFail,
    IEditWorkVolume,
    IEditWorkVolumeSuccess,
    IEditWorkVolumeFail,
    IDeleteWorkVolume,
    IDeleteWorkVolumeSuccess,
    IDeleteWorkVolumeFail,
    IAddWorkVolume,
    IAddWorkVolumeSuccess,
    IAddWorkVolumeFail,
} from "../actionTypes/workVolumeActionTypes";
import { toastError, 
     toastSuccess 
} from '../../services/toasters';
import { 
    IWorkVolume as WorkVolume, 
    IRequestWorkVolume,
} from '../../models/workVolume';

import { httpGenerator } from '../../services';
import { MultiResponseType } from '../../models/multiResponseType';
// import { IWorkVolume } from '../../models/workVolume';


export const GetWorkVolume = (contractId: number, dateId: number): ThunkResult<void> => async (dispatch: Dispatch<WorkVolumeAction>) => { 
    dispatch<IFetchWorkVolumes>({  
        type: WorkVolumeActionType.FETCH_WORKVOLUMES
    });

    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<MultiResponseType<WorkVolume>> = await httpGenerator(authToken!).get(`workVolumes/contractMonthList/${contractId}/${dateId}/`);
        dispatch<IFetchWorkVolumesSuccess>({
            type: WorkVolumeActionType.FETCH_WORKVOLUMES_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)

    } catch(err: any) {
        dispatch<IFetchWorkVolumesFail>({
            type: WorkVolumeActionType.FETCH_WORKVOLUMES_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در بازیابی اطلاعات!");
    }
}

export const AddWorkVolume = (request: IRequestWorkVolume): ThunkResult<void> => async (dispatch: Dispatch<WorkVolumeAction>) => {
    // console.log("request: ", request) 
    dispatch<IAddWorkVolume>({ 
        type: WorkVolumeActionType.ADD_WORKVOLUME
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<WorkVolume> = await httpGenerator(authToken!).post(`workVolumes/`, request);
        dispatch<IAddWorkVolumeSuccess>({
            type: WorkVolumeActionType.ADD_WORKVOLUME_SUCCESS,
            payload: response.data  
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات جدید با موفقیت ذخیره گردید.");

    } catch(err:any) {
        dispatch<IAddWorkVolumeFail>({
            type: WorkVolumeActionType.ADD_WORKVOLUME_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ذخیره سازی اطلاعات جدید!");
    }
};

export const EditWorkVolume = (id: number, request: IRequestWorkVolume): ThunkResult<void> => async (dispatch: Dispatch<WorkVolumeAction>) => { 
    dispatch<IEditWorkVolume>({ 
        type: WorkVolumeActionType.EDIT_WORKVOLUME 
    });
    // console.log('EditWorkVolume ... ')
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<WorkVolume> = await httpGenerator(authToken!).put(`workVolumes/${id}/`, request);
        dispatch<IEditWorkVolumeSuccess>({ 
            type: WorkVolumeActionType.EDIT_WORKVOLUME_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditWorkVolumeFail>({ 
            type: WorkVolumeActionType.EDIT_WORKVOLUME_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const DeleteWorkVolume = (deletedId: number): ThunkResult<void> => async (dispatch: Dispatch<WorkVolumeAction>) => { 
    dispatch<IDeleteWorkVolume>({ type: WorkVolumeActionType.DELETE_WORKVOLUME });
    try {
        const authToken = sessionStorage.getItem("token")
        await httpGenerator(authToken!).delete(`workVolumes/${deletedId}/`);
        dispatch<IDeleteWorkVolumeSuccess>({
            type: WorkVolumeActionType.DELETE_WORKVOLUME_SUCCESS,
            payload: deletedId
        });
        // console.log("response: ", response)
        toastSuccess("اطلاعات مورد نظر با موفقیت حذف گردید.");

    } catch (err: any) {
        dispatch<IDeleteWorkVolumeFail>({ 
            type: WorkVolumeActionType.DELETE_WORKVOLUME_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در خذف اطلاعات مورد نظر!");
    }
};