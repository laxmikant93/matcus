import { ASSIGNMENT_TYPE } from "./actionType";
import AssignmentRequest from "./AssignmentRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const postAssignmentData = (data, fullname) => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.ASSIGNMENT_CREATE_LOADING,
      payload: {},
    });
    AssignmentRequest.post(
      AssignmentRequest.assignmentsEndpoint.postAssignment,
      data,
      (success) => {
        let AssignmentData = () => {
          return {
            classroom: success.data.assignmentInfo.classroom,
            course: success.data.assignmentInfo.course,
            courseInfo_coursename:
              success.data.assignmentInfo.courseDetail.coursename,
            classroomInfo_classroomname:
              success.data.assignmentInfo.classroomDetail.classroomname,
            title: success.data.assignmentInfo.title,
            _id: success.data.assignmentInfo._id,
            createdAt: success.data.assignmentInfo.createdAt,
            duedate: success.data.assignmentInfo.duedate,
            fileupload: success.data.assignmentInfo.fileupload,
            institute: success.data.assignmentInfo.institute,
            owner: success.data.assignmentInfo.owner,
            description: success.data.assignmentInfo.description,
            createdBy: fullname,
            assignTo: fullname,
          };
        };
        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_CREATE,
          payload: AssignmentData(),
        });
        dispatch(showSuccessPopup("Assignment Created."));
        dispatch(AddAssignmentNotification(success.data.assignmentInfo));
      },
      (error) => {
        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_CREATE_ERROR,
          payload: {},
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const patchAssigmentRemark = (_id, data, allDAta) => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.ASSIGNMENT_REMARK_LOADING,
      payload: [],
    });

    AssignmentRequest.patch(
      AssignmentRequest.assignmentsEndpoint.AssignmentRemark.replace(
        "__ID__",
        _id
      ),
      data,
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_REMARK,
          payload: allDAta,
        });
        if (success.data.status === true) dispatch(GradeAssignmentNotification(_id, data))
        dispatch(showSuccessPopup("Remark added."));
      },
      (error) => {
        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_REMARK_RESET,
          payload: [],
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getAssignmentData = (_id, InsId) => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.ASSIGNMENT_READ_LOADING,
      payload: {},
    });

    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.getAssignment
        .replace("__ID__", _id)
        .replace("__INS__", InsId),
      (success) => {

        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_READ,
          payload: success.data.assignmentInfo,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const assignmentCreatedBy = (_id, InsId) => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.ASSIGNMENT_READ_LOADING,
      payload: {},
    });

    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.assignment_Assigned
        .replace("__USERID__", _id)
        .replace("__INSID__", InsId),
      (success) => {

        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_CREATEDBY,
          payload: success.data.teacherList,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const filteredAssignmentAccToCreatedBy = (_id, InsId, Teachers) => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.ASSIGNMENT_READ_LOADING,
      payload: {},
    });

    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.getAssignmentCreatedBy
        .replace("__ID__", _id)
        .replace("__INS__", InsId)
        .replace("__NAME__", Teachers),
      (success) => {

        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_CREATED_BY,
          payload: success.data.assignmentInfo,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const setFilteredTeachers = (selectedTeachers) => {

  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.SET_FILTERED_ASSIGNMENT_TEACHERS,
      payload: selectedTeachers,
    });
  };
};

// RTO1
export const sortByRecentToOld1Assignment = (_id, InsId) => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.ASSIGNMENT_READ_LOADING,
      payload: {},
    });

    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.assignmentSortByRTO1
        .replace("__ID__", _id)
        .replace("__INS__", InsId),
      (success) => {

        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_SORTBYRTO1,
          payload: success.data.assignmentInfo,
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
    dispatch({
      type: ASSIGNMENT_TYPE.ASSIGNMENT_READ_LOADING,
      payload: {},
    });

    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.assignmentSortBy_OTR1
        .replace("__ID__", _id)
        .replace("__INS__", InsId),
      (success) => {

        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_SORTBYOTR1,
          payload: success.data.assignmentInfo,
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
    dispatch({
      type: ASSIGNMENT_TYPE.ASSIGNMENT_READ_LOADING,
      payload: {},
    });

    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.assignmentSortByRTO2
        .replace("__ID__", _id)
        .replace("__INS__", InsId),
      (success) => {

        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_SORTBYRTO2,
          payload: success.data.assignmentInfo,
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
    dispatch({
      type: ASSIGNMENT_TYPE.ASSIGNMENT_READ_LOADING,
      payload: {},
    });

    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.assignmentSortBy_OTR2
        .replace("__ID__", _id)
        .replace("__INS__", InsId),
      (success) => {

        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_SORTBYOTR2,
          payload: success.data.assignmentInfo,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// RTO3
export const sortByRecentToOld3Assignment = (_id, InsId) => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.ASSIGNMENT_READ_LOADING,
      payload: {},
    });

    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.assignmentSortByRTO3
        .replace("__ID__", _id)
        .replace("__INS__", InsId),
      (success) => {

        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_SORTBYRTO3,
          payload: success.data.assignmentInfo,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// OTR3
export const sortByOldToRecent3Assignment = (_id, InsId) => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.ASSIGNMENT_READ_LOADING,
      payload: {},
    });

    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.assignmentSortBy_OTR3
        .replace("__ID__", _id)
        .replace("__INS__", InsId),
      (success) => {

        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_SORTBYOTR3,
          payload: success.data.assignmentInfo,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getAssignmentDataReset = () => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.ASSIGNMENT_READ_RESET,
      payload: {},
    });
  };
};

export const getSearchAssignmentData = (_id, InsId, value) => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.ASSIGNMENT_READ_LOADING,
      payload: {},
    });
    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.getSearchAssignment
        .replace("__ID__", _id)
        .replace("__INS__", InsId)
        .replace("__VALUE__", value),
      (success) => {

        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_SEARCH_READ,
          payload: success.data.assignmentInfo,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getSingleAssignmentData = (_assignmentId, InsID, classID, courseID) => {
  return (dispatch) => {
    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.getSingleAssignmentClassroom
        .replace("__ASSIGNMENTID__", _assignmentId)
        .replace("__INSID__", InsID).replace("__CLASSID__", classID).replace("__COURSEID__", courseID),
      (success) => {

        dispatch({
          type: ASSIGNMENT_TYPE.SINGLE_ASSIGNMENT_READ,
          payload: success.data.assignment_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const sortByRecentToOldViewAssignment = (_assignmentId, InsID) => {
  return (dispatch) => {
    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.sortByRTO_viewAssignment
        .replace("__ASSIGNMENTID__", _assignmentId)
        .replace("__INSID__", InsID),
      (success) => {

        dispatch({
          type: ASSIGNMENT_TYPE.SORT_BY_RTO_VIEW_ASSIGNMENT,
          payload: success.data.assignment_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const sortByOldToRecentViewAssignment = (_assignmentId, InsID) => {
  return (dispatch) => {
    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.sortByOTR_viewAssignment
        .replace("__ASSIGNMENTID__", _assignmentId)
        .replace("__INSID__", InsID),
      (success) => {

        dispatch({
          type: ASSIGNMENT_TYPE.SORT_BY_OTR_VIEW_ASSIGNMENT,
          payload: success.data.assignment_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const sortBySubmittedAssignment = (_assignmentId, InsID) => {
  return (dispatch) => {
    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.sortBySubmittedStatus
        .replace("__ASSIGNMENTID__", _assignmentId)
        .replace("__INSID__", InsID),
      (success) => {

        dispatch({
          type: ASSIGNMENT_TYPE.SORT_BY_SUBMITTED_VIEW_ASSIGNMENT,
          payload: success.data.assignment_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const sortByPendingAssignment = (_assignmentId, InsID) => {
  return (dispatch) => {
    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.sortByPendingStatus
        .replace("__ASSIGNMENTID__", _assignmentId)
        .replace("__INSID__", InsID),
      (success) => {

        dispatch({
          type: ASSIGNMENT_TYPE.SORT_BY_PENDING_VIEW_ASSIGNMENT,
          payload: success.data.assignment_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const sortByAssignmentGradedYes = (_assignmentId, InsID) => {
  return (dispatch) => {
    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.sortByGradedYes
        .replace("__ASSIGNMENTID__", _assignmentId)
        .replace("__INSID__", InsID),
      (success) => {

        dispatch({
          type: ASSIGNMENT_TYPE.SORT_BY_GRADED_YES_VIEW_ASSIGNMENT,
          payload: success.data.assignment_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const sortByAssignmentGradedNo = (_assignmentId, InsID) => {
  return (dispatch) => {
    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.sortByGradedNo
        .replace("__ASSIGNMENTID__", _assignmentId)
        .replace("__INSID__", InsID),
      (success) => {

        dispatch({
          type: ASSIGNMENT_TYPE.SORT_BY_GRADED_NO_VIEW_ASSIGNMENT,
          payload: success.data.assignment_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getSearchSingleAssignmentData = (InsID, _assignmentId, val) => {
  return (dispatch) => {
    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.getSearchSingleAssignment
        .replace("__ID__", _assignmentId)
        .replace("__INS__", InsID)
        .replace("__VAL__", val),
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.SINGLE_ASSIGNMENT_READ,
          payload: success.data.assignment_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const getSortBySingleAssignmentData = (
  _assignmentId,
  InsID,
  state,
  val
) => {
  return (dispatch) => {
    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.getSortBySingleAssignment
        .replace("__ID__", _assignmentId)
        .replace("__INS__", InsID)
        .replace("__STATE__", state)
        .replace("__VAL__", val),
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.SINGLE_ASSIGNMENT_READ,
          payload: success.data.assignment_data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getSingleAssignmentDataTeacherView = (
  _id,
  insId,
  _assignmentId
) => {
  return (dispatch) => {
    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.getAssignment
        .replace("__ID__", _id)
        .replace("__INS__", insId),
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.SINGLE_ASSIGNMENT_READ_TEACHER_VIEW,
          payload: success.data.assignmentInfo.find(
            (annItem) => annItem._id === _assignmentId
          ),
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const ClassroomBasedAssignment = (insId, classroom, _assignmentId) => {
  return (dispatch) => {
    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.getAssignmentClassroomView
        .replace("__INS__", insId)
        .replace("__ID__", classroom),
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.SINGLE_ASSIGNMENT_READ_TEACHER_VIEW,
          payload: success.data.assignmentInfo.find(
            (annItem) => annItem._id === _assignmentId
          ),
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const SingleAssignmentData = (_assignmentId) => {
  return (dispatch) => {
    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.singleAssignmentData.replace(
        "__ID__",
        _assignmentId
      ),
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.SINGLE_ASSIGNMENT_READ_TEACHER_VIEW,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// export const getSingleAssignmentData = (_assignmentId, InsID) => {
//   return (dispatch) => {
//     AssignmentRequest.get(
//       AssignmentRequest.assignmentsEndpoint.getSingleAssignment
//         .replace("__ASSIGNMENTID__", _assignmentId)
//         .replace("__INSID__", InsID),
//       (success) => {
//         dispatch({
//           type: ASSIGNMENT_TYPE.SINGLE_ASSIGNMENT_READ,
//           payload: success.data.assignment_data,
//         });
//       },
//       (error) => {
//         dispatch(setCommonError(error.message));
//       }
//     );
//   };
// };

// export const getSingleAssignmentDataTeacherView = (
//   _id,
//   insId,
//   _assignmentId
// ) => {
//   return (dispatch) => {
//     AssignmentRequest.get(
//       AssignmentRequest.assignmentsEndpoint.getAssignment
//         .replace("__ID__", _id)
//         .replace("__INS__", insId),
//       (success) => {
//         dispatch({
//           type: ASSIGNMENT_TYPE.SINGLE_ASSIGNMENT_READ_TEACHER_VIEW,
//           payload: success.data.assignmentInfo.find(
//             (annItem) => annItem._id === _assignmentId
//           ),
//         });
//       },
//       (error) => {
//         dispatch(setCommonError(error.message));
//       }
//     );
//   };
// };

/*api of get SubmittedAssigent */
export const getAssignmentDataList = (_id) => {
  return (dispatch) => {
    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.getAssignmentList.replace(
        "__ID__",
        _id
      ),
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_READ,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteAssignmentData = (_id) => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.ASSIGNMENT_DELETE_LOADING,
      payload: {},
    });
    AssignmentRequest.patch(
      AssignmentRequest.assignmentsEndpoint.deleteAssignment.replace(
        "__ID__",
        _id
      ), {},
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_DELETE,
          payload: _id,
        });
        dispatch(showSuccessPopup("Assignment Deleted."));
        if (success.data.status === true) dispatch(removeAssignmentNotification(_id));
      },
      (error) => {
        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_DELETE_ERROR,
          payload: {},
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const updateAssignmentData = (_id, data) => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.ASSIGNMENT_UPDATE_TEACHER_LOADING,
      payload: {},
    });

    AssignmentRequest.patch(
      AssignmentRequest.assignmentsEndpoint.updateAssignment.replace(
        "__ID__",
        _id
      ),
      data,
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_UPDATE_TEACHER,
          payload: success.data,
        });
        dispatch(showSuccessPopup("Assignment Updated."));
        if (success.data.assignmentInfo) dispatch(editAssignmentNotification(success.data));
      },
      (error) => {
        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_UPDATE_TEACHER_ERROR,
          payload: {},
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const selectAssignmentToUpdate = (assignmentID) => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.TEACHER_ASSIGNMENT_UPDATE_SELECTION,
      payload: assignmentID,
    });
  };
};

export const selectAssignmentToUpdateRESET = () => {
  return (dispatch) => {
    dispatch({
      type: ASSIGNMENT_TYPE.TEACHER_ASSIGNMENT_UPDATE_SELECTION_RESET,
      payload: {},
    });
  };
};

// classroom and course filter
export const courseAndClassroomFilter = (userId, InsId, Course, Classroom) => {
  return (dispatch) => {
    AssignmentRequest.get(
      AssignmentRequest.assignmentsEndpoint.assignment_Course_Classroom
        .replace("__USERID__", userId)
        .replace("__INSID__", InsId)
        .replace("__COURSE__", Course)
        .replace("__CLASSROOM__", Classroom),
      (success) => {
        dispatch({
          type: ASSIGNMENT_TYPE.ASSIGNMENT_COURSE_AND_CLASSROOM_FILTER,
          payload: success.data.assignmentInfo,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};



//add assignment notification
const AddAssignmentNotification = (data) => {
  let id = data.assignmentInfo;
  return (dispatch) => {
    AssignmentRequest.post(AssignmentRequest.assignmentsEndpoint.addAssignmentNotification.replace("id", id),
      data, (success) => {
      }, (error) => {
      })
  }
}

//remove assignment notification
const removeAssignmentNotification = (id) => {
  return (dispatch) => {
    AssignmentRequest.post(AssignmentRequest.assignmentsEndpoint.removeAssignmentNotification.replace("id", id),
      (success) => {

      }, (error) => {

      })
  }
}

//edit assignment Notification 
const editAssignmentNotification = (data) => {
  let id = data.assignmentInfo
  return (dispatch) => {
    AssignmentRequest.post(AssignmentRequest.assignmentsEndpoint.editAssignmentNotification.replace("id", id),
      data,
      (success) => {

      }, (error) => {
      })
  }
}

//assign Assignment Notification
const assignAssignmentNotifications = (ID, AID, userID) => {

  return (dispatch) => {
    AssignmentRequest.post(AssignmentRequest.assignmentsEndpoint.assignAssignmentNotification.replace("id", ID).replace("_assign_", AID).replace("_assignBy_", userID),
      (success) => {

      }, (error) => {
      })
  }
}

//grade Assignment Notification
const GradeAssignmentNotification = (id, data) => {

  return (dispatch) => {
    AssignmentRequest.post(AssignmentRequest.assignmentsEndpoint.gradeAssignmentNotification.replace("id", id),
      data,
      (success) => {
      }, (error) => {
      })
  }
}




