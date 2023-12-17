import { VerifyContactActionTypes } from "./ActionType";
import VerifyContactRequest from "./verifyContactRquest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";
import { changeUserInfo } from "../user";


export const postOtpRequest = (data) => {
  return dispatch => {

    dispatch({
      type: VerifyContactActionTypes.VERIFY_CONTACT_OTP_REQUEST_LOADING,
      payload: [],
    })

    VerifyContactRequest.post(VerifyContactRequest.ContactVerify.OtpRequest, data, (success) => {


      if (success.data.message === "Contact is used." || success.data.Details.includes("Invalid Phone Number")) {
        dispatch({
          type: VerifyContactActionTypes.VERIFY_CONTACT_OTP_REQUEST_ERROR_MESSAGE,
          payload: success.data
        })
      } else {
        dispatch(showSuccessPopup("OTP sent successfully."))
        dispatch({
          type: VerifyContactActionTypes.VERIFY_CONTACT_OTP_REQUEST_LOADED,
          payload: success.data
        })
      }

    },
      error => {
        dispatch(setCommonError(error.message))
      });

  }
}
export const userWhatsappContact = (id, data) => {
  return dispatch => {

    dispatch({
      type: VerifyContactActionTypes.WHATSAPP_CONTACT_REQUEST_LOADING,
      payload: [],
    })

    VerifyContactRequest.patch(VerifyContactRequest.ContactVerify.userWhatsappContact.replace("__ID__", id), data, (success) => {

      dispatch({
        type: VerifyContactActionTypes.WHATSAPP_CONTACT_REQUEST_LOADED,
        payload: success.data
      })
    },
      error => {
        dispatch(setCommonError(error.message))
      });

  }
}

export const postOtpValidate = (data) => {
  return dispatch => {

    dispatch({
      type: VerifyContactActionTypes.VERIFY_CONTACT_OTP_VERIFY_LOADING,
      payload: [],
    })

    VerifyContactRequest.post(VerifyContactRequest.ContactVerify.OtpVerify, data, (success) => {
      if (success.Status === "Error") {
        dispatch({
          type: VerifyContactActionTypes.VERIFY_CONTACT_OTP_VERIFY_ERROR,
          payload: []
        })
      } else {
        dispatch(showSuccessPopup("OTP Verified successfully."))
        dispatch({
          type: VerifyContactActionTypes.VERIFY_CONTACT_OTP_VERIFY_LOADED,
          payload: success.data
        })
        dispatch(changeUserInfo(data.userId,
          {
            contact: data.contact,
            contact_verify: true,
            country_code: data.country_code,
            whatsapp_contact: data.whatsapp_contact,
            whatsapp_country_code: data.whatsapp_country_code
          }
        ))
      }
    },
      error => {
        dispatch(setCommonError(error.message))
      });

  }
}
export const postOtpRequestReset = () => {
  return dispatch => {

    dispatch({
      type: VerifyContactActionTypes.VERIFY_CONTACT_OTP_REQUEST_RESET,
      payload: [],
    })
  }
}