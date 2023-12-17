import { INS_GAL_ACTION_TYPES } from "./actionTypes";
import InstituteGalleryRequest from "./InstituteGalleryRequest";
import { setCommonError } from "../commonerror";
export const findGallery = (instituteId, limit = 1, skip = 0, industry) => {
    return dispatch => {
        dispatch({
            type: INS_GAL_ACTION_TYPES.INS_GAL_LOADING,
            payload: {}
        })

        InstituteGalleryRequest.get(
            InstituteGalleryRequest.insGalEndpoint.find.replace('__INSTITUTE_ID__', instituteId).replace("__LIMIT__", limit).replace("__SKIP__", skip).replace("__type__", industry),
            (success) => {
                dispatch({
                    type: INS_GAL_ACTION_TYPES.INS_GAL_LOADED,
                    payload: success.data
                })
            },
            error => {
                setCommonError(error.message)
            }
        )
    }
}

export const filterGalleryList = (forUI, instituteId, limit = 1, skip = 0, industry) => {
    return dispatch => {
        dispatch({
            type: INS_GAL_ACTION_TYPES.INS_GAL_LOADING,
            payload: {}
        })

        InstituteGalleryRequest.get(
            InstituteGalleryRequest.insGalEndpoint.filterGalleryList.replace("__FORUI__", forUI).replace('__INSTITUTE_ID__', instituteId).replace("__LIMIT__", limit).replace("__SKIP__", skip).replace("__type__", industry),
            (success) => {
                dispatch({
                    type: INS_GAL_ACTION_TYPES.INS_GAL_LOADED,
                    payload: success.data
                })
            },
            error => {
                setCommonError(error.message)
            }
        )
    }
}

export const findGalleryMore = (instituteId, limit, skip, industry) => {
    return dispatch => {
        dispatch({
            type: INS_GAL_ACTION_TYPES.INS_GAL_MORE_LOADING,
            payload: {}
        })

        InstituteGalleryRequest.get(
            InstituteGalleryRequest.insGalEndpoint.find.replace('__INSTITUTE_ID__', instituteId).replace("__LIMIT__", limit).replace("__SKIP__", skip).replace("__type__", industry),
            (success) => {
                dispatch({
                    type: INS_GAL_ACTION_TYPES.INS_GAL_MORE_LOADED,
                    payload: success.data
                })
            },
            error => {
                setCommonError(error.message)
            }
        )
    }
}
