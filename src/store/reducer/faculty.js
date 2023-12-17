import { FACULTYTYPE } from "../actions/faculty/actionType";

const FACULTY_INITIAL_STATE = {
  data: {},
};

const faculty = (state = FACULTY_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FACULTYTYPE.FACULTY_LOADED:
      return {
        ...state,
        success: true,
        data: payload,
      };
    case FACULTYTYPE.FACULTY_DELETE: {
      return {
        ...state.delete,
        data: state.data.filter((data) => data.id !== payload),
        success: true,
      };
    }

    default:
      return state;
  }
};
export default faculty;