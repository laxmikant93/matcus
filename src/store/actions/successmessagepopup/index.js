import { SUCCESS_MSG_POPUP } from "./actionTypes";
export const showSuccessPopup = successmessage => {
    return dispatch => {
        dispatch({
            type: SUCCESS_MSG_POPUP.SET_SUCCESS,
            payload: successmessage
        })
    }
}

export const hideSuccessPopup = () => {
    return dispatch => {
        dispatch({
            type: SUCCESS_MSG_POPUP.HIDE_SUCCESS,
            payload: ""
        })
    }
}

export const showSuccessToast = (successmessage) => {
    return dispatch => {
        dispatch({
            type: SUCCESS_MSG_POPUP.SUCCESS_TOAST,
            payload: successmessage
        })
    }
}

export const showErrorToast = (successmessage) => {
    return dispatch => {
        dispatch({
            type: SUCCESS_MSG_POPUP.ERROR_TOAST,
            payload: successmessage
        })
    }
}

export const showWarningToast = (successmessage) => {
    return dispatch => {
        dispatch({
            type: SUCCESS_MSG_POPUP.WARNING_TOAST,
            payload: successmessage
        })
    }
}