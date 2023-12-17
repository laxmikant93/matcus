import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";
import { TeacherCourseActionTypes } from "./actionTypes";
import TeacherCourseRequest from "./TeacherCourseRequest";

export const getTeacherCoursesList = (insID,ownerId) => {
  return dispatch => {

      dispatch({
          type: TeacherCourseActionTypes.GET_TEACHER_COURSES_LIST_LOADING,
          payload: [],
      })

      TeacherCourseRequest.get(TeacherCourseRequest.TeacherCourseEndpoint.getTeacherCoursesList.replace("__INSID__", insID).replace("__OWNERID__",ownerId), (success) => {

          dispatch({
              type: TeacherCourseActionTypes.GET_TEACHER_COURSES_LIST_LOADED,
              payload: success.data.data ?success.data.data.reverse():[]
          })

      },
          error => {
              dispatch(setCommonError(error.message))
              
          });

  }
}
export const courseClassroomFilterTeacherCourseList = (insID,ownerId,classrooms,subjects) => {
    return dispatch => {
  
        dispatch({
            type: TeacherCourseActionTypes.GET_TEACHER_COURSES_LIST_LOADING,
            payload: [],
        })
  
        TeacherCourseRequest.get(TeacherCourseRequest.TeacherCourseEndpoint.filterCourseClassroomTeacherList.replace("__INSID__", insID).replace("__OWNERID__",ownerId).replace("__CLASSROOM__",classrooms).replace("__SUBJECTS__",subjects), (success) => {
  
            dispatch({
                type: TeacherCourseActionTypes.FILTER_COURSE_CLASSROOM_TEACHER_LIST,
                payload: success.data.data
            })
  
        },
            error => {
                dispatch(setCommonError(error.message))
                
            });
  
    }
  }
export const sortByTeacherCourseList = (insID,ownerId,term,value)=>{
  return dispatch => {

    dispatch({
        type: TeacherCourseActionTypes.GET_TEACHER_COURSES_LIST_LOADING,
        payload: [],
    })

    TeacherCourseRequest.get(TeacherCourseRequest.TeacherCourseEndpoint.sortByTeacherCoursesList.replace("__INSID__", insID).replace("__OWNERID__",ownerId).replace('__TERM__',term).replace('__VALUE__',value), (success) => {

        dispatch({
            type: TeacherCourseActionTypes.GET_TEACHER_COURSES_LIST_LOADED,
            payload: success.data.data
        })

    },
        error => {
            dispatch(setCommonError(error.message))
            
        });

}
}

export const deleteTeacherCourse = (_id) => {
  return (dispatch) => {
      dispatch({
          type: TeacherCourseActionTypes.DELETE_TEACHER_COURSE_LOADING,
          payload: {}
      })
      TeacherCourseRequest.delete(
        TeacherCourseRequest.TeacherCourseEndpoint.deleteTeacherCourse.replace("__ID__", _id),
          (success) => {
              if (success.data.data.message === "Deleted the record") {
                  dispatch({
                      type: TeacherCourseActionTypes.DELETE_TEACHER_COURSE,
                      payload: _id,
                  });
                  dispatch(showSuccessPopup("Deleted Successfully."))
              } else {
                  dispatch(setCommonError("There was some issue."));
              }

          },
          (error) => {
              dispatch(setCommonError(error.message));
          }
      );
  };
};
export const resetTeacherCourseList = ()=>{
  return dispatch=>{
  dispatch({
    type:TeacherCourseActionTypes.GET_TEACHER_COURSES_LIST_RESET,
    payload:[]
  })
}
}
// export const getStudentCourseDetails = (_id)=>{
//   return dispatch => {

//     dispatch({
//         type: StudentCourseActionTypes.GET_STUDENT_COURSE_DETAILS_LOADING,
//         payload: [],
//     })

//     StudentCourseRequest.get(StudentCourseRequest.StudentCourseEndpoint.getPerticularCourseDetails.replace("__ID__", _id), (success) => {

//         dispatch({
//             type: StudentCourseActionTypes.GET_STUDENT_COURSE_DETAILS,
//             payload: success.data.data
//         })

//     },
//         error => {
//             dispatch(setCommonError(error.message))
            
//         });

// }
// }

// export const resetStudentCourseDetails = ()=>{
//   return dispatch=>{
//   dispatch({
//     type:StudentCourseActionTypes.GET_STUDENT_COURSE_DETAILS_RESET,
//     payload:[]
//   })
// }
// }


export const createdByTeacherCourseList = (insID,ownerId,value)=>{
    return dispatch => {
  
      dispatch({
          type: TeacherCourseActionTypes.GET_TEACHER_COURSES_LIST_LOADING,
          payload: [],
      })
  
      TeacherCourseRequest.get(TeacherCourseRequest.TeacherCourseEndpoint.createdByFilterTeacherList.replace("__INSID__", insID).replace("__OWNERID__",ownerId).replace('__VALUE__',value), (success) => {
  
          dispatch({
              type: TeacherCourseActionTypes.CREATED_BY_FILTER_TEACHER_LIST,
              payload: success.data.data
          })
  
      },
          error => {
              dispatch(setCommonError(error.message))
              
          });
  
  }
  }