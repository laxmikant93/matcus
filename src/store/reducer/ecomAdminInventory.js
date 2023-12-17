import { inventoryActions } from "../actions/ecommerce/type/inventoryActions"

const ECOM_INVENTORY_INITIAL_STATE = {
  getAdminInventoryList: {
    data: [],
    success: false,
    loading: false,
    error: false,
  },
  deleteInventory: {
    data: [],
    success: false,
    loading: false,
    error: false,
  },
  inventoryListInOutStatus: {
    data: [],
    success: false,
    loading: false,
    error: false,
  }
}
const ecomAdminInventory = (state = ECOM_INVENTORY_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case inventoryActions.GET_ADMIN_INVENTORY_LIST_LOADING:
      return ({
        ...state,
        getAdminInventoryList: {
          ...state.getAdminInventoryList,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })
    case inventoryActions.GET_ADMIN_INVENTORY_LIST_SUCCESS:
      return ({
        ...state,
        getAdminInventoryList: {
          ...state.getAdminInventoryList,
          data: payload,
          loading: false,
          success: true,
          error: false
        }

      })

    case inventoryActions.GET_ADMIN_INVENTORY_LIST_ERROR:
      return ({
        ...state,
        getAdminInventoryList: {
          ...state.getAdminInventoryList,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })
    case inventoryActions.INVENTORY_DELETE_LOADING:
      return ({
        ...state,
        deleteInventory: {
          ...state.deleteInventory,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })
    case inventoryActions.INVENTORY_DELETE_RESET:
      return ({
        ...state,
        deleteInventory: {
          ...state.deleteInventory,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })
    case inventoryActions.INVENTORY_DELETE_SUCCESS:
      // console.log(payload, "payload")
      let data = {
        ...state.getAdminInventoryList.data,
        inventory: state.getAdminInventoryList.data.inventory.filter((item) => item._id !== payload)
      }
      return ({
        ...state,
        deleteInventory: {
          ...state.deleteInventory,
          data: [],
          loading: false,
          success: true,
        },
        getAdminInventoryList: {
          ...state.getAdminInventoryList,
          data: data,
          loading: false,
          success: true,
          error: false
        }
      })
    case inventoryActions.SAERCH_INVENTORY:
      return {
        ...state,
        getAdminInventoryList: {
          ...state.getAdminInventoryList,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };
    case inventoryActions.GET_INVENTORY_LIST_IN_STOCK_OUT_STOCK_LOADING:
      return ({
        ...state,
        inventoryListInOutStatus: {
          ...state.inventoryListInOutStatus,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })
    case inventoryActions.GET_INVENTORY_LIST_IN_STOCK_OUT_STOCK_SUCCESS:
      let data2 = {
        ...state.getAdminInventoryList.data,
        inventory: state.getAdminInventoryList.data.inventory.map((item) => item._id === payload._id ? {
          ...item, outOfStock: payload.outOfStock
        } : item)
      }
      return ({
        ...state,
        inventoryListInOutStatus: {
          ...state.inventoryListInOutStatus,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        getAdminInventoryList: {
          ...state.getAdminInventoryList,
          // data: state.getAdminInventoryList.data.inventory.map((item) => item._id === payload._id ? {
          //   ...item, outOfStock: payload.outOfStock
          // } : item),
          data: data2,
          loading: false,
          success: true,
          error: false
        }

      })
    default:
      return state
  }

}
export default ecomAdminInventory