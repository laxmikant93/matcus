import React, { useEffect, useState } from "react";
import Storage from "../../../Classes/Storage";
import Auth from "../../../Classes/Auth";
import AppLinkUrl from "../../../Common/AppLink/AppLinkUrl";
import { redirectToUrl } from "../../../Constant/auth";
import { setLoginToStore } from "../../../store/actions/user";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import GoogleLoginIcon from "../../../assets/Icons/icon-google.svg";
import {  GoogleLogin } from "@react-oauth/google";

import UserRequest from "../../../store/actions/user/UserRequest";
// import { GoogleLogin } from "react-google-login";
import { string } from "prop-types";
import ReactGA from "react-ga";
function GoogleLoginSingup({ title }) {
  useEffect(() => {
    if (AppLinkUrl.privateDomain()) {
      setPrivateDomainLogin(true);
    }
  }, []);

  const [privateDomainLogin, setPrivateDomainLogin] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  var defaultUserType = "Other";

  const handleGLoggedInProcess = (success) => {
    // API success callback
    if (success.data.data.hasOwnProperty("_id")) {
      Auth.setUserLogin(success.data); // Set Cookies of user login
      dispatch(setLoginToStore(Auth.user())); // Set Userdata to redux store
      if (
        location.pathname !== "/" &&
        location.pathname !== "/auth/create-account"
      ) {
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
    } else {
    }
  };

  const onGoogleLoginSuccess = (response) => {
    const { profileObj } = response;
    if (profileObj) {
      if (privateDomainLogin) {
        const { email, googleId, name } = profileObj;
        let institute_domain = AppLinkUrl.getDomainName();
        UserRequest.InstituteGooglelogin(
          googleId,
          email,
          name,
          institute_domain,
          defaultUserType,
          handleGLoggedInProcess,
          (error) => {
          }
        );
      } else {
        const { email, googleId, name } = profileObj;
        UserRequest.Googlelogin(
          googleId,
          email,
          name,
          defaultUserType,
          handleGLoggedInProcess,
          (error) => {
          }
        );
      }
    }
  };
  const onGoogleLoginFail = (errorresponse) => { };

  // Hide google login option for private domain
  if (AppLinkUrl.privateDomain()) {
    return <React.Fragment></React.Fragment>;
  }

  const googleCick = () => {
    ReactGA.event({
      category: "LogIn",
      action: "click",
      label: "Continue-With-Google",
    })


  }

  return (
    <React.Fragment>
      
         <GoogleLogin
        render={(renderProps) => {
          return (
            !renderProps.disabled && (
              <React.Fragment>
                <button
                  className="googleLogin"
                  onClick={(e) => {
                    googleCick()
                    renderProps.onClick();

                  }}
                  type="button"
                  disabled={renderProps.disabled}
                >
                  <img
                    className="svgColorIcon"
                    alt="Continue with Google"
                    src={GoogleLoginIcon}
                  />
                  {title}
                </button>
               
              </React.Fragment>
            )
          );
        }}
        icon={false}
        onSuccess={onGoogleLoginSuccess}
        onFailure={onGoogleLoginFail}
      />
     
    </React.Fragment>
  );
}

GoogleLoginSingup.defaultProps = {
  title: "Continue with Google",
};

GoogleLoginSingup.propTypes = {
  title: string.isRequired,
};

export default GoogleLoginSingup;
