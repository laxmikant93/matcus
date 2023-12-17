import { DEMOREQUEST } from "../actions/requestDemo/actionTypes"

const DEMOREQUEST_INITITAL_STATE = {
  post:{
    data:[],
    loading:false,
    error:false,
    success:false,
  },
  emailExistError:{
    data:[],
    loading:false,
    emailExistError:false,
    success:false
  }

}


const courseHeader = (state = DEMOREQUEST_INITITAL_STATE, { type, payload }) => {
  switch (type) {
    case DEMOREQUEST.POSTDEMODATA:
      return {
        ...state,
        post: {
          ...state.post,
          data: payload,
          loading: false,
          success: true,
        }
      }
      case DEMOREQUEST.INVALID_EMAIL_ERROR: {
        return {
          ...state,
          emailExistError: {
            ...state.emailExistError,
            success: true,
            data: payload,
            error:true
          },
        };
      }
      case DEMOREQUEST.RESET_ERROR: {
        return {
          ...state,
          emailExistError: {
            ...state.emailExistError,
            success: false,
            error:false,
            data: {},
          },
        };
      }
    case DEMOREQUEST.POSTDEMODATALOADING:
      return {
        ...state,
        post: {
          ...state.post,
          success: false,
          loading: true,
        }
      }
    
    case DEMOREQUEST.RESETDEMOREQUEST:
      return {
          ...state,
        post :{
          ...state.post,
          data:[],
          loading:false,
          error:false,
          success:false,
        }
      }
    default:
      return state;

  }

}
export default courseHeader;