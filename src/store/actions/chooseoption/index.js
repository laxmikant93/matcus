import { chooseOptionAT } from "../chooseoption/actionTypes";

export const SetChooseOption = option => {
    return dispatch => {
        dispatch({
            type:chooseOptionAT.SET_OPTION,
            payload:{option}
        })
    }
}

export const UnsetChooseOption = () => {
    return dispatch => {
        dispatch({
            type:chooseOptionAT.UNSET_OPTION,
            payload:""
        })
    }
}

