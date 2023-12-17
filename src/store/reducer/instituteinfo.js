import { INSTITUTE_PAGE_WEBSITE_SECTION_LIST_AT } from "../actions/instituteinfo/action";

const INSTITUTE_PAGE_LIST_INITIAL_STATE = {
  list: {
    data: "",
    loading: false,
    error: false,
  },
  insInfoList: {
    data: "",
    loading: false,
    error: false,
    success: false,
  },
};

const instituteinfo = (
  state = INSTITUTE_PAGE_LIST_INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    case INSTITUTE_PAGE_WEBSITE_SECTION_LIST_AT.INSTITUTE_PAGE_WEBSITE_SECTION_LIST: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
        },
      };
    }

    case INSTITUTE_PAGE_WEBSITE_SECTION_LIST_AT.INS_INFO_SOCIAL_LINKS_LOADING:
      return {
        ...state.insInfoList,
        loading: true,
      };

    case INSTITUTE_PAGE_WEBSITE_SECTION_LIST_AT.INS_INFO_SOCIAL_LINKS_LOADED:
      return {
        ...state.insInfoList,
        loading: false,
        success: true,
        data: payload,
      };

    default:
      return state;
  }
};

export default instituteinfo;