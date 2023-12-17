import { setCommonError } from '../commonerror'
import { studentHolidaysActionTypes } from './actionTypes'
import StudentHolidaysListRequest from './StudentHolidaysListRequest'


export const getStudentHolidaysList = (insId, user, date) => {
  return dispatch => {
    dispatch({
      type: studentHolidaysActionTypes.STUDENT_HOLIDAYS_LIST_LOADING,
      payload: [],
    })
    StudentHolidaysListRequest.get(StudentHolidaysListRequest.StudentHolidaysListEndpoint.getStudentHolidaysList.replace("__INSID__", insId).replace("__USERID__", user).replace("__DATE__", date), (success) => {
      dispatch({
        type: studentHolidaysActionTypes.STUDENT_HOLIDAYS_LIST_LOADED,
        payload: success.data.data
      })
    },
      error => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: studentHolidaysActionTypes.STUDENT_HOLIDAYS_LIST_ERROR,
          payload: []
        })
      })

  }
}

export const getStudentHolidaysListSortBy = (insId, date, query, value) => {
  return dispatch => {
    dispatch({
      type: studentHolidaysActionTypes.STUDENT_HOLIDAYS_LIST_LOADING,
      payload: []
    })
    StudentHolidaysListRequest.get(StudentHolidaysListRequest.StudentHolidaysListEndpoint.getStudentHolidaysListSortBy.replace("__INSID__", insId).replace("__DATE__", date).replace("__QUERY__", query).replace("__VALUE__", value), (success) => {
      dispatch({
        type: studentHolidaysActionTypes.STUDENT_HOLIDAYS_LIST_SORTBY_LOADED,
        payload: success.data.data
      })
    },
      error => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: studentHolidaysActionTypes.STUDENT_HOLIDAYS_LIST_SORTBY_ERROR,
          payload: []
        })
      })
  }
}


