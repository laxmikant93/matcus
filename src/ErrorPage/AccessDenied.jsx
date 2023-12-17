import React from "react";
import AppLink from "../Common/AppLink";
import logo from "../assets/images/logo/edneed-logo.svg";
const AccessDenied = () => {
  return (
    <section className="">
      <div className="row center-md center-xs middleContentPlacement">
        <div className="col-xs-10 col-md-4">
          {/* <div className="logoCustom">
              <img className="brandLogo large" src={logo} alt="Edneed Logo" />
            </div> */}
          <div className="errorPage-section-wrapper">
            <div className="errorPage-section">
              <h1 className="text-sm w-500 red text-left">Access Denied :(</h1>
              <p className="text-xs w-500 base text-left mt-5">
                Sorry, you don't have permission to access requested page.
              </p>
            </div>
            <span className="error-link-icon">
              <i className="ed-icon icon-access-denied-eye red i-75"></i>
            </span>
            <span className="error-sad-icon">
              <i className="ed-icon icon-access-denied white i-75"></i>
            </span>
          </div>
          <div className="goBackAnchor">
            <AppLink to="/" className="text-xs primary w-500">
              Go Back
            </AppLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccessDenied;
