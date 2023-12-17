import { WEBSITE_FACULTY } from "./actionType";
import { setCommonError } from "../commonerror";
import WebsiteUIfacultyRequest from "./websiteuifacultyRequest";


export const getWebsiteInstituteData = (id) => {
  return (dispatch) => {
    WebsiteUIfacultyRequest.get(WebsiteUIfacultyRequest.websiteuifacultyRequest.InstituteFaculty.replace("__ID__",id),
      (success) => {
        dispatch({
          type: WEBSITE_FACULTY.WEBSITE_FACULTY_LIST,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
