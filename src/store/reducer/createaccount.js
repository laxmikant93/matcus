import {THANKYOU_USER} from "../actions/createaccount/actionType";
const USER_INITIAL_STATE = {
    success:false,
    error:"",
    data:{}
}

export default (state=USER_INITIAL_STATE, {type, payload}) => {
    switch (type) {
        case THANKYOU_USER.THANKYOU_MESSAGE:
            
            return {
                ...state,
                success:true,
                data:payload
            }

        default:
            return state
    }
}