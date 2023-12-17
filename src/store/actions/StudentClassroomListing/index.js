import { setCommonError } from "../commonerror";
import {  STUDENTCLASSROOM } from "./actionType";
import StudentClassroomRequest from "./StudentClassroomRequest";

export const getStudentClassroomList = (_id,userId)=>{
  return (dispatch)=>{
    dispatch({
      type: STUDENTCLASSROOM.STUDENT_CLASSROOM_LIST_LOADING,
      loading: true,
    });
    StudentClassroomRequest.get(
    StudentClassroomRequest.studentClassroomEndpoint.classroomList.replace("__INSID__",_id).replace("__USERID__",userId),
    (success)=>{
      dispatch({
        type:  STUDENTCLASSROOM.GET_STUDENT_CLASSROOM_LIST,
        payload: success.data.courseInfo,
      })
    },
    (error)=>{
      setCommonError(error.message);
    }
    )
  }
}

export const searchStudentClassroom = (_id, term) => {
  return (dispatch) => {
    dispatch({
      type: STUDENTCLASSROOM.STUDENT_CLASSROOM_LIST_LOADING,
      loading: true,
    });
    StudentClassroomRequest.get(
      StudentClassroomRequest.studentClassroomEndpoint.classroomList.replace("__INSID__",_id).replace("__TERM__",term),
      (success)=>{
        dispatch({
          type:  STUDENTCLASSROOM.GET_STUDENT_CLASSROOM_LIST,
          payload: success.data.course,
        })
      },
      (error)=>{
        setCommonError(error.message);
      }
      )
  };
};

export const sortStudentClassroom = (_id,value)=>{
  return (dispatch) => {
    dispatch({
      type: STUDENTCLASSROOM.STUDENT_CLASSROOM_LIST_LOADING,
      loading: true,
    });
    StudentClassroomRequest.get(
      StudentClassroomRequest.studentClassroomEndpoint.classroomList.replace("__INSID__",_id).replace("__TERM__",value),
      (success)=>{
        dispatch({
          type:  STUDENTCLASSROOM.STUDENT_SORT_CLASSROOM_LIST,
          payload: success.data.course,
        })
      },
      (error)=>{
        setCommonError(error.message);
      }
      )
  };
}

export const getSingleStudentClassroomInfo = (_id)=>{
  return (dispatch)=>{
    dispatch({
      type: STUDENTCLASSROOM.GET_STUDENT_SINGLE_CLASSROOM_LOADING,
      loading: true,
    });
    StudentClassroomRequest.get(
    StudentClassroomRequest.studentClassroomEndpoint.getSingleClassroomInfo.replace("__ID__",_id),
    (success)=>{
      dispatch({
        type:  STUDENTCLASSROOM.GET_STUDENT_SINGLE_CLASSROOM,
        payload: success.data,
      })
    },
    (error)=>{
      setCommonError(error.message);
    }
    )
  }
}



export const getStudentClassroomSubjects = (insId,userId,courseId)=>{
  return (dispatch)=>{
    dispatch({
      type: STUDENTCLASSROOM.GET_STUDENT_CLASSROOM_SUBJECTS_LOADING,
      loading: true,
    });
    StudentClassroomRequest.get(
    StudentClassroomRequest.studentClassroomEndpoint.getStudentClassroomSubjectList.replace("__INSID__",insId).replace("__USERID__",userId).replace("__COURSEID__",courseId),
    (success)=>{
      dispatch({
        type:  STUDENTCLASSROOM.GET_STUDENT_CLASSROOM_SUBJECTS,
        payload: success.data.classroomInfo,
      })
    },
    (error)=>{
      setCommonError(error.message);
    }
    )
  }
}

export const searchStudentClassroomSubjects = (_id,term)=>{
  return (dispatch)=>{
    dispatch({
      type: STUDENTCLASSROOM.GET_STUDENT_CLASSROOM_SUBJECTS_LOADING,
      loading: true,
    });
    StudentClassroomRequest.get(
    StudentClassroomRequest.studentClassroomEndpoint.classroomList.replace("__INSID__",_id).replace("__TERM__",term),
    (success)=>{
      dispatch({
        type:  STUDENTCLASSROOM.SEARCH_STUDENT_CLASSROOM_SUBJECT,
        payload: success.data.course,
      })
    },
    (error)=>{
      setCommonError(error.message);
    }
    )
  }
}
export const sortStudentClassroomSubjects = (_id,value)=>{
  return (dispatch)=>{
    dispatch({
      type: STUDENTCLASSROOM.GET_STUDENT_CLASSROOM_SUBJECTS_LOADING,
      loading: true,
    });
    StudentClassroomRequest.get(
    StudentClassroomRequest.studentClassroomEndpoint.classroomList.replace("__INSID__",_id).replace("__VALUE__",value),
    (success)=>{
      dispatch({
        type:  STUDENTCLASSROOM.SORT_STUDENT_CLASSROOM_SUBJECTS,
        payload: success.data.course,
      })
    },
    (error)=>{
      setCommonError(error.message);
    }
    )
  }
}