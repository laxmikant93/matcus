

import { ShippingActionTypes } from "../actions/shipping/actionTypes"

const SHIPPING_INITIAL_STATE = {
  create: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  list: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  single: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  edit: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  existingStates: {
    data: [],
    loading: false,
    success: false,
    error: false,
  }
}

const Shipping = (state = SHIPPING_INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case ShippingActionTypes.SHIPPING_GET_LOADING:
      return ({
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })

    case ShippingActionTypes.SHIPPING_GET_LOADED:
      return ({
        ...state,
        list: {
          ...state.list,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })

    case ShippingActionTypes.SHIPPING_GET_ERROR:
      return ({
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: false,
          success: false,
          error: true,
        }
      })
    case ShippingActionTypes.SHIPPING_GET_RESET:
      return ({
        ...state,
        list: {
          ...state.list,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      })
    case ShippingActionTypes.SHIPPING_CREATE_LOADING:
      return ({
        ...state,
        create: {
          ...state.create,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })

    case ShippingActionTypes.SHIPPING_CREATE_LOADED:
      return ({
        ...state,
        create: {
          ...state.create,
          data: payload,
          loading: false,
          success: true,
          error: false,
        },
        list: {
          ...state.list,
          data: state.list.data.concat(payload),
          loading: false,
          success: true,
          error: false,
        }
      })

    case ShippingActionTypes.SHIPPING_CREATE_ERROR:
      return ({
        ...state,
        create: {
          ...state.create,
          data: [],
          loading: false,
          success: false,
          error: true,
        }
      })
    case ShippingActionTypes.SHIPPING_CREATE_RESET:
      return ({
        ...state,
        create: {
          ...state.create,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      })


    case ShippingActionTypes.SHIPPING_SINGLE_GET_LOADING:
      return ({
        ...state,
        single: {
          ...state.single,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })

    case ShippingActionTypes.SHIPPING_SINGLE_GET_LOADED:
      return ({
        ...state,
        single: {
          ...state.single,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })

    case ShippingActionTypes.SHIPPING_SINGLE_GET_ERROR:
      return ({
        ...state,
        single: {
          ...state.single,
          data: [],
          loading: false,
          success: false,
          error: true,
        }
      })
    case ShippingActionTypes.SHIPPING_SINGLE_GET_RESET:
      return ({
        ...state,
        single: {
          ...state.single,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      })

    case ShippingActionTypes.SHIPPING_EDIT_LOADING:
      return ({
        ...state,
        edit: {
          ...state.edit,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })

    case ShippingActionTypes.SHIPPING_EDIT_LOADED:
      return ({
        ...state,
        edit: {
          ...state.edit,
          data: payload,
          loading: false,
          success: true,
          error: false,
        },
        // list: {
        //   ...state.list,
        //   data: state.list.data.concat(payload),
        //   loading: false,
        //   success: true,
        //   error: false,
        // }
      })

    case ShippingActionTypes.SHIPPING_EDIT_ERROR:
      return ({
        ...state,
        edit: {
          ...state.edit,
          data: [],
          loading: false,
          success: false,
          error: true,
        }
      })
    case ShippingActionTypes.SHIPPING_EDIT_RESET:
      return ({
        ...state,
        edit: {
          ...state.edit,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      })
    case ShippingActionTypes.SHIPPING_EXISTING_STATES_LOADING:
      return ({
        ...state,
        existingStates: {
          ...state.existingStates,
          data: [],
          loading: true,
          success: false,
          error: false,
        }
      })
    case ShippingActionTypes.SHIPPING_EXISTING_STATES_LOADED:
      return ({
        ...state,
        existingStates: {
          ...state.existingStates,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })
    case ShippingActionTypes.SHIPPING_EXISTING_STATES_RESET:
      return ({
        ...state,
        existingStates: {
          ...state.existingStates,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      })
    default:
      return state
  }
}
export default Shipping;
