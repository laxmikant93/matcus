import { Ecomm_Currency_ActionTypes } from "../actions/ecomCurrency/ActionTypes"


const ECOMMERCE_CURRENCY_INITIAL_STATE = {
  getCurrenciesList: {
    data: [],
    success: false,
    loading: false,
    error: false,
  },
  postCurrencyData: {
    data: [],
    success: false,
    loading: false,
    error: false,
  },
  getCurrencyData: {
    data: [],
    success: false,
    loading: false,
    error: false,
  },
}


const ecommerceCurrency = (state = ECOMMERCE_CURRENCY_INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case Ecomm_Currency_ActionTypes.GET_CURRENCY_LIST_LOADING:
      return ({
        ...state,
        getCurrenciesList: {
          ...state.getCurrenciesList,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case Ecomm_Currency_ActionTypes.GET_CURRENCY_LIST_LOADED:
      return ({
        ...state,
        getCurrenciesList: {
          ...state.getCurrenciesList,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })

    case Ecomm_Currency_ActionTypes.GET_CURRENCY_LIST_ERROR:
      return ({
        ...state,
        getCurrenciesList: {
          ...state.getCurrenciesList,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case Ecomm_Currency_ActionTypes.GET_CURRENCY_LIST_RESET:
      return ({
        ...state,
        getCurrenciesList: {
          ...state.getCurrenciesList,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case Ecomm_Currency_ActionTypes.POST_CURRENCY_DATA_LOADING:
      return ({
        ...state,
        postCurrencyData: {
          ...state.postCurrencyData,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case Ecomm_Currency_ActionTypes.POST_CURRENCY_DATA_LOADED:
      return ({
        ...state,
        postCurrencyData: {
          ...state.postCurrencyData,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })

    case Ecomm_Currency_ActionTypes.POST_CURRENCY_DATA_ERROR:
      return ({
        ...state,
        postCurrencyData: {
          ...state.postCurrencyData,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case Ecomm_Currency_ActionTypes.POST_CURRENCY_DATA_RESET:
      return ({
        ...state,
        postCurrencyData: {
          ...state.postCurrencyData,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case Ecomm_Currency_ActionTypes.GET_SELECTED_CURRENCY_LOADING:
      return ({
        ...state,
        getCurrencyData: {
          ...state.getCurrencyData,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case Ecomm_Currency_ActionTypes.GET_SELECTED_CURRENCY_LOADED:
      return ({
        ...state,
        getCurrencyData: {
          ...state.getCurrencyData,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })

    case Ecomm_Currency_ActionTypes.GET_SELECTED_CURRENCY_ERROR:
      return ({
        ...state,
        getCurrencyData: {
          ...state.getCurrencyData,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case Ecomm_Currency_ActionTypes.GET_SELECTED_CURRENCY_RESET:
      return ({
        ...state,
        getCurrencyData: {
          ...state.getCurrencyData,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    default:
      return state
  }
}


export default ecommerceCurrency