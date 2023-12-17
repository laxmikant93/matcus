
import { BUSINESS_INFO } from "../actions/businessInfo/actionTypes"

const BUSINESS_INFO_STATE = {
  patchInstituteInfo: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false
  },
  getInstituiteData: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false
  },
  getBusinessCategoryData: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  ecomWebsite: {
    data: [],
    loading: false,
    error: false,
    success: false
  },
  testMailSMTP: {
    data: [],
    loading: false,
    error: false,
    success: false
  }
}

const businessInfo = (state = BUSINESS_INFO_STATE, { type, payload }) => {

  switch (type) {
    case BUSINESS_INFO.PATCH_INSTITUTE_INFO_EDIT_LOADING:
      return ({
        ...state,
        patchInstituteInfo: {
          ...state.patchInstituteInfo,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
        }
      })
    case BUSINESS_INFO.PATCH_INSTITUTE_INFO_EDIT_LOADED:
      return ({
        ...state,
        patchInstituteInfo: {
          ...state.patchInstituteInfo,
          data: payload,
          loading: false,
          error: false,
          loaded: true,
          success: false,
        },
        getInstituiteData: {
          ...state.getInstituiteData,
          data: payload.resp,
          success: true,
        }

      })
    case BUSINESS_INFO.PATCH_INSTITUTE_INFO_EDIT_RESET:
      return ({
        ...state,
        patchInstituteInfo: {
          ...state.patchInstituteInfo,
          data: [],
          loading: false,
          error: false,
          loaded: false,
          success: false,
        }

      })
    case BUSINESS_INFO.GET_INSTITUTE_DATA_LOADING: {
      return {
        ...state,
        getInstituiteData: {
          ...state.getInstituiteData,
          data: [],
          success: false,
          loading: true,
        }
      }
    }
    case BUSINESS_INFO.GET_INSTITUTE_DATA_LOADED: {
      return {
        ...state,
        getInstituiteData: {
          ...state.getInstituiteData,
          data: payload,
          success: true,
          loading: false,
        }
      }
    }
    case BUSINESS_INFO.GET_INSTITUTE_DATA_RESET: {
      return {
        ...state,
        getInstituiteData: {
          ...state.getInstituiteData,
          data: [],
          success: false,
          loading: false,
          loaded: false,
          error: false
        }
      }
    }
    case BUSINESS_INFO.GET_BUSINESS_CATEGORY_LOADING: {
      return {
        ...state,
        getBusinessCategoryData: {
          ...state.getBusinessCategoryData,
          data: [],
          success: false,
          loading: true,
          error: false
        }
      }
    }
    case BUSINESS_INFO.GET_BUSINESS_CATEGORY_LOADED: {
      return {
        ...state,
        getBusinessCategoryData: {
          ...state.getBusinessCategoryData,
          data: payload,
          success: true,
          loading: false,
          error: false
        }
      }
    }
    case BUSINESS_INFO.GET_BUSINESS_CATEGORY_RESET: {
      return {
        ...state,
        getBusinessCategoryData: {
          ...state.getBusinessCategoryData,
          data: [],
          success: false,
          loading: false,
          error: false
        }
      }
    }
    case BUSINESS_INFO.GET_ECOM_WEBSITE_LOADING: {
      return {
        ...state,
        ecomWebsite: {
          ...state.ecomWebsite,
          data: [],
          success: false,
          loading: true,
        }
      }
    }
    case BUSINESS_INFO.GET_ECOM_WEBSITE_LOADED: {
      return {
        ...state,
        ecomWebsite: {
          ...state.ecomWebsite,
          data: payload,
          success: true,
          loading: false,
        }
      }
    }

    case BUSINESS_INFO.POST_SMTP_TEST_MAIL_LOADING: {
      return {
        ...state,
        testMailSMTP: {
          ...state.testMailSMTP,
          data: [],
          success: false,
          loading: true,
          error: false
        }
      }
    }


    case BUSINESS_INFO.POST_SMTP_TEST_MAIL_LOADED: {
      return {
        ...state,
        testMailSMTP: {
          ...state.testMailSMTP,
          data: payload,
          success: true,
          loading: false,
          error: false
        }
      }
    }


    case BUSINESS_INFO.POST_SMTP_TEST_MAIL_ERROR: {
      return {
        ...state,
        testMailSMTP: {
          ...state.testMailSMTP,
          data: [],
          success: false,
          loading: false,
          error: true
        }
      }
    }


    case BUSINESS_INFO.POST_SMTP_TEST_MAIL_RESET: {
      return {
        ...state,
        testMailSMTP: {
          ...state.testMailSMTP,
          data: [],
          success: false,
          loading: false,
          error: false
        }
      }
    }

    default:
      return state
  }
}
export default businessInfo