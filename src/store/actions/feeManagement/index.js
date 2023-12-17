import { setCommonError } from "../commonerror";
import FeeManagementRequest from "./FeeManagementRequest";
import { FEE_MANAGEMENT_TYPE } from "./actionType";
import { showSuccessPopup } from "../successmessagepopup";

export const getInstituteCourses = (institute, owner) => {
  // kunal code
  return (dispatch) => {
    dispatch({
      type: FEE_MANAGEMENT_TYPE.INSTITUTE_COURSE_LIST_LOADING,
      payload: [],
    });
    FeeManagementRequest.get(
      FeeManagementRequest.FeeManagementEndpoint.getInstituteCourses.replace("_INS_", institute).replace("_OWNER_", owner).replace("_LIMIT_", 1000).replace("_SKIP_", 0),
      (success) => {
        dispatch({
          type: FEE_MANAGEMENT_TYPE.INSTITUTE_COURSE_LIST_LOADED,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const getInstituteCoursesScroll = (institute, owner, skip, search) => {
  return (dispatch) => {
    FeeManagementRequest.get(
      FeeManagementRequest.FeeManagementEndpoint.InstituteCourseInfiniteScroll.replace("_INS_",
        institute).replace("_OWNER_", owner).replace("_SKIP_", 0).replace("_LIMIT_", 1000).replace("_SEARCH_", search),
      (success) => {
        dispatch({
          type: FEE_MANAGEMENT_TYPE.INSTITUTE_COURSE_SCROLLING_LOADED,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const getInstitutesearch = (institute, owner, search) => {
  return (dispatch) => {
    dispatch({
      type: FEE_MANAGEMENT_TYPE.INSTITUTE_COURSE_LIST_LOADING,
      payload: [],
    });
    FeeManagementRequest.get(
      FeeManagementRequest.FeeManagementEndpoint.InstituteCourseInfiniteScroll.replace("_INS_",
        institute).replace("_OWNER_", owner).replace("_SKIP_", 0).replace("_LIMIT_", 1000).replace("_SEARCH_", search),
      (success) => {
        dispatch({
          type: FEE_MANAGEMENT_TYPE.INSTITUTE_COURSE_SEARCHING_LOADED,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getInstituteFeeStructureList = (classRoomId, institute, search, startDate, filter, Pagesize, currentPage) => {
  return (dispatch) => {
    dispatch({
      type: FEE_MANAGEMENT_TYPE.INSTITUTE_FEE_STRCTURE_LIST_LOADING,
      payload: [],
    });
    FeeManagementRequest.get(
      FeeManagementRequest.FeeManagementEndpoint.getInstituteFeeStructureList.replace("_INS_",
        institute).replace("_INS_", institute).replace("_SKIP_", currentPage).replace("_LIMIT_", Pagesize).replace("_CLASSROOM_",
          classRoomId).replace("_SEARCH_", search).replace("_FILTER_", filter).replace("_DATE_", startDate),
      (success) => {
        dispatch({
          type: FEE_MANAGEMENT_TYPE.INSTITUTE_FEE_STRCTURE_LIST_LOADED,
          payload: success.data
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getInstituteFeeStructureListScrolling = (classRoomId, institute, skip, search, startDate, filter) => {

  return (dispatch) => {
    FeeManagementRequest.get(
      FeeManagementRequest.FeeManagementEndpoint.getInstituteFeeStructureListScrolling.replace("_INS_",
        institute).replace("_INS_", institute).replace("_SKIP_", skip).replace("_LIMIT_", 20).replace("_CLASSROOM_",
          classRoomId).replace("_SEARCH_", search).replace("_FILTER_", filter).replace("_DATE_", startDate),
      (success) => {
        dispatch({
          type: FEE_MANAGEMENT_TYPE.INSTITUTE_COURSE_LIST_SCROLLING,
          payload: success.data
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const EditStudentFeeStructure = (data, feeId) => {
  return (dispatch) => {
    dispatch({
      type: FEE_MANAGEMENT_TYPE.STUDENT_FEE_EDIT_LOADING,
      payload: []
    });
    FeeManagementRequest.patch(
      FeeManagementRequest.FeeManagementEndpoint.EditStudentFeeStructure.replace("_ID_", feeId), data,
      (success) => {
        dispatch({
          type: FEE_MANAGEMENT_TYPE.STUDENT_FEE_EDIT_LOADED,
          payload: success.data
        });
      }, (error) => {
        dispatch(setCommonError(error.message));
      }
    )

  }
}

export const getStudentCollectFee = (id) => {
  return (dispatch) => {
    dispatch({
      type: FEE_MANAGEMENT_TYPE.STUDENT_COLLECT_FEE_GET_LOADING,
      payload: [],
    });
    FeeManagementRequest.get(
      FeeManagementRequest.FeeManagementEndpoint.getStudentCollectFee.replace("_ID_", id),
      (success) => {

        dispatch({
          type: FEE_MANAGEMENT_TYPE.STUDENT_COLLECT_FEE_GET_LOADED,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
// export const  

export const postStudentCollectFee = (data, id) => {
  return (dispatch) => {
    dispatch({
      type: FEE_MANAGEMENT_TYPE.STUDENT_COLLECT_FEE_POST_LOADING,
      payload: []
    });
    FeeManagementRequest.post(FeeManagementRequest.FeeManagementEndpoint.postStudentCollectFee.replace("_ID_", id), data, (success) => {
      dispatch({
        type: FEE_MANAGEMENT_TYPE.STUDENT_COLLECT_FEE_POST_LOADED,
        payload: success.data
      });
    },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const resetStudentCollectFee = () => {
  return (dispatch) => {
    dispatch({
      type: FEE_MANAGEMENT_TYPE.STUDENT_COLLECT_FEE_POST_RESET,
      payload: []
    })
  }
}

export const resetEditModalData = () => {
  return dispatch => {
    dispatch({ type: FEE_MANAGEMENT_TYPE.STUDENT_FEE_EDIT_RESET, payload: [] })
  }
}

export const feeStructureIsExist = (institute, owner) => {
  return dispatch => {
    dispatch({
      type: FEE_MANAGEMENT_TYPE.FEE_STRUCTURE_IS_EXIST_LOADING,
      payload: []
    });
    FeeManagementRequest.get(FeeManagementRequest.FeeManagementEndpoint.feeStructureExist.replace("_INS_", institute).replace("_OWNER_", owner),
      (success) => {
        dispatch({
          type: FEE_MANAGEMENT_TYPE.FEE_STRUCTURE_IS_EXIST_LOADED,
          payload: success.data
        });
      }, error => {
      })
  }
}

export const createRazorPayAccount = (data) => {
  return (dispatch) => {
    dispatch({
      type: FEE_MANAGEMENT_TYPE.RAZORPAY_ACCOUNT_CREATE_LOADED,
      payload: []
    });
    FeeManagementRequest.post(FeeManagementRequest.FeeManagementEndpoint.razorPayAccount, data, (success) => {
      dispatch({
        type: FEE_MANAGEMENT_TYPE.RAZORPAY_ACCOUNT_CREATE_LOADED,
        payload: success.data
      });
    },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const updateFee = (FeeId, data) => {
  return (dispatch) => {
    FeeManagementRequest.patch(
      FeeManagementRequest.FeeManagementEndpoint.EditFee.replace("__Id__", FeeId),
      data,
      (success) => {

        if (success.data.message === "Active Fee Structure Already Exist") {
          dispatch(setCommonError("Multiple Fee Structure cannot be activated for same Classroom"));
        } else {
          dispatch({
            type: FEE_MANAGEMENT_TYPE.FEE_MANAGEMENT_LMS_UPDATE_FEE,
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
export const ActiveupdateFee = (FeeId, data) => {

  return (dispatch) => {
    FeeManagementRequest.post(
      FeeManagementRequest.FeeManagementEndpoint.EditFee.replace("__Id__", FeeId),
      data,
      (success) => {

        if (success.data.message === "Active Fee Structure Already Exist") {
          dispatch(setCommonError("Multiple Fee Structure cannot be activated for same Classroom"));
        } else {
          dispatch({
            type: FEE_MANAGEMENT_TYPE.FEE_MANAGEMENT_LMS_UPDATE_FEE,
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

export const resetFeeStructureExist = () => {
  return (dispatch) => {
    dispatch({
      type: FEE_MANAGEMENT_TYPE.FEE_STRUCTURE_IS_EXIST_RESET,
      payload: []
    })
  }
}

export const postExcelSheetColumns = (data) => {
  return dispatch => {
    dispatch({
      type: FEE_MANAGEMENT_TYPE.FEE_MANAGEMENT_POST_EXCEL_SHEET_COLUMNS_LOADING,
      loading: true,
    });
    FeeManagementRequest.post(
      FeeManagementRequest.FeeManagementEndpoint.postExcelSheetColumns,
      data,
      (success) => {
        dispatch({
          type: FEE_MANAGEMENT_TYPE.FEE_MANAGEMENT_POST_EXCEL_SHEET_COLUMNS_SUCCESS,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  }
}

export const resetExcelSheetColumns = () => {
  return dispatch => {
    dispatch({
      type: FEE_MANAGEMENT_TYPE.FEE_MANAGEMENT_POST_EXCEL_SHEET_COLUMNS_RESET
    })
  }
}