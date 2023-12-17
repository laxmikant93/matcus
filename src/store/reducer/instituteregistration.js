import { InsActionTypes } from "../actions/instituteregistration/actionTypes";

const INS_INITIAL_STATE = {
  loading: false,
  success: false,
  error: "",
  data: "",

};

const instituteregistration = (state = INS_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case InsActionTypes.INS_CREATING:
      return {
        ...state,
        loading: true,
      };

    case InsActionTypes.INS_CREATED:
      return {
        ...state,
        loading: false,
        success: true,
        data: payload,
      };

    case InsActionTypes.INS_CREATE_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        data: payload,
      };

    case InsActionTypes.INS_CREATE_RESET:
      return {
        ...INS_INITIAL_STATE,
      };

    case InsActionTypes.INS_CREATE_CHANGE_STATE:
      return {
        ...state,
        [payload.state]: payload.status,
      };

    default:
      return state;
  }
};

export default instituteregistration;