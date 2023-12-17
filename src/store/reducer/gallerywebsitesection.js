import { GALLERY_WEBSITE_SECTION_LIST_AT } from "../actions/gallerywebsitesection/actionType";

const GALLERY_WEBSITE_LIST_INITIAL_STATE = {
    list: {
        data: [],
        loading: false,
        error: false,
        success: true,
    },
}

const gallerywebsitesection = (state = GALLERY_WEBSITE_LIST_INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GALLERY_WEBSITE_SECTION_LIST_AT.GALLERY_WEBSITE_SECTION_LIST: {
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

export default gallerywebsitesection;