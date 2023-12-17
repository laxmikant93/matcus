import { setCommonError } from "../commonerror";
import { USERSIDEAPPOINTMENTTYPES } from "./actionType";
import UserSideListAppointmentRequest from "./request";
import { showSuccessPopup } from "../successmessagepopup";

//postAppointment
export const getuserBookingList = (userID, serviceid, industry) => {
  return (dispatch) => {
    dispatch({
      type: USERSIDEAPPOINTMENTTYPES.GET_USER_SIDE_BOOKING_LIST_LOADING,
      loading: true,
    })

    UserSideListAppointmentRequest.get(UserSideListAppointmentRequest.UserListEndpoint.getuserBookingList.replace("user", userID).replace("SERVICEID", serviceid).replace("__type__", industry),
      (success) => {
        dispatch({
          type: USERSIDEAPPOINTMENTTYPES.GET_USER_SIDE_BOOKING_LIST_LOADED,
          payload: success.data.appointmentInfo
        })
      },
      error => {
        dispatch({
          type: USERSIDEAPPOINTMENTTYPES.GET_USER_SIDE_BOOKING_LIST_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}
export const resetGetusermylist = () => {
  return (dispatch) => {
    dispatch({
      type: USERSIDEAPPOINTMENTTYPES.GET_USER_SIDE_BOOKING_LIST_RESET,
      payload: []
    })
  }
}


export const getUserBookingListSort = (userID, sort, serviceid, industry) => {
  return (dispatch) => {
    dispatch({
      type: USERSIDEAPPOINTMENTTYPES.GET_USER_SIDE_BOOKING_LIST_LOADING,
      loading: true,
    })

    UserSideListAppointmentRequest.get(UserSideListAppointmentRequest.UserListEndpoint.getUserBookingListSort.replace("user", userID).replace("_VALUE_", sort).replace("SERVICEID", serviceid).replace("__type__", industry),
      (success) => {
        dispatch({
          type: USERSIDEAPPOINTMENTTYPES.GET_USER_SIDE_BOOKING_LIST_SORT_LOADED,
          payload: success.data.appointmentInfo
        })
      },
      error => {
        dispatch({
          type: USERSIDEAPPOINTMENTTYPES.GET_USER_SIDE_BOOKING_LIST_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}



export const getBookinguserListSearch = (userID, serviceid, search, industry) => {
  return (dispatch) => {
    dispatch({
      type: USERSIDEAPPOINTMENTTYPES.GET_USER_SIDE_BOOKING_LIST_LOADING,
      payload: [],
    })
    UserSideListAppointmentRequest.get(UserSideListAppointmentRequest.UserListEndpoint.getBookinguserListSearch.replace("user", userID).replace("SERVICEID", serviceid).replace("_VALUE_", search).replace("__type__", industry),
      (success) => {
        dispatch({
          type: USERSIDEAPPOINTMENTTYPES.GET_SEARCH_USER_SIDE_BOOKING_LIST_LOADED,
          payload: success.data.appointmentInfo
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: USERSIDEAPPOINTMENTTYPES.GET_USER_SIDE_BOOKING_LIST_ERROR,
          payload: []
        })
      }
    );
  }
}
export const resetGetBookingListSearch = () => {
  return (dispatch) => {
    dispatch({
      type: USERSIDEAPPOINTMENTTYPES.GET_SEARCH_USER_SIDE_BOOKING_LIST_RESET,
      payload: []
    })
  }
}



export const editusermylist = (id, industry, data) => {
  return (dispatch) => {
    dispatch({
      type: USERSIDEAPPOINTMENTTYPES.EDIT_USER_LIST_LOADING,
      payload: [],
    })
    UserSideListAppointmentRequest.patch(UserSideListAppointmentRequest.UserListEndpoint.editusermylist.replace("id", id).replace("__type__", industry), data,
      (success) => {
        dispatch({
          type: USERSIDEAPPOINTMENTTYPES.EDIT_USER_LIST_LOADED,
          payload: success.data.data

        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: USERSIDEAPPOINTMENTTYPES.EDIT_USER_LIST_ERROR,
          payload: []
        })
      }
    );
  }
}