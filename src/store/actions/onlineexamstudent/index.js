import OnlineExamStudentRequest from "./OnlineExamStudentRequest";
import { onlineExamActionTypes } from "./actionTypes";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const examInformation = (examId, studentId) => {
  return (dispatch) => {
    dispatch({
      type: onlineExamActionTypes.OES_INFO_LOADING,
      payload: {},
    });

    OnlineExamStudentRequest.get(
      OnlineExamStudentRequest.onlineExamStudentRequest.examDetail
        .replace("__EXAMID__", examId)
        .replace("__STUDENTID__", studentId), //?examid=&studentid=60598e391e17bc1740e07990
      (success) => {
        dispatch({
          type: onlineExamActionTypes.OES_INFO_LOADED,
          payload: success.data,
        });
      },
      (error) => {
        dispatch({
          type: onlineExamActionTypes.OES_INFO_LOADING_ERROR,
          payload: {},
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const examResult = (
  examId,
  studentId
) => {
  return (dispatch) => {
    dispatch({
      type: onlineExamActionTypes.OES_RESULT_LOADING,
      payload: {},
    });
    OnlineExamStudentRequest.get(
      OnlineExamStudentRequest.onlineExamStudentRequest.examResult
        .replace("__EXAMID__", examId)
        .replace("__STUDENTID__", studentId),
      (success) => {
        dispatch({
          type: onlineExamActionTypes.OES_RESULT_LOADED,
          payload: success.data,
        });
      },
      (error) => {
        dispatch({
          type: onlineExamActionTypes.OES_RESULT_LOADING_ERROR,
          payload: {},
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const postStudentExam = (data) => {
  return (dispatch) => {
    dispatch({
      type: onlineExamActionTypes.OES_POST_EXAM_LOADING,
      payload: {},
    });
    OnlineExamStudentRequest.post(
      OnlineExamStudentRequest.onlineExamStudentRequest.postStudentExam,
      data,
      (success) => {
        dispatch({
          type: onlineExamActionTypes.OES_POST_EXAM,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const patchGraceData = (examId, studentId, data) => {
  return (dispatch) => {
    dispatch({
      type: onlineExamActionTypes.OES_GRACE_EXAM_LOADING,
      payload: {},
    });
    OnlineExamStudentRequest.patch(
      OnlineExamStudentRequest.onlineExamStudentRequest.patchGraceRequest.replace("__EXAMID__", examId)
        .replace("__STUDENTID__", studentId), data,
      (success) => {
        dispatch({
          type: onlineExamActionTypes.OES_GRACE_EXAM,
          payload: success.data.data,
        });
        dispatch(showSuccessPopup("Grace Time Request Send."));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const patchExamAnswer = (submitId, data) => {
  return (dispatch) => {
    dispatch({
      type: onlineExamActionTypes.OES_PATCH_ANSWER_LOADING,
      payload: {},
    });
    OnlineExamStudentRequest.patch(
      OnlineExamStudentRequest.onlineExamStudentRequest.patchExamAnswer
        .replace("__SUBMITID__", submitId)
      , data,
      (success) => {
        dispatch({
          type: onlineExamActionTypes.OES_PATCH_ANSWER,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const resetPatchExaAnswer = ()=>{
  return (dispatch)=>{
    dispatch({
      type:onlineExamActionTypes.OES_PATCH_ANSWER_RESET
    })
  }
}

export const getPatchAnswer = (examId, studentId) => {
  return (dispatch) => {
    dispatch({
      type: onlineExamActionTypes.OES_GET_ANSWER,
      payload: {},
    });

    OnlineExamStudentRequest.get(
      OnlineExamStudentRequest.onlineExamStudentRequest.getPatchAnswer
        .replace("__EXAMID__", examId)
        .replace("__STUDENTID__", studentId),
      (success) => {
        dispatch({
          type: onlineExamActionTypes.OES_GET_ANSWER_LOADING,
          payload: success.data,
        });
      },
      (error) => {
        dispatch({
          type: onlineExamActionTypes.OES_INFO_LOADING_ERROR,
          payload: {},
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const patchSubmitExam = (submitId, data) => {

  return (dispatch) => {
    dispatch({
      type: onlineExamActionTypes.OES_EXAM_SUBMIT_LOADING,
      payload: {},
    });
    OnlineExamStudentRequest.patch(
      OnlineExamStudentRequest.onlineExamStudentRequest.patchSubmitExam
        .replace("__SUBMITID__", submitId), data,
      (success) => {
        dispatch({
          type: onlineExamActionTypes.OES_EXAM_SUBMIT,
          payload: success.data,
        });
        data.isTerminated ? dispatch(showSuccessPopup("Exam Terminated")) : dispatch(showSuccessPopup("Exam Submitted Completed"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const resetOnlineExamStudent = () => {
  return (dispatch) => {
    dispatch({
      type: onlineExamActionTypes.RESET_ONLINE_EXAM_STUDENT,
      payload: {}
    })
  }
}
export const resetOESLoadedDetail = () => {
  return (dispatch) => {
    dispatch({
      type: onlineExamActionTypes.RESET_OES_LOADED_DETAIL,
      payload: {}
    })
  }
}

export const onlineExamFileRest = () => {
  return (dispatch) => {
    dispatch({
      type: onlineExamActionTypes.OES_EXAM_UPLOAD_RESET,
      payload: {}
    })
  }
}
export const onlineExamFileSet = (item) => {
  return (dispatch) => {
    dispatch({
      type: onlineExamActionTypes.OES_EXAM_UPLOAD_SET,
      payload: item,
    })
  }
}
export const onlineExamStudentFileReset = () => {
  return (dispatch) => {
    dispatch({
      type: onlineExamActionTypes.OES_EXAM_STUDENT_UPLOAD_RESET,
      payload: {}
    })
  }
}
export const onlineExamStudentFileSet = (item) => {
  return (dispatch) => {
    dispatch({
      type: onlineExamActionTypes.OES_EXAM_STUDENT_UPLOAD_SET,
      payload: item,
    })
  }
}
export const resetSubmitSuccess = () => {
  return (dispatch) => {
    dispatch({
      type: onlineExamActionTypes.OES_EXAM_SUBMIT_RESET,
      payload: {}
    })
  }
}
export const resetOESResult = () => {
  return (dispatch) => {
    dispatch({
      type: onlineExamActionTypes.OES_RESULT_RESET,
      payload: {}
    })
  }
}

// dispatch for trying my updating data
export const updateTimer = (item) => {
  return (dispatch) => {
    dispatch({
      type: onlineExamActionTypes.OES_INFO_LOADING,
      payload: {},
    });
    dispatch({
      type: onlineExamActionTypes.OES_UPDATE_TIMER,
      payload: item
    })
  };
};

export const attemptedQuestion = item => {
  return dispatch => {
    dispatch({
      type: onlineExamActionTypes.OES_ATTEMPTED_QUESTION,
      payload: item
    })
  }
}

export const getAssignToFillter = (studentId, instituteId) => {
  return (dispatch) => {
    dispatch({
      type: onlineExamActionTypes.OES_ASSIGN_LOADING,
      payload: {},
    });

    OnlineExamStudentRequest.get(
      OnlineExamStudentRequest.onlineExamStudentRequest.getAssignTo.replace("__STUDENTID__", studentId).replace("__INSID__", instituteId),
      (success) => {
        dispatch({
          type: onlineExamActionTypes.OES_ASSIGN_LOADED,
          payload: success.data.examList2
        });
      },
      (error) => {
        dispatch({
          type: onlineExamActionTypes.OES_ASSIGN_LOADING_ERROR,
          payload: {},
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const resetWarningTimer = () => {
  return (dispatch) => {
    dispatch({
      type: onlineExamActionTypes.OES_RESET_WARNING_TIMER,
    })
  }
}

