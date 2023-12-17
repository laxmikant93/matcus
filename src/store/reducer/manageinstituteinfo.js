import { InsActionTypes } from "../actions/instituteregistration/actionTypes";

const INS_INITIAL_STATE = {
  loading: false,
  success: false,
  error: "",
  data: "",
  updating: false,
  updatesuccess: false,
  updateerror: "",
};

const manageinstituteinfo = (state = INS_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case InsActionTypes.INS_INFORMATION_LOADING:
      return {
        ...state,
        loading: true,
      };

    case InsActionTypes.INS_INFORMATION_LOADED:
      return {
        ...state,
        loading: false,
        success: true,
        data: payload,
      };

    case InsActionTypes.INS_INFORMATION_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        data: payload,
      };

    case InsActionTypes.INS_UPDATING:
      return {
        ...state,
        updating: true,
      };

    case InsActionTypes.INS_UPDATED:
      return {
        ...state,
        updating: false,
        updatesuccess: true,
        data: payload,
      };

    case InsActionTypes.INS_UPDATE_ERROR:
      return {
        ...state,
        updating: false,
        updateerror: true,
      };

    case InsActionTypes.INS_RESET_INFORMATION:
      return (INS_INITIAL_STATE)
    default:
      return state;
  }
};
export default manageinstituteinfo;