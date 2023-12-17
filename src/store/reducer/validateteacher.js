import { TEACHERVALIDATETYPES } from "../actions/teachervalidate/actionType";

const VALIDATETEACHER_INITIAL_STATE = {
  create: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  get: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
};

const validateteacher = (state = VALIDATETEACHER_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TEACHERVALIDATETYPES.GET_TEACHER_VALIDATE: {
      return {
        ...state.create,
        success: true,
        data: payload,
      };
    }
    case TEACHERVALIDATETYPES.POST_TEACHER_VALIDATE: {
      return {
        ...state.create,
        success: true,
        data: payload,
      };
    }

    default:
      return state;
  }
};
export default validateteacher;
