import { setCommonError } from "../../commonerror";
import { showSuccessPopup } from "../../successmessagepopup";
import inventoryRequest from "../request/inventoryRequest";
import { inventoryActions } from "../type/inventoryActions";

export const getAdminInventoryList = (busniessid, page, limit) => {
  return (dispatch) => {
    dispatch({
      type: inventoryActions.GET_ADMIN_INVENTORY_LIST_LOADING,
      payload: [],
    })
    inventoryRequest.get(inventoryRequest.endpoint.getAdminInventoryList.replace("_BUSNIESSID_", busniessid).replace("__PAGE__", page)
      .replace("__LIMIT__", limit),
      (success) => {
        dispatch({
          type: inventoryActions.GET_ADMIN_INVENTORY_LIST_SUCCESS,
          payload: success.data.data
        })
      },
      error => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: inventoryActions.GET_ADMIN_INVENTORY_LIST_ERROR,
          payload: []
        })
      });
  }
}
export const inventoryDelete = (condition, invID) => {
  return (dispatch) => {
    dispatch({
      type: inventoryActions.INVENTORY_DELETE_LOADING
    });
    inventoryRequest.delete(inventoryRequest.endpoint.inventoryDeleteReq.replace("_CONDITION_", condition).replace("_INVENTORYID_", invID),
      (success) => {
        dispatch({
          type: inventoryActions.INVENTORY_DELETE_SUCCESS,
          payload: invID,
        });
        dispatch(showSuccessPopup("Succesfully Deleted"))
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  };
}

export const resetInventoryDelete = () => {
  return (dispatch) => {
    dispatch({
      type: inventoryActions.INVENTORY_DELETE_RESET,
      payload: []
    })
  }
}
export const searchInventory = (busniessid, search) => {
  return (dispatch) => {
    dispatch({
      type: inventoryActions.GET_ADMIN_INVENTORY_LIST_LOADING,
      payload: [],
    })
    inventoryRequest.get(inventoryRequest.endpoint.searchInventoryReq.replace("_BUSNIESSID_", busniessid).replace("__SEARCH__", search),
      (success) => {
        dispatch({
          type: inventoryActions.SAERCH_INVENTORY,
          payload: success.data.data
        })
      },
      error => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: inventoryActions.GET_ADMIN_INVENTORY_LIST_ERROR,
          payload: []
        })
      });
  }
}
export const inventoryListInOutStock = (VaritionId, status) => {
  return (dispatch) => {
    dispatch({
      type: inventoryActions.GET_INVENTORY_LIST_IN_STOCK_OUT_STOCK_LOADING,
      payload: [],
    })
    inventoryRequest.get(inventoryRequest.endpoint.inventoryListInOutStock.replace("_VARIATIONID_", VaritionId).replace("_STATUSVALUE_", status),
      (success) => {
        dispatch({
          type: inventoryActions.GET_INVENTORY_LIST_IN_STOCK_OUT_STOCK_SUCCESS,
          payload: success.data.data
        })
        dispatch(showSuccessPopup("Succesfully Updated"))
      },
      error => {
        dispatch(setCommonError(error.message))
      });
  }
}