import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    ThunkResult } from "./actionResultTypes";
import { 
    Action as ProjectMonthlyDocAction,
    ActionType as ProjectMonthlyDocActionType, 
    IFetchProjectMonthlyDoc,
    IFetchProjectMonthlyDocSuccess,
    IFetchProjectMonthlyDocFail,
    IEditProjectMonthlyDoc,
    IEditProjectMonthlyDocSuccess,
    IEditProjectMonthlyDocFail,
    IDeleteProjectMonthlyDoc,
    IDeleteProjectMonthlyDocSuccess,
    IDeleteProjectMonthlyDocFail,
    IAddProjectMonthlyDoc,
    IAddProjectMonthlyDocSuccess,
    IAddProjectMonthlyDocFail,
} from "../actionTypes/projectMonthlyDoxActionTypes";
import { toastError, 
     toastSuccess 
} from '../../services/toasters';
import { 
    IProjectMonthlyDoc as ProjectMonthlyDoc, 
    IRequestProjectMonthlyDoc,
    IRequestPartialProjectMonthlyDoc,
} from '../../models/projectMonthlyDox';

import { httpGenerator } from '../../services';
import { MultiResponseType } from '../../models/multiResponseType';
// import { SingleResponseType } from '../../models/singleResponseType';


type Config = {
    headers: Record<string, string>
};

export const GetProjectMonthlyDoc = (contractId: number): ThunkResult<void> => async (dispatch: Dispatch<ProjectMonthlyDocAction>) => { 
    dispatch<IFetchProjectMonthlyDoc>({  
        type: ProjectMonthlyDocActionType.FETCH_PROJECTMONTHLYDOX
    });

    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<MultiResponseType<ProjectMonthlyDoc>> = await httpGenerator(authToken!).get(`projectMonthlyDox/contractList/${contractId}/`);
        dispatch<IFetchProjectMonthlyDocSuccess>({
            type: ProjectMonthlyDocActionType.FETCH_PROJECTMONTHLYDOX_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)

    } catch(err: any) {
        dispatch<IFetchProjectMonthlyDocFail>({
            type: ProjectMonthlyDocActionType.FETCH_PROJECTMONTHLYDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در بازیابی اطلاعات!");
    }
}

export const DownloadProjectMonthlyDoc = async(ProjectMonthlyDocId: number) => { 
    // console.log('------DownloadProjectMonthlyDoc: id = ', ProjectMonthlyDocId)
    try{
        const authToken = sessionStorage.getItem("token")
        let response: AxiosResponse<any> | null = null
        await httpGenerator(authToken!)
            .get(`projectMonthlyDox/download/${ProjectMonthlyDocId}/`, { responseType: 'blob' })
            .then((res: AxiosResponse<any>) => {
                response = res;
                // console.log('------res: ', res)
            })
            // .catch((error)=> {
            //     console.log(error);
            // })
        return response;       
    }catch(error: any){
        console.log(error);
        return null
    }

}

export const AddProjectMonthlyDoc = (request: IRequestProjectMonthlyDoc): ThunkResult<void> => async (dispatch: Dispatch<ProjectMonthlyDocAction>) => {
    const config: Config = {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    };
    // let formData = new FormData()
    // formData.append('contractid', String(request.contractid))
    // formData.append('dateid', String(request.dateid))
    // formData.append('description', request.description)
    // formData.append('file', request.file!)
    // formData.append('active', String(request.active))

    dispatch<IAddProjectMonthlyDoc>({ 
        type: ProjectMonthlyDocActionType.ADD_PROJECTMONTHLYDOX
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<ProjectMonthlyDoc> = await httpGenerator(authToken!).post(`projectMonthlyDox/`, request, config);
        dispatch<IAddProjectMonthlyDocSuccess>({
            type: ProjectMonthlyDocActionType.ADD_PROJECTMONTHLYDOX_SUCCESS,
            payload: response.data  
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات جدید با موفقیت ذخیره گردید.");

    } catch(err:any) {
        dispatch<IAddProjectMonthlyDocFail>({
            type: ProjectMonthlyDocActionType.ADD_PROJECTMONTHLYDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ذخیره سازی اطلاعات جدید!");
    }
};

export const EditProjectMonthlyDoc = (id: number, request: IRequestProjectMonthlyDoc): ThunkResult<void> => async (dispatch: Dispatch<ProjectMonthlyDocAction>) => { 
    const config: Config = {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    };
    dispatch<IEditProjectMonthlyDoc>({ 
        type: ProjectMonthlyDocActionType.EDIT_PROJECTMONTHLYDOX 
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<ProjectMonthlyDoc> = await httpGenerator(authToken!).put(`projectMonthlyDox/${id}/`, request, config);
        dispatch<IEditProjectMonthlyDocSuccess>({ 
            type: ProjectMonthlyDocActionType.EDIT_PROJECTMONTHLYDOX_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditProjectMonthlyDocFail>({ 
            type: ProjectMonthlyDocActionType.EDIT_PROJECTMONTHLYDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const PartialEditProjectMonthlyDoc = (id: number, request: IRequestPartialProjectMonthlyDoc): ThunkResult<void> => async (dispatch: Dispatch<ProjectMonthlyDocAction>) => { 
    const config: Config = {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    };
    
    dispatch<IEditProjectMonthlyDoc>({ 
        type: ProjectMonthlyDocActionType.EDIT_PROJECTMONTHLYDOX 
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<ProjectMonthlyDoc> = await httpGenerator(authToken!).patch(`projectMonthlyDox/${id}/`, request, config);
        dispatch<IEditProjectMonthlyDocSuccess>({ 
            type: ProjectMonthlyDocActionType.EDIT_PROJECTMONTHLYDOX_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditProjectMonthlyDocFail>({ 
            type: ProjectMonthlyDocActionType.EDIT_PROJECTMONTHLYDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const DeleteProjectMonthlyDoc = (deletedId: number): ThunkResult<void> => async (dispatch: Dispatch<ProjectMonthlyDocAction>) => { 
    dispatch<IDeleteProjectMonthlyDoc>({ type: ProjectMonthlyDocActionType.DELETE_PROJECTMONTHLYDOX });
    try {
        const authToken = sessionStorage.getItem("token")
        await httpGenerator(authToken!).delete(`projectMonthlyDox/${deletedId}/`);
        dispatch<IDeleteProjectMonthlyDocSuccess>({
            type: ProjectMonthlyDocActionType.DELETE_PROJECTMONTHLYDOX_SUCCESS,
            payload: deletedId
        });
        // console.log("response: ", response)
        toastSuccess("اطلاعات مورد نظر با موفقیت حذف گردید.");

    } catch (err: any) {
        dispatch<IDeleteProjectMonthlyDocFail>({ 
            type: ProjectMonthlyDocActionType.DELETE_PROJECTMONTHLYDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در خذف اطلاعات مورد نظر!");
    }
};