import { Ecomm_Admin_ActionTypes } from "./ActionType";
import EcomAdminRequest from "./EcomAdminRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const getAllCategoryList = (insID) => {
  return dispatch => {

    dispatch({
      type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_LIST_LOADING,
      payload: [],
    })

    EcomAdminRequest.get(EcomAdminRequest.EcomAdminEndpoint.getCategoryEcomAdmin.replace("__BUSINESS__", insID), (success) => {
      dispatch({
        type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_LIST_LOADED,
        payload: success.data

      })
    },
      error => {
        dispatch(setCommonError(error.message))

        dispatch({
          type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_LIST_RESET,
          payload: []
        })
      });
  }
}

export const resetSTAFFList = () => {
  return dispatch => {

    dispatch({
      type: Ecomm_Admin_ActionTypes.ACCESS_CONTROL_STAFF_LIST_RESET,
      payload: [],
    })
  }
}

export const createCategory = (data) => {

  return dispatch => {

    dispatch({
      type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_CREATING,
      payload: [],
    })

    EcomAdminRequest.post(EcomAdminRequest.EcomAdminEndpoint.createCategoryEcomAdmin, data, (success) => {
      if (success.data === "Category with Same Name exist Please Choose another name") {
        dispatch({
          type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_CREATE_ERROR,
          payload: success.data
        })
      } else {
        dispatch(showSuccessPopup("Updated Successfully..!!"))
        dispatch({
          type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_CREATED,
          payload: success.data
        })
        if (data.categoryId && data.subCategoryId) {
          dispatch({
            type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EXPAND_LIST,
            payload: {
              category: [data.categoryId],
              subCategory: [data.subCategoryId]
            }
          })
        } else if (data.categoryId) {
          dispatch({
            type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EXPAND_LIST,
            payload: {
              category: [data.categoryId],
            }
          })
        }
      }

    },
      error => {
        dispatch(setCommonError(error.message))

        dispatch({
          type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_CREATE_ERROR,
          payload: []
        })
      });

  }
}
export const EditCategory = (data, type) => {
  return dispatch => {

    dispatch({
      type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_LOADING,
      payload: [],
    })

    EcomAdminRequest.post(EcomAdminRequest.EcomAdminEndpoint.editCategoryEcomAdmin, data, (success) => {

      if (success.data === "Category with Same Name exist Please Choose another name") {
        dispatch({
          type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_ERROR,
          payload: success.data
        })
      } else {
        dispatch({
          type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_SELECTION_RESET,
          payload: [],
        })
        dispatch({
          type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_LOADED,
          payload: success.data
        })
      }
      if (type === "delete") {
        dispatch(showSuccessPopup("Category Deleted!"))

      } else {
        dispatch(showSuccessPopup("Successfully..!!"))

      }
    },
      error => {
        dispatch(setCommonError(error.message))

        dispatch({
          type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_ERROR,
          payload: []
        })
      });

  }
}
export const EditCategoryPosition = (data) => {

  return dispatch => {

    dispatch({
      type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_POSITION_LOADING,
      payload: [],
    })

    EcomAdminRequest.post(EcomAdminRequest.EcomAdminEndpoint.editCategoryPositionEcomAdmin, data, (success) => {

      dispatch({
        type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_POSITION_LOADED,
        payload: success.data
      })
      // dispatch(showSuccessPopup("Successfully..!!"))
    },
      error => {
        dispatch(setCommonError(error.message))

        dispatch({
          type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_POSITION_ERROR,
          payload: []
        })
      });

  }
}

export const EditDragDropCategory = (data) => {

  return dispatch => {

    dispatch({
      type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_DRAG_LOADING,
      payload: [],
    })
    // console.log(data, "line 154")
    EcomAdminRequest.post(EcomAdminRequest.EcomAdminEndpoint.editDragCategoryEcomAdmin.replace("__NEWPOS__", data.newPos).replace("__INS__", data.business).replace("__CAT__", data.category).replace("__SUBCAT__", data.subcategory).replace("__SUBSUBCAT__", data.subsubcategory).replace("__MOVING__", data.movinglevel).replace("__MCAT__", data.movingcategoryid).replace("__MUCAT__", data.movingcategoryupperid), data, (success) => {

      dispatch({
        type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_DRAG_LOADED,
        payload: success.data
      })
      dispatch(showSuccessPopup("Successfully..!!"))
    },
      error => {
        dispatch(setCommonError(error.message))

        dispatch({
          type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_DRAG_ERROR,
          payload: []
        })
      });

  }
}

export const EditCategoryReset = () => {

  return dispatch => {

    dispatch({
      type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_RESET,
      payload: [],
    })
  }
}
export const EditSelection = (data) => {

  return dispatch => {

    dispatch({
      type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_SELECTION_LOADED,
      payload: data,
    })
  }
}
export const EditSelectionReset = () => {

  return dispatch => {

    dispatch({
      type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_SELECTION_RESET,
      payload: [],
    })
  }
}

