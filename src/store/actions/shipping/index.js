import { ShippingActionTypes } from "./actionTypes";
import ShippingRequest from "./ShippingRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const getShippingList = (busID) => {
  return dispatch => {
    dispatch({
      type: ShippingActionTypes.SHIPPING_GET_LOADING,
      payload: [],
    })
    ShippingRequest.get(ShippingRequest.ShippingRequestEndpoint.getshippinglist.replace("__BUS__", busID), (success) => {

      dispatch({
        type: ShippingActionTypes.SHIPPING_GET_LOADED,
        payload: success.data.data
      })

    },
      error => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: ShippingActionTypes.SHIPPING_GET_ERROR,
          payload: []
        })
      });
  }
}
export const resetShippingList = () => {
  return dispatch => {
    dispatch({
      type: ShippingActionTypes.SHIPPING_GET_RESET,
      payload: [],
    })
  }
}

export const createShipping = (data, busID) => {
  return (dispatch) => {
    dispatch({
      type: ShippingActionTypes.SHIPPING_CREATE_LOADING
    })
    ShippingRequest.post(ShippingRequest.ShippingRequestEndpoint.createshipping.replace("__BUS__", busID), data, (success) => {
      dispatch({
        type: ShippingActionTypes.SHIPPING_CREATE_LOADED,
        payload: success.data.data
      })

    },
      error => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: ShippingActionTypes.SHIPPING_CREATE_ERROR,
          payload: []
        })
      });

  }
}

export const resetCreateShipping = () => {
  return dispatch => {
    dispatch({
      type: ShippingActionTypes.SHIPPING_CREATE_RESET,
      payload: [],
    })
  }
}

export const editShipping = (data, shippingId) => {
  return (dispatch) => {
    dispatch({
      type: ShippingActionTypes.SHIPPING_EDIT_LOADING
    })
    ShippingRequest.patch(ShippingRequest.ShippingRequestEndpoint.editshipping.replace("__ID__", shippingId),
      data,
      (success) => {
        dispatch({
          type: ShippingActionTypes.SHIPPING_EDIT_LOADED,
          payload: success.data.data
        })
      },
      error => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: ShippingActionTypes.SHIPPING_EDIT_ERROR,
          payload: []
        })
      });
  }
}

export const resetEditShipping = () => {
  return dispatch => {
    dispatch({
      type: ShippingActionTypes.SHIPPING_EDIT_RESET,
      payload: [],
    })
  }
}

export const getSingleShipping = (shippingId, busID) => {
  return dispatch => {
    dispatch({
      type: ShippingActionTypes.SHIPPING_SINGLE_GET_LOADING,
      payload: [],
    })
    ShippingRequest.get(ShippingRequest.ShippingRequestEndpoint.getshippingsingle.replace("__ID__", shippingId).replace("__BUS__", busID), (success) => {
      dispatch({
        type: ShippingActionTypes.SHIPPING_SINGLE_GET_LOADED,
        payload: success.data.data
      })

    },
      error => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: ShippingActionTypes.SHIPPING_SINGLE_GET_ERROR,
          payload: []
        })
      });

  }
}

export const resetSingleShipping = () => {
  return dispatch => {
    dispatch({
      type: ShippingActionTypes.SHIPPING_SINGLE_GET_RESET,
      payload: [],
    })
  }
}

export const deleteShipping = (shippingId) => {
  return (dispatch) => {
    dispatch({
      type: ShippingActionTypes.SHIPPING_DELETE_LOADING
    })
    ShippingRequest.delete(ShippingRequest.ShippingRequestEndpoint.deleteShipping.replace("__ID__", shippingId), (success) => {
      dispatch({
        type: ShippingActionTypes.SHIPPING_DELETE_SUCCESS,
        payload: success.data.data
      })
    },
      error => {
        dispatch(setCommonError(error.message))
      });
  }
}

export const resetDeleteShipping = () => {
  return (dispatch) => {
    dispatch({
      type: ShippingActionTypes.SHIPPING_DELETE_RESET
    })
  }
}

export const getExistingStates = (busID, shippingId) => {
  return dispatch => {
    dispatch({
      type: ShippingActionTypes.SHIPPING_EXISTING_STATES_LOADING,
      payload: [],
    })
    ShippingRequest.get(ShippingRequest.ShippingRequestEndpoint.getExistingState.replace("__BUSID__", busID).replace("__SHIPPINGID__", shippingId), (success) => {

      dispatch({
        type: ShippingActionTypes.SHIPPING_EXISTING_STATES_LOADED,
        payload: success.data.data
      })

    },
      error => {
        dispatch(setCommonError(error.message))
      });
  }
}

export const resetExistingStates = () => {
  return (dispatch) => {
    dispatch({
      type: ShippingActionTypes.SHIPPING_EXISTING_STATES_RESET
    })
  }
}