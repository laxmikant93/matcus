import Auth from "../../../../Classes/Auth";
import AppLinkUrl from "../../../../Common/AppLink/AppLinkUrl";
import { API_LOGIN, API_SIGNUP } from "../config";
import AuthRequest from "../request/auth"
import {
  SIGNUP_CUSTOMER_OTP_LOADING,
  SIGNUP_CUSTOMER_OTP_SUCCESS,
  SIGNUP_CUSTOMER_OTP_FAIL,
  SIGNUP_CUSTOMER_LOADING,
  SIGNUP_CUSTOMER_SUCCESS,
  SIGNUP_CUSTOMER_FAIL,
  LOGIN_CUSTOMER_LOADING,
  LOGIN_CUSTOMER_SUCCESS,
  LOGIN_CUSTOMER_FAIL,
  SAVED_CUSTOMER_LOADING,
  SAVED_CUSTOMER_SUCCESS,
  SAVED_CUSTOMER_FAIL,
  SIGNUP_CUSTOMER_OTP_RESET,
  SIGNUP_CUSTOMER_RESET,
  LOGIN_CUSTOMER_RESET,
  AuthActionTypes
} from "../type/auth";
import { postRequest } from "../utils/request";

const getSignupOtp = (domain, body, type) => async (dispatch) => {
  dispatch({ type: AuthActionTypes.SIGNUP_CUSTOMER_OTP_LOADING });
  AuthRequest.post(
    type === "privateDomain" ?
      AuthRequest.endpoint.apiSignup
        .replace("__DOMAIN__", domain) :
      AuthRequest.endpoint.apiSignupSubdomain
        .replace("__DOMAIN__", domain),
    body,
    (signupOtpResp) => {
      dispatch({ type: AuthActionTypes.SIGNUP_CUSTOMER_OTP_SUCCESS, payload: signupOtpResp.data });
    },
    (error) => {
      dispatch({ type: AuthActionTypes.SIGNUP_CUSTOMER_OTP_FAIL, payload: error });
    }
  )
};

// const getSignupOtp = (domain, body, type) => async (dispatch) => {
//   try {
//     dispatch({ type: AuthActionTypes.SIGNUP_CUSTOMER_OTP_LOADING });
//     let url = ""
//     if (type === "privateDomain") {
//       url = `${API_SIGNUP}?domain=${domain}`;
//     } else {
//       url = `${API_SIGNUP}?subdomain=${domain}`;
//     }

//     const signupOtpResp = await postRequest(url, body);

//     if (signupOtpResp.status === 200) {
//       dispatch({ type: AuthActionTypes.SIGNUP_CUSTOMER_OTP_SUCCESS, payload: signupOtpResp.data });
//     }

//   } catch (error) {

//     dispatch({ type: AuthActionTypes.SIGNUP_CUSTOMER_OTP_FAIL, payload: error });
//   }
// };

const getCustomerSignup = (domain, body, type) => async (dispatch) => {
  dispatch({ type: AuthActionTypes.SIGNUP_CUSTOMER_LOADING });
  localStorage.removeItem(`E_CUSTOMER_${window.location.href.split("//")[1].split(".")[0]}`);
  AuthRequest.post(
    type === "privateDomain" ?
      AuthRequest.endpoint.apiSignupOtpCheck
        .replace("__DOMAIN__", domain) :
      AuthRequest.endpoint.apiSignupSubdomainOtpCheck
        .replace("__DOMAIN__", domain),
    body,
    (signupResp) => {
      localStorage.setItem(`E_CUSTOMER_${window.location.href.split("//")[1].split(".")[0]}`, JSON.stringify(signupResp.data));
      dispatch({
        type: AuthActionTypes.SIGNUP_CUSTOMER_SUCCESS,
        payload: signupResp.data,
      });
    },
    (error) => {
      dispatch({ type: AuthActionTypes.SIGNUP_CUSTOMER_FAIL, payload: error });
    }
  )
};

// const getCustomerSignup = (domain, body, type) => async (dispatch) => {
//   try {
//     dispatch({ type: AuthActionTypes.SIGNUP_CUSTOMER_LOADING });
//     localStorage.removeItem(`E_CUSTOMER_${window.location.href.split("//")[1].split(".")[0]}`);
//     let url = ""
//     if (type === "privateDomain") {
//       url = `${API_SIGNUP}?domain=${domain}&otpCheck=true`;
//     } else {
//       url = `${API_SIGNUP}?subdomain=${domain}&otpCheck=true`;
//     }
//     const signupResp = await postRequest(url, body);
//     localStorage.setItem(`E_CUSTOMER_${window.location.href.split("//")[1].split(".")[0]}`, JSON.stringify(signupResp.data));
//     dispatch({
//       type: AuthActionTypes.SIGNUP_CUSTOMER_SUCCESS,
//       payload: signupResp.data,
//     });

//   } catch (error) {

//     dispatch({ type: AuthActionTypes.SIGNUP_CUSTOMER_FAIL, payload: error });
//   }
// };

export const resetCustomerOtpVerification = () => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.SIGNUP_CUSTOMER_RESET,
      payload: []
    })
  }
}
export const resetCustomerSignUp = () => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.SIGNUP_CUSTOMER_OTP_RESET,
      payload: []
    })
  }
}

const getCustomerLogin = (domain, body, type, domaintype) => async (dispatch) => {
  dispatch({ type: AuthActionTypes.LOGIN_CUSTOMER_LOADING });
  localStorage.removeItem(`E_CUSTOMER_${window.location.href.split("//")[1].split(".")[0]}`);
  AuthRequest.post(
    domaintype === "privateDomain" ?
      AuthRequest.endpoint.apiLogin
        .replace("__DOMAIN__", domain)
        .replace("__TYPE__", type) :
      AuthRequest.endpoint.apiLoginSubdomain
        .replace("__DOMAIN__", domain)
        .replace("__TYPE__", type),
    body,
    (loginResp) => {
      localStorage.setItem(`E_CUSTOMER_${window.location.href.split("//")[1].split(".")[0]}`, JSON.stringify(loginResp.data));
      dispatch({ type: AuthActionTypes.LOGIN_CUSTOMER_SUCCESS, payload: loginResp });
    },
    (error) => {
      dispatch({ type: AuthActionTypes.LOGIN_CUSTOMER_FAIL, payload: error });
    }
  )
};

// const getCustomerLogin = (domain, body, type, domaintype) => async (dispatch) => {
//   try {
//     dispatch({ type: AuthActionTypes.LOGIN_CUSTOMER_LOADING });
//     localStorage.removeItem(`E_CUSTOMER_${window.location.href.split("//")[1].split(".")[0]}`);
//     let url = ""
//     if (domaintype === "privateDomain") {
//       url = `${API_LOGIN}?domain=${domain}&type=${type}`;
//     } else {
//       url = `${API_LOGIN}?subdomain=${domain}&type=${type}`;
//     }
//     // const url = `${API_LOGIN}?type=${type}&subdomain=${domain}`;
//     const loginResp = await postRequest(url, body);
//     if (loginResp.status === 200) {
//       localStorage.setItem(`E_CUSTOMER_${window.location.href.split("//")[1].split(".")[0]}`, JSON.stringify(loginResp.data));
//       dispatch({ type: AuthActionTypes.LOGIN_CUSTOMER_SUCCESS, payload: loginResp });
//     }

//   } catch (error) {

//     dispatch({ type: AuthActionTypes.LOGIN_CUSTOMER_FAIL, payload: error });
//   }
// };

export const resetCustomerLogin = () => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.LOGIN_CUSTOMER_RESET,
      payload: []
    })
  }
}

const getSavedCustomer = () => async (dispatch) => {
  try {
    dispatch({ type: AuthActionTypes.SAVED_CUSTOMER_LOADING });
    const data = JSON.parse(localStorage.getItem(`E_CUSTOMER_${window.location.href.split("//")[1].split(".")[0]}`));
    dispatch({ type: AuthActionTypes.SAVED_CUSTOMER_SUCCESS, payload: data });

  } catch (error) {

    dispatch({ type: AuthActionTypes.SAVED_CUSTOMER_FAIL, payload: error });
  }
};
const getSavedCustomerTemplate = (data) => async (dispatch) => {
  dispatch({ type: SAVED_CUSTOMER_SUCCESS, payload: data });
};

// const getCustomerLogout = () => (dispatch) => {
//   return (dispatch)=>{
//     try {
//       // localStorage.removeItem(`E_CUSTOMER_${window.location.href.split("//")[1].split(".")[0]}`);
//       Auth.logout()
//     } catch (error) {

//     }
//   }

// };

export { getSignupOtp, getCustomerSignup, getCustomerLogin, getSavedCustomer, getSavedCustomerTemplate };
