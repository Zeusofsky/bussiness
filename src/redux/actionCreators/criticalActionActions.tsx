import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    ThunkResult } from "./actionResultTypes";
import { 
    Action as CriticalActionAction,
    ActionType as CriticalActionActionType, 
    IFetchCriticalActions,
    IFetchCriticalActionsSuccess,
    IFetchCriticalActionsFail,
    IEditCriticalAction,
    IEditCriticalActionSuccess,
    IEditCriticalActionFail,
    IDeleteCriticalAction,
    IDeleteCriticalActionSuccess,
    IDeleteCriticalActionFail,
    IAddCriticalAction,
    IAddCriticalActionSuccess,
    IAddCriticalActionFail,
    IToggleCriticalActionModel,
    ActionType,
    IStartAddCriticalAction,
    IStartEditCriticalAction,
} from "../actionTypes/criticalActionActionTypes";
import { toastError, 
     toastSuccess 
} from '../../services/toasters';
import { 
    ICriticalAction as CriticalAction, IRequestCriticalAction, 
} from '../../models/criticalAction';

import { httpGenerator } from '../../services';
import { MultiResponseType } from '../../models/multiResponseType';
// import { ICriticalAction } from '../../models/criticalAction';


export const GetCriticalAction = (contractId: number, dateId: number): ThunkResult<void> => async (dispatch: Dispatch<CriticalActionAction>) => { 
    dispatch<IFetchCriticalActions>({  
        type: CriticalActionActionType.FETCH_CRITICALACTIONS
    });

    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<MultiResponseType<CriticalAction>> = await httpGenerator(authToken!).get(`criticalActions/contractMonthList/${contractId}/${dateId}/`);
        dispatch<IFetchCriticalActionsSuccess>({
            type: CriticalActionActionType.FETCH_CRITICALACTIONS_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)

    } catch(err: any) {
        dispatch<IFetchCriticalActionsFail>({
            type: CriticalActionActionType.FETCH_CRITICALACTIONS_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در بازیابی اطلاعات!");
    }
}

export const AddCriticalAction = (request: IRequestCriticalAction): ThunkResult<void> => async (dispatch: Dispatch<CriticalActionAction>) => {
    // console.log("request: ", request) 
    dispatch<IAddCriticalAction>({ 
        type: CriticalActionActionType.ADD_CRITICALACTION
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<CriticalAction> = await httpGenerator(authToken!).post(`criticalActions/`, request);
        dispatch<IAddCriticalActionSuccess>({
            type: CriticalActionActionType.ADD_CRITICALACTION_SUCCESS,
            payload: response.data  
        });
        // console.log('ADD response.data: ', response.data)
        toastSuccess("اطلاعات جدید با موفقیت ذخیره گردید.");

    } catch(err:any) {
        dispatch<IAddCriticalActionFail>({
            type: CriticalActionActionType.ADD_CRITICALACTION_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ذخیره سازی اطلاعات جدید!");
    }
};

export const EditCriticalAction = (id: number, request: IRequestCriticalAction): ThunkResult<void> => async (dispatch: Dispatch<CriticalActionAction>) => { 
    dispatch<IEditCriticalAction>({ 
        type: CriticalActionActionType.EDIT_CRITICALACTION 
    });
    // console.log('EditCriticalAction ... ')
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<CriticalAction> = await httpGenerator(authToken!).put(`criticalActions/${id}/`, request);
        dispatch<IEditCriticalActionSuccess>({ 
            type: CriticalActionActionType.EDIT_CRITICALACTION_SUCCESS, 
            payload: response.data
        });
        // console.log('@@@response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditCriticalActionFail>({ 
            type: CriticalActionActionType.EDIT_CRITICALACTION_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const DeleteCriticalAction = (deletedId: number): ThunkResult<void> => async (dispatch: Dispatch<CriticalActionAction>) => { 
    dispatch<IDeleteCriticalAction>({ type: CriticalActionActionType.DELETE_CRITICALACTION });
    try {
        const authToken = sessionStorage.getItem("token")
        await httpGenerator(authToken!).delete(`criticalActions/${deletedId}/`);
        dispatch<IDeleteCriticalActionSuccess>({
            type: CriticalActionActionType.DELETE_CRITICALACTION_SUCCESS,
            payload: deletedId
        });
        toastSuccess("اطلاعات مورد نظر با موفقیت حذف گردید.");

    } catch (err: any) {
        dispatch<IDeleteCriticalActionFail>({ 
            type: CriticalActionActionType.DELETE_CRITICALACTION_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در خذف اطلاعات مورد نظر!");
    }
};

export const StartAddCriticalAction = () => {
    return (dispatch: Dispatch<CriticalActionAction>)=> {
        dispatch<IStartAddCriticalAction>({ 
            type: ActionType.START_ADD_CRITICALACTION,
        });
    }
}
export const StartEditCriticalAction = (editRecord: CriticalAction) => {
    return (dispatch: Dispatch<CriticalActionAction>)=> {
        dispatch<IStartEditCriticalAction>({ 
            type: ActionType.START_EDIT_CRITICALACTION,
            payload: editRecord,
        });
    }
}
export const CriticalActionModalToggler = () => {
    return (dispatch: Dispatch<CriticalActionAction>)=> {
        dispatch<IToggleCriticalActionModel>({ 
            type: ActionType.TOGGLE_CRITICALACTION_MODAL,
        });
    }
}
