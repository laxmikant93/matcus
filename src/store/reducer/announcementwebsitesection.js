import { ANNOUNCEMENT_WEBSITE_SECTION_LIST_AT } from "../actions/annpouncementwebsitesection/actionType";

const ANNOUNCEMENT_WEBSITE_LIST_INITIAL_STATE = {
    list: {
        data: "",
        loading: false,
        error: false
    },
}

const announcementwebsitesection = (state = ANNOUNCEMENT_WEBSITE_LIST_INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case ANNOUNCEMENT_WEBSITE_SECTION_LIST_AT.ANNOUNCEMENT_WEBSITE_LIST: {

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

export default announcementwebsitesection;