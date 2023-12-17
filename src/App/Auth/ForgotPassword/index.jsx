import React, { useState } from "react";
import AuthContainer from "../AuthContainer";
import AppLink from "../../../Common/AppLink";
import RequestOtp from "../Otp/RequestOtp"
import ForgotPasswordEmail from "./ForgotPasswordEmail";
import ForgotPasswordSwitch from "./ForgotPasswordSwitch";
import ForgotPasswordHead from "./ForgotPasswordHead";
import { ForgotPasswordProvider } from "../../../Context/ForgotPasswordContext";
import AuthLayout from "../AuthLayout";
const ForgotPassword = () => {

  const [screenOption, setScreenOption] = useState("email"); // Default screen option

  const [hideOption, setHideOption] = useState(false) // Hide screen switch option and back to login link
  const [hideHeaderFooter, setHideHeaderFooter] = useState(true) // Hide screen switch option and back to login link
  return (
    <AuthLayout>
      {/* <div className="forgotPswdCustom"> */}
      {/* <div className="row center-xs"> */}
      <ForgotPasswordProvider value={{ showHeader: hideHeaderFooter, hideHeader: setHideHeaderFooter }}>
        {/* <div className="col-xs-12 col-md-6 col-lg-6 text-center">
            <div className="row">
              <div className="col-xs-12"> */}
        <div className="forgotPassword">
          {
            hideHeaderFooter && < ForgotPasswordHead option={screenOption} />
          }
          {screenOption === "email" && <ForgotPasswordEmail onMailSent={(mailStatus) => setHideOption(mailStatus)} />}
          {screenOption === "otp" && <RequestOtp option="forgotpassword" />}
          {(!hideOption && hideHeaderFooter) && <ForgotPasswordSwitch option={screenOption} onChange={(screenOption) => setScreenOption(screenOption)} />}
          {/* </div>
              </div>
            </div> */}
          {
            (!hideOption && hideHeaderFooter) && <div className="row">
              <div className="col-xs-12 text-center mt-10 mb-30">
                <AppLink to="/auth/login" className="underlineLink">
                  Back to Login
                </AppLink>
              </div>
            </div>
          }

        </div>
      </ForgotPasswordProvider>
      {/* </div> */}
      {/* </div> */}
    </AuthLayout>
  );
};

export default ForgotPassword;
