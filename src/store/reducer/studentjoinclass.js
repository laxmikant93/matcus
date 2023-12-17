import { JOIN_CLASS_TYPE } from "../actions/studentjoinclass/actionType";

const JOIN_CLASS_INITIAL_STATE = {
  list: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  upcomingClasses: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  postStudentJoinTiming: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  assignedStudent: {
    data: [],
    loading: false,
    success: false,
    error: false,
  }
};

const studentjoinclass = (
  state = JOIN_CLASS_INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    case JOIN_CLASS_TYPE.JOIN_CLASS_READ: {
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
    }
    case JOIN_CLASS_TYPE.JOIN_CLASS_READ_LOADING: {
      return {
        ...state,
        list: {
          ...state.list,
          data: [],
          success: false,
          loading: true
        }
      };
    }


    case JOIN_CLASS_TYPE.ASIGNED_STUDENT_LOADING: {
      return {
        ...state,
        assignedStudent: {
          ...state,
          data: [],
          success: false,
          loading: true,
          error: false
        },

      };
    }
    case JOIN_CLASS_TYPE.ASIGNED_STUDENT_LOADED: {
      return {
        ...state,
        assignedStudent: {
          ...state,
          data: payload,
          success: true,
          loading: false,
          error: false
        },
      };
    }
    case JOIN_CLASS_TYPE.ASIGNED_STUDENT_ERROR: {
      return {
        ...state,
        assignedStudent: {
          ...state,
          data: [],
          success: false,
          loading: false,
          error: true
        },
      };
    }
    case JOIN_CLASS_TYPE.ASIGNED_STUDENT_RESET: {
      return {
        ...state,
        assignedStudent: {
          ...state,
          data: [],
          success: false,
          loading: false,
          error: false
        },
      };
    }





    case JOIN_CLASS_TYPE.STUDENT_COURSE_AND_CLASSROOM: {
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
    }

    case JOIN_CLASS_TYPE.UPCOMING_CLASS: {
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
    }

    case JOIN_CLASS_TYPE.ONGOING_CLASS: {
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
    }

    case JOIN_CLASS_TYPE.ATTENDED_CLASS: {
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
    }

    case JOIN_CLASS_TYPE.MISSED_CLASS: {
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
    }

    case JOIN_CLASS_TYPE.SORT_BY_TOGGLE_VALUE_STUDENT: {
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
    }

    case JOIN_CLASS_TYPE.CLASS_CREATED_BY_SELF: {
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
    }

    case JOIN_CLASS_TYPE.CLASS_CREATED_BY_INSTITUTE: {
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
    }

    case JOIN_CLASS_TYPE.CLASS_CREATED_BY_OTHER: {
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
    }

    case JOIN_CLASS_TYPE.SEARCH_CLASS: {
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
    }
    case JOIN_CLASS_TYPE.GET_UPCOMING_CLASSES_LOADING: {
      return {
        ...state,
        upcomingClasses: {
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      }
    }
    case JOIN_CLASS_TYPE.GET_UPCOMING_CLASSES: {
      return {
        ...state,
        upcomingClasses: {
          ...state.upcomingClasses,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      }
    }
    case JOIN_CLASS_TYPE.CLASS_FILTER_LOADING:{
      return {
        ...state,
        list:{
          ...state.list,
          data:payload,
          loading:true,
          success:false,
        }
      }
    }

    case JOIN_CLASS_TYPE.ONLINE_CLASS_FILTER_LOADED:{
      return {
        ...state,
        list:{
          ...state.list,
          data:payload,
          loading:false,
          success:true
        }
      }
    }
    default:
      return state;
  }
};
export default studentjoinclass;
