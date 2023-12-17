import PAYMENT_MODE_TYPES from "./ActionTypes"
import PaymentModeRequest from './PaymentModeRequest'
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";


// THIS GIVES PAYMENTS MODE ACCEPTED BY INSTITUTE
export const paymentModes = (id) => {
  return dispatch => {
    PaymentModeRequest.get(
      PaymentModeRequest.request.paymentModes.replace("__ID__", id),
      success => {
    
        dispatch({
          type: PAYMENT_MODE_TYPES.PAYMENT_MODE_LIST,
          payload: success.data.paymentModes[0]
        })
      },
      error => dispatch(setCommonError(error.message))
    )
  }
}

// POST BANK DETAILS INFORMATION FOR INSTITUTE PAYMENT
export const postBankDetails = (data) => {
  return dispatch => {
    PaymentModeRequest.post(
      PaymentModeRequest.request.postBankDetails,
      data,
      success => {
        dispatch({
          type: PAYMENT_MODE_TYPES.POST_BANK_DETAILS,
          payload: success.data
        });
        dispatch(showSuccessPopup("Payment method added successfully"));
      },
      error => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}

// POST CANCELLED CHEQUE DETAILS INFORMATION FOR INSTITUTE PAYMENT
export const postChequeDetails = (data) => {
  return dispatch => {
    PaymentModeRequest.post(
      PaymentModeRequest.request.postChequeDetails,
      data,
      success => {
        dispatch({
          type: PAYMENT_MODE_TYPES.POST_CHEQUE_DETAILS,
          payload: success.data
        });
        dispatch(showSuccessPopup("Payment method added successfully"));
      },
      error => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}

// POST UPI DETAILS INFORMATION FOR INSTITUTE PAYMENT
export const postUpiDetails = (data) => {
  return dispatch => {
    PaymentModeRequest.post(
      PaymentModeRequest.request.postUpiDetails,
      data,
      success => {
        dispatch({
          type: PAYMENT_MODE_TYPES.POST_UPI_DETAILS,
          payload: success.data
        });
        dispatch(showSuccessPopup("Payment method added successfully"));
      },
      error => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}

// POST PAYPAL DETAILS INFORMATION FOR INSTITUTE PAYMENT
export const postPaypalDetails = (data) => {
  return dispatch => {
    PaymentModeRequest.post(
      PaymentModeRequest.request.postPaypalDetails,
      data,
      success => {
        dispatch({
          type: PAYMENT_MODE_TYPES.POST_PAYPAL_DETAILS,
          payload: success.data
        });
        dispatch(showSuccessPopup("Success"));
      },
      error => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}

// THIS GIVES PAYMENT LIST DATA
export const paymentLists = (id) => {
  return dispatch => {
    PaymentModeRequest.get(
      PaymentModeRequest.request.paymentLists.replace("__ID__", id),
      success => {
        dispatch({
          type: PAYMENT_MODE_TYPES.PAYMENT_LIST_DETAILS,
          payload: success.data
        })
      },
      error => dispatch(setCommonError(error.message))
    )
  }
}

//
export const getPaymentModes = (insId) => {

  return (dispatch) => {
    dispatch({
      type: PAYMENT_MODE_TYPES.GET_PAYMENT_MODE_LOADING,
      payload: []
    });
    PaymentModeRequest.get(
      PaymentModeRequest.request.availablePaymentModes.replace("__INSID__", insId),
      (success) => {
        dispatch({
          type: PAYMENT_MODE_TYPES.GET_PAYMENT_MODE_LOADED,
          payload: success.data
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const resetAvailPaymentModes = () => {
  return (dispatch) => {
    dispatch({
      type: PAYMENT_MODE_TYPES.GET_PAYMENT_MODE_RESET,
      payload: []
    })
  }
}

// UPDATE PAYMENT DETAILS INFORMATION FOR INSTITUTE PAYMENT
export const updatePaymentDetails = (id, data) => {
  return dispatch => {
    PaymentModeRequest.patch(
      PaymentModeRequest.request.updatePaymentDetails.replace("__ID__", id),
      data,
      success => {
        dispatch({
          type: PAYMENT_MODE_TYPES.UPDATE_PAYMENT_DETAILS,
          payload: success.data.editInfo
        })
        dispatch(showSuccessPopup("Payment method updated successfully"));
      },
      error => dispatch(setCommonError(error.message))
    )
  }
}
export const paymentDetailStore = (data) => {
  return dispatch => {
    dispatch({
      type: PAYMENT_MODE_TYPES.INSITITUTE_EMAIL_CHECK_RESET,
      payload: []
    })
    dispatch({
      type: PAYMENT_MODE_TYPES.SEND_DATA_STORE,
      payload: data
    })
  }
}

export const resetSendData = () => {
  return dispatch => {
    dispatch({
      type: PAYMENT_MODE_TYPES.INSITITUTE_EMAIL_CHECK_RESET,
      payload: []
    })
    dispatch({
      type: PAYMENT_MODE_TYPES.SEND_DATA_RESET,
      payload: ""
    })
  }
}

export const emailCheckUniqueReset = (data) => {
  return dispatch =>
    dispatch({
      type: PAYMENT_MODE_TYPES.INSITITUTE_EMAIL_CHECK_RESET,
      payload: []
    })
}
export const emailCheckUniquePost = (data) => {
  return dispatch => {
    dispatch({
      type: PAYMENT_MODE_TYPES.INSITITUTE_EMAIL_CHECK_LOADING,
      payload: []
    })
    PaymentModeRequest.post(
      PaymentModeRequest.request.emailCheckUnique,
      data,
      success => {
        dispatch({
          type: PAYMENT_MODE_TYPES.INSITITUTE_EMAIL_CHECK_LOADED,
          payload: success.data
        })
      },
      error => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: PAYMENT_MODE_TYPES.INSITITUTE_EMAIL_CHECK_ERROR,
          payload: []
        })
      }
    )
  }
}

// DELETE PAYMENT DETAILS INFORMATION
export const deletePaymentDetails = (id) => {
  return dispatch => {
    PaymentModeRequest.delete(
      PaymentModeRequest.request.deletePaymentDetails.replace("__ID__", id),
      success => {
        dispatch({
          type: PAYMENT_MODE_TYPES.DELETE_PAYMENT_DETAILS,
          payload: success.data
        })
        dispatch(showSuccessPopup("Payment method deleted successfully"));
      },
      error => dispatch(setCommonError(error.message))
    )
  }
}


export const ifscValidation = (data1) => {
  const data = { "ifscCode": data1 }
  return dispatch => {
    PaymentModeRequest.post(PaymentModeRequest.request.ifscValidation,
      data,
      success => {
        success.data.response ?
          dispatch({
            type: PAYMENT_MODE_TYPES.IFSC_VALIDATOR,
            payload: success.data.response
          })
          :
          dispatch({
            type: PAYMENT_MODE_TYPES.IFSC_VALIDATOR,
            payload: success.data.message
          })
        // dispatch(showSuccessPopup("Success"));
      },
      error => {

        dispatch(setCommonError(error.message))
      }
    )
  }
}

export const KycVerification = (ins, data) => {
  return dispatch => {
    dispatch({
      type: PAYMENT_MODE_TYPES.KYC_VERIFICATION_LOADING,
      payload: []
    });
    // PaymentModeRequest.post(PaymentModeRequest.request.kycVerification.replace("_INS_", ins), data,
    //   success => {
    dispatch({
      type: PAYMENT_MODE_TYPES.KYC_VERIFICATION_LOADED,
      payload: data
    });
    // }, error => {
    //   dispatch(setCommonError(error));
    // })
  }
}
export const selectKycBank = (data) => {
  return dispatch => {
    dispatch({
      type: PAYMENT_MODE_TYPES.SELECTED_KYC_BANK_LOADED,
      payload: data
    });
  }
}
export const selectKycBankReset = () => {
  return dispatch => {
    dispatch({
      type: PAYMENT_MODE_TYPES.SELECTED_KYC_BANK_RESET,
      payload: ""
    });
  }
}