import { setCommonError } from "../commonerror";
import { STUDENTVALIDATETYPES } from "./actionType";
import StudentValidateRequest from "./StudentValidateRequest";

export const getValidateStudentData = (id) => {
  return (dispatch) => {
    dispatch({
      type: STUDENTVALIDATETYPES.GET_STUDENT_VALIDATE,
      payload: {},
    });

    StudentValidateRequest.get(
      StudentValidateRequest.validatestudentrequest.validateStudent(
        "__StudentId__",
        id
      ),
      (success) => {
        dispatch({
          type: STUDENTVALIDATETYPES.GET_STUDENT_VALIDATE,
          payload: success.data.data.id,
        });
      },
      (error) => {
        setCommonError(error.message);
      }
    );
  };
};

export const postValidateStudentData = () => {
  return (dispatch) => {
    dispatch({
      type: STUDENTVALIDATETYPES.POST_STUDENT_VALIDATE,
      payload: {},
    });

    StudentValidateRequest.post(
      StudentValidateRequest.validatestudentrequest.validateStudent,
      (success) => {
        dispatch({
          type: STUDENTVALIDATETYPES.POST_STUDENT_VALIDATE,
          payload: success.data.data,
        });
      },
      (error) => {
        setCommonError(error.message);
      }
    );
  };
};
