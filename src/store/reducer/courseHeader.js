import { COURSEHEADERTYPES } from "../actions/courseHeader/actionType"


const COURSEHEADER_INITIAL_STATE = {
  list: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  update: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  post:{
    data:[],
    loading:false,
    error:false,
    success:false,
  }
}


const courseHeader = (state = COURSEHEADER_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case COURSEHEADERTYPES.COURSEHEADERREAD:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          loading: false,
          success: true,
        }
      }

    case COURSEHEADERTYPES.COURSEHEADERLOADING:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: false,
          loading: true,
        }
      }
    

      case COURSEHEADERTYPES.POSTCOURSELOADING:
        return {
          ...state.list,
          post : {
            ...state.post,
            loading:true,
            success:false
          }
        }
      
      case COURSEHEADERTYPES.COURSEHEADERPOST :
        return {
          ...state,
          post : {
            ...state.post,
            data: payload,
            success: true,
          }
        }
      
    case COURSEHEADERTYPES.COURSEHEADERUPDATE:
      return {
        ...state,
        update: {
          ...state.update,
          data: {},
          success: true
        }, 
        list: {
          ...state.list,
          data: payload,
          success:true,
        }
      }

    case COURSEHEADERTYPES.RESETCOURSEHEADER:
      return (COURSEHEADER_INITIAL_STATE)
    default:
      return state;

  }

}
export default courseHeader;