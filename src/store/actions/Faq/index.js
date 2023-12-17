import { REQUEST_TYPE } from "./actionTypes";
import FaqRequest from "./faqRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const getFaq = (insId, industry) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.FAQ_LOADING,
      loading: true,
    });
    FaqRequest.get(
      FaqRequest.urlEndpoint.FaqList.replace("__INSID__", insId).replace("__TYPE__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.GET_FAQ,
          payload: success,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const postFaq = (data, industry) => {
  return (dispatch) => {
    FaqRequest.post(
      FaqRequest.urlEndpoint.PostFaq.replace("__TYPE__", industry),
      data,
      (success) => {
        success.status === 200 &&
          dispatch({
            type: REQUEST_TYPE.POST_FAQ,
            payload: success,
          });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const featuredMarked = (insId, industry) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.FAQ_LOADING,
      loading: true,
    });
    FaqRequest.get(
      FaqRequest.urlEndpoint.FeaturedMarked.replace("__INSID__", insId).replace("__TYPE__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.FEATURE_MARKED,
          payload: success,
        });
        // dispatch(showSuccessPopup("FAQ FeatureMarked updated successfully."));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const featuredNotMarked = (insId, industry) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.FAQ_LOADING,
      loading: true,
    });
    FaqRequest.get(
      FaqRequest.urlEndpoint.FeaturedNotMarked.replace("__INSID__", insId).replace("__TYPE__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.FEATURE_NOT_MARKED,
          payload: success,
        });
        // dispatch(showSuccessPopup("FAQ FeatureMarked updated successfully."));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const statusActive = (insId, industry) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.FAQ_LOADING,
      loading: true,
    });
    FaqRequest.get(
      FaqRequest.urlEndpoint.StatusActive.replace("__INSID__", insId).replace("__TYPE__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.SORT_BY_ACTIVE,
          payload: success,
        });
        // dispatch(showSuccessPopup("FAQ Status updated successfully."));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const statusInActive = (insId, industry) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.FAQ_LOADING,
      loading: true,
    });
    FaqRequest.get(
      FaqRequest.urlEndpoint.StatusInActive.replace("__INSID__", insId).replace("__TYPE__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.SORT_BY_INACTIVE,
          payload: success,
        });
        // dispatch(showSuccessPopup("FAQ Status updated successfully."));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const searchFaq = (insId, title, industry) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.FAQ_LOADING,
      loading: true,
    });
    FaqRequest.get(
      FaqRequest.urlEndpoint.SearchFaq.replace("__INSID__", insId).replace(
        "__TITLE__",
        title
      ).replace("__TYPE__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.SEARCH_FAQ,
          payload: success,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// export const getFaqlistinfoId = (_id) => {
//   return (dispatch) => {
//     dispatch({
//       type: REQUEST_TYPE.GET_FAQ_BY_ID_LOADING,
//       loading: true,
//     });
//     FaqRequest.get(
//       FaqRequest.urlEndpoint.EditFaq.replace("__Id__", _id),
//       (success) => {
//         dispatch({
//           type: REQUEST_TYPE.GET_FAQ_BY_ID,
//           payload: success.data,
//         });
//       },
//       (error) => {
//         dispatch(setCommonError(error.message));
//       }
//     );
//   };
// };

export const updateFaqList = (faqId, data, industry) => {
  return (dispatch) => {
    FaqRequest.patch(
      FaqRequest.urlEndpoint.EditFaq.replace("__Id__", faqId).replace("__TYPE__", industry).replace("__TYPE__", industry),
      data,
      (success) => {
        dispatch({
          type: REQUEST_TYPE.UPDATE_FAQ_LIST,
          payload: success,
        });
        dispatch(showSuccessPopup("FAQ updated successfully."));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const updateFaq = (faqId, data, industry) => {
  return (dispatch) => {
    FaqRequest.patch(
      FaqRequest.urlEndpoint.EditFaq.replace("__Id__", faqId).replace("__TYPE__", industry),
      data,
      (success) => {
        dispatch({
          type: REQUEST_TYPE.UPDATE_FAQ,
          payload: success.data.editInfo,
        });
        dispatch(showSuccessPopup("FAQ updated successfully."));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteFaq = (faqId, industry) => {
  return (dispatch) => {
    FaqRequest.delete(
      FaqRequest.urlEndpoint.DeleteFaq.replace("__Id__", faqId).replace("__TYPE__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.DELETE_FAQ,
          payload: faqId,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const setSingleFaqData = (data) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.SINGLE_FAQ_DATA,
      payload: data,
    });
  };
};

export const resetSingleFaqInfo = () => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.RESET_SINGLE_FAQ_INFO,
      payload: {},
    });
  };
};
