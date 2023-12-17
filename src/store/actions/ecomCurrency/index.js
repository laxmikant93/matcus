import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";
import { Ecomm_Currency_ActionTypes } from "./ActionTypes";
import EcomCurrencyRequest from "./CurrencyRequest";

export const getAllCurrencyList = () => {
  return dispatch => {

    dispatch({
      type: Ecomm_Currency_ActionTypes.GET_CURRENCY_LIST_LOADING,
      payload: [],
    })

    EcomCurrencyRequest.get(EcomCurrencyRequest.EcomCurrencyEndpoint.getCurrencyList,
      (success) => {
        dispatch({
          type: Ecomm_Currency_ActionTypes.GET_CURRENCY_LIST_LOADED,
          payload: success.data.data

        })
      },
      error => {
        dispatch(setCommonError(error.message))
      });
  }
}

export const getAllCurrencyListReset = () => {
  return dispatch => {
    dispatch({
      type: Ecomm_Currency_ActionTypes.GET_CURRENCY_LIST_RESET,
      payload: []
    })
  }
}

export const postCurrencyDetails = (id, data, changes) => {
  return dispatch => {

    dispatch({
      type: Ecomm_Currency_ActionTypes.POST_CURRENCY_DATA_LOADING,
      payload: [],
    })

    EcomCurrencyRequest.post(EcomCurrencyRequest.EcomCurrencyEndpoint.postCurrency.replace("_BUSINESS_", id), data,
      (success) => {
        dispatch({
          type: Ecomm_Currency_ActionTypes.POST_CURRENCY_DATA_LOADED,
          payload: success.data.data
        })
        if (changes) {
          dispatch(showSuccessPopup("Currency and Language Settings Changed!"));
        }
      },
      error => {
        dispatch(setCommonError(error.message))
      });

  }
}

export const postCurrencyDetailsReset = () => {
  return dispatch => {
    dispatch({
      type: Ecomm_Currency_ActionTypes.POST_CURRENCY_DATA_RESET,
      payload: []
    })
  }
}

export const getSelectedCurrencyData = (id) => {
  return dispatch => {

    dispatch({
      type: Ecomm_Currency_ActionTypes.GET_SELECTED_CURRENCY_LOADING,
      payload: [],
    })

    EcomCurrencyRequest.get(EcomCurrencyRequest.EcomCurrencyEndpoint.getSelectedCurrency.replace("_BUSINESS_", id),
      (success) => {
        dispatch({
          type: Ecomm_Currency_ActionTypes.GET_SELECTED_CURRENCY_LOADED,
          payload: success.data.data

        })
      },
      error => {
        dispatch(setCommonError(error.message))
      });
  }
}

export const getSelectedCurrencyDataReset = () => {
  return dispatch => {
    dispatch({
      type: Ecomm_Currency_ActionTypes.GET_SELECTED_CURRENCY_RESET,
      payload: []
    })
  }
}

export const deleteCurrencyDetails = (id, data) => {
  return dispatch => {

    dispatch({
      type: Ecomm_Currency_ActionTypes.DELETE_CURRENCY_DATA_LOADING,
      payload: [],
    })

    EcomCurrencyRequest.delete(EcomCurrencyRequest.EcomCurrencyEndpoint.deleteCurrency.replace("_BUSINESS_", id).replace("_CODE_", data),
      (success) => {
        dispatch({
          type: Ecomm_Currency_ActionTypes.DELETE_CURRENCY_DATA_LOADED,
          payload: data
        })
        dispatch(showSuccessPopup("Currency Deleted!"));
      },
      error => {
        dispatch(setCommonError(error.message))
      });

  }
}

export const deleteCurrencyDetailsReset = () => {
  return dispatch => {
    dispatch({
      type: Ecomm_Currency_ActionTypes.DELETE_CURRENCY_DATA_RESET,
      payload: []
    })
  }
}