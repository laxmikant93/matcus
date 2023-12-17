/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { oneOf } from "prop-types";
import FormError from "../../../Common/Form/FormError";
import FormInput from "../../../Common/Form/FormInput";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useEffect } from "react";
import useSendOtp from "../Hooks/useSendOtp";
import useVerifyOtp from "../Hooks/useVerifyOtp";
import useSetLogin from "../Hooks/useSetLogin";
import ResendOtp from "./ResendOtp";
import CreateAccountOtp from "../CreateAccount/CreateAccountOtp";
import { CreateAccountContext } from "../../../Context/CreateAccountContext";
import { forgetPasswordContext } from "../../../Context/ForgotPasswordContext";
import ChangePassword from "../ForgotPassword/ChangePassword";
import AppLinkUrl from "../../../Common/AppLink/AppLinkUrl";
import { useSelector } from "react-redux";
import FormInputWithIcon from "../../../Common/Form/FormInputWithIcon";
import FailIcon from "./fail.svg";
import SuccessIcon from "./success.svg";
import ReactGA from "react-ga"
const options = ["login", "signup", "forgotpassword"];

const RequestOtp = ({ option }) => {
  const { InstituteDetails } = useSelector((state) => {
    return {
      InstituteDetails: state.institutewebsite.data,
    };
  });

  useEffect(() => {
    if (AppLinkUrl.privateDomain()) {
      setPrivateDomainLogin(true);
    }
  }, []);
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);
  const [PasswordArr] = useState([" "]);
  const [privateDomainLogin, setPrivateDomainLogin] = useState(false);
  const forgotPassContext = useContext(forgetPasswordContext);
  const createAccContext = useContext(CreateAccountContext);
  const [mobile, setmobile] = useState(""); // Mobile input
  const [dialCode, setdialCode] = useState("91");
  const [edit, setedit] = useState(false); // Mobile input
  const [requestSubmit, setRequestSubmit] = useState(false);
  const [password, setPassword] = useState("");

  // Request OTP
  const [
    isLoading,
    isError,
    otpErrorMessage,
    isSuccess,
    sendOtp,
    mobileloginpassword,
    resetOtpState,
    ,
    isPasswordLoinSuccesss,
  ] = useSendOtp();
  // Handle form submit to get the OTP
  const handleGetOtp = (evt) => {
    evt.preventDefault();
    ReactGA.event({
      category: "OTP",
      action: "Request OTP",
      label: "Request BUTTON",
    })
    if (togglePasswordType === "password" && window.location.pathname.includes("auth/login")) {
      let action = "contactpasswordlogin";

      mobileloginpassword(dialCode, mobile, action, privateDomainLogin, password)
    } else {
      let action = "checkexist";
      if (options.includes(option)) {
        if (option === options[1]) {
          // signup
          action = "checknotexist";
        }
      } else {
        action = "other";
      }

      sendOtp(dialCode, mobile, action, privateDomainLogin, false,true);
      setRequestSubmit(true);
      setSubmitOtp(false);
    }

    //action selection

  };

  // Mobile Input Error
  const mobileError = () => {
    return isError
      ? mobile !== ""
        ? otpErrorMessage
        : <>{`Please enter your mobile number to ${option === "forgotpassword" ? "reset password" : option}.`}</>
      : "";
  };
  // OTP Varification
  const [otp, setOtp] = useState("");
  const [submitOtp, setSubmitOtp] = useState(false);
  const [togglePasswordType, SetTogglePasswordType] = useState("password");
  const [otpLoading, otpSuccess, otpError, otpResponse] = useVerifyOtp(
    mobile,
    otp,
    dialCode,
    submitOtp,
    privateDomainLogin,
    InstituteDetails
  );
  // if (option === options[0] || option === options[1]) {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   useSetLogin(otpResponse, otpSuccess);
  // }

  const onChangeOtp = (value) => {
    if (value.toString().length > 6) {

    } else {

      setOtp(value)
    }

  }
  const handleOtpLogin = (evt) => {
    evt.preventDefault();
    setSubmitOtp(true);
  };

  const handleOtpEdit = () => {
    resetOtpState();
    // setmobile("");
    setRequestSubmit(false);
    setedit(true);
    if (option === options[1]) {
      createAccContext.setShowRole({ showRole: true });
    }
  };

  const handlePhoneInput = (countryDetail, inputValue) => {
    if (inputValue) {
      resetOtpState();
      const { dialCode } = countryDetail;
      let mobile = inputValue.replace(dialCode, "");
      setdialCode(dialCode);
      setmobile(mobile);
    }
  };

  useEffect(() => {
    if (otpError) {
      setSubmitOtp(false);
    }

    if (otpSuccess) {
      if (option === options[2]) {
        forgotPassContext.hideHeader(false);
      }

      setSubmitOtp(false);
    }
  }, [otpSuccess, otpError, option, forgotPassContext]);

  useEffect(() => {
    if (isError) {
      setRequestSubmit(false);
      setedit(false);
    }

    if (isSuccess) {
      if (option === "signup") {
        createAccContext.showRole.showRole &&
          createAccContext.setShowRole({ showRole: false });
      }
      setRequestSubmit(false);
      setedit(false);
    }
  }, [createAccContext, isError, isLoading, isSuccess, option]);

  // Reset values and validation as default
  useEffect(() => {
    return () => {
      setRequestSubmit(false);
      setSubmitOtp(false);
    };
  }, []);

  // If any other option passed through the option prop
  if (options.indexOf(option) < 0) {
    return <React.Fragment></React.Fragment>;
  }

  // No option available
  if (!option) {
    return <React.Fragment></React.Fragment>;
  }

  const managePasswordType = (item) => {
    SetTogglePasswordType(item);
  };
  const onChangePassword = (e) => {

    let Value = e.target.value;
    setPassword(Value)
  }


  return (
    <div className="Login_OTP">
      {isSuccess && !edit && option === options[1] ? ( // Signup
        <CreateAccountOtp
          countryCode={dialCode}
          mobile={mobile}
          editAction={handleOtpEdit}
        />
      ) : isSuccess && !edit && option === options[2] ? ( // forgot password
        otpSuccess ? (
          <ChangePassword countrycode={dialCode} mobile={mobile} />
        ) : (
          <form onSubmit={(evt) => handleOtpLogin(evt)}>
            <div className="formFieldwrap">
              <div className="cstmPhoneInput">
                <PhoneInput
                  countryCodeEditable={false}
                  onChange={(value, country, e, formattedValue) => {
                    handlePhoneInput(country, value);
                  }}
                  disabled={true}
                  containerClass="form-group"
                  inputClass="form-control"
                  specialLabel
                  country={"in"}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                    placeholder: "Enter mobile",
                  }}
                  value={`${dialCode}${mobile} `}
                  enableSearch
                  searchPlaceholder="Search Country"
                  disableSearchIcon
                />
                <label className="animLabel" htmlFor="mobile_number">
                  Mobile Number*
                </label>
                <button
                  className="btnText primary InputOverlayRightAlign"
                  name="editotp"
                  onClick={handleOtpEdit}
                >
                  Edit
                </button>
              </div>
              <FormError
                show={isError}
                error="Invalid mobile number. Please recheck and enter again"
                className="mt-10"
              />
            </div>

            <div className="formFieldwrap">
              <FormInput
                label="OTP"
                placeholder="One time password"
                autoFocus={true}
                type="number"
                minLength={6}
                onKeyUp={(evt) => onChangeOtp(evt.target.value)}
                onChange={(evt) => onChangeOtp(evt.target.value)}
                onWheel={(e) => e.target.blur()}
                onKeyDown={(e) =>
                  symbolsArr.includes(e.key) && e.preventDefault()
                }
                value={otp}
              />
              <FormError
                show={otpError}
                error="Invalid OTP. Please try again"
              />
            </div>
            <ResendOtp countrycode={dialCode} mobile={mobile} />
            {otpLoading ? (
              <button
                type="button"
                className="button btn-sm button-primary button-block mt-10"
              >
                Veryfing OTP...
              </button>
            ) : (
              <button
                type="submit"
                className="button btn-sm button-primary button-block mt-10"
              >
                Verify OTP
              </button>
            )}
          </form>
        )
      ) : isSuccess && !edit ? (
        <form onSubmit={(evt) => handleOtpLogin(evt)}>
          <div className="formFieldwrap">
            <div className="cstmPhoneInput">
              <PhoneInput
                countryCodeEditable={false}
                onChange={(value, country, e, formattedValue) => {
                  handlePhoneInput(country, value);
                }}
                disabled={true}
                containerClass="form-group"
                inputClass="form-control"
                specialLabel
                country={"in"}
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: true,
                  placeholder: "Enter mobile",
                }}
                enableSearch
                searchPlaceholder="Search Country"
                disableSearchIcon
                value={`${dialCode}${mobile} `}
              />
              <label className="animLabel" htmlFor="mobile_number">
                Mobile Number*
              </label>
              <button
                className="btnText primary InputOverlayRightAlign"
                name="editotp"
                onClick={handleOtpEdit}
              >
                Edit
              </button>
            </div>
            <FormError
              show={isError}
              error="Invalid mobile number. Please recheck and enter again"
              className="mt-10"
            />
          </div>

          <div className="formFieldwrap">
            <FormInput
              label="OTP"
              placeholder="One time password"
              autoFocus={true}
              type="number"
              minLength={6}
              onKeyUp={(evt) => onChangeOtp(evt.target.value)}
              onChange={(evt) => onChangeOtp(evt.target.value)}
              onWheel={(e) => e.target.blur()}
              onKeyDown={(e) =>
                symbolsArr.includes(e.key) && e.preventDefault()
              }
              value={otp}
            />
            <FormError show={otpError} error="Invalid OTP. Please try again" />
          </div>
          <ResendOtp countrycode={dialCode} mobile={mobile} />
          {otpSuccess ? (
            <button
              type="button"
              className="button btn-sm button-primary button-block mt-10"
            >
              Logged in successfully !!
            </button>
          ) : otpLoading ? (
            <button
              type="button"
              className="button btn-sm button-primary button-block mt-10"
            >
              Veryfing OTP...
            </button>
          ) : (
            <button
              type="submit"
              className="button btn-sm button-primary button-block mt-10"
            >
              Login
            </button>
          )}
        </form>
      ) : (
        <form onSubmit={(evt) => handleGetOtp(evt)}>
          <div className="formFieldwrap">
            <div className="cstmPhoneInput">
              <PhoneInput
                countryCodeEditable={false}
                onChange={(value, country, e, formattedValue) => {
                  handlePhoneInput(country, value);
                }}
                disabled={requestSubmit && !isError}
                containerClass="form-group"
                inputClass="form-control"
                specialLabel
                country={"in"}
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: true,
                  placeholder: "Enter mobile",
                }}
                enableSearch
                searchPlaceholder="Search Country"
                disableSearchIcon
                value={`${dialCode}${mobile} `}
              />
              <label className="animLabel" htmlFor="mobile_number">
                Mobile Number*
              </label>
            </div>
            <FormError show={isError} error={mobileError() === "Incorrect Password." || mobileError() === "Invalid Credentials." ? "" : mobileError()} />
          </div>
          {
            window.location.pathname.includes("auth/login") &&
            <div className="input-custom-type inline mb-20">
              <label className="small w-600">
                <input
                  type="radio"
                  value="password"
                  checked={togglePasswordType === "password"}
                  onChange={(e) => managePasswordType("password")}
                />
                Password
              </label>
              <label className="small w-600">
                <input
                  type="radio"
                  value="otp"
                  checked={togglePasswordType === "otp"}
                  onChange={(e) => managePasswordType("otp")}
                />
                OTP
              </label>
            </div>
          }

          {togglePasswordType === "password" && window.location.pathname.includes("auth/login") && (
            <div className="formFieldwrap">
              <FormInputWithIcon type="password" label="Password*" placeholder="Password" value={password} onChange={(e) => onChangePassword(e)} onKeyDown={(e) =>
                PasswordArr.includes(e.key) && e.preventDefault()
              } />
              <FormError show={isError && password === ""} error={"Password is required."} />
              <FormError show={isError && password !== ""} error={mobileError() === "Please enter your mobile number to login." || mobileError() === "Invalid mobile number. Please recheck and enter again." || mobileError() === "Invalid number. Please recheck and enter again." ? "" : mobileError()} />
            </div>
          )}
          {/* {togglePasswordType === "otp" && (
            <React.Fragment>
              <div className="formFieldwrap">
                <FormInput type="text" placeholder="OTP" />
                <div className="otp-login-wrapper">
                  <div className="otp-login-cst">
                    <div className="otp-verify-denied-message">
                      <img src={FailIcon} alt="Fail Icon" />
                      Incorrect OTP entered
                    </div>
                    <button
                      type="button"
                      className="btnText text-2xs w-600 primary"
                    >
                      RESEND OTP
                    </button>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )} */}
          {isLoading ? (
            <button
              type="button"
              className="button btn-sm button-primary button-block mt-10"
            >
              Loading...
            </button>
          ) : (
            <React.Fragment>
              {isPasswordLoinSuccesss ? (
                <button
                  type="button"
                  className="button btn-sm button-primary button-block mt-10"
                >
                  Logged in successfully !!
                </button>
              ) : (togglePasswordType === "password" && window.location.pathname.includes("auth/login") ? (
                <button
                  type="submit"
                  className="button btn-sm button-primary button-block mt-10"
                >
                  Login
                </button>
              ) : (
                <button
                  type="submit"
                  className="button btn-sm button-primary button-block mt-10"
                >
                  Request OTP
                </button>))
              }
            </React.Fragment>

          )}
        </form>
      )}
    </div>
  );
};

RequestOtp.defaultProps = {
  option: undefined,
};

RequestOtp.propTypes = {
  option: oneOf(options).isRequired,
};

export default RequestOtp;
