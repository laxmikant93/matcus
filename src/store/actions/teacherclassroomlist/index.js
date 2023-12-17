import { TeacherClassroomsListActionTypes } from "./actionTypes";
import TeacherClassroomsListRequest from "./TeacherClassroomsListRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const getTeacherClassroomsList = (insID, ownerId) => {
    return dispatch => {

        dispatch({
            type: TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_LOADING,
            payload: [],
        })

        TeacherClassroomsListRequest.get(TeacherClassroomsListRequest.TeacherClassroomsListEndpoint.getTeacherClassroomsList.replace("__INSID__", insID).replace('__USERID__', ownerId), (success) => {

            dispatch({
                type: TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_LOADED,
                payload: success.data.courseInfo
            })

        },
            error => {
                dispatch(setCommonError(error.message))
                dispatch({
                    type: TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_ERROR,
                    payload: []
                })
            });

    }
}

export const getTeacherClassroomsListRESET = () => {
    return dispatch => {

        dispatch({
            type: TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_RESET,
            payload: [],
        })

    }
}

export const getTeacherClassroomsListSortBy = (insID) => {
    return dispatch => {

        dispatch({
            type: TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_SORTBY_LOADING,
            payload: [],
        })

        TeacherClassroomsListRequest.get(TeacherClassroomsListRequest.TeacherClassroomsListEndpoint.getTeacherClassroomsListSortBy.replace("__ID__", insID), (success) => {

            dispatch({
                type: TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_SORTBY_LOADED,
                payload: success.data.course
            })

        },
            error => {
                dispatch(setCommonError(error.message))
                dispatch({
                    type: TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_SORTBY_ERROR,
                    payload: []
                })
            });
    }
}

export const getTeacherClassroomsListSortByRESET = () => {
    return dispatch => {

        dispatch({
            type: TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_SORTBY_RESET,
            payload: [],
        })

    }
}

export const getTeacherClassroomsListSearch = (insID) => {
    return dispatch => {

        dispatch({
            type: TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_SEARCH_LOADING,
            payload: [],
        })

        TeacherClassroomsListRequest.get(TeacherClassroomsListRequest.TeacherClassroomsListEndpoint.getTeacherClassroomsListSearch.replace("__ID__", insID), (success) => {

            dispatch({
                type: TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_SEARCH_LOADED,
                payload: success.data.course
            })

        },
            error => {
                dispatch(setCommonError(error.message))
                dispatch({
                    type: TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_SEARCH_ERROR,
                    payload: []
                })
            });
    }
}

export const getTeacherClassroomsListSearchRESET = () => {
    return dispatch => {

        dispatch({
            type: TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_SEARCH_RESET,
            payload: [],
        })

    }
}