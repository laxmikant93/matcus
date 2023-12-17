import React, { useState } from "react";
import LoginHoc from "./LoginHoc";
import LoginWithEmail from "./LoginWithEmail";
import LoginSwitch from "./LoginSwitch";
import RequestOtp from "../Otp/RequestOtp";
import "./login.scss";
import ReactGA from "react-ga"
const Login = ({ hideGoogleLogin, hideForgetPassword }) => {
  const [logintype, setlogintype] = useState("otp");
  ReactGA.event({
    category: "Header",
    action: "click",
 label:"Home_Header_Login",
  })
  return (
    <LoginHoc
      logintype="email"
      hideGoogleLogin={hideGoogleLogin}
      hideForgetPassword={hideForgetPassword}
    >
      <React.Fragment>
        {logintype === "otp" ? (
          <RequestOtp option="login" />
        ) : (
          <LoginWithEmail />
        )}
        <LoginSwitch
          option={logintype}
          onChange={(loginOption) => setlogintype(loginOption)}
        />
      </React.Fragment>
    </LoginHoc>
  );
};

export default Login;
