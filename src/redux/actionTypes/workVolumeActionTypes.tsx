import { IWorkVolume as WorkVolume } from '../../models/workVolume';
import { MultiResponseType } from '../../models/multiResponseType';

export enum ActionType {
    FETCH_WORKVOLUMES = 'FETCH_WORKVOLUMES',
    FETCH_WORKVOLUMES_SUCCESS = 'FETCH_WORKVOLUMES_SUCCESS',
    FETCH_WORKVOLUMES_FAIL = 'FETCH_WORKVOLUMES_FAIL',
    ADD_WORKVOLUME = 'ADD_WORKVOLUME',
    ADD_WORKVOLUME_SUCCESS = 'ADD_WORKVOLUME_SUCCESS',
    ADD_WORKVOLUME_FAIL = 'ADD_WORKVOLUME_FAIL',
    EDIT_WORKVOLUME = 'EDIT_WORKVOLUME',
    EDIT_WORKVOLUME_SUCCESS = 'EDIT_WORKVOLUME_SUCCESS',
    EDIT_WORKVOLUME_FAIL = 'EDIT_WORKVOLUME_FAIL',
    DELETE_WORKVOLUME = 'DELETE_WORKVOLUME',
    DELETE_WORKVOLUME_SUCCESS = 'DELETE_WORKVOLUME_SUCCESS',
    DELETE_WORKVOLUME_FAIL = 'DELETE_WORKVOLUME_FAIL'
}

export interface IFetchWorkVolumes {
    type: ActionType.FETCH_WORKVOLUMES;
}
export interface IFetchWorkVolumesSuccess {
    type: ActionType.FETCH_WORKVOLUMES_SUCCESS;
    payload: MultiResponseType<WorkVolume>;
}
export interface IFetchWorkVolumesFail {
    type: ActionType.FETCH_WORKVOLUMES_FAIL;
    payload: String | null;
}

export interface IAddWorkVolume {
    type: ActionType.ADD_WORKVOLUME;
}
export interface IAddWorkVolumeSuccess {
    type: ActionType.ADD_WORKVOLUME_SUCCESS;
    payload: WorkVolume;
}
export interface IAddWorkVolumeFail {
    type: ActionType.ADD_WORKVOLUME_FAIL;
    payload: String | null;
}

export interface IEditWorkVolume {
    type: ActionType.EDIT_WORKVOLUME;
}
export interface IEditWorkVolumeSuccess {
    type: ActionType.EDIT_WORKVOLUME_SUCCESS;
    payload: WorkVolume;
}
export interface IEditWorkVolumeFail {
    type: ActionType.EDIT_WORKVOLUME_FAIL;
    payload: String | null;
}
export interface IDeleteWorkVolume {
    type: ActionType.DELETE_WORKVOLUME;
}
export interface IDeleteWorkVolumeSuccess {
    type: ActionType.DELETE_WORKVOLUME_SUCCESS;
    payload: number;
}
export interface IDeleteWorkVolumeFail {
    type: ActionType.DELETE_WORKVOLUME_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchWorkVolumes
    | IFetchWorkVolumesSuccess
    | IFetchWorkVolumesFail
    | IAddWorkVolume
    | IAddWorkVolumeSuccess
    | IAddWorkVolumeFail
    | IEditWorkVolume
    | IEditWorkVolumeSuccess
    | IEditWorkVolumeFail
    | IDeleteWorkVolume
    | IDeleteWorkVolumeSuccess
    | IDeleteWorkVolumeFail
