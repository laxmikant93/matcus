import { STUDENTTYPE } from "./actionType";
import StudentRequest from "./StudentRequest";
import { setCommonError } from "../commonerror";
import { TEACHERTYPE } from "../inviteteacher/actionType";
import { showSuccessPopup } from "../successmessagepopup";
export const getStudentData = () => {
  return (dispatch) => {
    dispatch({
      type: STUDENTTYPE.STUDENT_LOADED,
      payload: "",
    });
    StudentRequest.get(
      StudentRequest.studentEndpoint.student,
      (success) => {
        dispatch({
          type: STUDENTTYPE.STUDENT_LOADED,
          payload: success.data.data,
        });
      },
      (error) => {
        setCommonError(error.message);
      }
    );
  };
};

export const postBulkUpload = (data) => {
  return (dispatch) => {
    dispatch({
      type: STUDENTTYPE.STUDENT_INVITE_LOADING,
      payload: {},
    });

    StudentRequest.post(
      StudentRequest.studentEndpoint.bulkuploadstudent,
      data,
      (success) => {
      
        dispatch({
          type: STUDENTTYPE.STUDENT_INVITE,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const postBulkUploadClear = () => {
  return (dispatch) => {
    dispatch({
      type: STUDENTTYPE.STUDENT_INVITE_CREATE_RESET,
      payload: {},
    });
  };
};


export const postStudentData = (data) => {
  return (dispatch) => {
    dispatch({
      type: STUDENTTYPE.STUDENT_MANUAL_INVITE_LOADING,
      payload: {},
    });
    StudentRequest.post(
      StudentRequest.studentEndpoint.student,
      data,
      (success) => {
      
        if (success.data.data.invalidStudentResponse) {
          dispatch({
            type: STUDENTTYPE.STUDENT_MANUAL_INVITE_LOADED,
            payload: success.data.data.invalidStudentResponse,
          });
          dispatch(showSuccessPopup("Invited Successfully."));
        } else {
          dispatch({
            type: STUDENTTYPE.STUDENT_MANUAL_INVITE_ERROR,
            payload: success.data.data.invalidStudentData,
          });
        }
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getErrorOtp = () => {
  return (dispatch) => {
    dispatch({
      type: TEACHERTYPE.GET_ERROR,
    });
  };
};
export const successInviteStudentReset = () => {
  return (dispatch) => {
    dispatch({
      type: STUDENTTYPE.STUDENT_MANUAL_INVITE_RESET,
      payload: {},
    });
  };
};

export const getStudentDataId = (otp, email) => {
  return (dispatch) => {
    StudentRequest.get(
      StudentRequest.studentEndpoint.studentId
        .replace("__otp__", otp)
        .replace("__email__", email),
      (success) => {
        let dataotp = success.data.data[0];
        if (dataotp === undefined || dataotp.accepted === true) {
          dispatch({
            type: STUDENTTYPE.STUDENT_ERROR,
            error: true,
          });
        } else {
          dispatch({
            type: STUDENTTYPE.STUDENT_ID,
            payload: success.data.data[0],
          });
        }
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getStudentDataWithoutId = (otp) => {
  return (dispatch) => {
    StudentRequest.get(
      StudentRequest.studentEndpoint.studentwithoutId.replace("__otp__", otp),
      (success) => {
        let dataotp = success.data.data[0];
        if (dataotp === undefined || dataotp.accepted === true) {
          dispatch({
            type: STUDENTTYPE.ERROR,
            error: true,
          });
        } else {
          dispatch({
            type: STUDENTTYPE.STUDENT_ID,
            payload: success.data.data[0],
          });
        }
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getStudentInvitationHistoryData = (_id) => {
  return (dispatch) => {
    dispatch({
      type: STUDENTTYPE.LOADING,
      loading: true,
    });
    StudentRequest.get(
      StudentRequest.studentEndpoint.getStudentHistory.replace("__Id__", _id),
      (success) => {
        dispatch({
          type: STUDENTTYPE.STUDENT_HISTORY,
          payload: success.data.data.reverse(),
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const editStudentDataId = (id, data) => {
  return (dispatch) => {
    StudentRequest.patch(
      StudentRequest.studentEndpoint.studentpatchId.replace("__Id__", id),
      data,
      (success) => {
        dispatch({
          type: STUDENTTYPE.STUDENT_EDIT,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
