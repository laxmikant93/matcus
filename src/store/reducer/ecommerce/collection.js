import {
  CollectionActionTypes
} from "../../actions/ecommerce/type/collection";

const COLLECTION_LIST_INITIAL_STATE = {
  adminCollectionList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  customerWishList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  collectionDetail: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  editCollection: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  addProductCollectionList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  createAddProductCollection: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  delete: {
    data: "",
    loading: false,
    success: false,
    error: false,
  },
};

const collectionListReducer = (
  state = COLLECTION_LIST_INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    case CollectionActionTypes.GET_COLLECTION_LIST_LOADING:
      return {
        ...state,
        adminCollectionList: {
          ...state.adminCollectionList,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case CollectionActionTypes.GET_COLLECTION_LIST_SUCCESS:
      return {
        ...state,
        adminCollectionList: {
          ...state.adminCollectionList,
          data: [...payload],
          loading: false,
          error: false,
          success: true,
        },
      };
    case CollectionActionTypes.GET_COLLECTION_LIST_FAIL:
      return {
        ...state,
        adminCollectionList: {
          ...state.adminCollectionList,
          data: [],
          loading: false,
          error: true,
          success: false,
        },
      };
    case CollectionActionTypes.GET_COLLECTION_LIST_RESET:
      return {
        ...state,
        adminCollectionList: {
          ...state.adminCollectionList,
          data: [],
          loading: false,
          error: false,
          success: false,
        },
      };


    case CollectionActionTypes.CREATE_COLLECTION_LOADING:
      return {
        ...state,
        adminCollectionList: {
          ...state.adminCollectionList,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case CollectionActionTypes.CREATE_COLLECTION_SUCCESS:
      return {
        ...state,
        adminCollectionList: {
          ...state.adminCollectionList,
          data: state.adminCollectionList.data.concat(payload),
          loading: false,
          error: false,
          success: true,
        },
      };
    case CollectionActionTypes.CREATE_COLLECTION_FAIL:
      return {
        ...state,
        adminCollectionList: {
          ...state.adminCollectionList,
          data: [],
          loading: false,
          error: true,
          success: false,
        },
      };

    case CollectionActionTypes.EDIT_COLLECTION_LOADING:
      return {
        ...state,
        adminCollectionList: {
          ...state.adminCollectionList,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case CollectionActionTypes.EDIT_COLLECTION_SUCCESS:
      return {
        ...state,
        editCollection: {
          ...state.editCollection,
          data: payload,
          loading: false,
          success: true,
        },
        // ...state,
        // adminCollectionList: {
        //   ...state.adminCollectionList,
        //   data: payload,
        //   loading: false,
        //   error: false,
        //   success: true,
        // },
      };
    case CollectionActionTypes.EDIT_COLLECTION_FAIL:
      return {
        ...state,
        adminCollectionList: {
          ...state.adminCollectionList,
          data: [],
          loading: false,
          error: true,
          success: false,
        },
      };
    case CollectionActionTypes.DELETE_COLLECTION_LOADING:
      return {
        ...state,
        delete: {
          ...state.delete,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case CollectionActionTypes.DELETE_COLLECTION_SUCCESS:
      return {
        ...state,
        delete: {
          ...state.delete,
          data: payload,
          loading: false,
          success: true,
        },
        adminCollectionList: {
          ...state.adminCollectionList,
          data: state.adminCollectionList.data.filter((item) => item._id !== payload),
          loading: false,
          error: false,
          success: true,
        },
      };
    case CollectionActionTypes.DELETE_COLLECTION_FAIL:
      return {
        ...state,
        adminCollectionList: {
          ...state.adminCollectionList,
          data: [],
          loading: false,
          error: true,
          success: false,
        },
      };
    case CollectionActionTypes.GET_COLLECTION_DETAILS_LOADING:
      return {
        ...state,
        collectionDetail: {
          ...state.collectionDetail,
          data: {},
          loading: true,
          error: false,
          success: false,
        },
      };
    case CollectionActionTypes.GET_COLLECTION_DETAILS_SUCCESS:
      // console.log(payload.CollectionInfo, "payload.CollectionInfo")
      return {
        ...state,
        collectionDetail: {
          ...state.collectionDetail,
          data: {
            collectionInfo: payload.collectionInfo[0],
            products: payload.collectionInfo.products,
          },
          // data: {
          //   collectionInfo: { ...payload.CollectionInfo },
          //   products: [...payload.products],
          // },
          loading: false,
          error: false,
          success: true,
        },
      };
    case CollectionActionTypes.GET_COLLECTION_DETAILS_FAIL:
      return {
        ...state,
        collectionDetail: {
          ...state.collectionDetail,
          data: {},
          loading: false,
          error: true,
          success: false,
        },
      };
    case CollectionActionTypes.GET_WISHLIST_LOADING:
      return {
        ...state,
        customerWishList: {
          ...state.customerWishList,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case CollectionActionTypes.GET_WISHLIST_SUCCESS:
      return {
        ...state,
        customerWishList: {
          ...state.customerWishList,
          data: [...payload],
          loading: false,
          error: false,
          success: true,
        },
      };
    case CollectionActionTypes.GET_WISHLIST_FAIL:
      return {
        ...state,
        customerWishList: {
          ...state.customerWishList,
          data: [],
          loading: false,
          error: true,
          success: false,
        },
      };
    case CollectionActionTypes.GET_WISHLIST_RESET:
      return {
        ...state,
        customerWishList: {
          ...state.customerWishList,
          data: [],
          loading: false,
          error: false,
          success: false,
        },
      };
    case CollectionActionTypes.MOVE_WISHLIST_TO_CART_LOADING:
      return {
        ...state,
        customerWishList: {
          ...state.customerWishList,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case CollectionActionTypes.MOVE_WISHLIST_TO_CART_SUCCESS:
      return {
        ...state,
        customerWishList: {
          ...state.customerWishList,
          data: [...payload],
          loading: false,
          error: false,
          success: true,
        },
      };
    case CollectionActionTypes.MOVE_WISHLIST_TO_CART_FAIL:
      return {
        ...state,
        customerWishList: {
          ...state.customerWishList,
          data: [],
          loading: false,
          error: true,
          success: false,
        },
      };

    case CollectionActionTypes.GET_ADD_PRODUCT_COLLECTION_LIST_LOADING:
      return {
        ...state,
        addProductCollectionList: {
          ...state.addProductCollectionList,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case CollectionActionTypes.GET_ADD_PRODUCT_COLLECTION_LIST_SUCCESS:
      return {
        ...state,
        addProductCollectionList: {
          ...state.addProductCollectionList,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };
    case CollectionActionTypes.GET_ADD_PRODUCT_COLLECTION_LIST_RESET:
      return {
        ...state,
        addProductCollectionList: {
          ...state.addProductCollectionList,
          data: [],
          loading: false,
          error: false,
          success: false,
        },
      };


    case CollectionActionTypes.CREATE_ADD_PRODUCT_COLLECTION_LOADING:
      return {
        ...state,
        createAddProductCollection: {
          ...state.createAddProductCollection,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case CollectionActionTypes.CREATE_ADD_PRODUCT_COLLECTION_SUCCESS:
      return {
        ...state,
        createAddProductCollection: {
          ...state.createAddProductCollection,
          // data: state.adminCollectionList.data.concat(payload),
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
        addProductCollectionList: {
          ...state.addProductCollectionList,
          // data: state.adminCollectionList.data.concat(payload),
          data: state.addProductCollectionList.data.concat(payload),
          loading: false,
          error: false,
          success: true,
        }
      };
    case CollectionActionTypes.CREATE_ADD_PRODUCT_COLLECTION_RESET:
      return {
        ...state,
        createAddProductCollection: {
          ...state.createAddProductCollection,
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

export { collectionListReducer };
