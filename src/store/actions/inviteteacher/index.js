import { TEACHERTYPE } from "./actionType";
import { setCommonError } from "../commonerror";
import TeacherRequest from "../inviteteacher/TeacherRequest";
import { showSuccessPopup } from "../successmessagepopup";
export const getTeacherData = () => {
  return (dispatch) => {
    dispatch({
      type: TEACHERTYPE.TEACHER_HISTORY,
      payload: "",
    });

    TeacherRequest.get(
      TeacherRequest.teacherEndpoint.teacher,
      (success) => {
        dispatch({
          type: TEACHERTYPE.TEACHER_HISTORY,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const postTeacherDataInvite = (data) => {
  return (dispatch) => {
    dispatch({
      type: TEACHERTYPE.TEACHER_INVITE_LOADING,
      payload: {},
    });
    dispatch({
      type: TEACHERTYPE.TEACHER_INVITE_ERROR_RESET,
      payload: {},
    });

    TeacherRequest.post(
      TeacherRequest.teacherEndpoint.teacher,
      data,
      (success) => {
        if (success.data.invalidTeacherResponse) {
          dispatch({
            type: TEACHERTYPE.TEACHER_INVITE,
            payload: success.data,
          });
          dispatch(showSuccessPopup("Email sent."));
        } else {
          dispatch({
            type: TEACHERTYPE.TEACHER_INVITE_ERROR,
            payload: success.data.invalidData,
          });

        }

      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const createTeacherDataRest = () => {
  return (dispatch) => {
    dispatch({
      type: TEACHERTYPE.TEACHER_INVITE_REST,
      payload: {},
    });
    dispatch({
      type: TEACHERTYPE.TEACHER_INVITE_ERROR_RESET,
      payload: {},
    });
  };
};

export const postBulkUpload = (data) => {
  return (dispatch) => {
    dispatch({
      type: TEACHERTYPE.TEACHER_INVITE_LOADING,
      payload: {},
    });

    TeacherRequest.post(
      TeacherRequest.teacherEndpoint.bulkupload,
      data,
      (success) => {
        dispatch({
          type: TEACHERTYPE.TEACHER_INVITE,
          payload: success.data.data,
        });
        //dispatch(showSuccessPopup("Email sent."));
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
      type: TEACHERTYPE.TEACHER_INVITE_REST,
      payload: {},
    });
  };
};


export const getTeacherDataId = (otp, email) => {
  return (dispatch) => {
    TeacherRequest.get(
      TeacherRequest.teacherEndpoint.teacherId
        .replace("__otp__", otp)
        .replace("__email__", email),
      (success) => {
        let dataotp = success.data.data[0];
        if (dataotp === undefined || dataotp.accepted === true) {
          dispatch({
            type: TEACHERTYPE.ERROR,
            error: true,
          });
        } else {
          dispatch({
            type: TEACHERTYPE.TEACHER_ID,
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

export const getTeacherDataWithoutId = (otp) => {
  return (dispatch) => {
    TeacherRequest.get(
      TeacherRequest.teacherEndpoint.teacherwithoutId.replace("__otp__", otp),
      (success) => {
        let dataotp = success.data.data[0];
        if (dataotp === undefined || dataotp.accepted === true) {
          dispatch({
            type: TEACHERTYPE.ERROR,
            error: true,
          });
        } else {
          dispatch({
            type: TEACHERTYPE.TEACHER_ID,
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

export const getErrorOtp = () => {
  return (dispatch) => {
    dispatch({
      type: TEACHERTYPE.GET_ERROR,
    });
  };
};
export const getInvitationHistoryData = (_id) => {
  return (dispatch) => {
    dispatch({
      type: TEACHERTYPE.LOADING,
      loading: true,
    });
    TeacherRequest.get(
      TeacherRequest.teacherEndpoint.getteacherlist.replace("__Id__", _id),
      (success) => {
        dispatch({
          type: TEACHERTYPE.GET_HISTORY,
          payload: success.data.data.reverse(),
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const editTeacherDataId = (id, data) => {
  return (dispatch) => {
    TeacherRequest.patch(
      TeacherRequest.teacherEndpoint.teacherpatchId.replace("__Id__", id),
      data,
      (success) => {
        dispatch({
          type: TEACHERTYPE.TEACHER_EDIT,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getNotassignedClassrooms = (_id, courseid) => {
  return (dispatch) => {
    TeacherRequest.get(
      TeacherRequest.teacherEndpoint.notAssignedclassrooms.replace("__INS__", _id).replace("__COUSEID__", courseid),
      (success) => {
        dispatch({
          type: TEACHERTYPE.GET_NOT_ASSIGNED_CLASSROOMS,
          payload: success.data.arr,
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}