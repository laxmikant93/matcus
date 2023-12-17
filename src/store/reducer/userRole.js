import { UserRoleType } from "../actions/userRole/actionTypes";

const INITIAL_STATE = {
  data: {},
  userData: {},
  userWithId: {},
  isLoaded: false,
  signupRole: "InstituteOwner",
};

const userRole = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case UserRoleType.GET_USER_ROLE: {
      return {
        ...state,
        data: payload,
        isLoaded: true,
      };
    }
    case UserRoleType.GET_SIGNUP_ROLE: {
      return {
        ...state,
        signupRole: payload,
      };
    }

    default:
      return state;
  }
};

export default userRole;
