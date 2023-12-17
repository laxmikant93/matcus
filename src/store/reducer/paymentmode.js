import PAYMENT_METHOD_TYPES from "../actions/paymentmode/ActionTypes"

const PAYMENT_METHOD_INITIAL_STATE = {
  paymentModes: {
    data: [],
    loading: false,
    loaded: false,
    success: false,
    error: false,
  },
  postedBankDetail: {
    data: [],
    loading: false,
    loaded: false,
    success: false,
    error: false,
  },
  postedChequeDetail: {
    data: [],
    loading: false,
    loaded: false,
    success: false,
    error: false,
  },
  postedUpiDetail: {
    data: [],
    loading: false,
    loaded: false,
    success: false,
    error: false,
  },
  postedPaypalDetail: {
    data: [],
    loading: false,
    loaded: false,
    success: false,
    error: false,
  },
  allPaymentList: {
    data: [],
    loading: false,
    loaded: false,
    success: false,
    error: false,
  },
  updatePayment: {
    data: [],
    loading: false,
    loaded: false,
    success: false,
    error: false,
  },
  deletePayment: {
    data: [],
    loading: false,
    loaded: false,
    success: false,
    error: false,
  },
  bankDetails: {
    data: [],
    loading: false,
    loaded: false,
    success: false,
    error: false,
  },
  chequeDetails: {
    data: [],
    loading: false,
    loaded: false,
    success: false,
    error: false,
  },
  upiDetails: {
    data: [],
    loading: false,
    loaded: false,
    success: false,
    error: false,
  },
  paypalDetails: {
    data: [],
    loading: false,
    loaded: false,
    success: false,
    error: false,
  },
  ifscValidate: {
    data: [],
    loading: false,
    loaded: false,
    success: false,
    error: false
  },
  availablePaymentMode: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  kycVerification: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  selectedKycBank: {
    data: "",
    loading: false,
    success: false,
    error: false
  },
  savePaymentData: {
    data: "",
    loading: false,
    success: false,
    error: false
  },
  uniqueEmail: {
    data: "",
    loading: false,
    success: false,
    error: false
  }
}

export const paymentmode = (state = PAYMENT_METHOD_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    // availablePaymentModes


    // new
    case PAYMENT_METHOD_TYPES.GET_PAYMENT_MODE_LOADING: {
      return {
        ...state,
        availablePaymentMode: {
          ...state.availablePaymentMode,
          data: [],
          success: false,
          loading: true,
          error: false
        },
      };
    }
    case PAYMENT_METHOD_TYPES.GET_PAYMENT_MODE_LOADED: {
      return {
        ...state,
        availablePaymentMode: {
          ...state.availablePaymentMode,
          data: payload,
          success: true,
          loading: false,
          error: false
        },
      };
    }
    case PAYMENT_METHOD_TYPES.GET_PAYMENT_MODE_ERROR: {
      return {
        ...state,
        availablePaymentMode: {
          ...state.availablePaymentMode,
          data: [],
          success: false,
          loading: false,
          error: true
        },
      };
    }

    case PAYMENT_METHOD_TYPES.GET_PAYMENT_MODE_RESET: {
      return {
        ...state,
        availablePaymentMode: {
          ...state.availablePaymentMode,
          data: [],
          success: false,
          loading: false,
          error: false
        },
      };
    }



    case PAYMENT_METHOD_TYPES.PAYMENT_MODE_LIST: {
      return {
        ...state,
        paymentModes: {
          ...state.paymentModes,
          data: payload.paymentModes,
          success: true,
          loaded: true,
          loading: false,
          error: false,
        }
      }
    }
    case PAYMENT_METHOD_TYPES.SEND_DATA_STORE: {
      return {
        ...state,
        savePaymentData: {
          ...state.savePaymentData,
          data: payload,
          success: true,
          loading: false,
          error: false,
        }
      }
    }

    case PAYMENT_METHOD_TYPES.SEND_DATA_RESET: {
      return {
        ...state,
        savePaymentData: {
          data: "",
          success: false,
          loading: false,
          error: false,
        }
      }
    }
    case PAYMENT_METHOD_TYPES.POST_BANK_DETAILS: {
      return {
        ...state,
        postedBankDetail: {
          ...state.postedBankDetail,
          data: payload,
          success: true,
          loaded: true,
          loading: false,
          error: false,
        },
        bankDetails: {
          ...state.bankDetails,
          data: state.bankDetails.data.concat([].concat(payload.paymentModeData))
        }
      }
    }

    case PAYMENT_METHOD_TYPES.POST_CHEQUE_DETAILS: {
      return {
        ...state,
        postedChequeDetail: {
          ...state.postedChequeDetail,
          data: payload,
          success: true,
          loaded: true,
          loading: false,
          error: false,
        },
        chequeDetails: {
          ...state.chequeDetails,
          data: state.chequeDetails.data.concat([].concat(payload.paymentModeData))
        }
      }
    }

    case PAYMENT_METHOD_TYPES.POST_UPI_DETAILS: {
      return {
        ...state,
        postedUpiDetail: {
          ...state.postedUpiDetail,
          data: payload,
          success: true,
          loaded: true,
          loading: false,
          error: false,
        },
        upiDetails: {
          ...state.upiDetails,
          data: state.upiDetails.data.concat([].concat(payload.paymentModeData))
        }
      }
    }

    case PAYMENT_METHOD_TYPES.POST_PAYPAL_DETAILS: {
      return {
        ...state,
        postedPaypalDetail: {
          ...state.postedPaypalDetail,
          data: payload,
          success: true,
          loaded: true,
          loading: false,
          error: false,
        },
        paypalDetails: {
          ...state.paypalDetails,
          data: state.paypalDetails.data.concat([].concat(payload.paymentModeData))
        }
      }
    }
    case PAYMENT_METHOD_TYPES.PAYMENT_LIST_DETAILS: {
      return {
        ...state,
        allPaymentList: {
          ...state.allPaymentList,
          data: payload.allPaymentInfo,
          success: true,
          loaded: true,
          loading: false,
          error: false,
        },
        bankDetails: {
          ...state.bankDetails,
          data: payload.bankArr,
          success: true,
          loaded: true,
          loading: false,
          error: false,
        },
        upiDetails: {
          ...state.upiDetails,
          data: payload.upiArr,
          success: true,
          loaded: true,
          loading: false,
          error: false,
        },
        chequeDetails: {
          ...state.chequeDetails,
          data: payload.chequeArr,
          success: true,
          loaded: true,
          loading: false,
          error: false,
        },
        paypalDetails: {
          ...state.paypalDetails,
          data: payload.paypalArr,
          success: true,
          loaded: true,
          loading: false,
          error: false,
        }
      }
    }

    case PAYMENT_METHOD_TYPES.UPDATE_PAYMENT_DETAILS: {
      return {
        ...state,
        updatePayment: {
          ...state.updatePayment,
          data: payload,
          success: true,
          loaded: true,
          loading: false,
          error: false,
        },
        // bankDetails: {
        //   ...state.bankDetails,
        //   data: state.list.data.map((item) =>
        //     item._id === payload._id
        //       ? {
        //         ...item.bankDetails,
        //         acname: payload.bankDetails.acname,
        //         acnumber: payload.bankDetails.acnumber,
        //         ifscCode: payload.bankDetails.ifscCode,
        //         bankname: payload.bankDetails.bankname,
        //         brancname: payload.bankDetails.branchname,
        //         branchaddress: payload.bankDetails.branchaddress
        //       }
        //       : item
        //   ),
        //   success: true,
        // },
        // upiDetails: {
        //   ...state.upiDetails,
        //   data: payload.upiArr,
        //   success: true,
        // },
        // chequeDetails: {
        //   ...state.chequeDetails,
        //   data: payload.chequeArr,
        //   success: true,
        // },
        // paypalDetails: {
        //   ...state.paypalDetails,
        //   data: payload.paypalArr,
        //   success: true,
        // }

      }
    }

    case PAYMENT_METHOD_TYPES.DELETE_PAYMENT_DETAILS: {
      return {
        ...state,
        deletePayment: {
          ...state.deletePayment,
          data: payload,
          success: true,
          loaded: true,
          loading: false,
          error: false,
        }
      }
    }

    case PAYMENT_METHOD_TYPES.IFSC_VALIDATOR: {
      return {
        ...state,
        ifscValidate: {
          data: payload,
          success: true,
          loaded: true,
          loading: false,
          error: false
        }
      }
    }
    case PAYMENT_METHOD_TYPES.KYC_VERIFICATION_LOADING: {
      return {
        ...state,
        kycVerification: {
          data: [],
          loading: true,
          success: false
        }
      }
    }
    case PAYMENT_METHOD_TYPES.KYC_VERIFICATION_LOADED: {
      return {
        ...state,
        kycVerification: {
          data: payload,
          loading: false,
          success: true
        }
      }
    }
    case PAYMENT_METHOD_TYPES.SELECTED_KYC_BANK_LOADED: {
      return {
        ...state,
        selectedKycBank: {
          data: payload,
          loading: false,
          success: true
        }
      }
    }
    case PAYMENT_METHOD_TYPES.SELECTED_KYC_BANK_RESET: {
      return {
        ...state,
        selectedKycBank: {
          data: payload,
          loading: false,
          success: false
        }
      }
    }
    case PAYMENT_METHOD_TYPES.INSITITUTE_EMAIL_CHECK_LOADING: {
      return {
        ...state,
        uniqueEmail: {
          data: [],
          loading: true,
          success: false
        }
      }
    }
    case PAYMENT_METHOD_TYPES.INSITITUTE_EMAIL_CHECK_LOADED: {
      return {
        ...state,
        uniqueEmail: {
          data: payload,
          loading: false,
          success: true
        }
      }
    }
    case PAYMENT_METHOD_TYPES.INSITITUTE_EMAIL_CHECK_ERROR: {
      return {
        ...state,
        uniqueEmail: {
          data: payload,
          loading: false,
          success: false,
          error: false
        }
      }
    }
    case PAYMENT_METHOD_TYPES.INSITITUTE_EMAIL_CHECK_RESET: {
      return {
        ...state,
        uniqueEmail: {
          data: payload,
          loading: false,
          success: false
        }
      }
    }
    default: return state
  }
}

export default paymentmode;