import { setCommonError } from "../commonerror";
import { showErrorToast, showSuccessPopup, showSuccessToast, showWarningToast } from "../successmessagepopup";
import { Ecomm_Reviews_ActionTypes } from "./ActionTypes";
import EcomReviewsRequest from "./ReviewsRequest";


export const postReviewDetails = (id, data, type) => {
  return dispatch => {

    dispatch({
      type: Ecomm_Reviews_ActionTypes.POST_ADMIN_REVIEW_LOADING,
      payload: [],
    })

    EcomReviewsRequest.post(EcomReviewsRequest.EcomCurrencyEndpoint.postReview.replace("_BUSINESS_", id), data,
      (success) => {
        dispatch({
          type: Ecomm_Reviews_ActionTypes.POST_ADMIN_REVIEW_LOADED,
          payload: success.data.data
        })
        if(type==="user"){
          dispatch(showSuccessToast("Review Submitted Successfully!"));
        }
        else{
          dispatch(showSuccessPopup("Review Posted!"));
        }
      },
      error => {
        dispatch(setCommonError(error.message))
      });

  }
}

export const postReviewDetailsReset = () => {
  return dispatch => {
    dispatch({
      type: Ecomm_Reviews_ActionTypes.POST_ADMIN_REVIEW_RESET,
      payload: []
    })
  }
}

export const getAllReviewList = (id, sort, status, search, limit, page) => {
  return dispatch => {

    dispatch({
      type: Ecomm_Reviews_ActionTypes.GET_ADMIN_REVIEW_LOADING,
      payload: [],
    })
    if(limit){
      EcomReviewsRequest.get(EcomReviewsRequest.EcomCurrencyEndpoint.getReviews.replace("_BUSINESS_", id)
      .replace("_SORT_", sort).replace("_STATUS_", status).replace("_SEARCH_", search)
      .replace("_LIMIT_", limit).replace("_PAGE_", page),
      (success) => {
        dispatch({
          type: Ecomm_Reviews_ActionTypes.GET_ADMIN_REVIEW_LOADED,
          payload: success.data.data
        })
      },
      error => {
        dispatch(setCommonError(error.message))
      });
    }
    

  }
}

export const getAllReviewListReset = () => {
  return dispatch => {
    dispatch({
      type: Ecomm_Reviews_ActionTypes.GET_ADMIN_REVIEW_RESET,
      payload: []
    })
  }
}

export const getSingleReview = (id) => {
  return dispatch => {

    dispatch({
      type: Ecomm_Reviews_ActionTypes.GET_SINGLE_REVIEW_LOADING,
      payload: [],
    })

    EcomReviewsRequest.get(EcomReviewsRequest.EcomCurrencyEndpoint.getReviewData.replace("_REVIEW_", id),
      (success) => {
        dispatch({
          type: Ecomm_Reviews_ActionTypes.GET_SINGLE_REVIEW_LOADED,
          payload: success.data.data
        })
      },
      error => {
        dispatch(setCommonError(error.message))
      });

  }
}

export const getSingleReviewReset = () => {
  return dispatch => {
    dispatch({
      type: Ecomm_Reviews_ActionTypes.GET_SINGLE_REVIEW_RESET,
      payload: []
    })
  }
}

export const patchReviewDetails = (id, data) => {
  return dispatch => {

    dispatch({
      type: Ecomm_Reviews_ActionTypes.PATCH_ADMIN_REVIEW_LOADING,
      payload: [],
    })

    EcomReviewsRequest.patch(EcomReviewsRequest.EcomCurrencyEndpoint.patchReview.replace("_BUSINESS_", id), data,
      (success) => {
        dispatch({
          type: Ecomm_Reviews_ActionTypes.PATCH_ADMIN_REVIEW_LOADED,
          payload: success.data.data
        })
      },
      error => {
        dispatch(setCommonError(error.message))
      });

  }
}

export const patchReviewDetailsReset = () => {
  return dispatch => {
    dispatch({
      type: Ecomm_Reviews_ActionTypes.PATCH_ADMIN_REVIEW_RESET,
      payload: []
    })
  }
}

export const deleteReview = (businessid, id) => {
  return dispatch => {

    dispatch({
      type: Ecomm_Reviews_ActionTypes.DELETE_REVIEW_LOADING,
      payload: [],
    })

    EcomReviewsRequest.delete(EcomReviewsRequest.EcomCurrencyEndpoint.deleteReview.replace("_BUSINESS_", businessid)
      .replace("_REVIEW_", id),
      (success) => {
        dispatch({
          type: Ecomm_Reviews_ActionTypes.DELETE_REVIEW_LOADED,
          payload: success.data.data
        })
      },
      error => {
        dispatch(setCommonError(error.message))
      });

  }
}

export const deleteReviewReset = () => {
  return dispatch => {
    dispatch({
      type: Ecomm_Reviews_ActionTypes.DELETE_REVIEW_RESET,
      payload: []
    })
  }
}

export const multipleDeleteReviewDetails = (id, data) => {
  return dispatch => {

    dispatch({
      type: Ecomm_Reviews_ActionTypes.PATCH_ADMIN_REVIEW_LOADING,
      payload: [],
    })

    EcomReviewsRequest.patch(EcomReviewsRequest.EcomCurrencyEndpoint.multipleDeleteReview.replace("_BUSINESS_", id), data,
      (success) => {
        dispatch({
          type: Ecomm_Reviews_ActionTypes.MULTIPLE_DELETE_REVIEW_LOADED,
          payload: { payloadData: data, successData: success.data.data }
        })
      },
      error => {
        dispatch(setCommonError(error.message))
      });
  }
}

export const readUnreadReviewReplies = (id, reviewID) => {
  return dispatch => {

    EcomReviewsRequest.patch(EcomReviewsRequest.EcomCurrencyEndpoint.readUnReadReview.replace("_BUSINESS_", id).replace("_REVIEW_", reviewID), {},
      (success) => {
        dispatch({
          type: Ecomm_Reviews_ActionTypes.READ_UNREAD_REVIEWS_SUCCESS,
          payload: success.data.data
        })
      },
      error => {
        dispatch(setCommonError(error.message))
      });
  }
}

export const replyStatusUpdate = (id, reviewID, data) => {
  return dispatch => {

    EcomReviewsRequest.patch(EcomReviewsRequest.EcomCurrencyEndpoint.patchReplyStatus.replace("_BUSINESS_", id).replace("_REVIEW_", reviewID), data,
      (success) => {
        dispatch({
          type: Ecomm_Reviews_ActionTypes.REPLY_STATUS_UPDATE_SUCCESS,
          payload: success.data.data
        })
      },
      error => {
        dispatch(setCommonError(error.message))
      });
  }
}

export const postReviewReply = (id, reviewID, data,type) => {
  return dispatch => {

    dispatch({
      type: Ecomm_Reviews_ActionTypes.POST_REVIEW_REPLY_LOADING,
      payload: [],
    })

    EcomReviewsRequest.post(EcomReviewsRequest.EcomCurrencyEndpoint.postReply.replace("_BUSINESS_", id).replace("_REVIEW_", reviewID), data,
      (success) => {
        dispatch({
          type: Ecomm_Reviews_ActionTypes.POST_REVIEW_REPLY_LOADED,
          payload: success.data.data
        })
        if(type ==="user"){
          dispatch(showSuccessToast("Reply Submitted Successfully!"));
        }
      },
      error => {
        dispatch(setCommonError(error.message))
      });
  }
}

export const postReviewReplyReset = () => {
  return dispatch => {
    dispatch({
      type: Ecomm_Reviews_ActionTypes.POST_REVIEW_REPLY_RESET,
      payload: []
    })
  }
}

export const deleteReviewReply = (businessid, reviewid, replyId) => {
  return dispatch => {

    dispatch({
      type: Ecomm_Reviews_ActionTypes.DELETE_REVIEW_REPLY_LOADING,
      payload: [],
    })

    EcomReviewsRequest.delete(EcomReviewsRequest.EcomCurrencyEndpoint.deleteReply.replace("_BUSINESS_", businessid)
      .replace("_REVIEW_", reviewid).replace("_REPLY_", replyId),
      (success) => {
        dispatch({
          type: Ecomm_Reviews_ActionTypes.DELETE_REVIEW_REPLY_LOADED,
          payload: success.data.data
        })
      },
      error => {
        dispatch(setCommonError(error.message))
      });

  }
}

export const deleteReviewReplyReset = () => {
  return dispatch => {
    dispatch({
      type: Ecomm_Reviews_ActionTypes.DELETE_REVIEW_REPLY_RESET,
      payload: []
    })
  }
}

export const reviewStatusUpdate = (id, reviewID, status, type) => {
  return dispatch => {

    EcomReviewsRequest.patch(EcomReviewsRequest.EcomCurrencyEndpoint.patchReviewStatus.replace("_BUSINESS_", id)
      .replace("_REVIEW_", reviewID).replace("_STATUS_", status), {},
      (success) => {
        dispatch({
          type: Ecomm_Reviews_ActionTypes.REVIEW_STATUS_UPDATE_SUCCESS,
          payload: success.data.data,
          status: type
        })
        if (status === "Published") {
          dispatch(showSuccessToast("Review Approved. See approved Reviews in Approved menu"));
        } else {
          dispatch(showErrorToast("Review Rejected. See rejected Reviews in Rejected menu"));
        }
      },
      error => {
        dispatch(setCommonError(error.message))
      });
  }
}

export const multiplePermanantDeleteReview = (id, data) => {
  return dispatch => {

    EcomReviewsRequest.patch(EcomReviewsRequest.EcomCurrencyEndpoint.multiplePermanantDelete.replace("_BUSINESS_", id), data,
      (success) => {
        dispatch({
          type: Ecomm_Reviews_ActionTypes.MULTIPLE_PERMANANT_DELETE_LOADED,
          payload: data
        })
      },
      error => {
        dispatch(setCommonError(error.message))
      });
  }
}

export const restoreMultipleReviews = (id, data) => {
  return dispatch => {

    EcomReviewsRequest.patch(EcomReviewsRequest.EcomCurrencyEndpoint.multipleRestoreReview.replace("_BUSINESS_", id), data,
      (success) => {
        dispatch({
          type: Ecomm_Reviews_ActionTypes.MULTIPLE_RESTORE_REVIEW_LOADED,
          payload: { payloadData: data, successData: success.data.data }
        })
      },
      error => {
        dispatch(setCommonError(error.message))
      });
  }
}

export const storeReviewId = (id) => {
  return dispatch => {
    dispatch({
      type: Ecomm_Reviews_ActionTypes.SET_REVIEW_ID_SUCCESS,
      payload: id
    })
  }
}

export const getProductReviewList = (id) => {
  return dispatch => {

    dispatch({
      type: Ecomm_Reviews_ActionTypes.GET_PRODUCT_REVIEW_LOADING,
      payload: [],
    })

    EcomReviewsRequest.get(EcomReviewsRequest.EcomCurrencyEndpoint.getProductReviews.replace("_PRODID_", id),
      (success) => {
        dispatch({
          type: Ecomm_Reviews_ActionTypes.GET_PRODUCT_REVIEW_LOADED,
          payload: success.data.data
        })
      },
      error => {
        dispatch(setCommonError(error.message))
      });
  }
}

export const getProductReviewListReset = () => {
  return dispatch => {
    dispatch({
      type: Ecomm_Reviews_ActionTypes.GET_PRODUCT_REVIEW_RESET,
      payload: []
    })
  }
}

export const getBuyerProductReviewDetails = (id, prodId, userId) => {
  return dispatch => {

    EcomReviewsRequest.get(EcomReviewsRequest.EcomCurrencyEndpoint.getBuyerProductRelation.replace("_PRODID_", prodId)
    .replace("_USER_",userId).replace("_BUSINESS_",id),
      (success) => {
        dispatch({
          type: Ecomm_Reviews_ActionTypes.GET_BUYER_PRODUCT_RELATION,
          payload: success.data.data
        })
      },
      error => {
        dispatch(setCommonError(error.message))
      });
  }
}