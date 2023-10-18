import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    ThunkResult } from "./actionResultTypes";
import { 
    Action as ProblemAction,
    ActionType as ProblemActionType, 
    IFetchProblems,
    IFetchProblemsSuccess,
    IFetchProblemsFail,
    IEditProblem,
    IEditProblemSuccess,
    IEditProblemFail,
    IDeleteProblem,
    IDeleteProblemSuccess,
    IDeleteProblemFail,
    IAddProblem,
    IAddProblemSuccess,
    IAddProblemFail,
} from "../actionTypes/problemActionTypes";
import { toastError, 
     toastSuccess 
} from '../../services/toasters';
import { 
    IProblem as Problem, 
    IRequestProblem,
} from '../../models/problem';

import { httpGenerator } from '../../services';
import { MultiResponseType } from '../../models/multiResponseType';
// import { IProblem } from '../../models/problem';


export const GetProblem = (contractId: number, dateId: number): ThunkResult<void> => async (dispatch: Dispatch<ProblemAction>) => { 
    dispatch<IFetchProblems>({  
        type: ProblemActionType.FETCH_PROBLEMS
    });

    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<MultiResponseType<Problem>> = await httpGenerator(authToken!).get(`problems/contractMonthList/${contractId}/${dateId}/`);
        dispatch<IFetchProblemsSuccess>({
            type: ProblemActionType.FETCH_PROBLEMS_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)

    } catch(err: any) {
        dispatch<IFetchProblemsFail>({
            type: ProblemActionType.FETCH_PROBLEMS_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در بازیابی اطلاعات!");
    }
}

export const AddProblem = (request: IRequestProblem): ThunkResult<void> => async (dispatch: Dispatch<ProblemAction>) => {
    // console.log("request: ", request) 
    dispatch<IAddProblem>({ 
        type: ProblemActionType.ADD_PROBLEM
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<Problem> = await httpGenerator(authToken!).post(`problems/`, request);
        dispatch<IAddProblemSuccess>({
            type: ProblemActionType.ADD_PROBLEM_SUCCESS,
            payload: response.data  
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات جدید با موفقیت ذخیره گردید.");

    } catch(err:any) {
        dispatch<IAddProblemFail>({
            type: ProblemActionType.ADD_PROBLEM_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ذخیره سازی اطلاعات جدید!");
    }
};

export const EditProblem = (id: number, request: IRequestProblem): ThunkResult<void> => async (dispatch: Dispatch<ProblemAction>) => { 
    dispatch<IEditProblem>({ 
        type: ProblemActionType.EDIT_PROBLEM 
    });
    // console.log('EditProblem ... ')
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<Problem> = await httpGenerator(authToken!).put(`problems/${id}/`, request);
        dispatch<IEditProblemSuccess>({ 
            type: ProblemActionType.EDIT_PROBLEM_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditProblemFail>({ 
            type: ProblemActionType.EDIT_PROBLEM_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const DeleteProblem = (deletedId: number): ThunkResult<void> => async (dispatch: Dispatch<ProblemAction>) => { 
    dispatch<IDeleteProblem>({ type: ProblemActionType.DELETE_PROBLEM });
    try {
        const authToken = sessionStorage.getItem("token")
        await httpGenerator(authToken!).delete(`problems/${deletedId}/`);
        dispatch<IDeleteProblemSuccess>({
            type: ProblemActionType.DELETE_PROBLEM_SUCCESS,
            payload: deletedId
        });
        // console.log("response: ", response)
        toastSuccess("اطلاعات مورد نظر با موفقیت حذف گردید.");

    } catch (err: any) {
        dispatch<IDeleteProblemFail>({ 
            type: ProblemActionType.DELETE_PROBLEM_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در خذف اطلاعات مورد نظر!");
    }
};