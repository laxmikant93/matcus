import { GalleryPopupActionTypes } from "../gallerypopup/actionTypes";
import GalleryPopupRequest from "./GalleryPopupRequest";
import { setCommonError } from "../commonerror";

export const showGalleryPopup = (galleryid) => {
    return dispatch => {
        dispatch({
            type: GalleryPopupActionTypes.GALLERY_POPUP_SHOW,
            payload: galleryid
        })
    }
}

export const hideGalleryPopup = () => {
    return dispatch => {
        dispatch({
            type: GalleryPopupActionTypes.GALLERY_POPUP_HIDE,
            payload: {}
        })
    }
}

export const findGalleryList = (galleryId, kind, limit = 10) => {
    return dispatch => {
        dispatch({
            type: GalleryPopupActionTypes.GALLERY_POPUP_LOADING,
            payload: {}
        })
        if (kind === "") {
            GalleryPopupRequest.get(
                GalleryPopupRequest.galleryPopupEndpoint.get.replace("__GALLERYID__", galleryId).replace("__KIND__", kind).replace("__LIMIT__", limit).replace("__SKIP__", "0"),
                (success) => {

                    dispatch({
                        type: GalleryPopupActionTypes.GALLERY_POPUP_LOADED,
                        payload: success.data
                    })
                },
                (error) => {
                    dispatch(setCommonError(error.message))
                }
            )
        } else {
            GalleryPopupRequest.get(
                GalleryPopupRequest.galleryPopupEndpoint.getKind.replace("__GALLERYID__", galleryId).replace("__KIND__", kind).replace("__LIMIT__", limit).replace("__SKIP__", "0"),
                (success) => {

                    dispatch({
                        type: GalleryPopupActionTypes.GALLERY_POPUP_LOADED,
                        payload: success.data
                    })
                },
                (error) => {
                    dispatch(setCommonError(error.message))
                }
            )
        }

    }
}

export const findGalleryListMore = (galleryId, limit = 10, skip) => {
    return dispatch => {
        dispatch({
            type: GalleryPopupActionTypes.GALLERY_POPUP_MORE_LOADING,
            payload: {}
        })

        GalleryPopupRequest.get(
            GalleryPopupRequest.galleryPopupEndpoint.get.replace("__GALLERYID__", galleryId).replace("__LIMIT__", limit).replace("__SKIP__", skip),
            (success) => {

                dispatch({
                    type: GalleryPopupActionTypes.GALLERY_POPUP_MORE_LOADED,
                    payload: success.data
                })
            },
            (error) => {
                dispatch(setCommonError(error.message))
            }
        )
    }
}