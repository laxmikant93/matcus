import { EDNEEDYOUTUBETYPES } from "../actions/edneedYoutube/actionTypes"

const EDNEEDYOUTUBE_INITIAL_STATE = {
  list: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },

  staticVideos: {
    data: [],
    loading: false,
    error: false,
    success: false
  }

}


const edneedYoutube = (state = EDNEEDYOUTUBE_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case EDNEEDYOUTUBETYPES.GETALLYOUTUBEVIDEOS:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          loading: false,
          success: true,
        }
      }

    case EDNEEDYOUTUBETYPES.GETALLYOUTUBEVIDEOSLOADING:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: false,
          loading: true,
        }
      }
    case EDNEEDYOUTUBETYPES.SORTYOUTUBEVIDEOS:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
          loading: false,
        }
      }

    case EDNEEDYOUTUBETYPES.GET_VIDEOS_LOADING:
      return {
        ...state,
        staticVideos: {
          ...state.staticVideos,
          data: [],
          success: false,
          loading: true
        }
      }
    case EDNEEDYOUTUBETYPES.GET_VIDEOS_LOADED:
      return {
        ...state,
        staticVideos: {
          ...state.staticVideos,
          data: payload,
          success: true,
          loading: false
        }
      }
    default:
      return state;

  }



}
export default edneedYoutube;