import { PRIVATE_DOMAINE_ACTION_TYPE } from "../actions/privateDomain/ActionType"

const ADMISSION_INITIAL_STATE = {
  privateDomainAvailability: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  postUserDetails: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  patchInstituteDetails: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getTlds: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  postDomainInfo: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getUserDetails: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getOrderDetails: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  createOrderDetails: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  patchInstitute: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  getInstitutedetails: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  postSupportMailData: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  postMailerData: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  setReviewData: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  techSupportMailData: {
    data: [],
    loading: false,
    success: false,
    error: false
  },
  domainDetailsGet: {
    data: [],
    loading: false,
    success: false,
    error: false
  }

}

const privatedomain = (state = ADMISSION_INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case PRIVATE_DOMAINE_ACTION_TYPE.GET_DOMAIN_AVAILABILITY_LOADING:
      return ({
        ...state,
        privateDomainAvailability: {
          ...state.privateDomainAvailability,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.GET_DOMAIN_AVAILABILITY_LOADED:
      return ({
        ...state,
        privateDomainAvailability: {
          ...state.privateDomainAvailability,
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.GET_DOMAIN_AVAILABILITY_ERROR:
      return ({
        ...state,
        privateDomainAvailability: {
          ...state.privateDomainAvailability,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.GET_DOMAIN_AVAILABILITY_RESET:
      return ({
        ...state,
        privateDomainAvailability: {
          ...state.privateDomainAvailability,
          data: [],
          loading: false,
          error: false,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.GET_TLDS_PRICE_LOADING:
      return ({
        ...state,
        getTlds: {
          ...state.getTlds,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.GET_TLDS_PRICE_LOADED:
      return ({
        ...state,
        getTlds: {
          ...state.getTlds,
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.GET_TLDS_PRICE_ERROR:
      return ({
        ...state,
        getTlds: {
          ...state.getTlds,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.GET_TLDS_PRICE_RESET:
      return ({
        ...state,
        getTlds: {
          ...state.getTlds,
          data: [],
          loading: false,
          error: false,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.POST_USER_DETAILS_ONLINE_LOADING:
      return ({
        ...state,
        postUserDetails: {
          ...state.postUserDetails,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.POST_USER_DETAILS_ONLINE_LOADED:
      return ({
        ...state,
        postUserDetails: {
          ...state.postUserDetails,
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.POST_USER_DETAILS_ONLINE_ERROR:
      return ({
        ...state,
        postUserDetails: {
          ...state.postUserDetails,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.POST_USER_DETAILS_ONLINE_RESET:
      return ({
        ...state,
        postUserDetails: {
          ...state.postUserDetails,
          data: [],
          loading: false,
          error: false,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.POST_DOMAIN_SUBMIT_LOADING:
      return ({
        ...state,
        postDomainInfo: {
          ...state.postDomainInfo,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.POST_DOMAIN_SUBMIT_LOADED:
      return ({
        ...state,
        postDomainInfo: {
          ...state.postDomainInfo,
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.POST_DOMAIN_SUBMIT_ERROR:
      return ({
        ...state,
        postDomainInfo: {
          ...state.postDomainInfo,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.POST_DOMAIN_SUBMIT_RESET:
      return ({
        ...state,
        postDomainInfo: {
          ...state.postDomainInfo,
          data: [],
          loading: false,
          error: false,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.GET_INSTITUTE_DETAILS_LOADING:
      return ({
        ...state,
        getInstitutedetails: {
          ...state.getInstitutedetails,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.GET_INSTITUTE_DETAILS_LOADED:
      return ({
        ...state,
        getInstitutedetails: {
          ...state.getInstitutedetails,
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.GET_INSTITUTE_DETAILS_ERROR:
      return ({
        ...state,
        getInstitutedetails: {
          ...state.getInstitutedetails,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.GET_INSTITUTE_DETAILS_RESET:
      return ({
        ...state,
        getInstitutedetails: {
          ...state.getInstitutedetails,
          data: [],
          loading: false,
          error: false,
          success: false,
        }
      })

    case PRIVATE_DOMAINE_ACTION_TYPE.SET_REVIEW_LOADING:
      return ({
        ...state, setReviewData: {
          ...state.setReviewData,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.SET_REVIEW_LOADED:
      return ({
        ...state, setReviewData: {
          ...state.setReviewData,
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      })

    case PRIVATE_DOMAINE_ACTION_TYPE.POST_USER_DETAILS_OFFLINE_LOADING:
      return ({
        ...state,
        postUserDetails: {
          ...state.postUserDetails,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.POST_USER_DETAILS_OFFLINE_LOADED:
      return ({
        ...state,
        postUserDetails: {
          ...state.postUserDetails,
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.POST_USER_DETAILS_OFFLINE_ERROR:
      return ({
        ...state,
        postUserDetails: {
          ...state.postUserDetails,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.POST_USER_DETAILS_OFFLINE_RESET:
      return ({
        ...state,
        postUserDetails: {
          ...state.postUserDetails,
          data: [],
          loading: false,
          error: false,
          success: false,
        }
      })
    // 

    case PRIVATE_DOMAINE_ACTION_TYPE.TECH_SUPPORT_FORM_LOADING:
      return ({
        ...state,
        techSupportMailData: {
          ...state.techSupportMailData,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.TECH_SUPPORT_FORM_LOADED:
      return ({
        ...state,
        techSupportMailData: {
          ...state.techSupportMailData,
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.TECH_SUPPORT_FORM_ERROR:
      return ({
        ...state,
        techSupportMailData: {
          ...state.techSupportMailData,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.TECH_SUPPORT_FORM_RESET:
      return ({
        ...state,
        techSupportMailData: {
          ...state.techSupportMailData,
          data: [],
          loading: false,
          error: false,
          success: false,
        }
      })

    // 
    case PRIVATE_DOMAINE_ACTION_TYPE.PATCH_INSTITUTE_DETAILS_LOADING:
      return ({
        ...state,
        patchInstituteDetails: {
          ...state.patchInstituteDetails,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.PATCH_INSTITUTE_DETAILS_LOADED:
      return ({
        ...state,
        patchInstituteDetails: {
          ...state.patchInstituteDetails,
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.PATCH_INSTITUTE_DETAILS_ERROR:
      return ({
        ...state,
        patchInstituteDetails: {
          ...state.patchInstituteDetails,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.PATCH_INSTITUTE_DETAILS_RESET:
      return ({
        ...state,
        patchInstituteDetails: {
          ...state.patchInstituteDetails,
          data: [],
          loading: false,
          error: false,
          success: false,
        }
      })

    case PRIVATE_DOMAINE_ACTION_TYPE.SEND_MAILER1_LOADING:
      return ({
        ...state,
        postMailerData: {
          ...state.postMailerData,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.SEND_MAILER1_LOADED:
      return ({
        ...state,
        postMailerData: {
          ...state.postMailerData,
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.SEND_MAILER1_ERROR:
      return ({
        ...state,
        postMailerData: {
          ...state.postMailerData,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      })
    // todo

    case PRIVATE_DOMAINE_ACTION_TYPE.GET_USER_DETAILS_LOADING:
      return ({
        ...state,
        getUserDetails: {
          ...state.getUserDetails,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.GET_USER_DETAILS_LOADED:
      return ({
        ...state,
        getUserDetails: {
          ...state.getUserDetails,
          data: payload === null ? {} : payload,
          loading: false,
          error: false,
          success: true,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.GET_USER_DETAILS_ERROR:
      return ({
        ...state,
        getUserDetails: {
          ...state.getUserDetails,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      })

    case PRIVATE_DOMAINE_ACTION_TYPE.GET_ORDER_DETAILS_LOADING:
      return ({
        ...state,
        getOrderDetails: {
          ...state.getOrderDetails,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.GET_ORDER_DETAILS_LOADED:
    
      return ({
        ...state,
        getOrderDetails: {
          ...state.getOrderDetails,
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.GET_ORDER_DETAILS_ERROR:
      return ({
        ...state,
        getOrderDetails: {
          ...state.getOrderDetails,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      })




    case PRIVATE_DOMAINE_ACTION_TYPE.PATCH_CREATE_WEBSITE_LOADING:
      return ({
        ...state,
        patchInstitute: {
          ...state.patchInstitute,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.PATCH_CREATE_WEBSITE_LOADED:
      return ({
        ...state,
        patchInstitute: {
          ...state.patchInstitute,
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.PATCH_CREATE_WEBSITE_ERROR:
      return ({
        ...state,
        patchInstitute: {
          ...state.patchInstitute,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      })

    case PRIVATE_DOMAINE_ACTION_TYPE.CREATE_ORDER_LOADING:
      return ({
        ...state,
        createOrderDetails: {
          ...state.createOrderDetails,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.CREATE_ORDER_LOADED:
      return ({
        ...state,
        createOrderDetails: {
          ...state.createOrderDetails,
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.CREATE_ORDER_ERROR:
      return ({
        ...state,
        createOrderDetails: {
          ...state.createOrderDetails,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.CREATE_ORDER_RESET:
      return ({
        ...state,
        createOrderDetails: {
          ...state.createOrderDetails,
          data: [],
          loading: false,
          error: false,
          success: false,
        }
      })


    // todo finish

    case PRIVATE_DOMAINE_ACTION_TYPE.POST_SUPPORT_MAIL_LOADING:
      return ({
        ...state,
        postSupportMailData: {
          ...state.postSupportMailData,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.POST_SUPPORT_MAIL_LOADED:
      return ({
        ...state,
        postSupportMailData: {
          ...state.postSupportMailData,
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.POST_SUPPORT_MAIL_ERROR:
      return ({
        ...state,
        postSupportMailData: {
          ...state.postSupportMailData,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.POST_SUPPORT_MAIL_RESET:
      return ({
        ...state,
        postSupportMailData: {
          ...state.postSupportMailData,
          data: [],
          loading: false,
          error: false,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.GET_DOMAIN_DETAILS_LOADING:
      return ({
        ...state,
        domainDetailsGet: {
          ...state.domainDetailsGet,
          data: [],
          loading: true,
          error: false,
          success: false,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.GET_DOMAIN_DETAILS_LOADED:
      return ({
        ...state,
        domainDetailsGet: {
          ...state.domainDetailsGet,
          data: payload,
          loading: false,
          error: false,
          success: true,
        }
      })
    case PRIVATE_DOMAINE_ACTION_TYPE.GET_DOMAIN_DETAILS_ERROR:
      return ({
        ...state,
        domainDetailsGet: {
          ...state.domainDetailsGet,
          data: [],
          loading: false,
          error: true,
          success: false,
        }
      })


    default:
      return state
  }
}
export default privatedomain;