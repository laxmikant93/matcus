import { ASSIGNMENT_TYPE } from "./actionType";
import Request from "./request";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const postAssignmentData = (data) => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.ASSIGNMENT_CREATE_LOADING,
      payload: [],
    });
    Request.post(
      Request.assignmentsEndpoint.postAssignment,
      data,
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_CREATE,
          payload: success.data,
        });

        dispatch(showSuccessPopup("Assignment submitted."));
      },
      (error) => {
        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_CREATE_RESET,
          payload: [],
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const postAssignmentDataReset = () => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.ASSIGNMENT_CREATE_RESET,
    });
  };
};

export const getStudentInfoData = (userID, insID) => {
  return (dispatch) => {
    Request.get(
      Request.assignmentsEndpoint.getStudentInfo
        .replace("__INSID__", insID)
        .replace("__ID__", userID),
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.STUDENT_INFO_READ,
          payload: success.data.data[0],
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getStudentAssignmentInfoData = (studentID, insID) => {
  return (dispatch) => {
    Request.get(
      Request.assignmentsEndpoint.getStudentAssignmentInfoData
        .replace("__STUDENTID__", studentID)
        .replace("__INSID__", insID),
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.ALL_ASSIGNMENT_STUDENT_READ,
          payload: success.data.assignment_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// OTR1
export const sortByOldToRecent1Assignment = (_id, InsId) => {
  return (dispatch) => {
    Request.get(
      Request.assignmentsEndpoint.assignmentSortBy_OTR1
        .replace("__ID__", _id)
        .replace("__INS__", InsId),
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.SORT_BY_STUDENT_ASSIGNMENT_OTR1,
          payload: success.data.assignment_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// RTO1
export const sortByRecentToOld1Assignment = (_id, InsId) => {
  return (dispatch) => {
    Request.get(
      Request.assignmentsEndpoint.assignmentSortByRTO1
        .replace("__ID__", _id)
        .replace("__INS__", InsId),
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.SORT_BY_STUDENT_ASSIGNMENT_RTO1,
          payload: success.data.assignment_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// RTO2
export const sortByRecentToOld2Assignment = (_id, InsId) => {
  return (dispatch) => {
    Request.get(
      Request.assignmentsEndpoint.assignmentSortByRTO2
        .replace("__ID__", _id)
        .replace("__INS__", InsId),
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.SORT_BY_STUDENT_ASSIGNMENT_RTO2,
          payload: success.data.assignment_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// OTR2
export const sortByOldToRecent2Assignment = (_id, InsId) => {
  return (dispatch) => {
    Request.get(
      Request.assignmentsEndpoint.assignmentSortBy_OTR2
        .replace("__ID__", _id)
        .replace("__INS__", InsId),
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.SORT_BY_STUDENT_ASSIGNMENT_OTR2,
          payload: success.data.assignment_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const sortByGradedAssignment = (_id, InsId) => {
  return (dispatch) => {
    Request.get(
      Request.assignmentsEndpoint.assignmentSortByGraded
        .replace("__ID__", _id)
        .replace("__INS__", InsId),
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.SORT_BY_STUDENT_ASSIGNMENT_GRADED,
          payload: success.data.assignment_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const sortBySubmitedAssignment = (_id, InsId) => {
  return (dispatch) => {
    Request.get(
      Request.assignmentsEndpoint.assignmentSortBySubmited
        .replace("__ID__", _id)
        .replace("__INS__", InsId),
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.SORT_BY_STUDENT_ASSIGNMENT_SUBMITED,
          payload: success.data.assignment_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const sortByPendingAssignment = (_id, InsId) => {
  return (dispatch) => {
    Request.get(
      Request.assignmentsEndpoint.assignmentSortByPending
        .replace("__ID__", _id)
        .replace("__INS__", InsId),
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.SORT_BY_STUDENT_ASSIGNMENT_PENDING,
          payload: success.data.assignment_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const sortByMissedAssignment = (_id, InsId,missed) => {
  return (dispatch) => {
    Request.get(
      Request.assignmentsEndpoint.assignmentSortByMissed
        .replace("__ID__", _id)
        .replace("__INS__", InsId).replace("_missed_",missed),
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.SORT_BY_STUDENT_ASSIGNMENT_MISSED,
          payload: success.data.assignment_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};


export const courseAndClassroomFilter = (
  studentID,
  InsId,
  Course,
  Classroom
) => {
  return (dispatch) => {
    Request.get(
      Request.assignmentsEndpoint.student_assignment_course_Classroom
        .replace("__USERID__", studentID)
        .replace("__INSID__", InsId)
        .replace("__COURSE__", Course)
        .replace("__CLASSROOM__", Classroom),
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.STUDENT_ASSIGNMENT_CLASS_AND_COURSE,
          payload: success.data.assignment_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getStudentAssignmentInfoDataRESET = () => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.ALL_ASSIGNMENT_STUDENT_READ_RESET,
      payload: {},
    });
  };
};

export const restSingleAssignment = () => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.SINGLE_ASSIGNMENT_READ_STUDENT_LOADING,
      payload: {},
    });
  };
};

export const getSingleAssignmentInfoData = (studentID, insId, assignmentID) => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.SINGLE_ASSIGNMENT_READ_STUDENT_LOADING,
      payload: {},
    });

    Request.get(
      Request.assignmentsEndpoint.getSingleAssignmentInfoData
        .replace("__STUDENTID__", studentID)
        .replace("__INS__", insId)
        .replace("__ASSIGNMENTID__", assignmentID),
      (success) => {
        if (success.data.assignment_data[0]) {
          dispatch({
            type: ASSIGNMENT_TYPE.SINGLE_ASSIGNMENT_READ_STUDENT,
            payload: success.data.assignment_data[0],
          });
        } else {
          dispatch({
            type: ASSIGNMENT_TYPE.SINGLE_ASSIGNMENT_READ_STUDENT,
            payload: {},
          });
        }
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const ClearGetSingleAssignmentInfoData = () => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.SINGLE_ASSIGNMENT_READ,
      payload: {},
    });
  };
};

export const deleteAssignmentData = (_id) => {
  return (dispatch) => {
    Request.delete(
      Request.assignmentsEndpoint.deleteAssignment.replace("__ID__", _id),
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_DELETE,
          payload: { _id },
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const updateAssignmentData = (_id, data) => {
  return (dispatch) => {
    Request.patch(
      Request.assignmentsEndpoint.updateAssignment.replace("__ID__", _id),
      data,
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_UPDATE,
          payload: { ...data, _id: _id },
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const selectAssignmentToUpdate = (_id) => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.ASSIGNMENT_UPDATE_SELECTION,
      payload: _id,
    });
  };
};

export const clearAssigmentView = (_id) => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.CLEAR_ASSIGNMENT_VIEW,
      payload: [],
    });
  };
};
