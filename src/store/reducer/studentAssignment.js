import { ASSIGNMENT_TYPE } from "../actions/studentAssignment/actionType";

const ASSIGNMENT_INITIAL_STATE = {
  info: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  singleassignmentread: {
    data: {},
    loading: false,
    success: false,
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
  studentinfo: {
    data: [],
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
};

const studentAssignment = (
  state = ASSIGNMENT_INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    case ASSIGNMENT_TYPE.ALL_ASSIGNMENT_STUDENT_READ:
      return {
        ...state,
        info: {
          ...state.info,
          data: payload,
          success: true,
        },
      };
    case ASSIGNMENT_TYPE.SORT_BY_STUDENT_ASSIGNMENT_OTR1:
      return {
        ...state,
        info: {
          ...state.info,
          data: payload,
          success: true,
        },
      };
    case ASSIGNMENT_TYPE.SORT_BY_STUDENT_ASSIGNMENT_OTR2:
      return {
        ...state,
        info: {
          ...state.info,
          data: payload,
          success: true,
        },
      };
    case ASSIGNMENT_TYPE.SORT_BY_STUDENT_ASSIGNMENT_RTO1:
      return {
        ...state,
        info: {
          ...state.info,
          data: payload,
          success: true,
        },
      };
    case ASSIGNMENT_TYPE.SORT_BY_STUDENT_ASSIGNMENT_RTO2:
      return {
        ...state,
        info: {
          ...state.info,
          data: payload,
          success: true,
        },
      };
    case ASSIGNMENT_TYPE.SORT_BY_STUDENT_ASSIGNMENT_SUBMITED:
      return {
        ...state,
        info: {
          ...state.info,
          data: payload,
          success: true,
        },
      };
    case ASSIGNMENT_TYPE.SORT_BY_STUDENT_ASSIGNMENT_PENDING:
      return {
        ...state,
        info: {
          ...state.info,
          data: payload,
          success: true,
        },
      };
      case ASSIGNMENT_TYPE.SORT_BY_STUDENT_ASSIGNMENT_MISSED:
        return {
          ...state,
          info: {
            ...state.info,
            data: payload,
            success: true,
          },
        };
    case ASSIGNMENT_TYPE.SORT_BY_STUDENT_ASSIGNMENT_GRADED:
      return {
        ...state,
        info: {
          ...state.info,
          data: payload,
          success: true,
        },
      };

    case ASSIGNMENT_TYPE.STUDENT_ASSIGNMENT_CLASS_AND_COURSE:
      return {
        ...state,
        info: {
          ...state.info,
          data: payload,
          success: true,
        },
      };
    case ASSIGNMENT_TYPE.ALL_ASSIGNMENT_STUDENT_READ_RESET:
      return {
        ...state,
        info: {
          ...state.info,
          data: {},
          loading: false,
          success: false,
          error: false,
        },
      };
    case ASSIGNMENT_TYPE.SINGLE_ASSIGNMENT_READ_STUDENT:
      return {
        ...state,
        singleassignmentread: {
          ...state.singleassignmentread,
          data: payload,
          success: true,
        },
      };
    case ASSIGNMENT_TYPE.SINGLE_ASSIGNMENT_READ_STUDENT_LOADING:
      return {
        ...state,
        singleassignmentread: {
          ...state.singleassignmentread,
          data: payload,
          success: false,
        },
      };

    case ASSIGNMENT_TYPE.STUDENT_INFO_READ:
      return {
        ...state,
        studentinfo: {
          ...state.studentinfo,
          data: payload,
          success: true,
        },
      };

    case ASSIGNMENT_TYPE.ASSIGNMENT_CREATE: {
      return {
        ...state,
        create: {
          ...state.create,
          data: payload,
          success: true,
          loading: false,
          error: false,
        },
      };
    }

    case ASSIGNMENT_TYPE.ASSIGNMENT_CREATE_RESET: {
      return {
        ...state,
        create: {
          ...state.create,
          data: {},
          success: false,
          loading: false,
          error: false,
        },
      };
    }

    case ASSIGNMENT_TYPE.ASSIGNMENT_CREATE_LOADING: {
      return {
        ...state,
        create: {
          ...state.create,
          data: {},
          success: false,
          loading: true,
          error: false,
        },
      };
    }

    case ASSIGNMENT_TYPE.ASSIGNMENT_UPDATE: {
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
                  course: payload.course,
                  classroom: payload.classroom,
                  title: payload.title,
                  duedate: payload.duedate,
                  fileupload: payload.fileupload,
                  description: payload.description,
                }
              : content
          ),
          success: true,
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
        },

        list: {
          ...state.list,
          data: state.list.data.filter((item) => item._id !== payload.id),
          success: true,
        },
      };
    }

    case ASSIGNMENT_TYPE.ASSIGNMENT_UPDATE_SELECTION:
      return {
        ...state,
        update: {
          ...state.update,
          data: state.list.data.find((annItem) => annItem._id === payload),
        },
      };

    case ASSIGNMENT_TYPE.CLEAR_ASSIGNMENT_VIEW:
      return {
        ...state,
        singleassignmentread: {
          ...state.singleassignmentread,
          data: payload,
        },
      };
    default:
      return state;
  }
};
export default studentAssignment;
