import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "../Classes/Cookies";
import SessionStorage from "../Classes/SessionStorage";
import { createPrivateDomainNewInstiute, privateDomainBookNew, privateDomainProceedToCheckout } from "../Constant/auth";

const PrivateDomainRedirectSwitch = () => {

  const history = useNavigate();
  useEffect(() => {

    if (Cookies.alive(createPrivateDomainNewInstiute)) {
      if (Cookies.getJson(createPrivateDomainNewInstiute) === "proceedtobook") {
        SessionStorage.setBool(privateDomainProceedToCheckout, true);
        history("/myCart")
      } else {
        SessionStorage.setBool(privateDomainBookNew, true);
        history("/check-domain")
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
    </>
  )
}
export default PrivateDomainRedirectSwitch;