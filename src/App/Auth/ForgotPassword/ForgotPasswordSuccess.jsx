import React, { useState } from "react";
import ForgotPassword from "../../../store/actions/user/ForgotPassword";
import { useDispatch } from "react-redux";
import { setCommonError } from "../../../store/actions/commonerror";
const ForgotPasswordSuccess = ({ emailData }) => {
  const dispatch = useDispatch();
  const [ResendSuccess, setResendSuccess] = useState(false);

  const resendEmail = () => {
    ForgotPassword.forgetPassword(
      emailData,
      (success) => {
        setResendSuccess(true);
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };

  return (
    <React.Fragment>
      <div className="mt-30">
        <h3 className="text-sm w-400 capitalize">Check your email</h3>
        <p className="text-xs">
          We have sent password recover instructions to your email.
        </p>
      </div>
      <div className="mt-30">
        <p className="text-xxs mb-5">Didn't receive the email?</p>
        <button
          onClick={resendEmail}
          className="button btn-sm btn-o-silver mt-3 mb-20"
        >
          Resend Now <i className="animate-r-arrow-icon"></i>
        </button>
        <br></br>
        {ResendSuccess ? (
          <p className="mt-10 text-xxs mb-30">Email sent again. Please check your inbox</p>
        ) : (
          <p></p>
        )}
      </div>
    </React.Fragment>
  );
};
export default ForgotPasswordSuccess;
