import { setCommonError } from "../commonerror";
import { StudentAttendanceActionTypes } from "./actionType";
import StudentAttendanceRequest from "./StudentAttendanceRequest";

export const getStudentAttendanceList = (insId, userId, classroom, date) => {
  return dispatch => {
    dispatch({
      type: StudentAttendanceActionTypes.GET_STUDENT_ATTENDANCE_LIST_LOADING,
      loading: true,
    })
    StudentAttendanceRequest.get(
      StudentAttendanceRequest.StudentAttendanceEndpoint.getStudentAttendanceList.replace("__INSID__", insId).replace("__USERID__", userId).replace("__CLASSROOMID__", classroom).replace("__DATE__", date),
      (success) => {
        dispatch({
          type: StudentAttendanceActionTypes.GET_STUDENT_ATTENDANCE_LIST,
          payload: success.data.data
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  }
}


export const resetStudentAttendanceList = () => {
  return dispatch => {
    dispatch({
      type: StudentAttendanceActionTypes.GET_STUDENT_ATTENDANCE_LIST_RESET,
      payload: []
    })
  }
}

export const sendLeaveRequest = (data) => {
  return dispatch => {
    dispatch({
      type: StudentAttendanceActionTypes.SEND_LEAVE_REQUEST_LOADING,
      loading: true
    })
    StudentAttendanceRequest.post(
      StudentAttendanceRequest.StudentAttendanceEndpoint.sendLeaveRequest,
      data,
      (success) => {
        dispatch({
          type: StudentAttendanceActionTypes.SEND_LEAVE_REQUEST,
          payload: success.data
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}

export const resetSendLeaveRequest = () => {
  return dispatch => {
    dispatch({
      type: StudentAttendanceActionTypes.SEND_LEAVE_REQUEST_RESET,
      payload: []
    })
  }
}


export const getStudentLeaveRequestList = (insId, userId, classroom, date) => {
  return dispatch => {
    dispatch({
      type: StudentAttendanceActionTypes.GET_LEAVE_REQUEST_LIST_LOADING,
      loading: true,
    })
    StudentAttendanceRequest.get(
      StudentAttendanceRequest.StudentAttendanceEndpoint.getLeaveRequestList.replace("__INSID__", insId).replace("__USERID__", userId).replace("__CLASSROOMID__", classroom).replace("__DATE__", date),
      (success) => {
        dispatch({
          type: StudentAttendanceActionTypes.GET_LEAVE_REQUEST_LIST,
          payload: success.data.data
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  }
}
export const sortStudentLeaveRequestList = (insId, userId, classroom, date, query, value) => {
  return (dispatch) => {
    dispatch({
      type: StudentAttendanceActionTypes.GET_LEAVE_REQUEST_LIST_LOADING,
    })
    StudentAttendanceRequest.get(
      StudentAttendanceRequest.StudentAttendanceEndpoint.sortStudentLeaveRequestList.replace("__INSID__", insId).replace("__USERID__", userId).replace("__CLASSROOMID__", classroom).replace("__DATE__", date).replace("__QUERY__", query).replace("__VALUE__", value),
      (success) => {
        dispatch({
          type: StudentAttendanceActionTypes.SORT_STUDENT_LEAVE_REQUEST_LIST,
          payload: success.data.data
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  }
}

export const resetStudentLeaveRequestList = () => {
  return dispatch => {
    dispatch({
      type: StudentAttendanceActionTypes.GET_STUDENT_ATTENDANCE_LIST_RESET,
      payload: []
    })
  }
}

export const cancelLeaveRequest = (_id, data) => {
  return (dispatch) => {
    dispatch({
      type: StudentAttendanceActionTypes.CANCEL_LEAVE_REQUEST_LOADING,
      loading: true
    })
    StudentAttendanceRequest.patch(StudentAttendanceRequest.StudentAttendanceEndpoint.cancelLeaveRequest.replace("__ID__", _id),
      data,
      (success) => {
        dispatch({
          type: StudentAttendanceActionTypes.CANCEL_LEAVE_REQUEST,
          payload: success.data.data
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
      })
  }
}

export const resetcancellLeaveRequest = () => {
  return dispatch => {
    dispatch({
      type: StudentAttendanceActionTypes.CANCEL_LEAVE_REQUEST_RESET,
      payload: []
    })
  }
}