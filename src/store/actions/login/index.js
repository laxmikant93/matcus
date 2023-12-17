import { setCommonError } from "../commonerror"
import { LOGINTYPES } from "./actionType"
import LoginRequest from "./LoginRequest"

export const emailLogin = (data)=>{
  return(dispatch)=>{
    dispatch({
      type:LOGINTYPES.EMAIL_LOGIN_LOADING
    })
    LoginRequest.post(LoginRequest.loginEndpoint.emailLogin,
      data,
      (success)=>{
        dispatch({
          type:LOGINTYPES.EMAIL_LOGIN_SUCCESS,
          payload:success.data
        })
      },(error)=>{
        setCommonError(error.message)
      }
    )
  }
}