import { REQUEST_TYPE } from "./actionTypes";
import FeeRequest from "./feeRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";
import Auth from "../../../Classes/Auth";
import { setUserActiveRole } from "../user";

export const getFee = (insId) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.LMS_FEE_LOADING,
      loading: true,
    });
    FeeRequest.get(
      FeeRequest.urlEndpoint.FeeList.replace("__INSID__", insId),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.LMS_GET_FEE,
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
      type: REQUEST_TYPE.LMS_FEE_LOADING,
      loading: true,
    });
    FeeRequest.get(
      FeeRequest.urlEndpoint.PaymetnList.replace("__INSID__", insId),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.LMS_GET_PAYMENT_MODE,
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

export const availableCourses = (insId) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.LMS_GET_AVAILABLE_COURSES_LOADING,
      loading: true,
    });
    FeeRequest.get(
      FeeRequest.urlEndpoint.availableCourses.replace("__INSID__", insId),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.LMS_GET_AVAILABLE_COURSES_LOADED,
          payload: success.data
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// export const postFee = (data) => {
//   return (dispatch) => {
//     FeeRequest.post(
//       FeeRequest.urlEndpoint.PostFee,
//       data,
//       (success) => {
//         success.status === 200 &&
//           dispatch({
//             type: REQUEST_TYPE.POST_FEE,
//             payload: success,
//           });
//       },
//       (error) => {
//         dispatch(setCommonError(error.message));
//       }
//     );
//   };
// };

export const postFee = (data, alreadySessionExist) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.LMS_POST_FEE_LOADING,
      payload: []
    });
    FeeRequest.post(FeeRequest.urlEndpoint.PostFee, data, (success) => {

      if (success.data.message === "Active Fee Structure Already Exist") {
        dispatch({
          type: REQUEST_TYPE.LMS_UPDATE_SINGLE_FEE_ERROR_SAMECLASSROOM,
          payload: []
        });
        dispatch({
          type: REQUEST_TYPE.LMS_UPDATE_SINGLE_FEE_ERROR_SAMECLASSROOM_RESET,
          payload: []
        });
      } else {
        dispatch({
          type: REQUEST_TYPE.LMS_POST_FEE_LOADED,
          payload: success.data.feeStructureData
        });
        if (alreadySessionExist) {

        } else {
          let dataUpdate = {
            "user_sessionExit": data.session.sessionExist,
            "user_sessionFrom": data.session.sessionFrom,
            "user_sessionTo": data.session.sessionTo,
            "user_account_number": data.paymentData.account_number,
            "user_account_type": data.paymentData.account_type,
            "user_account_beneficiary_name": data.paymentData.account_beneficiary_name,
            "user_account_ifsc_code": data.paymentData.account_ifsc_code,
            "user_sessionFromDate": data.session.sessionFromDate,
            "user_sessionToDate": data.session.sessionToDate,
            "user_institute_email": data.paymentData.institute_email
          }
          dispatch(setUserActiveRole(dataUpdate));
          Auth.updateUserDetail("user_sessionExit", data.session.sessionExist);
          Auth.updateUserDetail("user_sessionFrom", data.session.sessionFrom);
          Auth.updateUserDetail("user_sessionFromDate", data.session.sessionFromDate);
          Auth.updateUserDetail("user_sessionToDate", data.session.sessionToDate);
          Auth.updateUserDetail("user_sessionTo", data.session.sessionTo);
          Auth.updateUserDetail("user_account_number", data.paymentData.account_number);
          Auth.updateUserDetail("user_account_type", data.paymentData.account_type);
          Auth.updateUserDetail("user_account_beneficiary_name", data.paymentData.account_beneficiary_name);
          Auth.updateUserDetail("user_account_ifsc_code", data.paymentData.account_ifsc_code);
          Auth.updateUserDetail("user_institute_email", data.paymentData.institute_email);
        }
      }

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
      type: REQUEST_TYPE.LMS_FEE_LOADING,
      loading: true,
    });
    FeeRequest.get(
      FeeRequest.urlEndpoint.sortByLTH.replace("__INSID__", insId),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.LMS_SORT_BY_LTH,
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
      type: REQUEST_TYPE.LMS_FEE_LOADING,
      loading: true,
    });
    FeeRequest.get(
      FeeRequest.urlEndpoint.sortByFeeType.replace("__INSID__", insId).replace("__TYPE__", feeType),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.LMS_SORT_BY_FEETYPE,
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
      type: REQUEST_TYPE.LMS_FEE_LOADING,
      loading: true,
    });
    FeeRequest.get(
      FeeRequest.urlEndpoint.sortByHTL.replace("__INSID__", insId),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.LMS_SORT_BY_HTL,
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
      type: REQUEST_TYPE.LMS_FEE_LOADING,
      loading: true,
    });
    FeeRequest.get(
      FeeRequest.urlEndpoint.StatusActive.replace("__INSID__", insId),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.LMS_SORT_BY_ACTIVE,
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
      type: REQUEST_TYPE.LMS_FEE_LOADING,
      loading: true,
    });
    FeeRequest.get(
      FeeRequest.urlEndpoint.StatusInActive.replace("__INSID__", insId),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.LMS_SORT_BY_INACTIVE,
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
      type: REQUEST_TYPE.LMS_FEE_LOADING,
      loading: true,
    });
    FeeRequest.get(
      FeeRequest.urlEndpoint.StatusSaved.replace("__INSID__", insId),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.LMS_SORT_BY_SAVED,
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
      type: REQUEST_TYPE.LMS_FEE_LOADING,
      loading: true,
    });
    FeeRequest.get(
      FeeRequest.urlEndpoint.SearchFee.replace("__INSID__", insId).replace(
        "__TITLE__",
        title
      ),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.LMS_SEARCH_FEE,
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
      type: REQUEST_TYPE.LMS_SINGLE_FEE_LOADING,
      loading: true,
    });
    FeeRequest.get(
      FeeRequest.urlEndpoint.SingleFeeData.replace("__ID__", Id),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.LMS_SINGLE_FEE,
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
        if (success.data.message === "Active Fee Structure Already Exist") {
          dispatch({
            type: REQUEST_TYPE.LMS_UPDATE_SINGLE_FEE_ERROR_SAMECLASSROOM,
            payload: [],
          });
        } else {
          dispatch({
            type: REQUEST_TYPE.LMS_UPDATE_SINGLE_FEE,
            payload: success.data.editInfo,
          });
          dispatch(
            showSuccessPopup("Fee Structure Status updated successfully.")
          );
        }

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

        if (success.data.message === "Active Fee Structure Already Exist") {
          dispatch(setCommonError("Multiple Fee Structure cannot be activated for same Classroom"));
        } else {
          dispatch({
            type: REQUEST_TYPE.LMS_UPDATE_FEE,
            payload: success.data.editInfo,
          });
          dispatch(
            showSuccessPopup("Fee Structure Status updated successfully.")
          );
        }
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
          type: REQUEST_TYPE.LMS_DELETE_FEE,
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
      type: REQUEST_TYPE.LMS_RESET_SINGLE_FEE_INFO,
      payload: {},
    });
  };
};
