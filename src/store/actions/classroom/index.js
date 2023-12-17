import { CLASSROOMTYPE } from "./actionType";
import ClassroomRequest from "./ClassroomRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";
import { DynamicClassroomHeader, DynamicCourseHeader } from "../../../Common/UserElement";


export const postClassroomData = (data) => {
    return dispatch => {

        ClassroomRequest.post(ClassroomRequest.classroomEndpoint.postclassroom, data, (success) => {

            dispatch({
                type: CLASSROOMTYPE.CLASSROOM_CREATE,
                payload: success.data.arrResponse
            })
            if (success.data.arrResponse === undefined) {
                dispatch(setCommonError(`${DynamicClassroomHeader()} Already Created.`));
            } else {
                dispatch(showSuccessPopup(`${DynamicClassroomHeader()} Created`))
            }
        },
            error => {
                dispatch(setCommonError(error.message))

            }
        );
    }
}

export const getClassroomData = (id) => {
    return dispatch => {

        ClassroomRequest.get(ClassroomRequest.classroomEndpoint.getclassroomCourse.replace("__ID__", id), (success) => {

            dispatch({
                type: CLASSROOMTYPE.CLASSROOM_READ,
                payload: success.data.data
            })

        },
            error => {
                dispatch(setCommonError(error.message))
            }
        );
    }
}

export const getClassroomDataInviteFaculty = (id) => {
    return dispatch => {

        ClassroomRequest.get(ClassroomRequest.classroomEndpoint.getclassroomCourse.replace("__ID__", id), (success) => {

            dispatch({
                type: CLASSROOMTYPE.CLASSROOM_GET_INVITE_FACULTY,
                payload: success.data.data
            })

        },
            error => {
                dispatch(setCommonError(error.message))
            }
        );
    }
}

export const resetClassroomsData = () => {
    return dispatch => {
        dispatch({
            type: CLASSROOMTYPE.RESET_CLASSROOM_DATA
        })
    }
}

export const ClearClassroomData = () => {
    return dispatch => {
        dispatch({
            type: CLASSROOMTYPE.CLASSROOM_READ,
            payload: []
        })
    }
}


export const getCourseInfoData = (id) => {
    return dispatch => {

        ClassroomRequest.get(ClassroomRequest.classroomEndpoint.getCourseInfoData.replace("__ID__", id), (success) => {

            dispatch({
                type: CLASSROOMTYPE.COURSE_INFO_DATA,
                payload: success.data
            })
        },
            error => {
                dispatch(setCommonError(error.message))

            }
        );
    }
}
export const GetCourseDataViaClassroom = (id) => {
    return dispatch => {

        ClassroomRequest.get(ClassroomRequest.classroomEndpoint.getCourseDataViaClassroom.replace("__ID__", id), (success) => {

            dispatch({
                type: CLASSROOMTYPE.COURSE_INFO_DATA,
                payload: success.data.courseInfo
            })
        },
            error => {
                dispatch(setCommonError(error.message))

            }
        );
    }
}

export const deleteClassroomData = (_id) => {
    return dispatch => {


        ClassroomRequest.patch(ClassroomRequest.classroomEndpoint.deleteclassroom.replace("__ID__", _id), {},
            (success) => {

                dispatch({
                    type: CLASSROOMTYPE.CLASSROOM_DELETE,
                    payload: success.data
                })
                dispatch(showSuccessPopup("Classroom deleted, All the assignments and online classes related to this class will be deleted."));
            },
            error => {
                dispatch(setCommonError(error.message))

            }
        );
    }
}

export const updateClassroomData = (_id, data) => {
    return dispatch => {

        ClassroomRequest.patch(ClassroomRequest.classroomEndpoint.updateclassroom.replace("__ID__", _id), data, (success) => {

            dispatch({
                type: CLASSROOMTYPE.CLASSROOM_UPDATE,
                payload: success.data
            })
            dispatch(showSuccessPopup(`${DynamicClassroomHeader()} updated.`));

        },
            error => {
                dispatch(setCommonError(error.message))

            }
        );
    }
}

export const updateCoursenameData = (_id, data) => {
    return dispatch => {

        ClassroomRequest.patch(ClassroomRequest.classroomEndpoint.updatecourse.replace("__ID__", _id), data, (success) => {

            dispatch({
                type: CLASSROOMTYPE.COURSE_NAME_UPDATE,
                payload: success.data
            })
            dispatch(showSuccessPopup(`${DynamicCourseHeader()} updated.`));

        },
            error => {
                dispatch(setCommonError(error.message))

            }
        );
    }
}


export const selectClassroomToUpdate = _id => {
    return dispatch => {
        dispatch({
            type: CLASSROOMTYPE.CLASSROOM_UPDATE_SELECTION,
            payload: _id
        })
    }
}