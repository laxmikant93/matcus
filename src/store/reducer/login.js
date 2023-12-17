import { LOGINTYPES } from "../actions/login/actionType";
import { SERVICESTYPES } from "../actions/services/actionType";

const LOGIN_INITIAL_STATE = {
  emailLogin: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  
};

const login = (state = LOGIN_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case LOGINTYPES.EMAIL_LOGIN_LOADING:
      return {
        ...state,
        emailLogin: {
          ...state.emailLogin,
          data: [],
          loading: true,
          success: false,
          error:false
        },
      };
      case LOGINTYPES.EMAIL_LOGIN_SUCCESS:
        return {
          ...state,
          emailLogin: {
            ...state.emailLogin,
            data: payload,
            loading: false,
            success: true,
            error:false
          },
        };
        case LOGINTYPES.EMAIL_LOGIN_RESET:
        return {
          ...state,
          emailLogin: {
            ...state.emailLogin,
            data: [],
            loading: false,
            success: false,
            error:false
          },
        };
    default:
      return state;
  }
};
export default login;