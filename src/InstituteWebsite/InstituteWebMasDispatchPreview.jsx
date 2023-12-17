import { getPublicTheme } from "../store/actions/institutetheme";
import {
  findPrivateDomain,
  findSubdomain,
} from "../store/actions/institutewebsite";

export const INSWEB_MAP_STATE_TO_PROPS = (state) => {
  return {
    user: state.user,
    instituteinfo: state.institutewebsite,
    institutetheme: state.institutetheme,
    institutesubdomain: state.user.user_institute_institute_subdomain,
  };
};

export const INSWEB_MAP_DISPATCH_TO_PROPS = (dispatch) => {
  return {
    loadinstitute: (instituteid) => dispatch(findSubdomain(instituteid)),
    loadprivatedomain: (privateDomain) =>
      dispatch(findPrivateDomain(privateDomain)),
    loadactivetheme: (instituteinf) => dispatch(getPublicTheme(instituteinf)),
  };
};
