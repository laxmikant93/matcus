// import Auth from "../../../Classes/Auth";
import { subdomainUserActionType } from "./actionTypes";

export const setSubdomainLoginToStore = (loginData) => {
  return (dispatch) => {
    dispatch({
      type: subdomainUserActionType.SET_SUBDOMAIN_USER_LOGIN,
      payload: loginData,
    });
  };
};