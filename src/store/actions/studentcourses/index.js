import { setCommonError } from "../commonerror";
import { StudentCourseActionTypes } from "./actionTypes";
import StudentCourseRequest from "./StudentCourseRequest";

export const getStudentCoursesList = (insID,userId) => {
  return dispatch => {

      dispatch({
          type: StudentCourseActionTypes.GET_STUDENT_COURSES_LIST_LOADING,
          payload: [],
      })

      StudentCourseRequest.get(StudentCourseRequest.StudentCourseEndpoint.getStudentCoursesList.replace("__INSID__", insID).replace("__USERID__",userId),
       (success) => {

          dispatch({
              type: StudentCourseActionTypes.GET_STUDENT_COURSES_LIST_LOADED,
              payload: success.data.data ?success.data.data.reverse():[]
          })

      },
          error => {
              dispatch(setCommonError(error.message))
              
          });

  }
}
export const filterCourseClassroomStudentList = (insID,userId,classrooms,subjects) => {
    return dispatch => {
  
        dispatch({
            type: StudentCourseActionTypes.GET_STUDENT_COURSES_LIST_LOADING,
            payload: [],
        })
  
        StudentCourseRequest.get(StudentCourseRequest.StudentCourseEndpoint.filterStudentCourseClassroomList.replace("__INSID__", insID).replace("__USERID__",userId).replace("__CLASSROOM__",classrooms).replace("__SUBJECTS__",subjects),
         (success) => {
  
            dispatch({
                type: StudentCourseActionTypes.COURSE_CLASSROOM_FILTER_STUDENT_LIST,
                payload: success.data.data
            })
  
        },
            error => {
                dispatch(setCommonError(error.message))
                
            });
  
    }
  }

export const resetStudentCourseList = ()=>{
  return dispatch=>{
  dispatch({
    type:StudentCourseActionTypes.GET_STUDENT_COURSES_LIST_RESET,
    payload:[]
  })
}
}
export const getStudentCourseDetails = (_id,userId,kind)=>{
  return dispatch => {
    dispatch({
        type: StudentCourseActionTypes.GET_STUDENT_COURSE_DETAILS_LOADING,
        payload: [],
    })
    StudentCourseRequest.get(StudentCourseRequest.StudentCourseEndpoint.getPerticularCourseDetails.replace("__ID__", _id).replace('__USERID__',userId).replace("__KIND__",kind), (success) => {
        dispatch({
            type: StudentCourseActionTypes.GET_STUDENT_COURSE_DETAILS,
            payload: success.data.data
        })

    },
        error => {
            dispatch(setCommonError(error.message))
            
        });

}
}
export const getStudentSubjectCourseDetails = (_id,subjectId)=>{
    return dispatch => {
        dispatch({
            type: StudentCourseActionTypes.GET_STUDENT_COURSE_DETAILS_LOADING,
            payload: [],
        })
        StudentCourseRequest.get(StudentCourseRequest.StudentCourseEndpoint.getPerticularSubjectCourseDetails.replace("__ID__", _id).replace('__SUBJECTID__',subjectId), (success) => {
            dispatch({
                type: StudentCourseActionTypes.GET_STUDENT_COURSE_DETAILS,
                payload: success.data.data
            })   
        },
            error => {
                dispatch(setCommonError(error.message))
                
            });
    
    }
}

export const resetStudentCourseDetails = ()=>{
  return dispatch=>{
  dispatch({
    type:StudentCourseActionTypes.GET_STUDENT_COURSE_DETAILS_RESET,
    payload:[]
  })
}
}


export const filterStudentCourseList = (insId, userId, query, value) => {
  return dispatch => {

      dispatch({
          type: StudentCourseActionTypes.GET_STUDENT_COURSES_LIST_LOADING,
          payload: [],
      })

      StudentCourseRequest.get(StudentCourseRequest.StudentCourseEndpoint.searchFilter.replace("__INSID__", insId).replace("__USERID__", userId).replace("__QUERY__", query).replace("__VALUE__", value), (success) => {

          dispatch({
              type: StudentCourseActionTypes.SORTBY_FILTER_STUDENT_COURSE_LIST,
              payload: success.data.data
          })

      },
          error => {
              dispatch(setCommonError(error.message))
          }
      )
  }

}
export const createdByFilterStudentCoursesList = (insID,userId,value) => {
    return dispatch => {
  
        dispatch({
            type: StudentCourseActionTypes.GET_STUDENT_COURSES_LIST_LOADING,
            payload: [],
        })
  
        StudentCourseRequest.get(StudentCourseRequest.StudentCourseEndpoint.createdByFilterStudentCoursesList.replace("__INSID__", insID).replace("__OWNERID__",userId).replace("__VALUE__",value),
         (success) => {
  
            dispatch({
                type: StudentCourseActionTypes.CREATED_BY_FILTER_STUDENT_COURSES_LIST,
                payload: success.data.data
            })
  
        },
            error => {
                dispatch(setCommonError(error.message))
                
            });
  
    }
  }