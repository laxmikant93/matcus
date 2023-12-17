import { func, oneOf } from 'prop-types';
import React from 'react'
import ReactGA from "react-ga"
const optionToSwitch = ['email', 'otp'];
const optionText = { email: "Login with Email", otp: "Login with Mobile OTP" }

const LoginSwitch = ({ option, onChange }) => {

  const nextOption = option === "email" ? "otp" : "email"
  const handleOptiobChange = () => {
    const selctedOption = option === "email" ? "otp" : "email";
    onChange(selctedOption)
    ReactGA.event({
      category: "LogIn",
      action: "click",
      label: "selctedOption",
    }) 
  }

  const buttonText = optionText[nextOption];
  return (
    <button
      type="button"
      className="button btn-o-primary primary button-block mt-30"
      onClick={handleOptiobChange}
    >
      {buttonText}
    </button>
  )
}

LoginSwitch.defaultProps = {
  option: "email",
  onChange: () => { }
}


LoginSwitch.propTypes = {
  option: oneOf(optionToSwitch).isRequired,
  onChange: func
}



export default LoginSwitch
