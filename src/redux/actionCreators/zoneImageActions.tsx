import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    ThunkResult } from "./actionResultTypes";
import { 
    Action as ZoneImageAction,
    ActionType as ZoneImageActionType, 
    IFetchZoneImages,
    IFetchZoneImagesSuccess,
    IFetchZoneImagesFail,
    IEditZoneImage,
    IEditZoneImageSuccess,
    IEditZoneImageFail,
    IDeleteZoneImage,
    IDeleteZoneImageSuccess,
    IDeleteZoneImageFail,
    IAddZoneImage,
    IAddZoneImageSuccess,
    IAddZoneImageFail,
} from "../actionTypes/zoneImageActionTypes";
import { toastError, 
     toastSuccess 
} from '../../services/toasters';
import { 
    IZoneImage as ZoneImage, 
    IRequestZoneImage,
    IRequestPartialZoneImage,
} from '../../models/zoneImage';

import { httpGenerator } from '../../services';
import { MultiResponseType } from '../../models/multiResponseType';
import { SingleResponseType } from '../../models/singleResponseType';
// import { SingleResponseType } from '../../models/singleResponseType';


type Config = {
    headers: Record<string, string>
};

export const GetZoneImage = (contractId: number, dateid: number): ThunkResult<void> => async (dispatch: Dispatch<ZoneImageAction>) => { 
    dispatch<IFetchZoneImages>({  
        type: ZoneImageActionType.FETCH_ZONEIMAGES
    });

    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<MultiResponseType<ZoneImage>> = await httpGenerator(authToken!).get(`zoneImages/${contractId}/${dateid}/`);
        dispatch<IFetchZoneImagesSuccess>({
            type: ZoneImageActionType.FETCH_ZONEIMAGES_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)

    } catch(err: any) {
        dispatch<IFetchZoneImagesFail>({
            type: ZoneImageActionType.FETCH_ZONEIMAGES_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در بازیابی اطلاعات!");
    }
}

export const DownloadZoneImage = async(ZoneImageId: number) => { 
    // console.log('------DownloadZoneImage: id = ', ZoneImageId)
    try{
        const authToken = sessionStorage.getItem("token")
        let response: AxiosResponse<any> | null = null
        await httpGenerator(authToken!)
            .get(`zoneImages/download/${ZoneImageId}/`, { responseType: 'blob' })
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

export const AddZoneImage = (request: IRequestZoneImage): ThunkResult<void> => async (dispatch: Dispatch<ZoneImageAction>) => {
    const config: Config = {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    };
    console.log('AddZoneImage Start ...')

    let formData = new FormData()
    formData.append('contractid', String(request.contractid))
    formData.append('dateid', String(request.dateid))
    formData.append('zone', request.zone)
    formData.append('ppp', String(request.ppp))
    formData.append('app', String(request.app))
    if(request.img1) formData.append('img1', request.img1!, request.img1?.name)
    formData.append('description1', request.description1)
    if(request.img2) formData.append('img2', request.img2!, request.img2?.name)
    formData.append('description2', request.description2)
    if(request.img3) formData.append('img3', request.img3!, request.img3?.name)
    formData.append('description3', request.description3)

    dispatch<IAddZoneImage>({ 
        type: ZoneImageActionType.ADD_ZONEIMAGE
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<SingleResponseType<ZoneImage>> = await httpGenerator(authToken!).post(`zoneImages/`, formData, config);
        dispatch<IAddZoneImageSuccess>({
            type: ZoneImageActionType.ADD_ZONEIMAGE_SUCCESS,
            payload: response.data  
        });
        console.log('response.data^^^: ', response.data)
        toastSuccess("اطلاعات جدید با موفقیت ذخیره گردید.");

    } catch(err:any) {
        dispatch<IAddZoneImageFail>({
            type: ZoneImageActionType.ADD_ZONEIMAGE_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ذخیره سازی اطلاعات جدید!");
    }
};

export const EditZoneImage = (id: number, request: IRequestZoneImage): ThunkResult<void> => async (dispatch: Dispatch<ZoneImageAction>) => { 
    console.log('EditZoneImage Start ...')

    dispatch<IEditZoneImage>({ 
        type: ZoneImageActionType.EDIT_ZONEIMAGE 
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<SingleResponseType<ZoneImage>> = await httpGenerator(authToken!).put(`updateZoneImage/${id}/`, request);
        dispatch<IEditZoneImageSuccess>({ 
            type: ZoneImageActionType.EDIT_ZONEIMAGE_SUCCESS, 
            payload: response.data
        });
        console.log('response.data:&&& ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditZoneImageFail>({ 
            type: ZoneImageActionType.EDIT_ZONEIMAGE_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const PartialEditZoneImage = (id: number, request: IRequestPartialZoneImage): ThunkResult<void> => async (dispatch: Dispatch<ZoneImageAction>) => { 
    const config: Config = {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    };
    
    dispatch<IEditZoneImage>({ 
        type: ZoneImageActionType.EDIT_ZONEIMAGE 
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<SingleResponseType<ZoneImage>> = await httpGenerator(authToken!).put(`zoneImages/${id}/`, request, config);
        dispatch<IEditZoneImageSuccess>({ 
            type: ZoneImageActionType.EDIT_ZONEIMAGE_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditZoneImageFail>({ 
            type: ZoneImageActionType.EDIT_ZONEIMAGE_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const DeleteZoneImage = (deletedId: number): ThunkResult<void> => async (dispatch: Dispatch<ZoneImageAction>) => { 
    dispatch<IDeleteZoneImage>({ type: ZoneImageActionType.DELETE_ZONEIMAGE });
    try {
        const authToken = sessionStorage.getItem("token")
        await httpGenerator(authToken!).delete(`zoneImages/${deletedId}/`);
        dispatch<IDeleteZoneImageSuccess>({
            type: ZoneImageActionType.DELETE_ZONEIMAGE_SUCCESS,
            payload: deletedId
        });
        // console.log("response: ", response)
        toastSuccess("اطلاعات مورد نظر با موفقیت حذف گردید.");

    } catch (err: any) {
        dispatch<IDeleteZoneImageFail>({ 
            type: ZoneImageActionType.DELETE_ZONEIMAGE_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در خذف اطلاعات مورد نظر!");
    }
};