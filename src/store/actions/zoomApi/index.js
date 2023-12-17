import {
  ZOOMAPITYPES,
  scheduleClassActionTypes,
  scheduleClaassViaGoogle,
} from "./actionTypes";
import { setCommonError } from "../commonerror";
import Axios from "axios";
import zoomrequest from "./zoomRequest";
import { showSuccessPopup } from "../successmessagepopup";

export const postUserDataOnZoom = (data, token) => {
  return (dispatch) => {
    Axios.post("https://api.zoom.us/v2/users", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        mode: "cors",
      },
    })
      .then((response) => {
        dispatch({
          type: ZOOMAPITYPES.POST_EDNEED_USER,
          payload: response,
        });
      })
      .catch((error) => {
        setCommonError(error.message);
      });
  };
};

export const generateMeeting = (zoomMeetingData, zoomUserId, token) => {
  let onlineClassdata = {};
  return (dispatch) => {
    Axios.post(
      `https://api.zoom.us/v2/users/${zoomUserId}/meetings`,
      zoomMeetingData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        onlineClassdata.token = "";

        dispatch(scheduleClass(onlineClassdata));
      })
      .catch((error) => {
        setCommonError(error.message);
      });
  };
};

export const scheduleClass = (data) => {
  return (dispatch) => {
    dispatch({
      type: scheduleClassActionTypes.SC_CREATE_LOADING,
      payload: {},
    });

    zoomrequest.post(
      zoomrequest.request.userInfo,
      data,
      (success) => {
        dispatch({
          type: scheduleClassActionTypes.SC_CREATE_LOADED,
          payload: success,
        });

        dispatch(showSuccessPopup("Class has been Successfully Schedule."));
        success.data.owner && dispatch(createOnlineClassNotification(success.data));
      },
      (error) => {
        setCommonError(error.message);
      }
    );
  };
};

export const scheduleClassViaGoogleMeet = (data) => {
  return (dispatch) => {
    dispatch({
      type: scheduleClaassViaGoogle.SCMEET_CREATE_LOADING,
      payload: {},
    });

    zoomrequest.post(
      zoomrequest.request.userInfo,
      data,
      (success) => {
      
        dispatch({
          type: scheduleClaassViaGoogle.SCMEET_CREATE_LOADED,
          payload: success,
        });
      },
      (error) => {
        setCommonError(error.message);
      }
    );
  };
};

export const createGoogleMeetEvent = (data) => {
  return (dispatch) => {
    dispatch({
      type: scheduleClaassViaGoogle.SCMEET_CREATE_EVENT_LOADING,
      payload: {},
    });

    zoomrequest.post(
      zoomrequest.request.scheduleMeet,
      data,
      (success) => {
        dispatch({
          type: scheduleClaassViaGoogle.SCMEET_CREATE_EVENT,
          payload: success,
        });

        if (!success.data.googleInfoAvailable && !success.data._id) {
          dispatch(
            setCommonError("Google Server Issue. Refresh and try again")
          );
        } else {
          dispatch(showSuccessPopup("Class has been Successfully Schedule."));
          success.data.owner && dispatch(createOnlineClassNotification(success.data));

        }
      },
      (error) => {
        setCommonError(error.message);
      }
    );
  };
};

export const hideZoomPopup = () => {
  return (dispatch) => {
    dispatch({
      type: scheduleClassActionTypes.HIDE_ZOOM_POPUP,
      payload: {},
    });
  };
};

export const setSuccessFalse = () => {
  return (dispatch) => {
    dispatch({
      type: ZOOMAPITYPES.SUCCESS_FALSE,
      payload: {},
    });
  };
};

export const resetListStore = () => {
  return (dispatch) => {
    dispatch({
      type: ZOOMAPITYPES.RESET_JOINEE_LIST,
      payload: [],
    });
  };
};

export const getAttendessList = (classID) => {
  return (dispatch) => {
    zoomrequest.get(
      zoomrequest.request.joineeList.replace("__CLASSID__", classID),
      (success) => {
        dispatch({
          type: ZOOMAPITYPES.GET_JOINEE_LIST,
          payload: success,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};


const createOnlineClassNotification=(data)=>{
  let id=data.owner;
  return dispatch=>{
    zoomrequest.post(zoomrequest.request.createonlineClassNotification.replace("id",id),
    data,(success)=>{
    },(error)=>{
    })
  }
}