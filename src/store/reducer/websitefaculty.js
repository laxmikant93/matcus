import { WEBSITE_FACULTY } from "../actions/websiteuifaculty/actionType";

const WEBSITEFACULTY_INITIAL_STATE = {
  list: {
    data: [],
    loading: false,
    error: false,
    success: true,
  },
};

const websitefaculty = (state = WEBSITEFACULTY_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case WEBSITE_FACULTY.WEBSITE_FACULTY_LIST: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
        },
      };
    }
    default:
      return state;
  }
};

export default websitefaculty;
