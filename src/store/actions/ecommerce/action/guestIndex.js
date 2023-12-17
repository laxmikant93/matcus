
import guestRequest from "../request/guestRequest";

import { showSuccessPopup } from "../../successmessagepopup";
import { guestAction } from "../type/guestAction";
import { setCommonError } from "../../commonerror";

export const postCartForGuest = (data) => {
  // console.log(data)
  return (dispatch) => {
    dispatch({
      type: guestAction.POST_GUEST_CART_LOADING,
      loading: true,
    })

    guestRequest.post(guestRequest.guestEndpoint.postCartGuest, data,
      (success) => {
        dispatch({
          type: guestAction.POST_GUEST_CART_SUCCESS,
          payload: success.data
        })
        dispatch(showSuccessPopup("Product added successfully!"));
      },
      error => {
        dispatch({
          type: guestAction.POST_GUEST_CART_ERROR,
          payload: []
        })
        // dispatch(setCommonError(error.message))
      }
    );
  }
}

export const getGuestCartDetail = (uuid, businessid) => {
  return (dispatch) => {
    dispatch({
      type: guestAction.GET_GUEST_CART_LOADING,
      loading: true,
    });
    guestRequest.get(guestRequest.guestEndpoint.getCartGuest.replace("_uuid_", uuid).replace("_BUSINESSID_", businessid),
      (success) => {
        dispatch({
          type: guestAction.GET_GUEST_CART_SUCCESS,
          payload: success.data,
        });
      },
      error => {
        dispatch({
          type: guestAction.GET_GUEST_CART_ERROR,
          payload: []
        })
        // dispatch(setCommonError(error.message))
      }
    );
  };
};

export const guestCartUpdate = (cart_id, varitaion_id, condation, user_id, busniess_id, data) => {


  return dispatch => {
    dispatch({ type: guestAction.GUEST_CART_UPDATE_LOADING, })
    guestRequest.patch(guestRequest.guestEndpoint.updateCartGuest.replace("_CART_ID_", cart_id).replace("_VARIATION_ID_", varitaion_id).replace("_CONDATION_", condation).replace("_USER_", user_id).replace("_BUSNIESS_", busniess_id), data,
      (success) => {

        dispatch({
          type: guestAction.GUEST_CART_UPDATE_SUCCESS,
          payload: success.data
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
      })
  }
}
export const resetGuestCartUpdatel = () => {
  return (dispatch) => {
    dispatch({
      type: guestAction.GUEST_CART_UPDATE_RESET,
      payload: []
    })
  }
}



export const guestafterlogincart = (user_Uuid, user_id, busniess_id, data) => {
  return dispatch => {
    dispatch({ type: guestAction.GUEST_CART_UPDATE_AFTER_LOGIN_LOADING, })
    guestRequest.patch(guestRequest.guestEndpoint.guestLoginCartUpdate.replace("_UuidD_", user_Uuid).replace("_USER_", user_id).replace("_BUSNIESS_", busniess_id), data,
      (success) => {

        dispatch({
          type: guestAction.GUEST_CART_UPDATE_AFTER_LOGIN_SUCCESS,
          payload: success.data
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
      })
  }
}
export const resetGuestafterlogincart = () => {
  return (dispatch) => {
    dispatch({
      type: guestAction.GUEST_CART_UPDATE_AFTER_LOGIN_RESET,
      payload: []
    })
  }
}



export const postAddressDetailsGuest = (data, type, domainId) => {
  // console.log(data)
  return (dispatch) => {
    dispatch({
      type: guestAction.POST_ADDRESS_DETAILS_CART_LOADING,
      loading: true,
    })

    guestRequest.post(guestRequest.guestEndpoint.postOfflineGuestData.replace("__TYPE__", type).replace("_DOMAIN_", domainId), data,
      (success) => {
        dispatch({
          type: guestAction.POST_ADDRESS_DETAILS_CART_SUCCESS,
          payload: success.data
        })
        dispatch(showSuccessPopup("Details added successfully!"));
      },
      error => {
        dispatch({
          type: guestAction.POST_ADDRESS_DETAILS_CART_ERROR,
          payload: []
        })
        // dispatch(setCommonError(error.message))
      }
    );
  }
}

export const resetPostAddressDetailsGuest = () => {
  return (dispatch) => {
    dispatch({
      type: guestAction.POST_ADDRESS_DETAILS_CART_RESET
    })
  }
}

export const getGuestOrderDetails = (businessid, UserId) => {
  return (dispatch) => {
    dispatch({
      type: guestAction.GET_GUEST_ORDER_LIST_LOADING,
      loading: true,
    });
    guestRequest.get(guestRequest.guestEndpoint.getGuestOrderDetails.replace("__BUIS__", businessid).replace("__USERID__", UserId),
      (success) => {
        dispatch({
          type: guestAction.GET_GUEST_ORDER_LIST_SUCCESS,
          payload: success.data
        });
      },
      error => {
        dispatch({
          type: guestAction.GET_GUEST_ORDER_LIST_ERROR,
          payload: []
        })
        // dispatch(setCommonError(error.message))
      }
    );
  };
};
export const clientGuestgetAllSubordersClient = (businessid, UserId) => {
  return (dispatch) => {
    dispatch({
      type: guestAction.GET_GUEST_ORDER_LIST_LOADING,
      loading: true,
    });
    guestRequest.get(guestRequest.guestEndpoint.clientGuestgetAllSubordersClient.replace("__BUIS__", businessid).replace("__USERID__", UserId),
      (success) => {
        dispatch({
          type: guestAction.GET_GUEST_ORDER_LIST_SUCCESS,
          payload: success.data
        });
      },
      error => {
        dispatch({
          type: guestAction.GET_GUEST_ORDER_LIST_ERROR,
          payload: []
        })
        // dispatch(setCommonError(error.message))
      }
    );
  };
};

export const updateShippingPrice = (data) => {
  return (dispatch) => {
    guestRequest.post(
      guestRequest.guestEndpoint.updateShippingPrice,
      data,
      (success) => {
        dispatch({
          type: guestAction.UPDATE_SHIPPING_PRICE,
          payload: success
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}