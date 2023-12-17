import { guestAction } from "../../actions/ecommerce/type/guestAction";

const GUEST_ORDER_FLOW_INITIAL_STATE = {
  postGuestAddCart: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  guestCustomerCart: {
    data: [],
    loading: false,
    success: false,
    error: false,
    totalCartLength: 0

  },
  guestCartUpdate: {
    data: [],
    loading: false,
    success: false,
    error: false,

  },
  PostAddressDetails: {
    data: [],
    loading: false,
    success: false,
    error: false,

  },
  getGuestOrderBookingList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  guestLoginCartData: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },

};

const guestDataReducer = (
  state = GUEST_ORDER_FLOW_INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    case guestAction.POST_GUEST_CART_LOADING:
      return {
        ...state,
        guestCustomerCart: {
          ...state.guestCustomerCart,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case guestAction.POST_GUEST_CART_SUCCESS:
      return {
        ...state,
        guestCustomerCart: {
          ...state.guestCustomerCart,
          data: payload,
          loading: false,
          error: false,
          success: true,
          totalCartLength: state.guestCustomerCart.totalCartLength + 1
        },
      };


    case guestAction.GET_GUEST_CART_LOADING:
      return {
        ...state,
        guestCustomerCart: {
          ...state.guestCustomerCart,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case guestAction.GET_GUEST_CART_SUCCESS:
      return {
        ...state,
        guestCustomerCart: {
          ...state.guestCustomerCart,
          data: payload,
          loading: false,
          error: false,
          success: true,
          totalCartLength: payload.length ? payload.length : 0

        },
      };
    case guestAction.GET_GUEST_CART_ERROR:
      return {
        ...state,
        guestCustomerCart: {
          ...state.guestCustomerCart,
          data: [],
          loading: false,
          error: false,
          success: false,
        },
      };
    // GUEST CART REMOVE 
    case guestAction.GUEST_CART_UPDATE_LOADING:
      return {
        ...state,
        guestCartUpdate: {
          ...state.guestCartUpdate,
          data: [],
          loading: true,
          success: false,
        },
      };
    case guestAction.GUEST_CART_UPDATE_SUCCESS:
      // console.log(payload)
      return {
        ...state,
        guestCustomerCart: {
          ...state.guestCustomerCart,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
        guestCartUpdate: {
          ...state.guestCartUpdate,
          data: [],
          loading: false,
        },
      };
    case guestAction.GUEST_CART_UPDATE_ERROR:
      return {
        ...state,
        guestCartUpdate: {
          ...state.guestCartUpdate,
          data: [],
          loading: false,
          error: false,
          success: false,
        },
      };
    case guestAction.POST_PARTNER_RESET:
      return ({
        ...state,
        guestCartUpdate: {
          ...state.guestCartUpdate,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case guestAction.POST_ADDRESS_DETAILS_CART_LOADING:
      return {
        ...state,
        PostAddressDetails: {
          ...state.PostAddressDetails,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case guestAction.POST_ADDRESS_DETAILS_CART_SUCCESS:
      return {
        ...state,
        PostAddressDetails: {
          ...state.PostAddressDetails,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };

    case guestAction.POST_ADDRESS_DETAILS_CART_RESET:
      return {
        ...state,
        PostAddressDetails: {
          ...state.PostAddressDetails,
          data: [],
          loading: false,
          error: false,
          success: false,
        },
      };
    case guestAction.GET_GUEST_ORDER_LIST_LOADING:
      return {
        ...state,
        getGuestOrderBookingList: {
          ...state.getGuestOrderBookingList,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case guestAction.GET_GUEST_ORDER_LIST_SUCCESS:
      return {
        ...state,
        getGuestOrderBookingList: {
          ...state.getGuestOrderBookingList,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };



    case guestAction.GUEST_CART_UPDATE_AFTER_LOGIN_LOADING:
      return {
        ...state,
        guestLoginCartData: {
          ...state.guestLoginCartData,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case guestAction.GUEST_CART_UPDATE_AFTER_LOGIN_SUCCESS:
      return {
        ...state,
        guestLoginCartData: {
          ...state.guestLoginCartData,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };

    default:
      return state;
  }
};

export { guestDataReducer };
