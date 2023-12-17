import { HOMEPAGE_VIDEOPOPUP_TYPES } from "../actions/homePage/actionTypes"

const HOMEPAGE_VIDEOPOPUP_INITIAL_STATE = {
  isOpen: false,
}

function homepageVideoPopup(state = HOMEPAGE_VIDEOPOPUP_INITIAL_STATE, { type }) {
  switch (type) {
    case HOMEPAGE_VIDEOPOPUP_TYPES.HOMEPAGE_VIDEOPOPUP_OPEN:
      return ({
        ...state,
        isOpen: true,
      })

    case HOMEPAGE_VIDEOPOPUP_TYPES.HOMEPAGE_VIDEOPOPUP_CLOSE:
      return ({
        ...state,
        isOpen: false,
      })

    default:
      return state
  }
}

export default homepageVideoPopup