import { NOTIFICATION_ACTION_TYPES } from "../actions/allnotification/actionType";

const NOTIFICATION_LIST_INITIAL_STATE = {
  bellicon: {
    data: {
      All: {
        data: [],
        len: 0
      },
      Unread: {
        data: [],
        len: 0
      }, Read: {
        data: [],
        len: 0
      }
    },
    loading: false,
    success: false,
    loaded: false,
    error: false,
  },
  notifications: {
    data: [],
    loading: false,
    loaded: false,
    success: false,
    error: false,
  },
  recentNotifi: {
    data: []
  },
  belliconType: {
    type: "Institute"
  }
}

const allnotifications = (state = NOTIFICATION_LIST_INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case NOTIFICATION_ACTION_TYPES.NOTIFICATION_BELL_ICON_LOADED: {
      return {
        ...state,
        bellicon: {
          ...state.bellicon,
          data: payload && payload.All && payload.Read && payload.Unread ? payload : state.bellicon.data,
          success: true,
          loaded: true,
          loading: false
        }
      }
    }
    case NOTIFICATION_ACTION_TYPES.NOTIFICATION_BELL_ICON_LOADING: {
      return {
        ...state,
        bellicon: {
          data: {
            All: {
              data: [],
              len: 0
            },
            Unread: {
              data: [],
              len: 0
            }, Read: {
              data: [],
              len: 0
            }
          },
          loading: true,
          success: false,
          loaded: false,
          error: false,
        }
      }
    }
    case NOTIFICATION_ACTION_TYPES.NOTIFICATION_BELL_ICON_UPDATE: {
   
      // let allbellicon = state.bellicon.data.All.data;
      // let unreadbellicon = state.bellicon.data.Unread.data;
      // let pay = [payload]
      return {
        ...state,
        bellicon: {
          ...state.bellicon,
          data: {
            ...state.bellicon.data,
            Unread: {
              data: state.bellicon.data.Unread.data.concat(payload).reverse(),
              // pay.concat(unreadbellicon),
              len: state.bellicon.data.Unread.len + 1
            },
            All: {
              data: state.bellicon.data.All.data.concat(payload).reverse(),
              //  pay.concat(allbellicon),
              len: state.bellicon.data.All.len + 1
            },

          }
        }
      }
    }

    case NOTIFICATION_ACTION_TYPES.NOTIFICATION_BELL_ICON_REDUCE_COUNT: {
      return {
        ...state,
        bellicon: {
          ...state.bellicon,
          data: {
            ...state.bellicon.data,
            All: {
              ...state.bellicon.data.All,
              len: state.bellicon.data.All.len - payload
            }
          }
        }
      }
    }

    case NOTIFICATION_ACTION_TYPES.GET_ALL_NOTIFICATIONS_LOADING: {
      return {
        ...state,
        notifications: {
          ...state.notifications,
          data: [],
          loading: true,
          loaded: false,
          success: false
        }
      }
    }
    case NOTIFICATION_ACTION_TYPES.GET_ALL_NOTIFICATIONS_LOADED: {
      return {
        ...state,
        notifications: {
          ...state.notifications,
          data: payload,
          loaded: true,
          success: true,
          loading: false,
          error: false
        }
      }
    }
    case NOTIFICATION_ACTION_TYPES.NOTIFICATION_SHOWALL_PAGE_LOADING: {
      return {
        ...state,
        notifications: {
          ...state.notifications,
          loading: true
        }
      }
    }
    case NOTIFICATION_ACTION_TYPES.NOTIFICATION_SHOWALL_PAGE_LOADED: {
      return {
        ...state,
        notifications: {
          ...state.notifications,
          data: state.notifications.data && {
            ...state.notifications.data,
            notification: state.notifications.data.notification.concat(payload.notification)
          },
          loaded: true,
          loading: false,
          success: true
        }
      }
    }
    case NOTIFICATION_ACTION_TYPES.CHANGE_BELL_ICON_TYPE: {
      return {
        ...state,
        belliconType: {
          type: payload
        }
      }
    }
    case NOTIFICATION_ACTION_TYPES.RECENT_NOTIFICATION: {
      return {
        ...state,
        recentNotifi: {
          data: payload
        }
      }
    }
    default: return state
  }
}

export default allnotifications;