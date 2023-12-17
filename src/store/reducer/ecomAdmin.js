import { Ecomm_Admin_ActionTypes } from "../actions/ecomAdmin/ActionType"

const ECOM_ADMIN_INITIAL_STATE = {
  list: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  create: {
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
  editSelection: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  editDrag: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  expandList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
}

const ecomAdmin = (state = ECOM_ADMIN_INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_LIST_LOADING:
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

    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_LIST_LOADED:
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

    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_LIST_ERROR:
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
    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_LIST_RESET:
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
    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_CREATING:
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

    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_CREATED:

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
          data: payload,
          success: true,
        }
      })

    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_CREATE_ERROR:
      return ({
        ...state,
        create: {
          ...state.create,
          data: payload,
          loading: false,
          success: false,
          error: true,
        }
      })
    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_CREATE_RESET:
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
    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_LOADING:
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

    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_LOADED:

      return ({
        ...state,
        edit: {
          ...state.edit,
          data: payload,
          loading: false,
          success: true,
          error: false,
        },
        list: {
          ...state.list,
          data: payload,
          success: true,
        }
      })

    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_ERROR:
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
    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_RESET:
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
    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_POSITION_LOADING:
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

    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_POSITION_LOADED:

      return ({
        ...state,
        edit: {
          ...state.edit,
          data: payload,
          loading: false,
          success: true,
          error: false,
        },
        list: {
          ...state.list,
          data: payload,
          success: true,
        }
      })

    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_POSITION_ERROR:
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
    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_POSITION_RESET:
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
    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_DRAG_LOADING:
      return ({
        ...state,
        editDrag: {
          ...state.editDrag,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })

    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_DRAG_LOADED:

      return ({
        ...state,
        editDrag: {
          ...state.editDrag,
          data: payload,
          loading: false,
          success: true,
          error: false,
        },
        list: {
          ...state.list,
          data: payload,
          success: true,
        }
      })

    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_DRAG_ERROR:
      return ({
        ...state,
        editDrag: {
          ...state.editDrag,
          data: [],
          loading: false,
          success: false,
          error: true,
        }
      })
    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_DRAG_RESET:
      return ({
        ...state,
        editDrag: {
          ...state.editDrag,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      })
    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_SELECTION_LOADED:
      return ({
        ...state,
        editSelection: {
          ...state.editSelection,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })
    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EDIT_SELECTION_RESET:
      return ({
        ...state,
        editSelection: {
          ...state.editSelection,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      })
    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EXPAND_LIST:
      return ({
        ...state,
        expandList: {
          ...state.expandList,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })
    case Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EXPAND_LIST_REST:
      return ({
        ...state,
        expandList: {
          ...state.expandList,
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
// let data = {}
// let filterData
// let subCatfilterData
// let subCatindexData
// let indexData
// let finalData = []
// if (payload.category_level === "1") {
//   data = {
//     owner: payload.owner,
//     business: payload.business,
//     category_level: "1",
//     subCategoryName: payload.subCategoryName,
//     categoryId: payload.categoryId,
//     _id: payload._id
//   }
//   filterData = state.list.data.find((item) => item._id === data.categoryId)
//   indexData = state.list.data.indexOf(filterData)
//   let inputFields = state.list.data
//   inputFields[indexData].subcategories.push(data)
//   finalData = inputFields

// }
// if (payload.category_level === 2) {
//   data = {
//     owner: payload.owner,
//     business: payload.business,
//     category_level: "2",
//     subSubCategoryName: payload.subSubCategoryName,
//     subCategoryId: payload.subCategoryId,
//     _id: payload._id
//   }

//   filterData = state.list.data.find((item) => item._id === data.categoryId)
//   indexData = state.list.data.indexOf(filterData)
//   subCatfilterData = state.list.data[indexData].subcategories.find((item) => item._id === data.categoryId)
//   subCatindexData = state.list.data[indexData].subcategories.indexOf(subCatfilterData)
//   let inputFields = state.list.data
//   inputFields[indexData].subcategories[subCatindexData].subsubcategories.push(data)
//   finalData = inputFields

// }
// if (payload.category_level === 0) {
//   data = {
//     owner: payload.owner,
//     business: payload.business,
//     category_level: 0,
//     categoryName: payload.categoryName,
//     _id: payload._id
//   }
//   finalData = state.list.data.concat(data)
// }
export default ecomAdmin;