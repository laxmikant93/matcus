import REGISTER_INSTITUTE_TYPE from "../actions/RegisterInstitute/ActionType"

const INITIAL_STATE = {
  data: {},
  isLoaded: false,
  success: false
}

const RegisterSubDomain = ((state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case REGISTER_INSTITUTE_TYPE.POST_INSTITUTE_OFFLINE: {
      return {
        ...state,
        data: payload,
        isLoaded: true,
        success: true
      }
    }
    case REGISTER_INSTITUTE_TYPE.POST_INSTITUTE_ONLINE: {
      return {
        ...state,
        data: payload.data,
        isLoaded: true,
        success: payload.status===201 || payload.statusText === "Created" ? true : false
      }
    }
    default:
      return state
  }
})

export default RegisterSubDomain;