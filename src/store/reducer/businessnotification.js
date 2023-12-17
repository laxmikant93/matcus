import { Business_Notification_Type } from "../actions/businessnotification/actionTypes";

const Business_Notification = {
  list: {
    data: [],
    unseen: 0,
    success: false,
    loading: false,
    error: false,
    NewNotification: false
  }
};

export const businessnotification = (state = Business_Notification, { type, payload }) => {
  switch (type) {
    case Business_Notification_Type.GET_ALL_BUSINESS_NOTIFICATIONS_LOADED: {
      if (payload.message === "Success") {
        return {
          ...state,
          list: {
            ...state.list,
            data: payload.data,
            unseen: payload.unseen ? payload.unseen : 0,
            success: true,
            loading: false,
            error: false,
          },
        };
      } else {
        return {
          ...state,
          list: {
            ...state.list,
            data: [],
            success: true,
            loading: false,
            error: false,
          },
        };
      }

    }
    case Business_Notification_Type.GET_ALL_BUSINESS_NOTIFICATIONS_LOADING: {
      return {
        ...state,
        list: {
          ...state.list,
          data: [],
          success: false,
          loading: true,
          error: false,
        },
      };

    }

    case Business_Notification_Type.UPDATE_BUSINESS_NOTIFICATIONS: {
      return {
        ...state,
        list: {
          ...state.list,
          unseen: state.list.unseen + 1,
          data: [payload, ...state.list.data],
          success: true,
          loading: false,
          error: false,
          NewNotification: true
        },
      };

    }
    case Business_Notification_Type.RESET_SEEN_NOTIFICATIONS: {
      return {
        ...state,
        list: {
          ...state.list,
          unseen: 0
        }
      }
    }
    default:
      return state;
  }
};

export default businessnotification;