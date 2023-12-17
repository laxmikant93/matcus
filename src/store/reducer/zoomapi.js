import {
  ZOOMAPITYPES,
  scheduleClassActionTypes,
  scheduleClaassViaGoogle,
} from "../actions/zoomApi/actionTypes";

const INITIAL_STATE = {
  zoomuserdata: {
    id: "",
    response: [],
    loading: false,
    success: false,
  },
  data: {},
  attendessList: [],
  attendessListStatus: false,
  success: false,
  googleMeetData: {
    scheduleClassData: [],
    eventData: [],
    isTokenExpire: false,
    success: false,
  },
  googleMeetEditData: {
    scheduleClassData: [],
    eventData: [],
    isTokenExpire: false,
    success: false,
  },
};

// export default (state = INITIAL_STATE, { type, payload }) => {
const zoomClassRequest = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ZOOMAPITYPES.POST_EDNEED_USER: {
      return {
        ...state,
        zoomuserdata: {
          id: payload.id,
          response: payload,
          success: true,
          loading: true,
        },
      };
    }

    case ZOOMAPITYPES.SUCCESS_FALSE: {
      return {
        ...state,
        success: false,
        googleMeetData: {
          success: false,
        },
        googleMeetEditData: {
          success: false,
        },
      };
    }

    case ZOOMAPITYPES.GET_JOINEE_LIST: {
      return {
        ...state,
        attendessList:
          payload.data.participants === "Meeting does not exist"
            ? []
            : payload.data.participants,
        attendessListStatus: payload.status === 200 ? true : false,
      };
    }

    case ZOOMAPITYPES.RESET_JOINEE_LIST: {
      return {
        ...state,
        attendessList: [],
        attendessListStatus: false,
      };
    }

    case scheduleClassActionTypes.SC_CREATE_LOADED:
      return {
        ...state,
        data: payload.data,
        success:
          payload.status === 201 || payload.statusText === "Created"
            ? true
            : false,
      };

    case scheduleClaassViaGoogle.SCMEET_CREATE_EVENT: {
      const objData = [].concat(payload);
      return {
        ...state,
        googleMeetData: {
          eventData: payload,
          isTokenExpire:
            !payload.data.googleInfoAvailable && !payload.data._id
              ? true
              : false,
          success: objData.length > 0 ? true : false,
        },
      };
    }

    case scheduleClaassViaGoogle.SCMEET_EDIT_EVENT: {
      // const objData = [].concat(payload.data);
      return {
        ...state,
        googleMeetEditData: {
          eventData: payload.data.data,
          isTokenExpire:
            !payload.data.googleInfoAvailable && !payload.data._id
              ? true
              : false,
          success: payload.status === 200 ? true : false,
        },
      };
    }

    // .data.googleInfoAvailable
    case scheduleClaassViaGoogle.SCMEET_CREATE_LOADED: {
      return {
        ...state,
        googleMeetData: {
          scheduleClassData: payload,
          success:
            payload.status === 201 || payload.statusText === "Created"
              ? true
              : false,
        },
      };
    }

    case scheduleClassActionTypes.HIDE_ZOOM_POPUP:
      return {
        ...state,
        data: {
          ...state,
          user_exists: true,
        },
      };

    default:
      return state;
  }
};

export default zoomClassRequest;
