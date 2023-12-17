import { REQUEST_TYPE } from "../actions/Testimonial/actionTypes";

const INITIAL_STATE = {
  TestimonialList: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  ReviewList: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  ReviewListForUser: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  postEdneedReview: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  updateEdneedReview: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  updateReview: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  deleteEdneedReview: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  addTestimonial: {
    data: [],
    isloading: false,
    success: false,
    error: false,
  },
  updateTestimonial: {
    data: [],
    isloading: true,
  },
  dataid: {
    data: "",
    loading: false,
    success: false,
    error: false,
  },
  deteteTestimonial: {
    data: {},
    success: false,
  },
  rating: "",
  singleTestimonialData: {
    data: {},
    success: false,
  },

  allTestimonials: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  isLoaded: false,
};

const testimonialStore = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case REQUEST_TYPE.GET_TESTIMONIAL: {
      return {
        ...state,
        TestimonialList: {
          ...state.TestimonialList,
          data: payload,
          loading: false,
          success: true,
        },
      };
    }
    case REQUEST_TYPE.GET_ALL_REVIEWS_FOR_USER: {
      return {
        ...state,
        ReviewListForUser: {
          ...state.ReviewListForUser,
          data: payload,
          loading: false,
          success: true,
        },
      };
    }
    case REQUEST_TYPE.SEARCH_FOR_USER_REVIEW: {
      return {
        ...state,
        ReviewListForUser: {
          ...state.ReviewListForUser,
          data: payload,
          loading: false,
          success: true,
        },
      };
    }

    case REQUEST_TYPE.GET_ALL_REVIEWS_FOR_USER_LOADING: {
      return {
        ...state,
        ReviewListForUser: {
          ...state.ReviewListForUser,
          data: {},
          loading: true,
          success: false,
        },
      };
    }
    case REQUEST_TYPE.GET_ALL_REVIEWS: {
      return {
        ...state,
        ReviewList: {
          ...state.ReviewList,
          data: payload,
          loading: false,
          success: true,
        },
      };
    }
    case REQUEST_TYPE.SEARCH_REVIEWS: {
      return {
        ...state,
        ReviewList: {
          ...state.ReviewList,
          data: payload,
          loading: false,
          success: true,
        },
      };
    }
    case REQUEST_TYPE.GET_ALL_REVIEWS_LOADING: {
      return {
        ...state,
        ReviewList: {
          ...state.ReviewList,
          data: {},
          loading: true,
          success: false,
        },
      };
    }
    case REQUEST_TYPE.POST_EDNEED_REVIEW: {
      return {
        ...state,
        postEdneedReview: {
          ...state.postEdneedReview,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        ReviewListForUser: {
          ...state.ReviewListForUser,
          data: state.ReviewListForUser.data.concat(payload)
        }
      }
    }
    case REQUEST_TYPE.POST_EDNEED_REVIEW_LOADING: {
      return {
        ...state,
        postEdneedReview: {
          ...state.postEdneedReview,
          data: {},
          loading: true,
          success: false,
          error: false
        }
      }
    }
    case REQUEST_TYPE.TESTIMONIAL_FEATURE_MARKED: {
      return {
        ...state,
        TestimonialList: {
          ...state.TestimonialList,
          data: payload,
          loading: false,
          success: true,
        },
      };
    }
    case REQUEST_TYPE.TESTIMONIAL_FEATURE_NOT_MARKED: {
      return {
        ...state,
        TestimonialList: {
          ...state.TestimonialList,
          data: payload,
          loading: false,
          success: true,
        },
      };
    }
    case REQUEST_TYPE.SEARCH_TESTIMONIAL: {
      return {
        ...state,
        TestimonialList: {
          ...state.TestimonialList,
          data: payload,
          loading: false,
          success: true,
        },
      };
    }
    case REQUEST_TYPE.TESTIMONIAL_SORT_BY_LTH: {
      return {
        ...state,
        TestimonialList: {
          ...state.TestimonialList,
          data: payload,
          loading: false,
          success: true,
        },
      };
    }
    case REQUEST_TYPE.TESTIMONIAL_SORT_BY_HTL: {
      return {
        ...state,
        TestimonialList: {
          ...state.TestimonialList,
          data: payload,
          loading: false,
          success: true,
        },
      };
    }
    case REQUEST_TYPE.TESTIMONIAL_LOADING: {
      return {
        ...state,
        TestimonialList: {
          ...state.TestimonialList,
          data: payload,
          success: false,
          loading: true
        },
      };
    }
    case REQUEST_TYPE.POST_TESTIMONIAL: {
      return {
        ...state,
        addTestimonial: {
          data: payload,
          success: true,
          isloading: false,
          error: false,
        },
        TestimonialList: {
          data: payload.concat(state.TestimonialList.data),
          isloading: false,
        },
        isLoaded: true,
      };
    }

    case REQUEST_TYPE.POST_TESTIMONIAL_LOADING:
      return ({
        ...state,
        addTestimonial: {
          ...state.addTestimonial,
          isloading: true,
          success: false,
          error: false
        }
      })

    case REQUEST_TYPE.POST_TESTIMONIAL_RESET:
      return {
        ...state,
        addTestimonial: {
          ...state.addTestimonial,
          isloading: false,
          success: false,
          error: false
        },
      }

    case REQUEST_TYPE.UPDATE_TESTIMONIAL: {
      return {
        ...state,
        updateTestimonial: {
          data: payload,
          isloading: false,
        },
        TestimonialList: {
          ...state.TestimonialList,
          data: state.TestimonialList.data.map((testimonialData) =>
            testimonialData._id === payload._id
              ? {
                ...testimonialData,
                isFeatureMarked: payload.isFeatureMarked,
              }
              : testimonialData
          ),
          isloading: false,
        },
      };
    }

    case REQUEST_TYPE.UPDATE_SINGLE_TESTIMONIAL: {
      return {
        ...state,
        updateTestimonial: {
          data: payload,
          isloading: false,
        },
        TestimonialList: {
          ...state.TestimonialList,
          data: state.TestimonialList.data.map((testimonialData) =>
            testimonialData._id === payload._id
              ? {
                ...testimonialData,
                ...payload,
              }
              : testimonialData
          ),
          success: true,
          isloading: false,
        },
      };
    }

    case REQUEST_TYPE.DELETE_TESTIMONIAL: {
      return {
        ...state,
        deteteTestimonial: {
          ...state.deteteTestimonial,
          data: payload,
          success: true,
        },
        TestimonialList: {
          ...state.TestimonialList,
          data: state.TestimonialList.data.filter(
            (item) => item._id !== payload
          ),
          success: true,
        },
      };
    }

    case REQUEST_TYPE.RATING: {
      return {
        ...state,
        rating: payload,
      };
    }

    case REQUEST_TYPE.SINGLE_TESTIMONIAL_DATA: {
      return {
        ...state,
        singleTestimonialData: {
          ...state.singleTestimonialData,
          data: payload,
          success: true,
        },
      };
    }

    case REQUEST_TYPE.CLEAR_TESTIMONIAL_DATA: {
      return {
        ...state,
        singleTestimonialData: {
          ...state.singleTestimonialData,
          data: payload,
          success: false,
        },
        // rating: state.singleTestimonialData.data.rating,
      };
    }
    case REQUEST_TYPE.GET_SINGLE_EDNEED_REVIEW_LOADING: {
      return {
        ...state,
        updateEdneedReview: {
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      }
    }
    case REQUEST_TYPE.GET_SINGLE_EDNEED_REVIEW: {
      return {
        ...state,
        updateEdneedReview: {
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      }
    }
    case REQUEST_TYPE.UPDATE_EDNEED_REVIEW_LOADING: {
      return {
        ...state,
        updateReview: {
          data: {},
          loading: true,
          success: false,
          error: false,
        }
      }
    }
    case REQUEST_TYPE.UPDATE_EDNEED_REVIEW: {
      return {
        ...state,
        updateReview: {
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        ReviewListForUser: {
          ...state.ReviewListForUser,
          data: state.ReviewListForUser.data.map((testimonialData) =>
            testimonialData._id === payload._id
              ? {
                ...testimonialData,
                ...payload,
              }
              : testimonialData
          ),
          success: true,
          loading: false
        },
      };
    }

    case REQUEST_TYPE.DELETE_REVIEW_LOADING: {
      return {
        ...state,
        deleteEdneedReview: {
          ...state.deleteEdneedReview,
          data: {},
          success: false,
          loading: true,
          error: false,
        },

      };
    }
    case REQUEST_TYPE.DELETE_REVIEW: {
      return {
        ...state,
        deleteEdneedReview: {
          ...state.deleteEdneedReview,
          data: payload,
          success: true,
          loading: false,
          error: false
        },
        ReviewListForUser: {
          ...state.ReviewListForUser,
          data: state.ReviewListForUser.data.filter(
            (item) => item._id !== payload
          ),
          success: true,
        },
      };
    }
    case REQUEST_TYPE.ALL_TESTIMONIAL_LOADING: {
      return {
        ...state,
        allTestimonials: {
          ...state.allTestimonials,
          data: [],
          success: false,
          loading: true,
          error: false
        },
      };
    }
    case REQUEST_TYPE.ALL_TESTIMONIAL_LOADED: {
      return {
        ...state,
        allTestimonials: {
          ...state.allTestimonials,
          data: payload,
          success: true,
          loading: false,
          error: false
        },
      };
    }
    case REQUEST_TYPE.RESET_EDNEED_REVIEW:
      return (INITIAL_STATE);
    default:
      return state;
  }
};

// case REQUEST_TYPE.UPDATE_EDNEED_REVIEW: {
//   return {
//     ...state,
//     deteteTestimonial: {
//       ...state.deteteTestimonial,
//       data: payload,
//       success: true,
//     },
//     TestimonialList: {
//       ...state.TestimonialList,
//       data: state.TestimonialList.data.filter(
//         (item) => item._id !== payload
//       ),
//       success: true,
//     },
//   };
// }

export default testimonialStore;
