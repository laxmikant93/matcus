import { setCommonError } from "../commonerror";
import { STUDENTACCEPTATIONTYPE } from "./actionType";
import StudentAcceptRequest from "./StudentAcceptRequest";
import {
  setUserActiveRole,
  updateCreateInstituteInfo,
  updateUpdatedInstituteInfo,
} from "../user";

export const postStudentAcceptData = (data) => {
  return (dispatch) => {
    StudentAcceptRequest.post(
      StudentAcceptRequest.studentEndpoint.studentaccept,
      data,
      (success) => {
        dispatch({
          type: STUDENTACCEPTATIONTYPE.STUDENT_ACCEPTATION,
          payload: success.data.data,
        });

        const acceptdata = success.data;

        // Assiging role to user
        dispatch(setUserActiveRole(acceptdata.user_activeRole));

        // update institute id and namee for user
        dispatch(
          updateCreateInstituteInfo(
            acceptdata.user_institute,
            acceptdata.user_institute_institute_name
          )
        );

        // Update Institute Information
        dispatch(
          updateUpdatedInstituteInfo({
            institute_name: acceptdata.user_institute_institute_name,
            institute_address: acceptdata.user_institute_institute_address,
          })
        );
      },
      (error) => {
        dispatch({
          type: STUDENTACCEPTATIONTYPE.ERROR,
          error: true,
        });
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const getErrorOtp = () => {
  return (dispatch) => {
    dispatch({
      type: STUDENTACCEPTATIONTYPE.GET_ERROR,
    });
  };
};
