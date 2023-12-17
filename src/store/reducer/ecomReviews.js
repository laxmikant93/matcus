import { Ecomm_Reviews_ActionTypes } from "../actions/ecomReviews/ActionTypes"


const ECOMMERCE_CURRENCY_INITIAL_STATE = {
  getReviewsList: {
    data: [],
    all: 0,
    deleted: 0,
    pending: 0,
    mine: 0,
    rejected: 0,
    published: 0,
    success: false,
    loading: false,
    error: false,
  },
  postReviewData: {
    data: [],
    success: false,
    loading: false,
    error: false,
  },
  patchReviewData: {
    data: [],
    success: false,
    loading: false,
    error: false,
  },
  getSingleReviewData: {
    data: [],
    success: false,
    loading: false,
    error: false,
  },
  deleteReviewData: {
    data: [],
    success: false,
    loading: false,
    error: false,
  },
  postReviewReplyData: {
    data: [],
    success: false,
    loading: false,
    error: false,
  },
  deleteReviewReplyData: {
    data: [],
    success: false,
    loading: false,
    error: false,
  },
  patchReviewReplyData: {
    data: [],
    success: false,
    loading: false,
    error: false,
  },
  readUnReadReviewData: {
    data: [],
    success: false,
    loading: false,
    error: false,
  },
  reviewId: "",
  getProductReviewsData: {
    data: [],
    success: false,
    loading: false,
    error: false,
  },
  getBuyerProductReview:{
    data: [],
    success: false,
    loading: false,
    error: false,
  }
}


const ecommerceReviews = (state = ECOMMERCE_CURRENCY_INITIAL_STATE, { type, payload, status }) => {

  switch (type) {
    case Ecomm_Reviews_ActionTypes.GET_ADMIN_REVIEW_LOADING:
      return ({
        ...state,
        getReviewsList: {
          ...state.getReviewsList,
          data: [],
          all: 0,
          deleted: 0,
          pending: 0,
          mine: 0,
          rejected: 0,
          published: 0,
          loading: true,
          success: false,
          error: false,
        }
      })

    case Ecomm_Reviews_ActionTypes.GET_ADMIN_REVIEW_LOADED:
      return ({
        ...state,
        getReviewsList: {
          ...state.getReviewsList,
          data: payload.reviews,
          all: payload.all ? payload.all : 0,
          deleted: payload.deleted ? payload.deleted : 0,
          pending: payload.pending ? payload.pending : 0,
          mine: payload.admin ? payload.admin : 0,
          rejected: payload.rejected ? payload.rejected : 0,
          published: payload.approved ? payload.approved : 0,
          loading: false,
          success: true,
          error: false,
        }
      })

    case Ecomm_Reviews_ActionTypes.GET_ADMIN_REVIEW_ERROR:
      return ({
        ...state,
        getReviewsList: {
          ...state.getReviewsList,
          data: [],
          all: "",
          deleted: "",
          pending: "",
          mine: "",
          rejected: "",
          published: "",
          loading: false,
          success: false,
          error: true,
        }
      })

    case Ecomm_Reviews_ActionTypes.GET_ADMIN_REVIEW_RESET:
      return ({
        ...state,
        getReviewsList: {
          ...state.getReviewsList,
          data: [],
          all: 0,
          deleted: 0,
          pending: 0,
          mine: 0,
          rejected: 0,
          published: 0,
          loading: false,
          success: false,
          error: false,
        }
      })

    case Ecomm_Reviews_ActionTypes.POST_ADMIN_REVIEW_LOADING:
      return ({
        ...state,
        postReviewData: {
          ...state.postReviewData,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case Ecomm_Reviews_ActionTypes.POST_ADMIN_REVIEW_LOADED:
      return ({
        ...state,
        postReviewData: {
          ...state.postReviewData,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        getReviewsList: {
          ...state.getReviewsList,
          data: [payload].concat(state.getReviewsList.data),
          success: true,
          all: state.getReviewsList.all + 1,
          pending: payload.status === "Pending" ? state.getReviewsList.pending + 1 : state.getReviewsList.pending,
          mine: payload.creator === "admin" ? state.getReviewsList.mine + 1 : state.getReviewsList.mine,
          published: payload.status === "Published" ? state.getReviewsList.published + 1 : state.getReviewsList.published,
        }
      })

    case Ecomm_Reviews_ActionTypes.POST_ADMIN_REVIEW_ERROR:
      return ({
        ...state,
        postReviewData: {
          ...state.postReviewData,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case Ecomm_Reviews_ActionTypes.POST_ADMIN_REVIEW_RESET:
      return ({
        ...state,
        postReviewData: {
          ...state.postReviewData,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case Ecomm_Reviews_ActionTypes.GET_SINGLE_REVIEW_LOADING:
      return ({
        ...state,
        getSingleReviewData: {
          ...state.getSingleReviewData,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case Ecomm_Reviews_ActionTypes.GET_SINGLE_REVIEW_LOADED:
      return ({
        ...state,
        getSingleReviewData: {
          ...state.getSingleReviewData,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })

    case Ecomm_Reviews_ActionTypes.GET_SINGLE_REVIEW_ERROR:
      return ({
        ...state,
        getSingleReviewData: {
          ...state.getSingleReviewData,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case Ecomm_Reviews_ActionTypes.GET_SINGLE_REVIEW_RESET:
      return ({
        ...state,
        getSingleReviewData: {
          ...state.getSingleReviewData,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case Ecomm_Reviews_ActionTypes.PATCH_ADMIN_REVIEW_LOADING:
      return ({
        ...state,
        patchReviewData: {
          ...state.patchReviewData,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case Ecomm_Reviews_ActionTypes.PATCH_ADMIN_REVIEW_LOADED:
      return ({
        ...state,
        patchReviewData: {
          ...state.patchReviewData,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        getReviewsList: {
          ...state.getReviewsList,
          success: true,
          data: state.getReviewsList.data.map((content) => {
            return (content._id === payload._id ? payload : content);
          })
        }
      })

    case Ecomm_Reviews_ActionTypes.PATCH_ADMIN_REVIEW_ERROR:
      return ({
        ...state,
        patchReviewData: {
          ...state.patchReviewData,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case Ecomm_Reviews_ActionTypes.PATCH_ADMIN_REVIEW_RESET:
      return ({
        ...state,
        patchReviewData: {
          ...state.patchReviewData,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case Ecomm_Reviews_ActionTypes.DELETE_REVIEW_LOADING:
      return ({
        ...state,
        deleteReviewData: {
          ...state.deleteReviewData,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case Ecomm_Reviews_ActionTypes.DELETE_REVIEW_LOADED:
      return ({
        ...state,
        deleteReviewData: {
          ...state.deleteReviewData,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        getReviewsList: {
          ...state.getReviewsList,
          success: true,
          published: payload.status === "Published" ? state.getReviewsList.published - 1 : state.getReviewsList.published,
          mine: payload.creator === "admin" ? state.getReviewsList.mine - 1 : state.getReviewsList.mine,
          deleted: state.getReviewsList.deleted + 1,
          all: state.getReviewsList.all - 1,
          pending: payload.status === "pending" ? state.getReviewsList.pending - 1 : state.getReviewsList.pending,
          rejected: payload.status === "Rejected" ? state.getReviewsList.rejected - 1 : state.getReviewsList.rejected,
          data: state.getReviewsList.data.filter((item) => item._id !== payload._id),
        }
      })

    case Ecomm_Reviews_ActionTypes.DELETE_REVIEW_ERROR:
      return ({
        ...state,
        deleteReviewData: {
          ...state.deleteReviewData,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case Ecomm_Reviews_ActionTypes.DELETE_REVIEW_RESET:
      return ({
        ...state,
        deleteReviewData: {
          ...state.deleteReviewData,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case Ecomm_Reviews_ActionTypes.MULTIPLE_DELETE_REVIEW_LOADED:
      let data = state.getReviewsList.data.filter((item) => !payload.payloadData.review.includes(item._id))
      return {
        ...state,
        deleteReviewData: {
          ...state.deleteReviewData,
          data: payload,
          success: true,
          loading: false
        },
        getReviewsList: {

          data: data,
          success: true,
          loading: false,
          published: payload?.successData?.count?.approved ? payload.successData.count.approved : 0,
          mine: payload?.successData?.count?.admin ? payload.successData.count.admin : 0,
          deleted: payload?.successData?.count?.deleted ? payload.successData.count.deleted : 0,
          all: payload?.successData?.count?.all ? payload.successData.count.all : 0,
          pending: payload?.successData?.count?.pending ? payload.successData.count.pending : 0,
          rejected: payload?.successData?.count?.rejected ? payload.successData.count.rejected : 0,
        },
      };

    case Ecomm_Reviews_ActionTypes.READ_UNREAD_REVIEWS_SUCCESS:
      return ({
        ...state,
        readUnReadReviewData: {
          ...state.readUnReadReviewData,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        getReviewsList: {
          ...state.getReviewsList,
          success: true,
          data: state.getReviewsList.data.map((content) => {
            return (content._id === payload._id ? payload : content);
          })
        }
      })

    case Ecomm_Reviews_ActionTypes.REPLY_STATUS_UPDATE_SUCCESS:
      return ({
        ...state,
        patchReviewReplyData: {
          ...state.patchReviewReplyData,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        getSingleReviewData: {
          ...state.getSingleReviewData,
          success: true,
          data: payload
        }
      })

    case Ecomm_Reviews_ActionTypes.POST_REVIEW_REPLY_LOADING:
      return ({
        ...state,
        postReviewReplyData: {
          ...state.postReviewReplyData,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case Ecomm_Reviews_ActionTypes.POST_REVIEW_REPLY_LOADED:
      return ({
        ...state,
        postReviewReplyData: {
          ...state.postReviewReplyData,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        getSingleReviewData: {
          ...state.getSingleReviewData,
          success: true,
          data: {
            ...state.getSingleReviewData.data,
            review: payload
          }
        },
        getReviewsList: {
          ...state.getReviewsList,
          data: state.getReviewsList.data.map((item) => {
            return (
              item._id === payload._id ?
                {
                  ...item,
                  reply: payload.reply
                }
                : item
            )
          }),
          success: true,
        }
      })

    case Ecomm_Reviews_ActionTypes.POST_REVIEW_REPLY_ERROR:
      return ({
        ...state,
        postReviewReplyData: {
          ...state.postReviewReplyData,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case Ecomm_Reviews_ActionTypes.POST_REVIEW_REPLY_RESET:
      return ({
        ...state,
        postReviewReplyData: {
          ...state.postReviewReplyData,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case Ecomm_Reviews_ActionTypes.DELETE_REVIEW_REPLY_LOADED:
      return ({
        ...state,
        deleteReviewReplyData: {
          ...state.deleteReviewReplyData,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        getSingleReviewData: {
          ...state.getSingleReviewData,
          success: true,
          data: payload
        },
        getReviewsList: {
          ...state.getReviewsList,
          data: state.getReviewsList.data.map((item) => {
            return (
              item._id === payload._id ?
                {
                  ...item,
                  reply: payload.reply
                }
                : item
            )
          }),
          success: true,
        }
      })

    case Ecomm_Reviews_ActionTypes.REVIEW_STATUS_UPDATE_SUCCESS:
      return ({
        ...state,
        patchReviewData: {
          ...state.patchReviewData,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        getReviewsList: {
          ...state.getReviewsList,
          success: true,
          data: state.getReviewsList.data.map((content) => {
            return (content._id === payload._id ?
              { ...content, status: payload.status }
              : content);
          }),
          published: payload.status === "Published" ? state.getReviewsList.published + 1 : state.getReviewsList.published,
          pending: status && status === "reject" ? state.getReviewsList.pending : state.getReviewsList.pending - 1,
          rejected: status && status === "reject" ? state.getReviewsList.rejected - 1 : payload.status === "Rejected" ? state.getReviewsList.rejected + 1 : state.getReviewsList.rejected,
        }
      })

    case Ecomm_Reviews_ActionTypes.MULTIPLE_PERMANANT_DELETE_LOADED:
      let permanentDelete = state.getReviewsList.data.filter((item) => !payload.review.includes(item._id))
      return {
        ...state,
        deleteReviewData: {
          ...state.deleteReviewData,
          data: payload,
          success: true,
          loading: false
        },
        getReviewsList: {
          ...state.getReviewsList,
          data: permanentDelete,
          success: true,
          loading: false,
          deleted: state.getReviewsList.deleted - payload.review.length,
        },
      }

    case Ecomm_Reviews_ActionTypes.MULTIPLE_RESTORE_REVIEW_LOADED:
      let restoreData = state.getReviewsList.data.filter((item) => !payload.payloadData.review.includes(item._id))
      return {
        ...state,
        deleteReviewData: {
          ...state.deleteReviewData,
          data: payload,
          success: true,
          loading: false
        },
        getReviewsList: {
          ...state.getReviewsList,
          data: restoreData,
          success: true,
          loading: false,
          published: payload?.successData?.count?.approved ? payload.successData.count.approved : 0,
          mine: payload?.successData?.count?.admin ? payload.successData.count.admin : 0,
          deleted: payload?.successData?.count?.deleted ? payload.successData.count.deleted : 0,
          all: payload?.successData?.count?.all ? payload.successData.count.all : 0,
          pending: payload?.successData?.count?.pending ? payload.successData.count.pending : 0,
          rejected: payload?.successData?.count?.rejected ? payload.successData.count.rejected : 0,
        },
      }

    case Ecomm_Reviews_ActionTypes.SET_REVIEW_ID_SUCCESS:
      return {
        ...state,
        reviewId: payload,
      }

    case Ecomm_Reviews_ActionTypes.GET_PRODUCT_REVIEW_LOADING:
      return ({
        ...state,
        getProductReviewsData: {
          ...state.getProductReviewsData,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case Ecomm_Reviews_ActionTypes.GET_PRODUCT_REVIEW_LOADED:
      return ({
        ...state,
        getProductReviewsData: {
          ...state.getProductReviewsData,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })
    case Ecomm_Reviews_ActionTypes.GET_PRODUCT_REVIEW_ERROR:
      return ({
        ...state,
        getProductReviewsData: {
          ...state.getProductReviewsData,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case Ecomm_Reviews_ActionTypes.GET_PRODUCT_REVIEW_RESET:
      return ({
        ...state,
        getProductReviewsData: {
          ...state.getProductReviewsData,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

      case Ecomm_Reviews_ActionTypes.GET_BUYER_PRODUCT_RELATION:
        return ({
          ...state,
          getBuyerProductReview: {
            ...state.getBuyerProductReview,
            data: payload,
            loading: false,
            success: true,
            error: false
          }
        })

    default:
      return state
  }
}


export default ecommerceReviews