import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    ThunkResult } from "./actionResultTypes";
import { 
    Action as HseReportDocAction,
    ActionType as HseReportDocActionType, 
    IFetchHseReportDoc,
    IFetchHseReportDocSuccess,
    IFetchHseReportDocFail,
    IEditHseReportDoc,
    IEditHseReportDocSuccess,
    IEditHseReportDocFail,
    IDeleteHseReportDoc,
    IDeleteHseReportDocSuccess,
    IDeleteHseReportDocFail,
    IAddHseReportDoc,
    IAddHseReportDocSuccess,
    IAddHseReportDocFail,
} from "../actionTypes/hseReportDocActionTypes";
import { toastError, 
     toastSuccess 
} from '../../services/toasters';
import { 
    IHseReportDoc as HseReportDoc, 
    IRequestHseReportDoc,
    IRequestPartialHseReportDoc,
} from '../../models/hseReportDox';

import { httpGenerator } from '../../services';
import { MultiResponseType } from '../../models/multiResponseType';
// import { SingleResponseType } from '../../models/singleResponseType';


type Config = {
    headers: Record<string, string>
};

export const GetHseReportDoc = (contractId: number): ThunkResult<void> => async (dispatch: Dispatch<HseReportDocAction>) => { 
    dispatch<IFetchHseReportDoc>({  
        type: HseReportDocActionType.FETCH_HSEREPORTDOX
    });

    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<MultiResponseType<HseReportDoc>> = await httpGenerator(authToken!).get(`hseReportDox/contractList/${contractId}/`);
        dispatch<IFetchHseReportDocSuccess>({
            type: HseReportDocActionType.FETCH_HSEREPORTDOX_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)

    } catch(err: any) {
        dispatch<IFetchHseReportDocFail>({
            type: HseReportDocActionType.FETCH_HSEREPORTDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در بازیابی اطلاعات!");
    }
}

export const DownloadHseReportDoc = async(HseReportDocId: number) => { 
    // console.log('------DownloadHseReportDoc: id = ', HseReportDocId)
    try{
        const authToken = sessionStorage.getItem("token")
        let response: AxiosResponse<any> | null = null
        await httpGenerator(authToken!)
            .get(`hseReportDox/download/${HseReportDocId}/`, { responseType: 'blob' })
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

export const AddHseReportDoc = (request: IRequestHseReportDoc): ThunkResult<void> => async (dispatch: Dispatch<HseReportDocAction>) => {
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

    dispatch<IAddHseReportDoc>({ 
        type: HseReportDocActionType.ADD_HSEREPORTDOX
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<HseReportDoc> = await httpGenerator(authToken!).post(`hseReportDox/`, request, config);
        dispatch<IAddHseReportDocSuccess>({
            type: HseReportDocActionType.ADD_HSEREPORTDOX_SUCCESS,
            payload: response.data  
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات جدید با موفقیت ذخیره گردید.");

    } catch(err:any) {
        dispatch<IAddHseReportDocFail>({
            type: HseReportDocActionType.ADD_HSEREPORTDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ذخیره سازی اطلاعات جدید!");
    }
};

export const EditHseReportDoc = (id: number, request: IRequestHseReportDoc): ThunkResult<void> => async (dispatch: Dispatch<HseReportDocAction>) => { 
    const config: Config = {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    };
    dispatch<IEditHseReportDoc>({ 
        type: HseReportDocActionType.EDIT_HSEREPORTDOX 
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<HseReportDoc> = await httpGenerator(authToken!).put(`hseReportDox/${id}/`, request, config);
        dispatch<IEditHseReportDocSuccess>({ 
            type: HseReportDocActionType.EDIT_HSEREPORTDOX_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditHseReportDocFail>({ 
            type: HseReportDocActionType.EDIT_HSEREPORTDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const PartialEditHseReportDoc = (id: number, request: IRequestPartialHseReportDoc): ThunkResult<void> => async (dispatch: Dispatch<HseReportDocAction>) => { 
    const config: Config = {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    };
    
    dispatch<IEditHseReportDoc>({ 
        type: HseReportDocActionType.EDIT_HSEREPORTDOX 
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<HseReportDoc> = await httpGenerator(authToken!).patch(`hseReportDox/${id}/`, request, config);
        dispatch<IEditHseReportDocSuccess>({ 
            type: HseReportDocActionType.EDIT_HSEREPORTDOX_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditHseReportDocFail>({ 
            type: HseReportDocActionType.EDIT_HSEREPORTDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const DeleteHseReportDoc = (deletedId: number): ThunkResult<void> => async (dispatch: Dispatch<HseReportDocAction>) => { 
    dispatch<IDeleteHseReportDoc>({ type: HseReportDocActionType.DELETE_HSEREPORTDOX });
    try {
        const authToken = sessionStorage.getItem("token")
        await httpGenerator(authToken!).delete(`hseReportDox/${deletedId}/`);
        dispatch<IDeleteHseReportDocSuccess>({
            type: HseReportDocActionType.DELETE_HSEREPORTDOX_SUCCESS,
            payload: deletedId
        });
        // console.log("response: ", response)
        toastSuccess("اطلاعات مورد نظر با موفقیت حذف گردید.");

    } catch (err: any) {
        dispatch<IDeleteHseReportDocFail>({ 
            type: HseReportDocActionType.DELETE_HSEREPORTDOX_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در خذف اطلاعات مورد نظر!");
    }
};