import React from 'react'
import { func, oneOf } from 'prop-types';
import ReactGA from "react-ga"
const optionToSwitch = ['email', 'otp']; // Pre define options
const optionText = { email: "Reset with Email", otp: "Reset with Mobile OTP" } // Text for options

const ForgotPasswordSwitch = ({ option, onChange }) => {
  const nextOption = option === "email" ? "otp" : "email" // reverse option selection for selected option

  // Handle option change
  const handleOptiobChange = () => {
    const selctedOption = option === "email" ? "otp" : "email";
    onChange(selctedOption)
    ReactGA.event({
      category: "Forget Password",
      action: "click",
      label: "Forget password",
    })
  }

  const buttonText = optionText[nextOption]; // Button text according to @nextOption option selection

  return (
    <button
      className="button btn-o-primary btn-sm button-block mt-20"
      onClick={handleOptiobChange}
    >
      {buttonText}
    </button>
  )
}

ForgotPasswordSwitch.defaultProps = {
  option: "otp",
  onChange: () => { }
}

ForgotPasswordSwitch.defaultProps = {
  option: oneOf(optionToSwitch),
  onChange: func
}


export default ForgotPasswordSwitch
