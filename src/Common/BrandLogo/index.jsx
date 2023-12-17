import React from "react";
import AppLink from "../AppLink";
import logo from "../../assets/images/logo/edneed-logo.svg";

export default function BrandLogo() {
  return (
    <div className="logoCustom">
      <AppLink to="/">
        <img className="brandLogo medium" src={logo} alt="edneed brand logo" />
      </AppLink>
    </div>
  );
}
