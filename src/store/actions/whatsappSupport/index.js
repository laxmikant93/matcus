import { setCommonError } from "../commonerror";
import { WhatsAppSupportActionTypes } from "./actionTypes";
import WhatAppSupportRequest from "./WhatAppSupportRequest";

export const getWhatsAppPrivateDomain = (privatedomain)=>{
  return (dispatch)=>{
    dispatch({
      type: WhatsAppSupportActionTypes.WHATSAPP_PRIVATE_DOMAIN_LOADING,
      loading: true,
    });
    WhatAppSupportRequest.get(
    WhatAppSupportRequest.whatsAppEndPoint.whatsAppPrivateDomain.replace("__PRIVATEDOMAIN__",privatedomain),
    (success)=>{
      dispatch({
        type: WhatsAppSupportActionTypes.GET_WHATSAPP_PRIVATE_DOMAIN,
        payload: success.data
      })
    },
    (error)=>{
      setCommonError(error.message);
    }
    )
  }
}