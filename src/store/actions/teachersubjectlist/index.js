import { TeacherSubjectsListActionTypes } from "./actionTypes";
import TeacherSubjectsListRequest from "./TeacherSubjectsListRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const getTeacherSubjectsList = (insId,userId,courseId) => {
    return dispatch => {

        dispatch({
            type: TeacherSubjectsListActionTypes.TEACHER_SUBJECTS_LIST_LOADING,
            payload: [],
        })

        TeacherSubjectsListRequest.get(TeacherSubjectsListRequest.TeacherSubjectsListEndpoint.getTeacherSubjectsList.replace("__INSID__", insId).replace("__USERID__",userId).replace("__COURSEID__",courseId), (success) => {

            dispatch({
                type: TeacherSubjectsListActionTypes.TEACHER_SUBJECTS_LIST_LOADED,
                payload: success.data.classroomInfo
            })

        },
            error => {
                dispatch(setCommonError(error.message))
                dispatch({
                    type: TeacherSubjectsListActionTypes.TEACHER_SUBJECTS_LIST_ERROR,
                    payload: []
                })
            });

    }
}

export const getTeacherSubjectsListRESET = () => {
    return dispatch => {

        dispatch({
            type: TeacherSubjectsListActionTypes.TEACHER_SUBJECTS_LIST_RESET,
            payload: [],
        })

    }
}
export const getTeacherClassroomSpecificData = (ID) => {
    return dispatch => {

        dispatch({
            type: TeacherSubjectsListActionTypes.TEACHER_CLASSROOM_DATA_LOADING,
            payload: [],
        })

        TeacherSubjectsListRequest.get(TeacherSubjectsListRequest.TeacherSubjectsListEndpoint.getTeacherClassroomData.replace("__ID__", ID), (success) => {

            dispatch({
                type: TeacherSubjectsListActionTypes.TEACHER_CLASSROOM_DATA_LOADED,
                payload: success.data
            })

        },
            error => {
                dispatch(setCommonError(error.message))
                dispatch({
                    type: TeacherSubjectsListActionTypes.TEACHER_CLASSROOM_DATA_ERROR,
                    payload: []
                })
            });

    }
}

export const getTeacherClassroomDataRESET = () => {
    return dispatch => {

        dispatch({
            type: TeacherSubjectsListActionTypes.TEACHER_CLASSROOM_DATA_RESET,
            payload: [],
        })

    }
}
export const getTeacherSubjectsListSortBy = (insID) => {
    return dispatch => {

        dispatch({
            type: TeacherSubjectsListActionTypes.TEACHER_SUBJECTS_LIST_SORTBY_LOADING,
            payload: [],
        })

        TeacherSubjectsListRequest.get(TeacherSubjectsListRequest.TeacherSUBJECTSListEndpoint.getTeacherSUBJECTSListSortBy.replace("__ID__", insID), (success) => {

            dispatch({
                type: TeacherSubjectsListActionTypes.TEACHER_SUBJECTS_LIST_SORTBY_LOADED,
                payload: success.data.course
            })

        },
            error => {
                dispatch(setCommonError(error.message))
                dispatch({
                    type: TeacherSubjectsListActionTypes.TEACHER_SUBJECTS_LIST_SORTBY_ERROR,
                    payload: []
                })
            });
    }
}

export const getTeacherSubjectsListSortByRESET = () => {
    return dispatch => {

        dispatch({
            type: TeacherSubjectsListActionTypes.TEACHER_SUBJECTS_LIST_SORTBY_RESET,
            payload: [],
        })

    }
}

export const getTeacherSubjectsListSearch = (insID) => {
    return dispatch => {

        dispatch({
            type: TeacherSubjectsListActionTypes.TEACHER_SUBJECTS_LIST_SEARCH_LOADING,
            payload: [],
        })

        TeacherSubjectsListRequest.get(TeacherSubjectsListRequest.TeacherSUBJECTSListEndpoint.getTeacherSUBJECTSListSearch.replace("__ID__", insID), (success) => {

            dispatch({
                type: TeacherSubjectsListActionTypes.TEACHER_SUBJECTS_LIST_SEARCH_LOADED,
                payload: success.data.course
            })

        },
            error => {
                dispatch(setCommonError(error.message))
                dispatch({
                    type: TeacherSubjectsListActionTypes.TEACHER_SUBJECTS_LIST_SEARCH_ERROR,
                    payload: []
                })
            });
    }
}

export const getTeacherSubjectsListSearchRESET = () => {
    return dispatch => {

        dispatch({
            type: TeacherSubjectsListActionTypes.TEACHER_SUBJECTS_LIST_SEARCH_RESET,
            payload: [],
        })

    }
}