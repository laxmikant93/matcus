import { REQUEST_TYPE } from "../actions/lmsfeeStructure/actionTypes";

const INITIAL_STATE = {
  FeeList: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  addFee: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  updateFee: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  updateFeeError: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  deleteFee: {
    data: "",
    loading: false,
    success: false,
    error: false
  },
  singleFee: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  availablePaymentMode: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  availableCourses: {
    data: [],
    loading: false,
    success: false,
    error: false
  },

  isLoaded: false,
};

// export default (state = INITIAL_STATE, { type, payload }) => {
const lmsfeeStructure = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case REQUEST_TYPE.LMS_GET_FEE: {
      return {
        ...state,
        FeeList: {
          ...state.FeeList,
          data: payload.data.allfeeInfo,
          loading: false,
          success: payload.data.allfeeInfo ? true : false,
          // success: payload.status === 200,
        },
        addFee: {
          data: [],
          isloading: false,
        },
      };
    }

    case REQUEST_TYPE.LMS_SINGLE_FEE: {
      return {
        ...state,
        singleFee: {
          ...state.singleFee,
          data: payload,
          loading: false,
          success: true,
        },
      };
    }
    case REQUEST_TYPE.LMS_SINGLE_FEE_LOADING: {
      return {
        ...state,
        singleFee: {
          ...state.singleFee,
          data: payload,
          success: false,
          loading: true,
        },
      };
    }
    case REQUEST_TYPE.LMS_GET_PAYMENT_MODE: {
      return {
        ...state,
        availablePaymentMode: {
          ...state.availablePaymentMode,
          data: payload,
        },
      };
    }
    case REQUEST_TYPE.LMS_SORT_BY_HTL: {
      return {
        ...state,
        FeeList: {
          ...state.FeeList,
          data: payload.data.allfeeInfo,
          loading: false,
          success: payload.data.allfeeInfo ? true : false,
          // success: payload.status === 200,
        },
      };
    }
    case REQUEST_TYPE.LMS_SORT_BY_FEETYPE: {
      return {
        ...state,
        FeeList: {
          ...state.FeeList,
          data: payload.data.allfeeInfo,
          loading: false,
          success: payload.data.allfeeInfo ? true : false,
          // success: payload.status === 200,
        },
      };
    }

    case REQUEST_TYPE.LMS_SORT_BY_LTH: {
      return {
        ...state,
        FeeList: {
          ...state.FeeList,
          data: payload.data.allfeeInfo,
          loading: false,
          success: payload.data.allfeeInfo ? true : false,
          // success: payload.status === 200,
        },
      };
    }

    case REQUEST_TYPE.LMS_SORT_BY_ACTIVE: {
      return {
        ...state,
        FeeList: {
          ...state.FeeList,
          data: payload.data.allfeeInfo,
          loading: false,
          success: payload.data.allfeeInfo ? true : false,
          // success: payload.status === 200,
        },
      };
    }

    case REQUEST_TYPE.LMS_SORT_BY_INACTIVE: {
      return {
        ...state,
        FeeList: {
          ...state.FeeList,
          data: payload.data.allfeeInfo,
          loading: false,
          success: payload.data.allfeeInfo ? true : false,
          // success: payload.status === 200,
        },
      };
    }

    case REQUEST_TYPE.LMS_SORT_BY_SAVED: {
      return {
        ...state,
        FeeList: {
          ...state.FeeList,
          data: payload.data.allfeeInfo,
          loading: false,
          success: payload.data.allfeeInfo ? true : false,
          // success: payload.status === 200,
        },
      };
    }

    case REQUEST_TYPE.LMS_SEARCH_FEE: {
      return {
        ...state,
        FeeList: {
          ...state.FeeList,
          data: payload.data.allfeeInfo,
          loading: false,
          success: payload.data.allfeeInfo ? true : false,
          // success: payload.status === 200,
        },
      };
    }

    case REQUEST_TYPE.LMS_FEE_LOADING: {
      return {
        ...state,
        FeeList: {
          ...state.FeeList,
          data: payload,
          success: false,
        },
      };
    }

    // case REQUEST_TYPE.POST_FEE: {
    //   return {
    //     ...state,
    //     addFee: {
    //       data: payload,
    //       isloading: false,
    //     },
    //     FeeList: {
    //       data: [payload].concat(state.FeeList.data),
    //       isloading: false,
    //     },
    //     isLoaded: true,
    //   };
    // }
    case REQUEST_TYPE.LMS_POST_FEE_LOADING: {


      return {
        ...state,
        addFee: {
          data: [],
          loading: true,
          success: false,
          error: false

        },
        FeeList: {
          data: [],
          loading: true,
          success: false,
          error: false
        },
        isLoaded: true,
      };
    }
    case REQUEST_TYPE.LMS_POST_FEE_LOADED: {

      return {
        ...state,
        addFee: {
          data: payload,
          loading: false,
          success: true,
          error: false
        },
        FeeList: {
          data: [payload].concat(state.FeeList.data),
          loading: false,
          success: true,
          error: false
        },
        isLoaded: true,
      };
    }
    // case REQUEST_TYPE.POST_FEE_RESET: {
    //   return {
    //     ...state,
    //     addFee: {
    //       data: [],
    //       loading: false,
    //       success: false,
    //       error: false
    //     },
    //     FeeList: {
    //       data: [],
    //       loading: false,
    //       success: false,
    //       error: false
    //     },
    //     isLoaded: true,
    //   };
    // }
    case REQUEST_TYPE.LMS_UPDATE_SINGLE_FEE: {
      return {
        ...state,
        updateFee: {
          data: payload,
          loading: false,
          success: true,
          error: false
        },
      };
    }
    case REQUEST_TYPE.LMS_UPDATE_SINGLE_FEE_ERROR_SAMECLASSROOM: {
      return {
        ...state,
        updateFeeError: {
          data: [],
          success: true,
          loading: false
        },
      };
    }
    case REQUEST_TYPE.LMS_UPDATE_SINGLE_FEE_ERROR_SAMECLASSROOM_RESET: {
      return {
        ...state,
        updateFeeError: {
          data: [],
          success: false,
          loading: false
        },
      };
    }

    case REQUEST_TYPE.LMS_UPDATE_FEE: {
      return {
        ...state,
        updateFee: {
          data: payload,
          isloading: false,
        },
        FeeList: {
          ...state.FeeList,
          data: state.FeeList.data.map((feeData) =>
            feeData._id === payload._id
              ? {
                ...feeData,
                // ...payload,
                status: payload.status,
                subdomainPublish: payload.subdomainPublish,
                Publish: payload.Publish ? payload.Publish : "Saved"
              }
              : feeData
          ),
          isloading: false,
        },
      };
    }

    case REQUEST_TYPE.LMS_DELETE_FEE: {
      return {
        ...state,
        deleteFee: {
          ...state.deleteFee,
          data: payload,
          success: true,
        },
        FeeList: {
          ...state.FeeList,
          data: state.FeeList.data.filter((item) => item._id !== payload),
          success: true,
        },
      };
    }
    case REQUEST_TYPE.LMS_GET_AVAILABLE_COURSES_LOADING: {
      return {
        ...state,
        availableCourses: {
          ...state.availableCourses,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      }
    }
    case REQUEST_TYPE.LMS_GET_AVAILABLE_COURSES_LOADED: {
      return {
        ...state,
        availableCourses: {
          ...state.availableCourses,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      }
    }
    case REQUEST_TYPE.LMS_GET_AVAILABLE_COURSES_ERROR: {
      return {
        ...state,
        availableCourses: {
          ...state.availableCourses,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      }
    }
    case REQUEST_TYPE.LMS_GET_AVAILABLE_COURSES_RESET: {
      return {
        ...state,
        availableCourses: {
          ...state.availableCourses,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      }
    }
    case REQUEST_TYPE.LMS_RESET_SINGLE_FEE_INFO:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default lmsfeeStructure;
