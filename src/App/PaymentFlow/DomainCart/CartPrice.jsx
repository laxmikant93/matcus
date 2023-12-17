import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import AppLink from "../../../Common/AppLink";

const CartPrice = ({ subdomain, privateDomainOffline,
  privateDomainAddnewIns, AddToCart, privateDomainProceedToCheck, continueButtonDisable, validationTrue }) => {

  const {

    PostDomainInfoLoading,
    domainAvailableLoading,
    postUserDetailsloading,

  } = useSelector((state) => {
    return {

      PostDomainInfoLoading: state.privatedomain.postDomainInfo.loading,
      domainAvailableLoading: state.privatedomain.privateDomainAvailability.loading,
      postUserDetailsloading: state.privatedomain.postUserDetails.loading,
    };
  });


  const [postDomain, setPostDomain] = useState({})

  return (
    <div className="buttonCartWrapOnPD">
      {/* <div className={` ${privateDomainProceedToCheck ? "mt-40" : "mt-20"}`}> */}
      <div className="CartPriceCustom">
        {
          privateDomainOffline ||
            privateDomainAddnewIns ? (
            <React.Fragment>
              <p className="text-xxs">
                Plus <span className="primary w-600">FREE Subdomain</span> with Edneed
              </p>
              <p className="text-xs base mt-3">{subdomain}.edneed.com</p>
              <p className="mt-20 ">&nbsp;</p>
            </React.Fragment>
          ) : ("")
        }
        {
          domainAvailableLoading || continueButtonDisable ? (
            <button className="button btn-md button-primary btn-oval button-block" disabled>
              Proceed to Checkout
            </button>
          ) : (<React.Fragment>
            {PostDomainInfoLoading || postUserDetailsloading ? (
              <button className="button btn-md button-primary btn-oval button-block" >
                Loading...
              </button>

            ) : (
              <button className="button btn-md button-primary btn-oval button-block" onClick={AddToCart}>
                Proceed to Checkout
              </button>

            )
            }
          </React.Fragment>
          )
        }

        <p className="text-2xs mt-10 cartConditionAnchor">
          By clicking Proceed to Checkout button, you agree to our{" "}
          <AppLink to="/terms-of-service">Terms & Conditions</AppLink> and that you have read our{" "}
          <AppLink to="/privacy-policy">Payment Policy</AppLink> including our{" "}
          <AppLink to="/cookie-policy">Cookie Policy</AppLink>.
        </p>
      </div>
    </div>
  );
};

export default CartPrice;
