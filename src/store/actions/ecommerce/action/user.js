import UserRequest from "../request/user";
import { API_PRODUCT, API_SIGNUP, API_LOGIN } from "../config";
import {
  // ADMIN_USER_LIST_LOADING,
  // ADMIN_USER_LIST_SUCCESS,
  // ADMIN_USER_LIST_FAIL,
  UserActionTypes
} from "../type/user";
import { postRequest } from "../utils/request";

const getCustomerList = (business, status) => {
  return (dispatch) => {
    dispatch({ type: UserActionTypes.ADMIN_USER_LIST_LOADING });
    const body = {};
    UserRequest.post(
      UserRequest.endpoint.orderDetailForAdmin.replace("_STATUS_", status).replace("_BUSINESS_", business),
      body,
      (success) => {
        dispatch({
          type: UserActionTypes.ADMIN_USER_LIST_SUCCESS,
          payload: success.data.data.userInfo,
        });
      },
      (error) => {
        dispatch({ type: UserActionTypes.ADMIN_USER_LIST_FAIL, payload: error.response.data.message });
      }
    )
  }

};

// const getCustomerList = (business) => async (dispatch) => {
//   try {
//     dispatch({ type: UserActionTypes.ADMIN_USER_LIST_LOADING });
//     const body = { status: "getAllUser", business };
//     const url = `${API_PRODUCT}/getOrderDetailForAdmin`;
//     const list = await postRequest(url, body);
//     if (list.status === 200) {
//       dispatch({
//         type: UserActionTypes.ADMIN_USER_LIST_SUCCESS,
//         payload: list.data.data.userInfo,
//       });
//     }

//   } catch (error) {

//     dispatch({ type: UserActionTypes.ADMIN_USER_LIST_FAIL, payload: error });
//   }
// };

export { getCustomerList };
