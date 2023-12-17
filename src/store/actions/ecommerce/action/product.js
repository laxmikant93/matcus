import Auth from "../../../../Classes/Auth";
import { updateDashboardStepper } from "../../user";
import INS_Request from "../../instituteregistration/InstituteRegisterRequest";
import { API_PRODUCT } from "../config";
import {
  // CREATE_PRODUCT_LOADING,
  // CREATE_PRODUCT_SUCCESS,
  // CREATE_PRODUCT_FAIL,
  // GET_PRODUCT_LIST_LOADING,
  // GET_PRODUCT_LIST_SUCCESS,
  // GET_PRODUCT_LIST_STATUS_SUCCESS,
  // GET_DASHBOARD_COUNT_LOADING,
  // GET_DASHBOARD_COUNT_SUCCESS,
  // GET_DASHBOARD_COUNT_FAIL,
  // GET_PRODUCT_LIST_FAIL,
  // GET_PRODUCT_DETAIL_LOADING,
  // GET_PRODUCT_DETAIL_SUCCESS,
  // GET_PRODUCT_DETAIL_FAIL,
  // MULTI_PRODUCT_EDIT_LOADING,
  // MULTI_PRODUCT_EDIT_SUCCESS,
  // MULTI_PRODUCT_EDIT_FAIL,
  // PRODUCT_DELETE_LOADING,
  // PRODUCT_DELETE_SUCCESS,
  // PRODUCT_DELETE_FAIL,
  // // CUSTOMER_PRODUCT_LIST_LOADING,
  // // CUSTOMER_PRODUCT_LIST_SUCCESS,
  // // CUSTOMER_PRODUCT_LIST_FAIL,
  // CUSTOMER_PRODUCT_DETAIL_LOADING,
  // CUSTOMER_PRODUCT_DETAIL_SUCCESS,
  // CUSTOMER_PRODUCT_DETAIL_FAIL,
  // GET_SEARCHED_PRODUCT_LIST_LOADING,
  // GET_SEARCHED_PRODUCT_LIST_SUCCESS,
  // GET_SEARCHED_PRODUCT_LIST_FAIL,
  // HOME_PRODUCTS_LOADING,
  // HOME_PRODUCTS_SUCCESS,
  // HOME_PRODUCTS_FAIL,
  ProductActionTypes
} from "../type/product";
import { postRequest, getRequest, patchRequest } from "../utils/request";
import ProductRequest from "../request/product";
import { setCommonError } from "../../commonerror";
import { showSuccessPopup } from "../../successmessagepopup";
import { WEBSITE_TEMPLATE_TYPES } from "../../WebsiteTemplate/actionTypes";

////////////////////////////////////////////////////////// CUSTOMER ///////////////////////////////////////////////////

// const getCustomerProductList = () => async (dispatch) => {
//   try {
//     dispatch({ type: CUSTOMER_PRODUCT_LIST_LOADING });
//     const url = `${API_PRODUCT}/secondPage`;
//     let list = await postRequest(url);

//     if (list.status === 200) {
//       dispatch({
//         type: CUSTOMER_PRODUCT_LIST_SUCCESS,
//         payload: list.data.data,
//       });
//     }

//   } catch (error) {

//     dispatch({ type: CUSTOMER_PRODUCT_LIST_FAIL, payload: error });
//   }
// };

// const getCustomerProductDetail = (type, domain, slug) => async (dispatch) => {

// };

export const storeCurrentPage = (page) => {
  return dispatch => {

    dispatch({
      type: ProductActionTypes.PRODUCT_LIST_CURRENT_PAGE,
      payload: page
    });
  }
}

export const resetProductDetailsPage = () => {
  return dispatch => {

    dispatch({
      type: ProductActionTypes.CUSTOMER_PRODUCT_DETAIL_REST,
      payload: []
    });
  }
}

export const getCustomerProductDetail = (type, domain, slug) => {
  return dispatch => {

    // dispatch({ type: ProductActionTypes.CUSTOMER_PRODUCT_DETAIL_LOADING });
    ProductRequest.get(
      ProductRequest.endpoint.getProductDetail
        .replace("__QUERY__", type)
        .replace("__VALUE__", domain)
        .replace("__SLUG__", slug),
      (success) => {
        dispatch({
          type: ProductActionTypes.CUSTOMER_PRODUCT_DETAIL_SUCCESS,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch({ type: ProductActionTypes.CUSTOMER_PRODUCT_DETAIL_FAIL, payload: error.response.data.message });
      }
    )
  }
}
export const getProductDetails = (item) => {
  // console.log("line 102 Porudtc ", item)
  return dispatch => {
    dispatch({
      type: ProductActionTypes.CUSTOMER_PRODUCT_DETAIL_SUCCESS,
      payload: item
    });
  }
}
// const getCustomerProductDetail = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: ProductActionTypes.CUSTOMER_PRODUCT_DETAIL_LOADING });
//     const url = `${API_PRODUCT}/getProductDetail?productId=${id}`;
//     const list = await getRequest(url);
//     if (list.status === 200) {
//       dispatch({
//         type: ProductActionTypes.CUSTOMER_PRODUCT_DETAIL_SUCCESS,
//         payload: list.data.data,
//       });
//     }

//   } catch (error) {

//     dispatch({ type: ProductActionTypes.CUSTOMER_PRODUCT_DETAIL_FAIL, payload: error });
//   }
// };

// const getFileteredProductList = (type, domain, body) => async (dispatch) => {
//   dispatch({ type: ProductActionTypes.GET_SEARCHED_PRODUCT_LIST_LOADING });
//   ProductRequest.post(
//     ProductRequest.endpoint.filterProduct
//       .replace("__TYPE__", type)
//       .replace("__DOMAIN__", domain),
//     body,
//     (success) => {
//       dispatch({
//         type: ProductActionTypes.GET_SEARCHED_PRODUCT_LIST_SUCCESS,
//         payload: success.data.data,
//       });
//     },
//     (error) => {
//       dispatch({ type: ProductActionTypes.GET_SEARCHED_PRODUCT_LIST_FAIL, payload: error.response.data.message });
//     }
//   )
// };


const getFileteredProductList = (id, value, body) => {
  return (dispatch) => {
    dispatch({
      type: ProductActionTypes.GET_SEARCHED_PRODUCT_LOADER_SHOW,
      payload: true
    });
    ProductRequest.post(
      ProductRequest.endpoint.getShopProduct
        .replace("_ID_", id)
        .replace("_searchValue_", value), body,
      (success) => {
        dispatch({
          type: ProductActionTypes.GET_SEARCHED_PRODUCT_LIST_SUCCESS,
          payload: success.data.data,
        });
        dispatch({
          type: ProductActionTypes.GET_SEARCHED_PRODUCT_LOADER_SHOW,
          payload: false
        });
      },
      (error) => {
        dispatch({ type: ProductActionTypes.GET_SEARCHED_PRODUCT_LIST_FAIL, payload: error.response.data.message });
      }
    )
  }
};
const setDefaultProductList = (data, query, domain) => {
  return (dispatch) => {
    dispatch({
      type: ProductActionTypes.GET_SEARCHED_PRODUCT_LIST_SUCCESS,
      payload: data,
    });

    ProductRequest.get(ProductRequest.endpoint.homeProductData.replace("__QUERY__", query).replace("__DOMAIN__", domain),
      (success) => {
        dispatch({
          type: ProductActionTypes.HOME_PRODUCTS_SUCCESS,
          payload: success.data.data,
        });
        dispatch({
          type: WEBSITE_TEMPLATE_TYPES.WEBSITE_TEMPLATE_DOMAIN_CHECK,
          payload: success.data,
        });
      }, (error) => {

      })
  }
};

// const getFileteredProductList = (type, domain, body) => async (dispatch) => {
//   try {
//     dispatch({ type: ProductActionTypes.GET_SEARCHED_PRODUCT_LIST_LOADING });
//     const url = `${API_PRODUCT}/shop-filter?${type}=${domain}`;
//     const list = await postRequest(url, body);
//     if (list.status === 200) {
//       dispatch({
//         type: ProductActionTypes.GET_SEARCHED_PRODUCT_LIST_SUCCESS,
//         payload: list.data.data,
//       });
//     }

//   } catch (error) {

//     dispatch({ type: ProductActionTypes.GET_SEARCHED_PRODUCT_LIST_FAIL, payload: error });
//   }
// };

const getHomeProductSList = (type, domain) => {
  return dispatch => {
    dispatch({ type: ProductActionTypes.HOME_PRODUCTS_LOADING });
    ProductRequest.post(
      ProductRequest.endpoint.getProductList
        .replace("__TYPE__", type)
        .replace("__DOMAIN__", domain),
      {},
      (success) => {
        dispatch({ type: ProductActionTypes.HOME_PRODUCTS_SUCCESS, payload: success.data.data });
      },
      (error) => {
        dispatch({ type: ProductActionTypes.HOME_PRODUCTS_FAIL, payload: error.response.data.message });
      }
    )
  }
};

// const getHomeProductSList = (type, domain) => async (dispatch) => {
//   try {
//     dispatch({ type: ProductActionTypes.HOME_PRODUCTS_LOADING });
//     const url = `${API_PRODUCT}/productList?${type}=${domain}`;
//     const list = await postRequest(url);
//     if (list.status === 200) {
//       dispatch({
//         type: ProductActionTypes.HOME_PRODUCTS_SUCCESS,
//         payload: list.data.data,
//       });
//     }

// dispatch({ type: HOME_PRODUCTS_FAIL, payload: error });
//   }
// };
const getHomeProductTemplate = (data) => {
  return dispatch => {
    dispatch({
      type: ProductActionTypes.HOME_PRODUCTS_SUCCESS,
      payload: data,
    });
  }
};

/*/////////////////////////////////////////////// ADMNIN /////////////////////////////////////////////*/

const createProduct = (data, stepper) => {
  return dispatch => {
    dispatch({ type: ProductActionTypes.CREATE_PRODUCT_LOADING });
    ProductRequest.post(
      ProductRequest.endpoint.createProduct,
      data,
      (newProduct) => {
        // console.log(newProduct, "line 178");
        dispatch(showSuccessPopup("Created"))
        let stepperData = {
          addProduct: true,
          condition: "addProduct",
          industry: "Ecommerce",
          institute: data.business,
          business: data.business,
          owner: data.owner
        }
        let steup = {
          ...stepper, addProduct: true,
        }
        INS_Request.post(
          INS_Request.endpoint.DashboardStepperUpdate,
          stepperData, (success) => {
            Auth.updateUserDetail("user_dashboard_stepper", steup);
            dispatch(updateDashboardStepper(steup))
          }, (error) => {

          })
        Auth.updateUserDetail("user_dashboard_stepper", steup);
        dispatch(updateDashboardStepper(steup))
        dispatch({ type: ProductActionTypes.CREATE_PRODUCT_SUCCESS, payload: newProduct.data.data });
      },
      (error) => {
        console.log(error);

        dispatch(setCommonError("error"))
        dispatch({ type: ProductActionTypes.CREATE_PRODUCT_FAIL, payload: error });
      }
    )
  }
  // try {

  // const url = `${API_PRODUCT}`;
  // const newProduct = await postRequest(url, data);
  // console.log(newProduct, "line 123")
  // let stepperData = {
  //   addProduct: true,
  //   condition: "addProduct",
  //   industry: "Ecommerce",
  //   institute: data.business,
  //   business: data.business,
  //   owner: data.owner
  // }
  // let steup = {
  //   ...stepper, addProduct: true,
  // }
  // INS_Request.post(
  //   INS_Request.endpoint.DashboardStepperUpdate,
  //   stepperData, (success) => {
  //     Auth.updateUserDetail("user_dashboard_stepper", steup);
  //     dispatch(updateDashboardStepper(steup))
  //   }, (error) => {

  //   })
  // Auth.updateUserDetail("user_dashboard_stepper", steup);
  // dispatch(updateDashboardStepper(steup))
  // dispatch({ type: ProductActionTypes.CREATE_PRODUCT_SUCCESS, payload: newProduct.data.data });


  // } catch (error) {

  //   dispatch({ type: ProductActionTypes.CREATE_PRODUCT_FAIL, payload: error });
  // }
};

export const resetCreateProduct = () => {
  return (dispatch) => {
    dispatch({
      type: ProductActionTypes.CREATE_PRODUCT_RESET
    })
  }
}

export const checkSkuAvailability = (data) => {
  return (dispatch) => {
    ProductRequest.post(
      ProductRequest.endpoint.getSkuAvailibilty,
      data,
      (success) => {
        dispatch({ type: ProductActionTypes.GET_SKU_SUCCESS, payload: success.data.data.response });
      },
      (error) => {
        dispatch({ type: ProductActionTypes.GET_SKU_ERROR, payload: error.response.data.message });
      }
    )
  }
}
export const resetSkuAvailability = () => {
  return (dispatch) => {
    dispatch({
      type: ProductActionTypes.GET_SKU_RESET
    })
  }
}
export const getSingleProduct = (id) => {
  return (dispatch) => {
    dispatch({
      type: ProductActionTypes.GET_EDIT_SINGLE_PRODUCT_LOADING
    })
    ProductRequest.get(
      ProductRequest.endpoint.getSingleProductApi
        .replace("__PRODUCTID__", id),
      (success) => {
        dispatch({
          type: ProductActionTypes.GET_EDIT_SINGLE_PRODUCT_SUCCESS,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}
export const resetGetSingleProduct = () => {
  return (dispatch) => {
    dispatch({
      type: ProductActionTypes.GET_EDIT_SINGLE_PRODUCT_RESET
    })
  }
}

const dashboardProductCount = (id) => async (dispatch) => {
  dispatch({ type: ProductActionTypes.GET_DASHBOARD_COUNT_LOADING });
  ProductRequest.get(
    ProductRequest.endpoint.dashboardCount
      .replace("__ID__", id),
    (success) => {
      dispatch({ type: ProductActionTypes.GET_DASHBOARD_COUNT_SUCCESS, payload: success.data });
    },
    (error) => {
      dispatch({ type: ProductActionTypes.GET_DASHBOARD_COUNT_FAIL, payload: error.response.data.message });
    }
  )
}

// const dashboardProductCount = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: ProductActionTypes.GET_DASHBOARD_COUNT_LOADING });
//     const url = `${API_PRODUCT}/dashboardcount?business=${id}`;
//     const list = await getRequest(url);
//     if (list.status === 200) {
//       dispatch({ type: ProductActionTypes.GET_DASHBOARD_COUNT_SUCCESS, payload: list.data });
//     }

//   } catch (error) {

//     dispatch({ type: ProductActionTypes.GET_DASHBOARD_COUNT_FAIL, payload: error });
//   }
// }

const getProductList = (id, body) => async (dispatch) => {
  dispatch({ type: ProductActionTypes.GET_PRODUCT_LIST_LOADING });
  ProductRequest.post(
    ProductRequest.endpoint.getProductBusiness
      .replace("__ID__", id),
    body,
    (success) => {
      dispatch({
        type: ProductActionTypes.GET_PRODUCT_LIST_SUCCESS,
        payload: success.data.data
      });
    },
    (error) => {
      dispatch({ type: ProductActionTypes.GET_PRODUCT_LIST_FAIL, payload: error.response.data.message });
    }
  )
};
export const getProductListByCategoryColl = (id, body) => async (dispatch) => {
  dispatch({ type: ProductActionTypes.GET_PRODUCT_LIST_LOADING });
  ProductRequest.post(
    ProductRequest.endpoint.getProductListByCategoryCollection
      .replace("__ID__", id), body,
    (success) => {
      dispatch({
        type: ProductActionTypes.GET_PRODUCT_LIST_BY_CATEGORY_COLL,
        payload: success.data.data
      });
    },
    (error) => {
      dispatch({ type: ProductActionTypes.GET_PRODUCT_LIST_FAIL, payload: error.response.data.message });
    }
  )
};
export const getProductListBySortby = (id, sortValue, data) => async (dispatch) => {
  dispatch({ type: ProductActionTypes.GET_PRODUCT_LIST_LOADING });
  ProductRequest.post(
    ProductRequest.endpoint.getProductListBySortby
      .replace("__ID__", id).replace("_VALUE_", sortValue), data,
    (success) => {
      dispatch({
        type: ProductActionTypes.GET_PRODUCT_LIST_BY_SORTBY,
        payload: success.data.data
      });
    },
    (error) => {
      dispatch({ type: ProductActionTypes.GET_PRODUCT_LIST_FAIL, payload: error.response.data.message });
    }
  )
};
export const getProductListSearch = (id, search, data) => async (dispatch) => {
  dispatch({ type: ProductActionTypes.GET_PRODUCT_LIST_LOADING });
  ProductRequest.post(
    ProductRequest.endpoint.getProductListSearch
      .replace("__ID__", id).replace("_VALUE_", search), data,
    (success) => {
      dispatch({
        type: ProductActionTypes.GET_PRODUCT_LIST_SEARCH,
        payload: success.data.data
      });
    },
    (error) => {
      dispatch({
        type: ProductActionTypes.GET_PRODUCT_LIST_FAIL,
        // payload: error.response.data.message
        payload: error.data.data.message
      });
    }
  )
};
export const resetGetProductList = () => {
  return dispatch => {
    dispatch({
      type: ProductActionTypes.GET_PRODUCT_LIST_RESET,
      payload: {}
    })
  }
}
export const addMultipleProductToCollCat = (condition, data) => async (dispatch) => {
  dispatch({ type: ProductActionTypes.ADD_MULTIPLE_PRODUCT_TO_COLLCAT_LOADING });
  ProductRequest.post(
    ProductRequest.endpoint.addMultipleProductToCollCat.replace("_VALUE_", condition), data,
    (success) => {
      dispatch({
        type: ProductActionTypes.ADD_MULTIPLE_PRODUCT_TO_COLLCAT_SUCCESS,
        payload: success.data
      });
      dispatch(showSuccessPopup("Changes Saved"))
    },
    (error) => {
      dispatch({
        type: ProductActionTypes.ADD_MULTIPLE_PRODUCT_TO_COLLCAT_ERROR,
        payload: error.response.data.message
      });
    }
  )
};


export const sendCategoryDataToProductList = (item) => {
  return (dispatch) => {
    dispatch({
      type: ProductActionTypes.SEND_CATEGORY_DATA_TO_PRODUCTLIST,
      payload: item,
    });
  }
}
export const resetSendCategoryDataToProductList = (item) => {
  return (dispatch) => {
    dispatch({
      type: ProductActionTypes.SEND_CATEGORY_DATA_TO_PRODUCTLIST,
      payload: item,
    });
  }
}
export const sendUNCategoryDataToProductList = (item) => {
  return (dispatch) => {
    dispatch({
      type: ProductActionTypes.SEND_UNCATEGORY_DATA_TO_PRODUCTLIST,
      payload: item,
    });
  }
}
export const ResetSendUNCategoryDataToProductList = (item) => {
  return (dispatch) => {
    dispatch({
      type: ProductActionTypes.SEND_UNCATEGORY_DATA_TO_PRODUCTLIST,
      payload: {},
    });
  }
}
// const getProductList = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: ProductActionTypes.GET_PRODUCT_LIST_LOADING });
//     const url = `${API_PRODUCT}/getProductVendor?businessid=${id}`;
//     const list = await postRequest(url, {});
//     if (list.status === 200) {
//       dispatch({ type: ProductActionTypes.GET_PRODUCT_LIST_SUCCESS, payload: list.data.data });
//       console.log(list.data.data);
//     }

//   } catch (error) {

//     dispatch({ type: ProductActionTypes.GET_PRODUCT_LIST_FAIL, payload: error });
//   }
// }; 

export const getSlugAvailibilty = (busniessid, slug) => async (dispatch) => {
  ProductRequest.get(
    ProductRequest.endpoint.getSlugAvailibilty.replace("_BUSNIESSID_", busniessid).replace("_VALUE_", slug),
    (success) => {
      dispatch({ type: ProductActionTypes.GET_SLUG_SUCCESS, payload: success.data.data });
    },
    (error) => {
      dispatch({ type: ProductActionTypes.GET_SLUG_ERROR, payload: error.response.data.message });
    }
  )
}

// const inventoryStatusChange = (id, data) => async (dispatch) => {

// }

// const inventoryStatusChange = (id, data) => {
//   return (dispatch) => {

//     ProductRequest.get(ProductRequest.endpoint.inventoryStatusChangeAPI.replace("__ID__", id)
//       .replace("__STATUS__", data),
//       (success) => {
//         dispatch({
//           type: ProductActionTypes.GET_PRODUCT_LIST_STATUS_SUCCESS,
//           payload: success.data.data
//         });
//       },
//       (error) => {
//         dispatch({
//           type: ProductActionTypes.GET_PRODUCT_LIST_FAIL,
//           payload: error.response.data.message
//         });
//       }
//     );
//   }
// }


// const inventoryStatusChange = (id, data) => async (dispatch) => {
//   try {
//     const url = `${API_PRODUCT}/stockStatus?variationId=${id}&status=${data}`;
//     const list = await getRequest(url);
//     if (list.status === 200) {
//       dispatch({ type: ProductActionTypes.GET_PRODUCT_LIST_STATUS_SUCCESS, payload: list.data.data });
//     }

//   } catch (error) {

//     dispatch({ type: ProductActionTypes.GET_PRODUCT_LIST_FAIL, payload: error });
//   }
// }

const getProductDetail = (id) => {
  return dispatch => {
    dispatch({ type: ProductActionTypes.GET_PRODUCT_DETAIL_LOADING });
    ProductRequest.get(
      ProductRequest.endpoint.productDetail
        .replace("__ID__", id),
      (success) => {
        dispatch({ type: ProductActionTypes.GET_PRODUCT_DETAIL_SUCCESS, payload: success.data.data });
      },
      (error) => {
        dispatch({ type: ProductActionTypes.GET_PRODUCT_DETAIL_FAIL, payload: error.response.data.message });
      }
    )
  }
};

// export const getInventoryDetail = (id) => {
//   return (dispatch) => {
//     dispatch({
//       type: ProductActionTypes.GET_PRODUCT_DETAIL_LOADING,
//       payload: []
//     });
//     ProductRequest.get(ProductRequest.endpoint.inventoryDetail.replace("_ID_", id),
//       (success) => {
//         dispatch({
//           type: ProductActionTypes.GET_PRODUCT_DETAIL_SUCCESS,
//           payload: success.data.data
//         });
//       },
//       (error) => {
//         dispatch(setCommonError(error.message));
//       }
//     )
//   }
// };

// const getProductDetail = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: ProductActionTypes.GET_PRODUCT_DETAIL_LOADING });
//     const url = `${API_PRODUCT}/getProductDetail?productId=${id}`;
//     const list = await getRequest(url);
//     if (list.status === 200) {
//       dispatch({ type: ProductActionTypes.GET_PRODUCT_DETAIL_SUCCESS, payload: list.data.data });
//     }

//   } catch (error) {

//     dispatch({ type: ProductActionTypes.GET_PRODUCT_DETAIL_FAIL, payload: error });
//   }
// };

const productDelete = (condition, prodId) => {
  return (dispatch) => {
    dispatch({
      type: ProductActionTypes.PRODUCT_DELETE_LOADING
    });
    ProductRequest.delete(
      ProductRequest.endpoint.deleteProduct.replace("_CONDITION_", condition).replace("_PRODUCTID_", prodId),
      (success) => {
        dispatch({
          type: ProductActionTypes.PRODUCT_DELETE_SUCCESS,
          payload: prodId,
        });
        dispatch(showSuccessPopup("Product Succesfully Deleted"))
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  };
}

// const productDelete = (id, st) => async (dispatch) => {
//   try {
//     dispatch({ type: ProductActionTypes.PRODUCT_DELETE_LOADING });
//     const url = `${API_PRODUCT}/delete`;
//     const body = { id: id };
//     const deleteProduct = await patchRequest(url, body);
//     if (deleteProduct.status === 200) {
//       const url1 = `${API_PRODUCT}/getProductVendor`;
//       const list = await getRequest(url1);
//       if (list.status === 200) {
//         if (st !== 'change' || st === 'change') {
//           dispatch({ type: ProductActionTypes.PRODUCT_DELETE_SUCCESS, payload: list.data.data });
//           window.location.reload();
//         }
//       }
//     }

//   } catch (error) {

//     dispatch({ type: ProductActionTypes.PRODUCT_DELETE_FAIL, payload: error });
//   }
// };

const editMultiProduct = (data, status) => {
  return dispatch => {
    dispatch({ type: ProductActionTypes.MULTI_PRODUCT_EDIT_LOADING });
    const body = { products: data, status: status };
    ProductRequest.patch(
      ProductRequest.endpoint.editMultiProduct
        .replace("__STATUS__", status),
      body,
      (success) => {
        ProductRequest.get(
          ProductRequest.endpoint.getProductVendor,
          (success) => {
            dispatch({ type: ProductActionTypes.MULTI_PRODUCT_EDIT_SUCCESS, payload: success.data.data });
          },
          (error) => {
            dispatch({ type: ProductActionTypes.MULTI_PRODUCT_EDIT_FAIL, payload: error.response.data.message });
          }
        )
      },
      (error) => {
        dispatch({ type: ProductActionTypes.MULTI_PRODUCT_EDIT_FAIL, payload: error.response.data.message });
      }
    )
  }
};

// const editMultiProduct = (data, status) => async (dispatch) => {
//   try {
//     dispatch({ type: ProductActionTypes.MULTI_PRODUCT_EDIT_LOADING });
//     const body = { products: data, status: status };
//     const url = `${API_PRODUCT}/editMultiProduct/${status}`;
//     const editProduct = await patchRequest(url, body);

//     if (editProduct.status === 200) {
//       const url1 = `${API_PRODUCT}/getProductVendor`;
//       const list = await getRequest(url1);
//       if (list.status === 200) {
//         dispatch({ type: ProductActionTypes.MULTI_PRODUCT_EDIT_SUCCESS, payload: list.data.data });
//       }
//     }

//   } catch (error) {

//     dispatch({ type: ProductActionTypes.MULTI_PRODUCT_EDIT_FAIL, payload: error });
//   }
// };

export const editProduct = (data, status, businessID, prodID) => {
  return (dispatch) => {
    dispatch({
      type: ProductActionTypes.PRODUCT_EDIT_LOADING,
      payload: ""
    });
    ProductRequest.patch(
      ProductRequest.endpoint.editProduct.replace("__STATUS__", status)
        .replace("__businessID__", businessID).replace("__prodID__", prodID), data,
      (success) => {
        dispatch({
          type: ProductActionTypes.PRODUCT_EDIT_SUCCESS,
          payload: success.data.data
        });
        dispatch(showSuccessPopup(" Succesfully Updated"))
        dispatch(showSuccessPopup(" Succesfully Updated"))
      },
      (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
};

export const resetEditProduct = () => {
  return (dispatch) => {
    dispatch({
      type: ProductActionTypes.PRODUCT_EDIT_RESET,
      payload: ""
    });
  }
};

// export const editProduct = (data) => async (dispatch) => {
//   try {
//     dispatch({ type: PRODUCT_EDIT_LOADING });
//     const url = `${API_PRODUCT}/editProduct`;
//     const editProduct = await patchRequest(url, data);

//     if (editProduct.status === 200) {
//       if (editProduct.status === 200) {
//         dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: editProduct.data.data });
//       }
//     }

//   } catch (error) {

//     dispatch({ type: PRODUCT_EDIT_FAIL, payload: error });
//   }
// };

export const getFilterData = (id) => {
  // console.log("line no 733 product.js ", id)
  return dispatch => {
    dispatch({
      type: ProductActionTypes.DYNAMIC_FILTER_GET_LOADING,
      payload: ""
    });

    ProductRequest.get(
      ProductRequest.endpoint.getDynamicFilterData.replace("__ID__", id), (success) => {
        // console.log("line no 738 product.js", success.data)
        dispatch({
          type: ProductActionTypes.DYNAMIC_FILTER_GET_SUCCESS,
          payload: success.data.data,
        })
      },
      (error) => {
        // dispatch(setCommonError(error.message))
      }
    );
  }
}

export {
  createProduct,
  getProductList,
  // inventoryStatusChange,
  getProductDetail,
  editMultiProduct,
  productDelete,
  // getCustomerProductList,
  // resetProductDetailsPage,
  setDefaultProductList,
  // getCustomerProductDetail,
  getFileteredProductList,
  getHomeProductSList,
  dashboardProductCount,
  getHomeProductTemplate
};
