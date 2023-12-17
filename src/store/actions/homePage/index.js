import { HOMEPAGE_VIDEOPOPUP_TYPES } from "./actionTypes";

export const openHomepageVideoPopup = () => {
    return dispatch => {
        dispatch({
            type:HOMEPAGE_VIDEOPOPUP_TYPES.HOMEPAGE_VIDEOPOPUP_OPEN,
            payload:{}
        })
    }
}

export const closeHomepageVideoPopup = () => {
    return dispatch => {
        dispatch({
            type:HOMEPAGE_VIDEOPOPUP_TYPES.HOMEPAGE_VIDEOPOPUP_CLOSE,
            payload:{}
        })
    }
}