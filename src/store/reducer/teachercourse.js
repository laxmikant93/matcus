import {TeacherCourseActionTypes} from '../actions/teachercourse/actionTypes'

const STUDENT_COURSE_INITIAL_STATE = {
    teacherCourseList: {
        data: [],
        loading: false,
        success: false,
        error: false,
    },
    deleteTeacherCourse:{
      data: [],
        loading: false,
        success: false,
        error: false,
    }
}

const TeacherCourse = (state = STUDENT_COURSE_INITIAL_STATE, { type, payload }) => {

    switch (type) {
      case TeacherCourseActionTypes.GET_TEACHER_COURSES_LIST_LOADING:{
        return{
          
          ...state,
          teacherCourseList:{
            ...state.teacherCourseList,
            data:[],
            loading: true,
        success: false,
        error: false,
          }
        }
      }
      case TeacherCourseActionTypes.GET_TEACHER_COURSES_LIST_LOADED:{
        return{
          
          ...state,
          teacherCourseList:{
            ...state.teacherCourseList,
            data:payload,
            loading: false,
        success: true,
        error: false,
          }
        }
      }
      case TeacherCourseActionTypes.SORT_BY_TEACHER_COURSES_LIST:{
        return{
          
          ...state,
          teacherCourseList:{
            ...state.teacherCourseList,
            data:payload,
            loading: false,
        success: true,
        error: false,
          }
        }
      }
      case TeacherCourseActionTypes.CREATED_BY_FILTER_TEACHER_LIST:{
        return{
          ...state,
          teacherCourseList:{
            ...state.teacherCourseList,
            data:payload,
            loading: false,
           success: true,
           error: false,
          }
        }
      }
      case TeacherCourseActionTypes.FILTER_COURSE_CLASSROOM_TEACHER_LIST:{
        return{
          
          ...state,
          teacherCourseList:{
            ...state.teacherCourseList,
            data:payload,
            loading: false,
        success: true,
        error: false,
          }
        }
      }
      case TeacherCourseActionTypes.GET_TEACHER_COURSES_LIST_RESET:{
        return{
          ...state,
          teacherCourseList:{
            ...state.teacherCourseList,
            data:[],
            loading: false,
        success: false,
        error: false,
          }
        }
      }
      case TeacherCourseActionTypes.DELETE_TEACHER_COURSE_LOADING:{
        return{
          
          ...state,
          deleteTeacherCourse:{
            ...state.deleteCourse,
            data:[],
            loading: true,
        success: false,
        error: false,
          }
        }
      }
      case TeacherCourseActionTypes.DELETE_TEACHER_COURSE:{
        return{
          
          ...state,
          deleteTeacherCourse:{
            ...state.deleteCourse,
            data:payload,
            loading: false,
        success: true,
        error: false,
          }  ,
          teacherCourseList: {
            ...state.teacherCourseList,
            data: state.teacherCourseList.data.filter((item) => item._id !== payload),
            success: true,
          
        },
        }
      }
        default:
            return state
    }
}
export default TeacherCourse;