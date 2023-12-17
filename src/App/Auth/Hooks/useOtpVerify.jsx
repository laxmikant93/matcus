import { useState, useEffect } from 'react'
import Request from '../../../Classes/Request';
import Validation from "../../../Classes/Validation";

const OtpVerifyRequest = new Request();
const OptValidation = new Validation();

const useOtpVerify = (mobile, otp, start, userId, code) => {
  const [otpSuccess, setOtpSuccess] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const [otpError, setOtpError] = useState(null)
  const [otpResponse, setOtpResponse] = useState({})

  const resetOtpVerify = () => {
    setOtpSuccess(false)
    setOtpLoading(false)
    setOtpError(null)
    setOtpResponse({})
  }

  useEffect(() => {

    if (start) {
      setOtpSuccess(false)
      setOtpError(false)
      setOtpResponse({})
      if (!OptValidation.lengthGraterAndEqual(otp, 6)) {
        setOtpError(true)
        setOtpLoading(false)
      }
      else {
        setOtpLoading(true)
        OtpVerifyRequest.post(
          OtpVerifyRequest.url('authService/verifyotp'),
          { "contact": mobile, otp, userId, country_code: code },
          success => {
            setOtpResponse(success.data)
            if (success.status === 200) {
              setOtpSuccess(true)
              setOtpLoading(false)
              setOtpResponse(success.data)
            }
            else {
              setOtpError(true)
              setOtpLoading(false)
            }
          },
          (error) => {
            setOtpError(true)
            setOtpLoading(false)
          }
        )
      }
    }
  },
    [mobile, otp, start, userId, code])

  return [
    otpLoading,
    otpSuccess,
    otpError,
    otpResponse,
    resetOtpVerify
  ]
}

export default useOtpVerify
