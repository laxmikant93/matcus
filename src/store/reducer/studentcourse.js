import {StudentCourseActionTypes} from '../actions/studentcourses/actionTypes'

const STUDENT_COURSE_INITIAL_STATE = {
    courseList: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
    courseDetail:{
      data: [],
      loading: false,
      success: false,
      error: false,
    }
}

const StudentCourse = (state = STUDENT_COURSE_INITIAL_STATE, { type, payload }) => {

    switch (type) {
      case StudentCourseActionTypes.GET_STUDENT_COURSES_LIST_LOADING:
        return({
          ...state,
          courseList:{
            ...state.courseList,
            data:[],
            loading: true,
        success: false,
        error: false,
          }
        })
      
      case StudentCourseActionTypes.GET_STUDENT_COURSES_LIST_LOADED:
        return({
          ...state,
          courseList:{
            ...state.courseList,
            data:payload,
            loading: false,
        success: true,
        error: false,
          }
        })
      case StudentCourseActionTypes.SORTBY_FILTER_STUDENT_COURSE_LIST:{
        return({
          ...state,
          courseList:{
            ...state.courseList,
            data:payload,
            loading: false,
            success: true,
            error: false,
          }
        })
      }  
      case StudentCourseActionTypes.COURSE_CLASSROOM_FILTER_STUDENT_LIST:{
        return({
          ...state,
          courseList:{
            ...state.courseList,
            data:payload,
            loading: false,
            success: true,
            error: false,
          }
        })
      } 
      case StudentCourseActionTypes.GET_STUDENT_COURSES_LIST_RESET:
        return({
          ...state,
          courseList:{
            ...state.courseList,
            data:[],
            loading: false,
        success: false,
        error: false,
          }
        })
      

      case StudentCourseActionTypes.GET_STUDENT_COURSE_DETAILS_LOADING:
        return({
          ...state,
          courseDetail:{
            ...state.courseDetail,
            data:[],
            loading: true,
        success: false,
        error: false,
          }
        })
      
      case StudentCourseActionTypes.GET_STUDENT_COURSE_DETAILS:
        return({
          ...state,
          courseDetail:{
            ...state.courseDetail,
            data:payload,
            loading: false,
        success: true,
        error: false,
          }
        }
      )
      case StudentCourseActionTypes.GET_STUDENT_COURSE_DETAILS_RESET:
        return({
          ...state,
          courseDetail:{
            ...state.courseDetail,
            data:[],
            loading: false,
        success: false,
        error: false,
          }
        })
      case StudentCourseActionTypes.CREATED_BY_FILTER_STUDENT_COURSES_LIST:
        return({
          ...state,
          courseList:{
            ...state.courseList,
            data:payload,
            loading: false,
        success: true,
        error: false,
          }
        })
        default:
            return state
    }
}
export default StudentCourse;