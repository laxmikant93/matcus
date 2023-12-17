import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Auth from "../../../Classes/Auth";
import Request from "../../../Classes/Request";
import Storage from "../../../Classes/Storage";
import AppLinkUrl from "../../../Common/AppLink/AppLinkUrl";
import { setLoginToStore } from "../../../store/actions/user";
import { redirectToUrl } from "../../../Constant/auth";
import { showSuccessPopup } from "../../../store/actions/successmessagepopup";
const OtpLoginRequest = new Request();

/**
 *
 * @param {*} mobile : Mobile number
 * @param {*} start : Boolean : default false
 * @returns
 */
const useSendOtp = () => {
  const [isError, seterror] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [isLoading, setloading] = useState(false);
  const [isSuccess, setsuccess] = useState(false);
  const [isPasswordLoinSuccesss, setisPasswordLoinSuccesss] = useState(false);

  const resetOtpSendStates = () => {
    setloading(false);
    setsuccess(false);
    seterror(false);
  };
  const dispatch = useDispatch();
  const location = useLocation()

  const handleLoggedInProcess = (success) => {
    // API success callback
    // if (success.data.message) {
    // ServerLoginErrorSwitch(success.data.message);
    // setServerError(true);
    // setSumited(false);
    // }
    if (success.data.data.hasOwnProperty("_id")) {
      Auth.setUserLogin(success.data); // Set Cookies of user login
      dispatch(setLoginToStore(Auth.user())); // Set Userdata to redux store
      if (location.pathname !== "/") {
        if (Storage.alive(redirectToUrl)) {
          let redirectUrl = "/";
          if (AppLinkUrl.subdomain()) {
            redirectUrl = AppLinkUrl.createSubdomain(
              AppLinkUrl.subdomain(),
              Storage.getString(redirectToUrl)
            );
          } else {
            redirectUrl = AppLinkUrl.mainBaseUrl(
              Storage.getString(redirectToUrl)
            );
          }
          Storage.remove(redirectToUrl);
          window.location.href = redirectUrl;
        } else {
          window.location.reload();
        }
      } else {
        window.location.href = "/";
      }
    }
  };

  const mobileloginpassword = (dialCode, mobile, action, privateDomainLogin, password) => {
    resetOtpSendStates();
    if (password === "") {
      seterror(true);
    } else {
      if (mobile.length <= 9 && dialCode) {
        seterror(true);
        seterrorMessage("Invalid mobile number. Please recheck and enter again.")
      } else {
        setloading(true);
        if (privateDomainLogin) {
          OtpLoginRequest.post(
            OtpLoginRequest.url("/authorization-middleware/login?type=contact_password_login", "middleware"),
            { country_code: dialCode, contact: mobile, password, action, institute_domain: AppLinkUrl.getDomainName() },
            (success) => {
              if (success.data.status === 201 && success.data.statusText === "success") {
                handleLoggedInProcess(success);
                setisPasswordLoinSuccesss(true)
                setsuccess(true);
                setloading(false);
              } else {
                seterror(true);
                if (success.data.hasOwnProperty('Details')) {
                  seterrorMessage(success.data.Details)
                } else {
                  seterrorMessage(success.data)
                }
                setloading(false);
              }
            },
            (error) => {
              seterror(true);
              seterrorMessage(error.message)
              setloading(false);
            }
          );
        } else {
          OtpLoginRequest.post(
            OtpLoginRequest.url("/authorization-middleware/login?type=contact_password_login", "middleware"),
            { country_code: dialCode, contact: mobile, password, action, },
            (success) => {
              if (success.data.data) {
                handleLoggedInProcess(success);
                setisPasswordLoinSuccesss(true)
                // setsuccess(true);
                setloading(false);
              } else {
                seterror(true);
                if (success.data.message) {
                  seterrorMessage(success.data.message);
                } else if (success.data === "Invalid Login!") {
                  seterrorMessage(success.data);
                }
                setloading(false);
              }
            },
            (error) => {
              seterror(true);
              seterrorMessage(error.message)
              setloading(false);
            }
          );
        }
      }
    }

  }
  const sendOtp = (countryCode, mobile, action, privateDomainLogin,otpSignIn,forgetPassword) => {

    // action => checkexist | checknotexist
    // checkexist => OTP for existing contact number
    // checknotexist => OTP for not existing contact number
    // if action is other than checkexist or checknotexist then send OTO on entered number

    resetOtpSendStates();
    if (mobile.length <= 9 && countryCode) {
      seterror(true);
      seterrorMessage("Invalid mobile number. Please recheck and enter again.")
    } else {
      setloading(true);
      // setTimeout(() => {
      //   setloading(false)
      //   setsuccess(true)
      // }, 2000)
      if (privateDomainLogin) {
        OtpLoginRequest.post(
          OtpLoginRequest.url("authService/private_domain_sendotp"),
          { country_code: countryCode, contact: mobile, action, institute_domain: AppLinkUrl.getDomainName() },
          (success) => {
            if (success.status === 200 && success.data.Status === "Success") {
              setsuccess(true);
              dispatch(showSuccessPopup("OTP sent successfully!"))
              setloading(false);
            } else {
              seterror(true);
              if (success.data.hasOwnProperty('Details')) {
                seterrorMessage(success.data.Details)
              } else {
                seterrorMessage(success.data)
              }

              setloading(false);
            }
          },
          (error) => {
            seterror(true);
            seterrorMessage(error.message)
            setloading(false);
          }
        );
      } else {
        OtpLoginRequest.post(
          OtpLoginRequest.url("/authorization-middleware/login?type=sendotp", "middleware"),
          { country_code: countryCode, contact: mobile, action,otpSignin:otpSignIn,forgotPassword:forgetPassword },
          (success) => {
            if (success.status === 200 && success.data.Status === "Success") {
              setsuccess(true);
              setloading(false);
              dispatch(showSuccessPopup("OTP sent successfully!"))
            } else {
              seterror(true);
              if (success.data.hasOwnProperty('Details')) {
                seterrorMessage(success.data.Details)
              } else {
                seterrorMessage(success.data)
              }
              setloading(false);
            }
          },
          (error) => {
            seterror(true);
            seterrorMessage(error.message)
            setloading(false);
          }
        );
      }

    }
  };

  useEffect(() => {
    return resetOtpSendStates;
  }, []);
  return [isLoading, isError, errorMessage, isSuccess, sendOtp, mobileloginpassword, resetOtpSendStates, handleLoggedInProcess, isPasswordLoinSuccesss];
};

export default useSendOtp;
