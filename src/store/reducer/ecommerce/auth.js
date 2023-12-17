import {
  SIGNUP_CUSTOMER_LOADING,
  SIGNUP_CUSTOMER_SUCCESS,
  SIGNUP_CUSTOMER_FAIL,
  LOGIN_CUSTOMER_LOADING,
  LOGIN_CUSTOMER_SUCCESS,
  LOGIN_CUSTOMER_FAIL,
  SAVED_CUSTOMER_LOADING,
  SAVED_CUSTOMER_SUCCESS,
  SAVED_CUSTOMER_FAIL,
  SIGNUP_CUSTOMER_OTP_SUCCESS,
  SIGNUP_CUSTOMER_OTP_RESET,
  SIGNUP_CUSTOMER_RESET,
  LOGIN_CUSTOMER_RESET,
  AuthActionTypes
} from "../../actions/ecommerce/type/auth";

const AUTH_INITIAL_STATE = {
  customerDetail: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  signUpOtp: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  login: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  vendorDetail: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  adminDetail: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
};

const ecomAuthReducer = (state = AUTH_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case AuthActionTypes.SIGNUP_CUSTOMER_LOADING:
      return {
        ...state,
        customerDetail: {
          ...state.customerDetail,
          data: {},
          loading: true,
          error: false,
          success: false,
        },
      };
    case AuthActionTypes.SIGNUP_CUSTOMER_SUCCESS:
      return {
        ...state,
        customerDetail: {
          ...state.customerDetail,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };
    case AuthActionTypes.SIGNUP_CUSTOMER_RESET:
      return {
        ...state,
        customerDetail: {
          ...state.customerDetail,
          data: [],
          loading: false,
          error: false,
          success: false,
        },
      }
    case AuthActionTypes.SIGNUP_CUSTOMER_FAIL:
      return {
        ...state,
        customerDetail: {
          ...state.customerDetail,
          data: {},
          loading: false,
          error: true,
          success: false,
        },
      };
    case AuthActionTypes.LOGIN_CUSTOMER_LOADING:
      return {
        ...state,
        login: {
          ...state.login,
          data: {},
          loading: true,
          error: false,
          success: false,
        },
      };
    case AuthActionTypes.LOGIN_CUSTOMER_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          data: { ...payload },
          loading: false,
          error: false,
          success: true,
        },
      };
    case AuthActionTypes.LOGIN_CUSTOMER_FAIL:
      return {
        ...state,
        login: {
          ...state.login,
          data: {},
          loading: false,
          error: true,
          success: false,
        },
      };

    case AuthActionTypes.LOGIN_CUSTOMER_RESET:
      return {
        ...state,
        login: {
          ...state.login,
          data: {},
          loading: false,
          error: false,
          success: false,
        },
      };
    case AuthActionTypes.SAVED_CUSTOMER_LOADING:
      return {
        ...state,
        customerDetail: {
          ...state.customerDetail,
          data: {},
          loading: true,
          error: false,
          success: false,
        },
      };
    case AuthActionTypes.SAVED_CUSTOMER_SUCCESS:
      return {
        ...state,
        customerDetail: {
          ...state.customerDetail,
          data: { ...payload },
          loading: false,
          error: false,
          success: true,
        },
      };
    case AuthActionTypes.SAVED_CUSTOMER_FAIL:
      return {
        ...state,
        customerDetail: {
          ...state.customerDetail,
          data: {},
          loading: false,
          error: true,
          success: false,
        },
      };
    case AuthActionTypes.SIGNUP_CUSTOMER_OTP_SUCCESS:
      return {
        ...state,
        signUpOtp: {
          ...state.signUpOtp,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };
    case AuthActionTypes.SIGNUP_CUSTOMER_OTP_RESET:
      return {
        ...state,
        signUpOtp: {
          ...state.signUpOtp,
          data: [],
          loading: false,
          error: false,
          success: false,
        },
      }
    default:
      return state;
  }
};

export { ecomAuthReducer };
