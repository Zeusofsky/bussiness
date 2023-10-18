import { Reducer } from 'redux';
// import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/workVolumeActionTypes';
import { IWorkVolume as WorkVolume } from '../../models/workVolume';

export interface IWorkVolumesState {
    workVolumes: WorkVolume[];
    loading: boolean;
    error: String | null,
}
const initialState = {
    workVolumes: [],
    loading: false,
    error: null,   
};
export const WorkVolumeReducer: Reducer<IWorkVolumesState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_WORKVOLUMES:
        case ActionType.ADD_WORKVOLUME:
        case ActionType.EDIT_WORKVOLUME:
        case ActionType.DELETE_WORKVOLUME:
            return { ...state, loading: true };

        case ActionType.FETCH_WORKVOLUMES_FAIL:
        case ActionType.ADD_WORKVOLUME_FAIL:
        case ActionType.EDIT_WORKVOLUME_FAIL:
        case ActionType.DELETE_WORKVOLUME_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.ADD_WORKVOLUME_SUCCESS:
            // console.log("action.payload: ", action.payload)
            return {
                ...state,
                workVolumes: [ ...state.workVolumes, action.payload ],
                loading: false
            };

        case ActionType.FETCH_WORKVOLUMES_SUCCESS:
            return {
                ...state,
                workVolumes: action.payload.data,
                loading: false
            };

        // case ActionType.EDIT_WORKVOLUME_SUCCESS:
        //     const workVolume: WorkVolume = action.payload
        //     // console.log('================================================================')
        //     // console.log('@@@workVolume: ', workVolume)
        //     console.log('@@@state.workVolumes: ', state.workVolumes)
        //     const index = state.workVolumes.findIndex(itm => 
        //         Number(itm.workvolumeid) === Number(workVolume.workvolumeid)
        //     )
        //     // console.log('@@@index: ', index)
        //     const workVolumesPart1 = state.workVolumes.slice(0, index)
        //     // console.log('@@@workVolumesPart1: ', workVolumesPart1)
        //     const workVolumesPart2 = state.workVolumes.slice(index + 1)
        //     // console.log('@@@workVolumesPart2: ', workVolumesPart2)
        //     // console.log('@@@after edit reducer: ', [ ...workVolumesPart1, workVolume, ...workVolumesPart2 ])
        //     // console.log('================================================================')
        //     return {
        //         ...state,
        //         workVolumes: [ ...workVolumesPart1, workVolume, ...workVolumesPart2 ],
        //         loading: false
        //     };
        case ActionType.DELETE_WORKVOLUME_SUCCESS:
            return {
                ...state,
                workVolumes: state.workVolumes.filter(workVolume => workVolume.workvolumeid !== action.payload),
            };

        default:

            return state;
    }
};
