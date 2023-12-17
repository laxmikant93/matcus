import { string } from "prop-types";
import React from "react";
import ReactGA from "react-ga"

const ForgotPasswordHead = ({ option }) => {
  ReactGA.event({
    category: "Forget Password ",
    action: "forget password click",
    label: "Forget password  label",
  })
  return (
    <div className="mt-30">
      <h1 className="text-sm w-500">Forgot Password?</h1>
      {/* <p className="text-xxs mt-10">
        {
          option === "email" ? "No worries. Enter your email and we will send you a link to reset your password." : "Enter your mobile number to receive the one time password."
        }

      </p> */}
      <div className="mt-25"></div>
    </div>
  );
};

ForgotPasswordHead.defaultProps = {
  option: "email",
};

ForgotPasswordHead.propTypes = {
  option: string,
};

export default ForgotPasswordHead;
