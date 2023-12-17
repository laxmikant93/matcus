import { VacancyActionTypes } from "./actionTypes";
import VacancyRequest from "./VacancyRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const getVacancyList = (insID, industry) => {
    return dispatch => {

        dispatch({
            type: VacancyActionTypes.VACANCY_LIST_LOADING,
            payload: [],
        })

        VacancyRequest.get(VacancyRequest.VacancyEndpoint.getVacancy.replace("__INSID__", insID).replace("__type__", industry), (success) => {

            dispatch({
                type: VacancyActionTypes.VACANCY_LIST_LOADED,
                payload: success.data.allJobInfo
            })

        },
            error => {
                dispatch(setCommonError(error.message))
            });

    }
}

export const getApplicantList = (insID, id, industry) => {
    return dispatch => {

        dispatch({
            type: VacancyActionTypes.APPLICANT_LIST_LOADING,
            payload: [],
        })

        VacancyRequest.get(VacancyRequest.VacancyEndpoint.getApplicantlist.replace("__INSID__", insID).replace("__ID__", id).replace("__type__", industry), (success) => {

            dispatch({
                type: VacancyActionTypes.APPLICANT_LIST_LOADED,
                payload: success.data.applicantInfo
            })

        },
            error => {
                dispatch(setCommonError(error.message))
            });

    }
}

export const getVacancySelection = (VID, industry) => {
    return dispatch => {

        dispatch({
            type: VacancyActionTypes.VACANCY_LIST_SELECTION_LOADING,
            payload: [],
        })

        VacancyRequest.get(VacancyRequest.VacancyEndpoint.getVacancySelection.replace("__VID__", VID).replace("__type__", industry), (success) => {

            dispatch({
                type: VacancyActionTypes.VACANCY_LIST_SELECTION_LOADED,
                payload: success.data.jobInfo
            })

        },
            error => {
                dispatch(setCommonError(error.message))
            });

    }
}

export const VacancySelectionReset = () => {
    return dispatch => {
        dispatch({
            type: VacancyActionTypes.VACANCY_LIST_SELECTION_LOADING,
            payload: [],
        })

    }
}
export const getFilterApplicant = (insID, id, filterInfo, filVal, industry) => {
    return dispatch => {

        dispatch({
            type: VacancyActionTypes.APPLICANT_LIST_LOADING,
            payload: [],
        })

        VacancyRequest.get(VacancyRequest.VacancyEndpoint.getFilterApplicant.replace("__INSID__", insID).replace("__ID__", id).replace("__FILTER__", filterInfo).replace("__FILVAL__", filVal).replace("__type__", industry), (success) => {

            dispatch({
                type: VacancyActionTypes.APPLICANT_LIST_LOADED,
                payload: success.data.applicantInfo
            })

        },
            error => {
                dispatch(setCommonError(error.message))
            });

    }
}
export const getFilterVacancy = (insID, filterInfo, filVal, industry) => {
    return dispatch => {

        dispatch({
            type: VacancyActionTypes.VACANCY_LIST_LOADING,
            payload: [],
        })

        VacancyRequest.get(VacancyRequest.VacancyEndpoint.getFilterVacancy.replace("__INSID__", insID).replace("__FILTER__", filterInfo).replace("__FILVAL__", filVal).replace("__type__", industry), (success) => {

            dispatch({
                type: VacancyActionTypes.VACANCY_LIST_LOADED,
                payload: success.data.allJobInfo
            })

        },
            error => {
                dispatch(setCommonError(error.message))
            });

    }
}

export const getSearchFilterVacancy = (insID, val, industry) => {
    return dispatch => {

        dispatch({
            type: VacancyActionTypes.VACANCY_LIST_LOADING,
            payload: [],
        })

        VacancyRequest.get(VacancyRequest.VacancyEndpoint.getSearchFilterVacancy.replace("__INSID__", insID).replace("__VAL__", val).replace("__type__", industry), (success) => {

            dispatch({
                type: VacancyActionTypes.VACANCY_LIST_LOADED,
                payload: success.data.allJobInfo
            })

        },
            error => {
                dispatch(setCommonError(error.message))
            });

    }
}
export const getSearchFilterApplicant = (insID, id, val, industry) => {
    return dispatch => {

        dispatch({
            type: VacancyActionTypes.APPLICANT_LIST_LOADING,
            payload: [],
        })

        VacancyRequest.get(VacancyRequest.VacancyEndpoint.getSearchFilterApplicant.replace("__INSID__", insID).replace("__ID__", id).replace("__VAL__", val).replace("__type__", industry), (success) => {

            dispatch({
                type: VacancyActionTypes.APPLICANT_LIST_LOADED,
                payload: success.data.applicantInfo
            })

        },
            error => {
                dispatch(setCommonError(error.message))
            });

    }
}

export const resetVacancyList = () => {
    return dispatch => {
        dispatch({
            type: VacancyActionTypes.VACANCY_LIST_RESET,
            payload: {}
        })
    }
}


export const createVacancy = (Data, type) => {
    return dispatch => {
        if (type === "publish") {
            dispatch({
                type: VacancyActionTypes.VACANCY_CREATING,
                payload: {}
            })
        } else {
            dispatch({
                type: VacancyActionTypes.VACANCY_CREATING_SAVE,
                payload: {}
            })
        }
        VacancyRequest.post(
            VacancyRequest.VacancyEndpoint.post,
            Data,
            (success) => {
                if (success.data._id) {
                    dispatch({
                        type: VacancyActionTypes.VACANCY_CREATED,
                        payload: success.data
                    })

                    dispatch(showSuccessPopup("Vacancy created successfully."))
                } if (success.data.errors) {
                    dispatch({
                        type: VacancyActionTypes.VACANCY_CREATE_ERROR,
                        payload: []
                    })
                    dispatch(setCommonError(success.data._message))
                }
            },
            (error) => {

                dispatch(setCommonError(error.message))
            }
        )
    }
}

export const UpdateVacancy = (Data, id, SuccessPopChange) => {
    return dispatch => {
        dispatch({
            type: VacancyActionTypes.VACANCY_UPDATING,
            payload: {}
        })
        VacancyRequest.patch(
            VacancyRequest.VacancyEndpoint.updateVacancy.replace("__ID__", id),
            Data,
            (success) => {
                if (success.data.editInfo) {
                    dispatch({
                        type: VacancyActionTypes.VACANCY_UPDATED,
                        payload: success.data
                    })
                    if (SuccessPopChange) {
                        dispatch(showSuccessPopup("Deadline Extended, Your vacancy is active again."))
                    } else {
                        dispatch(showSuccessPopup("Vacancy updated successfully."))
                    }

                }
                if (success.data.errors) {
                    dispatch({
                        type: VacancyActionTypes.VACANCY_UPDATE_ERROR,
                        payload: success.data
                    })
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
            type: VacancyActionTypes.VACANCY_LIST_SELECTION_RESET,
            payload: []
        })
    }
}


export const deleteVacancy = (id, industry) => {
    return dispatch => {
        dispatch({
            type: VacancyActionTypes.VACANCY_DELETE_LOADING,
            payload: {}
        })

        VacancyRequest.delete(
            VacancyRequest.VacancyEndpoint.deleteVacancy.replace("__ID__", id).replace("__type__", industry),
            (success) => {
                dispatch({
                    type: VacancyActionTypes.VACANCY_DELETE,
                    payload: id
                })

                dispatch(showSuccessPopup("Vacancy deleted successfully."))
            },
            (error) => {
                dispatch({
                    type: VacancyActionTypes.VACANCY_DELETE_RESET,
                    payload: {}
                })
                dispatch(setCommonError(error.message))
            }
        )
    }
}


export const listStatusUpdate = (id, data, popUpShow) => {
    return dispatch => {

        VacancyRequest.patch(
            VacancyRequest.VacancyEndpoint.listStatusUpdateVacancy.replace("__ID__", id), data,
            (success) => {
                dispatch({
                    type: VacancyActionTypes.UPDATE_LIST_STATUS,
                    payload: success.data.editInfo
                })
                if (popUpShow) {
                    dispatch(showSuccessPopup(" Vacancy status changed successfully."))
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

        VacancyRequest.patch(
            VacancyRequest.VacancyEndpoint.applicantlistStatusUpdateVacancy.replace("__ID__", id), data,
            (success) => {
                dispatch({
                    type: VacancyActionTypes.APPLICANT_UPDATE_LIST_STATUS,
                    payload: success.data.editApplicantInfo
                })
                dispatch(showSuccessPopup(" Applicant status changed successfully."))
            },
            (error) => {
                dispatch(setCommonError(error.message))
            }
        )
    }
}
export const applicantStatusCheck = (id, data) => {
    return dispatch => {

        VacancyRequest.patch(
            VacancyRequest.VacancyEndpoint.applicantlistStatusUpdateVacancy.replace("__ID__", id), data,
            (success) => {
                dispatch({
                    type: VacancyActionTypes.APPLICANT_UPDATE_EMAIL_NOTIFY,
                    payload: success.data.editApplicantInfo
                })
                dispatch(showSuccessPopup(" Applicant has been notified."))
            },

            (error) => {
                dispatch(setCommonError(error.message))
            }
        )
    }
}


export const createVacancyReset = () => {
    return dispatch => {
        dispatch({
            type: VacancyActionTypes.VACANCY_CREATE_RESET,
            payload: {}
        })
    }
}

export const updateVacancyReset = () => {
    return dispatch => {
        dispatch({
            type: VacancyActionTypes.VACANCY_UPDATE_RESET,
            payload: {}
        })
    }
}



export const selectTitleNamevacancy = (id, industry) => {
    return dispatch => {
        dispatch({
            type: VacancyActionTypes.VACANCY_TITLE_LOADING,
            payload: {}
        })

        VacancyRequest.get(VacancyRequest.VacancyEndpoint.getListStatusUpdateVacancy.replace("__ID__", id).replace("__type__", industry), (success) => {

            dispatch({
                type: VacancyActionTypes.VACANCY_TITLE_LOADED,
                payload: success.data.jobInfo
            })

        },
            error => {
                dispatch({
                    type: VacancyActionTypes.VACANCY_TITLE_LOADING_ERROR,
                    payload: {}
                })
                dispatch(setCommonError(error.message))
            });
    }
}
export const selectTitleNamevacancyReset = () => {
    return dispatch => {
        dispatch({
            type: VacancyActionTypes.VACANCY_TITLE_LOADING_RESET,
            payload: {}
        })
    }
}


export const applyVacancyNotification = (data, industry) => {
    let spredData = {
        ...data, industry: industry
    }
    return dispatch => {
        VacancyRequest.post(VacancyRequest.VacancyEndpoint.applyVacancynotification,
            spredData,
            (success) => {


            }, (error) => {

            })
    }
}