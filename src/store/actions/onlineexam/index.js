import { onlineExamActionTypes } from "./actionTypes";
import OnlineExamRequest from "./onlineExamRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup"
import onlineExamRequest from "./onlineExamRequest";

export const getOnlineExamList = (ownerId, insId) => {
    return dispatch => {
        dispatch({
            type: onlineExamActionTypes.OE_LIST_LOADING,
            payload: [],
        })
        OnlineExamRequest.get(OnlineExamRequest.OnlineExamEndpoint.getOnlineExam.replace("__OWNERID__", ownerId).replace("__INSID__", insId), (success) => {
            dispatch({
                type: onlineExamActionTypes.OE_LIST_LOADED,
                payload: success.data.examList ? success.data.examList.reverse() : []
            })
        },
            error => {
                dispatch(setCommonError(error.message))
            });
    }
}

export const resetOnlineExamList = () => {
    return dispatch => {
        dispatch({
            type: onlineExamActionTypes.OE_LIST_RESET,
            payload: {}
        })
    }
}

export const createOnlineExam = (onlineExamData) => {
    return dispatch => {
        dispatch({
            type: onlineExamActionTypes.OE_CREATING,
            payload: {}
        })
        OnlineExamRequest.post(
            OnlineExamRequest.OnlineExamEndpoint.postOnlineExam,
            onlineExamData,
            (success) => {
                if (success.status === 200) {
                    dispatch({
                        type: onlineExamActionTypes.OE_CREATED,
                        payload: success.data
                    })
                    dispatch(showSuccessPopup("Exam created successfully."))
                }
                else {
                    dispatch({
                        type: onlineExamActionTypes.OE_CREATE_ERROR,
                        payload: {}
                    })
                }
            },
            (error) => {
                setCommonError(error.message)
            }
        )
    }
}

export const updateOnlineExam = (id, data) => {
    return dispatch => {
        dispatch({
            type: onlineExamActionTypes.OE_UPDATING,
            payload: {}
        })
        OnlineExamRequest.patch(
            OnlineExamRequest.OnlineExamEndpoint.updateOnlineExam.replace("__ID__", id),
            data,
            (success) => {
                if (success.status === 200) {
                    dispatch({
                        type: onlineExamActionTypes.OE_UPDATED,
                        payload: success.data
                    })
                    dispatch(showSuccessPopup("Exam updated successfully."))
                }
                else {
                    dispatch({
                        type: onlineExamActionTypes.OE_UPDATE_ERROR,
                        payload: {}
                    })
                }
            },
            (error) => {
                setCommonError(error.message)
            }
        )
    }
}

export const resetUpdateExam = () => {
    return dispatch => {
        dispatch({
            type: onlineExamActionTypes.OE_UPDATE_RESET,
            payload: {}
        })
    }
}

export const PostTeacherAccept = (data) => {
    return dispatch => {
        dispatch({
            type: onlineExamActionTypes.OE_ACCEPT_GRACE_LOADING,
            payload: {}
        })
        OnlineExamRequest.post(
            OnlineExamRequest.OnlineExamEndpoint.PostTeacherAccept, data,

            (success) => {
                dispatch({
                    type: onlineExamActionTypes.OE_ACCEPT_GRACE,
                    payload: success.data.data
                })
                dispatch(showSuccessPopup("Grace Time Request Accepted."))
            },
            (error) => {
                dispatch(setCommonError(error.message))
            }
        )
    }
}
export const PostTeacherReject = (data) => {
    return dispatch => {
        dispatch({
            type: onlineExamActionTypes.OE_REJECT_GRACE_LOADING,
            payload: {}
        })
        OnlineExamRequest.post(
            OnlineExamRequest.OnlineExamEndpoint.PostTeacherReject, data,
            (success) => {
                dispatch({
                    type: onlineExamActionTypes.OE_REJECT_GRACE,
                    payload: success.data
                })
            },
            (error) => {
                dispatch(setCommonError(error.message))
            }
        )
    }
}
export const getGraceRequest = (examId, studentId) => {
    return (dispatch) => {
        dispatch({
            type: onlineExamActionTypes.OE_VIEW_REQUEST_LOADING,
            payload: {},
        });
        OnlineExamRequest.get(
            OnlineExamRequest.OnlineExamEndpoint.getGraceRequest.replace("__EXAMID__", examId).replace("__STUDENTID__", studentId),
            (success) => {
                dispatch({
                    type: onlineExamActionTypes.OE_VIEW_REQUEST,
                    payload: success.data,
                });
            },
            (error) => {
                dispatch(setCommonError(error.message));
            }
        );
    };
};
export const deleteOnlineExam = (id) => {
    return dispatch => {

        OnlineExamRequest.delete(
            OnlineExamRequest.OnlineExamEndpoint.deleteOnlineExam.replace("__ID__", id),
            (success) => {
                dispatch({
                    type: onlineExamActionTypes.OE_DELETE,
                    payload: id
                })
                dispatch(showSuccessPopup("Exam deleted successfully."))
            },
            (error) => {
                dispatch(setCommonError(error.message))
            }
        )
    }
}


export const notifyOnlineExam = (id, data) => {
    return dispatch => {

        OnlineExamRequest.patch(
            OnlineExamRequest.OnlineExamEndpoint.notifyOnlineExam.replace("__ID__", id), data,
            (success) => {
                dispatch({
                    type: onlineExamActionTypes.OE_NOTIFY,
                    payload: success.data.resp
                })
                dispatch(showSuccessPopup("Exam notified successfully."))
            },
            (error) => {
                // dispatch(setCommonError(error.message))
            }
        )
    }
}

export const cancelOnlineExam = (id, data) => {
    return dispatch => {

        OnlineExamRequest.patch(
            OnlineExamRequest.OnlineExamEndpoint.cancelOnlineExam.replace("__ID__", id), data,
            (success) => {
                dispatch({
                    type: onlineExamActionTypes.OE_CANCEL,
                    payload: success.data.response
                })
                dispatch(showSuccessPopup("Exam canceled successfully."))
            },
            (error) => {
                dispatch(setCommonError(error.message))
            }
        )
    }
}



export const createOnlineExamReset = () => {
    return dispatch => {
        dispatch({
            type: onlineExamActionTypes.OE_CREATE_RESET,
            payload: {}
        })
    }
}

export const getExamDetails = (examId) => {
    return dispatch => {
        dispatch({
            type: onlineExamActionTypes.OE_DETAIL_LOADING,
            payload: {}
        })
        OnlineExamRequest.get(
            OnlineExamRequest.OnlineExamEndpoint.getExamDetails.replace('__ID__', examId),
            (success) => {
                dispatch({
                    type: onlineExamActionTypes.OE_DETAIL_LOADED,
                    payload: success.data
                })
                dispatch(showSuccessPopup("Request accepted successfully."))

            },
            (error) => {
                dispatch(setCommonError(error.message))
            }
        )
    }
}
export const getStudentListSubmittedExam = (_id, insId,listType) => {
    return (dispatch) => {
        dispatch({
            type: onlineExamActionTypes.STUDENT_LIST_SUBMITTED_EXAM_LOADING,
            payload: {}
        })
        if(listType==="submission"){
            OnlineExamRequest.get(
                OnlineExamRequest.OnlineExamEndpoint.studentListSubmissionExam.replace("__ID__", _id).replace("__INSID__", insId),
                (success) => {
                    dispatch({
                        type: onlineExamActionTypes.STUDENT_LIST_SUBMITTED_EXAM,
                        payload: success.data.submittedResponse
                    })
                },
                (error) => {
                    dispatch(setCommonError(error.message))
                }
            )
        }else{
            OnlineExamRequest.get(
                OnlineExamRequest.OnlineExamEndpoint.studentListSubmittedExam.replace("__ID__", _id).replace("__INSID__", insId),
                (success) => {
                    dispatch({
                        type: onlineExamActionTypes.STUDENT_LIST_SUBMITTED_EXAM,
                        payload: success.data.submittedResponse
                    })
                },
                (error) => {
                    dispatch(setCommonError(error.message))
                }
            )
        }
       
    }
}
export const getSingleExamDetails = (_id) => {
    return (dispatch) => {
        dispatch({
            type: onlineExamActionTypes.GET_SINGLE_OE_LOADING,
            payload: {}
        })
        OnlineExamRequest.get(
            OnlineExamRequest.OnlineExamEndpoint.getSingleOnlineExam.replace("__ID__", _id),
            (success) => {
                dispatch({
                    type: onlineExamActionTypes.GET_SINGLE_OE,
                    payload: success.data
                })
            }, (error) => {
                dispatch(setCommonError(error.message))
            }
        )
    }

}
export const checkExamInformation = (examId, studentId) => {
    return dispatch => {
        dispatch({
            type: onlineExamActionTypes.OE_CHECK_STUDENT_LOADING,
            payload: {}
        })
        onlineExamRequest.get(
            onlineExamRequest.OnlineExamEndpoint.examDetailForCheck.replace("__EXAMID__", examId).replace("__STUDENTID__", studentId), //?examid=&studentid=60598e391e17bc1740e07990
            (success) => {
                dispatch({
                    type: onlineExamActionTypes.OE_CHECK_STUDENT,
                    payload: success.data.resp
                })
            },
            (error) => {
                // dispatch({
                //     type: onlineExamActionTypes.OE_CHECK_STUDENT,
                //     payload: {}
                // })
                dispatch(setCommonError(error.message))
            }
        )
    }
}
export const getDataByCoursesClassroomsForExamList = (id, insId, courseData, classroomData) => {
    return (dispatch) => {
        dispatch({
            type: onlineExamActionTypes.OE_LIST_LOADING,
            loading: true,
        });
        OnlineExamRequest.get(
            OnlineExamRequest.OnlineExamEndpoint.getDataByCoursesAndClassroomsForTeacher
                .replace("__OWNERID__", id).replace("__INSID__", insId)
                .replace("__COURSESARRAY__", courseData).replace("__CLASSROOMARRAY__", classroomData),
            (success) => {
                dispatch({
                    type: onlineExamActionTypes.OE_COURSE_CLASSROOM_FILTER,
                    payload: success.data.examList ? success.data.examList : [],
                });
            }, (error) => {
                dispatch(setCommonError(error.message))
            }
        )
    }
}
export const searchTeacherList = (_id, insId, query, title) => {
    return (dispatch) => {
        dispatch({
            type: onlineExamActionTypes.OE_LIST_LOADING,
            loading: true,
        });
        OnlineExamRequest.get(
            OnlineExamRequest.OnlineExamEndpoint.searchTeacherList.replace("__ID__", _id).replace("__INSID__", insId).replace('__query__', query).replace(
                "__SEARCHTERM___",
                title
            ),
            (success) => {
                dispatch({
                    type: onlineExamActionTypes.OE_SEARCH_TEACHER_LIST,
                    payload: success.data.examList ? success.data.examList : [],
                });
            },
            (error) => {
                dispatch(setCommonError(error.message));
            }
        );
    };
}

export const sortAndSearchSubmissionList = (_id, query, term) => {
    return (dispatch) => {
        dispatch({
            type: onlineExamActionTypes.STUDENT_LIST_SUBMITTED_EXAM_LOADING,
            payload: {}
        })
        OnlineExamRequest.get(
            OnlineExamRequest.OnlineExamEndpoint.searchAndSortSubmissionList.replace("__ID__", _id).replace("__QUERY__", query).replace("__TERM__", term),
            (success) => {
                dispatch({
                    type: onlineExamActionTypes.OE_SORT_SEARCH_SUBMISSION_LIST,
                    payload: success.data.submittedResponse
                })
            },
            (error) => {
                dispatch(setCommonError(error.message))
            }
        )
    }
}
export const checkStudentExam = (_id, data) => {
    return (dispatch) => {
        dispatch({
            type: onlineExamActionTypes.OE_CHECK_STUDENT_EXAM_LOADING,
            payload: {}
        })
        OnlineExamRequest.patch(
            OnlineExamRequest.OnlineExamEndpoint.checkStudentExam.replace("__ID__", _id),
            data,
            (success) => {
                dispatch({
                    type: onlineExamActionTypes.OE_CHECK_STUDENT_EXAM,
                    payload: success.data
                })
            },
            (error) => {
                dispatch(setCommonError(error.message))
            }
        )

    }
}
export const resetCheckStudentExam = () => {
    return (dispatch) => {
        dispatch({
            type: onlineExamActionTypes.RESET_CHECK_STUDENT_EXAM,
            payload: {}
        })
    }
}

export const resetOnlineExam = () => {
    return (dispatch) => {
        dispatch({
            type: onlineExamActionTypes.RESET_ONLINE_EXAM,
            payload: {}
        })
    }
}

export const resetGraceAccept = () => {
    return (dispatch) => {
        dispatch({
            type: onlineExamActionTypes.OE_ACCEPT_GRACE_RESET,
            payload: {}
        })
    }
}
export const resetGraceReject = () => {
    return (dispatch) => {
        dispatch({
            type: onlineExamActionTypes.OE_REJECT_GRACE_RESET,
            payload: {}
        })
    }
}

export const onlineCreatedBy = (ownerId, InsId) => {
    return (dispatch) => {
        dispatch({
            type: onlineExamActionTypes.GET_CREATED_BY_OE_LOADING,
            payload: {},
        });

        OnlineExamRequest.get(
            OnlineExamRequest.OnlineExamEndpoint.created_by
                .replace("__OWNERID__", ownerId)
                .replace("__INSID__", InsId),
            (success) => {
                dispatch({
                    type: onlineExamActionTypes.GET_CREATED_BY_OE,
                    payload: success.data.teacherList,
                });

            },
            (error) => {
                dispatch(setCommonError(error.message));
            }
        );
    };
};

export const filterOnlineCreatedBy = (Owner, InsId, Teachers) => {
    return (dispatch) => {
        dispatch({
            type: onlineExamActionTypes.OE_READ_LOADING,
            payload: {},
        });

        OnlineExamRequest.get(
            OnlineExamRequest.OnlineExamEndpoint.getOnlineCreatedBy
                .replace("__OWNERID__", Owner)
                .replace("__INSID__", InsId)
                .replace("__NAME__", Teachers),
            (success) => {
                dispatch({
                    type: onlineExamActionTypes.OE_READ_CREATED,
                    payload: success.data.onlineTestInfo,
                });
            },
            (error) => {
                dispatch(setCommonError(error.message));
            }
        );
    };
};

export const examResultShow = (
    examId,
    studentId
) => {
    return (dispatch) => {
        dispatch({
            type: onlineExamActionTypes.OE_RESULT_LOADING,
            payload: {},
        });
        OnlineExamRequest.get(
            OnlineExamRequest.OnlineExamEndpoint.examResult
                .replace("__EXAMID__", examId)
                .replace("__STUDENTID__", studentId),
            (success) => {
                dispatch({
                    type: onlineExamActionTypes.OE_RESULT_LOADED,
                    payload: success.data,
                });
            },
            (error) => {
                dispatch({
                    type: onlineExamActionTypes.OE_RESULT_LOADING_ERROR,
                    payload: {},
                });
                dispatch(setCommonError(error.message));
            }
        );
    };
};