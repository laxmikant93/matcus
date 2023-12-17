import { TeacherAttendanceActionTypes } from '../actions/TeacherAttendance/actionTypes'

const TEACHER_ATTENDANCE_INITIAL_STATE = {
  postAttendance: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getTeacherStudentAttendance: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  editStudentSubjectAttendance: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getSingleAttendanceInfo: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  deleteAttendance: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  teacherLeaveRequestList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  acceptLeaveRequest: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getSingleLeaveRequest: {
    data: [],
    loading: false,
    success: false,
    error: false,
  }
}

const teacherAttendance = (state = TEACHER_ATTENDANCE_INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case TeacherAttendanceActionTypes.POST_TEACHER_ATTENDANCE_LOADING: {
      return {
        ...state,
        postAttendance: {
          ...state.postAttendance,
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      }
    }
    case TeacherAttendanceActionTypes.POST_TEACHER_ATTENDANCE_LOADED: {
      return {
        ...state,
        postAttendance: {
          ...state.postAttendance,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      }
    }
    case TeacherAttendanceActionTypes.POST_TEACHER_ATTENDANCE_RESET: {
      return {
        ...state,
        postAttendance: {
          ...state.postAttendance,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      }
    }
    case TeacherAttendanceActionTypes.GET_TEACHER_STUDENT_ATTENDANCE_LIST_LOADING: {
      return {
        ...state,
        getTeacherStudentAttendance: {
          ...state.getTeacherStudentAttendance,
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      }
    }
    case TeacherAttendanceActionTypes.GET_TEACHER_STUDENT_ATTENDANCE_LIST: {
      return {
        ...state,
        getTeacherStudentAttendance: {
          ...state.getTeacherStudentAttendance,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      }
    }
    case TeacherAttendanceActionTypes.GET_TEACHER_STUDENT_ATTENDANCE_LIST_RESET: {
      return {
        ...state,
        getTeacherStudentAttendance: {
          ...state.getTeacherStudentAttendance,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      }
    }
    case TeacherAttendanceActionTypes.SET_EDIT_ATTENDANCE_STATIC_DATA: {
      return {
        ...state,
        editStudentSubjectAttendance: {
          ...state.editStudentSubjectAttendance,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      }
    }
    case TeacherAttendanceActionTypes.EDIT_TEACHER_ATTENDANCE_LOADED: {

      return {
        ...state,
        editStudentSubjectAttendance: {
          ...state.editStudentSubjectAttendance,
          data: state.editStudentSubjectAttendance.data.map((item) => {
            return item._id === payload._id ? {
              ...item,
              status: payload.status
            } : item
          })
          ,
          loading: false,
          success: true,
          error: false
        }
      }
    }
    case TeacherAttendanceActionTypes.EDIT_TEACHER_ATTENDANCE_LOADING: {
      return {
        ...state,
        editStudentSubjectAttendance: {
          ...state.editStudentSubjectAttendance,
          data: payload,
          loading: true,
          success: false,
          error: false
        }
      }
    }
    case TeacherAttendanceActionTypes.GET_SINGLE_ATTENDANCE_INFO_LOADING: {
      return {
        ...state,
        getSingleAttendanceInfo: {
          ...state.getSingleAttendanceInfo,
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      }
    }
    case TeacherAttendanceActionTypes.GET_SINGLE_ATTENDANCE_INFO_LOADED: {
      return {
        ...state,
        getSingleAttendanceInfo: {
          ...state.getSingleAttendanceInfo,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      }
    }
    case TeacherAttendanceActionTypes.GET_SINGLE_ATTENDANCE_INFO_RESET: {
      return {
        ...state,
        getSingleAttendanceInfo: {
          ...state.getSingleAttendanceInfo,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      }
    }
    case TeacherAttendanceActionTypes.SEARCH_STUDENT_ATTENDANCE: {
      return {
        ...state,
        getTeacherStudentAttendance: {
          ...state.getTeacherStudentAttendance,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      }
    }
    case TeacherAttendanceActionTypes.GET_SINGLE_STUDENT_PERIOD_DATA_LOADING: {
      return {
        ...state,
        editStudentSubjectAttendance: {
          data: payload,
          loading: true,
          success: false,
          error: false
        }
      }
    }
    case TeacherAttendanceActionTypes.GET_SINGLE_STUDENT_PERIOD_DATA_LOADED: {
      return {
        ...state,
        editStudentSubjectAttendance: {
          ...state.editStudentSubjectAttendance,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      }
    }
    case TeacherAttendanceActionTypes.GET_TEACHER_LEAVE_REQUESTS_LOADING: {
      return {
        ...state,
        teacherLeaveRequestList: {
          ...state.teacherLeaveRequestList,
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      }
    }
    case TeacherAttendanceActionTypes.GET_TEACHER_LEAVE_REQUESTS: {
      return {
        ...state,
        teacherLeaveRequestList: {
          ...state.teacherLeaveRequestList,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      }
    }
    case TeacherAttendanceActionTypes.SEARCH_STUDENT_REQUEST_LIST: {
      return {
        ...state,
        teacherLeaveRequestList: {
          ...state.teacherLeaveRequestList,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      }
    }
    case TeacherAttendanceActionTypes.GET_TEACHER_LEAVE_REQUESTS_RESET: {
      return {
        ...state,
        teacherLeaveRequestList: {
          ...state.teacherLeaveRequestList,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      }
    }
    case TeacherAttendanceActionTypes.ACCEPT_LEAVE_LEQUEST_LOADING: {
      return {
        ...state,
        acceptLeaveRequest: {
          ...state.acceptLeaveRequest,
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      }
    }
    case TeacherAttendanceActionTypes.ACCEPT_LEAVE_LEQUEST: {
      return {
        ...state,
        acceptLeaveRequest: {
          ...state.acceptLeaveRequest,
          data: payload,
          loading: false,
          success: true,
          error: false,
        },
        teacherLeaveRequestList: {
          ...state.teacherLeaveRequestList,
          data: state.teacherLeaveRequestList.data.map((content) =>
            content._id === payload._id
              ? {
                ...content,
                status: payload.status,
                rejectReason: payload.rejectReason
              }
              : content
          ),
          success: true,
        }
      };
    }
    case TeacherAttendanceActionTypes.ACCEPT_LEAVE_LEQUEST_RESET: {
      return {
        ...state,
        acceptLeaveRequest: {
          ...state.acceptLeaveRequest,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      }
    }

    case TeacherAttendanceActionTypes.GET_SINGLE_LEAVE_REQUEST_LOADING: {
      return {
        ...state,
        getSingleLeaveRequest: {
          ...state.getSingleLeaveRequest,
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      }
    }
    case TeacherAttendanceActionTypes.GET_SINGLE_LEAVE_REQUEST: {
      return {
        ...state,
        getSingleLeaveRequest: {
          ...state.getSingleLeaveRequest,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      }
    }
    case TeacherAttendanceActionTypes.GET_SINGLE_LEAVE_REQUEST_RESET: {
      return {
        ...state,
        getSingleLeaveRequest: {
          ...state.getSingleLeaveRequest,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      }
    }
    case TeacherAttendanceActionTypes.DELETE_ATTENDANCE: {
      return {
        ...state,
        deleteAttendance: {
          ...state.deleteAttendance,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      }
    }
    default:
      return state
  }
}
export default teacherAttendance;