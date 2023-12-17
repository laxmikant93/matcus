/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppLink from "../../../Common/AppLink";
import GoogleLoginSingup from "../Login/GoogleLoginSingup";
import ReactGA from "react-ga";

// import {
//   StudentIcon,
//   TeacherIcon,
//   InstituteIcon,
//   IconOtherRole,
// } from "../../../Common/Icon";
import { signupRole } from "../../../store/actions/userRole";

import RoleList from "./RoleOption/RoleList";
import RoleItem from "./RoleOption/RoleItem";
import CreateAccountEmail from "./CreateAccountEmail";
import RequestOtp from "../Otp/RequestOtp";
import CreateAccountSwitch from "./CreateAccountSwitch";
import Storage from "../../../Classes/Storage";
import { selectedRoleOnSignup } from "../../../Constant/auth";
import {
  CreateAccountProvider,
  defaultCreateAccountValues,
} from "../../../Context/CreateAccountContext";
import AppLinkUrl from "../../../Common/AppLink/AppLinkUrl";
const CreateAccount = () => {
  const [showRoleOption, setShowRoleOption] = useState(
    defaultCreateAccountValues
  );
  const defaultRole = useSelector((state) => state.userRole.signupRole);
  const dispatch = useDispatch();

  const [role, setRole] = useState(defaultRole ? defaultRole : "InstituteOwner");
  const [SignUpOTPToggle, SetSignUpOTPToggle] = useState("otp");

  ReactGA.event({
    category: "Header",
    action: "click",
    label: "Home_Header_CreateAccount",
  })
  // Set role on every selection
  useEffect(() => {
    Storage.set(selectedRoleOnSignup, role);
  }, [role]);

  // Remove role on component unmount
  useEffect(() => {
    return () => {
      Storage.remove(selectedRoleOnSignup);
      dispatch(signupRole("InstituteOwner"));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hide create account option on private domain
  if (AppLinkUrl.privateDomain()) {
    return <React.Fragment />;
  }

  return (
    <section>
      <CreateAccountProvider
        value={{ showRole: showRoleOption, setShowRole: setShowRoleOption }}
      >
        <div className="SignUpSectionWrapper">
          <div className="SignUpSection">
            {showRoleOption.showRole && (
              <React.Fragment>
                <h1 className="text-sm w-500">Create a new account</h1>
                <p className="text-xxs mb-20">
                  Select user role to get started
                </p>
                <RoleList>
                  <RoleItem
                    className="primary"
                    role="InstituteOwner"
                    title="Institute Admin"
                    icon="icon-InstituteRole primary"
                    active={role === "InstituteOwner"}
                    onSelect={(opt) => setRole(opt)}
                  />
                  <RoleItem
                    className="secondary"
                    role="Teacher"
                    title="Teacher"
                    icon="icon-TeacherRole secondary"
                    active={role === "Teacher"}
                    onSelect={(opt) => setRole(opt)}
                  />
                  <RoleItem
                    className="purple"
                    role="Student"
                    title="Student"
                    icon="icon-StudentRole purple"
                    active={role === "Student"}
                    onSelect={(opt) => setRole(opt)}
                  />
                  <RoleItem
                    className="base"
                    role="Other"
                    title="Other"
                    icon="icon-OtherRole base"
                    active={role === "Other"}
                    onSelect={(opt) => setRole(opt)}
                  />
                </RoleList>

                <div className="">
                  <GoogleLoginSingup />
                </div>
              </React.Fragment>
            )}
            <React.Fragment>
              {SignUpOTPToggle === "email" && (
                <CreateAccountEmail role={role} />
              )}
              {SignUpOTPToggle === "otp" && (
                <div className="SignUp_OTP">
                  <RequestOtp option="signup" />
                </div>
              )}
              {/* <CreateAccountSwitch
                  option={SignUpOTPToggle}
                  onChange={(selectedOption) =>
                    SetSignUpOTPToggle(selectedOption)
                  }
                /> */}
              <p className="text-2xs dgray sign-agree">
                By signing up, you agree to &nbsp;
                <AppLink
                  className="primary"
                  target="_blank"
                  to="/privacy-policy"
                >
                  Privacy Policy,
                </AppLink>
                &nbsp;and&nbsp;
                <AppLink
                  className="primary"
                  target="_blank"
                  to="/cookie-policy"
                >
                  Cookie Policy
                </AppLink>
                .
              </p>
            </React.Fragment>
          </div>
        </div>
      </CreateAccountProvider>
    </section>
  );
};

export default CreateAccount;
