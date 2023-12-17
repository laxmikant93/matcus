import { setCommonError } from "../../commonerror";
import CurrencyRequest from "../request/currency";
import { CurrencyActionTypes } from "../type/currency";


export const getCurrencyList = (val, type) => {
  return (dispatch) => {
    dispatch({
      type: CurrencyActionTypes.GET_ADMIN_CURRENCY_LIST_LOADING,
    });
    CurrencyRequest.get(
      CurrencyRequest.endpoint.adminCurrencies
        .replace("__BUSINESS__", type === 'business' ? val : '')
        .replace("__DOMAIN__", type === 'domain' ? val : '')
        .replace("__SUBDOMAIN__", type === 'subdomain' ? val : ''),
      (success) => {
        // console.log(success.data.data);
        dispatch({
          type: CurrencyActionTypes.GET_ADMIN_CURRENCY_LIST_SUCCESS,
          payload: success.data.data
        });
      },
      (error) => {
        dispatch({
          type: CurrencyActionTypes.GET_ADMIN_CURRENCY_LIST_FAIL,
          payload: error.message
        });
      }
    )
  }
}

export const selectCurrency = (val) => {
  return (dispatch) => {
    try {
      dispatch({
        type: CurrencyActionTypes.SELECTED_CURRENCY_SUCCESS,
        payload: val
      });
    } catch (error) {
      dispatch(setCommonError('Failed to select currency'));
    }
  }
}