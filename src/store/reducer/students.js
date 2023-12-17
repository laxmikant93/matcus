import { STUDENTTYPE } from "../actions/student/actionType";

const STUDENT_INITIAL_STATE = {
  list: {
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
  manualInvite: {
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
  history: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  errorInvite: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },

  loading: {
    laoding: "Loading",
  },

  error: false,
};


const students = (state = STUDENT_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case STUDENTTYPE.STUDENT_INVITE: {
      return {
        ...state,
        create: {
          ...state.create,
          success: true,
          data: payload,
          loading: false,
        },
      };
    }
    case STUDENTTYPE.STUDENT_INVITE_ERROR: {
      return {
        ...state,
        errorInvite: {
          ...state.errorInvite,
          success: true,
          data: payload,
        },
      };
    }
    case STUDENTTYPE.STUDENT_INVITE_ERROR_RESET: {
      return {
        ...state,
        errorInvite: {
          ...state.errorInvite,
          success: false,
          data: {},
        },
      };
    }
    case STUDENTTYPE.STUDENT_INVITE_LOADING: {
      return {
        ...state,
        create: {
          ...state.create,
          data: {},
          success: false,
          loading: true,
        },
      };
    }
    case STUDENTTYPE.STUDENT_MANUAL_INVITE_LOADING: {
      return {
        ...state,
        manualInvite: {
          ...state.manualInvite,
          success: false,
          data: [],
          loading: true,
          error: false
        },
      };
    }
    case STUDENTTYPE.STUDENT_MANUAL_INVITE_LOADED: {
      return {
        ...state,
        manualInvite: {
          ...state.manualInvite,
          success: true,
          data: payload,
          loading: false,
          error: false
        },
      };
    }
    case STUDENTTYPE.STUDENT_MANUAL_INVITE_ERROR: {
      return {
        ...state,
        manualInvite: {
          ...state.manualInvite,
          success: true,
          data: payload,
          loading: false,
          error: true
        },
      };
    }
    case STUDENTTYPE.STUDENT_MANUAL_INVITE_RESET: {
      return {
        ...state,
        manualInvite: {
          ...state.manualInvite,
          data: [],
          success: false,
          loading: false,
          error: false
        },
      };
    }
    case STUDENTTYPE.STUDENT_INVITE_CREATE_RESET: {
      return {
        ...state,
        create: {
          ...state.create,
          data: {},
          success: false,
          loading: false,
        },
      };
    }
    case STUDENTTYPE.STUDENT_LOADED: {
      return {
        ...state,
        list: {
          ...state.list,
          success: true,
          data: payload,
        },
      };
    }
    case STUDENTTYPE.GET_ERROR: {
      return {
        ...state,
        error: false,
      };
    }
    case STUDENTTYPE.ERROR: {
      return {
        ...state,
        error: true,
      };
    }
    case STUDENTTYPE.STUDENT_ID: {
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
    case STUDENTTYPE.STUDENT_ERROR: {
      return {
        ...state,
        error: true,
      };
    }

    case STUDENTTYPE.STUDENT_HISTORY: {
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
    case STUDENTTYPE.LOADING: {
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

export default students;