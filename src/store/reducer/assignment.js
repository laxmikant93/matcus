import { ASSIGNMENT_TYPE } from "../actions/assignment/actionType";

const ASSIGNMENT_INITIAL_STATE = {
  list: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  setFilteredTeachers: [],
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
  courseinfo: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  singleassignment: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  coursenameupdate: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  teacherassignmentview: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  updateSelection: {
    data: [],
    laoding: false,
    success: false,
    error: false,
  },
  assignedAssignment: {
    data: [],
    success: false,
  },
};

// var data = (payload) => {
//   return {
//     classroom: payload.assignmentInfo_classroom,
//     course: payload.assignmentInfo_course,
//     courseInfo_coursename: payload.assignmentInfo_courseDetail_coursename,
//     classroomInfo_classroomname:
//       payload.assignmentInfo_classroomDetail_classroomname,
//     title: payload.assignmentInfo_title,
//     _id: payload.assignmentInfo,
//     createdAt: payload.assignmentInfo_createdAt,
//     duedate: payload.assignmentInfo_duedate,
//     fileupload: payload.assignmentInfo_fileupload,
//     institute: payload.assignmentInfo_institute,
//     owner: payload.assignmentInfo_owner,
//     description: payload.assignmentInfo_description,
//   };
// };

const assignment = (state = ASSIGNMENT_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ASSIGNMENT_TYPE.ASSIGNMENT_READ:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
          loading: false,
        },
        delete: {
          success: false,
        },
      };

    case ASSIGNMENT_TYPE.ASSIGNMENT_CREATEDBY: {
      return {
        ...state,
        assignedAssignment: {
          ...state.assignedAssignment,
          data: payload,
          success: true
        },
        delete: {
          success: false,
        },
      };
    }
    case ASSIGNMENT_TYPE.ASSIGNMENT_CREATED_BY: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
          loading: false,
        },
        delete: {
          success: false,
        },
      };
    }

    case ASSIGNMENT_TYPE.ASSIGNMENT_COURSE_AND_CLASSROOM_FILTER: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
          loading: false,
        },
        delete: {
          success: false,
        },
      };
    }

    case ASSIGNMENT_TYPE.ASSIGNMENT_SORTBYRTO1: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
          loading: false,
        },
        delete: {
          success: false,
        },
      };
    }

    case ASSIGNMENT_TYPE.ASSIGNMENT_SORTBYOTR1: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
          loading: false,
        },
        delete: {
          success: false,
        },
      };
    }

    case ASSIGNMENT_TYPE.ASSIGNMENT_SORTBYRTO2: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
          loading: false,
        },
        delete: {
          success: false,
        },
      };
    }

    case ASSIGNMENT_TYPE.ASSIGNMENT_SORTBYOTR2: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
          loading: false,
        },
        delete: {
          success: false,
        },
      };
    }

    case ASSIGNMENT_TYPE.ASSIGNMENT_SORTBYRTO3: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
          loading: false,
        },
        delete: {
          success: false,
        },
      };
    }

    case ASSIGNMENT_TYPE.ASSIGNMENT_SORTBYOTR3: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
          loading: false,
        },
        delete: {
          success: false,
        },
      };
    }

    case ASSIGNMENT_TYPE.ASSIGNMENT_READ_RESET:
      return {
        ...state,
        list: {
          ...state.list,
          data: [],
          success: false,
          loading: false,
          error: false,
        },
      };
    case ASSIGNMENT_TYPE.ASSIGNMENT_SEARCH_READ:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
        },
        delete: {
          success: false,
        },
      };
    case ASSIGNMENT_TYPE.ASSIGNMENT_READ_LOADING:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          loading: true,
          error: false,
          success: false,
        },
      };

    case ASSIGNMENT_TYPE.ASSIGNMENT_UPDATE_TEACHER:
      return {
        ...state,
        update: {
          ...state.list,
          data: payload,
          loading: false,
          success: true,
          error: false,
        },
        list: {
          ...state.list,
          data: state.list.data.map((content) =>
            content._id === payload.assignmentInfo._id
              ? {
                ...content,
                title: payload.assignmentInfo.title,
                courseInfo_coursename: payload.assignmentInfo.courseDetail.coursename,
                classroomInfo_classroomname: payload.assignmentInfo.classroomDetail.classroomname,
                createdAt: payload.assignmentInfo.createdAt,
                updatedAt: payload.assignmentInfo.updatedAt,
                duedate: payload.assignmentInfo.duedate,
                course: payload.assignmentInfo.course,
                classroom: payload.assignmentInfo.classroom,
                description: payload.assignmentInfo.description,
                fileupload: payload.assignmentInfo.fileupload,
              }
              : content
          ),
        },
      };
    case ASSIGNMENT_TYPE.ASSIGNMENT_UPDATE_TEACHER_LOADING:
      return {
        ...state,
        update: {
          ...state.list,
          data: [],
          loading: true,
          success: false,
          error: false,
        },
      };
    case ASSIGNMENT_TYPE.ASSIGNMENT_UPDATE_TEACHER_ERROR:
      return {
        ...state,
        update: {
          ...state.list,
          data: [],
          loading: false,
          success: false,
          error: true,
        },
      };
    case ASSIGNMENT_TYPE.ASSIGNMENT_UPDATE_TEACHER_RESET:
      return {
        ...state,
        update: {
          ...state.list,
          data: [],
          loading: false,
          success: false,
          error: false,
        },
      };

    case ASSIGNMENT_TYPE.SINGLE_ASSIGNMENT_READ: {
      return {
        ...state,
        singleassignment: {
          ...state.singleassignment,
          data: payload,
          success: true,
        },
      };
    }

    case ASSIGNMENT_TYPE.SORT_BY_RTO_VIEW_ASSIGNMENT: {
      return {
        ...state,
        singleassignment: {
          ...state.singleassignment,
          data: payload,
          success: true,
        },
      };
    }

    case ASSIGNMENT_TYPE.SORT_BY_OTR_VIEW_ASSIGNMENT: {
      return {
        ...state,
        singleassignment: {
          ...state.singleassignment,
          data: payload,
          success: true,
        },
      };
    }

    case ASSIGNMENT_TYPE.SORT_BY_SUBMITTED_VIEW_ASSIGNMENT: {
      return {
        ...state,
        singleassignment: {
          ...state.singleassignment,
          data: payload,
          success: true,
        },
      };
    }

    case ASSIGNMENT_TYPE.SORT_BY_PENDING_VIEW_ASSIGNMENT: {
      return {
        ...state,
        singleassignment: {
          ...state.singleassignment,
          data: payload,
          success: true,
        },
      };
    }

    case ASSIGNMENT_TYPE.SORT_BY_GRADED_YES_VIEW_ASSIGNMENT: {
      return {
        ...state,
        singleassignment: {
          ...state.singleassignment,
          data: payload,
          success: true,
        },
      };
    }

    case ASSIGNMENT_TYPE.SORT_BY_GRADED_NO_VIEW_ASSIGNMENT: {
      return {
        ...state,
        singleassignment: {
          ...state.singleassignment,
          data: payload,
          success: true,
        },
      };
    }

    case ASSIGNMENT_TYPE.ASSIGNMENT_CREATE: {
      state.list.data.unshift(payload);
      return {
        ...state,
        create: {
          ...state.create,
          data: payload,
          success: true,
          loading: false,
          error: false,
        },
        list: {
          ...state.list,
          data: state.list.data,
        },
      };
    }
    case ASSIGNMENT_TYPE.ASSIGNMENT_CREATE_LOADING: {
      return {
        ...state,
        create: {
          ...state.create,
          data: payload,
          loading: true,
          success: false,
          error: false,
        },
      };
    }
    case ASSIGNMENT_TYPE.ASSIGNMENT_CREATE_ERROR: {
      return {
        ...state,
        create: {
          ...state.create,
          data: payload,
          loading: false,
          success: false,
          error: true,
        },
      };
    }
    case ASSIGNMENT_TYPE.ASSIGNMENT_REMARK_RESET: {
      return {
        ...state,
        update: {
          ...state.update,
          data: payload,
          loading: false,
          success: false,
          error: false,
        },
      };
    }
    case ASSIGNMENT_TYPE.ASSIGNMENT_REMARK_LOADING: {
      return {
        ...state,
        update: {
          ...state.update,
          data: payload,
          loading: true,
          success: false,
          error: false,
        },
      };
    }

    case ASSIGNMENT_TYPE.ASSIGNMENT_REMARK: {
      return {
        ...state,
        update: {
          ...state.update,
          data: payload,
          success: true,
          loading: false,
          error: false,
        },
        singleassignment: {
          ...state.singleassignment,
          data: state.singleassignment.data.map((content) =>
            content._id === payload._id
              ? {
                ...content,
                submittedAssignmentData_grade:
                  payload.submittedAssignmentData_grade,
                submittedAssignmentData_remarks:
                  payload.submittedAssignmentData_remarks,
                submittedAssignmentData_status:
                  payload.submittedAssignmentData_status,
              }
              : content
          ),
        },
      };
    }

    case ASSIGNMENT_TYPE.ASSIGNMENT_DELETE: {
      return {
        ...state,
        delete: {
          ...state.delete,
          data: payload,
          success: true,
          error: false,
          loading: false,
        },
        list: {
          ...state.list,
          data: state.list.data.filter((item) => item._id !== payload),
        },
      };
    }
    case ASSIGNMENT_TYPE.ASSIGNMENT_DELETE_LOADING: {
      return {
        ...state,
        delete: {
          ...state.delete,
          data: payload,
          success: false,
          error: false,
          loading: true,
        },
      };
    }

    case ASSIGNMENT_TYPE.TEACHER_ASSIGNMENT_UPDATE_SELECTION: {
      return {
        ...state,
        updateSelection: {
          ...state.updateSelection,
          data: state.singleassignment.data.find(
            (annItem) => annItem._id === payload
          ),
          success: true,
        },
      };
    }

    case ASSIGNMENT_TYPE.TEACHER_ASSIGNMENT_UPDATE_SELECTION_RESET: {
      return {
        ...state,
        updateSelection: {
          ...state.updateSelection,
          data: {},
          success: false,
        },
      };
    }

    case ASSIGNMENT_TYPE.SINGLE_ASSIGNMENT_READ_TEACHER_VIEW: {
      return {
        ...state,
        teacherassignmentview: {
          ...state.teacherassignmentview,
          data: payload,
          success: true,
        },
      };
    }

    case ASSIGNMENT_TYPE.SET_FILTERED_ASSIGNMENT_TEACHERS: {
      return {
        ...state,
        setFilteredTeachers: payload,
      };
    }

    default:
      return state;
  }
};

export default assignment;
