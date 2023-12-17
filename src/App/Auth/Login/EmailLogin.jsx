import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import UserRequest from "../../../store/actions/user/UserRequest";
import Storage from "../../../Classes/Storage";
import Auth from "../../../Classes/Auth";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { redirectToUrl } from "../../../Constant/auth";
import { setLoginToStore } from "../../../store/actions/user";
import AppLinkUrl from "../../../Common/AppLink/AppLinkUrl";
import { changepasswordPopup } from "../../../Constant/auth";
import ComponentLoader from "../../../Common/Loader/ComponentLoader";

const EmailLogin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const kind = "email"
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setSuccess(true);
    let data = id.split("_");
    var email = data[0];
    var password = data[1];
    Storage.setJson("EmailLogin", email);
    Storage.setJson("PasswordLogin", password);
    UserRequest.login(email, password, kind, handleLoggedInProcess, () => {
      window.location.href = "/";

    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleLoggedInProcess = (success) => {
    // API success callback
    if (success.data.message) {
      window.location.href = "/";
    }
    if (success.data.data.hasOwnProperty("_id")) {
      Auth.setUserLogin(success.data); // Set Cookies of user login
      dispatch(setLoginToStore(Auth.user())); // Set Userdata to redux store

      if (location.pathname !== `/auth/email-login/${id}`) {
        if (Storage.alive(redirectToUrl)) {
          let redirectUrl = `/auth/email-login/${id}`;
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
        if (
          Auth.user().user_password_change === true ||
          Auth.user().user_password_change === undefined
        ) {
          window.location.href = "/";
        } else {
          window.location.href = "/email-reset-password";
          Storage.setBool(changepasswordPopup, true);
        }
      }
    }
  };

  return (
    <React.Fragment>
      {success ? <ComponentLoader /> : <div></div>}
    </React.Fragment>
  );
};

export default EmailLogin