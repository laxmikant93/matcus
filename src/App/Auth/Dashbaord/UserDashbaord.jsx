/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import AuthContainer from "../AuthContainer";
import AppLink from "../../../Common/AppLink";
import BrandLogo from "../../../Common/BrandLogo";

export default () => {
  return (
    <AuthContainer>
      <>
        <div className="row center-md UserRoleSelectionCustom">
          <div className="col-xs-12 col-md-5 text-left">
            <div className="row">
              <div className="col-xs-12 center-xs">
                <BrandLogo />
                <div className="mt-10">
                  <h1 className="text-sm w-300">Hello, Sanjeet</h1>
                  <h2 className="text-xxs w-300 gray">Welcome to Edneed</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 text-center mt-30">
                <h2 className="text-xs w-500">To continue</h2>
                <h3 className="text-xxs w-300 gray">
                  Select one of the user roles given below
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 text-center">
                <div className="heroRole">
                  <ul>
                    <li>
                      <AppLink to="/auth/institute-dashboard">
                        <i className="ed-icon icon-InstituteRole primary i-75 svgColorIcon"></i>
                        <span className="mt-2 text-xxs w-500">
                          Institute Owner
                        </span>
                      </AppLink>
                    </li>
                    <li>
                      <AppLink to="/auth/institute-dashboard">
                        <i className="ed-icon icon-TeacherRole secondary i-75 svgColorIcon"></i>
                        <span className="mt-2 text-xxs w-500">Teacher</span>
                      </AppLink>
                    </li>
                    <li>
                      <AppLink to="/auth/institute-dashboard">
                        <i className="ed-icon icon-StudentRole purple i-75 svgColorIcon"></i>
                        <span className="mt-2 text-xxs w-500">Student</span>
                      </AppLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-xs-12 text-center mt-50">
                <h6 className="text-xxs gray w-300">
                  None of the above? <span className="dgray">No worries.</span>
                </h6>
                <AppLink
                  to="/login-otp"
                  className="button btn-sm btn-o-mgray primary mt-8"
                >
                  Discover Edneed Community{" "}
                  <i className="animate-r-arrow-icon"></i>
                </AppLink>
              </div>
            </div> */}
          </div>
        </div>
      </>
    </AuthContainer>
  );
};
