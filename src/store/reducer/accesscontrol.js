import { Access_ControlActionTypes } from "../actions/accesscontrol/actionType"

const ACCESS_CONTROL_INITIAL_STATE = {
  list: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  updateStaffList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  }
}

const AdminCourse = (state = ACCESS_CONTROL_INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case Access_ControlActionTypes.ACCESS_CONTROL_STAFF_LIST_LOADING:
      return ({
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })

    case Access_ControlActionTypes.ACCESS_CONTROL_STAFF_LIST_LOADED:
      return ({
        ...state,
        list: {
          ...state.list,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })

    case Access_ControlActionTypes.ACCESS_CONTROL_STAFF_LIST_ERROR:
      return ({
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: false,
          success: false,
          error: true,
        }
      })
    case Access_ControlActionTypes.ACCESS_CONTROL_STAFF_LIST_RESET:
      return ({
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      })
    case Access_ControlActionTypes.ACCESS_CONTROL_STAFF_CREATING:
      return ({
        ...state,
        updateStaffList: {
          ...state.updateStaffList,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })

    case Access_ControlActionTypes.ACCESS_CONTROL_STAFF_CREATED:
      return ({
        ...state,
        updateStaffList: {
          ...state.updateStaffList,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })

    case Access_ControlActionTypes.ACCESS_CONTROL_STAFF_CREATE_ERROR:
      return ({
        ...state,
        updateStaffList: {
          ...state.updateStaffList,
          data: [],
          loading: false,
          success: false,
          error: true,
        }
      })
    case Access_ControlActionTypes.ACCESS_CONTROL_STAFF_CREATE_RESET:
      return ({
        ...state,
        updateStaffList: {
          ...state.updateStaffList,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      })

    default:
      return state
  }
}
export default AdminCourse;