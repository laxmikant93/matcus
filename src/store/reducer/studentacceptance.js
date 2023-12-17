import { STUDENTACCEPTATIONTYPE } from "../actions/studentacceptance/actionType";

const STUDENTACCEPT_INITIAL_STATE = {
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

const studentacceptance = (state = STUDENTACCEPT_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case STUDENTACCEPTATIONTYPE.STUDENT_ACCEPTATION: {
      return {
        ...state,
        create: {
          ...state.create,
          success: true,
          data: payload,
        },
      };
    }
    case STUDENTACCEPTATIONTYPE.ERROR: {
      return {
        ...state,
        error: true,
        create: {
          success: false,
        },
      };
    }
    case STUDENTACCEPTATIONTYPE.GET_ERROR: {
      return {
        ...state,
        error: false,
      };
    }
    default:
      return state;
  }
};
export default studentacceptance;