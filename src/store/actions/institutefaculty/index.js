import { setCommonError } from "../commonerror";
import { INS_FACULTY_ACTION_TYPES } from "./actionTypes";
import InstituteFacultyRequest from "./InstituteFacultyRequest";

export const loadFacultyList = (instituteId, limit = 8, skip = 0, industry) => {
  return dispatch => {
    dispatch({
      type: INS_FACULTY_ACTION_TYPES.INS_FAC_LIST_LOADING,
      payload: {}
    })

    InstituteFacultyRequest.get(
      InstituteFacultyRequest.instituteFacultyEndpoint.list.replace("__INSTITUTE_ID__", instituteId).replace("__LIMIT__", limit).replace("__SKIP__", skip).replace("__type__", industry),
      (success) => {
        dispatch({

          type: INS_FACULTY_ACTION_TYPES.INS_FAC_LIST_LOADED,
          payload: success.data

        })

      },
      (error) => {
        dispatch(setCommonError(error.message))
      }
    )
  }
}

export const loadFacultyListMore = (instituteId, limit = 8, skip, industry) => {
  return dispatch => {
    dispatch({
      type: INS_FACULTY_ACTION_TYPES.INS_FAC_MORELIST_LOADING,
      payload: {}
    })

    InstituteFacultyRequest.get(
      InstituteFacultyRequest.instituteFacultyEndpoint.list.replace("__INSTITUTE_ID__", instituteId).replace("__LIMIT__", limit).replace("__SKIP__", skip).replace("__type__", industry),
      (success) => {
        dispatch({
          type: INS_FACULTY_ACTION_TYPES.INS_FAC_MORELIST_LOADED,
          payload: success.data
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
      }
    )

  }
}