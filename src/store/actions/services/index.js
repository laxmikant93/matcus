import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";
import { SERVICESTYPES } from "./actionType";
import serviceRequest from "./serviceRequest";

export const readServicesList = (_id, industry) => {
  return (dispatch) => {
    dispatch({
      type: SERVICESTYPES.SERVICESLOADING,
      loading: true,
    });
    serviceRequest.get(
      serviceRequest.serviceEndpoint.servicesRead.replace("__ID__", _id).replace("__type__", industry),
      (success) => {
        dispatch({
          type: SERVICESTYPES.SERVICESREAD,
          payload: success.data.allServicesInfo,
        })
      },
      (error) => {
        setCommonError(error.message);
      }
    )
  }
}

export const selectServicesToUpdate = (_id, industry) => {
  return (dispatch) => {
    dispatch({
      type: SERVICESTYPES.SERVICES_UPDATE_SELECTION_LOADING,
      payload: {}
    });
    serviceRequest.get(
      serviceRequest.serviceEndpoint.getSingleService.replace("__Id__", _id).replace("__type__", industry),
      (success) => {
        dispatch({
          type: SERVICESTYPES.SERVICES_UPDATE_SELECTION,
          payload: success.data.ServicesData
        })
      }, (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}
export const postService = (data, type) => {
  return (dispatch) => {
    if (type === "publish") {
      dispatch({
        type: SERVICESTYPES.POSTSERVICELOADING,
        payload: {}
      })
    }
    if (type === "save") {
      dispatch({
        type: SERVICESTYPES.POST_SERVICE_LOADING_SAVE,
        payload: {}
      })
    }
    serviceRequest.post(
      serviceRequest.serviceEndpoint.servicesPost,
      data,
      (success) => {
        dispatch({
          type: SERVICESTYPES.POSTSERVICE,
          data: success.data
        })
        dispatch(showSuccessPopup("Services added successfully!"))
      }, (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}

export const deleteService = (_id, industry) => {
  return (dispatch) => {
    serviceRequest.delete(
      serviceRequest.serviceEndpoint.serviceDelete.replace("__Id__", _id).replace("__type__", industry),
      (success) => {
        dispatch({
          type: SERVICESTYPES.DELETESERVICE,
          payload: _id
        })
      }, (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}

export const searchServices = (_id, title, industry) => {
  return (dispatch) => {
    dispatch({
      type: SERVICESTYPES.SERVICESLOADING,
      loading: true,
    });
    serviceRequest.get(
      serviceRequest.serviceEndpoint.searchService.replace("__ID__", _id).replace(
        "__TITLE__",
        title
      ).replace("__type__", industry),
      (success) => {
        dispatch({
          type: SERVICESTYPES.SEARCHSERVICE,
          payload: success.data.allServicesInfo,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const sortServices = (_id, status, industry) => {
  return (dispatch) => {
    dispatch({
      type: SERVICESTYPES.SERVICESLOADING,
      loading: true,
    });
    serviceRequest.get(
      serviceRequest.serviceEndpoint.sortService.replace("__ID__", _id).replace(
        "__STATUS__",
        status
      ).replace("__type__", industry),
      (success) => {
        dispatch({
          type: SERVICESTYPES.SORTSERVICE,
          payload: success.data.allServicesInfo,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const serviceListUpdate = (_id, data) => {
  return (dispatch) => {
    dispatch({
      type: SERVICESTYPES.SERVICE_UPDATING,
      loading: true,
    });
    serviceRequest.patch(
      serviceRequest.serviceEndpoint.serviceUpdate.replace("__Id__", _id),
      data,
      (success) => {
        dispatch({
          type: SERVICESTYPES.SERVICE_LIST_UPDATE,
          payload: success.data.editInfo
        });
        dispatch(showSuccessPopup(("Service updated successfully.")))
      },
      (error) => {
        dispatch(setCommonError(error.message))
      }
    );
  }
}

export const serviceUpdate = (_id, data) => {
  return (dispatch) => {
    serviceRequest.patch(
      serviceRequest.serviceEndpoint.serviceUpdate.replace("__Id__", _id),
      data,
      (success) => {
        dispatch({
          type: SERVICESTYPES.SERVICESUPDATE,
          payload: success.data.editInfo
        });
        dispatch(showSuccessPopup(("Service status changed successfully.")))
      },
      (error) => {
        dispatch(setCommonError(error.message))
      }
    );
  }
}

export const resetServices = () => {
  return (dispatch) => {
    dispatch({
      type: SERVICESTYPES.RESETSERVICES,
      payload: {}
    });
  }
}

// export const selectAnnoucementToUpdate = _id => {
//   return dispatch => {
//       dispatch({
//           type: SERVICESTYPES.SERVICES_UPDATE_SELECTION,
//           payload: _id
//       })
//   }
// }


export const ClearselectServiceToUpdate = () => {
  return dispatch => {
    dispatch({
      type: SERVICESTYPES.SERVICES_UPDATE_SELECTION_CLEAR,
      payload: {},

    })
  }
}

export const clearUpdateServicesData = () => {
  return dispatch => {
    dispatch({
      type: SERVICESTYPES.SERVICES_UPDATING_CLEAR,
      payload: {},
    })
  }
}