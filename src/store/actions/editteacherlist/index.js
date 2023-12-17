import { EDITTEACHERLIST } from "./actionType";
import EditTeacherListRequest from "./EditTeacherListRequest";
import { setCommonError } from "../commonerror";

export const postTeacherData = (data) => {
  return (dispatch) => {
    EditTeacherListRequest.post(
      EditTeacherListRequest.editTeacherListEndpoint.postEditTeacherList,
      data,
      (success) => {
        dispatch({
          type: EDITTEACHERLIST.EDIT_TEACHER_LIST_ASSIGN_CLASSROOM,
          payload: success.data,
        });
        //dispatch(showSuccessPopup("Successfull!!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getTeacherData = (insId, courseid, role) => {
  return (dispatch) => {
    EditTeacherListRequest.get(
      EditTeacherListRequest.editTeacherListEndpoint.getEditTeacherListInstitute
        .replace("__INSID__", insId)
        .replace("__COURSEID__", courseid),
      (success) => {
        dispatch({
          type: EDITTEACHERLIST.EDIT_TEACHER_LIST_READ,
          payload: success.data.classassignedcheck,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const getTeacherDataReset = () => {
  return (dispatch) => {
    dispatch({
      type: EDITTEACHERLIST.EDIT_TEACHER_LIST_READ_RESET,
      payload: {},
    });
  };
};
export const getTeacherDataCount = (insId, courseid, role) => {
  return (dispatch) => {
    EditTeacherListRequest.get(
      EditTeacherListRequest.editTeacherListEndpoint.getEditTeacherListInstitute
        .replace("__INSID__", insId)
        .replace("__COURSEID__", courseid),
      (success) => {
        dispatch({
          type: EDITTEACHERLIST.EDIT_TEACHER_LIST_READ_COUNT,
          payload: success.data.classassignedcheck,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getTeacherUsernameData = (
  INSID,
  activeRole,
  courseid,
  username,
  kind,
  inputKey,
  classroom, usernameSearch, industry
) => {
  return (dispatch) => {
    if (classroom) {
      EditTeacherListRequest.get(
        EditTeacherListRequest.editTeacherListEndpoint.getClassroomUsernameList
          .replace("__INSID__", INSID)
          .replace("__TEACHER__ROLE__", activeRole)
          .replace("__CID__", courseid)
          .replace("__VALUE__", username)
          .replace("__KIND__", kind)
          .replace("__CLASSROOM__", classroom).replace("__usernameSearch__", usernameSearch).replace("_industry_", industry),
        (success) => {
          //EditTeacherListRequest.get(EditTeacherListRequest.editTeacherListEndpoint.getEditTeacherUsernameList.replace("__VALUE__",username), (success)=>{

          dispatch({
            type: EDITTEACHERLIST.EDIT_TEACHER_LIST_USERNAME_READ,
            payload: {
              inputKey,
              data: success.data.TotalListData ? success.data.TotalListData : [],
            },
          });
        },
        (error) => {
          dispatch(setCommonError(error.message));
        }
      );
    } else {
      EditTeacherListRequest.get(
        EditTeacherListRequest.editTeacherListEndpoint.getEditTeacherUsernameList
          .replace("__INSID__", INSID)
          .replace("__TEACHER__ROLE__", activeRole)
          .replace("__CID__", courseid)
          .replace("__VALUE__", username)
          .replace("__KIND__", kind).replace("__usernameSearch__", usernameSearch).replace("_industry_", industry)
        ,
        (success) => {
          //EditTeacherListRequest.get(EditTeacherListRequest.editTeacherListEndpoint.getEditTeacherUsernameList.replace("__VALUE__",username), (success)=>{

          dispatch({
            type: EDITTEACHERLIST.EDIT_TEACHER_LIST_USERNAME_READ,
            payload: {
              inputKey,
              data: success.data.TotalListData,
            },
          });
        },
        (error) => {
          dispatch(setCommonError(error.message));
        }
      );


    }
  };
};

export const getTeacherUsernameDataReset = () => {
  return (dispatch) => {
    dispatch({
      type: EDITTEACHERLIST.EDIT_TEACHER_LIST_USERNAME_RESET,
      payload: []
    })
  }
}

export const getTeacherAssignedClassroomData = (insid, courseID, uID) => {
  return (dispatch) => {
    EditTeacherListRequest.get(
      EditTeacherListRequest.editTeacherListEndpoint.getTeacherClassroomData
        .replace("__INS__", insid)
        .replace("__COURSEID__", courseID)
        .replace("__UID__", uID),
      (success) => {
        dispatch({
          type: EDITTEACHERLIST.EDIT_ASSIGNED_TEACHER_LIST_ClASSROOM_READ,
          payload: success.data.classfind,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteTeacherData = (_id, courseid, insId) => {
  return (dispatch) => {
    EditTeacherListRequest.get(
      EditTeacherListRequest.editTeacherListEndpoint.deleteEditTeacherList
        .replace("__TEACHERID__", _id)
        .replace("__COURSEID__", courseid).replace("__INSID__", insId),
      (success) => {
        dispatch({
          type: EDITTEACHERLIST.EDIT_TEACHER_LIST_DELETE,
          payload: _id,
        });
        //dispatch(showSuccessPopup("Successfull!!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteTeacherClassroomData = (_id) => {
  return (dispatch) => {
    EditTeacherListRequest.delete(
      EditTeacherListRequest.editTeacherListEndpoint.deleteEditTeacherClassroomList.replace(
        "__ID__",
        _id
      ),
      (success) => {
        dispatch({
          type: EDITTEACHERLIST.EDIT_TEACHER_LIST_CLASSROOM_DELETE,
          payload: success.data,
        });
        // dispatch(showSuccessPopup("Successfull!!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const updateTeacherData = (_id, data) => {
  return (dispatch) => {
    EditTeacherListRequest.patch(
      EditTeacherListRequest.editTeacherListEndpoint.updateEditTeacherList.replace(
        "__ID__",
        _id
      ),
      data,
      (success) => {
        dispatch({
          type: EDITTEACHERLIST.EDIT_TEACHER_LIST_UPDATE,
          payload: success.data.data,
        });
        //dispatch(showSuccessPopup("Successfull!!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const selectTeacherToUpdate = (TeacherId) => {
  return (dispatch) => {
    dispatch({
      type: EDITTEACHERLIST.EDIT_TEACHER_LIST_UPDATE_SELECTION,
      payload: TeacherId,
    });
  };
};

export const clearTeacherToUpdate = () => {
  return (dispatch) => {
    dispatch({
      type: EDITTEACHERLIST.EDIT_TEACHER_LIST_UPDATE_CLEAR,
      payload: [],
    });
  };
};

export const CleargetTeacherAssignedClassroomData = () => {
  return (dispatch) => {
    dispatch({
      type: EDITTEACHERLIST.EDIT_ASSIGNED_TEACHER_LIST_ClASSROOM_READ_CLEAR,
      payload: [],
    });
  };
};

export const adminPostClassTeacher = (data) => {
  return (dispatch) => {
    EditTeacherListRequest.post(
      EditTeacherListRequest.editTeacherListEndpoint.postClassTeacher,
      data,
      (success) => {
        dispatch({
          type: EDITTEACHERLIST.POST_CLASS_TEACHER,
          payload: success.data,
        });
        //dispatch(showSuccessPopup("Successfull!!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  }
}