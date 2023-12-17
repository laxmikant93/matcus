import { REQUEST_TYPE } from "./actionTypes";
import TestimonialRequest from "./TestimonialRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const getTestimonial = (insId, industry) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.TESTIMONIAL_LOADING,
      loading: true,
    });
    TestimonialRequest.get(
      TestimonialRequest.urlEndpoint.TestimonialList.replace(
        "__INSID__",
        insId
      ).replace("__type__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.GET_TESTIMONIAL,
          payload: success.data.allTestimonialInfo.reverse(),
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const postTestimonial = (data) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.POST_TESTIMONIAL_LOADING,
      loading: true,
    });
    TestimonialRequest.post(
      TestimonialRequest.urlEndpoint.PostTestimonial,
      data,
      (success) => {
        success.status === 200 &&
          dispatch({
            type: REQUEST_TYPE.POST_TESTIMONIAL,
            payload: success.data.addInfo,
          });
        dispatch(showSuccessPopup("testimonial added Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const postTestimonialDataReset = () => {
  return dispatch => {

    dispatch({
      type: REQUEST_TYPE.POST_TESTIMONIAL_RESET,
      payload: []
    })
  }
}


export const testimonialFeaturedMarked = (insId, industry) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.TESTIMONIAL_LOADING,
      loading: true,
    });
    TestimonialRequest.get(
      TestimonialRequest.urlEndpoint.FeaturedMarked.replace("__INSID__", insId).replace("__type__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.TESTIMONIAL_FEATURE_MARKED,
          payload: success.data.allTestimonialInfo,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const testimonialFeaturedNotMarked = (insId, industry) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.TESTIMONIAL_LOADING,
      loading: true,
    });
    TestimonialRequest.get(
      TestimonialRequest.urlEndpoint.FeaturedNotMarked.replace(
        "__INSID__",
        insId
      ).replace("__type__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.TESTIMONIAL_FEATURE_NOT_MARKED,
          payload: success.data.allTestimonialInfo,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const testimonialSortByHTL = (insId, industry) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.TESTIMONIAL_LOADING,
      loading: true,
    });
    TestimonialRequest.get(
      TestimonialRequest.urlEndpoint.sortByHTL.replace("__INSID__", insId).replace("__type__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.TESTIMONIAL_SORT_BY_HTL,
          payload: success.data.allTestimonialInfo,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const testimonialSortByLTH = (insId, industry) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.TESTIMONIAL_LOADING,
      loading: true,
    });
    TestimonialRequest.get(
      TestimonialRequest.urlEndpoint.sortByLTH.replace("__INSID__", insId).replace("__type__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.TESTIMONIAL_SORT_BY_LTH,
          payload: success.data.allTestimonialInfo,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const searchTestimonial = (insId, name, industry) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.TESTIMONIAL_LOADING,
      loading: true,
    });
    TestimonialRequest.get(
      TestimonialRequest.urlEndpoint.Search.replace("__INSID__", insId).replace(
        "__NAME__",
        name
      ).replace("__type__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.SEARCH_TESTIMONIAL,
          payload: success.data.allTestimonialInfo,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const updateTestimonial = (Id, industry, data) => {
  return (dispatch) => {
    TestimonialRequest.patch(
      TestimonialRequest.urlEndpoint.EditTestimonial.replace("__Id__", Id).replace("__type__", industry),
      data,
      (success) => {
        dispatch({
          type: REQUEST_TYPE.UPDATE_TESTIMONIAL,
          payload: success.data.editInfo,
        });
        dispatch(showSuccessPopup("Testimonial updated successfully."));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const updateSingleTestimonial = (Id, industry, data) => {
  return (dispatch) => {
    TestimonialRequest.patch(
      TestimonialRequest.urlEndpoint.EditTestimonial.replace("__Id__", Id).replace("__type__", industry),
      data,
      (success) => {
        dispatch({
          type: REQUEST_TYPE.UPDATE_SINGLE_TESTIMONIAL,
          payload: success.data.editInfo,
        });
        dispatch(showSuccessPopup("Testimonial updated successfully."));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const rating = (data) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.RATING,
      payload: data,
    });
  };
};

export const setSingleTestimonialData = (data) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.SINGLE_TESTIMONIAL_DATA,
      payload: data,
    });
  };
};

export const clearSingleTestimonialData = () => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.CLEAR_TESTIMONIAL_DATA,
      payload: {},
    });
  };
};

export const deleteTestimonial = (Id, industry) => {
  return (dispatch) => {
    TestimonialRequest.delete(
      TestimonialRequest.urlEndpoint.DeleteTestimonial.replace("__Id__", Id).replace("__type__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.DELETE_TESTIMONIAL,
          payload: Id,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getAllReviewsForUser = (userId, industry) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.GET_ALL_REVIEWS_FOR_USER_LOADING,
      loading: true,
    });
    TestimonialRequest.get(
      TestimonialRequest.urlEndpoint.edneedReviewforUser.replace(
        "__USERID__",
        userId
      ).replace("__type__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.GET_ALL_REVIEWS_FOR_USER,
          payload: success.data.allTestimonialInfo.reverse(),
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getAllReviews = (industry) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.GET_ALL_REVIEWS_LOADING,
      loading: true,
    });
    TestimonialRequest.get(
      TestimonialRequest.urlEndpoint.edneedReview.replace("__type__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.GET_ALL_REVIEWS,
          payload: success.data.allTestimonialInfo,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const postEdneedReview = (data) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.POST_EDNEED_REVIEW_LOADING,
      loading: true,
    });
    TestimonialRequest.post(
      TestimonialRequest.urlEndpoint.postUserReview,
      data,
      (success) => {

        dispatch({
          type: REQUEST_TYPE.POST_EDNEED_REVIEW,
          payload: success.data.addInfo,
        });
        dispatch(showSuccessPopup("Your review has been submitted. It will be published in our testimonials section shortly."));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const searchForUserReviews = (userId, query, term, industry) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.GET_ALL_REVIEWS_FOR_USER_LOADING,
      loading: true,
    });
    TestimonialRequest.get(
      TestimonialRequest.urlEndpoint.searchForUserReview.replace(
        "__USERID__",
        userId
      ).replace("__QUERY__", query).replace("__TERM__", term).replace("__type__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.SEARCH_FOR_USER_REVIEW,
          payload: success.data.allTestimonialInfo,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const searchReviews = (query, term, industry) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.GET_ALL_REVIEWS_LOADING,
      loading: true,
    });
    TestimonialRequest.get(
      TestimonialRequest.urlEndpoint.searchForEdneedReview.replace("__QUERY__", query).replace("__TERM__", term).replace("__type__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.SEARCH_REVIEWS,
          payload: success.data.allTestimonialInfo,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const getSignleEdneedReview = (_id, industry) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.GET_SINGLE_EDNEED_REVIEW_LOADING,
      payload: {}
    });
    TestimonialRequest.get(
      TestimonialRequest.urlEndpoint.getSingleEdneedRevTestimonial.replace("__Id__", _id).replace("__type__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.GET_SINGLE_EDNEED_REVIEW,
          payload: success.data.TestimonialData
        })
      }, (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}
export const updateEdneedReview = (Id, industry, data) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.UPDATE_EDNEED_REVIEW_LOADING,
      payload: {}
    })
    TestimonialRequest.patch(
      TestimonialRequest.urlEndpoint.EditTestimonial.replace("__Id__", Id).replace("__type__", industry),
      data,
      (success) => {
        dispatch({
          type: REQUEST_TYPE.UPDATE_EDNEED_REVIEW,
          payload: success.data.editInfo,
        });
        dispatch(showSuccessPopup("Your review has been updated. It will be published in our testimonials section shortly."));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
}

export const deleteEdneedReview = (Id, industry) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.DELETE_REVIEW_LOADING,
      payload: {}
    })
    TestimonialRequest.delete(
      TestimonialRequest.urlEndpoint.DeleteTestimonial.replace("__Id__", Id).replace("__type__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.DELETE_REVIEW,
          payload: Id,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const resetReviews = () => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.RESET_EDNEED_REVIEW,
      payload: {},
    });
  };
};


export const getAllTestimonails = (industry) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.ALL_TESTIMONIAL_LOADING,
      loading: true,
    });
    TestimonialRequest.get(
      TestimonialRequest.urlEndpoint.getAllTestimonails.replace("__type__", industry),
      (success) => {

        dispatch({
          type: REQUEST_TYPE.ALL_TESTIMONIAL_LOADED,
          payload: success.data.allTestimonialInfo,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};