import GalleryRequest from "./GalleryRequest";
import { GALLERYTYPES } from "./actionTypes";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const getGalleryData = (_id, type) => {
  return (dispatch) => {
    GalleryRequest.get(
      GalleryRequest.galleryEndpoint.gallery.replace("__ID__", _id).replace("type", type),
      (success) => {
        dispatch({
          type: GALLERYTYPES.GALLERY_READ,
          payload: success.data.gallery,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const postGalleryData = (data) => {
  return (dispatch) => {
    GalleryRequest.post(
      GalleryRequest.galleryEndpoint.gallery,
      data,
      (success) => {
        dispatch({
          type: GALLERYTYPES.GALLERY_CREATE,
          payload: success.data,
        });
        success.data._id && dispatch(galleryNotification(success.data, success.data.owner))
        dispatch(showSuccessPopup("Album added succesfully"))
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteGalleryData = (_id, type) => {
  return (dispatch) => {
    GalleryRequest.delete(
      GalleryRequest.galleryEndpoint.deleteGallery.replace(
        "__GalleryId__",
        _id
      ).replace("type", type),
      (success) => {
        dispatch({
          type: GALLERYTYPES.GALLERY_DELETE,
          payload: _id,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const editGalleryData = (_id, data) => {
  return (dispatch) => {
    GalleryRequest.patch(
      GalleryRequest.galleryEndpoint.readGalleryId.replace(
        "__GalleryId__",
        _id
      ),
      data,
      (success) => {
        dispatch({
          type: GALLERYTYPES.GALLERY_EDIT,
          payload: success.data,
        });
        dispatch(showSuccessPopup("Success"));
        success.data._id && dispatch(updateGalleryNotification(success.data, success.data.owner))

      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getGalleryDataId = (_id, type) => {
  return (dispatch) => {
    GalleryRequest.get(
      GalleryRequest.galleryEndpoint.readGalleryId.replace(
        "__GalleryId__",
        _id
      ).replace("type", type),
      (success) => {
        dispatch({
          type: GALLERYTYPES.GALLERY_READ_ID,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const selectGalleryToUpdate = (galleryId) => {
  return (dispatch) => {
    dispatch({
      type: GALLERYTYPES.GALLERY_UPDATE_SELECTION,
      payload: galleryId,
    });
  };
};


const galleryNotification = (data, id) => {
  return dispatch => {
    GalleryRequest.post(GalleryRequest.galleryEndpoint.galleryNotification.replace("id", id),
      data,
      (success) => {
      }, (error) => {
      })
  }
}

const updateGalleryNotification = (data, id) => {
  return dispatch => {
    GalleryRequest.post(GalleryRequest.galleryEndpoint.updateGalleryNotification.replace("id", id),
      data, (success) => { }, (error) => { })
  }
}