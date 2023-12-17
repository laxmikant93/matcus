import { INS_ANN_ACTION_TYPES } from "./actionTypes";
import InstituteAnnouncementRequest from "./InstituteAnnouncementRequest";
import { setCommonError } from "../commonerror";
export const findAnnouncement = (instituteId, limit=12, skip=0) => {
    return dispatch => {
        dispatch({
            type:INS_ANN_ACTION_TYPES.INS_ANN_LOADING,
            payload:{}
        })

        InstituteAnnouncementRequest.get(
            InstituteAnnouncementRequest.insAnnEndpoint.find.replace('__INSTITUTE_ID__', instituteId).replace("__LIMIT__", limit).replace("__SKIP__",skip),
            (success)=>{
                dispatch({
                    type:INS_ANN_ACTION_TYPES.INS_ANN_LOADED,
                    payload:success.data
                })
            },
            error=>{
                setCommonError(error.message)
            }
        )
    }
}

export const findAnnouncementMore = (instituteId, limit, skip) => {
    return dispatch => {
        dispatch({
            type:INS_ANN_ACTION_TYPES.INS_ANN_MORE_LOADING,
            payload:{}
        })

        InstituteAnnouncementRequest.get(
            InstituteAnnouncementRequest.insAnnEndpoint.find.replace('__INSTITUTE_ID__', instituteId).replace("__LIMIT__", limit).replace("__SKIP__",skip),
            (success)=>{
                dispatch({
                    type:INS_ANN_ACTION_TYPES.INS_ANN_MORE_LOADED,
                    payload:success.data
                })
            },
            error=>{
                setCommonError(error.message)
            }
        )
    }
}


export const openAnnPopup = annId=> {
    return dispatch => {
        dispatch({
            type:INS_ANN_ACTION_TYPES.INS_ANN_POPUP_OPEN,
            payload:annId
        })
    }
}

export const closeAnnPopup = () => {
    return dispatch => {
        dispatch({
            type:INS_ANN_ACTION_TYPES.INS_ANN_POPUP_CLOSE,
            payload:{}
        })
    }
}