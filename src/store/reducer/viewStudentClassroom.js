import { VIEWSTUDENTCLASSROOM } from "../actions/viewStudentClassroom/actionType";

const STUDENT_VIEW_CLASSROOM_INITIAL_STATE = {
  courseClassroomInfo: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  subjectAssignmentList: {
    data: [],
    success: false,
    loading: false,
    error: false
  },
  subjectOnlineClassList: {
    data: [],
    success: false,
    loading: false,
    error: false,
  },
  subjectCoursesList: {
    data: [],
    success: false,
    loading: false,
    error: false,
  },
  subjectTeacherList: {
    data: [],
    success: false,
    loading: false,
    error: false,
  }
};

const studentViewClassroom = (state = STUDENT_VIEW_CLASSROOM_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case VIEWSTUDENTCLASSROOM.GET_COURSE_CLASSROOM_INFO_LOADING: {
      return {
        ...state,
        courseClassroomInfo: {
          ...state.courseClassroomInfo,
          data: [],
          loading: true,
          success: false
        }
      }
    }
    case VIEWSTUDENTCLASSROOM.GET_COURSE_CLASSROOM_INFO_LOADED: {
      return {
        ...state,
        courseClassroomInfo: {
          ...state.courseClassroomInfo,
          data: payload,
          loading: false,
          success: true
        }
      }
    }
    case VIEWSTUDENTCLASSROOM.GET_ASSIGNMENT_LIST_STUDENT_CLASSROOM_LOADING: {
      return {
        ...state,
        subjectAssignmentList: {
          ...state.subjectAssignmentList,
          data: [],
          loading: true,
          success: false
        }
      }
    }
    case VIEWSTUDENTCLASSROOM.GET_ASSIGNMENT_LIST_STUDENT_CLASSROOM_LOADED: {
      return {
        ...state,
        subjectAssignmentList: {
          ...state.subjectAssignmentList,
          data: payload,
          loading: false,
          success: true
        }
      }
    }
    case VIEWSTUDENTCLASSROOM.GET_TEACHER_LIST_STUDENT_CLASSROOM_LOADING: {
      return {
        ...state,
        subjectTeacherList: {
          ...state.subjectTeacherList,
          data: [],
          loading: true,
          success: false
        }
      }
    }
    case VIEWSTUDENTCLASSROOM.GET_TEACHER_LIST_STUDENT_CLASSROOM_LOADED: {
      return {
        ...state,
        subjectTeacherList: {
          ...state.subjectTeacherList,
          data: payload,
          loading: false,
          success: true
        }
      }
    }
    case VIEWSTUDENTCLASSROOM.SEARCH_SORT_BY_STUDENT_ASSIGNMENTS_LIST: {
      return {
        ...state,
        subjectAssignmentList: {
          ...state.subjectAssignmentList,
          data: payload,
          loading: false,
          success: true
        }
      }
    }
    case VIEWSTUDENTCLASSROOM.GET_SUBJECT_ONLINE_CLASS_LIST_LOADING: {
      return {
        ...state,
        subjectOnlineClassList: {
          ...state.subjectOnlineClassList,
          data: [],
          loading: true,
          success: false
        }
      }
    }
    case VIEWSTUDENTCLASSROOM.GET_SUBJECT_ONLINE_CLASS_LIST_LOADED: {
      return {
        ...state,
        subjectOnlineClassList: {
          ...state.subjectOnlineClassList,
          data: payload,
          loading: false,
          success: true
        }
      }
    }
    case VIEWSTUDENTCLASSROOM.SEARCH_SORT_BY_STUDENT_ONLINE_CLASSES_LIST: {
      return {
        ...state,
        subjectOnlineClassList: {
          ...state.subjectOnlineClassList,
          data: payload,
          loading: false,
          success: true
        }
      }
    }
    case VIEWSTUDENTCLASSROOM.SEARCH_SORT_BY_STUDENT_TEACHER_LIST: {
      return {
        ...state,
        subjectTeacherList: {
          ...state.subjectTeacherList,
          data: payload,
          loading: false,
          success: true
        }
      }
    }
    case VIEWSTUDENTCLASSROOM.GET_SUBJECT_COURSES_LOADING: {
      return {
        ...state,
        subjectCoursesList: {
          ...state.subjectCoursesList,
          data: [],
          loading: true,
          success: false
        }
      }
    }
    case VIEWSTUDENTCLASSROOM.GET_SUBJECT_COURSES_LOADED: {
      return {
        ...state,
        subjectCoursesList: {
          ...state.subjectCoursesList,
          data: payload,
          loading: false,
          success: true
        }
      }
    }
    case VIEWSTUDENTCLASSROOM.CREATED_BY_FILTER_STUDENT_COURSES_LIST: {
      return {
        ...state,
        subjectCoursesList: {
          ...state.subjectCoursesList,
          data: payload,
          loading: false,
          success: true
        }
      }
    }
    case VIEWSTUDENTCLASSROOM.SEARCH_SORTBY_STUDENT_COURSE_LIST: {
      return {
        ...state,
        subjectCoursesList: {
          ...state.subjectCoursesList,
          data: payload,
          loading: false,
          success: true
        }
      }
    }
    default:
      return state;
  }
};
export default studentViewClassroom;