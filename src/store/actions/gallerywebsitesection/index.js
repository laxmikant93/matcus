import { GALLERY_WEBSITE_SECTION_LIST_AT } from "./actionType";
import GalleryWebsiteListRequest from "./GalleryWebsiteRequest";
import { setCommonError } from "../commonerror"

export const gallerywebsiteData = (id, type) => {
    return dispatch => {

        GalleryWebsiteListRequest.get(GalleryWebsiteListRequest.GalleryWebsiteListEndpoint.GalleryWebsiteList.replace("__ID__", id).replace("type", type), (success) => {

            dispatch({
                type: GALLERY_WEBSITE_SECTION_LIST_AT.GALLERY_WEBSITE_SECTION_LIST,
                payload: success.data.gallery
            })
        },
            error => {
                dispatch(setCommonError(error.message))
            }
        );
    }
}

