import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";
import { DEMOREQUEST } from "./actionTypes";
import DemoRequest from "./DemoRequest";
export const postDemoRequestData = (data) => {
  return (dispatch) => {
    dispatch({
      type: DEMOREQUEST.POSTDEMODATALOADING,
      loading: true,
    });
    DemoRequest.post(
      DemoRequest.demoRequestEndpoint.postDemoRequestData,
      data,
      (success) => {
        // if(success.data.message === "Invalid email. Please recheck and enter again"){
        //  dispatch({
        //    type: DEMOREQUEST.INVALID_EMAIL_ERROR,
        //    payload: {}
        //  })

        // }else{
        dispatch({
          type: DEMOREQUEST.POSTDEMODATA,
          payload: success.data
        })
        // dispatch(showSuccessPopup("Request Submitted Successfully. Our team will get back to you soon."))
        // }

      }, (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}

export const resetDemoRequestData = () => {
  return (dispatch) => {
    dispatch({
      type: DEMOREQUEST.RESETDEMOREQUEST,
      payload: {}
    })
  }
}
export const resetEmailApiError = () => {
  return (dispatch) => {
    dispatch({
      type: DEMOREQUEST.RESET_ERROR,
      payload: {}
    })
  }
}