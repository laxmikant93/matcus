import { USERINFOTYPES } from "./actionType";
import { setCommonError } from "../commonerror";
import UserInfoRequest from "./UserInfoRequest";
import { showSuccessPopup } from "../successmessagepopup";

export const getFacultyUserInfoData = (id, role, kind, limit, skip) => {
  return (dispatch) => {

    dispatch({
      type: USERINFOTYPES.GET_USER_LOADING,
      loading: true,
    });

    UserInfoRequest.get(
      UserInfoRequest.userinforequest.userInfo
        .replace("__Id__", id)
        .replace("__Role__", role).replace("__KIND__", kind).replace("__LIMIT__", limit).replace("__SKIP__", skip),
      (success) => {
        dispatch({
          type: USERINFOTYPES.GET_USER_INFO,
          payload: success.data && success.data.TotalListData ? success.data.TotalListData : [],
        });
        dispatch({
          type: USERINFOTYPES.STUDENT_LIST_TOTAL_UPDATE,
          payload: success.data.total,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const teacherListInfinityScroll = (id, role, kind, limit, skip) => {
  return (dispatch) => {

    dispatch({
      type: USERINFOTYPES.TEACHER_LIST_INFINITY_SCROLL_LOADING,
    });

    UserInfoRequest.get(
      UserInfoRequest.userinforequest.userInfo
        .replace("__Id__", id)
        .replace("__Role__", role).replace("__KIND__", kind).replace("__LIMIT__", limit).replace("__SKIP__", skip),
      (success) => {
        dispatch({
          type: USERINFOTYPES.TEACHER_LIST_INFINITY_SCROLL_LOADED,
          payload: success.data.TotalListData,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const searchFacultyUserInfoData = (id, role, kind, value, limit, skip) => {
  return (dispatch) => {

    dispatch({
      type: USERINFOTYPES.GET_USER_LOADING,
      loading: true,
    });
    UserInfoRequest.get(
      UserInfoRequest.userinforequest.searchUserInfo
        .replace("__Id__", id)
        .replace("__Role__", role).replace("__KIND__", kind).replace("__SEARCH__", value).replace("__LIMIT__", limit).replace("__SKIP__", skip),
      (success) => {
        dispatch({
          type: USERINFOTYPES.SEARCH_FACULTY_USER_INFO_DATA,
          payload: success.data.TotalListData,
        });
        dispatch({
          type: USERINFOTYPES.STUDENT_LIST_TOTAL_UPDATE,
          payload: success.data.total,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};


export const getFacultySortingList = (_id, roleid, status, kind, limit, skip) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.GET_USER_LOADING,
      loading: true,
    })
    UserInfoRequest.get(
      UserInfoRequest.userinforequest.sortTeacherList.replace("__ID__", _id)
        .replace("__ROLEID__", roleid)
        .replace("__STATUS__", status)
        .replace("__KIND__", kind).replace("__LIMIT__", limit).replace("__SKIP__", skip),
      (success) => {
        dispatch({
          type: USERINFOTYPES.USER_SORT_TEACHERLIST,
          payload: success.data.TotalListData,
        })
        dispatch({
          type: USERINFOTYPES.STUDENT_LIST_TOTAL_UPDATE,
          payload: success.data.total,
        });
      }, (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}
export const getNotLoggedData = (_id, roleid, kind) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.GET_USER_LOADING,
      loading: true,
    })
    UserInfoRequest.get(
      UserInfoRequest.userinforequest.getNotLoggedTeacherData.replace("__ID__", _id)
        .replace("__ROLEID__", roleid).replace("__KIND__", kind),
      (success) => {
        dispatch({
          type: USERINFOTYPES.GET_NOT_LOGGED_LIST,
          payload: success.data.TotalListData,
        })
        dispatch({
          type: USERINFOTYPES.STUDENT_LIST_TOTAL_UPDATE,
          payload: success.data.total,
        });
      }, (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}
export const getStudentUserInfoData = (id, role, kind, limit, skip, industry) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.USER_LOADING_STUDENT,
      loading: true,
    });
    UserInfoRequest.get(
      UserInfoRequest.userinforequest.userInfo
        .replace("__Id__", id)
        .replace("__Role__", role).replace("__KIND__", kind).replace("__LIMIT__", limit).replace("__SKIP__", skip),
      (success) => {
        dispatch({
          type: USERINFOTYPES.GET_USER_INFO_STUDENT,
          payload: success.data.TotalListData,
        });
        dispatch({
          type: USERINFOTYPES.STUDENT_LIST_TOTAL_UPDATE,
          payload: success.data.total,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const studentListInfinityScroll = (id, role, kind, limit, skip) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.STUDENT_LIST_INFINITY_SCROLL_LOADING,
      payload: []
    });
    UserInfoRequest.get(
      UserInfoRequest.userinforequest.userInfo
        .replace("__Id__", id)
        .replace("__Role__", role).replace("__KIND__", kind).replace("__LIMIT__", limit).replace("__SKIP__", skip),
      (success) => {
        dispatch({
          type: USERINFOTYPES.STUDENT_LIST_INFINITY_SCROLL_LOADED,
          payload: success.data.TotalListData,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const studentListSearchInfinityScroll = (id, role, kind, value, limit, skip) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.STUDENT_LIST_INFINITY_SCROLL_LOADING,
      payload: []
    });
    UserInfoRequest.get(
      UserInfoRequest.userinforequest.searchUserInfo.replace("__Id__", id)
        .replace("__Role__", role).replace("__KIND__", kind).replace("__SEARCH__", value).replace("__LIMIT__", limit).replace("__SKIP__", skip),
      (success) => {
        dispatch({
          type: USERINFOTYPES.STUDENT_LIST_INFINITY_SCROLL_LOADED,
          payload: success.data.TotalListData,
        })
      }, (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  };
};
export const TeacherListSearchInfinityScroll = (id, role, kind, value, limit, skip) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.TEACHER_LIST_INFINITY_SCROLL_LOADING,
      payload: []
    });
    UserInfoRequest.get(
      UserInfoRequest.userinforequest.searchUserInfo
        .replace("__Id__", id)
        .replace("__Role__", role).replace("__KIND__", kind).replace("__SEARCH__", value).replace("__LIMIT__", limit).replace("__SKIP__", skip),
      (success) => {
        dispatch({
          type: USERINFOTYPES.TEACHER_LIST_INFINITY_SCROLL_LOADED,
          payload: success.data.TotalListData,
        });
        dispatch({
          type: USERINFOTYPES.STUDENT_LIST_TOTAL_UPDATE,
          payload: success.data.total,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const TeacherListFilterInfinityScroll = (id, role, kind, value, limit, skip) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.STUDENT_LIST_INFINITY_SCROLL_LOADING,
      payload: []
    });
    UserInfoRequest.get(
      UserInfoRequest.userinforequest.sortTeacherList.replace("__ID__", id)
        .replace("__ROLEID__", role)
        .replace("__STATUS__", value)
        .replace("__KIND__", kind).replace("__LIMIT__", limit).replace("__SKIP__", skip),
      (success) => {
        dispatch({
          type: USERINFOTYPES.TEACHER_LIST_INFINITY_SCROLL_LOADED,
          payload: success.data.TotalListData,
        })
      }, (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  };
};

export const studentListFilterInfinityScroll = (id, role, kind, value, limit, skip) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.STUDENT_LIST_INFINITY_SCROLL_LOADING,
      payload: []
    });
    UserInfoRequest.get(
      UserInfoRequest.userinforequest.sortTeacherList.replace("__ID__", id)
        .replace("__ROLEID__", role)
        .replace("__STATUS__", value).replace("__KIND__", kind).replace("__LIMIT__", limit).replace("__SKIP__", skip),
      (success) => {
        dispatch({
          type: USERINFOTYPES.STUDENT_LIST_INFINITY_SCROLL_LOADED,
          payload: success.data.TotalListData,
        })

      }, (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  };
};

export const getStudentSortingList = (_id, roleid, status, kind, limit, skip) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.USER_LOADING_STUDENT,
      loading: true,
    })
    UserInfoRequest.get(
      UserInfoRequest.userinforequest.sortTeacherList.replace("__ID__", _id)
        .replace("__ROLEID__", roleid)
        .replace("__STATUS__", status).replace("__KIND__", kind).replace("__LIMIT__", limit).replace("__SKIP__", skip),
      (success) => {
        dispatch({
          type: USERINFOTYPES.USER_SORT_STUDENTLIST,
          payload: success.data.TotalListData,
        })
        dispatch({
          type: USERINFOTYPES.STUDENT_LIST_TOTAL_UPDATE,
          payload: success.data.total,
        });
      }, (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}

export const searchStudentUserInfoData = (_id, roleid, kind, value, limit, skip) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.USER_LOADING_STUDENT,
      loading: true,
    })
    UserInfoRequest.get(
      UserInfoRequest.userinforequest.searchUserInfo.replace("__Id__", _id)
        .replace("__Role__", roleid).replace("__KIND__", kind).replace("__SEARCH__", value).replace("__LIMIT__", limit).replace("__SKIP__", skip),
      (success) => {
        dispatch({
          type: USERINFOTYPES.SEARCH_STUDENT_USER_INFO_DATA,
          payload: success.data.TotalListData,
        })
        dispatch({
          type: USERINFOTYPES.STUDENT_LIST_TOTAL_UPDATE,
          payload: success.data.total,
        });
      }, (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}

export const getDataByCoursesClassroomsForTeacher = (id, role, courseData, classroomData, kind, limit, skip) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.GET_USER_LOADING,
      loading: true,
    });
    UserInfoRequest.get(
      UserInfoRequest.userinforequest.getDataByCoursesAndClassroomsForTeacher
        .replace("__ID__", id).replace("__ROLE__", role)
        .replace("__COURSESARRAY__", courseData).replace("__CLASSROOMARRAY__", classroomData).replace("__KIND__", kind).replace("__LIMIT__", limit).replace("__SKIP__", skip),
      (success) => {
        dispatch({
          type: USERINFOTYPES.GET_DATA_BY_COURSESCLASSROOM_TEACHER,
          payload: success.data.TotalListData,
        });
        dispatch({
          type: USERINFOTYPES.STUDENT_LIST_TOTAL_UPDATE,
          payload: success.data.total,
        });
      }, (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}
export const getStudentSortByCourse = (id, role, courseData, classroomData, kind, limit, skip) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.USER_LOADING_STUDENT,
      loading: true,
    });
    UserInfoRequest.get(
      UserInfoRequest.userinforequest.getStudentFilterByCourses
        .replace("__INSID__", id).replace("__ROLE__", role)
        .replace("__STUCOURSEARRAY__", courseData)
        .replace("__STUCLASSROOMARRAY__", classroomData)
        .replace("__KIND__", kind).replace("__LIMIT__", limit).replace("__SKIP__", skip),
      (success) => {
        dispatch({
          type: USERINFOTYPES.GET_STUDENT_COURSE_FILTER_LIST,
          payload: success.data.TotalListData,
        });
      }, (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}

export const getStudentNotLoggedData = (_id, roleid, kind, limit, skip) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.USER_LOADING_STUDENT,
      loading: true,
    })
    UserInfoRequest.get(
      UserInfoRequest.userinforequest.getNotLoggedTeacherData.replace("__ID__", _id)
        .replace("__ROLEID__", roleid).replace("__KIND__", kind).replace("__LIMIT__", limit).replace("__SKIP__", skip),
      (success) => {
        dispatch({
          type: USERINFOTYPES.GET_NOT_LOGGED_STUDENT_LIST,
          payload: success.data.TotalListData,
        })
        dispatch({
          type: USERINFOTYPES.STUDENT_LIST_TOTAL_UPDATE,
          payload: success.data.total,
        });
      }, (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}
export const postStudentUserInfoData = (data) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.POST_USER_INFO,
      payload: {},
    });

    UserInfoRequest.post(
      UserInfoRequest.userinforequest.userInfo,
      data,
      (success) => {
        dispatch({
          type: USERINFOTYPES.POST_USER_INFO,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteStudentUserInfoData = (_id) => {
  return (dispatch) => {
    UserInfoRequest.patch(
      UserInfoRequest.userinforequest.deleteUserInfo
        .replace("__UserId__", _id), {},
      (success) => {
        dispatch({
          type: USERINFOTYPES.DELETE_USER_INFO,
          payload: _id,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteTeacherUserInfoData = (_id) => {
  return (dispatch) => {
    UserInfoRequest.patch(
      UserInfoRequest.userinforequest.deleteUserInfo
        .replace("__UserId__", _id), {},
      (success) => {
        dispatch({
          type: USERINFOTYPES.DELETE_USER_INFO_TEACHER,
          payload: _id,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const getStudentUserInfoDataId = (_id, insId) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.USER_LOADING,
      loading: true,
    });
    UserInfoRequest.get(
      UserInfoRequest.userinforequest.getsingledata.replace("__UserId__", _id).replace("__INS__", insId),
      (success) => {
        dispatch({
          type: USERINFOTYPES.GET_USER_INFO_ID,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const clearStudentEdit = () => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.RESET_EDIT_STUDENT_INFO,
      payload: {}
    });
  }
}

export const getStudentUserInfoDataIdFaculty = (_id) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.USER_LOADING,
      loading: true,
    });
    UserInfoRequest.get(
      UserInfoRequest.userinforequest.getsingledatafaculty.replace("__UserId__", _id),
      (success) => {
        dispatch({
          type: USERINFOTYPES.GET_USER_INFO_ID,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const editCourseAssigned = (_id, data) => {
  return (dispatch) => {
    UserInfoRequest.patch(
      UserInfoRequest.userinforequest.assignedCourse.replace("__UserId__", _id),
      data,
      (success) => {
        dispatch({
          type: USERINFOTYPES.ASSIGNED_COURSE,
          payload: success.data._id,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const selectstudentUserInfoToUpdate = (galleryId) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.USER_INFO_SELECTION,
      payload: galleryId,
    });
  };
};



export const getAllCoursesForStudentFilter = (InsId) => {
  return (dispatch) => {
    UserInfoRequest.get(
      UserInfoRequest.userinforequest.getAllCoursesForStudentFilter.replace(
        "__INSID__",
        InsId
      ),
      (success) => {
        dispatch({
          type: USERINFOTYPES.GET_ALL_COURSES_AND_CLASSROOM,
          payload: success.data.courseData,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};


export const editStudentUserInfoData = (id, owner, insID, data,) => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.STUDENT_EDIT_INFO_LOADING,
      loading: true,
    });
    UserInfoRequest.patch(
      UserInfoRequest.userinforequest.updateUserInfo
        .replace("__UserId__", id)
        .replace("__Owner__", owner).replace("__INS__", insID),
      data,
      (success) => {
        if (success.data.message && success.data.message === "Contact already exists.") {
          dispatch({
            type: USERINFOTYPES.STUDENT_CONTACT_ERROR,
            error: true
          })
        } else {
          dispatch({
            type: USERINFOTYPES.UPDATE_USER_INFO,
            payload: success.data.id,
          });
          dispatch(showSuccessPopup("Personal Details updated successfully."))
        }

      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};


export const resetStudentContactError = () => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.STUDENT_CONTACT_RESET_ERROR,
      error: false
    });
  };
}
export const resetTeacherList = () => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.RESET_TEACHERLIST,
      payload: {}
    })
  }
}

export const resetStudentList = () => {
  return (dispatch) => {
    dispatch({
      type: USERINFOTYPES.RESET_STUDENTLIST,
      payload: {}
    })
  }
}

export const postExcelSheetColumns = (data) => {
  return dispatch => {
    dispatch({
      type: USERINFOTYPES.POST_EXCEL_SHEET_COLUMNS_LOADING,
      loading: true,
    });
    UserInfoRequest.post(
      UserInfoRequest.userinforequest.postExcelSheetColumns,
      data,
      (success) => {
        dispatch({
          type: USERINFOTYPES.POST_EXCEL_SHEET_COLUMNS_SUCCESS,
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
      type: USERINFOTYPES.POST_EXCEL_SHEET_COLUMNS_RESET
    })
  }
}