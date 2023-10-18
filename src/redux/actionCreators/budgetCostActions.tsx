import { Dispatch } from 'redux';
import { AxiosResponse } from "axios";
import { 
    ThunkResult } from "./actionResultTypes";
import { 
    Action as BudgetCostAction,
    ActionType as BudgetCostActionType, 
    IFetchBudgetCosts,
    IFetchBudgetCostsSuccess,
    IFetchBudgetCostsFail,
    IEditBudgetCost,
    IEditBudgetCostSuccess,
    IEditBudgetCostFail,
    IDeleteBudgetCost,
    IDeleteBudgetCostSuccess,
    IDeleteBudgetCostFail,
    IAddBudgetCost,
    IAddBudgetCostSuccess,
    IAddBudgetCostFail,
} from "../actionTypes/budgetCostActionTypes";
import { toastError, 
     toastSuccess 
} from '../../services/toasters';
import { 
    IBudgetCost as BudgetCost, 
    IRequestBudgetCost,
} from '../../models/budgetCost';

import { httpGenerator } from '../../services';
import { MultiResponseType } from '../../models/multiResponseType';
// import { IBudgetCost } from '../../models/budgetCost';


export const GetBudgetCost = (contractId: number, dateId: number): ThunkResult<void> => async (dispatch: Dispatch<BudgetCostAction>) => { 
    dispatch<IFetchBudgetCosts>({  
        type: BudgetCostActionType.FETCH_BUDGETCOSTS
    });

    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<MultiResponseType<BudgetCost>> = await httpGenerator(authToken!).get(`budgetCosts/contractMonthList/${contractId}/${dateId}/`);
        dispatch<IFetchBudgetCostsSuccess>({
            type: BudgetCostActionType.FETCH_BUDGETCOSTS_SUCCESS,
            payload: response.data
        });
        // console.log('response.data: ', response.data)

    } catch(err: any) {
        dispatch<IFetchBudgetCostsFail>({
            type: BudgetCostActionType.FETCH_BUDGETCOSTS_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در بازیابی اطلاعات!");
    }
}

export const AddBudgetCost = (request: IRequestBudgetCost): ThunkResult<void> => async (dispatch: Dispatch<BudgetCostAction>) => {
    // console.log("request: ", request) 
    dispatch<IAddBudgetCost>({ 
        type: BudgetCostActionType.ADD_BUDGETCOST
    });
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<BudgetCost> = await httpGenerator(authToken!).post(`budgetCosts/`, request);
        dispatch<IAddBudgetCostSuccess>({
            type: BudgetCostActionType.ADD_BUDGETCOST_SUCCESS,
            payload: response.data  
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات جدید با موفقیت ذخیره گردید.");

    } catch(err:any) {
        dispatch<IAddBudgetCostFail>({
            type: BudgetCostActionType.ADD_BUDGETCOST_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ذخیره سازی اطلاعات جدید!");
    }
};

export const EditBudgetCost = (id: number, request: IRequestBudgetCost): ThunkResult<void> => async (dispatch: Dispatch<BudgetCostAction>) => { 
    dispatch<IEditBudgetCost>({ 
        type: BudgetCostActionType.EDIT_BUDGETCOST 
    });
    // console.log('EditBudgetCost ... ')
    try {
        const authToken = sessionStorage.getItem("token")
        const response: AxiosResponse<BudgetCost> = await httpGenerator(authToken!).put(`budgetCosts/${id}/`, request);
        dispatch<IEditBudgetCostSuccess>({ 
            type: BudgetCostActionType.EDIT_BUDGETCOST_SUCCESS, 
            payload: response.data
        });
        // console.log('response.data: ', response.data)
        toastSuccess("اطلاعات مورد نظر با موفقیت ویرایش گردید.");

    } catch (err: any) {
        dispatch<IEditBudgetCostFail>({ 
            type: BudgetCostActionType.EDIT_BUDGETCOST_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در ویرایش اطلاعات مورد نظر!");
    }
};

export const DeleteBudgetCost = (deletedId: number): ThunkResult<void> => async (dispatch: Dispatch<BudgetCostAction>) => { 
    dispatch<IDeleteBudgetCost>({ type: BudgetCostActionType.DELETE_BUDGETCOST });
    try {
        const authToken = sessionStorage.getItem("token")
        await httpGenerator(authToken!).delete(`budgetCosts/${deletedId}/`);
        dispatch<IDeleteBudgetCostSuccess>({
            type: BudgetCostActionType.DELETE_BUDGETCOST_SUCCESS,
            payload: deletedId
        });
        // console.log("response: ", response)
        toastSuccess("اطلاعات مورد نظر با موفقیت حذف گردید.");

    } catch (err: any) {
        dispatch<IDeleteBudgetCostFail>({ 
            type: BudgetCostActionType.DELETE_BUDGETCOST_FAIL,
            payload: err
        });
        console.log('err: ', err)
        toastError("خطا در خذف اطلاعات مورد نظر!");
    }
};