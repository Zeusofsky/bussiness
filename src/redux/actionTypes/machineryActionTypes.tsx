import { IMachinery as Machinery } from '../../models/machinery';
import { MultiResponseType } from '../../models/multiResponseType';

export enum ActionType {
    FETCH_MACHINERIES = 'FETCH_MACHINERIES',
    FETCH_MACHINERIES_SUCCESS = 'FETCH_MACHINERIES_SUCCESS',
    FETCH_MACHINERIES_FAIL = 'FETCH_MACHINERIES_FAIL',
    ADD_MACHINERY = 'ADD_MACHINERY',
    ADD_MACHINERY_SUCCESS = 'ADD_MACHINERY_SUCCESS',
    ADD_MACHINERY_FAIL = 'ADD_MACHINERY_FAIL',
    EDIT_MACHINERY = 'EDIT_MACHINERY',
    EDIT_MACHINERY_SUCCESS = 'EDIT_MACHINERY_SUCCESS',
    EDIT_MACHINERY_FAIL = 'EDIT_MACHINERY_FAIL',
    DELETE_MACHINERY = 'DELETE_MACHINERY',
    DELETE_MACHINERY_SUCCESS = 'DELETE_MACHINERY_SUCCESS',
    DELETE_MACHINERY_FAIL = 'DELETE_MACHINERY_FAIL'
}

export interface IFetchMachineries {
    type: ActionType.FETCH_MACHINERIES;
}
export interface IFetchMachineriesSuccess {
    type: ActionType.FETCH_MACHINERIES_SUCCESS;
    payload: MultiResponseType<Machinery>;
}
export interface IFetchMachineriesFail {
    type: ActionType.FETCH_MACHINERIES_FAIL;
    payload: String | null;
}

export interface IAddMachinery {
    type: ActionType.ADD_MACHINERY;
}
export interface IAddMachinerySuccess {
    type: ActionType.ADD_MACHINERY_SUCCESS;
    payload: Machinery;
}
export interface IAddMachineryFail {
    type: ActionType.ADD_MACHINERY_FAIL;
    payload: String | null;
}

export interface IEditMachinery {
    type: ActionType.EDIT_MACHINERY;
}
export interface IEditMachinerySuccess {
    type: ActionType.EDIT_MACHINERY_SUCCESS;
    payload: Machinery;
}
export interface IEditMachineryFail {
    type: ActionType.EDIT_MACHINERY_FAIL;
    payload: String | null;
}
export interface IDeleteMachinery {
    type: ActionType.DELETE_MACHINERY;
}
export interface IDeleteMachinerySuccess {
    type: ActionType.DELETE_MACHINERY_SUCCESS;
    payload: number;
}
export interface IDeleteMachineryFail {
    type: ActionType.DELETE_MACHINERY_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchMachineries
    | IFetchMachineriesSuccess
    | IFetchMachineriesFail
    | IAddMachinery
    | IAddMachinerySuccess
    | IAddMachineryFail
    | IEditMachinery
    | IEditMachinerySuccess
    | IEditMachineryFail
    | IDeleteMachinery
    | IDeleteMachinerySuccess
    | IDeleteMachineryFail
