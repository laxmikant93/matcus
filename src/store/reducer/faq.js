import { REQUEST_TYPE } from "../actions/Faq/actionTypes";

const INITIAL_STATE = {
  faqList: {
    data: [],
    loading: false,
    success: false,
  },
  addFaq: {
    data: [],
    isloading: true,
    success: false,
  },
  updateFaq: {
    data: [],
    isloading: true,
    success: false,
  },
  deleteFaq: {
    data: {},
    success: false,
  },
  singleFaqData: {
    data: {},
    success: false,
  },
  isLoaded: false,
};

// export default (state = INITIAL_STATE, { type, payload }) => {
const Faq = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case REQUEST_TYPE.GET_FAQ: {
      return {
        ...state,
        faqList: {
          ...state.faqList,
          data: payload.data.allFaqInfo,
          loading: false,
          success: payload.data.allFaqInfo ? true : false,
        },
        addFaq: {
          data: [],
          isloading: false,
          success: false,
        },
        updateFaq: {
          data: [],
          isloading: true,
          success: false,
        },
      };
    }
    case REQUEST_TYPE.FEATURE_MARKED: {
      return {
        ...state,
        faqList: {
          ...state.faqList,
          data: payload.data.allFaqInfo,
          loading: false,
          success: payload.status === 200,
        },
      };
    }

    case REQUEST_TYPE.FEATURE_NOT_MARKED: {
      return {
        ...state,
        faqList: {
          ...state.faqList,
          data: payload.data.allFaqInfo,
          loading: false,
          success: payload.data.allFaqInfo ? true : false,
        },
      };
    }

    case REQUEST_TYPE.SORT_BY_ACTIVE: {
      return {
        ...state,
        faqList: {
          ...state.faqList,
          data: payload.data.allFaqInfo,
          loading: false,
          success: payload.data.allFaqInfo ? true : false,
        },
      };
    }

    case REQUEST_TYPE.SORT_BY_INACTIVE: {
      return {
        ...state,
        faqList: {
          ...state.faqList,
          data: payload.data.allFaqInfo,
          loading: false,
          success: payload.data.allFaqInfo ? true : false,
        },
      };
    }

    case REQUEST_TYPE.SEARCH_FAQ: {
      return {
        ...state,
        faqList: {
          ...state.faqList,
          data: payload.data.allFaqInfo,
          loading: false,
          success: payload.data.allFaqInfo ? true : false,
        },
      };
    }

    case REQUEST_TYPE.FAQ_LOADING: {
      return {
        ...state,
        faqList: {
          ...state.faqList,
          data: payload,
          success: false,
        },
      };
    }

    case REQUEST_TYPE.POST_FAQ: {
      return {
        ...state,
        addFaq: {
          data: payload.data.addInfo,
          isloading: false,
          success: payload.status === 200 ? true : false,
        },
        faqList: {
          data: [payload.data.addInfo].concat(state.faqList.data),
          isloading: false,
          success: payload.status === 200 ? true : false,
        },
        isLoaded: true,
      };
    }

    case REQUEST_TYPE.UPDATE_FAQ_LIST: {
      return {
        ...state,
        updateFaq: {
          data: payload.data.editInfo,
          isloading: false,
          success: payload.status === 200 ? true : false,
        },
        faqList: {
          ...state.faqList,
          data: state.faqList.data.map((faqData) =>
            faqData._id === payload.data.editInfo._id
              ? {
                  ...faqData,
                  ...payload.data.editInfo,
                }
              : faqData
          ),
          isloading: false,
        },
      };
    }

    case REQUEST_TYPE.UPDATE_FAQ: {
      return {
        ...state,
        updateFaq: {
          data: payload,
          isloading: false,
        },
        faqList: {
          ...state.faqList,
          data: state.faqList.data.map((faqData) =>
            faqData._id === payload._id
              ? {
                  ...faqData,
                  isStatus: payload.isStatus,
                  isFeatureMarked: payload.isFeatureMarked,
                }
              : faqData
          ),
          isloading: false,
        },
      };
    }

    case REQUEST_TYPE.DELETE_FAQ: {
      return {
        ...state,
        deleteFaq: {
          ...state.deleteFaq,
          data: payload,
          success: true,
        },
        faqList: {
          ...state.faqList,
          data: state.faqList.data.filter((item) => item._id !== payload),
          success: true,
        },
      };
    }

    case REQUEST_TYPE.SINGLE_FAQ_DATA: {
      return {
        ...state,
        singleFaqData: {
          ...state.singleFaqData,
          data: payload,
          success: true,
        },
      };
    }

    case REQUEST_TYPE.RESET_SINGLE_FAQ_INFO: {
      return {
        ...state,
        singleFaqData: {
          ...state.singleFaqData,
          data: payload,
          success: false,
        },
        updateFaq: {},
      };
    }

    default:
      return state;
  }
};

export default Faq;
