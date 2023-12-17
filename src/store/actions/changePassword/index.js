// action type
import { changePasswordActionType } from "./actionTypes";
import changePasswordRequest from './changePasswordRequest';
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const changePasswordData = (data) => {
    return dispatch => {

        // paramaters to send post req (url, postData, onSuccess, onError, headerType="auth") 
        changePasswordRequest.post(changePasswordRequest.changePasswordEndpoint.changePasswordUrl, data,
            (success) => {

                dispatch({
                    type: changePasswordActionType.CHANGE_PASSWORD,
                    payload: success.data
                })

                if (success.data.message !== "Password changed") {
                    dispatch(setCommonError(success.data.message));
                } else {
                    dispatch(showSuccessPopup('Password changed successfully.'))
                }
            },
            error => {
                dispatch(setCommonError(error.message))
            }
        );
    }
}
export const PrivateDomainChangePasswordData = (data) => {
    return dispatch => {

        // paramaters to send post req (url, postData, onSuccess, onError, headerType="auth") 
        changePasswordRequest.post(changePasswordRequest.changePasswordEndpoint.privateDomainChangePasswordUrl, data,
            (success) => {
                dispatch({
                    type: changePasswordActionType.CHANGE_PASSWORD,
                    payload: success.data
                })

                if (success.data.message !== "Password changed") {
                    dispatch(setCommonError(success.data.message));
                } else {
                    dispatch(showSuccessPopup('Password changed successfully.'))
                }
            },
            error => {
                dispatch(setCommonError(error.message))
            }
        );
    }
}



export const passwordChangedTrue = (id, data) => {
    return dispatch => {

        // paramaters to send post req (url, postData, onSuccess, onError, headerType="auth") 
        changePasswordRequest.patch(changePasswordRequest.changePasswordEndpoint.changedPasswordTrue.replace("__ID__", id), data,
            (success) => {

                dispatch({
                    type: changePasswordActionType.PASSWORD_CHANGED_TRUE,
                    payload: success.data
                })
            },
            error => {
                dispatch(setCommonError(error.message))
            }
        );
    }
}