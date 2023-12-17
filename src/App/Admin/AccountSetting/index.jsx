/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import AccountSettingMenu from "./AccountSettingMenu";
import Logout from "./Logout";
// import Notifications from "./Notifications";
import PersonalInfo from "./PersonalInfo";
import Settings from "./Settings";
import "./AccountSetting.scss";
// import RoleAccess from "./RoleAccess";
const AccountSetting = () => {
  const [toggleState, settoggleState] = useState("Personal");

  const AccountMenuPersonal = () => {
    settoggleState("Personal");
  };
  const AccountMenuNotifications = () => {
    settoggleState("Notifications");
  };
  const AccountRoleAccess = () => {
    settoggleState("RoleAccess");
  };
  const AccountMenuSettings = () => {
    settoggleState("Settings");
  };
  const AccountMenuLogout = () => {
    settoggleState("Logout");
  };
  return (
    <React.Fragment>
     <div className="AccountSettingWrapper">
          <div className="AccountSettingMenuSide  scroll-nav-tab-wrapper">
            <AccountSettingMenu
              AccountMenuPersonal={() => AccountMenuPersonal()}
              // AccountMenuNotifications={() => AccountMenuNotifications()}
              AccountMenuSettings={() => AccountMenuSettings()}
              AccountMenuLogout={() => AccountMenuLogout()}
              // AccountMenuUserDetailPopup={() => AccountMenuUserDetailPopup()}
              ActiveTab={toggleState}
            />
          </div>
          <div className="AccountSettingContentSide">
            {toggleState === "Personal" && <PersonalInfo />}
            {/* {toggleState === "Notifications" && <Notifications />} */}
            {toggleState === "Settings" && <Settings />}
            {toggleState === "Logout" && <Logout />}
            {/* <UserDetailPopup /> */}
            {/* {showUserDetailPopUp === true && <UserDetailPopup />} */}
          </div>
        </div>
    </React.Fragment>
  );
};

export default AccountSetting;
