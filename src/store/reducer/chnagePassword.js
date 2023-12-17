import { forgotpasswordActionType } from "../actions/forgotpassword/actionTypes";
import { changePasswordActionType } from "../actions/changePassword/actionTypes";

const INITIAL_STATE = {
    loading: false,
    success: false,
    error: false,

    passwordchanged: {
        data: [],
        success: false,
        error: false,
    }
};


const chnagePassword = (state = INITIAL_STATE, { type, payload }) => {

    switch (type) {
        case forgotpasswordActionType.CHANGE_PASSWORD:

            return ({
                ...state,
                message: payload.message,
                loading: true,
                success: true,
                error: payload.message !== "Password changed" ? true : false,
            })

        case changePasswordActionType.PASSWORD_CHANGED_TRUE:
            return ({
                passwordchanged: {
                    ...state.passwordchanged,
                    data: payload,
                    success: true,
                    error: false,
                }
            })

        default:
            return state;
    }
}

export default chnagePassword;