import React from "react";
import { useNavigate } from "react-router-dom";

const AccountSettingMenu = ({
  AccountMenuPersonal,
  AccountMenuNotifications,
  AccountMenuSettings,
  AccountMenuLogout,
  AccountRoleAccess,
  ActiveTab,
}) => {
  const history = useNavigate();
  const LogoutAction = (_id) => {
    history("/auth/logout");
  };
  return (
    <ul className="AccountSettingMenuList">
      <li
        className={`AccountSettingMenuItem ${ActiveTab === "Personal" ? "active" : ""
          }`}
        onClick={() => AccountMenuPersonal()}
      >
        Personal
      </li>
      {/* <li
        className={`AccountSettingMenuItem ${
          ActiveTab === "Notifications" ? "active" : ""
        }`}
        onClick={() => AccountMenuNotifications()}
      >
        Notifications
      </li> */}
      {/* <li
        className={`AccountSettingMenuItem ${ActiveTab === "RoleAccess" ? "active" : ""
          }`}
        onClick={() => AccountRoleAccess()}
      >
        User Role
      </li> */}
      <li
        className={`AccountSettingMenuItem ${ActiveTab === "Settings" ? "active" : ""
          }`}
        onClick={() => AccountMenuSettings()}
      >
        Settings
      </li>
      <li
        className={`AccountSettingMenuItem ${ActiveTab === "Logout" ? "active" : ""
          }`}
        onClick={() => LogoutAction()}
      >
        Logout
      </li>
    </ul>
  );
};

export default AccountSettingMenu;
