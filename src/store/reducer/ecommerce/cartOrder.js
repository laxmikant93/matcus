import {
  ADMIN_ORDER_LIST_LOADING,
  ADMIN_ORDER_LIST_SUCCESS,
  ADMIN_ORDER_LIST_FAIL,
  CHANGE_ORDER_STATUS_LOADING,
  CHANGE_ORDER_STATUS_SUCCESS,
  CHANGE_ORDER_STATUS_FAIL,
  CUSTOMER_CART_LOADING,
  CUSTOMER_CART_SUCCESS,
  CUSTOMER_CART_FAIL,
  READ_CART_LOADING,
  READ_CART_SUCCESS,
  READ_CART_FAIL,
  ADDRESS_LIST_LOADING,
  ADDRESS_LIST_SUCCESS,
  ADDRESS_LIST_FAIL,
  CUSTOMER_ORDER_DETAIL_LOADING,
  CUSTOMER_ORDER_DETAIL_SUCCESS,
  CUSTOMER_ORDER_DETAIL_FAIL,
  CUSTOMER_ORDER_DETAIL_RESET,
  CUSTOMER_ORDER_LIST_LOADING,
  CUSTOMER_ORDER_LIST_SUCCESS,
  CUSTOMER_ORDER_LIST_FAIL,
  CUSTOMER_CANCEL_ORDER_LOADING,
  CUSTOMER_CANCEL_ORDER_SUCCESS,
  CUSTOMER_CANCEL_ORDER_FAIL,
  ADDRESS_LIST_OPERATIONS_CREATE,
  ADDRESS_LIST_OPERATIONS_EDIT,
  ADDRESS_LIST_OPERATIONS_DELETE,
  ADDRESS_OPERATIONS_RESET,
  ADD_BANK_ACCOUNT_LOADING,
  ADD_BANK_ACCOUNT_SUCCESS,
  CREATE_RAZORPAY_ACCOUNT_LOADING,
  CREATE_RAZORPAY_ACCOUNT_SUCCESS,
  ADD_BANK_ACCOUNT_RESET,
  CREATE_RAZORPAY_ACCOUNT_RESET,
  CREATE_CART_ORDER_LOADING,
  CREATE_CART_ORDER_SUCCESS,
  CartActionTypes,
  UPDATE_ORDER_STATUS_LOADING,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_REJECT,
  subOrderActionType
} from "../../actions/ecommerce/type/cartOrder";
const ORDER_LIST_INITIAL_STATE = {
  adminOrderList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  adminOrderDetail: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  customerCart: {
    data: {},
    loading: false,
    success: false,
    error: false,
    postLoading: false,
    totalCartLength: 0,
  },
  customerAddressList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  customerCartQuantity: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  //getAllorders
  customerOrderList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getSingleOrderNsubOrders: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  //update status-cancell
  updateCustomerStatus: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  customerOrderDetail: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  addBankDetails: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  createRazorPayAccount: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  razorpayOrder: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  orderListReject: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  getSubOrderdList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getShipItemsList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  updateShipOrder: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getAllCustomerOrder: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  updateDeliverFailedSubOrder: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  shippingDetails: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getFailItemsList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getDeliverItemsList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
};

const orderCartListReducer = (
  state = ORDER_LIST_INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    case CartActionTypes.ADMIN_ORDER_LIST_LOADING:
      return {
        ...state,
        adminOrderList: {
          ...state.adminOrderList,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case CartActionTypes.ADMIN_ORDER_LIST_SUCCESS:
      return {
        ...state,
        adminOrderList: {
          ...state.adminOrderList,
          data: { ...payload },
          loading: false,
          error: false,
          success: true,
        },
      };
    case CartActionTypes.ADMIN_ORDER_LIST_FAIL:
      return {
        ...state,
        adminOrderList: {
          ...state.adminOrderList,
          data: [],
          loading: false,
          error: true,
          success: false,
        },
      };
    case CartActionTypes.GET_ORDER_LIST_BY_STATUS:
      return {
        ...state,
        adminOrderList: {
          ...state.adminOrderList,
          data: { ...payload },
          loading: false,
          success: true,
          error: false,
        },
      }
    case CartActionTypes.ADMIN_ORDER_LIST_RESET:
      return {
        ...state,
        adminOrderList: {
          ...state.adminOrderList,
          data: [],
          loading: false,
          success: false,
          error: false,
        },
      }
    case CartActionTypes.SEARCH_ORDER_ADMINLIST:
      return {
        ...state,
        adminOrderList: {
          ...state.adminOrderList,
          data: { ...payload },
          loading: false,
          error: false,
          success: true,
        },
      }
    case CartActionTypes.GET_ORDER_LIST_BY_DATE:
      return {
        ...state,
        adminOrderList: {
          ...state.adminOrderList,
          data: { ...payload },
          loading: false,
          error: false,
          success: true,
        },
      }
    case CartActionTypes.GET_ORDER_LIST_SORTBY_LOADING:
      // console.log("loadibf")
      return {
        ...state,
        adminOrderList: {
          ...state.adminOrderList,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case CartActionTypes.GET_ORDER_LIST_SORTBY:
      return {
        ...state,
        adminOrderList: {
          ...state.adminOrderList,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      }
    case CHANGE_ORDER_STATUS_LOADING:
    case CartActionTypes.CHANGE_ORDER_STATUS_LOADING:
      return {
        ...state,
        customerOrderDetail: {
          ...state.customerOrderDetail,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    //cancellAllorder-user
    case CartActionTypes.CHANGE_ORDER_STATUS_SUCCESS:

      return {
        ...state,
        customerOrderDetail: {
          ...state.customerOrderDetail,
          data: {
            ...state.customerOrderDetail.data,
            ...state.orderListReject.data,
            Status: payload.Status,
            shipping_partner: payload.shipping_partner,
            shipping_tracking_id: payload.shipping_tracking_id,
            cancellaion_reason: payload.cancellaion_reason,
            rejection_reason: payload.rejection_reason
          },
          loading: false,
          error: false,
          success: true,
        },
        // getSingleOrderNsubOrders: {
        //   ...state.getSingleOrderNsubOrders,
        //   data: state.getSingleOrderNsubOrders.data.map((item) => {
        //     return {
        //       ...item,
        //       selectedSubOrder: { ...item.selectedSubOrder, status: payload.status }
        //     }
        //   }),
        //   loading: false,
        //   error: false,
        //   success: true,
        // },
      };
    case CartActionTypes.CHANGE_ORDER_STATUS_FAIL:
      return {
        ...state,
        adminOrderList: {
          ...state.adminOrderList,
          data: [],
          loading: false,
          error: true,
          success: false,
        },
      };
    case CartActionTypes.CUSTOMER_CART_LOADING:
      return {
        ...state,
        customerCart: {
          ...state.customerCart,
          data: {},
          loading: true,
          error: false,
          success: false,
        },
      };
    case CartActionTypes.CUSTOMER_CART_SUCCESS:
      return {
        ...state,
        customerCart: {
          ...state.customerCart,
          data: { ...payload },
          loading: false,
          error: false,
          success: true,
        },
      };
    case CartActionTypes.CREATE_CART_ORDER_LOADING:
      return {
        ...state,
        razorpayOrder: {
          ...state.razorpayOrder,
          data: {},
          loading: true,
          error: false,
          success: false,
        },
      };
    case CartActionTypes.CREATE_CART_ORDER_SUCCESS:
      return {
        ...state,
        razorpayOrder: {
          ...state.razorpayOrder,
          data: { ...payload },
          loading: false,
          error: false,
          success: true,
        },
      };
    case CartActionTypes.CUSTOMER_CART_FAIL:
      return {
        ...state,
        customerCart: {
          ...state.customerCart,
          data: {},
          loading: false,
          error: true,
          success: false,
        },
      };
    case CartActionTypes.CUSTOMER_CART_RESET:
      return {
        ...state,
        customerCart: {
          ...state.customerCart,
          data: {},
          loading: false,
          error: false,
          success: false,
        },
      };
    case CartActionTypes.READ_CART_LOADING:
      return {
        ...state,
        customerCart: {
          ...state.customerCart,
          data: {},
          loading: true,
          error: false,
          success: false,
        },
      };
    case CartActionTypes.READ_CART_SUCCESS:
      return {
        ...state,
        customerCart: {
          ...state.customerCart,
          data: { ...payload },
          loading: false,
          error: false,
          success: true,
        },
      };
    case CartActionTypes.READ_CART_FAIL:
      return {
        ...state,
        customerCart: {
          ...state.customerCart,
          data: {},
          loading: false,
          error: true,
          success: false,
        },
      };
    case CartActionTypes.ADDRESS_LIST_LOADING:
      return {
        ...state,
        customerAddressList: {
          ...state.customerAddressList,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case CartActionTypes.ADDRESS_LIST_SUCCESS:
      return {
        ...state,
        customerAddressList: {
          ...state.customerAddressList,
          data: [...payload],
          loading: false,
          error: false,
          success: true,
        },
      };

    case CartActionTypes.ADDRESS_OPERATIONS_RESET:
      return {
        ...state,
        customerAddressList: {
          ...state.customerAddressList,
          data: [],
          loading: false,
          error: false,
          success: false,
        },
      };

    case CartActionTypes.ADDRESS_LIST_OPERATIONS_CREATE:
      return {
        ...state,
        customerAddressList: {
          ...state.customerAddressList,
          data: state.customerAddressList.data.concat(payload),
          success: true,
          loading: false,
          error: false,
        }
      };
    case CartActionTypes.ADDRESS_LIST_OPERATIONS_EDIT:

      return {
        ...state,
        customerAddressList: {
          ...state.customerAddressList,
          data: state.customerAddressList.data.map(
            (content) => content._id === payload._id ? {
              ...content, name:
                payload.name, fullAddress: payload.fullAddress,
              addressType: payload.addressType, city: payload.city,
              phone: payload.phone, state: payload.state, pinCode: payload.pinCode, landmark: payload.landmark
            }
              : content),

          success: true,
        }
      };
    case CartActionTypes.ADDRESS_LIST_OPERATIONS_DELETE:
      return {
        ...state,
        customerAddressList: {
          ...state.customerAddressList,
          data: state.customerAddressList.data.filter((item) => item._id !== payload),
          success: true,
        }
      };
    case CartActionTypes.ADDRESS_LIST_FAIL:
      return {
        ...state,
        customerAddressList: {
          ...state.customerAddressList,
          data: [],
          loading: false,
          error: true,
          success: false,
        },
      };
    case CartActionTypes.CUSTOMER_ORDER_DETAIL_LOADING:
      return {
        ...state,
        customerOrderDetail: {
          ...state.customerOrderDetail,
          data: {},
          loading: true,
          error: false,
          success: false,
        },
      };
    case CartActionTypes.CUSTOMER_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        customerOrderDetail: {
          ...state.customerOrderDetail,
          data: { ...payload },
          loading: false,
          error: false,
          success: true,
        },
      };
    case CartActionTypes.CUSTOMER_ORDER_DETAIL_FAIL:
      return {
        ...state,
        customerOrderDetail: {
          ...state.customerOrderDetail,
          data: {},
          loading: false,
          error: true,
          success: false,
        },
      };
    case CartActionTypes.CUSTOMER_ORDER_DETAIL_RESET:
      return {
        ...state,
        customerOrderDetail: {
          ...state.customerOrderDetail,
          data: {},
          loading: false,
          error: false,
          success: false,
        },
      };
    case CartActionTypes.CUSTOMER_ORDER_LIST_LOADING:
      return {
        ...state,
        customerOrderList: {
          ...state.customerOrderList,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case CartActionTypes.CUSTOMER_ORDER_LIST_SUCCESS:
      return {
        ...state,
        customerOrderList: {
          ...state.customerOrderList,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };
    case CartActionTypes.CUSTOMER_ORDER_LIST_FAIL:
      return {
        ...state,
        customerOrderList: {
          ...state.customerOrderList,
          data: [],
          loading: false,
          error: true,
          success: false,
        },
      };
    //getAllorder
    case CartActionTypes.GET_All_CUSTOMER_ORDER_LOADING:
      return {
        ...state,
        getAllCustomerOrder: {
          ...state.getAllCustomerOrder,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case CartActionTypes.GET_All_CUSTOMER_ORDER_SUCCESS:
      return {
        ...state,
        getAllCustomerOrder: {
          ...state.getAllCustomerOrder,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };
    case CartActionTypes.GET_All_CUSTOMER_ORDER_ERROR:
      return {
        ...state,
        getAllCustomerOrder: {
          ...state.getAllCustomerOrder,
          data: [],
          loading: false,
          error: true,
          success: false,
        },
      };
    //singleGet& suborders
    case CartActionTypes.GET_SINGLE_ORDER_LOADING:
      return {
        ...state,
        getSingleOrderNsubOrders: {
          ...state.getSingleOrderNsubOrders,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case CartActionTypes.GET_SINGLE_ORDER_SUCCESS:
      return {
        ...state,
        getSingleOrderNsubOrders: {
          ...state.getSingleOrderNsubOrders,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };
    case CartActionTypes.GET_SINGLE_ORDER_ERROR:
      return {
        ...state,
        getSingleOrderNsubOrders: {
          ...state.getSingleOrderNsubOrders,
          data: [],
          loading: false,
          error: true,
          success: false,
        },
      };
    //update-status by user- cancell
    case CartActionTypes.UPDATE_ORDER_STATUS_BY_CUSTOMER_LOADING:
      return {
        ...state,
        updateCustomerStatus: {
          ...state.updateCustomerStatus,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case CartActionTypes.UPDATE_ORDER_STATUS_BY_CUSTOMER_SUCCESS:
      // let data1 = {
      //   ...state.customerOrderList.data,
      //   inventory: state.getAdminInventoryList.data.inventory.map((item) => item._id === payload._id ? {
      //     ...item, outOfStock: payload.outOfStock
      //   } : item)
      // }
      // console.log(payload, "payload update")
      // console.log(state.getAllCustomerOrder.data, " state.getAllCustomerOrder")
      // console.log(state.getSingleOrderNsubOrders.data, " stategetSingleOrderNsubOrders.state")
      return {
        ...state,
        updateCustomerStatus: {
          ...state.updateCustomerStatus,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
        // getAllCustomerOrder: {
        //   data: state.getAllCustomerOrder.data.map((content) => {
        //     // console.log(content.suborders, "content.suborders.")
        //     return {
        //       ...content,
        //       suborders: content.suborders.map((item) => {
        //         return item._id === payload._id ? { ...item, status: payload.status } : item
        //       }

        //       )
        //     }
        //   }),
        //   loading: false,
        //   error: false,
        //   success: true,
        // },
        // getSingleOrderNsubOrders: {
        //   ...state.getSingleOrderNsubOrders,
        //   data: state.getSingleOrderNsubOrders.data.map((item) => {
        //     return {
        //       ...item,
        //       selectedSubOrder: { ...item.selectedSubOrder, status: payload.status }
        //     }
        //   }),
        //   loading: false,
        //   error: false,
        //   success: true,
        // },
      };
    case CartActionTypes.UPDATE_ORDER_STATUS_BY_CUSTOMER_ERROR:
      return {
        ...state,
        updateCustomerStatus: {
          ...state.updateCustomerStatus,
          data: [],
          loading: false,
          error: true,
          success: false,
        },
      };
    case CartActionTypes.UPDATE_ORDER_STATUS_BY_CUSTOMER_RESET:
      return {
        ...state,
        updateCustomerStatus: {
          ...state.updateCustomerStatus,
          data: [],
          loading: false,
          error: true,
          success: false,
        },
      };
    case CartActionTypes.CUSTOMER_CANCEL_ORDER_LOADING:
      return {
        ...state,
        customerOrderList: {
          ...state.customerOrderList,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case CartActionTypes.CUSTOMER_CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        customerOrderList: {
          ...state.customerOrderList,
          data: state.customerOrderList.data.map((content) =>
            content._id === payload._id
              ? {
                ...content,
                Status: payload.Status,
              }
              : content
          ),
          loading: false,
          error: false,
          success: true,
        },
      };
    case CartActionTypes.CUSTOMER_CANCEL_ORDER_FAIL:
      return {
        ...state,
        customerOrderList: {
          ...state.customerOrderList,
          data: [],
          loading: false,
          error: true,
          success: false,
        },
      };
    case CartActionTypes.ADD_BANK_ACCOUNT_LOADING:
      return {
        ...state,
        addBankDetails: {
          data: {},
          loading: true,
          success: false,
          error: false,
        },
      }
    case CartActionTypes.ADD_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        addBankDetails: {
          data: payload,
          loading: false,
          success: true,
          error: false,
        },
      }
    case CartActionTypes.ADD_BANK_ACCOUNT_RESET:
      return {
        ...state,
        addBankDetails: {
          data: [],
          loading: false,
          success: false,
          error: false,
        },
      }
    case CartActionTypes.CREATE_RAZORPAY_ACCOUNT_LOADING:
      return {
        ...state,
        createRazorPayAccount: {
          data: {},
          loading: true,
          success: false,
          error: false,
        }
      }
    case CartActionTypes.CREATE_RAZORPAY_ACCOUNT_SUCCESS:
      return {
        ...state,
        createRazorPayAccount: {
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      }
    case CartActionTypes.CREATE_RAZORPAY_ACCOUNT_RESET:
      return {
        ...state,
        createRazorPayAccount: {
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      }
    case CartActionTypes.ADD_TO_CART_POST_LOADING:
      return {
        ...state,
        customerCart: {
          ...state.customerCart,
          postLoading: true,
          postSuccess: false
        },
      };
    case CartActionTypes.ADD_TO_CART_POST_LOADED:
      return {
        ...state,
        customerCart: {
          ...state.customerCart,
          data: payload,
          postLoading: false,
          postSuccess: true,
          success: true,
          totalCartLength: state.customerCart.totalCartLength + 1
        },
      };
    case CartActionTypes.ADD_TO_CART_POST_RESET:
      return {
        ...state,
        customerCart: {
          ...state.customerCart,
          data: [],
          postLoading: false,
          postSuccess: false,
          success: false,
          totalCartLength: 0
        },
      };
    case CartActionTypes.CART_PATCH_LOADED:

      return {
        ...state,
        customerCart: {
          ...state.customerCart,
          data: payload,
          success: true,
          loading: false,
        },
        customerCartQuantity: {
          ...state.customerCartQuantity,
          data: [],
          loading: false,
        },
      };
    case CartActionTypes.CART_PATCH_LOADING:
      return {
        ...state,
        customerCart: {
          ...state.customerCart,
          data: [],
          postLoading: false,
          postSuccess: false,
          success: false,
        },
      };
    case CartActionTypes.CART_PATCH_ERROR:
      return {
        ...state,
        customerCart: {
          ...state.customerCart,
          data: [],
          postLoading: false,
          postSuccess: false,
          success: false,
        },
      };

    case CartActionTypes.CART_QUANTITY_LOADING:
      return {
        ...state,
        customerCartQuantity: {
          ...state.customerCartQuantity,
          data: [],
          loading: true,
          success: false,
        },
      };

    case CartActionTypes.ADD_TO_CART_POST_ERROR:
      return {
        ...state,
        customerCart: {
          ...state.customerCart,
          error: true,
        },
      };
    case CartActionTypes.ADD_TO_CART_GET_LOADING:
      return {
        ...state,
        customerCart: {
          ...state.customerCart,
          data: [],
          postLoading: false,
          success: false,
          loading: true,
        },
      };
    case CartActionTypes.ADD_TO_CART_GET_LOADED:
      return {
        ...state,
        customerCart: {
          ...state.customerCart,
          data: payload,
          postLoading: false,
          success: true,
          loading: false,
          totalCartLength: payload.length ? payload.length : 0
        },
      };
    case UPDATE_ORDER_STATUS_LOADING:
      return {
        ...state,
        orderListReject: {
          ...state.orderListReject,
          data: [],
          postLoading: false,
          success: false,
          loading: true,
        },
      };
    case UPDATE_ORDER_STATUS_SUCCESS:
      // console.log("...line no 715 ..dc", payload)
      return {
        ...state,
        orderListReject: {
          ...state.orderListReject,
          data: payload,
          success: true,
          loading: false,
        },
      };
    case UPDATE_ORDER_STATUS_REJECT:
      return {
        ...state,
        orderListReject: {
          ...state.orderListReject,
          data: [],
          success: false,
          loading: false,
          error: true
        },
      };

    case CartActionTypes.GET_ITEM_SUBORDERD_LOADING:
      return {
        ...state,
        getSubOrderdList: {
          ...state.getSubOrderdList,
          data: [],
          error: false,
          success: false,
          loading: true,
        },
      }

    case subOrderActionType.GET_ITEM_SUBORDERD_LOADED:
      // console.log("payload", payload)
      return {
        ...state,
        getSubOrderdList: {
          ...state.getSubOrderdList,
          data: payload,
          error: false,
          success: true,
          loading: false,
        },
      }

    case subOrderActionType.GET_SHIP_ITEM_LOADING:
      return {
        ...state,
        getShipItemsList: {
          ...state.getShipItemsList,
          data: [],
          error: false,
          success: false,
          loading: true
        }
      }

    case subOrderActionType.GET_SHIP_ITEM_LOADED:
      return {
        ...state,
        getShipItemsList: {
          ...state.getShipItemsList,
          data: payload,
          error: false,
          success: true,
          loading: false
        }
      }

    case subOrderActionType.UPDATE_SUBORDERD_SHIP_LOADING:
      return {
        ...state,
        updateShipOrder: {
          ...state.updateShipOrder,
          data: [],
          error: false,
          success: false,
          loading: true
        }
      }

    /*           case subOrderActionType.GET_SHIP_ITEM_LOADED:
                return{
                  ...state,
                  getShipItemsList:{
                    ...state.getShipItemsList,
                    data:payload,
                    error:false,
                    success:true,
                    loading:false
                  }
                }
            case subOrderActionType.UPDATE_SUBORDERD_SHIP_LOADING:
              return{
                ...state,
                updateShipOrder:{
                  ...state.updateShipOrder,
                  data:[],
                  error:false,
                  success:false,
                  loading:true
                }
              } */

    case subOrderActionType.UPDATE_SUBORDERD_SHIP_LOADED:
      return {
        ...state,
        updateShipOrder: {
          ...state.updateShipOrder,
          data: payload,
          error: false,
          success: true,
          loading: false
        }
      }

    case subOrderActionType.UPDATE_FAIL_DELIVR_SUBORDER_LOADING:
      return {
        ...state,
        updateDeliverFailedSubOrder: {
          ...state.updateDeliverFailedSubOrder,
          data: [],
          error: false,
          success: false,
          loading: true
        }
      }

    case subOrderActionType.UPDATE_FAIL_DELIVR_SUBORDER_LOADED:
      return {
        ...state,
        updateDeliverFailedSubOrder: {
          ...state.updateDeliverFailedSubOrder,
          data: payload,
          error: false,
          success: true,
          loading: false
        }
      }
    case subOrderActionType.GET_FAIL_ITEM_LOADING:
      return {
        ...state,
        getFailItemsList: {
          ...state.getFailItemsList,
          data: [],
          error: false,
          success: false,
          loading: true
        }
      }

    case subOrderActionType.GET_FAIL_ITEM_LOADED:
      return {
        ...state,
        getFailItemsList: {
          ...state.getFailItemsList,
          data: payload,
          error: false,
          success: true,
          loading: false
        }
      }

    case subOrderActionType.GET_DELIVER_ITEM_LOADING:
      return {
        ...state,
        getDeliverItemsList: {
          ...state.getDeliverItemsList,
          data: [],
          error: false,
          success: false,
          loading: true
        }
      }

    case subOrderActionType.GET_DELIVER_ITEM_LOADED:
      return {
        ...state,
        getDeliverItemsList: {
          ...state.getDeliverItemsList,
          data: payload,
          error: false,
          success: true,
          loading: false
        }
      }



    case CartActionTypes.GET_SHIPPING_DETAILS_LOADING:
      return {
        ...state,
        shippingDetails: {
          ...state.shippingDetails,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case CartActionTypes.GET_SHIPPING_DETAILS_LOADED:
      return {
        ...state,
        shippingDetails: {
          ...state.shippingDetails,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };
    case CartActionTypes.GET_SHIPPING_DETAILS_RESET:
      return {
        ...state,
        shippingDetails: {
          ...state.shippingDetails,
          data: [],
          loading: false,
          error: false,
          success: false,
        },
      };
    default:
      return state;
  }




};

export { orderCartListReducer };
