import { USERSIDEAPPOINTMENTTYPES } from "../actions/bookAppoinmentUserSide/actionType"

const USER_SIDE_APPOINTMENT_INITIAL_TYPES = {
  getusermylist: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  getBookingSort: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  edituserBookingList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  }
}
const bookAppointmentUserside = (state = USER_SIDE_APPOINTMENT_INITIAL_TYPES, { type, payload }) => {

  switch (type) {
    case USERSIDEAPPOINTMENTTYPES.GET_USER_SIDE_BOOKING_LIST_LOADING:
      return ({
        ...state,
        getusermylist: {
          ...state.getusermylist,
          data: [],
          loading: true,
          success: false,
          error: false

        }
      })

    case USERSIDEAPPOINTMENTTYPES.GET_USER_SIDE_BOOKING_LIST_LOADED:
      return ({
        ...state,
        getusermylist: {
          ...state.getusermylist,
          loading: false,
          success: true,
          error: false,
          data: payload
        }
      })

    case USERSIDEAPPOINTMENTTYPES.GET_USER_SIDE_BOOKING_LIST_ERROR:
      return ({
        ...state,
        getusermylist: {
          ...state.getusermylist,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case USERSIDEAPPOINTMENTTYPES.GET_USER_SIDE_BOOKING_LIST_RESET:
      return ({
        ...state,
        getusermylist: {
          ...state.getusermylist,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })



    case USERSIDEAPPOINTMENTTYPES.GET_USER_SIDE_BOOKING_LIST_SORT_LOADED:
      return ({
        ...state,
        getusermylist: {
          ...state.getusermylist,
          loading: false,
          success: true,
          error: false,
          data: payload
        }
      })
    case USERSIDEAPPOINTMENTTYPES.GET_SEARCH_USER_SIDE_BOOKING_LIST_LOADED:
      return ({
        ...state,
        getusermylist: {
          ...state.getusermylist,
          loading: false,
          success: true,
          error: false,
          data: payload
        }
      })

    case USERSIDEAPPOINTMENTTYPES.EDIT_USER_LIST_LOADING:
      return ({
        ...state,
        edituserBookingList: {
          ...state.edituserBookingList,
          data: [],
          loading: true,
          success: false,
          error: false

        }
      })

    case USERSIDEAPPOINTMENTTYPES.EDIT_USER_LIST_LOADED:
      return ({
        ...state,
        getusermylist: {
          ...state.getusermylist,
          data: state.getusermylist.data.map(
            (content) => content._id === payload._id ? {
              ...content, isStatus: payload.isStatus
            } : content
          ), success: true,
        }
      })
    default:
      return state
  }
}

export default bookAppointmentUserside;