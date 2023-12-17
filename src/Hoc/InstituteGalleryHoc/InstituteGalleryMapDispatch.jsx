import { findGallery, findGalleryMore } from "../../store/actions/institutegallery";
import { showGalleryPopup } from "../../store/actions/gallerypopup";

export const INS_GALLERY_MAP_STATE_TO_PROPS = state => {
    return {
        user: state.user,
        institutegallery: state.institutegallery
    }
}


export const INS_GALLERY_MAP_DISPATCH_TO_PROPS = dispatch => {
    return {
        loadgallery: (instituteId, industry) => dispatch(findGallery(instituteId, industry)),
        loadgallerymore: (instituteId, limit, skip, industry) => dispatch(findGalleryMore(instituteId, limit, skip, industry)),
        opnegallerypopup: (galleryId, industry) => dispatch(showGalleryPopup(galleryId, industry)),
    }
}