import {WhatsAppSupportActionTypes} from '../actions/whatsappSupport/actionTypes'
const WHATSAPP_INITIAL_STATE = {
  privateDomain: {
    data:[],
    loading:false,
    error:false,
    success:false
  }
}

const whatsAppSupport = (state = WHATSAPP_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case WhatsAppSupportActionTypes.WHATSAPP_PRIVATE_DOMAIN_LOADING :
      return {
        ...state,
        privateDomain: {
          ...state.privateDomain,
          data: {},
          loading:true,
          success:false,
          error:false
        }
      }  
  case WhatsAppSupportActionTypes.GET_WHATSAPP_PRIVATE_DOMAIN :
  return {
    ...state,
    privateDomain: {
      ...state.privateDomain,
      data: payload,
      loading:false,
      success:true,
      error:false
    }
  }  
  default:
    return state;
}
}
export default whatsAppSupport;