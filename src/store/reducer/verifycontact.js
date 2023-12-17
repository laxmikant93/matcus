import { VerifyContactActionTypes } from "../actions/verifycontact/ActionType";

const INITIAL_STATE = {
  OtpRequest: {
    data: [],
    loading: false,
    loaded: false,
    success: false,
    error: false,
    Errormessage: false
  },
  otpVerify: {
    data: [],
    loading: false,
    loaded: false,
    success: false,
    error: false,
  },
  whatsappUserContact: {
    data: [],
    loading: false,
    loaded: false,
    success: false,
    error: false,
  }
}

const verifycontact = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {

    case VerifyContactActionTypes.VERIFY_CONTACT_OTP_REQUEST_LOADING:
      return ({
        ...state,
        OtpRequest: {
          ...state.OtpRequest,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
          Errormessage: false
        }
      })

    case VerifyContactActionTypes.VERIFY_CONTACT_OTP_REQUEST_LOADED:
      return ({
        ...state,
        OtpRequest: {
          ...state.OtpRequest,
          data: payload,
          loading: false,
          error: false,
          loaded: true,
          success: true,
          Errormessage: false
        }
      })
    case VerifyContactActionTypes.VERIFY_CONTACT_OTP_REQUEST_ERROR_MESSAGE:
      return ({
        ...state,
        OtpRequest: {
          ...state.OtpRequest,
          data: payload,
          loading: false,
          error: true,
          Errormessage: true,
          loaded: false,
          success: false,
        }
      })

    case VerifyContactActionTypes.VERIFY_CONTACT_OTP_REQUEST_RESET:
      return ({
        ...state,
        OtpRequest: {
          ...state.OtpRequest,
          data: [],
          loading: false,
          error: false,
          loaded: false,
          success: false,
          Errormessage: false
        }
      })

    case VerifyContactActionTypes.VERIFY_CONTACT_OTP_VERIFY_ERROR:
      return ({
        ...state,
        otpVerify: {
          ...state.otpVerify,
          data: payload,
          loading: false,
          error: true,
          loaded: false,
          success: false,
        }
      })
    case VerifyContactActionTypes.VERIFY_CONTACT_OTP_VERIFY_LOADING:
      return ({
        ...state,
        otpVerify: {
          ...state.otpVerify,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
        }
      })
    case VerifyContactActionTypes.VERIFY_CONTACT_OTP_VERIFY_RESET:
      return ({
        ...state,
        otpVerify: {
          ...state.otpVerify,
          data: [],
          loading: false,
          error: false,
          loaded: false,
          success: false,
        }
      })
    case VerifyContactActionTypes.VERIFY_CONTACT_OTP_VERIFY_LOADED:
      return ({
        ...state,
        otpVerify: {
          ...state.otpVerify,
          data: payload,
          loading: false,
          error: false,
          loaded: true,
          success: true,
        }
      })
    case VerifyContactActionTypes.WHATSAPP_CONTACT_REQUEST_LOADING:
      return ({
        ...state,
        whatsappUserContact: {
          ...state.whatsappUserContact,
          data: payload,
          loading: true,
          error: false,
          loaded: false,
          success: false,
        }
      })
    case VerifyContactActionTypes.WHATSAPP_CONTACT_REQUEST_LOADED:
      return ({
        ...state,
        whatsappUserContact: {
          ...state.whatsappUserContact,
          data: payload,
          loading: false,
          error: false,
          loaded: true,
          success: true,
        }
      })
    default:
      return state;
  }
};

export default verifycontact;