import { AdminCourseActionTypes } from "./actionTypes";
import AdminCourseRequest from "./AdminCourseRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const getAdminCourseList = (insID) => {
    return dispatch => {

        dispatch({
            type: AdminCourseActionTypes.ADMIN_COURSE_LIST_LOADING,
            payload: [],
        })

        AdminCourseRequest.get(AdminCourseRequest.AdminCourseEndpoint.getAdminCourse.replace("__INSID__", insID), (success) => {

            dispatch({
                type: AdminCourseActionTypes.ADMIN_COURSE_LIST_LOADED,
                payload: success.data.data ? success.data.data.reverse() : []
            })

        },
            error => {
                dispatch(setCommonError(error.message))
                dispatch({
                    type: AdminCourseActionTypes.ADMIN_COURSE_LIST_ERROR,
                    payload: []
                })
            });

    }
}

export const filterAdminCourseList = (insId, query, value, search) => {
    return dispatch => {
        dispatch({
            type: AdminCourseActionTypes.ADMIN_COURSE_LIST_LOADING,
            payload: [],
        })
        if (search) {
            AdminCourseRequest.get(AdminCourseRequest.AdminCourseEndpoint.filterAdminCourseList.replace("__INSID__", insId).replace("__QUERY__", query).replace("__VALUE__", value).replace("__SEARCH__", search), (success) => {

                dispatch({
                    type: AdminCourseActionTypes.ADMIN_FILTER_COURSE_LIST,
                    payload: success.data.data
                })

            },
                error => {
                    dispatch(setCommonError(error.message))
                }
            )
        } else {
            AdminCourseRequest.get(AdminCourseRequest.AdminCourseEndpoint.filterSearchAllAdminCourseList.replace("__INSID__", insId).replace("__QUERY__", query).replace("__VALUE__", value), (success) => {

                dispatch({
                    type: AdminCourseActionTypes.ADMIN_FILTER_COURSE_LIST,
                    payload: success.data.data
                })

            },
                error => {
                    dispatch(setCommonError(error.message))
                }
            )
        }
    }




}
export const filterCourseClassroomAdminList = (insId, classrooms, subjects) => {
    return dispatch => {

        dispatch({
            type: AdminCourseActionTypes.ADMIN_COURSE_LIST_LOADING,
            payload: [],
        })

        AdminCourseRequest.get(AdminCourseRequest.AdminCourseEndpoint.filterAdminCourseClassroomList.replace("__INSID__", insId).replace("__CLASSROOM__", classrooms).replace("__SUBJECTS__", subjects), (success) => {

            dispatch({
                type: AdminCourseActionTypes.FILTER_ADMIN_LIST_COURSE_CLASSROOMS,
                payload: success.data.data
            })

        },
            error => {
                dispatch(setCommonError(error.message))
            }
        )
    }

}
export const filterAssignToAdminList = (insId, assignToId) => {
    return dispatch => {

        dispatch({
            type: AdminCourseActionTypes.ADMIN_COURSE_LIST_LOADING,
            payload: [],
        })

        AdminCourseRequest.get(AdminCourseRequest.AdminCourseEndpoint.assignToFilterAdminList.replace("__INSID__", insId).replace("__ASSIGNTO__", assignToId), (success) => {

            dispatch({
                type: AdminCourseActionTypes.FILTER_ADMIN_LIST_ASSIGNTO,
                payload: success.data.data
            })

        },
            error => {
                dispatch(setCommonError(error.message))
            }
        )
    }

}
export const AdminCourseListReset = () => {
    return dispatch => {
        dispatch({
            type: AdminCourseActionTypes.ADMIN_COURSE_LIST_RESET,
            payload: {}
        })
    }
}

export const getAssignedCoursesList = (courseInfoId, teacherRole, studentRole) => {
    return dispatch => {

        dispatch({
            type: AdminCourseActionTypes.ADMIN_GET_TEACHER_LIST_LOADING,
            payload: [],
        })

        AdminCourseRequest.get(AdminCourseRequest.AdminCourseEndpoint.getAssignedList.replace("__ID__", courseInfoId).replace("__TEACHERROLE__", teacherRole).replace("__STUDENTROLE__", studentRole), (success) => {

            dispatch({
                type: AdminCourseActionTypes.ADMIN_GET_TEACHER_LIST,
                payload: success.data.data
            })

        },
            error => {
                dispatch(setCommonError(error.message))
                dispatch({
                    type: AdminCourseActionTypes.ADMIN_GET_TEACHER_LIST_ERROR,
                    payload: []
                })
            });

    }
}
export const resetAssignedCoursesList = () => {
    return (dispatch) => {
        dispatch({
            type: AdminCourseActionTypes.ADMIN_GET_TEACHER_LIST_RESET,
            payload: {}
        })
    }
}

export const getAllClassroomSubjects = (insId,userId,action) => {
    return dispatch => {

        dispatch({
            type: AdminCourseActionTypes.ADMIN_GET_ALL_CLASSROOMS_SUBJECTS_LOADING,
            payload: [],
        })
        if(userId){
            if(action){
                AdminCourseRequest.get(AdminCourseRequest.AdminCourseEndpoint.getAllClassroomSubjectsForTeacherAttendance.replace("__INSID__", insId).replace("__USERID__",userId), (success) => {

                    dispatch({
                        type: AdminCourseActionTypes.ADMIN_GET_ALL_CLASSROOMS_SUBJECTS,
                        payload: success.data.courseData
                    })
        
                },
                    error => {
                        dispatch(setCommonError(error.message))
                        dispatch({
                            type: AdminCourseActionTypes.ADMIN_GET_ALL_CLASSROOMS_SUBJECTS_ERROR,
                            payload: []
                        })
                    });
        
            }else{
                AdminCourseRequest.get(AdminCourseRequest.AdminCourseEndpoint.getAllClassroomSubjectsForTeacher.replace("__INSID__", insId).replace("__USERID__",userId), (success) => {

                    dispatch({
                        type: AdminCourseActionTypes.ADMIN_GET_ALL_CLASSROOMS_SUBJECTS,
                        payload: success.data.courseData
                    })
        
                },
                    error => {
                        dispatch(setCommonError(error.message))
                        dispatch({
                            type: AdminCourseActionTypes.ADMIN_GET_ALL_CLASSROOMS_SUBJECTS_ERROR,
                            payload: []
                        })
                    });
        
            }
          
        
        }else{
            AdminCourseRequest.get(AdminCourseRequest.AdminCourseEndpoint.getAllClassroomSubjects.replace("__INSID__", insId), (success) => {

                dispatch({
                    type: AdminCourseActionTypes.ADMIN_GET_ALL_CLASSROOMS_SUBJECTS,
                    payload: success.data.courseData
                })
    
            },
                error => {
                    dispatch(setCommonError(error.message))
                    dispatch({
                        type: AdminCourseActionTypes.ADMIN_GET_ALL_CLASSROOMS_SUBJECTS_ERROR,
                        payload: []
                    })
                });
    
        }
       
    }
}

export const addNewClassroom = (state,data) => {
    return dispatch => {
        dispatch({
            type: AdminCourseActionTypes.ADMIN_ADD_NEW_CLASSROOM_LOADING,
        })
        AdminCourseRequest.post(
            AdminCourseRequest.AdminCourseEndpoint.addNewClassroom,
            data,
            (success) => {
                
                let data = () => {
                    if(state==="edit"){
                        return {
                            _id: success.data._id,
                            coursename: success.data.coursename,
                            owner: success.data.owner,
                            institute: success.data.institute,
                            subjectInfo: success.data.classrooms.map((item)=>{
                                return {
                                    ...item,
                                    isClassroomAssigned:"no"
                                }
                            }),
                            isCourseAssigned:"no"
                        }
                    }else {
                        return {
                            _id: success.data._id,
                            coursename: success.data.coursename,
                            owner: success.data.owner,
                            institute: success.data.institute,
                            classroomData: success.data.classrooms,
                        } 
                    }
                   
                }
                if (
                    success.data.message ===
                    "this coursename already exists,take another name"
                ) {
                    dispatch({
                        type: AdminCourseActionTypes.ADMIN_ADD_NEW_SAME_CLASSROOM_ERROR,
                        error: true,
                    });
                } else {
                    dispatch({
                        type: AdminCourseActionTypes.ADMIN_ADD_NEW_CLASSROOM,
                        payload: data(),
                    });
                    dispatch(showSuccessPopup("Course Created"));
                }
            },
            (error) => {
                dispatch(setCommonError(error.message));
            }
        );
    }
}
export const resetAddNewSameClassroomError = () => {
    return (dispatch) => {
        dispatch({
            type: AdminCourseActionTypes.ADMIN_ADD_NEW_SAME_CLASSROOM_RESET_ERROR,
            error: false
        });
    };
}

export const addNewSubject = (state,data) => {
    return dispatch => {
        dispatch({
            type: AdminCourseActionTypes.ADMIN_ADD_NEW_SUBJECT_LOADING,
            loading: true
        })
        AdminCourseRequest.post(
            AdminCourseRequest.AdminCourseEndpoint.addNewSubject,
            data,
            (success) => {
                let data = () => {
                    // if(state==="edit"){
                    //     return {
                    //         _id: success.data.arrResponse[0]._id,
                    //         classroomname: success.data.arrResponse[0].classroomname,
                    //         owner: success.data.arrResponse[0].owner,
                    //         institute: success.data.arrResponse[0].institute,
                    //         course: success.data.arrResponse[0].course,
                    //         isClassroomAssigned:"no"
                    //     } 
                    // }else{
                    return {
                        _id: success.data.arrResponse[0]._id,
                        classroomname: success.data.arrResponse[0].classroomname,
                        owner: success.data.arrResponse[0].owner,
                        institute: success.data.arrResponse[0].institute,
                        course: success.data.arrResponse[0].course,
                    }
                // }
                }
                dispatch({
                    type: AdminCourseActionTypes.ADMIN_ADD_NEW_SUBJECT,
                    payload: data()
                });
                dispatch(showSuccessPopup("Classroom Created"));
            },
            (error) => {
                dispatch(setCommonError(error.message));
            }
        );
    }
}

export const addNewSubjectReset = () => {
    return dispatch => {
        dispatch({
            type: AdminCourseActionTypes.ADMIN_ADD_NEW_SUBJECT_RESET,
            payload: {}
        })
    }
}
export const postAdminCourseInfo = (data) => {
    return dispatch => {
        dispatch({
            type: AdminCourseActionTypes.ADMIN_COURSE_INFO_CREATING,
            payload: [],
        })
        AdminCourseRequest.post(AdminCourseRequest.AdminCourseEndpoint.postAdminCourse,
            data,
            (success) => {
                dispatch({
                    type: AdminCourseActionTypes.ADMIN_COURSE_INFO_CREATED,
                    payload: success.data.data
                })
                // dispatch(showSuccessPopup("Course Info Created!"))
            },
            error => {
                dispatch(setCommonError(error.message))
                dispatch({
                    type: AdminCourseActionTypes.ADMIN_COURSE_INFO_CREATE_ERROR,
                    payload: []
                })
            });
    }
}

export const getSingleCourseInfoData = (_id) => {
    return dispatch => {

        dispatch({
            type: AdminCourseActionTypes.GET_ADMIN_COURSE_INFO_DATA_LOADING,
            payload: [],
        })

        AdminCourseRequest.get(AdminCourseRequest.AdminCourseEndpoint.getSingleCourseInfoData.replace("__ID__", _id), (success) => {

            dispatch({
                type: AdminCourseActionTypes.GET_ADMIN_COURSE_INFO_DATA_LOADED,
                payload: success.data.data
            })

        },
            error => {
                dispatch(setCommonError(error.message))
                dispatch({
                    type: AdminCourseActionTypes.GET_ADMIN_COURSE_INFO_DATA_ERROR,
                    payload: []
                })
            });

    }
}


export const editCourseInfoData = (_id, data) => {
    return dispatch => {

        dispatch({
            type: AdminCourseActionTypes.EDIT_COURSE_INFO_LOADING,
            payload: [],
        })

        AdminCourseRequest.patch(AdminCourseRequest.AdminCourseEndpoint.editCourseInfoData.replace("__ID__", _id),
            data, (success) => {

                dispatch({
                    type: AdminCourseActionTypes.EDIT_COURSE_INFO,
                    payload: success.data
                })

            },
            error => {
                dispatch(setCommonError(error.message))
                dispatch({
                    type: AdminCourseActionTypes.EDIT_COURSE_INFO_ERROR,
                    payload: []
                })
            });

    }
}
export const resetEditCourseInfoData = () => {
    return dispatch => {
        dispatch({
            type: AdminCourseActionTypes.EDIT_COURSE_INFO_RESET,
            payload: {}
        })
    }
}
export const resetpostCourseInfoData = () => {
    return dispatch => {
        dispatch({
            type: AdminCourseActionTypes.ADMIN_COURSE_INFO_CREATE_RESET,
            payload: {}
        })
    }
}
export const AdminCourseInfoReset = () => {
    return dispatch => {
        dispatch({
            type: AdminCourseActionTypes.ADMIN_COURSE_INFO_CREATE_RESET,
            payload: {}
        })
    }
}

export const AdminCourseReset = () => {
    return dispatch => {
        dispatch({
            type: AdminCourseActionTypes.ADMIN_COURSE_RESET_MAIN,
            payload: {}
        })
    }
}

export const deleteCourse = (_id) => {
    return (dispatch) => {
        dispatch({
            type: AdminCourseActionTypes.DELETE_COURSE_LOADING,
            payload: {}
        })
        AdminCourseRequest.delete(
            AdminCourseRequest.AdminCourseEndpoint.deleteCourse.replace("__ID__", _id),
            (success) => {
                if (success.data.data.message === "Deleted the record") {
                    dispatch({
                        type: AdminCourseActionTypes.DELETE_COURSE_SUCCESS,
                        payload: _id,
                    });
                    dispatch(showSuccessPopup("Deleted Successfully."))
                } else {
                    dispatch(setCommonError("There was some issue."));
                }

            },
            (error) => {
                dispatch(setCommonError(error.message));
            }
        );
    };
};

export const TaxanomyReset = () => {
    return dispatch => {
        dispatch({
            type: AdminCourseActionTypes.EDIT_TAXANOMY_RESET,
            payload: []
        })
    }
}


export const PostTaxanomy = (data) => {
    return dispatch => {
        dispatch({
            type: AdminCourseActionTypes.EDIT_TAXANOMY_LOADING,
        })
        AdminCourseRequest.post(
            AdminCourseRequest.AdminCourseEndpoint.postTaxanomy,
            data,
            (success) => {
                dispatch({
                    type: AdminCourseActionTypes.EDIT_TAXANOMY_SUCCESS,
                    payload: success.data.data
                })
            },
            (error) => {
                dispatch(setCommonError(error.message));
            }
        );
    }
}

export const getCourseTaxanomy = (courseInfoId) => {
    return dispatch => {

        dispatch({
            type: AdminCourseActionTypes.GET_TAXANOMY_LOADING,
            payload: [],
        })

        AdminCourseRequest.get(AdminCourseRequest.AdminCourseEndpoint.getCourseTaxanomy.replace("__ID__", courseInfoId), (success) => {

            dispatch({
                type: AdminCourseActionTypes.GET_TAXANOMY_SUCCESS,
                payload: success.data.data
            })

        },
            error => {
                dispatch(setCommonError(error.message))
            });

    }
}
export const postImagePopUpData = (data) => {
    return dispatch => {

        dispatch({
            type: AdminCourseActionTypes.IMAGE_POPUP_SHOW,
            payload: data,
        })
    }
}
export const resetImagePopUpData = () => {
    return dispatch => {

        dispatch({
            type: AdminCourseActionTypes.IMAGE_POPUP_RESET,
            payload: [],
        })
    }
}

export const postAdminCourseContentData = (courseInfoId, data) => {
    return dispatch => {

        dispatch({
            type: AdminCourseActionTypes.ADMIN_COURSE_CONTENT_CREATING,
            payload: [],
        })

        AdminCourseRequest.patch(AdminCourseRequest.AdminCourseEndpoint.patchCourseContent.replace("__ID__", courseInfoId), data, (success) => {

            dispatch({
                type: AdminCourseActionTypes.ADMIN_COURSE_CONTENT_CREATED,
                payload: success.data.data
            })

        },
            error => {
                dispatch(setCommonError(error.message))
                dispatch({
                    type: AdminCourseActionTypes.ADMIN_COURSE_CONTENT_CREATE_ERROR,
                    payload: []
                })
            });

    }
}
export const getAdminCourseContentData = (courseInfoId) => {
    return dispatch => {

        dispatch({
            type: AdminCourseActionTypes.ADMIN_GET_COURSE_CONTENT_LOADING,
            payload: [],
        })

        AdminCourseRequest.get(AdminCourseRequest.AdminCourseEndpoint.getCourseContent.replace("__ID__", courseInfoId), (success) => {

            dispatch({
                type: AdminCourseActionTypes.ADMIN_GET_COURSE_CONTENT_LOADED,
                payload: success.data.data
            })

        },
            error => {
                dispatch(setCommonError(error.message))
                dispatch({
                    type: AdminCourseActionTypes.ADMIN_GET_COURSE_CONTENT_ERROR,
                    payload: []
                })
            });
    }
}


export const postAssignedUsers = (courseId, data) => {
    return (dispatch) => {
        dispatch({
            type: AdminCourseActionTypes.POST_ASSIGNED_DATA_LOADING,
            payload: {}
        })
        AdminCourseRequest.patch(
            AdminCourseRequest.AdminCourseEndpoint.postAssignedData.replace("__ID__", courseId),
            data,
            (success) => {
                dispatch({
                    type: AdminCourseActionTypes.POST_ASSIGNED_DATA,
                    payload: success.data
                })
                dispatch(showSuccessPopup("Assigned Successfully.!!"))
            },
            (error) => {
                dispatch(setCommonError(error.message));
            }
        );
    }

}
export const resetPostAssignedData = () => {
    return (dispatch) => {
        dispatch({
            type: AdminCourseActionTypes.POST_ASSIGNED_DATA_RESET,
            payload: []
        })
    }
}

export const resetContentData = () => {
    return dispatch => {

        dispatch({
            type: AdminCourseActionTypes.ADMIN_COURSE_CONTENT_CREATE_RESET,
            payload: [],
        })
        dispatch({
            type: AdminCourseActionTypes.ADMIN_GET_COURSE_CONTENT_RESET,
            payload: [],
        })
    }
}


