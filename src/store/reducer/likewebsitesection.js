import { LIKE_INFO_LIST_AT } from "../actions/likewebsitesection/actionType";

const LIKE_WEBSITE_LIST_INITIAL_STATE = {
    list: {
        data: [],
        loading: false,
        error: false
    },
}

const likewebsitesection = (state = LIKE_WEBSITE_LIST_INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case LIKE_INFO_LIST_AT.LIKE_LIST: {

            return {

                ...state,
                list: {
                    ...state.list,
                    data: payload,
                    success: true,
                }
            }
        }
        default:
            return state
    }
}
export default likewebsitesection;