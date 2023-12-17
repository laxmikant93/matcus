import { ANNOUNCEMENT_LIST_AT } from "./actionType";
import announcementRequest from "./announcementRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const getAnnouncementData = (id, status, industry) => {
    return dispatch => {

        announcementRequest.get(announcementRequest.AnnouncementEndpoint.announcement.replace("__ID__", id).replace("__VAL__", status).replace("__type__", industry), (success) => {

            dispatch({
                type: ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_READ,
                payload: success.data
            })
        },
            error => {
                dispatch(setCommonError(error.message))
            }
        );
    }
}
export const getAnnouncementDataFilter = (id, status, industry) => {
    return dispatch => {

        announcementRequest.get(announcementRequest.AnnouncementEndpoint.announcementFilter.replace("__ID__", id).replace("__VAL__", status).replace("__type__", industry), (success) => {

            dispatch({
                type: ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_READ,
                payload: success.data
            })
        },
            error => {
                dispatch(setCommonError(error.message))
            }
        );
    }
}

export const postAnnouncementData = (data) => {
    return dispatch => {

        dispatch({
            type: ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_CREATE_LOADING,
            payload: []
        })

        announcementRequest.post(announcementRequest.AnnouncementEndpoint.announcementCreate, data, (success) => {
            dispatch({
                type: ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_CREATE,
                payload: success.data
            });
            dispatch(showSuccessPopup("Announcement created."));
            if (success.data.emailNotify === "Yes") dispatch(createAnnouncementNotification(success.data));

        },
            error => {
                dispatch({
                    type: ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_CREATE_ERROR,
                    payload: []
                })
                dispatch(setCommonError(error.message))
            }
        );
    }
}
export const postAnnouncementDataReset = () => {
    return dispatch => {

        dispatch({
            type: ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_CREATE_RESET,
            payload: []
        })
    }
}


export const deleteAnnouncementData = (_id, industry) => {
    return dispatch => {
        dispatch({
            type: ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_DELETE_LOADING,
            payload: []
        })

        announcementRequest.post(announcementRequest.AnnouncementEndpoint.deleteAnnouncememt.replace('__AnnouncementId__', _id).replace("__type__", industry), {},
            (success) => {
                dispatch({
                    type: ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_DELETE,
                    payload: success.data
                })

                dispatch(showSuccessPopup("Announcement removed."));
            },
            (error) => {
                dispatch({
                    type: ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_DELETE_RESET,
                    payload: []
                })
                dispatch(setCommonError(error.message))
            }
        );
    }
}

export const editAnnouncementData = (_id, data, industry) => {
    return dispatch => {

        dispatch({
            type: ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_EDIT_LOADING,
            payload: []
        })
        announcementRequest.post(announcementRequest.AnnouncementEndpoint.updateAnnouncement.replace("__AnnouncementId__", _id).replace("__type__", industry), data, (success) => {

            dispatch({
                type: ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_EDIT,
                payload: success.data
            })
            dispatch(showSuccessPopup("Announcement updated."));
            if (success.data.editInfo_emailNotify === "Yes") dispatch(editAnnouncementNotification(success.data));
        },
            error => {
                dispatch({
                    type: ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_CREATE_ERROR,
                    payload: []
                })
                dispatch(setCommonError(error.message))
            }
        );
    }
}

export const AnnoucementEditReset = () => {
    return dispatch => {
        dispatch({
            type: ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_EDIT_RESET,
            payload: {}
        })
    }
}
export const AnnoucementDeleteReset = () => {
    return dispatch => {
        dispatch({
            type: ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_DELETE_RESET,
            payload: {}
        })
    }
}
export const selectAnnoucementToUpdate = announementId => {
    return dispatch => {
        dispatch({
            type: ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_UPDATE_SELECTION,
            payload: announementId
        })
    }
}


export const ClearselectAnnoucementToUpdate = () => {
    return dispatch => {
        dispatch({
            type: ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_UPDATE_SELECTION_CLEAR,
            payload: [],

        })
    }
}

// export const listStatusUpdate = (id, data) => {
//     return dispatch => {

//         announcementRequest.patch(
//             announcementRequest.AnnouncementEndpoint.listStatusUpdateVacancy.replace("__ID__", id), data,
//             (success) => {
//                 dispatch({
//                     type: VacancyActionTypes.ANNOUNCEMENT_UPDATE_LIST_STATUS,
//                     payload: success.data
//                 })
//                 dispatch(showSuccessPopup(" Vacancy status changed successfully."))
//             },
//             (error) => {
//                 dispatch(setCommonError(error.message))
//             }
//         )
//     }
// }

//create accouncement notification 
const createAnnouncementNotification = (data) => {
    let id = data.owner;
    return dispatch => {
        announcementRequest.post(announcementRequest.AnnouncementEndpoint.createAnnouncementNotification.replace("id", id),
            data,
            (success) => {

            }, (error) => {

            })
    }
}


const editAnnouncementNotification = (data) => {
    let id = data.editInfo_owner;
    return dispatch => {
        announcementRequest.post(announcementRequest.AnnouncementEndpoint.editAnnounceNotification.replace("id", id),
            data,
            (success) => {

            }, (error) => {

            })
    }
}
