import { Reducer } from 'redux';
// import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/budgetCostActionTypes';
import { IBudgetCost as BudgetCost } from '../../models/budgetCost';

export interface IBudgetCostsState {
    budgetCosts: BudgetCost[];
    loading: boolean;
    error: String | null,
}
const initialState = {
    budgetCosts: [],
    loading: false,
    error: null,   
};
export const BudgetCostReducer: Reducer<IBudgetCostsState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_BUDGETCOSTS:
        case ActionType.ADD_BUDGETCOST:
        case ActionType.EDIT_BUDGETCOST:
        case ActionType.DELETE_BUDGETCOST:
            return { ...state, loading: true };

        case ActionType.FETCH_BUDGETCOSTS_FAIL:
        case ActionType.ADD_BUDGETCOST_FAIL:
        case ActionType.EDIT_BUDGETCOST_FAIL:
        case ActionType.DELETE_BUDGETCOST_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.ADD_BUDGETCOST_SUCCESS:
            // console.log("action.payload: ", action.payload)
            return {
                ...state,
                budgetCosts: [ ...state.budgetCosts, action.payload ],
                loading: false
            };

        case ActionType.FETCH_BUDGETCOSTS_SUCCESS:
            return {
                ...state,
                budgetCosts: action.payload.data,
                loading: false
            };

        // case ActionType.EDIT_BUDGETCOST_SUCCESS:
        //     const budgetCost: BudgetCost = action.payload
        //     // console.log('================================================================')
        //     // console.log('@@@budgetCost: ', budgetCost)
        //     console.log('@@@state.budgetCosts: ', state.budgetCosts)
        //     const index = state.budgetCosts.findIndex(itm => 
        //         Number(itm.budgetCostid) === Number(budgetCost.budgetCostid)
        //     )
        //     // console.log('@@@index: ', index)
        //     const budgetCostsPart1 = state.budgetCosts.slice(0, index)
        //     // console.log('@@@budgetCostsPart1: ', budgetCostsPart1)
        //     const budgetCostsPart2 = state.budgetCosts.slice(index + 1)
        //     // console.log('@@@budgetCostsPart2: ', budgetCostsPart2)
        //     // console.log('@@@after edit reducer: ', [ ...budgetCostsPart1, budgetCost, ...budgetCostsPart2 ])
        //     // console.log('================================================================')
        //     return {
        //         ...state,
        //         budgetCosts: [ ...budgetCostsPart1, budgetCost, ...budgetCostsPart2 ],
        //         loading: false
        //     };
        case ActionType.DELETE_BUDGETCOST_SUCCESS:
            return {
                ...state,
                budgetCosts: state.budgetCosts.filter(budgetCost => budgetCost.budgetcostid !== action.payload),
            };

        default:

            return state;
    }
};
