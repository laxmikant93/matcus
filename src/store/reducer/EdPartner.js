import { EdPartnerTYPES } from "../actions/edPartners/actionTypes"

const PARTNER_INITIAL_TYPES = {
  postPartner: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
}

const EdPartner = (state = PARTNER_INITIAL_TYPES, { type, payload }) => {

  switch (type) {
    case EdPartnerTYPES.POST_PARTNER_LOADING:
      return ({
        ...state,
        postPartner: {
          ...state.postPartner,
          data: [],
          loading: true,
          success: false,
          error: false

        }
      })

    case EdPartnerTYPES.POST_PARTNER_LOADED:
      return ({
        ...state,
        postPartner: {
          ...state.postPartner,
          loading: false,
          success: true,
          error: false,
          data: payload
        }
      })

    case EdPartnerTYPES.POST_PARTNER_RESET:
      return ({
        ...state,
        postPartner: {
          ...state.postPartner,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case EdPartnerTYPES.POST_PARTNER_ERROR:
      return ({
        ...state,
        postPartner: {
          ...state.postPartner,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    default:
      return state
  }
}

export default EdPartner;