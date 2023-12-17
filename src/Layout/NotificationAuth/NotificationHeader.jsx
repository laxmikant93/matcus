import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AppLink from "../../Common/AppLink";
import IconNotificationBell from "./notificationBell.svg";
import IconNotificationBellActive from "./notificationBellActive.svg";
import GetNotification from "../../App/Notifications/GetNotification";
// import {
//   AwesomeBellIocn,
//   rightArrow,
//   Feather_rightArrow,
// } from "../../Common/Icon";
// import { IconExternalLink } from "../../Common/Icon";
import {
  CHangeBellType,
  reduceBellIconCount,
  seenNotificationBellIcon,
} from "../../store/actions/allnotification";
import NotificationContent from "./NotificationContent";
// import UseOutsideClick from "../../Common/UseOutsideClick";
import { useDetectOutsideClick } from "../../Common/DetectOutsideClick/useDetectOutsideClick";
import "./NotificationHeader.scss";
export default function NotificationHeader() {
  const dropdownRef = useRef(null);

  const { readcount, Allcount, unreadcount, user, bellIconType, user_role } =
    useSelector((state) => {
      return {
        Allcount: state.allnotifications.bellicon.data.All.len,
        readcount: state.allnotifications.bellicon.data.Read.len,
        unreadcount: state.allnotifications.bellicon.data.Unread.len,
        user: state.user,
        bellIconType: state.allnotifications.belliconType,
        user_role: state.user.user_activeRole,
      };
    });
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [userRole, setUserRole] = useState("");

  const [bellType, setBellType] = useState("All");
  const reduceCount = () => {
    if (Allcount > 0) {
      dispatch(reduceBellIconCount(Allcount ? Allcount : 0));
      dispatch(seenNotificationBellIcon(user._id));
    }
  };
  useEffect(() => {
    if (process.env.REACT_APP_TEACHER === user_role) {
      setUserRole("Teacher");
    } else if (process.env.REACT_APP_STUDENT === user_role) {
      setUserRole("Student");
    } else if (process.env.REACT_APP_PAGE_OWNER === user_role) {
      setUserRole("Institute Admin");
    } else if (process.env.REACT_APP_OTHERS === user_role) {
      setUserRole("Other");
    }
  }, [user_role, user, userRole]);
  const [togglechnage, setClassChnage] = useState("Institute");
  // const [dispatchType, setDispatchType] = useState("Institute");
  const toggleClassChange = (type) => {
    setClassChnage(type);
    // setDispatchType(type);
    dispatch(CHangeBellType(type));
  };
  useEffect(() => {
    setClassChnage(bellIconType.type);
  }, [bellIconType.type]);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const openModal = () => {
    setIsActive(true);
  };
  useEffect(() => {
    setBellType("All");
  }, [isActive]);
  GetNotification(setIsActive);
  return (
    <div className="main-wrapper-notification" onClick={openModal}>
      <div className="notification" onClick={() => reduceCount()} title="Notification" >

        {Allcount > 0 ?
          <img src={IconNotificationBell} alt="Notification" />
          :
          <img src={IconNotificationBellActive} alt="Notification" />
        }
        {/* <span className="notification-poptext w-300 white">
          {Allcount < 100 ? Allcount : "99+"}
        </span> */}
      </div>
      {isActive ? (
        <div className="notificationdropmenu" ref={dropdownRef}>
          <div className="notifytabstopheader">
            <button
              onClick={() => toggleClassChange("Institute")}
              className={`${togglechnage !== "Institute"
                ? "Notificationheadertabone  text-rdf"
                : "Notificationheadertabone bg-primary white text-rdf"
                }`}
            >
              Institute <br />
              <span className="text-xs">Overall Dashboard related </span>
            </button>
            <button
              onClick={() => toggleClassChange("Other")}
              className={`${togglechnage === "Other"
                ? "Notificationheadertabone bg-primary white text-rdf"
                : "Notificationheadertabone  text-rdf"
                }`}
            >
              Others <br />
              <span className="text-xs"> Profile, Community </span>
            </button>
          </div>
          <div className="notificationcontentwrapper">
            <div className="">
              <div>
                <h3 className="w-200 text-xs ">{userRole}</h3>
                <p className="text-s">
                  {user.user_institute_institute_name &&
                    user.user_institute_institute_name}
                </p>
              </div>
            </div>
            <div className="notification-heading mt-10">
              <ul className="inline w-400 text-xs primary readunreadlistinline ">
                <li
                  onClick={() => setBellType("All")}
                  className={bellType === "All" ? "active" : ""}
                >
                  {" "}
                  All
                </li>
                <li
                  className={bellType === "Read" ? "active" : ""}
                  onClick={() => setBellType("Read")}
                >
                  Read <span> &nbsp; {readcount > 0 ? readcount : ""}</span>
                </li>
                <li
                  className={bellType === "Unread" ? "active" : ""}
                  onClick={() => setBellType("Unread")}
                >
                  Unread{" "}
                  <span className="red unreadwhite">
                    {" "}
                    &nbsp; {unreadcount > 0 ? unreadcount : ""}
                  </span>
                </li>
              </ul>

              <a
                href="/notification"
                target="_blank"
                className="underline primary w-400 text-xs inline"
              >
                Show All{" "}
                <i
                  className="i-xxxs icon-right-arrow primary showallright"
                  width="10"
                ></i>{" "}
              </a>
            </div>

            <NotificationContent setCount={setCount} bellType={bellType} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
