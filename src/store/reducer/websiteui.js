import { INSTITUTE_WEBSITE_LIST_AT } from "../actions/websiteui/actionType";

const WEBSITE_LIST_INITIAL_STATE = {
    list: {
        data: [],
        loading: false,
        success: false,
        error: false
    },

}

const websiteui = (state = WEBSITE_LIST_INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case INSTITUTE_WEBSITE_LIST_AT.INSTITUTE_WEBSITE_LIST_: {

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
export default websiteui;