/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AuthContainer from "../AuthContainer";
import FormInputWithIcon from "../../../Common/Form/FormInputWithIcon";
import BrandLogo from "../../../Common/BrandLogo";
import PasswordChangeSuccess from "./PasswordChangeSuccess";
import ValidationFile from "../ValidationFile";
import ForgotPassword from "../../../store/actions/forgotpassword/ForgotPassword";
import FormError from "../../../Common/Form/FormError";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setCommonError } from "../../../store/actions/commonerror";
import AppLinkUrl from "../../../Common/AppLink/AppLinkUrl";
import AuthLayout from "../AuthLayout";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [SubmitResponseMessage, setSubmitResponseMessage] = useState("");
  const [PasswordnotMatch, setPasswordnotMatch] = useState(false);
  const { verificationcode } = useParams();

  useEffect(() => {
    if (AppLinkUrl.privateDomain()) {
      setPrivateDomainLogin(true);
    }
  }, []);

  const [privateDomainLogin, setPrivateDomainLogin] = useState(false);
  const [resetPassword, setResetPassword] = useState({
    password: {
      value: "",
      isValid: false,
    },
    confirmpassword: {
      value: "",
      isValid: false,
    },
    edneedapiKey: {
      value: "",
      isValid: false,
    },
    validation: false,
  });
  const [showLoginError, setShowLoginError] = useState(false);
  const [ErrorShow, setErrorShow] = useState(false);
  const [RegExPassword, setRegExPassword] = useState(false);

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    let setResetPasswordData = {
      ...resetPassword,
      [inputName]: {
        value: inputValue,
        isValid: ValidationFile.validEmpty(inputValue),
      },
      validation: isFormValid(),
    };
    setResetPassword(setResetPasswordData);

    setRegExPassword(false);
    setPasswordnotMatch(false);
  };
  const isFormValid = () => {
    return resetPassword.password.isValid &&
      resetPassword.confirmpassword.isValid
      ? true
      : false;
  };

  // useEffect(() => {

  //   // const key = Encryption.encode("useredneed_987");

  // }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoginError(true);
    const confirmSamePassword = ValidationFile.samePassword(
      resetPassword.password.value,
      resetPassword.confirmpassword.value
    );
    // if ((ValidationFile.ValidPassword(resetPassword.password.value) && ValidationFile.ValidPassword(resetPassword.confirmpassword.value))) {
    if (resetPassword.password.value.length > "3") {
      setRegExPassword(false);

      if (resetPassword.validation && confirmSamePassword) {
        setPasswordnotMatch(false);
        if (privateDomainLogin) {
          ForgotPassword.privateDomainrRegisterPassword(
            resetPassword.password.value,
            verificationcode,
            AppLinkUrl.getDomainName(),
            (success) => {
              SubmitResponse(success.data.message);
            },
            (error) => {
              dispatch(setCommonError(error.message));
              SubmitResponse(error.data.message);
            }
          );
        } else {
          ForgotPassword.registerPassword(
            resetPassword.password.value,
            verificationcode,
            (success) => {
              SubmitResponse(success.data.message);
            },
            (error) => {
              dispatch(setCommonError(error.message));
              SubmitResponse(error.data.message);
            }
          );
        }
      } else {
        if (resetPassword.password.isValid) {
          setPasswordnotMatch(true);
        } else {
        }
      }
    } else {
      setRegExPassword(true);
    }
  };
  const SubmitResponse = (message) => {
    if (message === "Password changed") {
      setSuccess(true);
    } else {
      setSuccess(false);
      setSubmitResponseMessage(message);
      setErrorShow(true);
    }
  };

  return (
    <AuthLayout>
      {success ? (
        <PasswordChangeSuccess />
      ) : ErrorShow ? (
        // <div className="row center-md middleContentPlacement">
        //   <div className="col-xs-12 col-md-4 col-lg-3 text-left">
        //     <div className="row">
        //       <div className="col-xs-12 center-xs">

        <div className="succesCheckIconCst">
          <div className="mt-30">
            <div>
              <h2 className="text-sm w-300 secondary mt-3 red">
                {SubmitResponseMessage}
              </h2>
            </div>
            <br></br>
          </div>
        </div>
      ) : (
        <React.Fragment>
          {/* <div className="forgotPswdCustom">
            <div className="pageFullCenter">
              <div className="row center-md">
                <div className="col-xs-12 col-md-4 text-center">
                  <div className="row">
                    <div className="col-xs-12"> */}
          <div className="forgotPassword">
            <BrandLogo />
            <div className="mt-30">
              <h2 className="text-sm secondary w-300">
                You're almost done!
              </h2>
              <h5 className="text-xs w-300 gray">
                Reset Password
              </h5>
            </div>
            <div className="mt-30">
              <div className="formFieldwrap">
                <FormInputWithIcon
                  className={
                    !resetPassword.password.isValid &&
                      showLoginError
                      ? "errorInput"
                      : ""
                  }
                  name="password"
                  onChange={handleInput}
                  onKeyUp={handleInput}
                  type="password"
                  label="New Password"
                  placeholder="* New password"
                />
                <FormError
                  show={
                    !resetPassword.password.isValid &&
                    showLoginError
                  }
                  error="Password is required."
                />
                {/* <FormError show={(RegExPassword && showLoginError)} error="Min. 4 characters should be there.." /> */}
                {/* <FormError show={(RegExPassword && resetPassword.password.isValid)} error="Min. 4 characters should be there." /> */}
              </div>
              <div className="formFieldwrap">
                <FormInputWithIcon
                  className={
                    !resetPassword.confirmpassword.isValid &&
                      showLoginError
                      ? "errorInput"
                      : ""
                  }
                  name="confirmpassword"
                  onChange={handleInput}
                  onKeyUp={handleInput}
                  type="password"
                  label="Confirm password"
                  placeholder="* Confirm password"
                />
                <FormError
                  show={
                    !resetPassword.confirmpassword.isValid &&
                    showLoginError
                  }
                  error="Confirm Password is required."
                />
                <FormError
                  show={PasswordnotMatch && showLoginError}
                  error="Password does not match."
                />
                {/* <FormError show={(RegExPassword && showLoginError)} error="Min. 4 characters should be there.." /> */}
                <FormError
                  show={
                    RegExPassword &&
                    resetPassword.confirmpassword.isValid
                  }
                  error="Min. 4 characters should be there."
                />
              </div>
              <button
                className="button btn-md button-theme button-block mt-15"
                onClick={handleSubmit}
              >
                Change Password
              </button>
            </div>
          </div>
          {/* </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </React.Fragment>
      )}
    </AuthLayout>
  );
};
export default ResetPassword;
