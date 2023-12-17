import { EDITSTUDENTLIST } from "./actionType";
import EditStudentListRequest from "./EditStudentListRequest";
import { setCommonError } from "../commonerror";

export const postStudentData = (data) => {
    return dispatch => {

        EditStudentListRequest.post(EditStudentListRequest.editStudentListEndpoint.postEditStudentList, data, (success) => {

            dispatch({
                type: EDITSTUDENTLIST.EDIT_STUDENT_LIST_CREATE,
                payload: success.data
            })
            // dispatch(showSuccessPopup("Successfull!!"));
        },
            error => {
                dispatch(setCommonError(error.message))

            }
        );
    }
}

export const getStudentData = (_id, courseid) => {
    return dispatch => {

        EditStudentListRequest.get(EditStudentListRequest.editStudentListEndpoint.getEditStudentListInstitute.replace("__ID__", _id).replace("__COURSEID__", courseid), (success) => {

            dispatch({
                type: EDITSTUDENTLIST.EDIT_STUDENT_LIST_READ,
                payload: success.data.classassignedcheck
            })

        },
            error => {
                dispatch(setCommonError(error.message))

            }
        );
    }
}
export const getStudentDataReset = () => {
    return dispatch => {
        dispatch({
            type: EDITSTUDENTLIST.EDIT_STUDENT_LIST_READ_RESET,
            payload: {}
        })
    }
}

export const getStudentDataCount = (_id, courseid) => {
    return dispatch => {

        EditStudentListRequest.get(EditStudentListRequest.editStudentListEndpoint.getEditStudentListInstitute.replace("__ID__", _id).replace("__COURSEID__", courseid), (success) => {

            dispatch({
                type: EDITSTUDENTLIST.EDIT_STUDENT_LIST_COUNT,
                payload: success.data.classassignedcheck
            })

        },
            error => {
                dispatch(setCommonError(error.message))

            }
        );
    }
}



export const getCourseListtData = (_id) => {
    return dispatch => {

        EditStudentListRequest.get(EditStudentListRequest.editStudentListEndpoint.getCourseInstitute.replace("__ID__", _id), (success) => {

            dispatch({
                type: EDITSTUDENTLIST.EDIT_COURSE_LIST_READ,
                payload: success.data.course
            })

        },
            error => {
                dispatch(setCommonError(error.message))

            }
        );
    }
}

export const getStudentUsernameData = (username) => {
    return dispatch => {

        EditStudentListRequest.get(EditStudentListRequest.editStudentListEndpoint.getEditStudentUsernameList.replace("__VALUE__", username), (success) => {

            dispatch({
                type: EDITSTUDENTLIST.EDIT_STUDENT_LIST_USERNAME_READ,
                payload: success.data.data
            })
            //dispatch(showSuccessPopup("Remark submitted!!"));
        },
            error => {
                dispatch(setCommonError(error.message))

            }
        );
    }
}



export const deleteStudentData = (_id) => {
    return dispatch => {

        EditStudentListRequest.patch(EditStudentListRequest.editStudentListEndpoint.deleteEditStudentList,{
            id:_id
        } ,(success) => {

            dispatch({
                type: EDITSTUDENTLIST.EDIT_STUDENT_LIST_DELETE,
                payload: _id
            })
            //dispatch(showSuccessPopup("Deleted Successfully!!"));
        },
            error => {
                dispatch(setCommonError(error.message))

            }
        );
    }
}

export const updateStudentData = (user, _id, data) => {
    return dispatch => {

        EditStudentListRequest.patch(EditStudentListRequest.editStudentListEndpoint.updateEditStudentList.replace("__ID__", _id), data, (success) => {

            dispatch({
                type: EDITSTUDENTLIST.EDIT_STUDENT_LIST_UPDATE,
                payload: user
            })
        },
            error => {
                dispatch(setCommonError(error.message))

            }
        );
    }
}

export const StudentSelectionData = (id) => {
    return dispatch => {
        dispatch({
            type: EDITSTUDENTLIST.EDIT_STUDENT_LIST_UPDATE_SELECTION,
            payload: id
        })
    }
}
