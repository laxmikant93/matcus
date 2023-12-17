import { setCommonError } from "../commonerror";
import FeeManagementRequest from "./FeeManagementStudentRequest";
import { FEE_MANAGEMENT_STUDENT_TYPE } from "./actionType";

export const getStudentFee = (classRoomId, institute, studentId, filter) => {

  return (dispatch) => {
    dispatch({
      type: FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_FEE_LOADING,
      payload: [],
    });
    FeeManagementRequest.get(
      FeeManagementRequest.FeeManagementEndpoint.getStudentFees.replace("__CLASSID__", classRoomId).replace("__INS__", institute).replace("__OWNER__", studentId).replace("_FILTER_", filter),
      (success) => {
        
        dispatch({
          type: FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_FEE_LOADED,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const studentFeeReset = () => {
  return {
    type: FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_FEE_RESET,
    payload: []
  }
}
export const getStudentCourseData = (institute, studentId) => {
  return (dispatch) => {
 
    dispatch({
      type: FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_COURSE_DATA_LOADING,
      payload: [],
    });
    FeeManagementRequest.get(
      FeeManagementRequest.FeeManagementEndpoint.getStudentCourseData.replace("__INS__", institute).replace("__OWNER__", studentId),
      (success) => {
        dispatch({
          type: FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_COURSE_DATA_LOADED,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};



export const createOrder = (data) => {

  return (dispatch) => {
    dispatch({
      type: FEE_MANAGEMENT_STUDENT_TYPE.CREATE_RAZORPAY_ORDER_LOADING,
      payload: {},
    })
    FeeManagementRequest.post(
      FeeManagementRequest.FeeManagementEndpoint.createRazorPayOrder, data,
      (success) => {
        dispatch({
          type: FEE_MANAGEMENT_STUDENT_TYPE.CREATE_RAZORPAY_ORDER_LOADED,
          payload: success
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
      });
  }
}




export const getStudentFeeViewDetails = (Id) => {

  return (dispatch) => {
    dispatch({
      type: FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_FEE_VIEW_DETAILS_LOADING,
      payload: [],
    });
    FeeManagementRequest.get(
      FeeManagementRequest.FeeManagementEndpoint.getStudentFeeViewDetails.replace("__ID__", Id),
      (success) => {
        dispatch({
          type: FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_FEE_VIEW_DETAILS_LOADED,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const getStudentFeeSingle = (Id) => {

  return (dispatch) => {
    dispatch({
      type: FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_FEE_SINGLE_LOADING,
      payload: [],
    });
    FeeManagementRequest.get(
      FeeManagementRequest.FeeManagementEndpoint.getStudentFeeViewSingle.replace("__ID__", Id),
      (success) => {
        
        dispatch({
          type: FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_FEE_SINGLE_LOADED,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const getStudentFeeSingleReset = () => {

  return (dispatch) => {
    dispatch({
      type: FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_FEE_SINGLE_RESET,
      payload: [],
    });

  };
};
export const OrderCreateReset = () => {
 
  return (dispatch) => {
    dispatch({
      type: FEE_MANAGEMENT_STUDENT_TYPE.CREATE_RAZORPAY_ORDER_RESET,
      payload: [],
    });

  };
};


// export const  getStudentInvoiceData;
export const getStudentInvoiceData = (Id) => {
  
  return (dispatch) => {
    dispatch({
      type: FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_INVOICE_DETAILS_LOADING,
      payload: [],
    });
    FeeManagementRequest.get(
      FeeManagementRequest.FeeManagementEndpoint.getStudentInvoiceData.replace("__ID__", Id),
      (success) => {
        
        dispatch({
          type: FEE_MANAGEMENT_STUDENT_TYPE.GET_STUDENT_INVOICE_DETAILS_LOADED,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};