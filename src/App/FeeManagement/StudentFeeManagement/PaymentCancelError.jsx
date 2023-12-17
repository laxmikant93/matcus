import React from "react";
// import logo from "../../assets/images/logo/edneed-logo.svg";
import AppLink from "../../../Common/AppLink";

export default function PaymentCancelError() {
  return (
    <>
      <section className="">
        <div className="row center-md center-xs middleContentPlacement">
          <div className="col-xs-10 col-md-4">
            {/* <div className="logoCustom">
                <img className="brandLogo large" src={logo} alt="Edneed Logo" />
              </div> */}
            <div className="errorPage-section-wrapper">
              <div className="errorPage-section">
                <h1 className="text-sm w-600 base text-left"> Oops, Something went wrong.!</h1>
                <p className="text-xxs w-300 red text-left">

                </p>
                {/* <p className="text-xs w-500 base text-left mt-20">
                    This page is not available
                  </p> */}
              </div>
              <span className="error-link-icon">
                <i className="ed-icon icon-404-link i-95 bsPink"></i>
              </span>
              <span className="error-sad-icon">
                <i className="ed-icon icon-404-sad i-95 bsPink"></i>
              </span>
            </div>
            <div className="goBackAnchor">
              <AppLink to="/dashboard/student/fee-management" className="text-xs primary w-500">
                Go Back
              </AppLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
