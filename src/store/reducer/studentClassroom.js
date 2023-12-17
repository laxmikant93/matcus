
import {STUDENTCLASSROOM} from '../actions/StudentClassroomListing/actionType'
const STUDENT_CLASSROOM_INITIAL_STATE = {
  list: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  singleClassroomInfo:{
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  classroomSubjects:{
    data: [],
    loading: false,
    error: false,
    success: false,
  }
};

const studentClassroom = (state = STUDENT_CLASSROOM_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case STUDENTCLASSROOM.STUDENT_CLASSROOM_LIST_LOADING: {
      return {
        ...state,
        list:{
          ...state.list,
          data:{},
          loading:true,
          success:false
        }
      }
    }
    case STUDENTCLASSROOM.GET_STUDENT_CLASSROOM_LIST: {
      return {
        ...state,
        list:{
          ...state.list,
          data: payload,
          loading:false,
          success: true
        }
      }
    }
    case STUDENTCLASSROOM.STUDENT_SEARCH_CLASSROOM_LIST:{
      return {
        ...state,
        list:{
          ...state.list,
          data: payload,
          loading:false,
          success: true
        }
      }
    }
    case STUDENTCLASSROOM.STUDENT_SORT_CLASSROOM_LIST:{
      return {
        ...state,
        list:{
          ...state.list,
          data: payload,
          loading:false,
          success: true
        }
      }
    }


    case STUDENTCLASSROOM.GET_STUDENT_SINGLE_CLASSROOM_LOADING:{
      return {
        ...state,
        singleClassroomInfo:{
          ...state.singleClassroomInfo,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      }
    }
    case STUDENTCLASSROOM.GET_STUDENT_SINGLE_CLASSROOM:{
      return {
        ...state,
        singleClassroomInfo:{
          ...state.singleClassroomInfo,
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      }
    }
    case STUDENTCLASSROOM.GET_STUDENT_CLASSROOM_SUBJECTS_LOADING:{
      return{
        ...state,
        classroomSubjects:{
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      }
    }
    case STUDENTCLASSROOM.GET_STUDENT_CLASSROOM_SUBJECTS:{
      return{
        ...state,
        classroomSubjects:{
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      }
    }
    default:
      return state;
  }
};
export default studentClassroom;