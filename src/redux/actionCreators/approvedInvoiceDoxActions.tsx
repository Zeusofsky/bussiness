import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    ThunkResult } from "./actionResultTypes";
import { 
    Action as ApprovedInvoiceDocAction,
    ActionType as ApprovedInvoiceDocActionType, 
    IFetchApprovedInvoiceDoc,
    IFetchApprovedInvoiceDocSuccess,
    IFetchApprovedInvoiceDocFail,
    IEditApprovedInvoiceDoc,
    IEditApprovedInvoiceDocSuccess,
    IEditApprovedInvoiceDocFail,
    IDeleteApprovedInvoiceDoc,
    IDeleteApprovedInvoiceDocSuccess,
    IDeleteApprovedInvoiceDocFail,
    IAddApprovedInvoiceDoc,
    IAddApprovedInvoiceDocSuccess,
    IAddApprovedInvoiceDocFail,
} from "../actionTypes/approvedInvoiceDoxActionTypes";
import { toastError, 
     toastSuccess 
} from '../../services/toasters';
import { 
    IApprovedInvoiceDoc as ApprovedInvoiceDoc, 
    IRequestApprovedInvoiceDoc,
    IRequestPartialApprovedInvoiceDoc,
} from '../../models/approvedInvoiceDox';

import { httpGenerator } from '../../services';
import { MultiResponseType } from '../../models/multiResponseType';
// import { SingleResponseType } from '../../models/singleResponseType';


type Config = {
    headers: Record<string, string>
};

export const GetApprovedInvoiceDoc = (contractId: number, dateId: number): ThunkResult<void> => async (dispatch: Dispatch<ApprovedInvoiceDocAction>) => { 
    dispatch<IFetchApprovedInvoiceDoc>({  
        type: ApprovedInvoiceDocActionType.FETCH_APPROVEDINVOICEDOX
    });

    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<MultiResponseType<ApprovedInvoiceDoc>> = await httpGenerator(authToken!).get(`approvedInvoiceDox/contractMonthList/${contractId}/${dateId}/`);
        dispatch<IFetchApprovedInvoiceDocSuccess>({
            type: ApprovedInvoiceDocActionType.FETCH_APPROVEDINVOICEDOX_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)

    } catch(err: any) {
        dispatch<IFetchApprovedInvoiceDocFail>({
            type: ApprovedInvoiceDocActionType.FETCH_APPROVEDINVOICEDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در بازیابی اطلاعات!");
    }
}

export const DownloadApprovedInvoiceDoc = async(ApprovedInvoiceDocId: number) => { 
    // console.log('------DownloadApprovedInvoiceDoc: id = ', ApprovedInvoiceDocId)
    try{
        const authToken = sessionStorage.getItem("token")
        let response: AxiosResponse<any> | null = null
        await httpGenerator(authToken!)
            .get(`approvedInvoiceDox/download/${ApprovedInvoiceDocId}/`, { responseType: 'blob' })
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

export const AddApprovedInvoiceDoc = (request: IRequestApprovedInvoiceDoc): ThunkResult<void> => async (dispatch: Dispatch<ApprovedInvoiceDocAction>) => {
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

    dispatch<IAddApprovedInvoiceDoc>({ 
        type: ApprovedInvoiceDocActionType.ADD_APPROVEDINVOICEDOX
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<ApprovedInvoiceDoc> = await httpGenerator(authToken!).post(`approvedInvoiceDox/`, request, config);
        dispatch<IAddApprovedInvoiceDocSuccess>({
            type: ApprovedInvoiceDocActionType.ADD_APPROVEDINVOICEDOX_SUCCESS,
            payload: response.data  
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات جدید با موفقیت ذخیره گردید.");

    } catch(err:any) {
        dispatch<IAddApprovedInvoiceDocFail>({
            type: ApprovedInvoiceDocActionType.ADD_APPROVEDINVOICEDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ذخیره سازی اطلاعات جدید!");
    }
};

export const EditApprovedInvoiceDoc = (id: number, request: IRequestApprovedInvoiceDoc): ThunkResult<void> => async (dispatch: Dispatch<ApprovedInvoiceDocAction>) => { 
    const config: Config = {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    };
    dispatch<IEditApprovedInvoiceDoc>({ 
        type: ApprovedInvoiceDocActionType.EDIT_APPROVEDINVOICEDOX 
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<ApprovedInvoiceDoc> = await httpGenerator(authToken!).put(`approvedInvoiceDox/${id}/`, request, config);
        dispatch<IEditApprovedInvoiceDocSuccess>({ 
            type: ApprovedInvoiceDocActionType.EDIT_APPROVEDINVOICEDOX_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditApprovedInvoiceDocFail>({ 
            type: ApprovedInvoiceDocActionType.EDIT_APPROVEDINVOICEDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const PartialEditApprovedInvoiceDoc = (id: number, request: IRequestPartialApprovedInvoiceDoc): ThunkResult<void> => async (dispatch: Dispatch<ApprovedInvoiceDocAction>) => { 
    const config: Config = {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    };
    
    dispatch<IEditApprovedInvoiceDoc>({ 
        type: ApprovedInvoiceDocActionType.EDIT_APPROVEDINVOICEDOX 
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<ApprovedInvoiceDoc> = await httpGenerator(authToken!).patch(`approvedInvoiceDox/${id}/`, request, config);
        dispatch<IEditApprovedInvoiceDocSuccess>({ 
            type: ApprovedInvoiceDocActionType.EDIT_APPROVEDINVOICEDOX_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditApprovedInvoiceDocFail>({ 
            type: ApprovedInvoiceDocActionType.EDIT_APPROVEDINVOICEDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const DeleteApprovedInvoiceDoc = (deletedId: number): ThunkResult<void> => async (dispatch: Dispatch<ApprovedInvoiceDocAction>) => { 
    dispatch<IDeleteApprovedInvoiceDoc>({ type: ApprovedInvoiceDocActionType.DELETE_APPROVEDINVOICEDOX });
    try {
        const authToken = sessionStorage.getItem("token")
        await httpGenerator(authToken!).delete(`approvedInvoiceDox/${deletedId}/`);
        dispatch<IDeleteApprovedInvoiceDocSuccess>({
            type: ApprovedInvoiceDocActionType.DELETE_APPROVEDINVOICEDOX_SUCCESS,
            payload: deletedId
        });
        // console.log("response: ", response)
        toastSuccess("اطلاعات مورد نظر با موفقیت حذف گردید.");

    } catch (err: any) {
        dispatch<IDeleteApprovedInvoiceDocFail>({ 
            type: ApprovedInvoiceDocActionType.DELETE_APPROVEDINVOICEDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در خذف اطلاعات مورد نظر!");
    }
};