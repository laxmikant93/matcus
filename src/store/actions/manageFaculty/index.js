import { REQUEST_TYPE } from "./actionTypes";
import FacultyRequest from "./managefacultyRequest";
import { setCommonError } from "../commonerror";

export const getFaculty = (facultyId, industry) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.FACULTY_LOADING,
      loading: true,
    });
    FacultyRequest.get(
      FacultyRequest.urlEndpoint.FacultyList.replace(
        "__FACULTYID__",
        facultyId
      ).replace("__type__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.GET_FACULTY,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const postFaculty = (industry, data) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.FACULTY_CREATING,
      loading: true,
    });
    FacultyRequest.post(
      FacultyRequest.urlEndpoint.PostFaculty.replace("__type__", industry),
      data,
      (success) => {

        success.status === 200 &&
          dispatch({
            type: REQUEST_TYPE.POST_FACULTY,
            payload: success.data.arrResponse,
          });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getFacultylistinfoId = (_id, industry) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.GET_FACULTY_BY_ID_LOADING,
      loading: true,
    });
    FacultyRequest.get(
      FacultyRequest.urlEndpoint.getEditFaculty.replace("__Id__", _id).replace("__type__", industry),
      (success) => {
        dispatch({
          type: REQUEST_TYPE.GET_FACULTY_BY_ID,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const updateFaculty = (facultyId, industry, data) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.FACULTY_UPDATING,
      loading: true,
    });
    FacultyRequest.patch(
      FacultyRequest.urlEndpoint.EditFaculty.replace("__Id__", facultyId).replace("__type__", industry),
      data,
      (success) => {
        dispatch({
          type: REQUEST_TYPE.UPDATE_FACULTY,
          payload: success,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteFaculty = (facultyId, data, industry) => {
  return (dispatch) => {
    FacultyRequest.patch(
      FacultyRequest.urlEndpoint.DeleteFaculty.replace("__Id__", facultyId).replace("__type__", industry),
      data,
      (success) => {

        dispatch({
          type: REQUEST_TYPE.DELETE_FACULTY,
          payload: facultyId,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const resetSingleFacultyInfo = () => {
  return (dispatch) => {
    dispatch({
      type: REQUEST_TYPE.RESET_SINGLE_FACULTY_INFO,
      payload: {},
    });
  };
};
