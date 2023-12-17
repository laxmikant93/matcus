import { TEACHERTYPE } from "../actions/inviteteacher/actionType";

const TEACHER_INITIAL_STATE = {
  list: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  classroomList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  create: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  dataselection: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  edit: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  history: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },

  loading: {
    laoding: "Loading",
  },
  errorInvite: {
    data: [],
    success: false,
  },
  error: false
};

const inviteteacher = (state = TEACHER_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TEACHERTYPE.TEACHER_INVITE: {
      return {
        ...state,
        create: {
          ...state.create,
          success: true,
          loading: false,
          error: false,
          data: payload,
        },
      };
    }
    case TEACHERTYPE.TEACHER_INVITE_LOADING: {
      return {
        ...state,
        create: {
          ...state.create,
          success: false,
          loading: true,
          error: false,
          data: {},
        },
      };
    }
    case TEACHERTYPE.TEACHER_INVITE_REST: {
      return {
        ...state,
        create: {
          ...state.create,
          success: false,
          loading: false,
          error: false,
          data: {},
        },
      };
    }
    case TEACHERTYPE.GET_ERROR: {
      return {
        ...state,
        error: false,
      };
    }
    case TEACHERTYPE.TEACHER_INVITE_ERROR: {
      return {
        ...state,
        errorInvite: {
          ...state.errorInvite,
          success: true,
          data: payload,
        },
      };
    }
    case TEACHERTYPE.TEACHER_INVITE_ERROR_RESET: {
      return {
        ...state,
        errorInvite: {
          ...state.errorInvite,
          success: false,
          data: {},
        },
      };
    }
    case TEACHERTYPE.TEACHER_HISTORY: {
      return {
        ...state,
        list: {
          ...state.list,
          success: true,
          data: payload,
        },
      };
    }
    case TEACHERTYPE.GET_NOT_ASSIGNED_CLASSROOMS: {
      return {
        ...state,
        classroomList: {
          ...state.classroomList,
          success: true,
          data: payload,
        }
      }
    }
    case TEACHERTYPE.TEACHER_ID: {
      return {
        ...state,
        dataselection: {
          ...state.dataselection,
          success: true,
          data: payload,
        },
        error: false,
      };
    }
    case TEACHERTYPE.ERROR: {
      return {
        ...state,
        error: true,
      };
    }
    case TEACHERTYPE.GET_HISTORY: {
      return {
        ...state,
        history: {
          ...state.history,
          success: true,
          data: payload,
          loading: false,
        },
      };
    }
    case TEACHERTYPE.LOADING: {
      return {
        ...state,
        history: {
          ...state.history,
          loading: true,
          success: false,
          data: [],
        },
      };
    }
    default:
      return state;
  }
};

export default inviteteacher;