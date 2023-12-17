import { AdmissionActionTypes } from "./actionTypes";
import AdmissionRequest from "./AdmissionRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const getAdmissionList = (insID) => {
    return dispatch => {

        dispatch({
            type: AdmissionActionTypes.ADMISSION_LIST_LOADING,
            payload: [],
        })

        AdmissionRequest.get(AdmissionRequest.AdmissionEndpoint.getAdmission.replace("__INSID__", insID), (success) => {

            dispatch({
                type: AdmissionActionTypes.ADMISSION_LIST_LOADED,
                payload: success.data.admissionList 
            })

        },
            error => {
                dispatch(setCommonError(error.message))
            });

    }
}

export const getApplicantList = (insID, id) => {
    return dispatch => {

        dispatch({
            type: AdmissionActionTypes.ADMISSION_APPLICANT_LIST_LOADING,
            payload: [],
        })

        AdmissionRequest.get(AdmissionRequest.AdmissionEndpoint.getApplicantlist.replace("__INSID__", insID).replace("__ID__", id), (success) => {

            dispatch({
                type: AdmissionActionTypes.ADMISSION_APPLICANT_LIST_LOADED,
                payload: success.data.ApplicationInfo
            })

        },
            error => {
                dispatch(setCommonError(error.message))
            });

    }
}

export const getAdmissionSelection = (VID) => {
    return dispatch => {

        dispatch({
            type: AdmissionActionTypes.ADMISSION_LIST_SELECTION_LOADING,
            payload: [],
        })

        AdmissionRequest.get(AdmissionRequest.AdmissionEndpoint.getAdmissionSelection.replace("__VID__", VID), (success) => {

            dispatch({
                type: AdmissionActionTypes.ADMISSION_LIST_SELECTION_LOADED,
                payload: success.data.admissionInfo
            })

        },
            error => {
                dispatch(setCommonError(error.message))
            });

    }
}

export const AdmissionSelectionReset = () => {
    return dispatch => {
        dispatch({
            type: AdmissionActionTypes.ADMISSION_LIST_SELECTION_LOADING,
            payload: [],
        })
    }
}

export const getFilterApplicant = (insID, id, filterInfo, filVal) => {
    return dispatch => {

        dispatch({
            type: AdmissionActionTypes.ADMISSION_APPLICANT_LIST_LOADING,
            payload: [],
        })

        AdmissionRequest.get(AdmissionRequest.AdmissionEndpoint.getFilterApplicant.replace("__INSID__", insID).replace("__ID__", id).replace("__FILTER__", filterInfo).replace("__FILVAL__", filVal), (success) => {

            dispatch({
                type: AdmissionActionTypes.ADMISSION_APPLICANT_LIST_LOADED,
                payload: success.data.ApplicationInfo
            })

        },
            error => {
                dispatch(setCommonError(error.message))
            });

    }
}
export const getFilterAdmission = (insID, filterInfo, filVal) => {
    return dispatch => {

        dispatch({
            type: AdmissionActionTypes.ADMISSION_LIST_LOADING,
            payload: [],
        })

        AdmissionRequest.get(AdmissionRequest.AdmissionEndpoint.getFilterAdmission.replace("__INSID__", insID).replace("__FILTER__", filterInfo).replace("__FILVAL__", filVal), (success) => {

            dispatch({
                type: AdmissionActionTypes.ADMISSION_LIST_LOADED,
                payload: success.data.admissionList
            })

        },
            error => {
                dispatch(setCommonError(error.message))
            });

    }
}

export const getSearchFilterAdmission = (insID, val) => {
    return dispatch => {

        dispatch({
            type: AdmissionActionTypes.ADMISSION_LIST_LOADING,
            payload: [],
        })

        AdmissionRequest.get(AdmissionRequest.AdmissionEndpoint.getSearchFilterAdmission.replace("__INSID__", insID).replace("__VAL__", val), (success) => {

            dispatch({
                type: AdmissionActionTypes.ADMISSION_LIST_LOADED,
                payload: success.data.admissionList
            })

        },
            error => {
                dispatch(setCommonError(error.message))
            });

    }
}
export const getSearchFilterApplicant = (insID, id, val) => {
    return dispatch => {

        dispatch({
            type: AdmissionActionTypes.ADMISSION_APPLICANT_LIST_LOADING,
            payload: [],
        })

        AdmissionRequest.get(AdmissionRequest.AdmissionEndpoint.getSearchFilterApplicant.replace("__INSID__", insID).replace("__ID__", id).replace("__VAL__", val), (success) => {

            dispatch({
                type: AdmissionActionTypes.ADMISSION_APPLICANT_LIST_LOADED,
                payload: success.data.ApplicationInfo
            })

        },
            error => {
                dispatch(setCommonError(error.message))
            });

    }
}

export const resetAdmissionList = () => {
    return dispatch => {
        dispatch({
            type: AdmissionActionTypes.ADMISSION_LIST_RESET,
            payload: {}
        })
    }
}

export const createAdmission = (Data, type) => {
    return dispatch => {
        if (type === "publish") {
            dispatch({
                type: AdmissionActionTypes.ADMISSION_CREATING,
                payload: {}
            })
        } if (type === "save") {
            dispatch({
                type: AdmissionActionTypes.ADMISSION_CREATING_SAVE,
                payload: {}
            })
        }
        AdmissionRequest.post(
            AdmissionRequest.AdmissionEndpoint.post,
            Data,
            (success) => {
                if (success.data._id) {
                    dispatch({
                        type: AdmissionActionTypes.ADMISSION_CREATED,
                        payload: success.data
                    })
                    dispatch(showSuccessPopup("Admission created successfully."))
                } if (success.data.errors) {
                    dispatch(setCommonError(success.data._message))
                }
            },
            (error) => {
                dispatch(setCommonError(error.message))
            }
        )
    }
}

export const UpdateAdmission = (Data, id, SuccessPopChange) => {
    return dispatch => {
        dispatch({
            type: AdmissionActionTypes.ADMISSION_UPDATING,
            payload: {}
        })
        AdmissionRequest.patch(
            AdmissionRequest.AdmissionEndpoint.updateAdmission.replace("__ID__", id),
            Data,
            (success) => {
                if (success.data.editInfo) {
                    dispatch({
                        type: AdmissionActionTypes.ADMISSION_UPDATED,
                        payload: success.data
                    })
                    if (SuccessPopChange) {
                        dispatch(showSuccessPopup(`Deadline Extended, Your admission is active again.`))
                    } else {
                        dispatch(showSuccessPopup("Admission updated successfully."))
                    }
                }
                if (success.data.errors) {
                    dispatch(setCommonError(success.data._message))
                }

            },
            (error) => {
                dispatch(setCommonError(error.message))
            }
        )
    }
}


export const updateSelectionReset = () => {
    return dispatch => {
        dispatch({
            type: AdmissionActionTypes.ADMISSION_LIST_SELECTION_RESET,
            payload: []
        })
    }
}


export const deleteAdmission = (id) => {
    return dispatch => {

        dispatch({
            type: AdmissionActionTypes.ADMISSION_DELETE_LOADING,
            payload: []
        })

        AdmissionRequest.delete(
            AdmissionRequest.AdmissionEndpoint.deleteAdmission.replace("__ID__", id),
            (success) => {

                dispatch({
                    type: AdmissionActionTypes.ADMISSION_DELETE,
                    payload: id
                })

                dispatch(showSuccessPopup("Admission deleted successfully."))
            },
            (error) => {
                dispatch({
                    type: AdmissionActionTypes.ADMISSION_DELETE_ERROR,
                    payload: []
                })
                dispatch(setCommonError(error.message))
            }
        )
    }
}


export const listStatusUpdate = (id, data, popUpShow) => {
    return dispatch => {

        AdmissionRequest.patch(
            AdmissionRequest.AdmissionEndpoint.listStatusUpdateAdmission.replace("__ID__", id), data,
            (success) => {
                dispatch({
                    type: AdmissionActionTypes.ADMISSION_UPDATE_LIST_STATUS,
                    payload: success.data.editInfo
                })
                if (popUpShow) {
                    dispatch(showSuccessPopup(" Admission status changed successfully."))
                }

            },
            (error) => {
                dispatch(setCommonError(error.message))
            }
        )
    }
}

export const applicantlistStatusUpdate = (id, data) => {
    return dispatch => {

        AdmissionRequest.patch(
            AdmissionRequest.AdmissionEndpoint.applicantlistStatusUpdateAdmission.replace("__ID__", id), data,
            (success) => {
                dispatch({
                    type: AdmissionActionTypes.ADMISSION_APPLICANT_UPDATE_LIST_STATUS,
                    payload: success.data.editApplicationInfo
                })
                dispatch(showSuccessPopup(" Applicant status changed successfully."))
            },
            (error) => {
                dispatch(setCommonError(error.message))
            }
        )
    }
}


export const createAdmissionReset = () => {
    return dispatch => {
        dispatch({
            type: AdmissionActionTypes.ADMISSION_CREATE_RESET,
            payload: {}
        })
    }
}

export const updateAdmissionReset = () => {
    return dispatch => {
        dispatch({
            type: AdmissionActionTypes.ADMISSION_UPDATE_RESET,
            payload: {}
        })
    }
}

export const deleteAdmissionReset = () => {
    return dispatch => {
        dispatch({
            type: AdmissionActionTypes.ADMISSION_DELETE_RESET,
            payload: {}
        })
    }
}
export const selectTitleNameAdmission = (id) => {
    return dispatch => {
        dispatch({
            type: AdmissionActionTypes.ADMISSION_TITLE_LOADING,
            payload: {}
        })

        AdmissionRequest.get(AdmissionRequest.AdmissionEndpoint.listStatusUpdateAdmission.replace("__ID__", id), (success) => {

            dispatch({
                type: AdmissionActionTypes.ADMISSION_TITLE_LOADED,
                payload: success.data.admissionInfo
            })

        },
            error => {
                dispatch({
                    type: AdmissionActionTypes.ADMISSION_TITLE_LOADING_ERROR,
                    payload: {}
                })
                dispatch(setCommonError(error.message))
            });
    }
}
export const selectTitleNameAdmissionReset = () => {
    return dispatch => {
        dispatch({
            type: AdmissionActionTypes.ADMISSION_TITLE_LOADING_RESET,
            payload: {}
        })
    }
}


export const applyAdmissionnotification=(data)=>{
    return dispatch=>{
        AdmissionRequest.post(AdmissionRequest.AdmissionEndpoint.applyAdmissionNotification,
            data,(success)=>{

            },(error)=>{

            })
    }
}