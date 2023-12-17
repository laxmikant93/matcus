import Auth from "../../Classes/Auth";
import { passwordActionType } from "../actions/forgotpassword/actionTypes";

export default (state = Auth.user(), { type, payload }) => {
    switch (type) {

        case passwordActionType.SEND_RESET_PASSWORD:
            return ({
                ...state,
                ...payload
            })

        default:
            return state;
    }

}