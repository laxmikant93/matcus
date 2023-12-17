import { setCommonError } from "../../commonerror";
import { API_PRODUCT } from "../config";
import CollectionRequest from "../request/collection";
import {
  CollectionActionTypes
} from "../type/collection";
import { postRequest, getRequest, patchRequest } from "../utils/request";

/////////////////////////////// ADMIN/VENDOR COLLECTION ///////////////////////////
const createCollection = (businessid, data, val) => async (dispatch) => {
  dispatch({ type: CollectionActionTypes.CREATE_COLLECTION_LOADING });
  CollectionRequest.post(
    CollectionRequest.endpoint.createCollection.replace("_BUSINESSID_", businessid),
    data,
    (success) => {
      if (val === '2') {
        dispatch({ type: CollectionActionTypes.CREATE_COLLECTION_SUCCESS, payload: success.data.data });
        return success.data.data;
      } else {
        dispatch({ type: CollectionActionTypes.CREATE_COLLECTION_SUCCESS, payload: success.data.data });
      }
    },
    (error) => {
      dispatch({ type: CollectionActionTypes.CREATE_COLLECTION_FAIL, payload: error.response.data.message });
    }
  )
};

// const createCollection = (data, val) => async (dispatch) => {
//   try {
//     dispatch({ type: CollectionActionTypes.CREATE_COLLECTION_LOADING });
//     const url = `${API_PRODUCT}/createCollection`;
//     const newCollection = await postRequest(url, data);

//     // if (newCollection.status === 200) {
//     // const url1 = `${API_PRODUCT}/CollectionList?businessid=${data.businessShopId}`;
//     // const list1 = await getRequest(url1);
//     if (newCollection.status === 200) {
//       if (val === '2') {
//         dispatch({ type: CollectionActionTypes.CREATE_COLLECTION_SUCCESS, payload: newCollection.data.data });
//         return newCollection.data.data;
//       } else {
//         dispatch({ type: CollectionActionTypes.CREATE_COLLECTION_SUCCESS, payload: newCollection.data.data });
//       }
//       // }
//     }

//   } catch (error) {

//     dispatch({ type: CollectionActionTypes.CREATE_COLLECTION_FAIL, payload: error });
//   }
// };

const editCollection = (businessid, id, data) => async (dispatch) => {
  dispatch({ type: CollectionActionTypes.EDIT_COLLECTION_LOADING });
  CollectionRequest.patch(
    CollectionRequest.endpoint.editCollection.replace("_BUSINESSID_", businessid)
      .replace("__ID__", id),
    data,
    (success) => {
      CollectionRequest.get(
        CollectionRequest.endpoint.CollectionList,
        (success) => {
          dispatch({
            type: CollectionActionTypes.EDIT_COLLECTION_SUCCESS,
            payload: success.data.data
          });
        },
        (error) => {
          dispatch({
            type: CollectionActionTypes.EDIT_COLLECTION_FAIL,
            payload: error.response.data.message
          });
        }
      )
    },
    (error) => {
      dispatch({
        type: CollectionActionTypes.EDIT_COLLECTION_FAIL,
        payload: error.response.data.message
      });
    }
  )
};

// const editCollection = (data, id) => async (dispatch) => {
//   try {
//     dispatch({ type: CollectionActionTypes.EDIT_COLLECTION_LOADING });
//     const url = `${API_PRODUCT}/Collection/${id}`;
//     const updatedCollection = await patchRequest(url, data);

//     if (updatedCollection.status === 200) {
//       const url1 = `${API_PRODUCT}/CollectionList`;
//       const list1 = await getRequest(url1);
//       if (list1.status === 200) {
//         dispatch({ type: CollectionActionTypes.EDIT_COLLECTION_SUCCESS, payload: list1.data.data });
//       }
//     }

//   } catch (error) {

//     dispatch({ type: CollectionActionTypes.EDIT_COLLECTION_FAIL, payload: error });
//   }
// };

const editMultiCollection = (data) => async (dispatch) => {
  dispatch({ type: CollectionActionTypes.EDIT_MULTI_COLLECTION_LOADING });
  CollectionRequest.post(
    CollectionRequest.endpoint.multiCollection,
    data,
    (success) => {
      CollectionRequest.get(
        CollectionRequest.endpoint.CollectionList,
        (success) => {
          dispatch({ type: CollectionActionTypes.EDIT_MULTI_COLLECTION_SUCCESS, payload: success.data.data });
        },
        (error) => {
          dispatch({ type: CollectionActionTypes.EDIT_MULTI_COLLECTION_FAIL, payload: error.response.data.message });
        }
      )
    },
    (error) => {
      dispatch({ type: CollectionActionTypes.EDIT_MULTI_COLLECTION_FAIL, payload: error.response.data.message });
    }
  )
};


const getCollectionList = (val, type) => async (dispatch) => {
  dispatch({ type: CollectionActionTypes.GET_COLLECTION_LIST_LOADING });
  CollectionRequest.get(
    type === 'domain' || type === 'subdomain' ?
      CollectionRequest.endpoint.CollectionListDomain
        .replace("__TYPE__", type)
        .replace("__VAL__", val) :
      CollectionRequest.endpoint.CollectionListBusiness
        .replace("__VAL__", val),
    (success) => {
      dispatch({ type: CollectionActionTypes.GET_COLLECTION_LIST_SUCCESS, payload: success.data.data });
    },
    (error) => {
      dispatch({ type: CollectionActionTypes.GET_COLLECTION_LIST_FAIL, payload: error.response.data.message });
    }
  )
};
export const resetGetCollectionList = () => {
  return dispatch => {
    dispatch({
      type: CollectionActionTypes.GET_COLLECTION_LIST_RESET,
      payload: {}
    })
  }
}
export const getAddProductCollectionList = (businessid) => {
  return (dispatch) => {
    dispatch({
      type: CollectionActionTypes.GET_ADD_PRODUCT_COLLECTION_LIST_LOADING,
    })
    CollectionRequest.get(
      CollectionRequest.endpoint.CollectionListBusiness.replace("__VAL__", businessid),
      (success) => {
        dispatch({
          type: CollectionActionTypes.GET_ADD_PRODUCT_COLLECTION_LIST_SUCCESS,
          payload: success.data.data
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}

export const resetAddProductCollectionList = () => {
  return dispatch => {
    dispatch({
      type: CollectionActionTypes.GET_ADD_PRODUCT_COLLECTION_LIST_RESET,
      payload: {}
    })
  }
}

export const createAddProductCollection = (businessid, data, collActive) => {
  return (dispatch) => {
    dispatch({ type: CollectionActionTypes.CREATE_ADD_PRODUCT_COLLECTION_LOADING });
    CollectionRequest.post(
      CollectionRequest.endpoint.createCollection.replace("_BUSINESSID_", businessid),
      data,
      (success) => {
        dispatch({
          type: CollectionActionTypes.CREATE_ADD_PRODUCT_COLLECTION_SUCCESS,
          payload: { ...success.data.data, collActive }
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    )
  }
}

export const resetCreateAddProductCollection = () => {
  return (dispatch) => {
    dispatch({
      type: CollectionActionTypes.CREATE_ADD_PRODUCT_COLLECTION_RESET
    })
  }
}
// const getCollectionList = (val, type) => async (dispatch) => {
//   try {
//     dispatch({ type: CollectionActionTypes.GET_COLLECTION_LIST_LOADING });
//     let url;

//     if (type === 'domain' || type === 'subdomain') {
//       url = `${API_PRODUCT}/CollectionList?${type}=${val}`;
//     } else {
//       url = `${API_PRODUCT}/CollectionList?businessid=${val}`;
//     }
//     const list = await getRequest(url);
//     if (list.status === 200) {
//       dispatch({ type: CollectionActionTypes.GET_COLLECTION_LIST_SUCCESS, payload: list.data.data });
//     }

//   } catch (error) {

//     dispatch({ type: CollectionActionTypes.GET_COLLECTION_LIST_FAIL, payload: error });
//   }
// };

const getCollectionDetail = (id, businessid) => async (dispatch) => {
  dispatch({ type: CollectionActionTypes.GET_COLLECTION_DETAILS_LOADING });
  CollectionRequest.get(
    CollectionRequest.endpoint.CollectionDetail
      .replace("__ID__", id).replace("_BUSINESSID_", businessid),
    (success) => {
      // console.log(success.data.data, "v")
      dispatch({
        type: CollectionActionTypes.GET_COLLECTION_DETAILS_SUCCESS,
        payload: success.data.data,
      });
    },
    (error) => {
      dispatch({
        type: CollectionActionTypes.GET_COLLECTION_DETAILS_FAIL,
        payload: error.message
      });
    }
  )
};



// const getCollectionDetail = (id) => {
//   console.log(id, "dushyajnt")
//   return dispatch => {

//     dispatch({
//       type: CollectionActionTypes.GET_COLLECTION_DETAILS_LOADING,
//       payload: [],
//     })

//     // return (dispatch) => {
//     CollectionRequest.get(CollectionRequest.endpoint.CollectionDetail.replace("__ID__", id),
//       (success) => {
//         dispatch({
//           type: CollectionActionTypes.GET_COLLECTION_DETAILS_SUCCESS,
//           payload: success.data.data,
//         });
//         console.log(success.data.data, "nancy solution")

//       },
//       (error) => {
//         dispatch(setCommonError(error.message));
//       }
//     )
//     // }
//   }
// }

// export const getAdmissionList = (insID) => {
//   return dispatch => {

//     dispatch({
//       type: AdmissionActionTypes.ADMISSION_LIST_LOADING,
//       payload: [],
//     })

//     AdmissionRequest.get(AdmissionRequest.AdmissionEndpoint.getAdmission.replace("__INSID__", insID),
//       (success) => {

//         dispatch({
//           type: AdmissionActionTypes.ADMISSION_LIST_LOADED,
//           payload: success.data.admissionList
//         })

//       },
//       error => {
//         dispatch(setCommonError(error.message))
//       });

//   }
// }


// const getCollectionDetail = (id) => async (dispatch) => {

//   try {
//     dispatch({ type: CollectionActionTypes.GET_COLLECTION_DETAILS_LOADING });
//     const url = `${API_PRODUCT}/Collection/${id}`;
//     const list = await getRequest(url);
//     if (list.status === 200) {
//       dispatch({
//         type: CollectionActionTypes.GET_COLLECTION_DETAILS_SUCCESS,
//         payload: list.data.data,
//       });
//     }

//   } catch (error) {

//     dispatch({ type: CollectionActionTypes.GET_COLLECTION_DETAILS_FAIL, payload: error });
//   }
// };

const deleteCollection = (businessid, id) => {
  return (dispatch) => {
    dispatch({
      type: CollectionActionTypes.DELETE_COLLECTION_LOADING,
    })
    CollectionRequest.delete
      (CollectionRequest.endpoint.deleteCollection.replace("_BUSINESSID_", businessid).replace("__ID__", id),
        (success) => {
          dispatch({
            type: CollectionActionTypes.DELETE_COLLECTION_SUCCESS,
            payload: id,
          });
        },
        (error) => {
          dispatch(setCommonError(error.message));
        }
      )
  }
};

// const deleteCollection = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: CollectionActionTypes.DELETE_COLLECTION_LOADING });
//     const url = `${API_PRODUCT}/deleteCollection/${id}`;
//     const list = await getRequest(url);
//     if (list.status === 200) {
//       const url1 = `${API_PRODUCT}/CollectionList`;
//       const list1 = await getRequest(url1);
//       if (list1.status === 200) {
//         dispatch({ type: CollectionActionTypes.DELETE_COLLECTION_SUCCESS, payload: list1.data.data });
//       }
//     }

//   } catch (error) {

//     dispatch({ type: CollectionActionTypes.DELETE_COLLECTION_FAIL, payload: error });
//   }
// };

////////////////////////////// CUSTOMER WISHLIST ////////////////////////

export const resetWishlist = () => {
  return (dispatch) => {
    dispatch({ type: CollectionActionTypes.GET_WISHLIST_RESET });
  }
}

const getWishList = (body) => async (dispatch) => {
  dispatch({ type: CollectionActionTypes.GET_WISHLIST_LOADING });
  CollectionRequest.post(
    CollectionRequest.endpoint.addProduct,
    body,
    (success) => {
      dispatch({ type: CollectionActionTypes.GET_WISHLIST_SUCCESS, payload: success.data.data });
    },
    (error) => {
      dispatch({ type: CollectionActionTypes.GET_WISHLIST_FAIL, payload: error.response.data.message });
    }
  )
};

// const getWishList = (body) => async (dispatch) => {
//   try {
//     dispatch({ type: CollectionActionTypes.GET_WISHLIST_LOADING });
//     // const body = {
//     //   userId: "626f74dd6da9d86db736178d",
//     //   status: "readWishList",
//     // };
//     const url = `${API_PRODUCT}/AddProduct`;
//     const list = await postRequest(url, body);
//     if (list.status === 200) {
//       dispatch({ type: CollectionActionTypes.GET_WISHLIST_SUCCESS, payload: list.data.data });
//     }

//   } catch (error) {

//     dispatch({ type: CollectionActionTypes.GET_WISHLIST_FAIL, payload: error });
//   }
// };

const wishListToCart = (body) => async (dispatch) => {
  dispatch({ type: CollectionActionTypes.MOVE_WISHLIST_TO_CART_LOADING });
  CollectionRequest.get(
    CollectionRequest.endpoint.wishlistToCart.replace("__B_ID__", body.business).replace("__U_ID__", body.userId).replace("__V_ID__", body.variationId),
    (success) => {
      const body1 = {
        userId: body.userId,
        status: "readWishList",
      };
      CollectionRequest.post(
        CollectionRequest.endpoint.addProduct,
        body1,
        (success) => {
          dispatch({
            type: CollectionActionTypes.MOVE_WISHLIST_TO_CART_SUCCESS,
            payload: success.data.data,
          });
        },
        (error) => {
          dispatch({ type: CollectionActionTypes.MOVE_WISHLIST_TO_CART_FAIL, payload: error.response.data.message });
        }
      )
    },
    (error) => {
      dispatch({ type: CollectionActionTypes.MOVE_WISHLIST_TO_CART_FAIL, payload: error.response.data.message });
    }
  )
};

// const wishListToCart = (body) => async (dispatch) => {
//   try {
//     dispatch({ type: CollectionActionTypes.MOVE_WISHLIST_TO_CART_LOADING });
//     const url = `${API_PRODUCT}/AddProduct`;
//     const resp = await postRequest(url, body);
//     if (resp.status === 200) {
//       const body1 = {
//         userId: "626f74dd6da9d86db736178d",
//         status: "readWishList",
//       };
//       const list = await postRequest(url, body1);
//       if (list.status === 200) {
//         dispatch({
//           type: CollectionActionTypes.MOVE_WISHLIST_TO_CART_SUCCESS,
//           payload: list.data.data,
//         });

//       }
//     }
//   } catch (error) {

//     dispatch({ type: CollectionActionTypes.MOVE_WISHLIST_TO_CART_FAIL, payload: error });
//   }
// };

export {
  createCollection,
  getCollectionList,
  editCollection,
  editMultiCollection,
  deleteCollection,
  getCollectionDetail,
  getWishList,
  wishListToCart,
};
