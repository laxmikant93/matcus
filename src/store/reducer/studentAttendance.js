import { StudentAttendanceActionTypes } from '../actions/StudentAttendance/actionType';

const STUDENT_ATTENDANCE_INITIAL_STATE = {
  studentAttendanceList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  sendLeaveRequest: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  studentRequestList: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  cancelLeaveRequest: {
    data: [],
    loading: false,
    sucess: false,
    error: false
  }

}

const studentAttendance = (state = STUDENT_ATTENDANCE_INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case StudentAttendanceActionTypes.GET_STUDENT_ATTENDANCE_LIST_LOADING:
      return {
        ...state,
        studentAttendanceList: {
          ...state.studentAttendanceList,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      }
    case StudentAttendanceActionTypes.GET_STUDENT_ATTENDANCE_LIST:
      return {
        ...state,
        studentAttendanceList: {
          ...state.studentAttendanceList,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      }
    case StudentAttendanceActionTypes.SEND_LEAVE_REQUEST_LOADING:
      return {
        ...state,
        sendLeaveRequest: {
          ...state.sendLeaveRequest,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      }
    case StudentAttendanceActionTypes.SEND_LEAVE_REQUEST:
      return {
        ...state,
        sendLeaveRequest: {
          ...state.sendLeaveRequest,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      }
    case StudentAttendanceActionTypes.SEND_LEAVE_REQUEST_RESET:
      return {
        ...state,
        sendLeaveRequest: {
          ...state.sendLeaveRequest,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      }
    case StudentAttendanceActionTypes.GET_LEAVE_REQUEST_LIST_LOADING:
      return {
        ...state,
        studentRequestList: {
          ...state.studentRequestList,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      }
    case StudentAttendanceActionTypes.GET_LEAVE_REQUEST_LIST:
      return {
        ...state,
        studentRequestList: {
          ...state.studentRequestList,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      }
      case StudentAttendanceActionTypes.SORT_STUDENT_LEAVE_REQUEST_LIST:
        return {
          ...state,
          studentRequestList: {
            ...state.studentRequestList,
            data: payload,
            loading: false,
            success: true,
            error: false
          }
        }
    case StudentAttendanceActionTypes.GET_LEAVE_REQUEST_LIST_RESET:
      return {
        ...state,
        studentRequestList: {
          ...state.studentRequestList,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      }
    case StudentAttendanceActionTypes.CANCEL_LEAVE_REQUEST_LOADING:
      return {
        ...state,
        cancelLeaveRequest: {
          ...state.cancelLeaveRequest,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      }
    case StudentAttendanceActionTypes.CANCEL_LEAVE_REQUEST: {
      return {
        ...state,
        cancelLeaveRequest: {
          ...state.cancelLeaveRequest,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        studentRequestList: {
          ...state.studentRequestList,
          data: state.studentRequestList.data.map((content) =>
            content._id === payload._id ? {
              ...content,
              status: payload.status,
              isCancelled: payload.isCancelled
            } : content), success: true,
        }
      };
    }
    case StudentAttendanceActionTypes.CANCEL_LEAVE_REQUEST_RESET: {
      return {
        ...state,
        cancelLeaveRequest: {
          ...state.cancelLeaveRequest,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      }
    }
    default:
      return state
  }
}
export default studentAttendance;