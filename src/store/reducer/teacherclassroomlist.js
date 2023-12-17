import { TeacherClassroomsListActionTypes } from "../actions/teacherclassroomlist/actionTypes"

const TEACHER_CLASSROOM_INITIAL_STATE = {
  Classroomlist: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
}

const TeacherClassrooms = (state = TEACHER_CLASSROOM_INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_LOADING:
      return ({
        ...state,
        Classroomlist: {
          ...state.Classroomlist,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })

    case TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_LOADED:
      return ({
        ...state,
        Classroomlist: {
          ...state.Classroomlist,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })
    case TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_ERROR:
      return ({
        ...state,
        Classroomlist: {
          ...state.Classroomlist,
          data: payload,
          loading: false,
          success: false,
          error: true,
        }
      })
    case TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_RESET:
      return ({
        ...state,
        Classroomlist: {
          ...state.Classroomlist,
          data: payload,
          loading: false,
          success: false,
          error: false,
        }
      })

    case TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_SORTBY_LOADING:
      return ({
        ...state,
        Classroomlist: {
          ...state.Classroomlist,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })

    case TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_SORTBY_LOADED:
      return ({
        ...state,
        Classroomlist: {
          ...state.Classroomlist,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })
    case TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_SORTBY_ERROR:
      return ({
        ...state,
        Classroomlist: {
          ...state.Classroomlist,
          data: payload,
          loading: false,
          success: false,
          error: true,
        }
      })
    case TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_SORTBY_RESET:
      return ({
        ...state,
        Classroomlist: {
          ...state.Classroomlist,
          data: payload,
          loading: false,
          success: false,
          error: false,
        }
      })


    default:
      return state
  }
}
export default TeacherClassrooms;