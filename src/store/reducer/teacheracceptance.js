import { TEACHERACCEPTATIONTYPES } from "../actions/teacheracceptance/actionType";

const TEACHERACCEPT_INITIAL_STATE = {
  create: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  loading: {
    laoding: "Loading",
  },
  error: false,
};


const teacheracceptance = (state = TEACHERACCEPT_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TEACHERACCEPTATIONTYPES.TEACHER_ACCEPTATION: {
      return {
        ...state,
        create: {
          ...state.create,
          success: true,
          data: payload,
        },
      };
    }
    case TEACHERACCEPTATIONTYPES.TEACHER_GET_ERROR: {
      return {
        ...state,
        error: false,
      };
    }
    case TEACHERACCEPTATIONTYPES.TEACHER_ERROR: {
      return {
        ...state,
        error: true,
      };
    }
    default:
      return state;
  }
};
export default teacheracceptance;