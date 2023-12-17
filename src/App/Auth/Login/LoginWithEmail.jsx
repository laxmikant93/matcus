import React, { useEffect, useState } from "react";
// import AppLink from "../../../Common/AppLink";
import FormInput from "../../../Common/Form/FormInput";
import FormInputWithIcon from "../../../Common/Form/FormInputWithIcon";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Storage from "../../../Classes/Storage";
import Auth from "../../../Classes/Auth";
import AppLinkUrl from "../../../Common/AppLink/AppLinkUrl";
import { redirectToUrl } from "../../../Constant/auth";
import { setLoginToStore } from "../../../store/actions/user";
import UserRequest from "../../../store/actions/user/UserRequest";
import ValidationFile from "../ValidationFile";
import FormError from "../../../Common/Form/FormError";
// import GoogleLoginSingup from "./GoogleLoginSingup";
import { setCommonError } from "../../../store/actions/commonerror";
import { showSuccessPopup } from "../../../store/actions/successmessagepopup";
import { bool, func } from "prop-types";
import ReactGA from 'react-ga'
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import LoginMobileVerification from "./LoginMobileVerification";

const LoginWithEmail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const kind = "email";
  ReactGA.event({
    category: "LogIn",
    action: "Click",
    label: "LogIn",
  })

  useEffect(() => {
    if (AppLinkUrl.privateDomain()) {
      setPrivateDomainLogin(true);
    }
  }, []);

  const [serverErrorLogin, setserverErrorLogin] = useState("");
  const [privateDomainLogin, setPrivateDomainLogin] = useState(false);
  const [login, setLoginData] = useState({
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
    validation: false,
  });

  const [formSubmit, setSumited] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);
  const [serverError, setServerError] = useState(false);

  const hideLoginForm = false;

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    let loginData = {
      ...login,
      [inputName]: {
        value: inputValue,
        isValid: validationConfirm(inputValue, inputName),
      },
      validation: isFormValid(),
    };

    setLoginData(loginData);
    setServerError("");
  };

  const isFormValid = () => {
    return login.email.isValid && login.password.isValid ? true : false;
  };
  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "email":
        return ValidationFile.validEmail(inputValue);

      case "password":
        return ValidationFile.validEmpty(inputValue);

      default:
        return false;
    }
  };

  const handleLoggedInProcess = (success) => {
    // API success callback
    if (success.data.message) {
      ServerLoginErrorSwitch(success.data.message);
      setServerError(true);
      setSumited(false);
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoginError(true);
    setSumited(true);
    if (login.validation) {
      if (privateDomainLogin) {
        UserRequest.PrivateDomainlogin(
          login.email.value.toLowerCase(),
          AppLinkUrl.getDomainName(),
          login.password.value,
          kind,
          handleLoggedInProcess,
          (error) => { }
        );
      } else {
        UserRequest.login(
          login.email.value.toLowerCase(),
          login.password.value,
          kind,
          handleLoggedInProcess,
          (error) => { }
        );
      }
    } else {
      setSumited(false);
    }
  };

  const ServerLoginErrorSwitch = (message) => {
    switch (message) {
      case "Incorrect Password":
        setserverErrorLogin("Incorrect Password.");
        break;
      case "Invalid Login":
        setserverErrorLogin("Invalid Login.");
        break;
      default:
        setserverErrorLogin(message);
    }
  };
  const resendMail = () => {
    UserRequest.resendVerification(
      { action: "resendverification", email: login.email.value },
      (success) => {
        dispatch(
          showSuccessPopup("confirmation link has been send successfully !")
        );
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
  const [PasswordArr] = useState([" "]);
  return (
    <React.Fragment>
      {hideLoginForm === false && (
        <React.Fragment>
          <form onSubmit={handleSubmit}>
            <div className="formFieldwrap">
              <FormInput
                className={
                  !login.email.isValid && showLoginError
                    ? "lowercase errorInput"
                    : "lowercase"
                }
                name="email"
                type="text"
                label="Email"
                onChange={handleInput}
                onKeyUp={handleInput}
                placeholder="Email"
                autoCapitalize="off"
                onKeyDown={(e) =>
                  PasswordArr.includes(e.key) && e.preventDefault()
                }
              />
              <FormError
                show={!login.email.value && showLoginError}
                error="Email required."
              />
              <FormError
                show={
                  !login.email.isValid && login.email.value && showLoginError
                }
                error="Email is invalid"
              />
            </div>
            <div className="formFieldwrap">
              <FormInputWithIcon
                className={
                  !login.password.isValid && showLoginError ? "errorInput" : ""
                }
                name="password"
                // id="login_password"
                type="password"
                onChange={handleInput}
                onKeyUp={handleInput}
                label="Password"
                placeholder="Password"
                onKeyDown={(e) =>
                  PasswordArr.includes(e.key) && e.preventDefault()
                }
              />
              <FormError
                show={!login.password.isValid && showLoginError}
                error="Password required."
              />
              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <FormError
                  show={serverError && showLoginError}
                  error={serverErrorLogin}
                />

                {serverErrorLogin === "Email Verification is Pending" ? (
                  <button
                    type="button"
                    className="btnText primary mt-3"
                    style={{ position: "absolute", right: "0" }}
                    onClick={resendMail}
                  >
                    <u>Resend mail</u>
                  </button>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
            <button
              type={formSubmit ? "button" : "submit"}
              className="button btn-md button-theme button-block"
            >
              {formSubmit ? "Logging In..." : "Login"}
            </button>
          </form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

LoginWithEmail.defaultProps = {
  hideGoogleLogin: false,
  hideForgetPassword: false,
  hideSignup: false,
  hideLoginPopup: () => { },
};

LoginWithEmail.propTypes = {
  hideGoogleLogin: bool,
  hideForgetPassword: bool,
  hideSignup: bool,
  hideLoginPopup: func,
};

export default LoginWithEmail;
