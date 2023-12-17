import { Access_ControlActionTypes } from "./actionType";
import AccessControlRequest from "./AccessControlRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const getAllSTAFFList = (insID, kind) => {
  return dispatch => {

    dispatch({
      type: Access_ControlActionTypes.ACCESS_CONTROL_STAFF_LIST_LOADING,
      payload: [],
    })

    AccessControlRequest.get(AccessControlRequest.AccessControlEndpoint.getTeahcerAccessControl.replace("__INSID__", insID).replace("__KIND__", kind), (success) => {
      dispatch({
        type: Access_ControlActionTypes.ACCESS_CONTROL_STAFF_LIST_LOADED,
        payload: success.data
      })

    },
      error => {
        dispatch(setCommonError(error.message))

        dispatch({
          type: Access_ControlActionTypes.ACCESS_CONTROL_STAFF_LIST_ERROR,
          payload: []
        })
      });

  }
}

export const resetSTAFFList = () => {
  return dispatch => {

    dispatch({
      type: Access_ControlActionTypes.ACCESS_CONTROL_STAFF_LIST_RESET,
      payload: [],
    })
  }
}

export const updateStaffAccess = (data) => {
  
  return dispatch => {

    dispatch({
      type: Access_ControlActionTypes.ACCESS_CONTROL_STAFF_CREATING,
      payload: [],
    })

    AccessControlRequest.post(AccessControlRequest.AccessControlEndpoint.updateStaffAccessControl, data, (success) => {

      dispatch({
        type: Access_ControlActionTypes.ACCESS_CONTROL_STAFF_CREATED,
        payload: success.data
      })
      dispatch(showSuccessPopup("Updated Successfully..!!"))
    },
      error => {
        dispatch(setCommonError(error.message))

        dispatch({
          type: Access_ControlActionTypes.ACCESS_CONTROL_STAFF_CREATE_ERROR,
          payload: []
        })
      });

  }
}

