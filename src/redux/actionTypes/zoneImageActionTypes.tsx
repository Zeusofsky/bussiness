import { IZoneImage as ZoneImage } from '../../models/zoneImage';
import { MultiResponseType } from '../../models/multiResponseType';
import { SingleResponseType } from '../../models/singleResponseType';

export enum ActionType {
    FETCH_ZONEIMAGES = 'FETCH_ZONEIMAGES',
    FETCH_ZONEIMAGES_SUCCESS = 'FETCH_ZONEIMAGES_SUCCESS',
    FETCH_ZONEIMAGES_FAIL = 'FETCH_ZONEIMAGES_FAIL',
    ADD_ZONEIMAGE = 'ADD_ZONEIMAGE',
    ADD_ZONEIMAGE_SUCCESS = 'ADD_ZONEIMAGE_SUCCESS',
    ADD_ZONEIMAGE_FAIL = 'ADD_ZONEIMAGE_FAIL',
    EDIT_ZONEIMAGE = 'EDIT_ZONEIMAGE',
    EDIT_ZONEIMAGE_SUCCESS = 'EDIT_ZONEIMAGE_SUCCESS',
    EDIT_ZONEIMAGE_FAIL = 'EDIT_ZONEIMAGE_FAIL',
    DELETE_ZONEIMAGE = 'DELETE_ZONEIMAGE',
    DELETE_ZONEIMAGE_SUCCESS = 'DELETE_ZONEIMAGE_SUCCESS',
    DELETE_ZONEIMAGE_FAIL = 'DELETE_ZONEIMAGE_FAIL'
}

export interface IFetchZoneImages {
    type: ActionType.FETCH_ZONEIMAGES;
}
export interface IFetchZoneImagesSuccess {
    type: ActionType.FETCH_ZONEIMAGES_SUCCESS;
    payload: MultiResponseType<ZoneImage>;
}
export interface IFetchZoneImagesFail {
    type: ActionType.FETCH_ZONEIMAGES_FAIL;
    payload: String | null;
}

export interface IAddZoneImage {
    type: ActionType.ADD_ZONEIMAGE;
}
export interface IAddZoneImageSuccess {
    type: ActionType.ADD_ZONEIMAGE_SUCCESS;
    payload: SingleResponseType<ZoneImage>;
}
export interface IAddZoneImageFail {
    type: ActionType.ADD_ZONEIMAGE_FAIL;
    payload: String | null;
}

export interface IEditZoneImage {
    type: ActionType.EDIT_ZONEIMAGE;
}
export interface IEditZoneImageSuccess {
    type: ActionType.EDIT_ZONEIMAGE_SUCCESS;
    payload: SingleResponseType<ZoneImage>;
}
export interface IEditZoneImageFail {
    type: ActionType.EDIT_ZONEIMAGE_FAIL;
    payload: String | null;
}
export interface IDeleteZoneImage {
    type: ActionType.DELETE_ZONEIMAGE;
}
export interface IDeleteZoneImageSuccess {
    type: ActionType.DELETE_ZONEIMAGE_SUCCESS;
    payload: number;
}
export interface IDeleteZoneImageFail {
    type: ActionType.DELETE_ZONEIMAGE_FAIL;
    payload: String | null;
}

export type Action =
    | IFetchZoneImages
    | IFetchZoneImagesSuccess
    | IFetchZoneImagesFail
    | IAddZoneImage
    | IAddZoneImageSuccess
    | IAddZoneImageFail
    | IEditZoneImage
    | IEditZoneImageSuccess
    | IEditZoneImageFail
    | IDeleteZoneImage
    | IDeleteZoneImageSuccess
    | IDeleteZoneImageFail
