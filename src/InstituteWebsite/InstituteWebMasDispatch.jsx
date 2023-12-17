import {
  findSubdomain,
  findPrivateDomain,
  websiteMenuHeader
} from "../store/actions/institutewebsite";

import {
  getPublicTheme,
  previewDefaultTheme,
  getAllDefaultsTheme,
  getActivateTheme,
  previewCustomeTheme,
  getActivateWebsiteTheme,
} from "../store/actions/institutetheme";
export const INSWEB_MAP_STATE_TO_PROPS = (state) => {
  return {
    instituteinfo: state.institutewebsite,
    user: state.user,
    institutetheme: state.institutetheme,
    instituteSubdomain: state.user.user_institute_institute_subdomain,
    themeID: state.institutewebsite.themeId,
  };
};

export const INSWEB_MAP_DISPATCH_TO_PROPS = (dispatch) => {
  return {
    loadthemepreview: (themeId) => dispatch(previewDefaultTheme(themeId)),
    loadinstitute: (subdoamin) => dispatch(findSubdomain(subdoamin)),
    loadactivetheme: (instituteinf) => dispatch(getPublicTheme(instituteinf)),
    loadDefaultTheme: () => dispatch(getAllDefaultsTheme()),
    activateTheme: (user) => dispatch(getActivateTheme(user.user_institute)),
    privateDomainActivateTheme: (domain) => dispatch(getActivateWebsiteTheme(domain, "privateDomain")),
    subDomainActivateTheme: (domain) => dispatch(websiteMenuHeader(domain, "subdomain")),
    privateDomainMenuHeader: (domain) => dispatch(websiteMenuHeader(domain, "privateDomain")),
    subDomainMenuHeader: (domain) => dispatch(getActivateWebsiteTheme(domain, "subdomain")),
    loadprivatedomain: privateDomain => dispatch(findPrivateDomain(privateDomain)),
    loadCustomThemePreview: (user, themeid) => dispatch(previewCustomeTheme(user.user_institute, themeid))
  };
};
