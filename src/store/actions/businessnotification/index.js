import BusinessNotificationRequest from "./BusinessNotificationRequest";
import { Business_Notification_Type } from "./actionTypes";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const getBusinessAllNotifications = (businessID, activeRole, Owner, type) => {
  return (dispatch) => {
    dispatch({
      type: Business_Notification_Type.GET_ALL_BUSINESS_NOTIFICATIONS_LOADING,
      payload: [],
    });
    BusinessNotificationRequest.get(
      BusinessNotificationRequest.businessnotifications.getAllnotification.replace("businessID", businessID).replace("activeRole", activeRole).replace("Owner", Owner).replace("_TYPE_", type),
      (success) => {
        dispatch({
          type: Business_Notification_Type.GET_ALL_BUSINESS_NOTIFICATIONS_LOADED,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const UpdateBusinessNotification = (data) => {
  return (dispatch) => {
    if (data) {
      dispatch({
        type: Business_Notification_Type.UPDATE_BUSINESS_NOTIFICATIONS,
        payload: data
      })
    }
  };
};

export const resetUnseenNotification = (businessID, activeRole, Owner, type) => {
  return (dispatch) => {
    BusinessNotificationRequest.patch(
      BusinessNotificationRequest.businessnotifications.unseennotification.replace("businessID", businessID).replace("activeRole", activeRole).replace("Owner", Owner).replace("_TYPE_", type), {},
      (success) => {
        if (success.data.message === "success" && success.data.success) {
          dispatch({
            type: Business_Notification_Type.RESET_SEEN_NOTIFICATIONS,
          });
        }
      },
      (error) => {
        // dispatch(setCommonError(error.message));
      }
    );
  }
}