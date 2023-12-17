import { SECTIONTITLETYPES } from "../actions/sectionTitle/actionType"

const SECTIONTITLE_INITIAL_STATE = {
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
  }
}


const sectionTitle = (state = SECTIONTITLE_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SECTIONTITLETYPES.SECTIONTITLEREAD:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          loading: false,
          success: true,
        }
      }

    case SECTIONTITLETYPES.SECTIONTITLELOADING:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: false,
          loading: true,
        }
      }

    case SECTIONTITLETYPES.SECTIONTITLEUPDATE:
      return {
        ...state,
        update: {
          ...state.update,
          data: payload,
          success: true
        },
        list: {
          ...state.list,
          data: payload,
        }
      }
    case SECTIONTITLETYPES.RESETSECTIONTITLE:
      return (SECTIONTITLE_INITIAL_STATE)
    default:
      return state;

  }

}
export default sectionTitle;