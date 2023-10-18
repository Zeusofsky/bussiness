import { IBudgetCost as BudgetCost } from '../../models/budgetCost';
import { MultiResponseType } from '../../models/multiResponseType';

export enum ActionType {
    FETCH_BUDGETCOSTS = 'FETCH_BUDGETCOSTS',
    FETCH_BUDGETCOSTS_SUCCESS = 'FETCH_BUDGETCOSTS_SUCCESS',
    FETCH_BUDGETCOSTS_FAIL = 'FETCH_BUDGETCOSTS_FAIL',
    ADD_BUDGETCOST = 'ADD_BUDGETCOST',
    ADD_BUDGETCOST_SUCCESS = 'ADD_BUDGETCOST_SUCCESS',
    ADD_BUDGETCOST_FAIL = 'ADD_BUDGETCOST_FAIL',
    EDIT_BUDGETCOST = 'EDIT_BUDGETCOST',
    EDIT_BUDGETCOST_SUCCESS = 'EDIT_BUDGETCOST_SUCCESS',
    EDIT_BUDGETCOST_FAIL = 'EDIT_BUDGETCOST_FAIL',
    DELETE_BUDGETCOST = 'DELETE_BUDGETCOST',
    DELETE_BUDGETCOST_SUCCESS = 'DELETE_BUDGETCOST_SUCCESS',
    DELETE_BUDGETCOST_FAIL = 'DELETE_BUDGETCOST_FAIL'
}

export interface IFetchBudgetCosts {
    type: ActionType.FETCH_BUDGETCOSTS;
}
export interface IFetchBudgetCostsSuccess {
    type: ActionType.FETCH_BUDGETCOSTS_SUCCESS;
    payload: MultiResponseType<BudgetCost>;
}
export interface IFetchBudgetCostsFail {
    type: ActionType.FETCH_BUDGETCOSTS_FAIL;
    payload: String | null;
}

export interface IAddBudgetCost {
    type: ActionType.ADD_BUDGETCOST;
}
export interface IAddBudgetCostSuccess {
    type: ActionType.ADD_BUDGETCOST_SUCCESS;
    payload: BudgetCost;
}
export interface IAddBudgetCostFail {
    type: ActionType.ADD_BUDGETCOST_FAIL;
    payload: String | null;
}

export interface IEditBudgetCost {
    type: ActionType.EDIT_BUDGETCOST;
}
export interface IEditBudgetCostSuccess {
    type: ActionType.EDIT_BUDGETCOST_SUCCESS;
    payload: BudgetCost;
}
export interface IEditBudgetCostFail {
    type: ActionType.EDIT_BUDGETCOST_FAIL;
    payload: String | null;
}
export interface IDeleteBudgetCost {
    type: ActionType.DELETE_BUDGETCOST;
}
export interface IDeleteBudgetCostSuccess {
    type: ActionType.DELETE_BUDGETCOST_SUCCESS;
    payload: number;
}
export interface IDeleteBudgetCostFail {
    type: ActionType.DELETE_BUDGETCOST_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchBudgetCosts
    | IFetchBudgetCostsSuccess
    | IFetchBudgetCostsFail
    | IAddBudgetCost
    | IAddBudgetCostSuccess
    | IAddBudgetCostFail
    | IEditBudgetCost
    | IEditBudgetCostSuccess
    | IEditBudgetCostFail
    | IDeleteBudgetCost
    | IDeleteBudgetCostSuccess
    | IDeleteBudgetCostFail
