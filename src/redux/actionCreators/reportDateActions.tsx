import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    // MultiRecordResponse, 
    ThunkResult } from "./actionResultTypes";
import { 
    Action,
    ActionType, 
    IFetchReportDates,
    IFetchReportDatesSuccess,
    IFetchReportDatesFail,
    ISelectCurrentReportDate,

} from "../actionTypes/reportDateActionType";
import { toastError } from '../../services/toasters';
import { 
    IReportDate as ReportDate, 
} from '../../models/reportDate';
import { MultiResponseType } from '../../models/multiResponseType'
import { httpGenerator } from '../../services';


export const GetReportDates = (): ThunkResult<void> => async (dispatch: Dispatch<Action>) => { 
    dispatch<IFetchReportDates>({  
        type: ActionType.FETCH_REPORTDATES 
    });

    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<MultiResponseType<ReportDate>> = await httpGenerator(authToken!).get(`reportDates`);
        dispatch<IFetchReportDatesSuccess>({
            type: ActionType.FETCH_REPORTDATES_SUCCESS,
            payload: response.data
        });

    } catch(err: any) {
        dispatch<IFetchReportDatesFail>({
            type: ActionType.FETCH_REPORTDATES_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("Error: could not read report dates data!");
    }
}

export const SetCurrentReportDate = (reportDateId: number) => {
    return (dispatch: Dispatch<Action>)=> {
        dispatch<ISelectCurrentReportDate>({ 
            type: ActionType.SELECTED_CURRENT_REPORTDATE,
            payload: reportDateId
        });
    }
}