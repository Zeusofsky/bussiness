import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    ThunkResult } from "./actionResultTypes";
import { 
    Action as ContractorDocAction,
    ActionType as ContractorDocActionType, 
    IFetchContractorDoc,
    IFetchContractorDocSuccess,
    IFetchContractorDocFail,
    IEditContractorDoc,
    IEditContractorDocSuccess,
    IEditContractorDocFail,
    IDeleteContractorDoc,
    IDeleteContractorDocSuccess,
    IDeleteContractorDocFail,
    IAddContractorDoc,
    IAddContractorDocSuccess,
    IAddContractorDocFail,
} from "../actionTypes/contractorDoxActionTypes";
import { toastError, 
     toastSuccess 
} from '../../services/toasters';
import { 
    IContractorDoc as ContractorDoc, 
    IRequestContractorDoc,
    IRequestPartialContractorDoc,
} from '../../models/contractorDox';

import { httpGenerator } from '../../services';
import { MultiResponseType } from '../../models/multiResponseType';
// import { SingleResponseType } from '../../models/singleResponseType';


type Config = {
    headers: Record<string, string>
};

export const GetContractorDoc = (contractId: number): ThunkResult<void> => async (dispatch: Dispatch<ContractorDocAction>) => { 
    dispatch<IFetchContractorDoc>({  
        type: ContractorDocActionType.FETCH_CONTRACTORDOX
    });

    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<MultiResponseType<ContractorDoc>> = await httpGenerator(authToken!).get(`contractorDox/contractList/${contractId}/`);
        dispatch<IFetchContractorDocSuccess>({
            type: ContractorDocActionType.FETCH_CONTRACTORDOX_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)

    } catch(err: any) {
        dispatch<IFetchContractorDocFail>({
            type: ContractorDocActionType.FETCH_CONTRACTORDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در بازیابی اطلاعات!");
    }
}

export const DownloadContractorDoc = async(ContractorDocId: number) => { 
    // console.log('------DownloadContractorDoc: id = ', ContractorDocId)
    try{
        const authToken = sessionStorage.getItem("token")
        let response: AxiosResponse<any> | null = null
        await httpGenerator(authToken!)
            .get(`contractorDox/download/${ContractorDocId}/`, { responseType: 'blob' })
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

export const AddContractorDoc = (request: IRequestContractorDoc): ThunkResult<void> => async (dispatch: Dispatch<ContractorDocAction>) => {
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

    dispatch<IAddContractorDoc>({ 
        type: ContractorDocActionType.ADD_CONTRACTORDOX
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<ContractorDoc> = await httpGenerator(authToken!).post(`contractorDox/`, request, config);
        dispatch<IAddContractorDocSuccess>({
            type: ContractorDocActionType.ADD_CONTRACTORDOX_SUCCESS,
            payload: response.data  
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات جدید با موفقیت ذخیره گردید.");

    } catch(err:any) {
        dispatch<IAddContractorDocFail>({
            type: ContractorDocActionType.ADD_CONTRACTORDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ذخیره سازی اطلاعات جدید!");
    }
};

export const EditContractorDoc = (id: number, request: IRequestContractorDoc): ThunkResult<void> => async (dispatch: Dispatch<ContractorDocAction>) => { 
    const config: Config = {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    };
    dispatch<IEditContractorDoc>({ 
        type: ContractorDocActionType.EDIT_CONTRACTORDOX 
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<ContractorDoc> = await httpGenerator(authToken!).put(`contractorDox/${id}/`, request, config);
        dispatch<IEditContractorDocSuccess>({ 
            type: ContractorDocActionType.EDIT_CONTRACTORDOX_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditContractorDocFail>({ 
            type: ContractorDocActionType.EDIT_CONTRACTORDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const PartialEditContractorDoc = (id: number, request: IRequestPartialContractorDoc): ThunkResult<void> => async (dispatch: Dispatch<ContractorDocAction>) => { 
    const config: Config = {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    };
    
    dispatch<IEditContractorDoc>({ 
        type: ContractorDocActionType.EDIT_CONTRACTORDOX 
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<ContractorDoc> = await httpGenerator(authToken!).patch(`contractorDox/${id}/`, request, config);
        dispatch<IEditContractorDocSuccess>({ 
            type: ContractorDocActionType.EDIT_CONTRACTORDOX_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditContractorDocFail>({ 
            type: ContractorDocActionType.EDIT_CONTRACTORDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const DeleteContractorDoc = (deletedId: number): ThunkResult<void> => async (dispatch: Dispatch<ContractorDocAction>) => { 
    dispatch<IDeleteContractorDoc>({ type: ContractorDocActionType.DELETE_CONTRACTORDOX });
    try {
        const authToken = sessionStorage.getItem("token")
        await httpGenerator(authToken!).delete(`contractorDox/${deletedId}/`);
        dispatch<IDeleteContractorDocSuccess>({
            type: ContractorDocActionType.DELETE_CONTRACTORDOX_SUCCESS,
            payload: deletedId
        });
        // console.log("response: ", response)
        toastSuccess("اطلاعات مورد نظر با موفقیت حذف گردید.");

    } catch (err: any) {
        dispatch<IDeleteContractorDocFail>({ 
            type: ContractorDocActionType.DELETE_CONTRACTORDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در خذف اطلاعات مورد نظر!");
    }
};