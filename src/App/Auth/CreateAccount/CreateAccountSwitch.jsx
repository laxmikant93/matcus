import React from "react";
import { func, oneOf } from "prop-types";
const optionToSwitch = ["email", "otp"]; // Pre define options
const optionText = {
  email: "Continue with Email",
  otp: "Continue with Mobile OTP",
}; // Text for options

const CreateAccountSwitch = ({ option, onChange }) => {
  const nextOption = option === "email" ? "otp" : "email"; // reverse option selection for selected option
  // Handle option change
  const handleOptiobChange = () => {
    const selctedOption = option === "email" ? "otp" : "email";
    onChange(selctedOption);
  };

  const buttonText = optionText[nextOption]; // Button text according to @nextOption option selection

  return (
    <button
      className="button btn-o-primary primary button-block mt-30"
      onClick={handleOptiobChange}
    >
      {option === "otp" ? (
        <i className="ed-icon i-md primary icon-mail"></i>
      ) : (
        ""
      )}
      {buttonText}
    </button>
  );
};

CreateAccountSwitch.defaultProps = {
  option: "otp",
  onChange: () => {},
};

CreateAccountSwitch.defaultProps = {
  option: oneOf(optionToSwitch),
  onChange: func,
};

export default CreateAccountSwitch;
