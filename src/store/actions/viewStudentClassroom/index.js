import { courseID } from "../../../Constant/auth";
import { setCommonError } from "../commonerror";
import { VIEWSTUDENTCLASSROOM } from "./actionType";
import ViewStudentClassroomRequest from "./ViewStudentClassroomRequest";

export const getCourseClassroomInfo = (_id, classroomId) => {
  return (dispatch) => {
    dispatch({
      type: VIEWSTUDENTCLASSROOM.GET_COURSE_CLASSROOM_INFO_LOADING,
      loading: true,
    });
    ViewStudentClassroomRequest.get(
      ViewStudentClassroomRequest.viewStudentClassroomEndpoint.courseClassroomInfo.replace("__INSID__", _id).replace("__CLASSROOMID__", classroomId),
      (success) => {
        dispatch({
          type: VIEWSTUDENTCLASSROOM.GET_COURSE_CLASSROOM_INFO_LOADED,
          payload: success.data.data,
        })
      },
      (error) => {
        setCommonError(error.message);
      }
    )
  }
}


export const getSubjectAssignmentList = (insId, userId, classroomId, courseID) => {
  return (dispatch) => {
    dispatch({
      type: VIEWSTUDENTCLASSROOM.GET_ASSIGNMENT_LIST_STUDENT_CLASSROOM_LOADING,
      loading: true,
    });
    ViewStudentClassroomRequest.get(
      ViewStudentClassroomRequest.viewStudentClassroomEndpoint.getStudentAssignments.replace("__INSID__", insId).replace("__STUDENTID__", userId).replace("__CLASSROOMID__", classroomId).replace("__COURSEID__", courseID),
      (success) => {
        dispatch({
          type: VIEWSTUDENTCLASSROOM.GET_ASSIGNMENT_LIST_STUDENT_CLASSROOM_LOADED,
          payload: success.data.assignment_data,
        })
      },
      (error) => {
        setCommonError(error.message);
      }
    )
  }
}

export const getSubjectTeacherList = (insId, userId, classroomId, courseId) => {
  return (dispatch) => {
    dispatch({
      type: VIEWSTUDENTCLASSROOM.GET_TEACHER_LIST_STUDENT_CLASSROOM_LOADING,
      loading: true,
    });
    ViewStudentClassroomRequest.get(
      ViewStudentClassroomRequest.viewStudentClassroomEndpoint.getSubjectTeacherLists.replace("__INSID__", insId).replace("__STUDENTID__", userId).replace("__ClassroomId__", classroomId).replace("__COURSEID__", courseId),
      (success) => {
        dispatch({
          type: VIEWSTUDENTCLASSROOM.GET_TEACHER_LIST_STUDENT_CLASSROOM_LOADED,
          payload: success.data.classassignedcheck,
        })
      },
      (error) => {
        setCommonError(error.message);
      }
    )
  }
}

export const getSubjectOnlineClassList = (insId, userId, classroomId) => {
  return (dispatch) => {
    dispatch({
      type: VIEWSTUDENTCLASSROOM.GET_SUBJECT_ONLINE_CLASS_LIST_LOADING,
      loading: true,
    });
    ViewStudentClassroomRequest.get(
      ViewStudentClassroomRequest.viewStudentClassroomEndpoint.getStudentSubjectOnlineClasses.replace("__INSID__", insId).replace("__STUDENTID__", userId).replace("__CLASSROOMID__", classroomId),
      (success) => {
        dispatch({
          type: VIEWSTUDENTCLASSROOM.GET_SUBJECT_ONLINE_CLASS_LIST_LOADED,
          payload: success.data.studentonlineclasses_data ? success.data.studentonlineclasses_data : [],
        })
      },
      (error) => {
        setCommonError(error.message);
      }
    )
  }
}

export const getSubjectCoursesList = (insId, userId, courseId, classroomId) => {
  return (dispatch) => {
    dispatch({
      type: VIEWSTUDENTCLASSROOM.GET_SUBJECT_COURSES_LOADING,
      loading: true,
    });
    ViewStudentClassroomRequest.get(
      ViewStudentClassroomRequest.viewStudentClassroomEndpoint.getStudentSubjectCourses.replace("__INSID__", insId).replace("__STUDENTID__", userId).replace("__COURSEID__", courseId).replace("__CLASSROOMID__", classroomId),
      (success) => {
        dispatch({
          type: VIEWSTUDENTCLASSROOM.GET_SUBJECT_COURSES_LOADED,
          payload: success.data.data,
        })
      },
      (error) => {
        setCommonError(error.message);
      }
    )
  }
}
export const searchSortBySubjectCoursesList = (insId, userId, courseId, classroomId, query, value) => {
  return (dispatch) => {
    dispatch({
      type: VIEWSTUDENTCLASSROOM.GET_SUBJECT_COURSES_LOADING,
      loading: true,
    });
    ViewStudentClassroomRequest.get(
      ViewStudentClassroomRequest.viewStudentClassroomEndpoint.getSearchSortByStudentSubjectCourses.replace("__INSID__", insId).replace("__STUDENTID__", userId).replace("__COURSEID__", courseId).replace("__CLASSROOMID__", classroomId).replace("__QUERY__", query).replace("__VALUE__", value),
      (success) => {
        dispatch({
          type: VIEWSTUDENTCLASSROOM.SEARCH_SORTBY_STUDENT_COURSE_LIST,
          payload: success.data.data,
        })
      },
      (error) => {
        setCommonError(error.message);
      }
    )
  }
}

export const searchSortBySubjectOnlineClasssesList = (insId, userId, courseId, classroomId, query, value) => {
  return (dispatch) => {
    dispatch({
      type: VIEWSTUDENTCLASSROOM.GET_SUBJECT_ONLINE_CLASS_LIST_LOADING,
      loading: true,
    });
    ViewStudentClassroomRequest.get(
      ViewStudentClassroomRequest.viewStudentClassroomEndpoint.searchSortByOnlineClasses.replace("__INSID__", insId).replace("__STUDENTID__", userId).replace("__COURSEID__", courseId).replace("__CLASSROOMID__", classroomId).replace("__QUERY__", query).replace("__VALUE__", value),
      (success) => {
        dispatch({
          type: VIEWSTUDENTCLASSROOM.SEARCH_SORT_BY_STUDENT_ONLINE_CLASSES_LIST,
          payload: success.data.studentonlineclasses_data ? success.data.studentonlineclasses_data : [],
        })
      },
      (error) => {
        setCommonError(error.message);
      }
    )
  }
}
export const searchSortBySubjectTeacherList = (insId, classroomId, query, value, courseId) => {
  return (dispatch) => {
    dispatch({
      type: VIEWSTUDENTCLASSROOM.GET_TEACHER_LIST_STUDENT_CLASSROOM_LOADING,
      loading: true,
    });
    ViewStudentClassroomRequest.get(
      ViewStudentClassroomRequest.viewStudentClassroomEndpoint.searchSortByTeacher.replace("__INSID__", insId).replace("__CLASSROOMID__", classroomId).replace("__QUERY__", query).replace("__VALUE__", value).replace("__COURSEID__", courseId),
      (success) => {
        dispatch({
          type: VIEWSTUDENTCLASSROOM.SEARCH_SORT_BY_STUDENT_TEACHER_LIST,
          payload: success.data.classassignedcheck,
        })
      },
      (error) => {
        setCommonError(error.message);
      }
    )
  }
}
export const searchSortBySubjectAssignmentList = (insId, userId, courseId, classroomId, query, value) => {
  return (dispatch) => {
    dispatch({
      type: VIEWSTUDENTCLASSROOM.GET_ASSIGNMENT_LIST_STUDENT_CLASSROOM_LOADING,
      loading: true,
    });
    ViewStudentClassroomRequest.get(
      ViewStudentClassroomRequest.viewStudentClassroomEndpoint.searchSortByAssignments.replace("__INSID__", insId).replace("__STUDENTID__", userId).replace("__COURSEID__", courseId).replace("__CLASSROOMID__", classroomId).replace("__QUERY__", query).replace("__VALUE__", value),
      (success) => {
        dispatch({
          type: VIEWSTUDENTCLASSROOM.SEARCH_SORT_BY_STUDENT_ASSIGNMENTS_LIST,
          payload: success.data.assignment_data,
        })
      },
      (error) => {
        setCommonError(error.message);
      }
    )
  }
}

export const filterCreatedBySubjectCoursesList = (insId, userId, courseId, classroomId, value) => {
  return (dispatch) => {
    dispatch({
      type: VIEWSTUDENTCLASSROOM.GET_SUBJECT_COURSES_LOADING,
      loading: true,
    });
    ViewStudentClassroomRequest.get(
      ViewStudentClassroomRequest.viewStudentClassroomEndpoint.createdByFilterStudentSubjectCoursesList.replace("__INSID__", insId).replace("__STUDENTID__", userId).replace("__COURSEID__", courseId).replace("__CLASSROOMID__", classroomId).replace("__VALUE__", value),
      (success) => {
        dispatch({
          type: VIEWSTUDENTCLASSROOM.CREATED_BY_FILTER_STUDENT_COURSES_LIST,
          payload: success.data.data,
        })
      },
      (error) => {
        setCommonError(error.message);
      }
    )
  }
}