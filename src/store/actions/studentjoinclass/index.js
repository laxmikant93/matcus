import { JOIN_CLASS_TYPE } from "./actionType";
import JoinClassRequest from "./JoinClassRequest";
import { setCommonError } from "../commonerror";

export const getJoinClass = (_id, InsId) => {
  return (dispatch) => {
    dispatch({
      type: JOIN_CLASS_TYPE.JOIN_CLASS_READ_LOADING,
      loading: true
    })
    JoinClassRequest.get(
      JoinClassRequest.joinclassEndpoint.getJoinClass
        .replace("__ID__", _id)
        .replace("__INSID__", InsId),
      (success) => {
        dispatch({
          type: JOIN_CLASS_TYPE.JOIN_CLASS_READ,
          payload: success.data.studentonlineclasses_data?success.data.studentonlineclasses_data:[],
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getAssignedStudents = (institute, course, classroom) => {
  return (dispatch) => {
    dispatch({
      type: JOIN_CLASS_TYPE.ASIGNED_STUDENT_LOADING,
      loading: true
    })
    JoinClassRequest.get(
      JoinClassRequest.joinclassEndpoint.assignedStudents.replace("__INSID__", institute).replace("__COURSEID__", course).replace("__CLASSROOMID__", classroom),
      (success) => {
        dispatch({
          type: JOIN_CLASS_TYPE.ASIGNED_STUDENT_LOADED,
          payload: success.data.assignToStudent,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};






// classroom and course filter
export const courseAndClassroomFilter = (userId, InsId, Course, Classroom) => {
  return (dispatch) => {
    dispatch({
      type: JOIN_CLASS_TYPE.JOIN_CLASS_READ_LOADING,
      loading: true
    })
    JoinClassRequest.get(
      JoinClassRequest.joinclassEndpoint.student_course_Classroom
        .replace("__USERID__", userId)
        .replace("__INSID__", InsId)
        .replace("__COURSE__", Course)
        .replace("__CLASSROOM__", Classroom),
      (success) => {
        dispatch({
          type: JOIN_CLASS_TYPE.STUDENT_COURSE_AND_CLASSROOM,
          payload: success.data.studentonlineclasses_data?success.data.studentonlineclasses_data:[],
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const upcomingClass = (_id, InsId) => {
  return (dispatch) => {
    JoinClassRequest.get(
      JoinClassRequest.joinclassEndpoint.upcomingClass
        .replace("__ID__", _id)
        .replace("__INSID__", InsId),
      (success) => {
        dispatch({
          type: JOIN_CLASS_TYPE.UPCOMING_CLASS,
          payload: success.data.studentonlineclasses_data?success.data.studentonlineclasses_data:[],
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const ongoingClass = (_id, InsId) => {
  return (dispatch) => {
    JoinClassRequest.get(
      JoinClassRequest.joinclassEndpoint.ongoingClass
        .replace("__ID__", _id)
        .replace("__INSID__", InsId),
      (success) => {
        dispatch({
          type: JOIN_CLASS_TYPE.ONGOING_CLASS,
          payload: success.data.studentonlineclasses_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const attendedClass = (_id, InsId) => {
  return (dispatch) => {
    JoinClassRequest.get(
      JoinClassRequest.joinclassEndpoint.attendedClass
        .replace("__ID__", _id)
        .replace("__INSID__", InsId),
      (success) => {
        dispatch({
          type: JOIN_CLASS_TYPE.ATTENDED_CLASS,
          payload: success.data.studentonlineclasses_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const missedClass = (_id, InsId) => {
  return (dispatch) => {
    JoinClassRequest.get(
      JoinClassRequest.joinclassEndpoint.missedClass
        .replace("__ID__", _id)
        .replace("__INSID__", InsId),
      (success) => {
        dispatch({
          type: JOIN_CLASS_TYPE.MISSED_CLASS,
          payload: success.data.studentonlineclasses_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const classSortByToggleValueFromStudent = (
  userId,
  InsId,
  sortByValue
) => {
  return (dispatch) => {
    JoinClassRequest.get(
      JoinClassRequest.joinclassEndpoint.sortByToggleValue
        .replace("__USERID__", userId)
        .replace("__INSID__", InsId)
        .replace("__SORTBY__", sortByValue),
      (success) => {
        dispatch({
          type: JOIN_CLASS_TYPE.SORT_BY_TOGGLE_VALUE_STUDENT,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const classCreatedBySelf = (_id, InsId) => {
  return (dispatch) => {
    JoinClassRequest.get(
      JoinClassRequest.joinclassEndpoint.classCreatedBySelf
        .replace("__ID__", _id)
        .replace("__INSID__", InsId),
      (success) => {
        dispatch({
          type: JOIN_CLASS_TYPE.CLASS_CREATED_BY_SELF,
          payload: success.data.studentonlineclasses_data?success.data.studentonlineclasses_data:[],
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const classCreatedByInstituteOwner = (_id, InsId) => {
  return (dispatch) => {
    JoinClassRequest.get(
      JoinClassRequest.joinclassEndpoint.classCreatedByInstitute
        .replace("__ID__", _id)
        .replace("__INSID__", InsId),
      (success) => {
        dispatch({
          type: JOIN_CLASS_TYPE.CLASS_CREATED_BY_INSTITUTE,
          payload: success.data.studentonlineclasses_data?success.data.studentonlineclasses_data:[],
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const classCreatedByOther = (_id, InsId) => {
  return (dispatch) => {
    JoinClassRequest.get(
      JoinClassRequest.joinclassEndpoint.classCreatedByOther
        .replace("__ID__", _id)
        .replace("__INSID__", InsId),
      (success) => {
        
        dispatch({
          type: JOIN_CLASS_TYPE.CLASS_CREATED_BY_OTHER,
          payload: success.data.studentonlineclasses_data?success.data.studentonlineclasses_data:[],
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const searchClasses = (_id, InsId, Class) => {
  return (dispatch) => {
    dispatch({
      type: JOIN_CLASS_TYPE.JOIN_CLASS_READ_LOADING,
      loading: true
    })
    JoinClassRequest.get(
      JoinClassRequest.joinclassEndpoint.searchClass
        .replace("__ID__", _id)
        .replace("__INSID__", InsId)
        .replace("__CLASSNAME__", Class),
      (success) => {
       
        dispatch({
          type: JOIN_CLASS_TYPE.SEARCH_CLASS,
          payload: success.data.studentonlineclasses_data?success.data.studentonlineclasses_data:[],
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const getUpcomingClasses = (data) => {
  return (dispatch) => {
    if (!data) {
      dispatch({
        type: JOIN_CLASS_TYPE.GET_UPCOMING_CLASSES_LOADING,
        loading: true
      })
    }
    dispatch({
      type: JOIN_CLASS_TYPE.GET_UPCOMING_CLASSES,
      payload: data,
    });
  }
}

export const getStudentFilteredClass = (stdId, institute, query, value) => {
 
  return (dispatch) => {
    dispatch({
      type: JOIN_CLASS_TYPE.JOIN_CLASS_READ_LOADING,
      payload: []
    })
    JoinClassRequest.get(
      JoinClassRequest.joinclassEndpoint.filterOnlineClass.replace("__ID__", stdId).replace("__INSID__", institute).replace("__QUERY__", query).replace("__VALUE__", value), (success) => {
        dispatch({
          type: JOIN_CLASS_TYPE.ONLINE_CLASS_FILTER_LOADED,
          payload: success.data.studentonlineclasses_data?success.data.studentonlineclasses_data:[],
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const studentCourseClassroomFilter = (stdId, institute, courses, classrooms) => {
  return (dispatch) => {
    dispatch({
      type: JOIN_CLASS_TYPE.JOIN_CLASS_READ_LOADING,
      payload: []
    })
    JoinClassRequest.get(
      JoinClassRequest.joinclassEndpoint.courseClassroomFilter.replace("__ID__", stdId).replace("__INSID__", institute).replace("__COURSE__",courses).replace("__CLASSROOM__",classrooms), (success) => {
       
        dispatch({
          type: JOIN_CLASS_TYPE.ONLINE_CLASS_FILTER_LOADED,
          payload: success.data.studentonlineclasses_data?success.data.studentonlineclasses_data:[],
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const postAttendedTime = (studentId,classId,data)=>{
  return (dispatch)=>{
    JoinClassRequest.post(
      JoinClassRequest.joinclassEndpoint.studentAttendedTime
      .replace("__STUDENTID__",studentId).replace("__CLASSID__",classId),
      data,
      (success)=>{
        dispatch({
          type: JOIN_CLASS_TYPE.POST_STUDENT_JOIN_CLASS_TIMING,
          data: success.data
        })
      },(error)=>{
        dispatch(setCommonError(error.message))
      }
    )
  }
}