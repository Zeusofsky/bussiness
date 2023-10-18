import { Reducer } from 'redux';
// import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/problemActionTypes';
import { IProblem as Problem } from '../../models/problem';

export interface IProblemsState {
    problems: Problem[];
    loading: boolean;
    error: String | null,
}
const initialState = {
    problems: [],
    loading: false,
    error: null,   
};
export const ProblemReducer: Reducer<IProblemsState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_PROBLEMS:
        case ActionType.ADD_PROBLEM:
        case ActionType.EDIT_PROBLEM:
        case ActionType.DELETE_PROBLEM:
            return { ...state, loading: true };

        case ActionType.FETCH_PROBLEMS_FAIL:
        case ActionType.ADD_PROBLEM_FAIL:
        case ActionType.EDIT_PROBLEM_FAIL:
        case ActionType.DELETE_PROBLEM_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.ADD_PROBLEM_SUCCESS:
            // console.log("action.payload: ", action.payload)
            return {
                ...state,
                problems: [ ...state.problems, action.payload ],
                loading: false
            };

        case ActionType.FETCH_PROBLEMS_SUCCESS:
            return {
                ...state,
                problems: action.payload.data,
                loading: false
            };

        case ActionType.EDIT_PROBLEM_SUCCESS:
            const problem: Problem = action.payload
            // console.log('================================================================')
            // console.log('@@@problem: ', problem)
            // console.log('@@@state.problems: ', state.problems)
            const index = state.problems.findIndex(itm => 
                Number(itm.problemid) === Number(problem.problemid)
            )
            // console.log('@@@index: ', index)
            const problemsPart1 = state.problems.slice(0, index)
            // console.log('@@@problemsPart1: ', problemsPart1)
            const problemsPart2 = state.problems.slice(index + 1)
            // console.log('@@@problemsPart2: ', problemsPart2)
            // console.log('@@@after edit reducer: ', [ ...problemsPart1, problem, ...problemsPart2 ])
            // console.log('================================================================')
            return {
                ...state,
                problems: [ ...problemsPart1, problem, ...problemsPart2 ],
                loading: false
            };
        case ActionType.DELETE_PROBLEM_SUCCESS:
            return {
                ...state,
                problems: state.problems.filter(problem => problem.problemid !== action.payload),
            };

        default:

            return state;
    }
};
