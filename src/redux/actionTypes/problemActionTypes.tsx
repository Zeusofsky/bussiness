import { IProblem as Problem } from '../../models/problem';
import { MultiResponseType } from '../../models/multiResponseType';

export enum ActionType {
    FETCH_PROBLEMS = 'FETCH_PROBLEMS',
    FETCH_PROBLEMS_SUCCESS = 'FETCH_PROBLEMS_SUCCESS',
    FETCH_PROBLEMS_FAIL = 'FETCH_PROBLEMS_FAIL',
    ADD_PROBLEM = 'ADD_PROBLEM',
    ADD_PROBLEM_SUCCESS = 'ADD_PROBLEM_SUCCESS',
    ADD_PROBLEM_FAIL = 'ADD_PROBLEM_FAIL',
    EDIT_PROBLEM = 'EDIT_PROBLEM',
    EDIT_PROBLEM_SUCCESS = 'EDIT_PROBLEM_SUCCESS',
    EDIT_PROBLEM_FAIL = 'EDIT_PROBLEM_FAIL',
    DELETE_PROBLEM = 'DELETE_PROBLEM',
    DELETE_PROBLEM_SUCCESS = 'DELETE_PROBLEM_SUCCESS',
    DELETE_PROBLEM_FAIL = 'DELETE_PROBLEM_FAIL'
}

export interface IFetchProblems {
    type: ActionType.FETCH_PROBLEMS;
}
export interface IFetchProblemsSuccess {
    type: ActionType.FETCH_PROBLEMS_SUCCESS;
    payload: MultiResponseType<Problem>;
}
export interface IFetchProblemsFail {
    type: ActionType.FETCH_PROBLEMS_FAIL;
    payload: String | null;
}

export interface IAddProblem {
    type: ActionType.ADD_PROBLEM;
}
export interface IAddProblemSuccess {
    type: ActionType.ADD_PROBLEM_SUCCESS;
    payload: Problem;
}
export interface IAddProblemFail {
    type: ActionType.ADD_PROBLEM_FAIL;
    payload: String | null;
}

export interface IEditProblem {
    type: ActionType.EDIT_PROBLEM;
}
export interface IEditProblemSuccess {
    type: ActionType.EDIT_PROBLEM_SUCCESS;
    payload: Problem;
}
export interface IEditProblemFail {
    type: ActionType.EDIT_PROBLEM_FAIL;
    payload: String | null;
}
export interface IDeleteProblem {
    type: ActionType.DELETE_PROBLEM;
}
export interface IDeleteProblemSuccess {
    type: ActionType.DELETE_PROBLEM_SUCCESS;
    payload: number;
}
export interface IDeleteProblemFail {
    type: ActionType.DELETE_PROBLEM_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchProblems
    | IFetchProblemsSuccess
    | IFetchProblemsFail
    | IAddProblem
    | IAddProblemSuccess
    | IAddProblemFail
    | IEditProblem
    | IEditProblemSuccess
    | IEditProblemFail
    | IDeleteProblem
    | IDeleteProblemSuccess
    | IDeleteProblemFail
