import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    ThunkResult } from "./actionResultTypes";
import { 
    Action as ProjectPersonalAction,
    ActionType as ProjectPersonalActionType, 
    IFetchProjectPersonals,
    IFetchProjectPersonalsSuccess,
    IFetchProjectPersonalsFail,
    IEditProjectPersonal,
    IEditProjectPersonalSuccess,
    IEditProjectPersonalFail,
    IDeleteProjectPersonal,
    IDeleteProjectPersonalSuccess,
    IDeleteProjectPersonalFail,
    IAddProjectPersonal,
    IAddProjectPersonalSuccess,
    IAddProjectPersonalFail,
} from "../actionTypes/projectPersonalActionTypes";
import { toastError, 
     toastSuccess 
} from '../../services/toasters';
import { 
    IProjectPersonal as ProjectPersonal, 
    IRequestProjectPersonal,
} from '../../models/projectPersonal';

import { httpGenerator } from '../../services';
import { MultiResponseType } from '../../models/multiResponseType';
// import { IProjectPersonal } from '../../models/projectPersonal';


export const GetProjectPersonal = (contractId: number, dateId: number): ThunkResult<void> => async (dispatch: Dispatch<ProjectPersonalAction>) => { 
    dispatch<IFetchProjectPersonals>({  
        type: ProjectPersonalActionType.FETCH_PROJECTPERSONALS
    });

    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<MultiResponseType<ProjectPersonal>> = await httpGenerator(authToken!).get(`projectPersonals/contractMonthList/${contractId}/${dateId}/`);
        dispatch<IFetchProjectPersonalsSuccess>({
            type: ProjectPersonalActionType.FETCH_PROJECTPERSONALS_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)

    } catch(err: any) {
        dispatch<IFetchProjectPersonalsFail>({
            type: ProjectPersonalActionType.FETCH_PROJECTPERSONALS_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در بازیابی اطلاعات!");
    }
}

export const AddProjectPersonal = (request: IRequestProjectPersonal): ThunkResult<void> => async (dispatch: Dispatch<ProjectPersonalAction>) => {
    // console.log("request: ", request) 
    dispatch<IAddProjectPersonal>({ 
        type: ProjectPersonalActionType.ADD_PROJECTPERSONAL
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<ProjectPersonal> = await httpGenerator(authToken!).post(`projectPersonals/`, request);
        dispatch<IAddProjectPersonalSuccess>({
            type: ProjectPersonalActionType.ADD_PROJECTPERSONAL_SUCCESS,
            payload: response.data  
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات جدید با موفقیت ذخیره گردید.");

    } catch(err:any) {
        dispatch<IAddProjectPersonalFail>({
            type: ProjectPersonalActionType.ADD_PROJECTPERSONAL_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ذخیره سازی اطلاعات جدید!");
    }
};

export const EditProjectPersonal = (id: number, request: IRequestProjectPersonal): ThunkResult<void> => async (dispatch: Dispatch<ProjectPersonalAction>) => { 
    dispatch<IEditProjectPersonal>({ 
        type: ProjectPersonalActionType.EDIT_PROJECTPERSONAL 
    });
    // console.log('EditProjectPersonal ... ')
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<ProjectPersonal> = await httpGenerator(authToken!).put(`projectPersonals/${id}/`, request);
        dispatch<IEditProjectPersonalSuccess>({ 
            type: ProjectPersonalActionType.EDIT_PROJECTPERSONAL_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditProjectPersonalFail>({ 
            type: ProjectPersonalActionType.EDIT_PROJECTPERSONAL_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const DeleteProjectPersonal = (deletedId: number): ThunkResult<void> => async (dispatch: Dispatch<ProjectPersonalAction>) => { 
    dispatch<IDeleteProjectPersonal>({ type: ProjectPersonalActionType.DELETE_PROJECTPERSONAL });
    try {
        const authToken = sessionStorage.getItem("token")
        await httpGenerator(authToken!).delete(`projectPersonals/${deletedId}/`);
        dispatch<IDeleteProjectPersonalSuccess>({
            type: ProjectPersonalActionType.DELETE_PROJECTPERSONAL_SUCCESS,
            payload: deletedId
        });
        // console.log("response: ", response)
        toastSuccess("اطلاعات مورد نظر با موفقیت حذف گردید.");

    } catch (err: any) {
        dispatch<IDeleteProjectPersonalFail>({ 
            type: ProjectPersonalActionType.DELETE_PROJECTPERSONAL_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در خذف اطلاعات مورد نظر!");
    }
};