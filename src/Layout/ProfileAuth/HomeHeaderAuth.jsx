import React from "react";
import Auth from "../../Classes/Auth";
import UserHeaderMenu from "./UserHeaderMenu";
import AppLink from "../../Common/AppLink";
import AppLinkUrl from "../../Common/AppLink/AppLinkUrl";
import "./edHeader.scss";
const HomeHeaderAuth = () => {
  return (
    <div className="HeadLoginSignUp">
      <div className="logSignWrap">
        {Auth.isLogin() || Auth.isSubdomainLogin() ? (
          <div className="rgtTopHeader">
            <UserHeaderMenu />
          </div>
        ) : (
          <div className="signUpSecWrap">
            <a href="/auth/login" >
              Log In
            </a>
            {!AppLinkUrl.privateDomain() &&
              <AppLink to="/auth/create-account" >
                Sign Up
              </AppLink>
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeHeaderAuth;
