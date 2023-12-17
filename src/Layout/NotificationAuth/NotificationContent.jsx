import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { readNotificationBellIcon } from "../../store/actions/allnotification";
// import { DummyProfileImage } from "../../Common/Images";
import DummyProfileImage from "./DummyProfile.png";
import moment from "moment";
// import {
//   AwesomeBellIocn,
//   rightArrow,
//   Feather_rightArrow,
// } from "../../Common/Icon";
// import { IconExternalLink } from "../../Common/Icon";

function NotificationContent({ setCount, bellType }) {
  const {
    allNotification,
    readNotification,
    unreadNotification,
    user,
    success,
  } = useSelector((state) => {
    return {
      allNotification: state.allnotifications.bellicon.data.All.data,
      readNotification: state.allnotifications.bellicon.data.Read.data,
      unreadNotification: state.allnotifications.bellicon.data.Unread.data,
      success: state.allnotifications.bellicon.success,
      user: state.user,
    };
  });
  const [showNotification, setShowNotification] = useState("");
  const dispatch = useDispatch();
  const history = useNavigate();
  const readNotificationsDispatch = (_id, url, type) => {
    let notify_id = {
      _id: _id,
    };
    if (type === "patch")
      dispatch(readNotificationBellIcon(user._id, notify_id));
    setTimeout(() => {
      if (url) history(`/${url}`);
      window.location.reload(false);
    }, 800);
  };
  const readWebsiteDispatch = (_id, url, type) => {
    let notify_id = {
      _id: _id,
    };
    if (type === "patch")
      dispatch(readNotificationBellIcon(user._id, notify_id));
    setTimeout(() => {
      if (url) window.open(`${url}`, "_blank");
    }, 800);
  };
  useEffect(() => {
    if (bellType === "Read") setShowNotification(readNotification);
    else if (bellType === "Unread") setShowNotification(unreadNotification);
    else setShowNotification(allNotification);
  }, [bellType, readNotification, unreadNotification, allNotification]);

  return (
    <div className="notification-content mt-10">
      {success ? (
        showNotification.length > 0 ? (
          showNotification.map((item, key) => {
            return item.Status === "Unseen" || item.Status === "Unread" ? (
              item.type === "Profile" ? (
                <div
                  className="notificationsectionUpdate  svgColorIcon bg-silver"
                  key={item._id}
                >
                  <div className="toptitleWrapperNoti">
                    {/* <p
                        className="uppercase text-xs mb-2  primary w-400 pointercours"
                        onClick={() =>
                          readNotificationsDispatch(
                            item._id,
                            item.itemURL ? item.itemURL : item.profileURL,
                            "patch"
                          )
                        }
                      >
                        {item.title}
                      </p> */}
                  </div>
                  <div className="Notificationimagerightarrowupdate">
                    <div className="notificationthumImg mt-10">
                      {!item.sender_profile_picture === "" ? (
                        <img
                          src={item.sender_profile_picture}
                          width="50"
                          height="50"
                          className="box-shadow border-radius-50 pointercours"
                          alt=""
                          onClick={() =>
                            readNotificationsDispatch(
                              item._id,
                              item.profileURL,
                              "patch"
                            )
                          }
                        />
                      ) : (
                        <img
                          src={DummyProfileImage}
                          width="50"
                          height="50"
                          className="box-shadow border-radius-50"
                          alt=""
                        />
                      )}

                      <div>
                        <h4
                          className="text-xs w-400 primary pointercours  notificationprofiletextlinline"
                          onClick={() =>
                            readNotificationsDispatch(
                              item._id,
                              item.profileURL,
                              "patch"
                            )
                          }
                        >
                          {item.sender_name}

                          <span className="text-xs w-400 gray clamptextwrapper-line-one">
                            {item.desc}
                          </span>
                        </h4>
                        <p className="text-xxs  gray w-400">
                          {moment(item.createdAt).fromNow()}
                        </p>
                      </div>
                    </div>

                    <div className="rightarrowbox primary-o">
                      <i
                        className="icon-big-right-arrow big-rightarrow"
                        onClick={() =>
                          readNotificationsDispatch(
                            item._id,
                            item.itemURL ? item.itemURL : item.profileURL,
                            "patch"
                          )
                        }
                      ></i>
                    </div>
                  </div>
                </div>
              ) : item.type === "Institute" ? (
                <div
                  className="notificationsectionUpdate svgColorIcon bg-silver"
                  key={item._id}
                >
                  <div className="toptitleWrapperNoti">
                    <p
                      className="uppercase text-xs mb-2  primary w-400 pointercours"
                      onClick={() =>
                        readNotificationsDispatch(
                          item._id,
                          item.itemURL,
                          "patch"
                        )
                      }
                    >
                      {item.title}
                    </p>
                    <p className="text-xxs gray w-400">
                      {moment(item.createdAt).fromNow()}
                    </p>
                  </div>
                  <div className="Notificationimagerightarrowupdate">
                    <div className="notificationthumImg mt-10">
                      <div>
                        <p className="mt-10 text-rdf w-400 clamptextwrapper">
                          {item.desc}
                        </p>
                        <ul className="BreadCrumb notificationbreadcrumbli">
                          <li className="text-s gray w-300">
                            {" "}
                            <p>{item.classname}</p>
                          </li>
                          <li className="text-s gray w-300">
                            <p className="active">{item.subject}</p>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div
                      className="rightarrowbox primary-o"
                      onClick={() =>
                        readNotificationsDispatch(
                          item._id,
                          item.itemURL,
                          "patch"
                        )
                      }
                    >
                      <i className="icon-big-right-arrow big-rightarrow"></i>
                    </div>
                  </div>
                </div>
              ) : (
                item.type === "Website" && (
                  <React.Fragment>
                    <div className="notificationsectionUpdate svgColorIcon bg-silver">
                      {item.ActionPerform === "Vacancy" || item.ActionPerform === "Admission" ? (
                        <React.Fragment>
                          <div className="toptitleWrapperNoti">
                            <p className="uppercase text-xs mb-2  primary w-400 pointercours"
                              onClick={() =>
                                readWebsiteDispatch(item._id, item.itemURL, "patch")
                              }>
                              {item.title}
                            </p>
                            <p className="text-xxs gray w-400">
                              {moment(item.createdAt).fromNow()}
                            </p>
                          </div>
                          <div className="Notificationimagerightarrowupdate">
                            <div>
                              <p className="mt-10 text-rdf w-400 clamptextwrapper-line-one">
                                {item.desc}
                              </p>
                              <p className="text-2xs gray w-400">
                                {moment(item.createdAt).fromNow()}
                              </p>
                            </div>
                            <div className="Notificationimagerightarrowupdate">
                              <div>
                                <p className="mt-10 text-xs w-400 clamptextwrapper-line-one">
                                  {item.desc}
                                </p>
                                {/* <p className="namesnotificationheader mt-5">
                          <b> Title : &nbsp; </b>
                          <span className="clamptextwrapper-line-one"> {item.website.title}</span>
                        </p> */}

                              </div>

                              <div className="rightarrowbox" onClick={() =>
                                readWebsiteDispatch(item._id, item.itemURL, "patch")
                              }>
                                <i className="icon-big-right-arrow big-rightarrow"></i>
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      ) : item.ActionPerform === "Add_Gallery" || item.ActionPerform === "Gallery_Updated" ? (
                        <div
                          className="notificationsectionUpdate svgColorIcon bg-silver"
                          key={item._id}
                        >
                          <div className="toptitleWrapperNoti">
                            <p
                              className="uppercase text-xs mb-2  primary w-400 pointercours"
                              onClick={() =>
                                readWebsiteDispatch(item._id, item.itemURL, "patch")
                              }
                            >
                              {item.title}
                            </p>
                            <p className="text-xxs gray w-400">
                              {moment(item.createdAt).fromNow()}
                            </p>
                          </div>
                          <div className="Notificationimagerightarrowupdate">
                            <div className="notificationthumImg mt-10">
                              <div>
                                <p className="mt-10 text-rdf w-400 clamptextwrapper">
                                  {item.desc}
                                </p>
                                <ul className="BreadCrumb notificationbreadcrumbli"></ul>
                              </div>
                            </div>
                            <div className="Notificationimagerightarrowupdate">
                              <div className="notificationthumImg mt-10">
                                <div>
                                  <p className="mt-10 text-xs w-400 clamptextwrapper">
                                    {item.desc}
                                  </p>
                                  <ul className="BreadCrumb notificationbreadcrumbli"></ul>
                                </div>
                              </div>

                              <div
                                className="rightarrowbox primary-o"
                                onClick={() =>
                                  readWebsiteDispatch(item._id, item.itemURL, "patch")
                                }
                              >
                                <i className="icon-big-right-arrow big-rightarrow"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="notificationsectionUpdate svgColorIcon bg-silver"
                          key={item._id}
                        >
                          <div className="toptitleWrapperNoti">
                            <p
                              className="uppercase text-xs mb-2  primary w-400 pointercours"
                              onClick={() =>
                                readWebsiteDispatch(item._id, item.itemURL, "patch")
                              }
                            >
                              {item.title}
                            </p>
                            <p className="text-xxs gray w-400">
                              {moment(item.createdAt).fromNow()}
                            </p>
                          </div>
                          <div className="Notificationimagerightarrowupdate">
                            <div className="notificationthumImg mt-10">
                              <div>
                                <p className="namesnotificationheader mt-5">
                                  <b> Title : &nbsp; </b>
                                  <span className="clamptextwrapper-line-one"> {item.website.title}</span>
                                </p>
                                {/* <p className="active">{item.website.title}</p> */}

                                {/* <p className="mt-10 text-rdf w-400 clamptextwrapper">
                            {item.desc}
                          </p> */}
                                <ul className="BreadCrumb notificationbreadcrumbli"></ul>
                              </div>
                            </div>

                            <div
                              className="rightarrowbox primary-o"
                              onClick={() =>
                                readWebsiteDispatch(item._id, item.itemURL, "patch")
                              }
                            >
                              <i className="icon-big-right-arrow big-rightarrow"></i>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  </React.Fragment>
                )
              )
            ) : item.Status === "Read" && (item.type === "Profile" ? (
              <div
                className="notificationsectionUpdate svgColorIcon"
                key={item._id}
              >
                <div className="toptitleWrapperNoti">
                  {/* <p
                      className="uppercase text-xs mb-2  primary w-400 pointercours"
                      onClick={() =>
                        readNotificationsDispatch(
                          item._id,
                          item.itemURL ? item.itemURL : item.profileURL,
                          "read"
                        )
                      }
                    >
                      {item.title}
                    </p> */}
                </div>
                <div className="Notificationimagerightarrowupdate">
                  <div className="notificationthumImg mt-10">
                    {!item.sender_profile_picture === "" ? (
                      <img
                        src={item.sender_profile_picture}
                        width="50"
                        height="50"
                        className="box-shadow border-radius-50 pointercours"
                        alt=""
                        onClick={() =>
                          readNotificationsDispatch(
                            item._id,
                            item.profileURL,
                            "read"
                          )
                        }
                      />
                    ) : (
                      <img
                        src={DummyProfileImage}
                        width="50"
                        height="50"
                        className="box-shadow border-radius-50 pointercours"
                        alt=""
                      />
                    )}

                    <div>
                      <h4
                        className="text-xs primary w-500 pointercours  notificationprofiletextlinline"
                        onClick={() =>
                          readNotificationsDispatch(
                            item._id,
                            item.profileURL,
                            "read"
                          )
                        }
                      >
                        {item.sender_name}

                        <span className="text-xs w-400 gray clamptextwrapper-line-one">
                          {item.desc}
                        </span>
                      </h4>
                      <p className="text-xxs  gray w-400">
                        {moment(item.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>

                  <div className="rightarrowbox primary-o">
                    <i
                      className="icon-big-right-arrow big-rightarrow"
                      onClick={() =>
                        readNotificationsDispatch(
                          item._id,
                          item.itemURL ? item.itemURL : item.profileURL,
                          "read"
                        )
                      }
                    ></i>
                  </div>
                </div>
              </div>
            ) : item.type === "Institute" ? (
              <div
                className="notificationsectionUpdate svgColorIcon"
                key={item._id}
              >
                <div className="toptitleWrapperNoti">
                  <p
                    className="uppercase text-xs mb-2  primary w-400 pointercours"
                    onClick={() =>
                      readNotificationsDispatch(
                        item._id,
                        item.itemURL,
                        "read"
                      )
                    }
                  >
                    {item.title}
                  </p>
                  <p className="text-xxs gray w-400">
                    {moment(item.createdAt).fromNow()}
                  </p>
                </div>
                <div className="Notificationimagerightarrowupdate">
                  <div className="notificationthumImg mt-10">
                    <div>
                      <p className="mt-10 text-rdf w-400 clamptextwrapper">
                        {item.desc}
                      </p>
                      <ul className="BreadCrumb notificationbreadcrumbli">
                        <li className="text-s gray w-300">
                          <p>{item.classname}</p>
                        </li>
                        <li className="text-s gray w-300">
                          <p className="active">{item.subject}</p>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div
                    className="rightarrowbox primary-o"
                    onClick={() =>
                      readNotificationsDispatch(
                        item._id,
                        item.itemURL,
                        "read"
                      )
                    }
                  >
                    <i className="icon-big-right-arrow big-rightarrow"></i>
                  </div>
                </div>
              </div>
            ) : item.type === "Website" && (
              item.ActionPerform === "Vacancy" || item.ActionPerform === "Admission" ? (
                <div className="notificationsectionUpdate svgColorIcon">
                  <div className="toptitleWrapperNoti">
                    <p className="uppercase text-xs mb-2  primary w-400 pointercours"
                      onClick={() =>
                        readWebsiteDispatch(item._id, item.itemURL, "read")
                      }>
                      {item.title}
                    </p>
                    <p className="text-xxs gray w-400">
                      {moment(item.createdAt).fromNow()}
                    </p>
                  </div>
                  <div className="Notificationimagerightarrowupdate">
                    <div>
                      <p className="mt-10 text-rdf w-400 clamptextwrapper-line-one">
                        {item.desc}
                      </p>
                    </div>

                    <div className="rightarrowbox">
                      <i className="icon-big-right-arrow big-rightarrow"
                        onClick={() =>
                          readWebsiteDispatch(item._id, item.itemURL, "read")
                        }></i>
                    </div>
                  </div>
                </div>
              ) : item.ActionPerform === "Add_Gallery" || item.ActionPerform === "Gallery_Updated" ? (
                <div
                  className="notificationsectionUpdate svgColorIcon"
                  key={item._id}
                >
                  <div className="toptitleWrapperNoti">
                    <p
                      className="uppercase text-xs mb-2  primary w-400 pointercours"
                      onClick={() =>
                        readWebsiteDispatch(item._id, item.itemURL, "read")
                      }
                    >
                      {item.title}
                    </p>
                    <p className="text-xxs gray w-400">
                      {moment(item.createdAt).fromNow()}
                    </p>
                  </div>
                  <div className="Notificationimagerightarrowupdate">
                    <div className="notificationthumImg mt-10">
                      <div>
                        <p className="mt-10 text-rdf w-400 clamptextwrapper">
                          {item.desc}
                        </p>
                        <ul className="BreadCrumb notificationbreadcrumbli"></ul>
                      </div>
                    </div>

                    <div
                      className="rightarrowbox primary-o"
                      onClick={() =>
                        readWebsiteDispatch(item._id, item.itemURL, "read")
                      }
                    >
                      <i className="icon-big-right-arrow big-rightarrow"></i>
                    </div>
                  </div>
                </div>
              ) :
                (
                  <div
                    className="notificationsectionUpdate svgColorIcon"
                    key={item._id}
                  >
                    <div className="toptitleWrapperNoti">
                      <p
                        className="uppercase text-xs mb-2  primary w-400 pointercours"
                        onClick={() =>
                          readWebsiteDispatch(item._id, item.itemURL, "read")
                        }
                      >
                        {item.title}
                      </p>
                      <p className="text-xxs gray w-400">
                        {moment(item.createdAt).fromNow()}
                      </p>
                    </div>
                    <div className="Notificationimagerightarrowupdate">
                      <div className="notificationthumImg mt-10">
                        <div>

                          <p className="namesnotificationheader mt-5">
                            <b> Title: &nbsp; </b>
                            <span className="clamptextwrapper-line-one"> {item.website.title}</span>
                          </p>
                          {/* <p className="active">{item.website.title}</p> */}

                          {/* <p className="mt-10 text-rdf w-400 clamptextwrapper">
                          {item.desc}
                        </p> */}
                          <ul className="BreadCrumb notificationbreadcrumbli"></ul>
                        </div>
                      </div>

                      <div
                        className="rightarrowbox primary-o"
                        onClick={() =>
                          readWebsiteDispatch(item._id, item.itemURL, "read")
                        }
                      >
                        <i className="icon-big-right-arrow big-rightarrow"></i>
                      </div>
                    </div>
                  </div>
                )
            ))
          })
        ) : (
          <div className="loadingGridData">
            <p>No New Notification</p>
          </div>
        )
      ) : (
        <div className="loadingGridData">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default NotificationContent;
