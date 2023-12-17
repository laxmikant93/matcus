import { setCommonError } from "../commonerror";
import { TEACHERACCEPTATIONTYPES } from "./actionType";
import {
  updateCreateInstituteInfo,
  setUserActiveRole,
  updateUpdatedInstituteInfo,
} from "../user";
import TeacherAcceptRequest from "./TeacherAcceptRequest";

export const postTeacherAcceptData = (data, id, userid) => {
  return (dispatch) => {
    TeacherAcceptRequest.post(
      TeacherAcceptRequest.teacheracceptEndpoint.teacheraccept,
      data,
      (success) => {
        dispatch({
          type: TEACHERACCEPTATIONTYPES.TEACHER_ACCEPTATION,
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
          type: TEACHERACCEPTATIONTYPES.TEACHER_ERROR,
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
      type: TEACHERACCEPTATIONTYPES.TEACHER_GET_ERROR,
    });
  };
};
