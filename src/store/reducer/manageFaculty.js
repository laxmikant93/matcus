import { REQUEST_TYPE } from "../actions/manageFaculty/actionTypes";

const INITIAL_STATE = {
  facultyList: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  addFaculty: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  updateFaculty: {
    data: [],
    loading: false,
    error: false,
    success: false
  },
  deleteFaculty: {
    data: "",
    loading: false,
    success: false,
    error: false,
  },
  dataid: {
    data: "",
    loading: false,
    success: false,
    error: false,
  },
  isLoaded: false,
};

const manageFaculty = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case REQUEST_TYPE.GET_FACULTY: {
      return {
        ...state,
        facultyList: {
          ...state.facultyList,
          data: payload,
          loading: false,
          success: true,
        },
      };
    }
    case REQUEST_TYPE.FACULTY_LOADING: {
      return {
        ...state,
        facultyList: {
          ...state.facultyList,
          data: payload,
          loading: true,
          success: false,
        },
      };
    }
    case REQUEST_TYPE.FACULTY_CREATING: {
      return {
        ...state,
        addFaculty: {
          ...state.addFaculty,
          loading: true,
          success: false,
          error: false,
        }
      }
    }
    case REQUEST_TYPE.POST_FACULTY: {
      return {
        ...state,
        addFaculty: {
          loading: false,
          // data: payload,
          success: true,
          error: false
        },
        facultyList: {
          ...state.facultyList,
          // data: state.facultyList.data.concat(payload),
          data: [payload].concat(state.facultyList.data),
          // success:true
        },
      };
    }

    case REQUEST_TYPE.FACULTY_UPDATING: {
      return {
        ...state,
        updateFaculty: {
          ...state.updateFaculty,
          loading: true,
          success: false,
          error: false,
        }
      }
    }
    case REQUEST_TYPE.UPDATE_FACULTY: {
      return {
        ...state,
        updateFaculty: {
          // data: payload,
          loading: false,
          success: true
        },
        facultyList: {
          ...state.facultyList,
          data: payload,
        },
      };
    }

    case REQUEST_TYPE.DELETE_FACULTY: {
      return {
        ...state,
        deleteFaculty: {
          ...state.deleteFaculty,
          data: payload,
          success: true,
        },
        facultyList: {
          ...state.facultyList,
          data: state.facultyList.data.filter((item) => item._id !== payload),
          success: true,
        },
      };
    }
    case REQUEST_TYPE.GET_FACULTY_BY_ID: {
      return {
        ...state,
        dataid: {
          ...state.dataid,
          data: payload,
          success: true,
          loading: false,
        },
      };
    }
    case REQUEST_TYPE.GET_FACULTY_BY_ID_LOADING: {
      return {
        ...state,
        dataid: {
          ...state.dataid,
          loading: true,
          success: false,
          data: [],
        },
      };
    }
    case REQUEST_TYPE.RESET_SINGLE_FACULTY_INFO:
      return (INITIAL_STATE);

    default:
      return state;
  }
};
export default manageFaculty;