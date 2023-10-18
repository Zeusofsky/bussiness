import { Reducer } from 'redux';
// import _ from 'lodash';

import { Action, ActionType } from '../actionTypes/zoneImageActionTypes';
import { IZoneImage as ZoneImage } from '../../models/zoneImage';

export interface IZoneImageState {
    zoneImages: ZoneImage[];
    loading: boolean;
    error: String | null,
}
const initialState = {
    zoneImages: [],
    loading: false,
    error: null,   
};
export const ZoneImageReducer: Reducer<IZoneImageState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.FETCH_ZONEIMAGES:
        case ActionType.ADD_ZONEIMAGE:
        case ActionType.EDIT_ZONEIMAGE:
        case ActionType.DELETE_ZONEIMAGE:
            return { ...state, loading: true };

        case ActionType.FETCH_ZONEIMAGES_FAIL:
        case ActionType.ADD_ZONEIMAGE_FAIL:
        case ActionType.EDIT_ZONEIMAGE_FAIL:
        case ActionType.DELETE_ZONEIMAGE_FAIL:
            return { 
                ...state, 
                loading: false,
                error: action.payload
            };

        case ActionType.ADD_ZONEIMAGE_SUCCESS:
            console.log("action.payload Add: ", action.payload.data)
            return {
                ...state,
                zoneImages: [ ...state.zoneImages, action.payload.data ],
                loading: false
            };

        case ActionType.FETCH_ZONEIMAGES_SUCCESS:
            return {
                ...state,
                zoneImages: action.payload.data,
                loading: false
            };

        case ActionType.EDIT_ZONEIMAGE_SUCCESS:
            console.log("action.payload Edit: ", action.payload)
            const zoneImage: ZoneImage = action.payload.data
            const index = state.zoneImages.findIndex(itm => itm.zoneimageid === zoneImage.zoneimageid)
            const zoneImagePart1 = state.zoneImages.slice(0, index)
            const zoneImagePart2 = state.zoneImages.slice(index + 1)
            return {
                ...state,
                zoneImages: [ ...zoneImagePart1, zoneImage, ...zoneImagePart2 ],
                loading: false
            };
        case ActionType.DELETE_ZONEIMAGE_SUCCESS:
            return {
                ...state,
                zoneImages: state.zoneImages.filter(zoneImage => zoneImage.zoneimageid !== action.payload),
                // zoneImage: [ ..._.omit(state.zoneImage, action.payload) ]
            };
        default:
            return state;
    }
};
