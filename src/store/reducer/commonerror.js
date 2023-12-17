import { ERROR_ACTION_TYPES } from "../actions/commonerror/actionTypes";

const INITIAL_ERROR_STATES = {
    show: false,
    message: ""
}

const commonerror = (state = INITIAL_ERROR_STATES, { type, payload }) => {

    switch (type) {
        case ERROR_ACTION_TYPES.SET_ERROR:
            return {
                show: true,
                message: payload
            }

        case ERROR_ACTION_TYPES.HIDE_ERROR:
            return {
                show: false,
                message: {}
            }
        default:
            return state;
    }
}

export default commonerror;