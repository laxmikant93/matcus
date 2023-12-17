import React, { useEffect, useState } from "react";
import FormInput from "../../../Common/Form/FormInput";
import { useDispatch } from "react-redux";
import ForgotPasswordAction from "../../../store/actions/user/ForgotPassword";
import ValidationFile from "../ValidationFile";
import ForgotPasswordSuccess from "./ForgotPasswordSuccess";
import FormError from "../../../Common/Form/FormError";
import { setCommonError } from "../../../store/actions/commonerror";
import { func } from "prop-types";
import AppLinkUrl from "../../../Common/AppLink/AppLinkUrl";

const ForgotPasswordEmail = ({ onMailSent }) => {
  const [success, setSuccess] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);

  useEffect(() => {
    if (AppLinkUrl.privateDomain()) {
      setPrivateDomainLogin(true);
    }
  }, []);

  const [privateDomainLogin, setPrivateDomainLogin] = useState(false);
  const [SubmitResponseMessage, setSubmitResponseMessage] = useState("");
  const [loadingState, setLoadingState] = useState(false);
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
      setLoadingState(true);
      if (privateDomainLogin) {
        ForgotPasswordAction.privateDomainForgetPassword(
          forgetPassword.email.value.toLowerCase(),
          AppLinkUrl.getDomainName(),
          (success) => {
            SubmitResponse(success.data.message);
          },
          (error) => {
            dispatch(setCommonError(error.message));
          }
        );
      } else {
        ForgotPasswordAction.forgetPassword(
          forgetPassword.email.value.toLowerCase(),
          (success) => {
            SubmitResponse(success.data.message);
          },
          (error) => {
            dispatch(setCommonError(error.message));
          }
        );
      }
    } else {
    }
  };

  const SubmitResponse = (message) => {
    if (message === "Password reset link sent") {
      setSuccess(true);
      onMailSent(true);
      setLoadingState(false);
    } else {
      setSuccess(false);
      onMailSent(false);
      setLoadingState(false);
      setEmailNotFound(true);
      setSubmitResponseMessage(message);
    }
  };
  return (
    <div className="forgotPassword">
      {success ? (
        <ForgotPasswordSuccess emailData={emailData} />
      ) : (
        <React.Fragment>
          <div className="formFieldwrap">
            <FormInput
              className={
                !forgetPassword.email.isValid && showLoginError
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
              show={!forgetPassword.email.value && showLoginError}
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
              show={forgetPassword.email.value && emailNotFound}
              error={SubmitResponseMessage}
            />
          </div>
          {loadingState ? (
            <button className="button btn-sm button-primary button-block">
              Loading...<div className='loader loader25'></div>
            </button>
          ) : (
            <button
              className="button btn-sm button-primary button-block"
              onClick={handleSubmit}
            >
              Continue
            </button>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

ForgotPasswordEmail.defaultProps = {
  onMailSent: () => { },
};

ForgotPasswordEmail.defaultProps = {
  onMailSent: func,
};

export default ForgotPasswordEmail;
