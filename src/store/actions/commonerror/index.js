import {ERROR_ACTION_TYPES} from "./actionTypes";
export const setCommonError = errordata => {
    return dispatch => {
        dispatch({
            type:ERROR_ACTION_TYPES.SET_ERROR,
            payload:errordata
        })
    }
}

export const hideError = () => {
    return dispatch => {
        dispatch({
            type:ERROR_ACTION_TYPES.HIDE_ERROR,
            payload:{}
        })
    }
}