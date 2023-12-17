import { findGalleryList, findGalleryListMore, hideGalleryPopup } from "../../store/actions/gallerypopup";
export const GalleryPopupMapStateToProps = state => {
    return {
        user: state.user,
        galleryImages: state.gallerypopup
    }
}

export const GalleryPopupMapDispatchToProps = dispatch => {
    return {
        loadgallery: (galleryId, kind, limit = 10, industry) => dispatch(findGalleryList(galleryId, kind, limit, industry)),
        loadgallerymore: (galleryId, limit, skip, industry) => dispatch(findGalleryListMore(galleryId, limit, skip, industry)),
        hideGalleryPopup: () => dispatch(hideGalleryPopup())
    }
}