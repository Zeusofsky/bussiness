import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    // MultiRecordResponse, 
    ThunkResult } from "./actionResultTypes";
import { 
    Action as ContractInfoAction,
    ActionType as ContractInfoActionType, 
    IFetchContractInfo,
    IFetchContractInfoSuccess,
    IFetchContractInfoFail,
    IEditContractInfo,
    IEditContractInfoSuccess,
    IEditContractInfoFail,
    IProjectManagerConfirmSuccess,
    IEditContractDatesSuccess,
} from "../actionTypes/contractInfoActionTypes";
import { 
    Action as ContractConsultantAction,
    ActionType as ContractConsultantActionType, 
    IFetchContractConsultants,
    IFetchContractConsultantsSuccess,
    IFetchContractConsultantsFail,
} from "../actionTypes/contractConsultantActionTypes";
import { 
    Action as ContractCorporationAction,
    ActionType as ContractCorporationActionType, 
    IFetchContractCorporations,
    IFetchContractCorporationsSuccess,
    IFetchContractCorporationsFail,
} from "../actionTypes/contractCorporationActionTypes";
import { toastError, toastSuccess } from '../../services/toasters';
import { 
    IContractInfo as ContractInfo, 
} from '../../models/contractInfo';
import { 
    IContractConsultant as ContractConsultant, 
} from '../../models/contractConsultant';
import { 
    IContractCorporation as ContractCorporation, 
} from '../../models/contractCorporation';
import { SingleResponseType } from '../../models/singleResponseType'
import { MultiResponseType } from '../../models/multiResponseType'

import { http, httpGenerator } from '../../services';
import { IContractInfoRequest } from '../../models/contractInfo';
import { SingleResponseTypeEx } from '../../models/singleResponseTypeEx';


export const GetContractInfo = (contractId: number, dateID: number): ThunkResult<void> => async (dispatch: Dispatch<ContractInfoAction>) => { 
    dispatch<IFetchContractInfo>({  
        type: ContractInfoActionType.FETCH_CONTRACTINFO
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<SingleResponseTypeEx<ContractInfo>> = await httpGenerator(authToken!).get(`contractInfo/${contractId}/${dateID}`);
        dispatch<IFetchContractInfoSuccess>({
            type: ContractInfoActionType.FETCH_CONTRACTINFO_SUCCESS,
            payload: response.data
        });
        // console.log(response.data)
    } catch(err: any) {
        dispatch<IFetchContractInfoFail>({
            type: ContractInfoActionType.FETCH_CONTRACTINFO_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا : اطلاعات پروژه قابل بازیابی نمی باشد !");
    }
}

export const GetContractConsultants = (contractId: number): ThunkResult<void> => async (dispatch: Dispatch<ContractConsultantAction>) => { 
    dispatch<IFetchContractConsultants>({  
        type: ContractConsultantActionType.FETCH_CONTRACTCONSULTANTS 
    });

    try {
        const response: AxiosResponse<MultiResponseType<ContractConsultant>> = await http.get(`contractConsultants/${contractId}/`);
        dispatch<IFetchContractConsultantsSuccess>({
            type: ContractConsultantActionType.FETCH_CONTRACTCONSULTANTS_SUCCESS,
            payload: response.data
        });

    } catch(err: any) {
        dispatch<IFetchContractConsultantsFail>({
            type: ContractConsultantActionType.FETCH_CONTRACTCONSULTANTS_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("Error: could not read Contract Consultant data!");
    }
}

export const GetContractCorporations = (contractId: number): ThunkResult<void> => async (dispatch: Dispatch<ContractCorporationAction>) => { 
    dispatch<IFetchContractCorporations>({  
        type: ContractCorporationActionType.FETCH_CONTRACTCORPORATIONS
    });

    try {
        const response: AxiosResponse<SingleResponseType<ContractCorporation>> = await http.get(`contractCorporations/${contractId}/`);
        dispatch<IFetchContractCorporationsSuccess>({
            type: ContractCorporationActionType.FETCH_CONTRACTCORPORATIONS_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)
    } catch(err: any) {
        dispatch<IFetchContractCorporationsFail>({
            type: ContractCorporationActionType.FETCH_CONTRACTCORPORATIONS_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("Error: could not read Contract Corporation data!");
    }
}

export const EditContractInfo = (id: number, contractInfo: IContractInfoRequest): ThunkResult<void> => async (dispatch: Dispatch<ContractInfoAction>) => { 
    dispatch<IEditContractInfo>({ 
        type: ContractInfoActionType.EDIT_CONTRACTINFO 
    });
    console.log('EditContractInfo ... ')
    try {
        const response: AxiosResponse<SingleResponseTypeEx<ContractInfo>> = await http.patch(`contractUpdate/${id}/`, contractInfo);
        dispatch<IEditContractInfoSuccess>({ 
            type: ContractInfoActionType.EDIT_CONTRACTINFO_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("Contract info updated successfully");

    } catch (err: any) {
        dispatch<IEditContractInfoFail>({ 
            type: ContractInfoActionType.EDIT_CONTRACTINFO_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("Error: System could not update contract info data!");
    }
};

export const EditStartOperationDate = (contractId: number, startOperationDate: string): ThunkResult<void> => async (dispatch: Dispatch<ContractInfoAction>) => { 
    dispatch<IEditContractInfo>({ 
        type: ContractInfoActionType.EDIT_CONTRACTINFO 
    });
    const authToken = sessionStorage.getItem("token")

    try {
        await httpGenerator(authToken!).patch(`contract/updateStartOperationDate/${contractId}/${startOperationDate}/`);
        dispatch<IEditContractDatesSuccess>({ 
            type: ContractInfoActionType.EDIT_CONTRACTDATES_SUCCESS, 
        });
        // toastSuccess("Contract info updated successfully");

    } catch (err: any) {
        dispatch<IEditContractInfoFail>({ 
            type: ContractInfoActionType.EDIT_CONTRACTINFO_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا: تاریخ شروع عملیات پروژه ویرایش نشد!");
    }
};

export const EditNotificationDate = (contractId: number, notificationDate: string): ThunkResult<void> => async (dispatch: Dispatch<ContractInfoAction>) => { 
    dispatch<IEditContractInfo>({ 
        type: ContractInfoActionType.EDIT_CONTRACTINFO 
    });
    const authToken = sessionStorage.getItem("token")

    try {
        await httpGenerator(authToken!).patch(`contract/updateNotificationDate/${contractId}/${notificationDate}/`);
        dispatch<IEditContractDatesSuccess>({ 
            type: ContractInfoActionType.EDIT_CONTRACTDATES_SUCCESS, 
        });
        // toastSuccess("Contract info updated successfully");

    } catch (err: any) {
        dispatch<IEditContractInfoFail>({ 
            type: ContractInfoActionType.EDIT_CONTRACTINFO_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا: تاریخ تنفیذ پروژه ویرایش نشد!");
    }
};

export const EditPlanStartDate = (contractId: number, planStartDate: string): ThunkResult<void> => async (dispatch: Dispatch<ContractInfoAction>) => { 
    dispatch<IEditContractInfo>({ 
        type: ContractInfoActionType.EDIT_CONTRACTINFO 
    });
    const authToken = sessionStorage.getItem("token")

    try {
        await httpGenerator(authToken!).patch(`contract/updatePlanStartDate/${contractId}/${planStartDate}/`);
        dispatch<IEditContractDatesSuccess>({ 
            type: ContractInfoActionType.EDIT_CONTRACTDATES_SUCCESS, 
        });
        // toastSuccess("Contract info updated successfully");

    } catch (err: any) {
        dispatch<IEditContractInfoFail>({ 
            type: ContractInfoActionType.EDIT_CONTRACTINFO_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا: تاریخ شروع برنامه پروژه ویرایش نشد!");
    }
};

export const EditFinishDate = (contractId: number, finishDate: string): ThunkResult<void> => async (dispatch: Dispatch<ContractInfoAction>) => { 
    dispatch<IEditContractInfo>({ 
        type: ContractInfoActionType.EDIT_CONTRACTINFO 
    });
    const authToken = sessionStorage.getItem("token")

    try {
        await httpGenerator(authToken!).patch(`contract/updateFinishDate/${contractId}/${finishDate}/`);
        dispatch<IEditContractDatesSuccess>({ 
            type: ContractInfoActionType.EDIT_CONTRACTDATES_SUCCESS, 
        });
        // toastSuccess("Contract info updated successfully");

    } catch (err: any) {
        dispatch<IEditContractInfoFail>({ 
            type: ContractInfoActionType.EDIT_CONTRACTINFO_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا: تاریخ پایان پروژه ویرایش نشد!");
    }
};

export const ProjectManagerConfirm = (contractId: number, dateID: number, confirmed: number): ThunkResult<void> => async (dispatch: Dispatch<ContractInfoAction>) => { 
    dispatch<IEditContractInfo>({ 
        type: ContractInfoActionType.EDIT_CONTRACTINFO 
    });
    const authToken = sessionStorage.getItem("token")

    console.log('EditContractInfo ... ')
    try {
        await httpGenerator(authToken!).post(`reportConfirm/projectManagerReportConfirm/${contractId}/${dateID}/${confirmed}/`);
        dispatch<IProjectManagerConfirmSuccess>({ 
            type: ContractInfoActionType.EDIT_PROJECTMANAGERCONFIRM_SUCCESS, 
        });
        // toastSuccess("Contract info updated successfully");

    } catch (err: any) {
        dispatch<IEditContractInfoFail>({ 
            type: ContractInfoActionType.EDIT_CONTRACTINFO_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا: تائید پروژه در ماه جاری انجام نشد!");
    }
};