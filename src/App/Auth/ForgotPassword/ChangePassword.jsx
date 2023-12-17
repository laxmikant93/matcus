/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Request from "../../../Classes/Request";
import FormError from "../../../Common/Form/FormError";
// import { IconSuccessCheck } from "../../../Common/Icon";
import AppLink from "../../../Common/AppLink";
import useDownTimer from "../Hooks/useTimer";
import { useNavigate } from "react-router-dom";
import FormInputWithIcon from "../../../Common/Form/FormInputWithIcon";
import IconCheckCircle from "./icon-check-circle.svg";
import PasswordChangeSuccess from "./PasswordChangeSuccess";
const forgotPasswordRequest = new Request();

const ChangePassword = React.memo(({ countrycode, mobile }) => {
  const resText = "Password changed"; // Response text
  const [loading, setLoading] = useState(false); // Loading
  const [error, setError] = useState(null); // Error to show
  const [success, setSuccess] = useState(false); // Success status
  const [showError, setshowError] = useState(false); // change to true, to show error messages
  const [timer, setTimer] = useDownTimer(2500); // Timmer
  const history = useNavigate();
  // Input capture
  const [password, setpassword] = useState(""); // Password Input
  const [cpassword, setcpassword] = useState(""); // Confirm Password Input

  // Validation
  const changePasswordValidation = () => {
    let errorStatus = true;
    if (password !== "" && cpassword !== "") {
      errorStatus = false;
      if (password.length < 4) {
        // Password must be 4 char. long
        setError("Password is short.");
      } else if (password !== cpassword) {
        // Password and confirm password must match
        setError("Password missmatch.");
      } else {
        setError("");
        errorStatus = true;
      }
    } else {
      errorStatus = false;
    }
    return errorStatus;
  };

  // Form submit
  const handleSubmitPassword = (evt) => {
    evt.preventDefault();
    setshowError(true);
    if (changePasswordValidation()) {
      setLoading(true);
      forgotPasswordRequest.post(
        forgotPasswordRequest.url("/authorization-middleware/resetpassword", "middleware"),
        {
          country_code: countrycode,
          contact: mobile,
          password: password,
        },
        (success) => {
          if (
            success.data.hasOwnProperty("message") &&
            success.data.message === resText
          ) {
            setSuccess(true);
            setLoading(false);
            setTimer(5); // Call down timer for 5s
          } else {
            setLoading(false);
            setshowError(true);
            setError(success.data.Details);
          }
        },
        (error) => {
          setshowError(true);
          setLoading(false);
          setError(error.message);
        }
      );
    }
  };

  // Redirection
  useEffect(() => {
    if (timer === "1s") {
      history("/auth/login");
    }
  }, [history, timer]);

  // Resetting states
  useEffect(() => {
    return () => {
      setLoading(false);
      setError(null);
      setSuccess(false);
      setshowError(false);
      setpassword("");
      setcpassword("");
    };
  }, []);
  return (
    <React.Fragment>
      {success ? (
        <PasswordChangeSuccess />
      ) : (
        <form onSubmit={handleSubmitPassword}>
          <h1 className="text-sm w-500">Reset Password</h1>
          <div className="formFieldwrap mt-40">
            <FormInputWithIcon
              type="password"
              label="New Password"
              placeholder="New Password"
              autoCapitalize="off"
              onKeyUp={(evt) => setpassword(evt.target.value)}
              onChange={(evt) => setpassword(evt.target.value)}
            />
            <FormError
              show={showError && password === ""}
              error="Please enter password."
            />
          </div>
          <div className="formFieldwrap">
            <FormInputWithIcon
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              autoCapitalize="off"
              onKeyUp={(evt) => setcpassword(evt.target.value)}
              onChange={(evt) => setcpassword(evt.target.value)}
            />
            <FormError
              show={showError && cpassword === ""}
              error="Please enter confirm password."
            />
            <FormError show={showError && error !== ""} error={error} />
          </div>
          {loading ? (
            <button type="button" className="button btn-md button-theme button-block mb-30">
              Loading...<div className='loader loader25'></div>
            </button>
          ) : (
            <button type="submit" className="button btn-md button-theme button-block mb-30">
              Change Password
            </button>
          )}
        </form>
      )}
    </React.Fragment>
  );
});
export default ChangePassword;
