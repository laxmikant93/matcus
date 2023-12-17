import { CLASSROOM_ASSIGNED_TYPE } from "./actionType";
import ClassroomAssignedRequest from "./ClassroomAssignedRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

export const getClassroomAssignedData = (userId, instituteId, kind) => {
  return (dispatch) => {
    ClassroomAssignedRequest.get(
      ClassroomAssignedRequest.classroomassignedEndpoint.getClassroomAssigned
        .replace("__instituteId__", instituteId)
        .replace("__userID__", userId)
        .replace("__KIND__", kind),
      (success) => {
        let data = success.data.class
        let payloadArray = []
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          
          payloadArray.push({
            ...element,
            classroom: element.classroomName && element.classroomName._id,
            classroomname: element.classroomName && element.classroomName.classroomname,
            course: element.course._id,
            coursename: element.course.coursename
          })
        }
  
        dispatch({
          type: CLASSROOM_ASSIGNED_TYPE.CLASSROOM_ASSIGNED_READ,
          payload: payloadArray
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getClassroomAssignedFacultyData = (_id, userId) => {
  return (dispatch) => {
    ClassroomAssignedRequest.get(
      ClassroomAssignedRequest.classroomassignedEndpoint.getClassroomAssignedFaculty
        .replace("__Id__", _id)
        .replace("__UserId__", userId),
      (success) => {
        dispatch({
          type: CLASSROOM_ASSIGNED_TYPE.CLASSROOM_ASSIGNED_FACULTY,
          payload: success.data.editfaculty,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getTeacherAssignedClassroomData = (insid, courseID, uID) => {
  return (dispatch) => {
    dispatch({
      type: CLASSROOM_ASSIGNED_TYPE.ASSIGNED_TEACHER_CLASSROOM_DATA_LOADING,

    });
    ClassroomAssignedRequest.get(
      ClassroomAssignedRequest.classroomassignedEndpoint.getTeacherClassroomData
        .replace("__INS__", insid)
        .replace("__COURSEID__", courseID)
        .replace("__UID__", uID),
      (success) => {
        dispatch({
          type: CLASSROOM_ASSIGNED_TYPE.ASSIGNED_TEACHER_CLASSROOM_DATA,
          payload: success.data.classfind,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};


export const deleteTeacherClassroomData = (_id) => {
  return (dispatch) => {
    ClassroomAssignedRequest.delete(
      ClassroomAssignedRequest.classroomassignedEndpoint.deleteEditTeacherClassroomList.replace(
        "__ID__",
        _id
      ),
      (success) => {
        dispatch({
          type: CLASSROOM_ASSIGNED_TYPE.DELETE_ASSIGNED_CLASSROOM,
          payload: _id,
        });
        dispatch(showSuccessPopup("Classroom removed."));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteClassroomAssignedData = (_id, courseId) => {
  return (dispatch) => {
    ClassroomAssignedRequest.get(
      ClassroomAssignedRequest.classroomassignedEndpoint.deleteClassroomAssignedData
        .replace("__UserId__", _id)
        .replace("__courseId__", courseId),
      (success) => {
        dispatch({
          type: CLASSROOM_ASSIGNED_TYPE.DELETE_ASSIGNED_CLASSROOM,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const postCourseAssignedData = (data) => {
  return (dispatch) => {
    ClassroomAssignedRequest.post(
      ClassroomAssignedRequest.classroomassignedEndpoint.postClassroomAssigned,
      data,
      (success) => {
        dispatch({
          type: CLASSROOM_ASSIGNED_TYPE.POST_COURSE_ASSIGNED,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const changeClassroomAssignedData = (_id) => {
  return (dispatch) => {
    dispatch({
      type: CLASSROOM_ASSIGNED_TYPE.CLASSROOM_ASSIGNED_CHANGE,
      payload: _id,
    });
  };
};
export const changeClassroomAssignedDataResets = () => {
  return (dispatch) => {
    dispatch({
      type: CLASSROOM_ASSIGNED_TYPE.CLASSROOM_ASSIGNED_CHANGE_RESET,
      payload: [],
    });
  };
};

export const updateSelectionCourseId = (_id) => {
  return (dispatch) => {
    dispatch({
      type: CLASSROOM_ASSIGNED_TYPE.UPDATE_SELECTION_COURSE_ID,
      payload: _id,
    });
  };
};



