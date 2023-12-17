import React, { useState } from "react";
import SearchNotifications from "./SearchNotifications";
const NotificationTabHeader = ({ setNotificationQuery, notificationQuery }) => {
  const [toggle, setToggle] = useState("All");
  const ChangeTabType = (Tabtype) => {
    setToggle(Tabtype);
    if (Tabtype === "All") {
      setNotificationQuery({
        ...notificationQuery,
        type: "",
      });
    } else {
      setNotificationQuery({
        ...notificationQuery,
        type: Tabtype,
      });
    }
  };
  return (
    <React.Fragment>
      <React.Fragment>
        <div className="noficationtabwrapper mt-10">
          <div className="scroll-top-menu-wrap notification_tabbtn">
            <button
              className={`button btn-sm base  w-400 ${toggle === "All" ? "button-base" : "btn-o-base"
                }`}
              onClick={() => ChangeTabType("All")}
            >
              All
            </button>
            <button
              className={`button btn-sm base w-400 ${toggle === "Institute" ? "button-base" : "btn-o-base"
                }`}
              onClick={() => ChangeTabType("Institute")}
            >
              Insititute
            </button>
            <button
              className={`button btn-sm base  w-400 ${toggle === "Website" ? "button-base" : "btn-o-base"
                }`}
              onClick={() => ChangeTabType("Website")}
            >
              Website
            </button>

            {/* <button
              className={`button btn-sm base w-400  ${
                toggle === "Account" ? "button-base" : "btn-o-base"
              }`}
              onClick={() => ChangeTabType("Account")}
            >
              Account
            </button> */}

            <button
              className={`button btn-sm base w-400 ${toggle === "Profile" ? "button-base" : "btn-o-base"
                }`}
              onClick={() => ChangeTabType("Profile")}
            >
              Profile
            </button>
            <button
              className={`button btn-sm base w-400 ${toggle === "Community" ? "button-base" : "btn-o-base"
                }`}
              onClick={() => ChangeTabType("Community")}
            >
              Community
            </button>
          </div>

          <div></div>
          <SearchNotifications
            setNotificationQuery={setNotificationQuery}
            notificationQuery={notificationQuery}
          />
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};

export default NotificationTabHeader;
