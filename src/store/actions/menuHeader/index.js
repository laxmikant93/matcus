import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";
import { MENUHEADERTYPES } from "./actionTypes";
import menuHeaderRequest from "./Request";

//get Menu Header list
export const getMenuHeaderList = (id) => {
  return (dispatch) => {
    dispatch({
      type: MENUHEADERTYPES.GET_MENU_HEADER_LIST_LOADING,
      loading: true,
    })
    menuHeaderRequest.get(menuHeaderRequest.menuHeaderEndpoint.getdynamicHeader.replace("_Id_", id),
      (success) => {
        dispatch({
          type: MENUHEADERTYPES.GET_MENU_HEADER_LIST_LOADED,
          payload: success.data
        })
      },
      error => {
        dispatch({
          type: MENUHEADERTYPES.GET_MENU_HEADER_LIST_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}

export const getMenuHeaderListReset = () => {
  return (dispatch) => {
    dispatch({
      type: MENUHEADERTYPES.GET_MENU_HEADER_LIST_RESET,
      payload: []
    })
  }
}

// update Menu header
export const updateMenuHeader = (data, id) => {
  return (dispatch) => {
    dispatch({
      type: MENUHEADERTYPES.UPDATE_MENU_HEADER_LOADING,
      loading: true,
    })

    menuHeaderRequest.patch(menuHeaderRequest.menuHeaderEndpoint.patchdynamicHeader.replace("_Id_", id),
      data,
      (success) => {
        dispatch({
          type: MENUHEADERTYPES.UPDATE_MENU_HEADER_LOADED,
          payload: success.data
        })
        dispatch(showSuccessPopup("Updated Successfully"));
      },
      error => {
        dispatch({
          type: MENUHEADERTYPES.UPDATE_MENU_HEADER_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}

export const updateMenuHeaderReset = () => {
  return (dispatch) => {
    dispatch({
      type: MENUHEADERTYPES.UPDATE_MENU_HEADER_RESET,
      payload: []
    })
  }
}

export const dynamicMenuHeaders = subdomain => {
  return dispatch => {
    dispatch({
      type: MENUHEADERTYPES.DYNAMIC_MENU_HEADERS_LOADING,
      payload: {}
    })
    menuHeaderRequest.get(
      menuHeaderRequest.menuHeaderEndpoint.dynamicMenuSubheaders.replace('__SUBDOMAIN__', subdomain),
      (success) => {
        if (success.data.total === 1) {
          dispatch({
            type: MENUHEADERTYPES.DYNAMIC_MENU_HEADERS,
            payload: success.data
          })
        }
      },
      error => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}