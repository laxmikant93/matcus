import { Ecommerce } from "../actions/ecommercePolicy/actionType";

const ECOMMERCE_POLICY_INITIAL_STATE = {
  getPolicy: {
    data: [],
    success: false,
    loading: false,
    error: false,
    reset: false
  },
  createPolicy: {
    data: [],
    success: false,
    loading: false,
    error: false,
    reset: false
  },
  updatePolicy: {
    data: [],
    success: false,
    loading: false,
    error: false,
    reset: false
  },
  resetPolicy: {
    data: [],
    success: false,
    loading: false,
    error: false,
    reset: false
  }
}


const ecommercePolicy = (state = ECOMMERCE_POLICY_INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case Ecommerce.CREATE_PRIVACY_POLICY_LOADING:
      return ({
        ...state,
        createPolicy: {
          ...state.createPolicy,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })
    case Ecommerce.CREATE_PRIVACY_POLICY_SUCCESS:
      return ({
        ...state,
        createPolicy: {
          ...state.createPolicy,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })
    case Ecommerce.CREATE_PRIVACY_POLICY_ERROR:
      return ({
        ...state,
        createPolicy: {
          ...state.createPolicy,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })
    case Ecommerce.GET_PRIVACY_POLICY_LOADING:
      return ({
        ...state,
        getPolicy: {
          ...state.getPolicy,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })
    case Ecommerce.GET_PRIVACY_POLICY_SUCCESS:
      return ({
        ...state,
        getPolicy: {
          ...state.getPolicy,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })
    case Ecommerce.GET_PRIVACY_POLICY_ERROR:
      return ({
        ...state,
        getPolicy: {
          ...state.getPolicy,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })
    case Ecommerce.UPDATE_PRIVACY_POLICY_LOADING:
      return ({
        ...state,
        updatePolicy: {
          ...state.updatePolicy,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })
    case Ecommerce.UPDATE_PRIVACY_POLICY_SUCCESS:
      return ({
        ...state,
        updatePolicy: {
          ...state.updatePolicy,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })
    case Ecommerce.UPDATE_PRIVACY_POLICY_ERROR:
      return ({
        ...state,
        updatePolicy: {
          ...state.updatePolicy,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })
    case Ecommerce.UPDATE_PRIVACY_POLICY_RESET:
      return ({
        ...state,
        updatePolicy: {
          ...state.updatePolicy,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    default:
      return state
  }
}


export default ecommercePolicy