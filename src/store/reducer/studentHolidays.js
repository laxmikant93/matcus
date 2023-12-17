import { studentHolidaysActionTypes } from "../actions/studentHolidays/actionTypes";

const STUDENT_HOLIDAY_INITIAL_STATE = {
  studentHolidaysList: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  getSingleHoliday: {
    data: [],
    loading: false,
    success: false,
    error: false
  }
}

const studentHolidays = (state = STUDENT_HOLIDAY_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case studentHolidaysActionTypes.STUDENT_HOLIDAYS_LIST_LOADING:
      return {
        ...state,
        studentHolidaysList: {
          ...state.StudentHolidaysList,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      }
    case studentHolidaysActionTypes.STUDENT_HOLIDAYS_LIST_LOADED: {
      return {
        ...state,
        studentHolidaysList: {
          ...state.studentHolidaysList,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      }
    }
    case studentHolidaysActionTypes.STUDENT_HOLIDAYS_LIST_ERROR:
      return ({
        ...state,
        studentHolidaysList: {
          ...state.studentHolidaysList,
          data: payload,
          loading: false,
          success: false,
          error: true,
        }
      })
    case studentHolidaysActionTypes.STUDENT_HOLIDAYS_LIST_RESET: {
      return {
        ...state,
        studentHolidaysList: {
          ...state.studentHolidaysList,
          data: [],
          loading: false,
          success: false,
          error: false,
        }
      }
    }

   
    case studentHolidaysActionTypes.STUDENT_HOLIDAYS_LIST_SORTBY_LOADED: {
      return {
        ...state,
        studentHolidaysList: {
          ...state.studentHolidaysList,
          data: payload,
          loading: false,
          success: true,
          error: false,
        }
      }
    }
   


    case studentHolidaysActionTypes.GET_SINGLE_HOLIDAY_LOADING: {
      return {
        ...state,
        getSingleHoliday: {
          ...state.getSingleHoliday,
          data: payload,
          loading: true,
          success: false,
          error: false
        }
      }
    }
    case studentHolidaysActionTypes.GET_SINGLE_HOLIDAY_LOADED: {
      return {
        ...state,
        getSingleHoliday: {
          ...state.getSingleHoliday,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      }
    }
    default:
      return state
  }
}
export default studentHolidays