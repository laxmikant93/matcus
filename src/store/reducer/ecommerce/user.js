import {
  ADMIN_USER_LIST_LOADING,
  ADMIN_USER_LIST_SUCCESS,
  ADMIN_USER_LIST_FAIL,
  UserActionTypes
} from "../../actions/ecommerce/type/user";

const USER_LIST_INITIAL_STATE = {
  adminUserList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
}

const userListReducer = (state = USER_LIST_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case UserActionTypes.ADMIN_USER_LIST_LOADING:
      return ({
        ...state,
        adminUserList: {
          ...state.adminUserList,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      });
    case UserActionTypes.ADMIN_USER_LIST_SUCCESS:
      return ({
        ...state,
        adminUserList: {
          ...state.adminUserList,
          data: [...payload],
          loading: false,
          error: false,
          success: true,
        }
      });
    case UserActionTypes.ADMIN_USER_LIST_FAIL:
      return ({
        ...state,
        adminUserList: {
          ...state.adminUserList,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      });
    default:
      return state;
  }
};

export { userListReducer };