import TeacherSelectRequest from "./TeacherSelectRequest";
import * as TeacherActionTypes from "./actionTypes";
import { setCommonError } from "../commonerror";

export const finAllTeacherCourses = (instituteId, userId, kind) => {
    return dispatch => {
        dispatch({
            type: TeacherActionTypes.TCH_COURSE_LOADING,
            payload: {
                instituteId,
                userId
            }
        })

        TeacherSelectRequest.get(
            TeacherSelectRequest.teacherSelectEndpoint.classroomassigned.replace("__INSTITITEID__", instituteId).replace("__USERID__", userId).replace("__KIND__", kind),
            (success) => {
                dispatch({
                    type: TeacherActionTypes.TCH_COURSE_LOADED,
                    payload: success.data
                })
            },
            (error) => {
                setCommonError(error.message)
                dispatch({
                    type: TeacherActionTypes.TCH_COURSE_LOADING_ERROR,
                    payload: {}
                })
            }
        )
    }
}



export const findAllInstituteCourses = (instituteId) => {
    return dispatch => {
        dispatch({
            type: TeacherActionTypes.TCH_COURSE_LOADING,
            payload: {
                instituteId
            }
        })

        TeacherSelectRequest.get(
            TeacherSelectRequest.teacherSelectEndpoint.instituteCourse.replace("__INSTITITEID__", instituteId),
            (success) => {
                dispatch({
                    type: TeacherActionTypes.TCH_COURSE_LOADED,
                    payload: success.data.course,
                })
            },
            (error) => {
                setCommonError(error.message)
                dispatch({
                    type: TeacherActionTypes.TCH_COURSE_LOADING_ERROR,
                    payload: {}
                })
            }
        )
    }
}




export const setSelectedCourse = (courseId) => {
    return dispatch => {
        dispatch({
            type: TeacherActionTypes.TCH_SET_SELECTED_COURSE,
            payload: courseId
        })
    }
}


export const setClassroom = (courseId) => {
    return dispatch => {
        dispatch({
            type: TeacherActionTypes.TCH_SET_CLASSROOM,
            payload: courseId
        })
    }
}

export const resetTeacherCourse = () => {
    return dispatch => {
        dispatch({
            type: TeacherActionTypes.TCH_COURSE_RESET,
            payload: {}
        })
    }
}
