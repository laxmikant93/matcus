import { StudentOnlineExamActionTypes } from "./actionTypes";
import stuedntOnlineExamRequest from "./stuedntOnlineExamRequest";
import { setCommonError } from "../commonerror";


export const getOnlineExamList = (insId, userId) => {
    return dispatch => {

        dispatch({
            type: StudentOnlineExamActionTypes.SOE_LIST_LOADING,
            payload: [],

        })

        stuedntOnlineExamRequest.get(stuedntOnlineExamRequest.StudentOnlineExamEndpoint.getStudentOnlineExam.replace("__ID__", insId).replace("__UID__", userId), (success) => {

            dispatch({
                type: StudentOnlineExamActionTypes.SOE_LIST_LOADED,
                payload: success.data.examList ? success.data.examList.reverse() : [],

            })
        },
            error => {
                dispatch(setCommonError(error.message))

                dispatch({
                    type: StudentOnlineExamActionTypes.SOE_LIST_ERROR,
                })

            });

    }
}

export const getCourseId = (userID, insId) => {

    return dispatch => {

        stuedntOnlineExamRequest.get(stuedntOnlineExamRequest.StudentOnlineExamEndpoint.getCourseId.replace("__USERID__", userID).replace("__INSID__", insId), (success) => {

            dispatch({
                type: StudentOnlineExamActionTypes.SOE_COURSEID_GET,
                payload: success.data.data,

            })
        },
            error => {
                dispatch(setCommonError(error.message))

            });

    }
}
export const searchBySOE = (_id, insId, query, term) => {
    return dispatch => {

        dispatch({
            type: StudentOnlineExamActionTypes.SOE_LIST_LOADING,
            payload: [],
        })
        stuedntOnlineExamRequest.get(stuedntOnlineExamRequest.StudentOnlineExamEndpoint.sortAndSearch.replace('__STUDENTID__', _id).replace("__INSID__", insId).replace('__QUERY__', query).replace("__SEARCHTERM__", term), (success) => {

            dispatch({
                type: StudentOnlineExamActionTypes.SEARCH_BY_SOE,
                payload: success.data.examList,

            })
        },
            error => {
                dispatch(setCommonError(error.message))
            });
    }
}

export const filterByCoursesSOE = (studentId, insId, courses, classrooms) => {
    return dispatch => {

        dispatch({
            type: StudentOnlineExamActionTypes.SOE_LIST_LOADING,
            payload: [],

        })

        stuedntOnlineExamRequest.get(stuedntOnlineExamRequest.StudentOnlineExamEndpoint.courseFilterStudentTestList.replace("__STUDENTID__", studentId).replace("__INSID__", insId).replace("__COURSEARRAY__", courses).replace("__CLASSROOMARRAY__", classrooms),
            (success) => {

                dispatch({
                    type: StudentOnlineExamActionTypes.FILTERBYCOURSES_SOE,
                    payload: success.data.examList,

                })
            },
            error => {
                dispatch(setCommonError(error.message))

                dispatch({
                    type: StudentOnlineExamActionTypes.SOE_LIST_ERROR,
                })

            });

    }
}
export const getAssignTo = (studentId, instituteId, assignToId) => {
    return (dispatch) => {
        dispatch({
            type: StudentOnlineExamActionTypes.OES_GET_ASSIGN_LOADING,
            payload: [],
        });
        stuedntOnlineExamRequest.get(
            stuedntOnlineExamRequest.StudentOnlineExamEndpoint.AssignTo.replace("__STUDENTID__", studentId).replace("__INSID__", instituteId).replace("__NAME__", assignToId),
            (success) => {
                dispatch({
                    type: StudentOnlineExamActionTypes.OES_GET_ASSIGN_LOADED,
                    payload: success.data.examList2 ? success.data.examList2.reverse() : []
                });
            },
            (error) => {
                dispatch({
                    type: StudentOnlineExamActionTypes.OES_GET_ASSIGN_LOADING_ERROR,
                    payload: [],
                });
                dispatch(setCommonError(error.message));
            }
        );
    };
};