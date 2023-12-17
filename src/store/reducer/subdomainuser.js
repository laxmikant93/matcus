import Auth from "../../Classes/Auth";
import { subdomainUserActionType } from "../actions/subdomainuser/actionTypes";

const subdomainuser = (state = Auth.subdomainUser(), { type, payload }) => {
  switch (type) {

    case subdomainUserActionType.SET_SUBDOMAIN_USER_LOGIN:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default subdomainuser;

