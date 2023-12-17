import { TeacherSubjectsListActionTypes } from "../actions/teachersubjectlist/actionTypes"

const TEACHER_SUBJECTS_INITIAL_STATE = {
  Subjectlist: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  TeacherClassroomData: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
}

const TeacherSubjects = (state = TEACHER_SUBJECTS_INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case TeacherSubjectsListActionTypes.TEACHER_SUBJECTS_LIST_LOADING:
      return ({
        ...state,
        Subjectlist: {
          ...state.Subjectlist,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })

    case TeacherSubjectsListActionTypes.TEACHER_SUBJECTS_LIST_LOADED:
      return ({
        ...state,
        Subjectlist: {
          ...state.Subjectlist,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })
    case TeacherSubjectsListActionTypes.TEACHER_SUBJECTS_LIST_ERROR:
      return ({
        ...state,
        Subjectlist: {
          ...state.Subjectlist,
          data: payload,
          loading: false,
          success: false,
          error: true,
        }
      })
    case TeacherSubjectsListActionTypes.TEACHER_SUBJECTS_LIST_RESET:
      return ({
        ...state,
        Subjectlist: {
          ...state.Subjectlist,
          data: payload,
          loading: false,
          success: false,
          error: false,
        }
      })
    case TeacherSubjectsListActionTypes.TEACHER_CLASSROOM_DATA_LOADING:
      return ({
        ...state,
        TeacherClassroomData: {
          ...state.TeacherClassroomData,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })

    case TeacherSubjectsListActionTypes.TEACHER_CLASSROOM_DATA_LOADED:
      return ({
        ...state,
        TeacherClassroomData: {
          ...state.TeacherClassroomData,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })
    case TeacherSubjectsListActionTypes.TEACHER_CLASSROOM_DATA_ERROR:
      return ({
        ...state,
        TeacherClassroomData: {
          ...state.TeacherClassroomData,
          data: payload,
          loading: false,
          success: false,
          error: true,
        }
      })
    case TeacherSubjectsListActionTypes.TEACHER_CLASSROOM_DATA_RESET:
      return ({
        ...state,
        TeacherClassroomData: {
          ...state.TeacherClassroomData,
          data: payload,
          loading: false,
          success: false,
          error: false,
        }
      })

    case TeacherSubjectsListActionTypes.TEACHER_SUBJECTS_LIST_SORTBY_LOADING:
      return ({
        ...state,
        Subjectlist: {
          ...state.Subjectlist,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })

    case TeacherSubjectsListActionTypes.TEACHER_SUBJECTS_LIST_SORTBY_LOADED:
      return ({
        ...state,
        Subjectlist: {
          ...state.Subjectlist,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      })
    case TeacherSubjectsListActionTypes.TEACHER_SUBJECTS_LIST_SORTBY_ERROR:
      return ({
        ...state,
        Subjectlist: {
          ...state.Subjectlist,
          data: payload,
          loading: false,
          success: false,
          error: true,
        }
      })
    case TeacherSubjectsListActionTypes.TEACHER_SUBJECTS_LIST_SORTBY_RESET:
      return ({
        ...state,
        Subjectlist: {
          ...state.Subjectlist,
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
export default TeacherSubjects;