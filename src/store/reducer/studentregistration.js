import { studentRegActionType } from "../actions/studentregistration/actionTypes";

const INS_INITIAL_STATE = {
  loading: false,
  success: false,
  error: "",
  data: "",
};


const studentregistration = (state = INS_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case studentRegActionType.STD_TOKEN_LOADING:
      return {
        ...state,
        loading: true,
      };

    case studentRegActionType.STD_TOKEN_LOADED:
      return {
        ...state,
        loading: false,
        success: true,
        data: payload,
      };

    case studentRegActionType.STD_TOKEN_LOADING_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        data: payload,
      };


    default:
      return state;
  }
};

export default studentregistration;