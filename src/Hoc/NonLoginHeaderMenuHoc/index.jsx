import React from "react";
import Auth from "../../Classes/Auth";
import AppLinkUrl from "../../Common/AppLink/AppLinkUrl";
import HomeHeaderAuth from "../../Layout/ProfileAuth/HomeHeaderAuth";

export const NonLoginMenuOptions = () => {
  return (
    <React.Fragment>
      <HomeHeaderAuth />
    </React.Fragment>
  );
};

export default function NonLoginHeaderMenuHoc({ children }) {
  return (
    <React.Fragment>
      {!Auth.isSubdomainLogin() && !Auth.isLogin() ? (
        <NonLoginMenuOptions />
      ) : (
        children
      )}
    </React.Fragment>
  );
}
