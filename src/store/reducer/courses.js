
import { COURSETYPE } from "../actions/courses/actionType";


const COURSE_INITIAL_STATE = {
  list: {
    data: [],
    success: false,
    loading: false,
    error: false,
  },
  multipleCoursesAssigned: {
    data: [],
    success: false,
    loading: false,
    error: false,
  },
  create: {
    data: "",
    loading: false,
    success: false,
    error: false,
  },
  update: {
    data: "",
    loading: false,
    success: false,
    error: false,
  },
  delete: {
    data: "",
    loading: false,
    success: false,
    error: false,
  },
  assignMultipleCourses:{
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  courseError: {
    courseAC: false,
  },
  deleteStudentAssignedCourse:{
    data:{},
    loading: false,
    success: false,
    error: false,
  },
  getNotAssignedCourses:{
    data: [],
    success: false,
    loading: false,
    error: false,
  }
};

const courses = (state = COURSE_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case COURSETYPE.COURSE_READ:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
        },
      };
    case COURSETYPE.COURSE_READ_RESET:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: false,
        },
      };
    case COURSETYPE.COURSE_CREATE_ERROR_FALSE:
      return {
        ...state,
        courseError: {
          ...state.courseError,
          courseAC: false,
        },
      };

    case COURSETYPE.COURSE_CREATE: {
      return {
        ...state,
        create: {
          ...state.create,
          data: payload,
          success: true,
        },
        courseError: {
          ...state.courseError,
          courseAC: false,
        }
      };
    }

    case COURSETYPE.COURSE_CREATE_ERROR: {
      return {
        ...state,
        create: {
          ...state.create,
          success: false,
        },
        courseError: {
          ...state.courseError,
          courseAC: true,
        }
      };
    }
    case COURSETYPE.COURSE_UPDATE: {
      return {
        ...state,
        update: {
          ...state.update,
          data: payload,
          success: true,
        },
        list: {
          ...state.list,

          data: state.list.data.map((content) =>
            content._id === payload._id
              ? {
                ...content,
                title: payload.title,
                description: payload.description,
              }
              : content
          ),

          success: true,
        },
      };
    }

    case COURSETYPE.COURSE_DELETE: {
      return {
        ...state,
        delete: {
          ...state.delete,
          data: payload,
          success: true,
        },

        list: {
          ...state.list,
          data: state.list.data.filter((item) => item._id !== payload._id),
        },
      };
    }

    case COURSETYPE.COURSE_UPDATE_SELECTION:
      return {
        ...state,
        update: {
          ...state.update,
          data: state.list.data.find((annItem) => annItem._id === payload),
        },
      };
      case COURSETYPE.GET_MULTIPLE_COURSES_LOADING:{
        return{
          ...state,
          multipleCoursesAssigned:{
            ...state.multipleCoursesAssigned,
            data:{},
            success: false,
            loading: true,
            error: false,
          }
        }
      }
      case COURSETYPE.GET_MULTIPLE_COURSES:{
        return{
          ...state,
          multipleCoursesAssigned:{
            ...state.multipleCoursesAssigned,
            data:payload,
            success: true,
            loading: false,
            error: false,
          }
        }
      }
      case COURSETYPE.ASSIGN_MULTIPLE_COURSES_LOADING:{
        return{
          ...state,
          assignMultipleCourses:{
            ...state.assignMultipleCourses,
            data:{},
            success: false,
            loading: true,
            error: false,
          }
        }
      }
      case COURSETYPE.ASSIGN_MULTIPLE_COURSES:{
        return{
          ...state,
          assignMultipleCourses:{
            ...state.assignMultipleCourses,
            data:payload,
            success: true,
            loading: false,
            error: false,
          }
        }
      }
      case COURSETYPE.DELETE_ASSIGNED_COURSE_LOADING:{
        return {
          ...state,
          deleteStudentAssignedCourse:{
            ...state.deleteStudentAssignedCourse,
            data:{},
            success: false,
            loading: true,
            error: false,
          }
        }
      }
      case COURSETYPE.DELETE_ASSIGNED_COURSE:{
        return {
          ...state,
          deleteStudentAssignedCourse:{
            ...state.deleteStudentAssignedCourse,
            data:{},
            success: true,
            loading: false,
            error: false,
          }
        }
      } 
      case COURSETYPE.GET_NOT_ASSIGNED_COURSES_LOADING:{
        return {
          ...state,
          getNotAssignedCourses:{
            ...state.getNotAssignedCourses,
            data: [],
            success: false,
            loading: true,
            error: false,
          }
        }
      }
      case COURSETYPE.GET_NOT_ASSIGNED_COURSES:{
        return {
          ...state,
          getNotAssignedCourses:{
            ...state.getNotAssignedCourses,
            data: payload,
            success: true,
            loading: false,
            error: false,
          }
        }
      }
      case COURSETYPE.RESET_MULTIPLE_COURSES:
        return COURSE_INITIAL_STATE;
    default:
      return state;
  }
};

export default courses