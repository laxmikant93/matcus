import { setCommonError } from "../commonerror";
import { TEACHERVALIDATETYPES } from "./actionType";
import TeacherValidateRequest from "./TeacherValidateRequest";

export const getValidateTeacherData = (id) => {
  return (dispatch) => {
    // dispatch({
    //   type: TEACHERVALIDATETYPES.GET_TEACHER_VALIDATE,
    //   payload: {},
    // });

    TeacherValidateRequest.get(
      TeacherValidateRequest.validateteacherrequest.validateTeacher(
        "__TeacherId__",
        id
      ),
      (success) => {
        dispatch({
          type: TEACHERVALIDATETYPES.GET_TEACHER_VALIDATE,
          payload: success.data.data,
        });
      },
      (error) => {
        setCommonError(error.message);
      }
    );
  };
};

export const postValidateTeacherData = () => {
  return (dispatch) => {
    // dispatch({
    //   type: TEACHERVALIDATETYPES.POST_TEACHER_VALIDATE,
    //   payload: {},
    // });

    TeacherValidateRequest.post(
      TeacherValidateRequest.validateteacherrequest.validateTeacher,
      (success) => {
        dispatch({
          type: TEACHERVALIDATETYPES.POST_TEACHER_VALIDATE,
          payload: success.data.data,
        });
      },
      (error) => {
        setCommonError(error.message);
      }
    );
  };
};
