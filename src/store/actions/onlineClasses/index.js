import { ONLINE_CLASS_TYPE } from "./actionType";
import OnlineClassRequest from "./OnlineClassRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

// export const postOnlineClasses = (data) => {
//   return (dispatch) => {
//     OnlineClassRequest.post(
//       OnlineClassRequest.OnlineClassEndpoint.postOnlineClasses,
//       data,
//       (success) => {
//         dispatch({
//           type: ONLINE_CLASS_TYPE.ONLINE_CLASS_CREATE,
//           payload: success,
//         });
//         dispatch(showSuccessPopup("Class has been Successfully Schedule."));
//       },
//       (error) => {
//         dispatch(setCommonError(error.message));
//       }
//     );
//   };
// };


export const postOnlineClasses = (data) => {
  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.ONLINE_CLASS_CREATE_LOADING,
      payload: [],
    })
    OnlineClassRequest.post(
      OnlineClassRequest.OnlineClassEndpoint.postOnlineClasses,
      data, (success) => {

        if (success.data.zoomInfoAvailable === false) {

          dispatch({
            type: ONLINE_CLASS_TYPE.ZOOM_VERIFICATION_LOADED,
            payload: true
          })
        } else {
          dispatch({
            type: ONLINE_CLASS_TYPE.ONLINE_CLASS_CREATE_LOADED,
            payload: success
          })
          dispatch(showSuccessPopup("Class has been Successfully Schedule."));
        }

      },
      error => {
        dispatch(setCommonError(error.message))
      });
  }
}
export const postOnlineClassesMeet = (data) => {
  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.ONLINE_CLASS_CREATE_LOADING,
      payload: [],
    })
    OnlineClassRequest.post(
      OnlineClassRequest.OnlineClassEndpoint.postOnlineClassesMeet,
      data, (success) => {
        dispatch({
          type: ONLINE_CLASS_TYPE.ONLINE_CLASS_CREATE_LOADED,
          payload: success
        })
        dispatch(showSuccessPopup("Class has been Successfully Schedule."));
      },
      error => {
        dispatch(setCommonError(error.message))
      });
  }
}


export const editOnlineClass = (data, id, meetingOn) => {
  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.ONLINE_CLASS_EDIT_LOADING,
      payload: [],
    })
    meetingOn === "GoogleMeet" ?
      OnlineClassRequest.post(
        OnlineClassRequest.OnlineClassEndpoint.editOnlineGoogleClassesRequest.replace("__ID__", id),
        data, (success) => {
          dispatch({
            type: ONLINE_CLASS_TYPE.ONLINE_CLASS_EDIT_LOADED,
            payload: success
          })
          dispatch(showSuccessPopup("Class has been Successfully Edited."));
        },
        error => {
          dispatch(setCommonError(error.message))
        }) : OnlineClassRequest.post(
          OnlineClassRequest.OnlineClassEndpoint.editOnlineClassesRequest.replace("__ID__", id),
          data, (success) => {
            dispatch({
              type: ONLINE_CLASS_TYPE.ONLINE_CLASS_EDIT_LOADED,
              payload: success
            })
            dispatch(showSuccessPopup("Class has been Successfully Edited."));
          },
          error => {
            dispatch(setCommonError(error.message))
          });
  }
}
export const resetPostOnlineClasses = () => {
  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.ONLINE_CLASS_CREATE_RESET,
      payload: [],
    })
  }

}
export const resetEditOnlineClasses = () => {
  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.ONLINE_CLASS_EDIT_RESET,
      payload: [],
    })
  }

}
export const resetZoomVerification = () => {
  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.ZOOM_VERIFICATION_RESET,
      payload: [],
    })
  }

}


export const removeOnlineClass = (id) => {
  return (dispatch) => {
    OnlineClassRequest.delete(
      OnlineClassRequest.OnlineClassEndpoint.deleteOnlineClass.replace("__ID__", id),
      (success) => {
        if (success.data.onlineClassInfo) {
          dispatch({
            type: ONLINE_CLASS_TYPE.ONLINE_CLASS_REMOVE_LOADED,
            payload: id
          })
        }
        dispatch(showSuccessPopup("Class has been removed successfully."));
      },
      error => {
        dispatch(setCommonError(error.message))
      });
  }
}
export const resetSingleClass = () => {
  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.ONLINE_CLASS_READSINGLE_RESET,
      payload: [],
    })
  }

}


export const editOnlineClasses = (_id, data) => {
  // return (dispatch) => {
  //   dispatch({
  //     type: ONLINE_CLASS_TYPE.ONLINE_CLASS_EDIT_LOADING,
  //     payload: [],
  //   })
  //   OnlineClassRequest.patch(
  //     OnlineClassRequest.OnlineClassEndpoint.postOnlineClasses.replace(
  //       "__ID__",
  //       _id
  //     ),
  //     data,
  //     (success) => {
  //       dispatch({
  //         type: ONLINE_CLASS_TYPE.ONLINE_CLASS_EDIT,
  //         payload: success,
  //       });
  //       dispatch(showSuccessPopup("Class has been Successfully Edited."));
  //     },
  //     (error) => {
  //       dispatch(setCommonError(error.message));
  //     }
  //   );
  // };
};

export const storeGoogleMeetResData = (data) => {

  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.GOOGLE_MEET_RESPONSE_DATA,
      payload: data.data,
    });
  };
};


export const resetOnlineClasses = () => {
  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.RESET_ONLINE_CLASSES,
      payload: []
    })
  }
}

export const storeGoogleMeetResDataForEdit = (data) => {

  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.GOOGLE_MEET_RESPONSE_DATA_EDIT,
      payload: data,
    });
  };
};

export const getOnlineClasses = (owner, InsId) => {
  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.ONLINE_CLASS_READ_LOADING,
      payload: []
    })
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.getOnlineClasses
        .replace("__Owner__", owner)
        .replace("__INS__", InsId),
      (success) => {
        dispatch({
          type: ONLINE_CLASS_TYPE.ONLINE_CLASS_READ_LOADED,
          payload: success.data.data ? success.data.data : [],
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};



export const getClassroomClasses = (InsId, classroomId, query, value) => {
  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.ONLINE_CLASS_READ_ADMIN_LOADING,
      payload: []
    })
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.getClassroomClasses.replace("__INS__", InsId).replace("__CLASSROOM__", classroomId).replace("__QUERY__", query).replace("__VALUE__", value),
      (success) => {
        dispatch({
          type: ONLINE_CLASS_TYPE.ONLINE_CLASS_READ_ADMIN_LOADED,
          payload: success.data.data ? success.data.data : [],
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};



export const getStudentList = (classId) => {
  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.STUDENT_LIST_LOADING,
      payload: []
    })
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.getOnlineClass.replace("__ID__", classId), (success) => {

        dispatch({
          type: ONLINE_CLASS_TYPE.STUDENT_LIST_LOADED,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getAttendeesList = (classId) => {
  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.ATTENDEES_LIST_LOADING,
      payload: []
    })
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.getOnlineClass.replace("__ID__", classId), (success) => {

        dispatch({
          type: ONLINE_CLASS_TYPE.ATTENDEES_LIST_LOADED,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getOnlineClass = (classId) => {
  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.ONLINE_CLASS_READSINGLE_LOADING,
      payload: []
    })
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.getOnlineClass.replace("__ID__", classId), (success) => {

        dispatch({
          type: ONLINE_CLASS_TYPE.ONLINE_CLASS_READSINGLE_LOADED,
          payload: success.data.data ? success.data.data : [],
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};



export const getStudentOnlineCLasses = (owner, InsId) => {
  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.STUDENT_ONLINE_CLASS_READ_LOADING,
      payload: []
    })
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.getStudentClasses.replace("__INSID__", InsId).replace("__ID__", owner), (success) => {

        dispatch({
          type: ONLINE_CLASS_TYPE.STUDENT_ONLINE_CLASS_READ_LOADED,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
}

// return (dispatch) => {
//   OnlineClassRequest.patch(
//     OnlineClassRequest.OnlineClassEndpoint.postOnlineClasses.replace(
//       "__ID__",
//       _id
//     ),
//     data,
//     (success) => {
//       dispatch({
//         type: ONLINE_CLASS_TYPE.ONLINE_CLASS_EDIT,
//         payload: success,
//       });
//       dispatch(showSuccessPopup("Class has been Successfully Edited."));
//     },
//     (error) => {
//       dispatch(setCommonError(error.message));
//     }
//   );
// };





export const getFilteredClass = (owner, institute, query, value) => {

  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.CLASS_FILTER_LOADING,
      payload: []
    })
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.getFilteredClass.replace("__Owner__", owner).replace("__INS__", institute).replace("__QUERY__", query).replace("__VALUE__", value), (success) => {
        dispatch({
          type: ONLINE_CLASS_TYPE.ONLINE_CLASS_READ_LOADED,
          payload: success.data.data ? success.data.data : [],
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const getCourseClassroomFilterDropdown = (owner, institute, query, value) => {

  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.ONLINE_CLASS_READ_LOADING,
      payload: []
    })
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.course_Classroom.replace("__USERID__", owner).replace("__INSID__", institute).replace("__COURSE__", query).replace("__CLASSROOM__", value), (success) => {
        dispatch({
          type: ONLINE_CLASS_TYPE.ONLINE_CLASS_READ_LOADED,
          payload: success.data.data ? success.data.data : [],
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getSearchFilteredClass = (owner, institute, value) => {

  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.CLASS_FILTER_LOADING,
      payload: []
    })
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.getFilteredClass.replace("__Owner__", owner).replace("__INS__", institute).replace("__QUERY__", "search").replace("__VALUE__", value), (success) => {
        dispatch({
          type: ONLINE_CLASS_TYPE.ONLINE_CLASS_READ_LOADED,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const filterCreatedBy = (userId, InsId, Teachers) => {
  // let formatedTeachers = encodeURIComponent(JSON.stringify(Teachers));
  return (dispatch) => {
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.getCreatedBy
        .replace("__USERID__", userId)
        .replace("__INSID__", InsId)
        .replace("__NAME__", Teachers),
      (success) => {

        dispatch({
          type: ONLINE_CLASS_TYPE.GET_LIST_OF_CREATED_BY,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// sort by recent to old
export const sortByRecentToOld = (userId, InsId) => {
  return (dispatch) => {
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.sortByRTO
        .replace("__USERID__", userId)
        .replace("__INSID__", InsId),
      (success) => {
        dispatch({
          type: ONLINE_CLASS_TYPE.SORT_BY_RTO,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// sort by old to recent
export const sortByOldToRecent = (userId, InsId) => {
  return (dispatch) => {
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.sortByOTR
        .replace("__USERID__", userId)
        .replace("__INSID__", InsId),
      (success) => {
        dispatch({
          type: ONLINE_CLASS_TYPE.SORT_BY_OTR,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// sort by duration High To Low
export const DurationHighToLow = (userId, InsId) => {
  return (dispatch) => {
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.sortDurationHTL
        .replace("__USERID__", userId)
        .replace("__INSID__", InsId),
      (success) => {
        dispatch({
          type: ONLINE_CLASS_TYPE.ONLINE_CLASS_SORT_BY_DHTL,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// sort by duration Low To High
export const DurationLowToHigh = (userId, InsId) => {
  return (dispatch) => {
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.sortDurationLTH
        .replace("__USERID__", userId)
        .replace("__INSID__", InsId),
      (success) => {
        dispatch({
          type: ONLINE_CLASS_TYPE.ONLINE_CLASS_SORT_BY_DLTH,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// sort by meeting Zoom
export const sortByZoom = (userId, InsId) => {
  return (dispatch) => {
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.sortByZoom
        .replace("__USERID__", userId)
        .replace("__INSID__", InsId),
      (success) => {
        dispatch({
          type: ONLINE_CLASS_TYPE.SORT_BY_ZOOM,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// sort by meeting Meet
export const sortByMeet = (userId, InsId) => {
  return (dispatch) => {
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.sortByMeet
        .replace("__USERID__", userId)
        .replace("__INSID__", InsId),
      (success) => {
        dispatch({
          type: ONLINE_CLASS_TYPE.SORT_BY_MEET,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// sort by Attendees High To Low
export const sortByAttendeesHighToLow = (userId, InsId) => {
  return (dispatch) => {
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.sortByAttendeeHTL
        .replace("__USERID__", userId)
        .replace("__INSID__", InsId),
      (success) => {

        dispatch({
          type: ONLINE_CLASS_TYPE.SORT_BY_HTLA,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// sort by Attendees Low to High
export const sortByAttendeesLowToHigh = (userId, InsId) => {
  return (dispatch) => {
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.sortByAttendeeLTH
        .replace("__USERID__", userId)
        .replace("__INSID__", InsId),
      (success) => {

        dispatch({
          type: ONLINE_CLASS_TYPE.SORT_BY_LTHA,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// classroom and course filter
export const courseAndClassroomFilter = (userId, InsId, Course, Classroom) => {
  return (dispatch) => {
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.course_Classroom
        .replace("__USERID__", userId)
        .replace("__INSID__", InsId)
        .replace("__COURSE__", Course)
        .replace("__CLASSROOM__", Classroom),
      (success) => {

        dispatch({
          type: ONLINE_CLASS_TYPE.COURSE_AND_CLASSROOM_FILTER,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const setSelectedOnlineCourse = (CourseData) => {

  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.SET_ONLINE_COURSE,
      payload: CourseData,
    });
  };
};

export const setFilteredTeachers = (selectedTeachers) => {
  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.SET_FILTERED_TEACHERS,
      payload: selectedTeachers,
    });
  };
};

export const setSelectedOnlineClassroom = (selectedclassRoom) => {
  return (dispatch) => {
    dispatch({
      type: ONLINE_CLASS_TYPE.SET_ONLINE_CLASSROOM,
      payload: selectedclassRoom,
    });
  };
};

// Get course and classroom
export const getCourseandClassroom = (InsId) => {
  return (dispatch) => {
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.courseAndClassroom.replace(
        "__INSID__",
        InsId
      ),
      (success) => {
        dispatch({
          type: ONLINE_CLASS_TYPE.COURSE_AND_CLASSROOM,
          payload: success.data.courseData,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// Get classroomCreatedBy
export const classroomCreatedBy = (userId, InsId) => {
  return (dispatch) => {
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.classroom_Assigned
        .replace("__USERID__", userId)
        .replace("__INSID__", InsId),
      (success) => {

        dispatch({
          type: ONLINE_CLASS_TYPE.CLASSROOM_ASSIGNED,
          payload: success.data.teacherList,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const searchClasses = (userId, InsId, Class) => {
  return (dispatch) => {
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.searchClasses
        .replace("__USERID__", userId)
        .replace("__INSID__", InsId)
        .replace("__CLASSNAME__", Class),
      (success) => {

        dispatch({
          type: ONLINE_CLASS_TYPE.SEARCH_CLASS,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteOnlineClasses = (_id) => {
  return (dispatch) => {
    OnlineClassRequest.delete(
      OnlineClassRequest.OnlineClassEndpoint.deleteOnlineClasses.replace(
        "__ID__",
        _id
      ),
      (success) => {

        dispatch({
          type: ONLINE_CLASS_TYPE.ONLINE_CLASS_DELETE,
          payload: success.data.id,
        });
        dispatch(showSuccessPopup("Class has been Successfully Removed."));
        // if (success.data.id) dispatch(DeleteClassNotification(success.data.id));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
// https://api.getmelight.com/meet/classroom?courseId=&classRoomId=&instituteId=
// export const getStudentList = (_courseid, _classroomid, _insid) => {
//   return (dispatch) => {
//     OnlineClassRequest.get(
//       OnlineClassRequest.OnlineClassEndpoint.getStudentList
//         .replace("__COURSEID__", _courseid)
//         .replace("__CLASSROOMID__", _classroomid)
//         .replace("__INSID__", _insid),
//       (success) => {

//         dispatch({
//           type: ONLINE_CLASS_TYPE.ONLINE_CLASS_STUDENT_LIST,
//           payload: success,
//         });
//       },
//       (error) => {
//         dispatch(setCommonError(error.message));
//       }
//     );
//   };
// };

export const submitStudentList = (data) => {
  return (dispatch) => {
    OnlineClassRequest.post(
      OnlineClassRequest.OnlineClassEndpoint.postStudentList,
      data,
      (success) => {

        dispatch({
          type: ONLINE_CLASS_TYPE.POST_ONLINE_CLASS_STUDENT_LIST,
          payload: success,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const classSortByToggleValue = (userId, InsId, sortByValue) => {
  return (dispatch) => {
    OnlineClassRequest.get(
      OnlineClassRequest.OnlineClassEndpoint.sortByToggle
        .replace("__USERID__", userId)
        .replace("__INSID__", InsId)
        .replace("__SORTBY__", sortByValue),
      (success) => {
        dispatch({
          type: ONLINE_CLASS_TYPE.SORT_BY_TOGGLE,
          payload: success.data ? success.data : [],
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const setSelectedStudentData = (data) => {
  return (dispatch) => {
    dispatch({ type: ONLINE_CLASS_TYPE.SET_SELECTED_STUDENT_DATA, payload: data });
  };
};



