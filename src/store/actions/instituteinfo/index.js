import { INSTITUTE_PAGE_WEBSITE_SECTION_LIST_AT } from "./action";
import InstitutePageWebsiteListRequest from "./InstituteInfoRequest";
import { setCommonError } from "../commonerror";

export const getInstituteWebsiteData = (_id) => {
  return (dispatch) => {
    // dispatch({
    //         type: INSTITUTE_PAGE_WEBSITE_SECTION_LIST_AT.INSTITUTE_PAGE_WEBSITE_SECTION_LIST,
    //         payload:{}
    // })

    InstitutePageWebsiteListRequest.get(
      InstitutePageWebsiteListRequest.InstitutePageWebsiteListEndpoint.InstitutePageWebsiteList.replace(
        "__ID__",
        _id
      ),
      (success) => {
        dispatch({
          type:
            INSTITUTE_PAGE_WEBSITE_SECTION_LIST_AT.INSTITUTE_PAGE_WEBSITE_SECTION_LIST_AT,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getInstituteSocialLinks = (_id) => {
  return (dispatch) => {
    dispatch({
      type:
        INSTITUTE_PAGE_WEBSITE_SECTION_LIST_AT.INS_INFO_SOCIAL_LINKS_LOADING,
      payload: {},
    });
    InstitutePageWebsiteListRequest.get(
      InstitutePageWebsiteListRequest.InstitutePageWebsiteListEndpoint.insInfoSocialLinks.replace(
        "__ID__",
        _id
      ),
      (success) => {
        dispatch({
          type:
            INSTITUTE_PAGE_WEBSITE_SECTION_LIST_AT.INS_INFO_SOCIAL_LINKS_LOADED,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
