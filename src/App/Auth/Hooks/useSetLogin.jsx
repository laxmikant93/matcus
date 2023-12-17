import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Auth from '../../../Classes/Auth'
import Storage from '../../../Classes/Storage'
import AppLinkUrl from '../../../Common/AppLink/AppLinkUrl'
import { redirectToUrl } from '../../../Constant/auth'
import { SIGNUP_CUSTOMER_SUCCESS } from '../../../store/actions/ecommerce/type/auth'
import { setLoginToStore } from '../../../store/actions/user'
import { setSubdomainLoginToStore } from '../../../store/actions/subdomainuser'

const useSetLogin = (data, login) => {

  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (login) {
      if (data.data && data.data.hasOwnProperty("_id")) {
        if (AppLinkUrl.subdomain()) {
          Auth.setUserLogin(data, true); // Set Cookies of user login
          dispatch(setSubdomainLoginToStore(Auth.subdomainUser())); // Set Userdata to redux store
        } else {
          Auth.setUserLogin(data, false); // Set Cookies of user login
          dispatch(setLoginToStore(Auth.user())); // Set Userdata to redux store
        }
        localStorage.setItem(`E_CUSTOMER_${window.location.href.split("//")[1].split(".")[0]}`, JSON.stringify(data));
        dispatch({
          type: SIGNUP_CUSTOMER_SUCCESS,
          payload: data,
        });
        if (location.pathname !== "/auth/otplogin") {
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
      }
    }

  }, [data, dispatch, location, login])
}

export default useSetLogin
