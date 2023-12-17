import { REPORTCARD_ACTION_TYPES } from "./actions";
import reportCardRequest from "./request";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const getGrades = (id) => {
  return (dispatch) => {
    dispatch({
      type: REPORTCARD_ACTION_TYPES.GET_GRADES_LOADING,
      loading: true,
    });
    reportCardRequest.get(
      reportCardRequest.reportCardEndPoint.getGrades.replace("__ID__", id),
      (success) => {
        dispatch({
          type: REPORTCARD_ACTION_TYPES.GET_GRADES_SUCCESS,
          payload: success.data,
        });
      },
      (error) => {
        dispatch({
          type: REPORTCARD_ACTION_TYPES.GET_GRADES_ERROR,
          error: error.message,
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const createNewGrades = (data) => {
  return (dispatch) => {
    dispatch({
      type: REPORTCARD_ACTION_TYPES.ADD_GRADES_LOADING,
      loading: true,
    });
    reportCardRequest.post(
      reportCardRequest.reportCardEndPoint.createNewGrade,
      data,
      (success) => {
        dispatch({
          type: REPORTCARD_ACTION_TYPES.ADD_GRADE_SUCCESS,
          payload: success.data,
        });
        dispatch(showSuccessPopup("Grade created successfully"));
      },
      (error) => {
        dispatch({
          type: REPORTCARD_ACTION_TYPES.ADD_GRADE_ERROR,
          error: error.message,
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const updateGrades = (id, data) => {
  return (dispatch) => {
    dispatch({
      type: REPORTCARD_ACTION_TYPES.UPDATE_GRADES_LOADING,
      loading: true,
    });
    reportCardRequest.patch(
      reportCardRequest.reportCardEndPoint.updateGrades.replace("__ID__", id),
      data,
      (success) => {
        dispatch({
          type: REPORTCARD_ACTION_TYPES.UPDATE_GRADES_SUCCESS,
          payload: success.data,
        });
        dispatch(showSuccessPopup("Updated successfully"));
      },
      (error) => {
        dispatch({
          type: REPORTCARD_ACTION_TYPES.UPDATE_GRADES_ERROR,
          error: error.message,
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const addTerm = (termData) => {
  return (dispatch) => {
    reportCardRequest.post(
      reportCardRequest.reportCardEndPoint.createTerm,
      termData,
      (success) => {
        dispatch({
          type: REPORTCARD_ACTION_TYPES.ADD_REPORTCARD_TERM,
          payload: success,
        });
        dispatch(showSuccessPopup("Term created successfully"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getReport = (instituteId, courseId, termId) => {
  return (dispatch) => {
    dispatch({
      type: REPORTCARD_ACTION_TYPES.GET_REPORT_LOADING,
      loading: true,
    });
    reportCardRequest.get(
      reportCardRequest.reportCardEndPoint.getResult
        .replace("__INSID__", instituteId)
        .replace("__COURSEID__", courseId)
        .replace("__TERMID__", termId),
      (success) => {
        dispatch({
          type: REPORTCARD_ACTION_TYPES.GET_REPORT_SUCCESS,
          payload: success.data,
        });
      },
      (error) => {
        dispatch({
          type: REPORTCARD_ACTION_TYPES.GET_REPORT_ERROR,
          error: error.message,
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getTermList = (instituteId, courseId) => {
  return (dispatch) => {
    reportCardRequest.get(
      reportCardRequest.reportCardEndPoint.getTermList
        .replace("__ID__", instituteId)
        .replace("__ID__", courseId),
      (success) => {
        dispatch({
          type: REPORTCARD_ACTION_TYPES.GET_TERM_LIST,
          payload: success.data,
        });
      },
      (error) => {
        dispatch({
          type: REPORTCARD_ACTION_TYPES.GET_REPORT_ERROR,
          error: error.message,
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const clearTerm = () => {
  return (dispatch) => {
    dispatch({
      type: REPORTCARD_ACTION_TYPES.CLEAR_TERM_LIST,
      payload: [],
    });
  }
};


export const getStudentReport = (instituteId, reportCardId) => {
  return (dispatch) => {
    reportCardRequest.get(
      reportCardRequest.reportCardEndPoint.getStudentReport
        .replace("__ID__", instituteId)
        .replace("__ID__", reportCardId),
      (success) => {
        dispatch({
          type: REPORTCARD_ACTION_TYPES.GET_STUDENT_REPORT,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const updateStudentReport = (reportCardId, data) => {
  return (dispatch) => {
    reportCardRequest.patch(
      reportCardRequest.reportCardEndPoint.updateStudentReport
        .replace("__ID__", reportCardId), data,
      (success) => {
        dispatch({
          type: REPORTCARD_ACTION_TYPES.UPDATE_STUDENT_REPORT,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};