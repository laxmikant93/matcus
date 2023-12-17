import { REQUEST_TYPE } from "../actions/feeStructure/actionTypes";

const INITIAL_STATE = {
  FeeList: {
    data: [],
    loading: false,
    success: false,
  },
  addFee: {
    data: [],
    isloading: true,
    success: false,
  },
  updateFee: {
    data: [],
    isloading: true,
    success: false,
  },
  deleteFee: {
    data: "",
    loading: false,
    success: false,
  },
  singleFee: {
    data: [],
    loading: false,
    success: false,
  },
  availablePaymentMode: {
    data: [],
  },
  isLoaded: false,
};

// export default (state = INITIAL_STATE, { type, payload }) => {
const feeStructure = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case REQUEST_TYPE.GET_FEE: {
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

    case REQUEST_TYPE.SINGLE_FEE: {
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
    case REQUEST_TYPE.SINGLE_FEE_LOADING: {
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
    case REQUEST_TYPE.GET_PAYMENT_MODE: {
      return {
        ...state,
        availablePaymentMode: {
          ...state.availablePaymentMode,
          data: payload,
        },
      };
    }
    case REQUEST_TYPE.SORT_BY_HTL: {
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
    case REQUEST_TYPE.SORT_BY_FEETYPE: {
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

    case REQUEST_TYPE.SORT_BY_LTH: {
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

    case REQUEST_TYPE.SORT_BY_ACTIVE: {
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

    case REQUEST_TYPE.SORT_BY_INACTIVE: {
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

    case REQUEST_TYPE.SORT_BY_SAVED: {
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

    case REQUEST_TYPE.SEARCH_FEE: {
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

    case REQUEST_TYPE.FEE_LOADING: {
      return {
        ...state,
        FeeList: {
          ...state.FeeList,
          data: payload,
          success: false,
        },
      };
    }

    case REQUEST_TYPE.POST_FEE: {
      return {
        ...state,
        addFee: {
          data: payload,
          isloading: false,
        },
        FeeList: {
          data: [payload].concat(state.FeeList.data),
          isloading: false,
        },
        isLoaded: true,
      };
    }

    case REQUEST_TYPE.UPDATE_SINGLE_FEE: {
      return {
        ...state,
        updateFee: {
          data: payload,
          isloading: false,
        },
      };
    }

    case REQUEST_TYPE.UPDATE_FEE: {
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
                }
              : feeData
          ),
          isloading: false,
        },
      };
    }

    case REQUEST_TYPE.DELETE_FEE: {
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
    case REQUEST_TYPE.RESET_SINGLE_FEE_INFO:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default feeStructure;
