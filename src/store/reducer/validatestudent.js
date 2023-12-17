import { STUDENTVALIDATETYPES } from "../actions/studentvalidate/actionType";

const VALIDATESTUDENT_INITIAL_STATE = {
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

const validatestudent = (state = VALIDATESTUDENT_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case STUDENTVALIDATETYPES.GET_STUDENT_VALIDATE: {
      return {
        ...state.create,
        success: true,
        data: payload,
      };
    }
    case STUDENTVALIDATETYPES.POST_STUDENT_VALIDATE: {
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
export default validatestudent;