import { PRIVATE_DOMAINE_ACTION_TYPE } from "./ActionType";
import privateDomainRequest from "./privateDomainRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";
import { setUserActiveRoleUpdate, updateCreateInstituteInfoNew, updateUserInstituteInfo } from "../user";

export const getDomainAvailablity = (domain) => {
  return (dispatch) => {

    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.GET_DOMAIN_AVAILABILITY_LOADING,
      payload: [],
    })
    privateDomainRequest.get(privateDomainRequest.privateDomainEndpoint.getDomainAvailablity.replace("__DOMAIN__", domain), (success) => {
      dispatch({
        type: PRIVATE_DOMAINE_ACTION_TYPE.GET_DOMAIN_AVAILABILITY_LOADED,
        payload: success.data
      })
    },
      error => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.GET_DOMAIN_AVAILABILITY_ERROR,
          payload: []
        })
      });
  }
}
let ActiveRole = process.env.REACT_APP_PAGE_OWNER
export const postDomainUserDetailsOnline = (data) => {

  return (dispatch) => {

    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.POST_USER_DETAILS_ONLINE_LOADING,
      payload: [],
    })

    privateDomainRequest.post(privateDomainRequest.privateDomainEndpoint.postUserDetailOnline, data,
      (success) => {
        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.POST_USER_DETAILS_ONLINE_LOADED,
          payload: success.data
        })
        dispatch(updateUserInstituteInfo(success.data.institute_subdomain))
        dispatch(updateCreateInstituteInfoNew(success.data._id, success.data.institute_name, success.data.institute_address))
        dispatch(setUserActiveRoleUpdate(ActiveRole))
      },
      (error) => {
        // dispatch(setCommonError(error.message))
        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.POST_USER_DETAILS_ONLINE_ERROR,
          payload: []
        })
      });
  }

}
export const getUserDetails = (userID, instituteID, type) => {
  return (dispatch) => {

    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.GET_USER_DETAILS_LOADING,
      payload: [],
    })

    privateDomainRequest.get(privateDomainRequest.privateDomainEndpoint.getUserDetails.replace("__USERID__", userID).replace("__INSTITUTEID__", instituteID).replace("__TYPE__", type), (success) => {

      dispatch({
        type: PRIVATE_DOMAINE_ACTION_TYPE.GET_USER_DETAILS_LOADED,
        payload: success.data.data

      })

    },
      error => {
        dispatch(setCommonError(error.message))

        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.GET_USER_DETAILS_ERROR,
          payload: []
        })
      });
  }
}

export const getDomainDetails = (userID, instituteID, type) => {
  return (dispatch) => {

    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.GET_DOMAIN_DETAILS_LOADING,
      payload: [],
    })

    privateDomainRequest.get(privateDomainRequest.privateDomainEndpoint.getDomainDetails.replace("__USERID__", userID).replace("__INSTITUTEID__", instituteID).replace("__TYPE__", type), (success) => {
      dispatch({
        type: PRIVATE_DOMAINE_ACTION_TYPE.GET_DOMAIN_DETAILS_LOADED,
        payload: success.data.data
      })
    },
      error => {
        dispatch(setCommonError(error.message))

        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.GET_DOMAIN_DETAILS_ERROR,
          payload: []
        })
      });
  }
}
export const getOrderDetails = (userID, instituteID, type) => {
  return (dispatch) => {

    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.GET_ORDER_DETAILS_LOADING,
      payload: [],
    })

    privateDomainRequest.get(privateDomainRequest.privateDomainEndpoint.getOrderDetails.replace("__USERID__", userID).replace("__INSTITUTEID__", instituteID).replace("__TYPE__", type), (success) => {
      dispatch({
        type: PRIVATE_DOMAINE_ACTION_TYPE.GET_ORDER_DETAILS_LOADED,
        payload: success.data
      })
    },
      error => {
        dispatch(setCommonError(error.message))

        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.GET_ORDER_DETAILS_ERROR,
          payload: []
        })
      });
  }
}


export const createOrder = (data) => {

  return (dispatch) => {
    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.CREATE_ORDER_LOADING,
      payload: {},
    })

    privateDomainRequest.post(
      privateDomainRequest.privateDomainEndpoint.createOrder, data,
      (success) => {
        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.CREATE_ORDER_LOADED,
          payload: success.data
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
        // dispatch({
        //   type: PRIVATE_DOMAINE_ACTION_TYPE.CREATE_ORDER_ERROR,
        //   payload: []
        // })
      });
  }
}

export const instituteDetailsData = (id) => {

  return (dispatch) => {
    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.GET_INSTITUTE_DETAILS_LOADING,
      payload: {},
    })

    privateDomainRequest.get(
      privateDomainRequest.privateDomainEndpoint.instituteDetails.replace("__ID__", id),
      (success) => {
        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.GET_INSTITUTE_DETAILS_LOADED,
          payload: success
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
        // dispatch({
        //   type: PRIVATE_DOMAINE_ACTION_TYPE.CREATE_ORDER_ERROR,
        //   payload: []
        // })
      });
  }
}
// change the names
export const subDomainMail = (data) => {

  return (dispatch) => {
    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.SEND_MAILER1_LOADING,
      payload: {},
    })

    privateDomainRequest.post(
      privateDomainRequest.privateDomainEndpoint.subDomainMailer, data,
      (success) => {
        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.SEND_MAILER1_LOADED,
          payload: success
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.SEND_MAILER1_ERROR,
          payload: []
        })
      });
  }
}
export const sendMailer2 = (data) => {

  return (dispatch) => {
    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.SEND_MAILER2_LOADING,
      payload: {},
    })

    privateDomainRequest.post(
      privateDomainRequest.privateDomainEndpoint.sendMail2, data,
      (success) => {
        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.SEND_MAILER2_LOADED,
          payload: success
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.SEND_MAILER2_ERROR,
          payload: []
        })
      });
  }
}
export const sendMailer3 = (data) => {

  return (dispatch) => {
    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.SEND_MAILER3_LOADING,
      payload: {},
    })

    privateDomainRequest.post(
      privateDomainRequest.privateDomainEndpoint.sendMail3, data,
      (success) => {
        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.SEND_MAILER3_LOADED,
          payload: success
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.SEND_MAILER3_ERROR,
          payload: []
        })
      });
  }
}
export const sendMailer4 = (data) => {

  return (dispatch) => {
    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.SEND_MAILER4_LOADING,
      payload: {},
    })

    privateDomainRequest.post(
      privateDomainRequest.privateDomainEndpoint.sendMail4, data,
      (success) => {
        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.SEND_MAILER4_LOADED,
          payload: success
        })
      },
      (error) => {
        dispatch(setCommonError(error.message))
        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.SEND_MAILER4_ERROR,
          payload: []
        })
      });
  }
}


export const postDomainUserDetailsOffline = (data) => {

  return (dispatch) => {
    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.POST_USER_DETAILS_OFFLINE_LOADING,
      payload: [],
    })
    privateDomainRequest.post(privateDomainRequest.privateDomainEndpoint.postUserDetailOffline, data,
      (success) => {

        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.POST_USER_DETAILS_OFFLINE_LOADED,
          payload: success.data
        })
        // Storage.setJson("pikachu", success)
      },
      (error) => {
        // dispatch(setCommonError(error.message))
        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.POST_USER_DETAILS_OFFLINE_ERROR,
          payload: []
        })
      });
  }
}


export const patchDomainInstituteDetails = (insID, data) => {
  return (dispatch) => {

    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.PATCH_INSTITUTE_DETAILS_LOADING,
      payload: [],
    })

    privateDomainRequest.patch(privateDomainRequest.privateDomainEndpoint.patchInstituteDetails.replace("__INS__", insID), data, (success) => {

      dispatch({
        type: PRIVATE_DOMAINE_ACTION_TYPE.PATCH_INSTITUTE_DETAILS_LOADED,
        payload: success.data
      })
    },
      error => {
        dispatch(setCommonError(error.message))

        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.PATCH_INSTITUTE_DETAILS_ERROR,
          payload: []
        })
      });
  }
}

export const supportMailRequest = (data) => {
  return (dispatch) => {

    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.SUPPORT_MAIL_LOADING,
      payload: [],
    })

    privateDomainRequest.post(privateDomainRequest.privateDomainEndpoint.requestSupportMail, data, (success) => {

      dispatch({
        type: PRIVATE_DOMAINE_ACTION_TYPE.SUPPORT_MAIL_LOADED,
        payload: success.data
      })
    },
      error => {
        dispatch(setCommonError(error.message))

        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.SUPPORT_MAIL_ERROR,
          payload: []
        })
      });
  }
}


export const postSupportMail = (data, id) => {
  return (dispatch) => {

    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.POST_SUPPORT_MAIL_LOADING,
      payload: [],
    })
    if (id === "ecommmerce") {
      privateDomainRequest.post(privateDomainRequest.privateDomainEndpoint.ecommerceSupportMail, data, (success) => {
        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.POST_SUPPORT_MAIL_LOADED,
          payload: success.data
        })
        dispatch(showSuccessPopup("Support Request Sent Successfully."))
      },
        error => {
          dispatch(setCommonError(error.message))

          dispatch({
            type: PRIVATE_DOMAINE_ACTION_TYPE.POST_SUPPORT_MAIL_ERROR,
            payload: []
          })
        });
    } else {
      privateDomainRequest.post(privateDomainRequest.privateDomainEndpoint.requestSupportMail, data, (success) => {
        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.POST_SUPPORT_MAIL_LOADED,
          payload: success.data
        })
        dispatch(showSuccessPopup("Support Request Sent Successfully."))
      },
        error => {
          dispatch(setCommonError(error.message))

          dispatch({
            type: PRIVATE_DOMAINE_ACTION_TYPE.POST_SUPPORT_MAIL_ERROR,
            payload: []
          })
        });
    }

  }
}

export const techSupportMail = (data) => {
  return (dispatch) => {

    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.TECH_SUPPORT_FORM_LOADING,
      payload: [],
    })

    privateDomainRequest.post(privateDomainRequest.privateDomainEndpoint.techSupport, data, (success) => {

      dispatch({
        type: PRIVATE_DOMAINE_ACTION_TYPE.TECH_SUPPORT_FORM_LOADED,
        payload: success.data
      })
      dispatch(showSuccessPopup("Technical Support Request Sent."))
    },
      error => {
        dispatch(setCommonError(error.message))

        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.TECH_SUPPORT_FORM_ERROR,
          payload: []
        })
      });
  }
}


export const PostDomainCartDetails = (data) => {
  return (dispatch) => {

    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.POST_CART_DETAILS_LOADING,
      payload: [],
    })

    privateDomainRequest.post(privateDomainRequest.privateDomainEndpoint.postCartDetails, data, (success) => {

      dispatch({
        type: PRIVATE_DOMAINE_ACTION_TYPE.POST_CART_DETAILS_LOADED,
        payload: success.data
      })
    },
      error => {
        dispatch(setCommonError(error.message))

        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.POST_USER_DETAILS_ERROR,
          payload: []
        })
      });
  }
}
export const getTldsPrice = () => {
  return (dispatch) => {

    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.GET_TLDS_PRICE_LOADING,
      payload: [],
    })

    privateDomainRequest.get(privateDomainRequest.privateDomainEndpoint.getTldsPrice, (success) => {

      dispatch({
        type: PRIVATE_DOMAINE_ACTION_TYPE.GET_TLDS_PRICE_LOADED,
        payload: success.data[0]
      })
    },
      error => {
        dispatch(setCommonError(error.message))

        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.GET_TLDS_PRICE_ERROR,
          payload: []
        })
      });
  }
}
export const postDomainSubmit = (data) => {
  return (dispatch) => {

    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.POST_DOMAIN_SUBMIT_LOADING,
      payload: [],
    })

    privateDomainRequest.post(privateDomainRequest.privateDomainEndpoint.postDomainSubmit, data, (success) => {

      dispatch({
        type: PRIVATE_DOMAINE_ACTION_TYPE.POST_DOMAIN_SUBMIT_LOADED,
        payload: success.data
      })
    },
      error => {
        dispatch(setCommonError(error.message))

        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.POST_DOMAIN_SUBMIT_ERROR,
          payload: []
        })
      });
  }
}
export const patchCreateWebsite = (insID, data) => {
  return (dispatch) => {

    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.PATCH_CREATE_WEBSITE_LOADING,
      payload: [],
    })

    privateDomainRequest.patch(privateDomainRequest.privateDomainEndpoint.patchInstitute.replace("__INS__", insID), data, (success) => {

      dispatch({
        type: PRIVATE_DOMAINE_ACTION_TYPE.PATCH_CREATE_WEBSITE_LOADED,
        payload: success
      })
    },
      error => {
        dispatch(setCommonError(error.message))

        dispatch({
          type: PRIVATE_DOMAINE_ACTION_TYPE.PATCH_CREATE_WEBSITE_ERROR,
          payload: []
        })
      });
  }
}
export const setReview = () => {
  return (dispatch) => {
    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.SET_REVIEW_LOADING,
      payload: []
    })
    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.SET_REVIEW_LOADED,
      payload: "Thanks"
    })
  }
}

// export function itemsRequestSuccess(bool) {
//   return {
//      type: ITEMS_REQUEST_SUCCESS,
//      isLoading: bool,
//   }
// }

export const getDomainAvailablityRESET = () => {
  return (dispatch) => {

    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.GET_DOMAIN_AVAILABILITY_RESET,
      payload: [],
    })
  }
}

export const postUserDetailsOffilineRESET = () => {
  return (dispatch) => {

    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.POST_USER_DETAILS_OFFLINE_RESET,
      payload: [],
    })
  }
}
export const postUserDetailsOnlineRESET = () => {
  return (dispatch) => {

    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.POST_USER_DETAILS_ONLINE_RESET,
      payload: [],
    })
  }
}
export const patchUserDetailsRESET = () => {
  return (dispatch) => {

    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.PATCH_INSTITUTE_DETAILS_RESET,
      payload: [],
    })
  }
}
export const getInstiuteDetailsRESET = () => {
  return (dispatch) => {

    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.GET_INSTITUTE_DETAILS_RESET,
      payload: [],
    })
  }
}

export const getUserDetailsRESET = () => {
  return (dispatch) => {
    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.GET_USER_DETAILS_RESET,
      payload: [],
    })
  }
}

export const getOrderDetailsRESET = () => {
  return (dispatch) => {
    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.GET_USER_DETAILS_RESET,
      payload: [],
    })
  }
}
export const postOrderRESET = () => {
  return (dispatch) => {
    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.CREATE_ORDER_RESET,
      payload: [],
    })
  }
}
export const postDomainSubmitRESET = () => {
  return (dispatch) => {
    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.POST_DOMAIN_SUBMIT_RESET,
      payload: [],
    })
  }
}
export const sendMailersRESET = () => {
  return (dispatch) => {
    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.SEND_MAILER1_RESET,
      payload: [],
    })
  }
}
export const tldspriceRESET = () => {
  return (dispatch) => {
    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.GET_TLDS_PRICE_RESET,
      payload: [],
    })
  }
}
export const postSupportMailRESET = () => {
  return (dispatch) => {
    dispatch({
      type: PRIVATE_DOMAINE_ACTION_TYPE.POST_SUPPORT_MAIL_RESET,
      payload: [],
    })
  }
}







