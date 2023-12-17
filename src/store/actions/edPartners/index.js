import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";
import { EdPartnerTYPES } from "./actionTypes";
import EdPartnerRequest from "./request";

//postPartner
export const postPartnerDetail = (data) => {
  return (dispatch) => {
    dispatch({
      type: EdPartnerTYPES.POST_PARTNER_LOADING,
      loading: true,
    })

    EdPartnerRequest.post(EdPartnerRequest.EdPartnerEndpoint.postEdPartner,
      data,
      (success) => {
        dispatch({
          type: EdPartnerTYPES.POST_PARTNER_LOADED,
          payload: success.data
        })
        dispatch(showSuccessPopup("Thanks for submitting the details successfully, our team will connect back with you at the earliest."));
      },
      error => {
        dispatch({
          type: EdPartnerTYPES.POST_PARTNER_ERROR,
          payload: []
        })
        dispatch(setCommonError(error.message))
      }
    );
  }
}

export const resetPostPartnerDetail = () => {
  return (dispatch) => {
    dispatch({
      type: EdPartnerTYPES.POST_PARTNER_RESET,
      payload: []
    })
  }
}