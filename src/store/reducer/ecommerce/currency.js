import { CurrencyActionTypes } from "../../actions/ecommerce/type/currency";

const CURRENCY_LIST_INITIAL_STATE = {
  primaryCurrency: {
    data: {},
    loading: false,
    success: false,
    error: false,
    message: '',
  },
  secondaryCurrency: {
    data: [],
    loading: false,
    success: false,
    error: false,
    message: '',
  },
  selectedCurrency: {
    data: {},
    loading: false,
    success: false,
    error: false,
    message: '',
  },
};

const currencyListReducer = (
  state = CURRENCY_LIST_INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    case CurrencyActionTypes.GET_ADMIN_CURRENCY_LIST_LOADING:
      return {
        ...state,
        primaryCurrency: {
          ...state.primaryCurrency,
          data: {},
          loading: true,
          error: false,
          success: false,
        },
        secondaryCurrency: {
          ...state.secondaryCurrency,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case CurrencyActionTypes.GET_ADMIN_CURRENCY_LIST_SUCCESS:
      const secondary = [];
      let primary;
      payload.currencies && payload.currencies.length && payload.currencies.forEach(cur => {
        if (cur.primary === true) primary = cur;
        else secondary.push(cur);
      });
      return {
        ...state,
        primaryCurrency: {
          ...state.primaryCurrency,
          data: { ...primary },
          loading: false,
          error: false,
          success: true,
        },
        secondaryCurrency: {
          ...state.secondaryCurrency,
          data: [...secondary],
          loading: false,
          error: false,
          success: true,
        },
      };
    case CurrencyActionTypes.GET_ADMIN_CURRENCY_LIST_FAIL:
      return {
        ...state,
        primaryCurrency: {
          ...state.primaryCurrency,
          data: {},
          loading: false,
          error: true,
          success: false,
          message: payload
        },
        secondaryCurrency: {
          ...state.secondaryCurrency,
          data: [],
          loading: false,
          error: true,
          success: false,
          message: payload
        },
      };
    case CurrencyActionTypes.GET_ADMIN_CURRENCY_LIST_RESET:
      return {
        ...state,
        primaryCurrency: {
          ...state.primaryCurrency,
          data: {},
          loading: false,
          error: false,
          success: false,
        },
        secondaryCurrency: {
          ...state.secondaryCurrency,
          data: [],
          loading: false,
          error: false,
          success: false,
        },
      };
    case CurrencyActionTypes.SELECTED_CURRENCY_LOADING:
      return {
        ...state,
        selectedCurrency: {
          ...state.selectedCurrency,
          data: {},
          loading: true,
          error: false,
          success: false,
        },
      };
    case CurrencyActionTypes.SELECTED_CURRENCY_SUCCESS:
      return {
        ...state,
        selectedCurrency: {
          ...state.selectedCurrency,
          data: { ...payload },
          loading: false,
          error: false,
          success: true,
        },
      };
    case CurrencyActionTypes.SELECTED_CURRENCY_FAIL:
      return {
        ...state,
        selectedCurrency: {
          ...state.selectedCurrency,
          data: {},
          loading: false,
          error: true,
          success: false,
        },
      };
    case CurrencyActionTypes.SELECTED_CURRENCY_RESET:
      return {
        ...state,
        selectedCurrency: {
          ...state.selectedCurrency,
          data: {},
          loading: false,
          error: false,
          success: false,
        },
      };
    default:
      return state;
  }
};

export default currencyListReducer;