import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    ThunkResult } from "./actionResultTypes";
import { 
    Action as ProjectDocAction,
    ActionType as ProjectDocActionType, 
    IFetchProjectDoc,
    IFetchProjectDocSuccess,
    IFetchProjectDocFail,
    IEditProjectDoc,
    IEditProjectDocSuccess,
    IEditProjectDocFail,
    IDeleteProjectDoc,
    IDeleteProjectDocSuccess,
    IDeleteProjectDocFail,
    IAddProjectDoc,
    IAddProjectDocSuccess,
    IAddProjectDocFail,
} from "../actionTypes/projectDoxActionTypes";
import { toastError, 
     toastSuccess 
} from '../../services/toasters';
import { 
    IProjectDoc as ProjectDoc, 
    IRequestProjectDoc,
    IRequestPartialProjectDoc,
} from '../../models/projectDox';

import { httpGenerator } from '../../services';
import { MultiResponseType } from '../../models/multiResponseType';
// import { SingleResponseType } from '../../models/singleResponseType';


type Config = {
    headers: Record<string, string>
};

export const GetProjectDoc = (contractId: number): ThunkResult<void> => async (dispatch: Dispatch<ProjectDocAction>) => { 
    dispatch<IFetchProjectDoc>({  
        type: ProjectDocActionType.FETCH_PROJECTDOX
    });

    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<MultiResponseType<ProjectDoc>> = await httpGenerator(authToken!).get(`projectDox/contractList/${contractId}/`);
        dispatch<IFetchProjectDocSuccess>({
            type: ProjectDocActionType.FETCH_PROJECTDOX_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)

    } catch(err: any) {
        dispatch<IFetchProjectDocFail>({
            type: ProjectDocActionType.FETCH_PROJECTDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در بازیابی اطلاعات!");
    }
}

export const DownloadProjectDoc = async(ProjectDocId: number) => { 
    // console.log('------DownloadProjectDoc: id = ', ProjectDocId)
    try{
        const authToken = sessionStorage.getItem("token")
        let response: AxiosResponse<any> | null = null
        await httpGenerator(authToken!)
            .get(`projectDox/download/${ProjectDocId}/`, { responseType: 'blob' })
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

export const AddProjectDoc = (request: IRequestProjectDoc): ThunkResult<void> => async (dispatch: Dispatch<ProjectDocAction>) => {
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

    dispatch<IAddProjectDoc>({ 
        type: ProjectDocActionType.ADD_PROJECTDOX
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<ProjectDoc> = await httpGenerator(authToken!).post(`projectDox/`, request, config);
        dispatch<IAddProjectDocSuccess>({
            type: ProjectDocActionType.ADD_PROJECTDOX_SUCCESS,
            payload: response.data  
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات جدید با موفقیت ذخیره گردید.");

    } catch(err:any) {
        dispatch<IAddProjectDocFail>({
            type: ProjectDocActionType.ADD_PROJECTDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ذخیره سازی اطلاعات جدید!");
    }
};

export const EditProjectDoc = (id: number, request: IRequestProjectDoc): ThunkResult<void> => async (dispatch: Dispatch<ProjectDocAction>) => { 
    const config: Config = {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    };
    dispatch<IEditProjectDoc>({ 
        type: ProjectDocActionType.EDIT_PROJECTDOX 
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<ProjectDoc> = await httpGenerator(authToken!).put(`projectDox/${id}/`, request, config);
        dispatch<IEditProjectDocSuccess>({ 
            type: ProjectDocActionType.EDIT_PROJECTDOX_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditProjectDocFail>({ 
            type: ProjectDocActionType.EDIT_PROJECTDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const PartialEditProjectDoc = (id: number, request: IRequestPartialProjectDoc): ThunkResult<void> => async (dispatch: Dispatch<ProjectDocAction>) => { 
    const config: Config = {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    };
    
    dispatch<IEditProjectDoc>({ 
        type: ProjectDocActionType.EDIT_PROJECTDOX 
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<ProjectDoc> = await httpGenerator(authToken!).patch(`projectDox/${id}/`, request, config);
        dispatch<IEditProjectDocSuccess>({ 
            type: ProjectDocActionType.EDIT_PROJECTDOX_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditProjectDocFail>({ 
            type: ProjectDocActionType.EDIT_PROJECTDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const DeleteProjectDoc = (deletedId: number): ThunkResult<void> => async (dispatch: Dispatch<ProjectDocAction>) => { 
    dispatch<IDeleteProjectDoc>({ type: ProjectDocActionType.DELETE_PROJECTDOX });
    try {
        const authToken = sessionStorage.getItem("token")
        await httpGenerator(authToken!).delete(`projectDox/${deletedId}/`);
        dispatch<IDeleteProjectDocSuccess>({
            type: ProjectDocActionType.DELETE_PROJECTDOX_SUCCESS,
            payload: deletedId
        });
        // console.log("response: ", response)
        toastSuccess("اطلاعات مورد نظر با موفقیت حذف گردید.");

    } catch (err: any) {
        dispatch<IDeleteProjectDocFail>({ 
            type: ProjectDocActionType.DELETE_PROJECTDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در خذف اطلاعات مورد نظر!");
    }
};