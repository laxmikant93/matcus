import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";
import { TeacherAttendanceActionTypes } from "./actionTypes";
import TeacherAttendanceRequest from "./TeacherAttendanceRequest";

export const postAttendance = (data) => {
  return dispatch => {
    dispatch({
      type: TeacherAttendanceActionTypes.POST_TEACHER_ATTENDANCE_LOADING,
      loading: true,
    })
    TeacherAttendanceRequest.post(
      TeacherAttendanceRequest.TeacherAttendanceEndpoint.postAttendance,
      data,
      (success) => {
        dispatch({
          type: TeacherAttendanceActionTypes.POST_TEACHER_ATTENDANCE_LOADED,
          payload: success.data
        })
        dispatch(showSuccessPopup("Attendance Marked Successfully."))
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  }
}

export const resetPostAttendance = () => {
  return dispatch => {
    dispatch({
      type: TeacherAttendanceActionTypes.POST_TEACHER_ATTENDANCE_RESET,
      payload: []
    })
  }
}

export const getTeacherStudentAttendanceList = (state, insId, userId, classroom, subject, date,) => {
  return dispatch => {
    dispatch({
      type: TeacherAttendanceActionTypes.GET_TEACHER_STUDENT_ATTENDANCE_LIST_LOADING,
      loading: true,
    })
    if (state === "adminClassroom") {
      TeacherAttendanceRequest.get(
        TeacherAttendanceRequest.TeacherAttendanceEndpoint.getStudentAttendanceForAdminClassroom.replace("__INSID__", insId).replace("__CLASSROOMID__", classroom).replace("__DATE__", date),
        (success) => {
          dispatch({
            type: TeacherAttendanceActionTypes.GET_TEACHER_STUDENT_ATTENDANCE_LIST,
            payload: success.data.data
          })
        },
        (error) => {
          dispatch(setCommonError(error.message));
        }
      );
    } else if (state === "teacherClassroom") {
      TeacherAttendanceRequest.get(
        TeacherAttendanceRequest.TeacherAttendanceEndpoint.getStudentAttendanceForTeacherClassroom.replace("__INSID__", insId).replace("__USERID__", userId).replace("__CLASSROOMID__", classroom).replace("__DATE__", date),
        (success) => {
          dispatch({
            type: TeacherAttendanceActionTypes.GET_TEACHER_STUDENT_ATTENDANCE_LIST,
            payload: success.data.data
          })
        },
        (error) => {
          dispatch(setCommonError(error.message));
        }
      );
    } else if (state === "adminClassroomSubject") {
      TeacherAttendanceRequest.get(
        TeacherAttendanceRequest.TeacherAttendanceEndpoint.getStudentAttendanceForAdmin.replace("__INSID__", insId).replace("__CLASSROOMID__", classroom).replace("__SUBJECTID__", subject).replace("__DATE__", date),
        (success) => {
          dispatch({
            type: TeacherAttendanceActionTypes.GET_TEACHER_STUDENT_ATTENDANCE_LIST,
            payload: success.data.data
          })
        },
        (error) => {
          dispatch(setCommonError(error.message));
        }
      );
    } else if (state === "teacherClassroomSubject") {
      TeacherAttendanceRequest.get(
        TeacherAttendanceRequest.TeacherAttendanceEndpoint.getStudentAttendanceForTeacher.replace("__INSID__", insId).replace("__USERID__", userId).replace("__CLASSROOMID__", classroom).replace("__SUBJECTID__", subject).replace("__DATE__", date),
        (success) => {
          dispatch({
            type: TeacherAttendanceActionTypes.GET_TEACHER_STUDENT_ATTENDANCE_LIST,
            payload: success.data.data
          })
        },
        (error) => {
          dispatch(setCommonError(error.message));
        }
      );
    }

  }
}


export const resetTeacherStudentAttendanceList = () => {
  return dispatch => {
    dispatch({
      type: TeacherAttendanceActionTypes.GET_TEACHER_STUDENT_ATTENDANCE_LIST_RESET,
      payload: []
    })
  }
}

export const setEditTeacherAttendanceList = (data) => {
  return dispatch => {
    dispatch({
      type: TeacherAttendanceActionTypes.SET_EDIT_ATTENDANCE_STATIC_DATA,
      payload: data
    })
  }
}

export const EditAttendanceList = (data, _id) => {
  return dispatch => {
    TeacherAttendanceRequest.patch(TeacherAttendanceRequest.TeacherAttendanceEndpoint.editAttendance.replace("__ID__", _id),
      data,
      (success) => {
   
        success.data && success.data.data._id && dispatch({
          type: TeacherAttendanceActionTypes.EDIT_TEACHER_ATTENDANCE_LOADED,
          payload: success.data.data
        })
      }, (error) => {
        dispatch(setCommonError(error.message));
      })
  }
}
export const getSingleAttendanceInfo = (insId, classroom, subjectId, date) => {
  return dispatch => {
    dispatch({
      type: TeacherAttendanceActionTypes.GET_SINGLE_ATTENDANCE_INFO_LOADING,
      loading: true,
    })
    TeacherAttendanceRequest.get(
      TeacherAttendanceRequest.TeacherAttendanceEndpoint.getSingleAttendanceInfo.replace("__INSID__", insId).replace("__CLASSROOMID__", classroom).replace("__SUBJECTID__", subjectId).replace("__DATE__", date),
      (success) => {
        dispatch({
          type: TeacherAttendanceActionTypes.GET_SINGLE_ATTENDANCE_INFO_LOADED,
          payload: success.data
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  }
}

export const searchStudentAttendanceList = (state, insId, userId, classroom, subject, date, search) => {
  return dispatch => {
    dispatch({
      type: TeacherAttendanceActionTypes.GET_TEACHER_STUDENT_ATTENDANCE_LIST_LOADING,
      loading: true
    })
    if (state === "adminClassroom") {
      TeacherAttendanceRequest.get(
        TeacherAttendanceRequest.TeacherAttendanceEndpoint.searchStudentAdminClassroom.replace("__INSID__", insId).replace("__CLASSROOMID__", classroom).replace("__DATE__", date).replace("__SEARCH__", search),
        (success) => {
          dispatch({
            type: TeacherAttendanceActionTypes.SEARCH_STUDENT_ATTENDANCE,
            payload: success.data.data
          })
        },
        (error) => {
          dispatch(setCommonError(error.message));
        }
      );
    } else if (state === "adminClassroomSubject") {
      TeacherAttendanceRequest.get(
        TeacherAttendanceRequest.TeacherAttendanceEndpoint.searchStudentAdminClassroomSubject.replace("__INSID__", insId).replace("__CLASSROOMID__", classroom).replace("__SUBJECTID__", subject).replace("__DATE__", date).replace("__SEARCH__", search),
        (success) => {
          dispatch({
            type: TeacherAttendanceActionTypes.SEARCH_STUDENT_ATTENDANCE,
            payload: success.data.data
          })
        },
        (error) => {
          dispatch(setCommonError(error.message));
        }
      );
    } else if (state === "teacherClassroom") {
      TeacherAttendanceRequest.get(
        TeacherAttendanceRequest.TeacherAttendanceEndpoint.searchStudentTeacherClassroom.replace("__INSID__", insId).replace("__USERID__", userId).replace("__CLASSROOMID__", classroom).replace("__DATE__", date).replace("__SEARCH__", search),
        (success) => {
          dispatch({
            type: TeacherAttendanceActionTypes.SEARCH_STUDENT_ATTENDANCE,
            payload: success.data.data
          })
        },
        (error) => {
          dispatch(setCommonError(error.message));
        }
      );
    } else if (state === "teacherClassroomSubject") {
      TeacherAttendanceRequest.get(
        TeacherAttendanceRequest.TeacherAttendanceEndpoint.searchStudentTeacherClassroomSubject.replace("__INSID__", insId).replace("__USERID__", userId).replace("__CLASSROOMID__", classroom).replace("__SUBJECTID__", subject).replace("__DATE__", date).replace("__SEARCH__", search),
        (success) => {
          dispatch({
            type: TeacherAttendanceActionTypes.SEARCH_STUDENT_ATTENDANCE,
            payload: success.data.data
          })
        },
        (error) => {
          dispatch(setCommonError(error.message));
        }
      );
    }

  }
}

export const getSingleStudentPeriodData = (course, ins, date, stdId, classroom) => {
  return dispatch => {
    dispatch({
      type: TeacherAttendanceActionTypes.GET_SINGLE_STUDENT_PERIOD_DATA_LOADING,
      payload: []
    });

    TeacherAttendanceRequest.get(TeacherAttendanceRequest.TeacherAttendanceEndpoint.getSinglePeriodDataOfStudent.replace("_COURSE_", course).replace("_INS_", ins).replace("_DATE_", date).replace("_USER_", stdId).replace("_CLASSROOM_", classroom),
      (success) => {
        dispatch({
          type: TeacherAttendanceActionTypes.GET_SINGLE_STUDENT_PERIOD_DATA_LOADED,
          payload: success.data.data
        });
      }, (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}

export const deleteAttendance = (Id) => {
  return (dispatch) => {
    TeacherAttendanceRequest.delete(
      TeacherAttendanceRequest.TeacherAttendanceEndpoint.deleteAttendance.replace("__ID__", Id),
      (success) => {
        dispatch({
          type: TeacherAttendanceActionTypes.DELETE_ATTENDANCE,
          payload: Id,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const resetSingleAttendanceInfo = () => {
  return dispatch => {
    dispatch({
      type: TeacherAttendanceActionTypes.GET_SINGLE_ATTENDANCE_INFO_RESET,
      payload: []
    })
  }
}

export const getTeacherLeaveRequestList = (insId, classroom, date) => {
  return dispatch => {
    dispatch({
      type: TeacherAttendanceActionTypes.GET_TEACHER_LEAVE_REQUESTS_LOADING,
      loading: true,
    })
    TeacherAttendanceRequest.get(
      TeacherAttendanceRequest.TeacherAttendanceEndpoint.getTeacherLeaveRequestList.replace("__INSID__", insId).replace("__CLASSROOMID__", classroom).replace("__DATE__", date),
      (success) => {
        dispatch({
          type: TeacherAttendanceActionTypes.GET_TEACHER_LEAVE_REQUESTS,
          payload: success.data.data
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  }
}

export const searchStudentLeaveRequestList = (insId, classroom, date, query, value) => {
  return dispatch => {
    dispatch({
      type: TeacherAttendanceActionTypes.GET_TEACHER_LEAVE_REQUESTS_LOADING,
      loading: true
    })
    TeacherAttendanceRequest.get(
      TeacherAttendanceRequest.TeacherAttendanceEndpoint.searchStudentLeaveRequest.replace("__INSID__", insId).replace("__CLASSROOMID__", classroom).replace("__DATE__", date).replace("__QUERY__", query).replace("__VALUE__", value),
      (success) => {
        dispatch({
          type: TeacherAttendanceActionTypes.SEARCH_STUDENT_REQUEST_LIST,
          payload: success.data.data
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  }
}

export const acceptLeaveRequest = (_id, data) => {
  return dispatch => {
    dispatch({
      type: TeacherAttendanceActionTypes.ACCEPT_LEAVE_LEQUEST_LOADING,
      loading: true
    })
    TeacherAttendanceRequest.patch(TeacherAttendanceRequest.TeacherAttendanceEndpoint.acceptLeaveRequest.replace("__ID__", _id),
      data,
      (success) => {
        dispatch({
          type: TeacherAttendanceActionTypes.ACCEPT_LEAVE_LEQUEST,
          payload: success.data.data
        })
      }, (error) => {
        dispatch(setCommonError(error.message));
      })
  }
}
export const resetAcceptRequest = () => {
  return dispatch => {
    dispatch({
      type: TeacherAttendanceActionTypes.ACCEPT_LEAVE_LEQUEST_RESET,
      payload: []
    })
  }
}
export const getSingleLeaveRequest = (_id) => {
  return dispatch => {
    dispatch({
      type: TeacherAttendanceActionTypes.GET_SINGLE_LEAVE_REQUEST_LOADING,
      payload: []
    });
    TeacherAttendanceRequest.get(TeacherAttendanceRequest.TeacherAttendanceEndpoint.getSingleLeaveRequest.replace("__ID__", _id),
      (success) => {
        dispatch({
          type: TeacherAttendanceActionTypes.GET_SINGLE_LEAVE_REQUEST,
          payload: success.data
        });
      }, (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}
export const resetSingleRequest = () => {
  return dispatch => {
    dispatch({
      type: TeacherAttendanceActionTypes.GET_SINGLE_LEAVE_REQUEST_RESET,
      payload: []
    })
  }
}