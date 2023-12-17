import {
  // GET_PRODUCT_LIST_LOADING,
  // GET_PRODUCT_LIST_SUCCESS,
  // GET_PRODUCT_LIST_FAIL,
  // CREATE_PRODUCT_LOADING,
  // CREATE_PRODUCT_SUCCESS,
  // CREATE_PRODUCT_FAIL,
  // GET_PRODUCT_DETAIL_LOADING,
  // GET_PRODUCT_DETAIL_SUCCESS,
  // GET_PRODUCT_DETAIL_FAIL,
  // PRODUCT_DELETE_LOADING,
  // PRODUCT_DELETE_SUCCESS,
  // PRODUCT_DELETE_FAIL,
  // CUSTOMER_PRODUCT_LIST_LOADING,
  // CUSTOMER_PRODUCT_LIST_SUCCESS,
  // CUSTOMER_PRODUCT_LIST_FAIL,
  // CUSTOMER_PRODUCT_DETAIL_LOADING,
  // CUSTOMER_PRODUCT_DETAIL_SUCCESS,
  // CUSTOMER_PRODUCT_DETAIL_FAIL,
  // GET_SEARCHED_PRODUCT_LIST_LOADING,
  // GET_SEARCHED_PRODUCT_LIST_SUCCESS,
  // GET_SEARCHED_PRODUCT_LIST_FAIL,
  // HOME_PRODUCTS_LOADING,
  // HOME_PRODUCTS_SUCCESS,
  // HOME_PRODUCTS_FAIL,
  // GET_PRODUCT_LIST_STATUS_SUCCESS,
  // GET_DASHBOARD_COUNT_LOADING,
  // GET_DASHBOARD_COUNT_SUCCESS,
  // GET_DASHBOARD_COUNT_FAIL,
  ProductActionTypes
} from "../../actions/ecommerce/type/product";

const PRODUCT_LIST_INITIAL_STATE = {
  homePageproducts: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  slugAvailability: {
    data: "",
    loading: false,
    success: false,
    error: false,
  },
  skuAvailability: {
    data: "",
    loading: false,
    success: false,
    error: false,
  },
  adminProductList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  productDetail: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  editProduct: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  customerProductList: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  customerproductDetail: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  dashboardCount: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  createProduct: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  editCreatedProduct: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  getSingleProduct: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  getCategorydatafromCategoryPage: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  getUNCategorydatafromCategoryPage: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  deleteProduct: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  dynamicFilterGetData: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  productLoader: {
    showLoader: false
  },
  addMultiProToColl: {
    data: {},
    loading: false,
    success: false,
    error: false,
  },
  currentPage:""
};

const productListReducer = (
  state = PRODUCT_LIST_INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    case ProductActionTypes.HOME_PRODUCTS_LOADING:
      return {
        ...state,
        homePageproducts: {
          ...state.homePageproducts,
          data: {},
          loading: true,
          error: false,
          success: false,
        },
      };
    case ProductActionTypes.HOME_PRODUCTS_SUCCESS:
      return {
        ...state,
        homePageproducts: {
          ...state.homePageproducts,
          data: { ...payload },
          loading: false,
          error: false,
          success: true,
        },
      };
    case ProductActionTypes.HOME_PRODUCTS_FAIL:
      return {
        ...state,
        homePageproducts: {
          ...state.homePageproducts,
          data: {},
          loading: false,
          error: true,
          success: false,
        },
      };

      
    case ProductActionTypes.PRODUCT_LIST_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      }

    case ProductActionTypes.GET_PRODUCT_LIST_LOADING:
      return {
        ...state,
        adminProductList: {
          ...state.adminProductList,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case ProductActionTypes.GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        adminProductList: {
          ...state.adminProductList,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };
    case ProductActionTypes.GET_PRODUCT_LIST_RESET:
      return {
        ...state,
        adminProductList: {
          ...state.adminProductList,
          data: [],
          loading: false,
          error: false,
          success: false,
        },
      };
    case ProductActionTypes.GET_PRODUCT_LIST_BY_CATEGORY_COLL:
      // let data1 = {
      //   ...state.adminProductList,
      //   productlist: state.adminProductList.payload.productlist,
      //   productlength: state.adminProductList.payload.productlength
      // }
      return {
        ...state,
        adminProductList: {
          ...state.adminProductList,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };
    // case ProductActionTypes.GET_PRODUCT_LIST_BY_CATEGORY:
    //   return {
    //     ...state,
    //     adminProductList: {
    //       ...state.adminProductList,
    //       data: [],
    //       loading: true,
    //       error: false,
    //       success: false,
    //     },
    //   };
    case ProductActionTypes.GET_PRODUCT_LIST_BY_SORTBY:
      return {
        ...state,
        adminProductList: {
          ...state.adminProductList,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };
    case ProductActionTypes.GET_PRODUCT_LIST_SEARCH:
      return {
        ...state,
        adminProductList: {
          ...state.adminProductList,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };
    case ProductActionTypes.SEND_CATEGORY_DATA_TO_PRODUCTLIST:
      return {
        ...state,
        getCategorydatafromCategoryPage: {
          ...state.getCategorydatafromCategoryPage,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };
    case ProductActionTypes.RESET_SEND_CATEGORY_DATA_TO_PRODUCTLIST:
      return {
        ...state,
        getCategorydatafromCategoryPage: {
          ...state.getCategorydatafromCategoryPage,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };
    case ProductActionTypes.SEND_UNCATEGORY_DATA_TO_PRODUCTLIST:
      return {
        ...state,
        getUNCategorydatafromCategoryPage: {
          ...state.getUNCategorydatafromCategoryPage,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };

    case ProductActionTypes.RESET_SEND_UNCATEGORY_DATA_TO_PRODUCTLIST:
      return {
        ...state,
        getUNCategorydatafromCategoryPage: {
          ...state.getUNCategorydatafromCategoryPage,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };
    case ProductActionTypes.GET_PRODUCT_LIST_STATUS_SUCCESS:
      return {
        ...state,
        adminProductList: {
          ...state.adminProductList,
          data: {
            ...state.adminProductList.data,
            products: state.adminProductList.data.products.map((item) =>
              payload._id === item._id ?
                {
                  ...payload,
                  // variations: item.variations.map((data) => {
                  //   return data._id === payload.varId ? payload.data : data
                  // }),
                } :
                item
            )
          },
          loading: false,
          success: true,
          error: false,
        },
      };

    case ProductActionTypes.GET_DASHBOARD_COUNT_LOADING:
      return {
        ...state,
        dashboardCount: {
          ...state.dashboardCount,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };

    case ProductActionTypes.GET_DASHBOARD_COUNT_SUCCESS:
      return {
        ...state,
        dashboardCount: {
          ...state.dashboardCount,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };

    case ProductActionTypes.GET_DASHBOARD_COUNT_FAIL:
      return {
        ...state,
        dashboardCount: {
          ...state.dashboardCount,
          data: [],
          loading: false,
          error: true,
          success: false,
        },
      };

    case ProductActionTypes.GET_PRODUCT_LIST_FAIL:
      return {
        ...state,
        adminProductList: {
          ...state.adminProductList,
          data: [],
          loading: false,
          error: true,
          success: false,
        },
      };
    case ProductActionTypes.CREATE_PRODUCT_LOADING:
      return {
        ...state,
        createProduct: {
          ...state.createProduct,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case ProductActionTypes.GET_SLUG_SUCCESS: {
      return {
        ...state,
        slugAvailability: {
          ...state.slugAvailability,
          data: payload,
          success: true,
          error: false,
          loading: false
        }
      }
    }
    case ProductActionTypes.GET_SKU_SUCCESS: {
      return {
        ...state,
        skuAvailability: {
          ...state.skuAvailability,
          data: payload,
          success: true,
          error: false,
          loading: false
        }
      }
    }
    case ProductActionTypes.GET_SKU_RESET: {
      return {
        ...state,
        skuAvailability: {
          ...state.skuAvailability,
          data: "",
          success: false,
          error: false,
          loading: false
        }
      }
    }
    case ProductActionTypes.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        createProduct: {
          ...state.createProduct,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
        adminProductList: {
          ...state.adminProductList,
          data: state.adminProductList.data.concat(payload),
          loading: false,
          error: false,
          success: true,
        },
      };
    case ProductActionTypes.CREATE_PRODUCT_FAIL:
      return {
        ...state,
        createProduct: {
          ...state.createProduct,
          data: [],
          loading: false,
          error: true,
          success: false,
        },
      };
    case ProductActionTypes.CREATE_PRODUCT_RESET:
      return {
        ...state,
        createProduct: {
          ...state.createProduct,
          data: [],
          loading: false,
          error: false,
          success: false,
        },
      };
    case ProductActionTypes.GET_EDIT_SINGLE_PRODUCT_LOADING: {
      return {
        ...state,
        getSingleProduct: {
          ...state.getSingleProduct,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      }
    }
    case ProductActionTypes.GET_EDIT_SINGLE_PRODUCT_SUCCESS: {
      return {
        ...state,
        getSingleProduct: {
          ...state.getSingleProduct,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      }
    }
    case ProductActionTypes.GET_EDIT_SINGLE_PRODUCT_RESET: {
      return {
        ...state,
        getSingleProduct: {
          ...state.getSingleProduct,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      }
    }
    case ProductActionTypes.PRODUCT_DELETE_LOADING:
      return {
        ...state,
        deleteProduct: {
          ...state.deleteProduct,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case ProductActionTypes.PRODUCT_DELETE_SUCCESS:
      let data = {
        ...state.adminProductList.data,
        productlist: state.adminProductList.data.productlist.filter((item) => !payload.includes(item._id)),
        productlength: state.adminProductList.data.productlength - payload.length
      }
      // console.log(data, "line 466")
      return {
        ...state,
        deleteProduct: {
          ...state.deleteProduct,
          data: [],
          loading: false,
          error: false,
          success: true,
        },
        adminProductList: {
          ...state.adminProductList,
          data: data,
          loading: false,
          error: false,
          success: true,
        },
      };
    case ProductActionTypes.PRODUCT_DELETE_FAIL:
      return {
        ...state,
        adminProductList: {
          ...state.adminProductList,
          data: [],
          loading: false,
          error: true,
          success: false,
        },
      };

    //Add miulti pro to coll
    case ProductActionTypes.ADD_MULTIPLE_PRODUCT_TO_COLLCAT_LOADING:
      return {
        ...state,
        addMultiProToColl: {
          ...state.addMultiProToColl,
          data: [],
          loading: true,
          error: false,
          success: false,
        },
      };
    case ProductActionTypes.ADD_MULTIPLE_PRODUCT_TO_COLLCAT_SUCCESS:
      return {
        ...state,
        addMultiProToColl: {
          ...state.addMultiProToColl,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };
    case ProductActionTypes.GET_PRODUCT_DETAIL_LOADING:
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          data: {},
          loading: true,
          error: false,
          success: false,
        },
      };
    case ProductActionTypes.GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          data: { ...payload },
          loading: false,
          error: false,
          success: true,
        },
      };
    case ProductActionTypes.GET_PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          data: {},
          loading: false,
          error: true,
          success: false,
        },
      };
    case ProductActionTypes.PRODUCT_EDIT_LOADING:
      return {
        ...state,
        editProduct: {
          ...state.editProduct,
          data: {},
          loading: true,
          error: false,
          success: false,
        },
      };
    case ProductActionTypes.PRODUCT_EDIT_SUCCESS:
      return {
        ...state,
        editProduct: {
          ...state.editProduct,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };
    case ProductActionTypes.PRODUCT_EDIT_ERROR:
      return {
        ...state,
        editProduct: {
          ...state.editProduct,
          data: {},
          loading: false,
          error: true,
          success: false,
        },
      };
    case ProductActionTypes.PRODUCT_EDIT_RESET:
      return {
        ...state,
        editProduct: {
          ...state.editProduct,
          data: {},
          loading: false,
          error: false,
          success: false,
        },
      };
    // case CUSTOMER_PRODUCT_LIST_LOADING:
    //   return {
    //     ...state,
    //     customerProductList: {
    //       ...state.customerProductList,
    //       data: {},
    //       loading: true,
    //       error: false,
    //       success: false,
    //     },
    //   };
    // case CUSTOMER_PRODUCT_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     customerProductList: {
    //       ...state.customerProductList,
    //       data: { ...payload },
    //       loading: false,
    //       error: false,
    //       success: true,
    //     },
    //   };
    // case CUSTOMER_PRODUCT_LIST_FAIL:
    // return {
    //   ...state,
    //   customerProductList: {
    //     ...state.customerProductList,
    //     data: {},
    //     loading: false,
    //     error: true,
    //     success: false,
    //   },
    // };
    case ProductActionTypes.GET_SEARCHED_PRODUCT_LIST_LOADING:
      return {
        ...state,
        customerProductList: {
          ...state.customerProductList,
          data: {},
          loading: true,
          error: false,
          success: false,
        },
      };
    case ProductActionTypes.GET_SEARCHED_PRODUCT_LOADER_SHOW:
      return {
        ...state,
        productLoader: {
          ...state.productLoader,
          showLoader: payload
        },
      };
    case ProductActionTypes.GET_SEARCHED_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        customerProductList: {
          ...state.customerProductList,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };
    case ProductActionTypes.GET_SEARCHED_PRODUCT_LIST_FAIL:
      return {
        ...state,
        customerProductList: {
          ...state.customerProductList,
          data: {},
          loading: false,
          error: true,
          success: false,
        },
      };
    case ProductActionTypes.CUSTOMER_PRODUCT_DETAIL_LOADING:
      return {
        ...state,
        customerproductDetail: {
          ...state.customerproductDetail,
          data: {},
          loading: true,
          error: false,
          success: false,
        },
      };
    case ProductActionTypes.CUSTOMER_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        customerproductDetail: {
          ...state.customerproductDetail,
          data: payload,
          loading: false,
          error: false,
          success: true,
        },
      };
    case ProductActionTypes.CUSTOMER_PRODUCT_DETAIL_REST:
      return {
        ...state,
        customerproductDetail: {
          ...state.customerproductDetail,
          data: {},
          loading: false,
          error: false,
          success: false,
        },
      };
    case ProductActionTypes.CUSTOMER_PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        customerproductDetail: {
          ...state.customerproductDetail,
          data: {},
          loading: false,
          error: true,
          success: false,
        },
      };

    case ProductActionTypes.DYNAMIC_FILTER_GET_LOADING:
      return {
        ...state,
        dynamicFilterGetData: {
          ...state.dynamicFilterGetData,
          data: {},
          loading: true,
          error: false,
          success: false,
        },
      };

    case ProductActionTypes.DYNAMIC_FILTER_GET_SUCCESS:
      return {
        ...state,
        dynamicFilterGetData: {
          ...state.dynamicFilterGetData,
          data: { ...payload },
          loading: false,
          error: false,
          success: true,
        },
      };



    default:
      return state;
  }
};

export { productListReducer };
