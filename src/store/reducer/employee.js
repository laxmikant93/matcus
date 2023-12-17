import { EMPLOYEETYPES } from "../actions/employee/actionTypes";


const EMPLOYEE_INITIAL_STATE = {
  list: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  delete: {
    data: [],
    loading: false,
    error: false,
    success: false,
  }

};

const employee = (state = EMPLOYEE_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case EMPLOYEETYPES.EMPLOYEE_LIST_LOADING:
      return {
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: true,
          success: false,
        },
      };
    case EMPLOYEETYPES.EMPLOYEE_LIST_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
          loading: false
        },
      };
    case EMPLOYEETYPES.EMPLOYEE_LIST_RESET:
      return {
        ...state,
        list: {
          ...state,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      }
    case EMPLOYEETYPES.DELETE_EMPLOYEE_LOADING:
      return {
        ...state,
        delete: {
          ...state.delete,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      }
    case EMPLOYEETYPES.DELETE_EMPLOYEE_LOADED:
      return {
        ...state,
        delete: {
          ...state.delete,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        list: {
          ...state.list,
          data: state.list.data.filter((item) => item._id !== payload),
          success: true
        }
      }
    default:
      return state;
  }
};
export default employee;