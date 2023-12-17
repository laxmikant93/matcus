import React from "react";
import AppLink from "../../../Common/AppLink";

import GoogleLoginSingup from "./GoogleLoginSingup";


const LoginHoc = ({
  children,
  hideGoogleLogin,
  hideForgetPassword
}) => {
  return (
    <section>
      <div className="loginSectionWrapper">
        <div className="loginSection">
          {!hideGoogleLogin && (
            <React.Fragment>
              <p className="text-sm w-600">Welcome Back</p>
              <p className="text-xxs w-300">Login to your account</p>
              <div className="mt-20">
                <GoogleLoginSingup />
              </div>
            </React.Fragment>
          )}
          {children}
          <div className="mt-20">
            {!hideForgetPassword && (
              <AppLink
                to="/auth/forgot-password"
                className="forgot-passord-text"
              >
                Forgot password?
              </AppLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginHoc;
