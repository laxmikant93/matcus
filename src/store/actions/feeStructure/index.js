import { REQUEST_TYPE } from "./actionTypes";
import FeeRequest from "./feeRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const getFee = (insId) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.FEE_LOADING,
      loading: true,
    });
    FeeRequest.get(
      FeeRequest.urlEndpoint.FeeList.replace("__INSID__", insId),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.GET_FEE,
          payload: success,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getPaymentMode = (insId) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.FEE_LOADING,
      loading: true,
    });
    FeeRequest.get(
      FeeRequest.urlEndpoint.PaymetnList.replace("__INSID__", insId),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.GET_PAYMENT_MODE,
          // success.data.paymentModesTypes.length > 0 ?
          payload:
            success.data.paymentModesTypes.length > 0
              ? success.data.paymentModesTypes[0].paymentModes
              : success.data.paymentModesTypes,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const postFee = (data) => {
  return (dispatch) => {
    FeeRequest.post(
      FeeRequest.urlEndpoint.PostFee,
      data,
      (success) => {
        success.status === 200 &&
          dispatch({
            type: REQUEST_TYPE.POST_FEE,
            payload: success,
          });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const feeSortByLTH = (insId) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.FEE_LOADING,
      loading: true,
    });
    FeeRequest.get(
      FeeRequest.urlEndpoint.sortByLTH.replace("__INSID__", insId),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.SORT_BY_LTH,
          payload: success,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const sortByFeeType = (insId, feeType) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.FEE_LOADING,
      loading: true,
    });
    FeeRequest.get(
      FeeRequest.urlEndpoint.sortByFeeType.replace("__INSID__", insId).replace("__TYPE__", feeType),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.SORT_BY_FEETYPE,
          payload: success,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
}

export const feeSortByHTL = (insId) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.FEE_LOADING,
      loading: true,
    });
    FeeRequest.get(
      FeeRequest.urlEndpoint.sortByHTL.replace("__INSID__", insId),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.SORT_BY_HTL,
          payload: success,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const feeStatusActive = (insId) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.FEE_LOADING,
      loading: true,
    });
    FeeRequest.get(
      FeeRequest.urlEndpoint.StatusActive.replace("__INSID__", insId),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.SORT_BY_ACTIVE,
          payload: success,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const feeStatusInActive = (insId) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.FEE_LOADING,
      loading: true,
    });
    FeeRequest.get(
      FeeRequest.urlEndpoint.StatusInActive.replace("__INSID__", insId),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.SORT_BY_INACTIVE,
          payload: success,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const feeStatusInSaved = (insId) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.FEE_LOADING,
      loading: true,
    });
    FeeRequest.get(
      FeeRequest.urlEndpoint.StatusSaved.replace("__INSID__", insId),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.SORT_BY_SAVED,
          payload: success,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const searchFeeStructure = (insId, title) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.FEE_LOADING,
      loading: true,
    });
    FeeRequest.get(
      FeeRequest.urlEndpoint.SearchFee.replace("__INSID__", insId).replace(
        "__TITLE__",
        title
      ),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.SEARCH_FEE,
          payload: success,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getSingleFeeStructure = (Id) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.SINGLE_FEE_LOADING,
      loading: true,
    });
    FeeRequest.get(
      FeeRequest.urlEndpoint.SingleFeeData.replace("__ID__", Id),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.SINGLE_FEE,
          payload: success.data.feeStructureData,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const updateSingleFee = (FeeId, data) => {
  return (dispatch) => {
    FeeRequest.patch(
      FeeRequest.urlEndpoint.EditFee.replace("__Id__", FeeId),
      data,
      (success) => {
        dispatch({
          type: REQUEST_TYPE.UPDATE_SINGLE_FEE,
          payload: success.data.editInfo,
        });
        dispatch(
          showSuccessPopup("Fee Structure Status updated successfully.")
        );
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const updateFee = (FeeId, data) => {
  return (dispatch) => {
    FeeRequest.patch(
      FeeRequest.urlEndpoint.EditFee.replace("__Id__", FeeId),
      data,
      (success) => {
        dispatch({
          type: REQUEST_TYPE.UPDATE_FEE,
          payload: success.data.editInfo,
        });
        dispatch(
          showSuccessPopup("Fee Structure Status updated successfully.")
        );
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteFee = (FeeId) => {
  return (dispatch) => {
    FeeRequest.delete(
      FeeRequest.urlEndpoint.DeleteFee.replace("__Id__", FeeId),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.DELETE_FEE,
          payload: success.data.FeeStructureId,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const resetSingleFeeInfo = () => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.RESET_SINGLE_FEE_INFO,
      payload: {},
    });
  };
};
