import React, { useState } from "react";
import AuthContainer from "../AuthContainer";
import FormInput from "../../../Common/Form/FormInput";
import AppLink from "../../../Common/AppLink";
// import BrandLogo from "../../../Common/BrandLogo";
import { useDispatch } from "react-redux";
import ForgotPasswordAction from "../../../store/actions/user/ForgotPassword";
import ValidationFile from "../ValidationFile";
import ForgotPasswordSuccess from "./ForgotPasswordSuccess";
import FormError from "../../../Common/Form/FormError";
import { setCommonError } from "../../../store/actions/commonerror";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ForgotPassword = () => {
  const [success, setSuccess] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);

  const [SubmitResponseMessage, setSubmitResponseMessage] = useState("");

  const [forgetPassword, setForgetPassword] = useState({
    email: {
      value: "",
      isValid: false,
    },
    validation: false,
  });

  const dispatch = useDispatch();

  const emailData = forgetPassword.email.value;

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let forgetPasswordData = {
      ...forgetPassword,
      [inputName]: {
        value: inputValue,
        isValid:
          ValidationFile.validEmpty(inputValue) &&
          ValidationFile.validEmail(inputValue),
      },
      validation: isFormValid(),
    };

    setForgetPassword(forgetPasswordData);

    setEmailNotFound(false);
  };
  const isFormValid = () => {
    return forgetPassword.email.isValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoginError(true);
    if (forgetPassword.validation) {
      ForgotPasswordAction.forgetPassword(
        forgetPassword.email.value,
        (success) => {
          SubmitResponse(success.data.message);
        },
        (error) => {
          dispatch(setCommonError(error.message));
        }
      );
    } else {
    }
  };

  const SubmitResponse = (message) => {
    if (message === "Password reset link sent") {
      setSuccess(true);
    } else {
      setSuccess(false);
      setEmailNotFound(true);
      setSubmitResponseMessage(message);
    }
  };
  const [ForgotPasswordToggle, SetForgotPasswordToggle] = useState(true);
  const [ChangePasswordToggle, SetChangePasswordToggle] = useState(true);
  const [ForgotPasswordOTPVerifyToggle, SetForgotPasswordOTPVerifyToggle] =
    useState(false);

  return (
    <AuthContainer>
      <div className="forgotPswdCustom">
        <div className="row center-xs">
          <div className="col-xs-12 col-md-6 col-lg-6 text-center">
            <div className="row">
              <div className="col-xs-12">
                <div className="forgotPassword">
                  {success ? (
                    <ForgotPasswordSuccess emailData={emailData} />
                  ) : (
                    <React.Fragment>
                      <div className="mt-30">
                        <h1 className="text-sm w-500">Forgot Password?</h1>
                        <p className="text-xxs mt-10">
                          No worries. Enter your email and we will send you a
                          link to reset your password.
                        </p>
                      </div>
                      {ForgotPasswordToggle && (
                        <div className="mt-25">
                          <div className="formFieldwrap">
                            <FormInput
                              className={
                                !forgetPassword.email.isValid &&
                                  showLoginError
                                  ? "errorInput"
                                  : ""
                              }
                              onChange={handleInput}
                              onKeyUp={handleInput}
                              name="email"
                              type="text"
                              label="Email"
                              placeholder="Email"
                            />
                            <FormError
                              show={
                                !forgetPassword.email.value && showLoginError
                              }
                              error="Email required."
                            />
                            <FormError
                              show={
                                !forgetPassword.email.isValid &&
                                forgetPassword.email.value &&
                                showLoginError
                              }
                              error="Email is invalid."
                            />
                            <FormError
                              show={
                                forgetPassword.email.value && emailNotFound
                              }
                              error={SubmitResponseMessage}
                            />
                          </div>
                          <button
                            className="button btn-md button-theme button-block"
                            onClick={handleSubmit}
                          >
                            Continue
                          </button>
                          <button
                            className="button btn-o-primary primary button-block mt-20"
                            onClick={() => SetForgotPasswordToggle(false)}
                          >
                            Reset with Mobile OTP
                          </button>
                        </div>
                      )}
                      {!ForgotPasswordToggle && (
                        <div className="mt-25">
                          {ChangePasswordToggle && (
                            <div className="formFieldwrap">
                              <div className="cstmPhoneInput">
                                <PhoneInput
                                  countryCodeEditable={false}
                                  containerClass="form-group"
                                  inputClass="form-control"
                                  specialLabel="hii"
                                  country={"in"}
                                  inputProps={{
                                    name: "phone",
                                    required: true,
                                    autoFocus: true,
                                  }}
                                  enableSearch
                                  disableSearchIcon
                                />
                                <label
                                  className="animLabel"
                                  htmlFor="mobile_number"
                                >
                                  Mobile Number
                                </label>
                                {ForgotPasswordOTPVerifyToggle && (
                                  <button
                                    className="btnText primary InputOverlayRightAlign"
                                    to="/"
                                  >
                                    Edit
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                          {!ChangePasswordToggle && (
                            <>
                              <div className="formFieldwrap">
                                <FormInput
                                  type="text"
                                  label="New Password"
                                  placeholder="New Password"
                                  autoCapitalize="off"
                                />
                              </div>
                              <div className="formFieldwrap">
                                <FormInput
                                  type="text"
                                  label="Confirm Password"
                                  placeholder="Confirm Password"
                                  autoCapitalize="off"
                                />
                              </div>
                              <button className="button btn-md button-theme button-block">
                                Change Password
                              </button>
                            </>
                          )}
                          {ForgotPasswordOTPVerifyToggle && (
                            <React.Fragment>
                              {ChangePasswordToggle && (
                                <>
                                  {" "}
                                  <div className="formFieldwrap">
                                    <FormInput
                                      type="text"
                                      label="One time password"
                                      placeholder="One time password"
                                      autoCapitalize="off"
                                    />
                                    <span className="ResendOTP">New OTP</span>
                                  </div>
                                  <button
                                    className="button btn-md button-theme button-block"
                                    onClick={() =>
                                      SetChangePasswordToggle(false)
                                    }
                                  >
                                    Continue
                                  </button>
                                </>
                              )}
                            </React.Fragment>
                          )}
                          {!ForgotPasswordOTPVerifyToggle && (
                            <button
                              className="button btn-sm button-primary button-block"
                              onClick={() =>
                                SetForgotPasswordOTPVerifyToggle(true)
                              }
                            >
                              Request OTP{" "}
                            </button>
                          )}
                          {ChangePasswordToggle && (
                            <button
                              className="button btn-o-primary btn-sm button-block mt-20"
                              onClick={() => SetForgotPasswordToggle(true)}
                            >
                              Reset with Email
                            </button>
                          )}
                        </div>
                      )}
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 text-center mt-20 mb-20">
                <AppLink to="/" className="underlineLink">
                  Back to Login
                </AppLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default ForgotPassword;
