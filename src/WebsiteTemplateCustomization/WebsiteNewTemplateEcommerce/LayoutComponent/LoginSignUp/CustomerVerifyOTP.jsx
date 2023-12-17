import { useState } from 'react'
import { useEffect } from 'react'
import Request from '../../../../Classes/Request';
import Validation from "../../../../Classes/Validation";
import AppLinkUrl from '../../../../Common/AppLink/AppLinkUrl';
const OtpVerifyRequest = new Request();
const OptValidation = new Validation();

const CustomerVerifyOTP = (mobile, otp, countryCode, start, privateDomainLogin, InstituteDetails, type) => {
  const [otpSuccess, setOtpSuccess] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const [otpError, setOtpError] = useState(null)
  const [otpResponse, setOtpResponse] = useState({})
  const [wrongOTP, setWrongOTP] = useState("");



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
        // setTimeout(() => {
        //   setOtpSuccess(true)
        //   setOtpLoading(false)
        // }, 2000)
        if (privateDomainLogin) {
          OtpVerifyRequest.post(
            OtpVerifyRequest.url(`/${type}-authorization/Privatelogin?domain=${AppLinkUrl.getHost()}&type=private_domain_otplogin`, `${type === "e" ? "ecommerce" : ""}`),
            { "contact": mobile, otp, country_code: countryCode, institute_domain: AppLinkUrl.getDomainName() },
            success => {
              setOtpResponse(success.data)
              if (success.status === 200 && success.data.status === 201) {
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
        } else {
          OtpVerifyRequest.post(
            OtpVerifyRequest.url(`/${type}-authorization/Privatelogin?subdomain=${AppLinkUrl.subdomain()}&type=private_domain_otplogin`, `${type === "e" ? "ecommerce" : ""}`),
            { "contact": mobile, otp, country_code: countryCode },
            success => {
              setOtpResponse(success.data)
              if (success.status === 200 && success.statusText === "OK" && success.data.data) {
                setOtpSuccess(true)
                setOtpLoading(false)
                setOtpResponse(success.data)
                setWrongOTP("");
              }
              else {
                setOtpError(true);
                setOtpLoading(false);
                setWrongOTP(success.data);
              }
            },
            (error) => {
              setOtpError(true)
              setOtpLoading(false)
              setWrongOTP("OTP INCORRECT");
            }
          )
        }
      }
    }
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [countryCode, mobile, otp, start])

  return [
    otpLoading,
    otpSuccess,
    otpError,
    otpResponse,
    wrongOTP
  ]
}

export default CustomerVerifyOTP;
