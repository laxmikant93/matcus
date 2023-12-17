import { ClassroomDetailActionType } from "./actionType";
import classroomDetailRequest from "./classroomDetailRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const getClassroomViewList = (
  insID,
  CLASSID,
  SWITCH,
  courseId,
  userID,
  owner
) => {
  return (dispatch) => {
    if (SWITCH === "Online Classes") {
      dispatch({
        type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LIST_LOADING,
        payload: [],
      });
      classroomDetailRequest.get(
        classroomDetailRequest.ClassroomDetailEndPoint.getClassroomDetailOnlineClasses
          .replace("__INSID__", insID)
          .replace("__ClassroomId__", CLASSID),
        // .replace("__OWNER__", courseId),
        (success) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LIST_LOADED,
            payload: success.data.data ? success.data.data : [],
          });
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LIST_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    } else if (SWITCH === "Assignments") {
      dispatch({
        type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_LIST_LOADING,
        payload: [],
      });
      classroomDetailRequest.get(
        classroomDetailRequest.ClassroomDetailEndPoint.getClassroomDetailAssignment
          .replace("__INSID__", insID)
          .replace("__ClassroomId__", CLASSID),
        (success) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_LIST_LOADED,
            payload: success.data.assignmentInfo,
          });
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_LIST_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    } else if (SWITCH === "Teachers") {
      dispatch({
        type: ClassroomDetailActionType.CLASSROOM_DETAIL_TEACHER_LIST_LOADING,
        payload: [],
      });
      classroomDetailRequest.get(
        classroomDetailRequest.ClassroomDetailEndPoint.getClassroomDetailTeachers
          .replace("__INSID__", insID)
          .replace("__ClassroomId__", CLASSID).replace('__COURSEID__', courseId),
        (success) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_TEACHER_LIST_LOADED,
            payload: success.data.classassignedcheck
              ? success.data.classassignedcheck.reverse()
              : [],
          });
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_TEACHER_LIST_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    } else if (SWITCH === "Students") {
      dispatch({
        type: ClassroomDetailActionType.CLASSROOM_DETAIL_STUDENT_LIST_LOADING,
        payload: [],
      });
      classroomDetailRequest.get(
        classroomDetailRequest.ClassroomDetailEndPoint.getClassroomDetailStudents
          .replace("__INSID__", insID)
          .replace("__ClassroomId__", CLASSID).replace('__COURSEID__', courseId),
        (success) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_STUDENT_LIST_LOADED,
            payload: success.data.classassignedcheck
              ? success.data.classassignedcheck.reverse()
              : [],
          });
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_STUDENT_LIST_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    } else if (SWITCH === "Courses") {
      dispatch({
        type: ClassroomDetailActionType.CLASSROOM_DETAIL_COURSE_LIST_LOADING,
        payload: [],
      });
      classroomDetailRequest.get(
        classroomDetailRequest.ClassroomDetailEndPoint.getClassroomDetailCourses
          .replace("__INSID__", insID)
          .replace("__CLASSROOMID__", CLASSID)
          .replace("__COURSEID__", courseId),
        (success) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_COURSE_LIST_LOADED,
            payload: success.data.data,
          });
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_COURSE_LIST_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    } else if (SWITCH === "teacherCourses") {
      dispatch({
        type: ClassroomDetailActionType.CLASSROOM_DETAIL_COURSE_LIST_LOADING,
        payload: [],
      });
      classroomDetailRequest.get(
        classroomDetailRequest.ClassroomDetailEndPoint.teacherClassroomCoursesList
          .replace("__INSID__", insID)
          .replace("__USERID__", userID)
          .replace("__CLASSROOMID__", courseId)
          .replace("__SUBJECTID__", CLASSID),
        (success) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_COURSE_LIST_LOADED,
            payload: success.data.data,
          });
        },
        (error) => {
          dispatch(setCommonError(error.message));
        }
      );
    } else if (SWITCH === "Online Test") {
      dispatch({
        type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_TEST_LIST_LOADING,
        payload: [],
      });

      classroomDetailRequest.get(
        classroomDetailRequest.ClassroomDetailEndPoint.getClassroomDetailOnlineTest
          .replace("__INSID__", insID)
          .replace("__ClassroomId__", CLASSID),
        (success) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_TEST_LIST_LOADED,
            payload: success.data.examList
              ? success.data.examList.reverse()
              : [],
          });
        },
        (error) => {
          dispatch(setCommonError(error.message));
        }
      );
    }
  };
};

export const deleteClassroomViewItem = (ID, SWITCH) => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_DELETE_LOADING,
      payload: [],
    });
    if (SWITCH === "Online Classes") {
      classroomDetailRequest.delete(
        classroomDetailRequest.ClassroomDetailEndPoint.deleteClassroomDetailOnlineClasses.replace(
          "__ID__",
          ID
        ),
        (success) => {
          dispatch(showSuccessPopup("Online Class removed"));
          //let data = { ID: ID, Switch: "Online Classes" }
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_DELETE_LOADED,
            payload: { ID: ID, Switch: "Online Classes" },
          });

          if (success.data.id) {
            dispatch(DeleteClassNotification(success.data.id));
          }
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_DELETE_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    } else if (SWITCH === "Assignments") {
      classroomDetailRequest.patch(
        classroomDetailRequest.ClassroomDetailEndPoint.deleteClassroomDetailAssignment.replace(
          "__ID__",
          ID
        ), {},
        (success) => {
          dispatch(showSuccessPopup("Assignment removed"));
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_DELETE_LOADED,
            payload: { ID: ID, Switch: "Assignments" },
          });
          //remove assignment notification
          if (success.data.status === true) {
            dispatch(removeAssignmentNotification(ID));
          }
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_DELETE_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    } else if (SWITCH === "Teachers") {
      classroomDetailRequest.patch(
        classroomDetailRequest.ClassroomDetailEndPoint.deleteClassroomDetailTeachers.replace(
          "__ID__",
          ID
        ), {},
        (success) => {
          dispatch(showSuccessPopup("Teacher removed"));
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_DELETE_LOADED,
            payload: { ID: ID, Switch: "Teachers" },
          });
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_DELETE_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    } else if (SWITCH === "Students") {
      classroomDetailRequest.patch(
        classroomDetailRequest.ClassroomDetailEndPoint.deleteClassroomDetailTeachers.replace(
          "__ID__",
          ID
        ), {},
        (success) => {
          dispatch(showSuccessPopup("Student removed."));
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_DELETE_LOADED,
            payload: { ID: ID, Switch: "Students" },
          });
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_DELETE_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    } else if (SWITCH === "Courses") {
      classroomDetailRequest.delete(
        classroomDetailRequest.ClassroomDetailEndPoint.deleteAdminCourse.replace(
          "__ID__",
          ID
        ),
        (success) => {
          dispatch(showSuccessPopup("Study Material deleted successfully."));
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_DELETE_LOADED,
            payload: { ID: ID, Switch: "Courses" },
          });
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_DELETE_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    } else if (SWITCH === "teacherCourses") {
      classroomDetailRequest.delete(
        classroomDetailRequest.ClassroomDetailEndPoint.deleteAdminCourse.replace(
          "__ID__",
          ID
        ),
        (success) => {
          dispatch(showSuccessPopup("Study Material deleted successfully."));
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_DELETE_LOADED,
            payload: { ID: ID, Switch: "teacherCourses" },
          });
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_DELETE_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    }
  };
};

export const SearchClassroomViewItem = (
  INS,
  SWITCH,
  classId,
  Val,
  userId,
  courseId,

) => {
  return (dispatch) => {
    if (SWITCH === "Online Classes") {
      dispatch({
        type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LIST_LOADING,
        payload: [],
      });
      classroomDetailRequest.get(
        classroomDetailRequest.ClassroomDetailEndPoint.SearchClassroomDetailOnlineClasses.replace(
          "__INS__",
          INS
        )
          .replace("__CLASSID__", classId)
          .replace("__VAL__", Val)
          .replace("__OWNER__", userId),
        (success) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LIST_LOADED,
            payload: success.data.data,
          });
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LIST_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    } else if (SWITCH === "Assignments") {
      dispatch({
        type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_LIST_LOADING,
        payload: [],
      });
      classroomDetailRequest.get(
        classroomDetailRequest.ClassroomDetailEndPoint.SearchClassroomDetailAssignment.replace(
          "__INS__",
          INS
        )
          .replace("__CLASSID__", classId)
          .replace("__VAL__", Val),
        (success) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_LIST_LOADED,
            payload: success.data.assignmentInfo,
          });
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_LIST_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    } else if (SWITCH === "Teachers") {
      dispatch({
        type: ClassroomDetailActionType.CLASSROOM_DETAIL_TEACHER_LIST_LOADING,
        payload: [],
      });
      classroomDetailRequest.get(
        classroomDetailRequest.ClassroomDetailEndPoint.SearchClassroomDetailTeachers.replace(
          "__INS__",
          INS
        )
          .replace("__CLASSID__", classId)
          .replace("__COURSEID__", userId)
          .replace("__VAL__", Val),
        (success) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_TEACHER_LIST_LOADED,
            payload: success.data.classassignedcheck,
          });
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_TEACHER_LIST_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    } else if (SWITCH === "Students") {
      dispatch({
        type: ClassroomDetailActionType.CLASSROOM_DETAIL_STUDENT_LIST_LOADING,
        payload: [],
      });
      classroomDetailRequest.get(
        classroomDetailRequest.ClassroomDetailEndPoint.SearchClassroomDetailStudents.replace(
          "__INS__",
          INS
        )
          .replace("__CLASSID__", classId)
          .replace("__COURSEID__", userId)
          .replace("__VAL__", Val),
        (success) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_STUDENT_LIST_LOADED,
            payload: success.data.classassignedcheck,
          });
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_STUDENT_LIST_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    } else if (SWITCH === "Online Test") {
      dispatch({
        type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_TEST_LIST_LOADING,
        payload: [],
      });
      classroomDetailRequest.get(
        classroomDetailRequest.ClassroomDetailEndPoint.SearchClassroomDetailOnlineTest.replace(
          "__INS__",
          INS
        )
          .replace("__CLASSID__", classId)
          .replace("__VAL__", Val),
        (success) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_TEST_LIST_LOADED,
            payload: success.data.examList,
          });
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_TEST_LIST_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    }
  };
};

export const ClassroomIDFetch = (classId, state) => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_CLASSROOM_ID_LOADING,
      payload: [],
    });
    if (state) {
      classroomDetailRequest.get(
        classroomDetailRequest.ClassroomDetailEndPoint.getTeacherCourseData.replace(
          "__ID__",
          classId
        ),
        (success) => {
         let courseData= success.data.course.find((item)=>item._id===state)
          
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_CLASSROOM_ID_LOADED,
            payload:courseData,
          });
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_CLASSROOM_ID_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    } else {
      classroomDetailRequest.get(
        classroomDetailRequest.ClassroomDetailEndPoint.ClassroomDetailIdGet.replace(
          "__CLASSID__",
          classId
        ),
        (success) => {
          let data = success.data.data
          let payloadData = {
            data_classroomInfo: data.classroomInfo._id,
            data_classroomInfo___v: data.classroomInfo._v,
            data_classroomInfo_classroomname: data.classroomInfo.classroomname,
            data_classroomInfo_course: data.courseInfo._id,
            data_classroomInfo_createdAt: data.classroomInfo.createdAt,
            data_classroomInfo_institute: data.classroomInfo.institute,
            data_classroomInfo_isDeleted: data.classroomInfo.isDeleted,
            data_classroomInfo_owner: data.classroomInfo.owner,
            data_classroomInfo_updatedAt: data.classroomInfo.updatedAt,
            data_courseInfo: data.courseInfo._id,
            data_courseInfo___v: data.courseInfo._v,
            data_courseInfo_coursename: data.courseInfo.coursename,
            data_courseInfo_createdAt: data.courseInfo.createdAt,
            data_courseInfo_institute: data.courseInfo.institute,
            data_courseInfo_isDeleted: data.courseInfo.isDeleted,
            data_courseInfo_owner: data.courseInfo.owner,
            data_courseInfo_updatedAt: data.courseInfo.updatedAt,
            status: true
          }
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_CLASSROOM_ID_LOADED,
            payload: payloadData,
          });
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_CLASSROOM_ID_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    }

  };
};
export const AddTeacherClassroom = (data, ToggleValue) => {
  return (dispatch) => {
    if (ToggleValue === "Teachers") {
      dispatch({
        type: ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_TEACHER_LOADING,
        payload: [],
      });

      classroomDetailRequest.post(
        classroomDetailRequest.ClassroomDetailEndPoint.Addteacher,
        data,
        (success) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_TEACHER_LOADED,
            payload: success.data,
          });
          dispatch(showSuccessPopup("Teacher Added Successfully."));
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_TEACHER_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    } else {
      dispatch({
        type: ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_TEACHER_LOADING,
        payload: [],
      });

      classroomDetailRequest.post(
        classroomDetailRequest.ClassroomDetailEndPoint.Addteacher,
        data,
        (success) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_TEACHER_LOADED,
            payload: success.data,
          });
          dispatch(showSuccessPopup("Student Added Successfully."));
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_TEACHER_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    }
  };
};

// export const AddTeacherClassroom = (data) => {
//   return (dispatch) => {
//     dispatch({
//       type: ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_TEACHER_LOADING,
//       payload: [],
//     });

//     classroomDetailRequest.post(
//       classroomDetailRequest.ClassroomDetailEndPoint.Addteacher,
//       data,
//       (success) => {
//         dispatch({
//           type: ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_TEACHER_LOADED,
//           payload: success.data,
//         });
//         dispatch(showSuccessPopup("Teacher Added Successfully."));
//       },
//       (error) => {
//         dispatch({
//           type: ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_TEACHER_ERROR,
//           payload: [],
//         });
//         dispatch(setCommonError(error.message));
//       }
//     );
//   };
// };

export const TeacherAssignmentAssignToUpdate = (data, AID, ID, userID) => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGN_TO_UPDATE_LOADING,
      payload: [],
    });

    classroomDetailRequest.patch(
      classroomDetailRequest.ClassroomDetailEndPoint.AssignmentUpdateAssign.replace(
        "__AssignID__",
        AID
      )
        .replace("__ID__", ID)
        .replace("__USERID__", userID),
      data,
      (success) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGN_TO_UPDATE_LOADED,
          payload: success.data,
        });
        dispatch(showSuccessPopup("Updated Successfully."));
        dispatch(assignAssignmentNotifications(ID, AID, userID)); //Assign Assignment Notification
      },
      (error) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGN_TO_UPDATE_ERROR,
          payload: [],
        });
        dispatch(setCommonError(error.message));
      }
    );

    // classroomDetailRequest.patch(
    //   classroomDetailRequest.ClassroomDetailEndPoint.AssignmentUpdateAssign.replace(
    //     "__AssignID__",
    //     AID
    //   )
    //     .replace("__ID__", ID)
    //     .replace("__USERID__", userID),
    //   data,
    //   (success) => {
    //     dispatch({
    //       type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGN_TO_UPDATE_LOADED,
    //       payload: success.data,
    //     });
    //     dispatch(showSuccessPopup("Updated Successfully."));
    //   },
    //   (error) => {
    //     dispatch({
    //       type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGN_TO_UPDATE_ERROR,
    //       payload: [],
    //     });
    //     dispatch(setCommonError(error.message));
    //   }
    // );
  };
};
export const OnlineClassesAssignToUpdate = (data, AID, ID, userID) => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.ONLINE_CLASSROOM_ASSIGN_TO_UPDATE_LOADING,
      payload: [],
    });

    classroomDetailRequest.patch(
      classroomDetailRequest.ClassroomDetailEndPoint.OnlineClassesUpdateAssign.replace(
        "__AssignID__",
        AID
      )
        .replace("__ID__", ID)
        .replace("__USERID__", userID),
      data,
      (success) => {
        dispatch({
          type: ClassroomDetailActionType.ONLINE_CLASSROOM_ASSIGN_TO_UPDATE_LOADED,
          payload: success.data,
        });
        dispatch(showSuccessPopup("Updated Successfully."));
        success.data.data_assignBy &&
          dispatch(assignToteacherNotification(success.data));
      },
      (error) => {
        dispatch({
          type: ClassroomDetailActionType.ONLINE_CLASSROOM_ASSIGN_TO_UPDATE_ERROR,
          payload: [],
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const UpdateAssigmentClassroom = (data, ID) => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_UPDATE_ASSIGNMENT_LOADING,
      payload: [],
    });

    classroomDetailRequest.patch(
      classroomDetailRequest.ClassroomDetailEndPoint.UpdateAssignment.replace(
        "__ID__",
        ID
      ),
      data,
      (success) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_UPDATE_ASSIGNMENT_LOADED,
          payload: success.data,
        });
        dispatch(showSuccessPopup("Assignment Updated Successfully."));
        if (success.data.assignmentInfo) {
          dispatch(editAssignmentNotification(success.data.assignmentInfo));
        }
      },
      (error) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_UPDATE_ASSIGNMENT_ERROR,
          payload: [],
        });
        dispatch(setCommonError(error.message));
      }
    );

    // classroomDetailRequest.patch(
    //   classroomDetailRequest.ClassroomDetailEndPoint.UpdateAssignment.replace(
    //     "__ID__",
    //     ID
    //   ),
    //   data,
    //   (success) => {
    //     dispatch({
    //       type: ClassroomDetailActionType.CLASSROOM_DETAIL_UPDATE_ASSIGNMENT_LOADED,
    //       payload: success.data,
    //     });
    //     dispatch(showSuccessPopup("Assignment Updated Successfully."));
    //   },
    //   (error) => {
    //     dispatch({
    //       type: ClassroomDetailActionType.CLASSROOM_DETAIL_UPDATE_ASSIGNMENT_ERROR,
    //       payload: [],
    //     });
    //     dispatch(setCommonError(error.message));
    //   }
    // );
  };
};
export const SortTeacherClassroom = (INS, CLASS, State, Val, kind, courseId) => {
  if (kind === "teacher") {
    return (dispatch) => {
      dispatch({
        type: ClassroomDetailActionType.CLASSROOM_DETAIL_SORT_TEACHER_LOADING,
        payload: [],
      });

      classroomDetailRequest.get(
        classroomDetailRequest.ClassroomDetailEndPoint.getSortTeacherClassroom
          .replace("__INS__", INS)
          .replace("__CLASSROOM__", CLASS)
          .replace("__STATE__", State)
          .replace("__VAL__", Val)
          .replace("__KIND__", kind)
          .replace("__COURSEID__", courseId),
        (success) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_SORT_TEACHER_LOADED,
            payload: success.data.classassignedcheck,
          });
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_SORT_TEACHER_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    };
  } else {
    return (dispatch) => {
      dispatch({
        type: ClassroomDetailActionType.CLASSROOM_DETAIL_STUDENT_LIST_LOADING,
        payload: [],
      });

      classroomDetailRequest.get(
        classroomDetailRequest.ClassroomDetailEndPoint.getSortTeacherClassroom
          .replace("__INS__", INS)
          .replace("__CLASSROOM__", CLASS)
          .replace("__STATE__", State)
          .replace("__VAL__", Val)
          .replace("__KIND__", kind)
          .replace("__COURSEID__", courseId),
        (success) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_STUDENT_LIST_LOADED,
            payload: success.data.classassignedcheck,
          });
        },
        (error) => {
          dispatch({
            type: ClassroomDetailActionType.CLASSROOM_DETAIL_STUDENT_LIST_ERROR,
            payload: [],
          });
          dispatch(setCommonError(error.message));
        }
      );
    };
  }
};

export const SortAssignmentClassroom = (INS, CLASS, State, Val) => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_LIST_LOADING,
      payload: [],
    });

    classroomDetailRequest.get(
      classroomDetailRequest.ClassroomDetailEndPoint.getSortAssignmentClassroom
        .replace("__INS__", INS)
        .replace("__CLASSROOM__", CLASS)
        .replace("__STATE__", State)
        .replace("__VAL__", Val),
      (success) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_LIST_LOADED,
          payload: success.data.assignmentInfo,
        });
      },
      (error) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_LIST_ERROR,
          payload: [],
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const SortCoursesAdminClassroom = (
  INS,
  courseId,
  classroomId,
  State,
  Val
) => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_COURSE_LIST_LOADING,
      payload: [],
    });
    classroomDetailRequest.get(
      classroomDetailRequest.ClassroomDetailEndPoint.sortBycoursesAdminClassroom
        .replace("__INSID__", INS)
        .replace("__COURSEID__", courseId)
        .replace("__CLASSROOMID__", classroomId)
        .replace("__QUERY__", State)
        .replace("__VALUE__", Val),
      (success) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_COURSE_LIST_LOADED,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_COURSE_LIST_ERROR,
          payload: [],
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const createdByAssignToCoursesAdminClassroom = (
  INS,
  courseId,
  classroomId,
  State,
  val
) => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_COURSE_LIST_LOADING,
      payload: [],
    });
    classroomDetailRequest.get(
      classroomDetailRequest.ClassroomDetailEndPoint.createdByAssignToCourses
        .replace("__INSID__", INS)
        .replace("__COURSEID__", courseId)
        .replace("__CLASSROOMID__", classroomId)
        .replace("__QUERYY__", State)
        .replace("__VAL__", val),
      (success) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_COURSE_LIST_LOADED,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_COURSE_LIST_ERROR,
          payload: [],
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const MultiSelectAssignmentClassroomFilter = (
  INS,
  CLASS,
  State,
  Val
) => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_LIST_LOADING,
      payload: [],
    });

    classroomDetailRequest.get(
      classroomDetailRequest.ClassroomDetailEndPoint.getMultiSelectSortAssignmentClassroom
        .replace("__INS__", INS)
        .replace("__CLASSROOM__", CLASS)
        .replace("__STATE__", State)
        .replace("__VAL__", Val),
      (success) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_LIST_LOADED,
          payload: success.data.assignmentInfo,
        });
      },
      (error) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_LIST_ERROR,
          payload: [],
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const MultiSelectOnlineTestClassroomFilter = (
  INS,
  CLASS,
  State,
  Val
) => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LIST_LOADING,
      payload: [],
    });

    classroomDetailRequest.get(
      classroomDetailRequest.ClassroomDetailEndPoint.getMultiSelectOnlineClassesClassroom
        .replace("__INS__", INS)
        .replace("__CLASSROOM__", CLASS)
        .replace("__STATE__", State)
        .replace("__VAL__", Val),
      (success) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LIST_LOADED,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LIST_ERROR,
          payload: [],
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const SortOnlineTestClassroom = (INS, CLASS, State, Val) => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LIST_LOADING,
      payload: [],
    });

    classroomDetailRequest.get(
      classroomDetailRequest.ClassroomDetailEndPoint.getSortOnlineClassesClassroom2
        .replace("__INS__", INS)
        .replace("__CLASSROOM__", CLASS)
        .replace("__STATE__", State)
        .replace("__VAL__", Val)
      ,
      (success) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LIST_LOADED,
          payload: success.data.data ? success.data.data : [],
        });
      },
      (error) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LIST_ERROR,
          payload: [],
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const SortOnlineClassClassroom = (INS, CLASS, State, Val, owner) => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LIST_LOADING,
      payload: [],
    });

    classroomDetailRequest.get(
      classroomDetailRequest.ClassroomDetailEndPoint.getSortOnlineClassesClassroom
        .replace("__INS__", INS)
        .replace("__CLASSROOM__", CLASS)
        .replace("__STATE__", State)
        .replace("__VAL__", Val)
        .replace("__OWNER__", owner),
      (success) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LIST_LOADED,
          payload: success.data.data ? success.data.data : [],
        });
      },
      (error) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LIST_ERROR,
          payload: [],
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const getAssignmentTeacherClassroom = (INS, CLASS) => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_TEACHER_LIST_LOADING,
      payload: [],
    });

    classroomDetailRequest.get(
      classroomDetailRequest.ClassroomDetailEndPoint.getAllTeacherDetail
        .replace("__INSID__", INS)
        .replace("__ClassroomId__", CLASS),
      (success) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_TEACHER_LIST_LOADED,
          payload: success.data.classassignedcheck,
        });
      },
      (error) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_TEACHER_LIST_ERROR,
          payload: [],
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const postOnlineClassroomClasses = (data) => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_CLASS_LOADING,
      payload: [],
    });
  };
};

export const resetTeacherDatalist = () => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_TEACHER_LIST_RESET,
      payload: [],
    });
  };
};

export const AddAssignementClassroom = (data, fullname) => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_ASSIGNMENT_LOADING,
      payload: [],
    });
    classroomDetailRequest.post(
      classroomDetailRequest.ClassroomDetailEndPoint.postAssignment,
      data,
      (success) => {
        let data = () => {
          return {
            classroom: success.data.assignmentInfo.classroom,
            course: success.data.assignmentInfo.course,
            courseInfo_coursename:
              success.data.assignmentInfo.courseDetail.coursename,
            classroomInfo_classroomname:
              success.data.assignmentInfo.classroomDetail.classroomname,
            title: success.data.assignmentInfo.title,
            _id: success.data.assignmentInfo,
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
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_ASSIGNMENT_LOADED,
          payload: data(),
        });
        dispatch(showSuccessPopup("Assignment Created."));
        success.data.assignmentInfo &&
          dispatch(AddAssignmentNotification(success.data));
      },
      (error) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_ASSIGNMENT_ERROR,
          payload: [],
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const AssignmentUpdateSelection = (_id) => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_SELECTION_LOADING,
      payload: [],
    });
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_SELECTION_LOADED,
      payload: _id,
    });
  };
};
export const UpdateAssignmentSelectionClear = () => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_ASSIGNMENT_SELECTION_RESET,
      payload: [],
    });
  };
};
export const AddTeacherReset = () => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_TEACHER_RESET,
      payload: [],
    });
  };
};
export const UpdateAssignmentClear = () => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_UPDATE_ASSIGNMENT_RESET,
      payload: [],
    });
  };
};
export const AddAssignmentClear = () => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_ADD_ASSIGNMENT_RESET,
      payload: [],
    });
  };
};

export const classSortByToggleValueFromAdmin = (userId, InsId, sortByValue) => {
  return (dispatch) => {
    classroomDetailRequest.get(
      classroomDetailRequest.ClassroomDetailEndPoint.sortByToggleClass
        .replace("__USERID__", userId)
        .replace("__INSID__", InsId)
        .replace("__SORTBY__", sortByValue),
      (success) => {
        dispatch({
          type: ClassroomDetailActionType.SORT_BY_TOGGLE,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const SortOnlineTest = (INS, CLASS, State, Val) => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_TEST_LIST_LOADING,
      payload: [],
    });

    classroomDetailRequest.get(
      classroomDetailRequest.ClassroomDetailEndPoint.getSortOnlineTest
        .replace("__INS__", INS)
        .replace("__CLASSROOM__", CLASS)
        .replace("__STATE__", State)
        .replace("__VAL__", Val),
      (success) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_TEST_LIST_LOADED,
          payload: success.data.examList,
        });
      },
      (error) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_TEST_LIST_ERROR,
          payload: [],
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const MultiSelectOnlineTestFilter = (INS, CLASS, State, Val) => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_TEST_LIST_LOADING,
      payload: [],
    });

    classroomDetailRequest.get(
      classroomDetailRequest.ClassroomDetailEndPoint.getMultiSelectSortOnlineTestClassroom
        .replace("__INS__", INS)
        .replace("__CLASSID__", CLASS)
        .replace("__STATE__", State)
        .replace("__VAL__", Val),
      (success) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_TEST_LIST_LOADED,
          payload: success.data.examList ? success.data.examList.reverse() : [],
        });
      },
      (error) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_ONLINE_TEST_LIST_ERROR,
          payload: [],
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const OnlineTestAssignToUpdate = (ID, data) => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.ONLINE_TEST_ASSIGN_TO_UPDATE_LOADING,
      payload: [],
    });

    classroomDetailRequest.patch(
      classroomDetailRequest.ClassroomDetailEndPoint.OnlineTestUpdateAssign.replace(
        "__ID__",
        ID
      ),
      data,
      (success) => {
        dispatch({
          type: ClassroomDetailActionType.ONLINE_TEST_ASSIGN_TO_UPDATE_LOADED,
          payload: success.data.updatedData,
        });
        dispatch(showSuccessPopup("Updated Successfully."));
      },
      (error) => {
        dispatch({
          type: ClassroomDetailActionType.ONLINE_TEST_ASSIGN_TO_UPDATE_ERROR,
          payload: [],
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const notifyAdminExam = (id, data) => {
  return (dispatch) => {
    classroomDetailRequest.patch(
      classroomDetailRequest.ClassroomDetailEndPoint.notifyOnlineAdminExam.replace(
        "__ID__",
        id
      ),
      data,
      (success) => {
        dispatch({
          type: ClassroomDetailActionType.ONLINE_TEST_NOTIFY,
          payload: success.data.resp,
        });
        dispatch(showSuccessPopup("Exam notified successfully."));
      },
      (error) => {
        // dispatch(setCommonError(error.message));
      }
    );
  };
};

export const cancelAdminExam = (id, data) => {
  return (dispatch) => {
    classroomDetailRequest.patch(
      classroomDetailRequest.ClassroomDetailEndPoint.cancelOnlineAdminExam.replace(
        "__ID__",
        id
      ),
      data,
      (success) => {
        dispatch({
          type: ClassroomDetailActionType.ONLINE_TEST_CANCEL,
          payload: success.data.response,
        });
        dispatch(showSuccessPopup("Exam canceled successfully."));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteAdminExam = (id) => {
  return (dispatch) => {
    classroomDetailRequest.delete(
      classroomDetailRequest.ClassroomDetailEndPoint.deleteOnlineAdminExam.replace(
        "__ID__",
        id
      ),
      (success) => {
        dispatch({
          type: ClassroomDetailActionType.ONLINE_TEST_DELETE,
          payload: id,
        });
        dispatch(showSuccessPopup("Exam deleted successfully."));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

//cancel online class Notification

const DeleteClassNotification = (id) => {
  let data = "";
  return (dispatch) => {
    classroomDetailRequest.post(
      classroomDetailRequest.ClassroomDetailEndPoint.cancelClassNotification.replace(
        "id",
        id
      ),
      data,
      (success) => { },
      (error) => { }
    );
  };
};

//add assignment notification
const AddAssignmentNotification = (data) => {
  let id = data.assignmentInfo;
  return (dispatch) => {
    classroomDetailRequest.post(
      classroomDetailRequest.ClassroomDetailEndPoint.addAssignmentNotification.replace(
        "id",
        id
      ),
      data,
      (success) => { },
      (error) => { }
    );
  };
};

//remove assignment notification
const removeAssignmentNotification = (id) => {
  let data = "";
  return (dispatch) => {
    classroomDetailRequest.post(
      classroomDetailRequest.ClassroomDetailEndPoint.removeAssignmentNotification.replace(
        "id",
        id
      ),
      data,
      (success) => { },
      (error) => { }
    );
  };
};

//edit assignment Notification
const editAssignmentNotification = (data) => {
  let id = data.assignmentInfo;
  return (dispatch) => {
    classroomDetailRequest.post(
      classroomDetailRequest.ClassroomDetailEndPoint.editAssignmentNotification.replace(
        "id",
        id
      ),
      data,
      (success) => { },
      (error) => {
      }
    );
  };
};

//assign Assignment Notification
const assignAssignmentNotifications = (ID, AID, userID) => {
  return (dispatch) => {
    classroomDetailRequest.post(
      classroomDetailRequest.ClassroomDetailEndPoint.assignAssignmentNotification
        .replace("id", ID)
        .replace("_assign_", AID)
        .replace("_assignBy_", userID),
      (success) => { },
      (error) => { }
    );
  };
};

const assignToteacherNotification = (data) => {
  let id = data.data_assignBy;
  return (dispatch) => {
    classroomDetailRequest.post(
      classroomDetailRequest.ClassroomDetailEndPoint.assignToTeacherNotification.replace(
        "id",
        id
      ),
      data,
      (success) => { },
      (error) => { }
    );
  };
};
export const resetClassroomDetails = () => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAILS_RESET,
      payload: [],
    });
  };
};

// export const getTeacherClassroomCourses = (
//   insId,
//   userId,
//   classroomId,
//   subjectId
// ) => {
//   return (dispatch) => {
//     dispatch({
//       type: ClassroomDetailActionType.CLASSROOM_DETAIL_LIST_LOADING,
//       loading: true,
//     });
//     classroomDetailRequest.get(
//       classroomDetailRequest.ClassroomDetailEndPoint.teacherClassroomCoursesList
//         .replace("__INSID__", insId)
//         .replace("__USERID__", userId)
//         .replace("__CLASSROOMID__", classroomId)
//         .replace("__SUBJECTID__", subjectId),
//       (success) => {
//         dispatch({
//           type: ClassroomDetailActionType.CLASSROOM_DETAIL_LIST_LOADED,
//           payload: success.data.data,
//         });
//       },
//       (error) => {
//         dispatch(setCommonError(error.message));
//       }
//     );
//   };
// };

export const sortFilterTeacherCoursesClassroom = (
  insId,
  userId,
  courseId,
  classroomId,
  state,
  val
) => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_LIST_LOADING,
      payload: [],
    });
    classroomDetailRequest.get(
      classroomDetailRequest.ClassroomDetailEndPoint.searchSortTeacherClassroomCoursesList
        .replace("__INSID__", insId)
        .replace("__USERID__", userId)
        .replace("__CLASSROOMID__", courseId)
        .replace("__SUBJECTID__", classroomId)
        .replace("__QUERY__", state)
        .replace("__VALUE__", val),
      (success) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_LIST_LOADED,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_LIST_ERROR,
          payload: [],
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const createdByFilterTeacherCoursesClassroom = (
  insId,
  userId,
  courseId,
  classroomId,
  state,
  val
) => {
  return (dispatch) => {
    dispatch({
      type: ClassroomDetailActionType.CLASSROOM_DETAIL_LIST_LOADING,
      payload: [],
    });
    classroomDetailRequest.get(
      classroomDetailRequest.ClassroomDetailEndPoint.createdByFilterTeacherClassroomCoursesList
        .replace("__INSID__", insId)
        .replace("__USERID__", userId)
        .replace("__CLASSROOMID__", courseId)
        .replace("__SUBJECTID__", classroomId)
        .replace("__QUERY__", state)
        .replace("__VALUES__", val),
      (success) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_LIST_LOADED,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch({
          type: ClassroomDetailActionType.CLASSROOM_DETAIL_LIST_ERROR,
          payload: [],
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};
