import { setCommonError } from "../commonerror";
import GalleryUploadRequest from "./GalleryUploadRequest";
import { GALLERYUPLOADTYPES } from "./actionTypes";
import { showSuccessPopup } from "../successmessagepopup";

export const getGalleryUploadData = (_id, type) => {
  return (dispatch) => {
    GalleryUploadRequest.get(
      GalleryUploadRequest.galleryuploadEndpoint.galleryUpload.replace("__GalleryDataId__", _id).replace("type", type),
      (success) => {
        dispatch({
          type: GALLERYUPLOADTYPES.GALLERYUPLOAD_READ,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getGalleryUploadSingleData = (_id, type) => {
  return (dispatch) => {
    dispatch({
      type: GALLERYUPLOADTYPES.GALLERYUPLOAD_UPDATE_SELECTION_LOADING,
      payload: {}
    });
    GalleryUploadRequest.get(
      GalleryUploadRequest.galleryuploadEndpoint.getupdateGalleryUpload.replace(
        "__GalleryDataId__",
        _id
      ).replace("type", type),
      (success) => {
        dispatch({
          type: GALLERYUPLOADTYPES.GALLERYUPLOAD_UPDATE_SELECTION,
          payload: success.data
        })
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}

export const postGalleryUploadData = (data) => {
  return (dispatch) => {
    GalleryUploadRequest.post(
      GalleryUploadRequest.galleryuploadEndpoint.postgalleryUpload,
      data,
      (success) => {

        dispatch({
          type: GALLERYUPLOADTYPES.GALLERYUPLOAD_CREATE,
          payload: success.data,
        });
        success.data._id && dispatch(galleryNotificationUpdate(success.data, success.data.owner))
        dispatch(showSuccessPopup("Album updated succesfully"))
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
const galleryNotificationUpdate = (data, id) => {
  return dispatch => {
    GalleryUploadRequest.post(GalleryUploadRequest.galleryuploadEndpoint.updateGalleryUploadNotification.replace("id", id),
      data,
      (success) => {
      }, (error) => {
      })
  }
}

export const deleteGalleryUploadData = (_id, type) => {
  return (dispatch) => {
    GalleryUploadRequest.delete(
      GalleryUploadRequest.galleryuploadEndpoint.deleteGalleryUpload.replace(
        "__GalleryUploadId__",
        _id
      ).replace("type", type),
      (success) => {
        dispatch({
          type: GALLERYUPLOADTYPES.GALLERYUPLOAD_DELETE,
          payload: _id,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const editGalleryUploadData = (_id, data) => {
  return (dispatch) => {
    GalleryUploadRequest.patch(
      GalleryUploadRequest.galleryuploadEndpoint.updateGalleryUpload.replace(
        "__GalleryDataId__",
        _id
      ),
      data,
      (success) => {
        dispatch({
          type: GALLERYUPLOADTYPES.GALLERYUPLOAD_EDIT,
          payload: success.data,
        });
        dispatch(showSuccessPopup("File Updated succesfully"))
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const resetGalleryUploadDataInfo = () => {
  return (dispatch) => {
    dispatch({
      type: GALLERYUPLOADTYPES.GALLERYUPLOAD_RESET,
      payload: {},
    });
  };
};
