/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import Breadcrumb from "../../Common/Breadcrumb";
import BreadcrumbItem from "../../Common/Breadcrumb/BreadcrumbItem";
import InstituteTheme from "../../Common/Theme/InstituteTheme";
import NotificationTabHeader from "./NotificationTabHeader";
import {
  GetAllNotification,
  NotificationSearchPage,
  readNotificationBellIcon,
  recentNotification,
} from "../../store/actions/allnotification";
// import {
//   AwesomeBellIocn,
//   rightArrow,
//   Feather_rightArrow,
// } from "../../Common/Icon";
// import { IconExternalLink } from "../../Common/Icon";
import { NotificationThumImg } from "../../Common/Images";
import HomeFooter from "../../Layout/WithoutAuthLayout/Footer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router";
import "./Notification.scss";
import NoDataAvailable from "../../Common/NoDataAvailable";
import DummyProfileImage from "./DummyProfile.png";

const Notifications = () => {
  const dispatch = useDispatch();
  const { user, notify, unread, loading, notificationUnread, recent, tabCount } = useSelector(
    (state) => {
      return {
        tabCount: state.allnotifications.notifications.data.total,
        user: state.user,
        notify: state.allnotifications.notifications,
        unread: state.allnotifications.bellicon.data.Unread,
        loading: state.allnotifications.notifications.loading,
        notificationUnread: state.allnotifications.bellicon.data,
        recent: state.allnotifications.recentNotifi
      };
    }
  );
  const [skip, setSkip] = useState(0);
  const [loader, setLoader] = useState(false);
  const [notificationQuery, setNotificationQuery] = useState({
    id: "",
    search: "",
    type: "",
    orderby: "",
    orderunread: "",
    limit: 10,
  });
  const totalNotify = notify.data && notify.data.total && notify.data.total;
  useEffect(() => {
    dispatch(
      GetAllNotification(
        user._id,
        notificationQuery.search,
        notificationQuery.type,
        notificationQuery.orderby,
        notificationQuery.orderunread,
        0,
        notificationQuery.limit,
        user.user_institute,
        user.user_activeRole
      )
    );
    dispatch(recentNotification(user._id, notificationQuery.type, user.user_institute, user.user_activeRole))
    setSkip(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id, notificationQuery, dispatch]);

  const ScrollMore = useCallback(() => {

    setSkip(skip + 10);

    dispatch(NotificationSearchPage(
      user._id,
      notificationQuery.search,
      notificationQuery.type,
      notificationQuery.orderby,
      notificationQuery.orderunread,
      skip + 10,
      notificationQuery.limit,
      user.user_institute,
      user.user_activeRole
    )
    );
    // dispatch(recentNotification(user._id, notificationQuery.type, user.user_institute, user.user_activeRole));
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, loading]);

  useEffect(() => {
    const onScroll = function () {
      // i=skip;
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        skip < totalNotify && ScrollMore();
        setLoader(true);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [user._id, skip, setLoader, setSkip, ScrollMore, loader, totalNotify]);

  const history = useNavigate();
  const readNotificationsDispatch = (_id, url, type) => {
    let notify_id = {
      _id: _id,
    };
    if (type === "patch") {
      dispatch(readNotificationBellIcon(user._id, notify_id));
    }
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
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="/notification" title="Notification" />
      </Breadcrumb>
      <h2 className="text-sm base w-400 mt-30">
        {tabCount ? tabCount : 0} {""}
        {tabCount && tabCount > 1 ? "Total Notifications" : "Total Notification"}
      </h2>
      {/* {notificationQuery.type === "" && (notificationQuery.orderunread === "" || notificationQuery.orderunread === "Unread") &&
          <h2 className="text-sm base w-400 mt-30">{unread.len} Recent Notifications</h2>} */}
      <NotificationTabHeader
        setNotificationQuery={setNotificationQuery}
        notificationQuery={notificationQuery}
      />

      <div className="notificationcontentdata mt-10">
        {!loading ? (
          notify.data &&
            notify.data.notification &&
            notify.data.notification.length > 0 ? (
            notify.data.notification.map((item) => {
              return item.Status !== "Unread" && item.Status !== "Unseen" ? (
                item.type === "Profile" ? (
                  <div className="notificationsectionUpdate" key={item._id}>
                    {/*<div className="toptitleWrapperNoti">
                        <p
                          className="uppercase text-xxs mb-2  primary w-400 pointercours"
                          onClick={() =>
                            readNotificationsDispatch(
                              item._id,
                              item.itemURL ? item.itemURL : item.profileURL,
                              "read"
                            )
                          }
                        >
                          {item.title}
                        </p> 
                      </div> */}
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
                            className="text-xxs primary w-500 pointercours  notificationprofiletextlinline"
                            onClick={() =>
                              readNotificationsDispatch(
                                item._id,
                                item.profileURL,
                                "read"
                              )
                            }
                          >
                            {item.sender_name}
                            <span className="text-xxs w-400 gray clamptextwrapper-line-one">
                              {item.desc}
                            </span>
                          </h4>
                          <p className="text-2xs gray w-400">
                            {moment(item.createdAt).fromNow()}
                          </p>
                        </div>
                      </div>

                      <div className="rightarrowboxprofilearrow primary-o">
                        <i
                          className="icon-big-right-arrow big-rightarrow "
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
                  <div className="notificationsectionone" key={item._id}>
                    <div className="">
                      <p
                        className="uppercase text-xxs mb-2  primary w-400 pointercours"
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
                      <p className="text-2xs gray w-400">
                        {moment(item.createdAt).fromNow()}
                      </p>
                      <h4 className="mt-10 text-xs w-400">{item.desc}</h4>
                      <ul className="BreadCrumb notificationbreadcrumbli mt-10">
                        <li className="text-xxs gray w-300">
                          <p>{item.classname}</p>
                        </li>
                        <li className="text-xxs gray w-300">
                          <p className="active">{item.subject}</p>
                        </li>
                      </ul>
                    </div>
                    <div className="rightarrowbox primary-o">
                      <i
                        className="icon-big-right-arrow big-rightarrow"
                        onClick={() =>
                          readNotificationsDispatch(
                            item._id,
                            item.itemURL,
                            "read"
                          )
                        }
                      ></i>
                    </div>
                  </div>
                ) : (
                  item.type === "Website" &&
                  (item.ActionPerform === "Vacancy" ||
                    item.ActionPerform === "Admission" ? (
                    <div className="notificationsectionupdatenew">
                      <div className="">
                        <p
                          className="uppercase text-xxs mb-2  primary w-400 pointercours"
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
                        <p className="text-2xs gray w-400">
                          {moment(item.createdAt).fromNow()}
                        </p>
                        <div className="notificationthumImg mt-10">
                          <div>
                            <p className="mt-10 text-xs w-400 clamptextwrapper">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="rightarrowbox"
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
                  ) : item.ActionPerform === "Add_Gallery" ||
                    item.ActionPerform === "Gallery_Updated" ? (
                    <div className="notificationsectionupdatenew">
                      <div className="">
                        <p
                          className="uppercase text-xxs mb-2  primary w-400 pointercours"
                          onClick={() =>
                            readWebsiteDispatch(
                              item._id,
                              item.itemURL,
                              "read"
                            )
                          }
                        >
                          {item.title}
                        </p>
                        <p className="text-2xs gray w-400">
                          {moment(item.createdAt).fromNow()}
                        </p>
                        <div className="notificationthumImg mt-10">
                          <div>
                            <p className="mt-10 text-xs w-400 clamptextwrapper">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="rightarrowbox"
                        onClick={() =>
                          readWebsiteDispatch(item._id, item.itemURL, "read")
                        }
                      >
                        <i className="icon-big-right-arrow big-rightarrow"></i>
                      </div>
                    </div>
                  ) : (
                    <div className="notificationsectionupdatenew">
                      <div className="">
                        <p
                          className="uppercase text-xxs mb-2  primary w-400 pointercours"
                          onClick={() =>
                            readWebsiteDispatch(
                              item._id,
                              item.itemURL,
                              "read"
                            )
                          }
                        >
                          {item.title}
                        </p>
                        <p className="text-2xs gray w-400">
                          {moment(item.createdAt).fromNow()}
                        </p>
                        <div className="notificationthumImg mt-10">
                          <div>
                            {/* <p className="mt-10 text-xs w-400 clamptextwrapper">
                              First online open session held for DU Aspirants Great school
                              , thank all that makes this happen ! First online open
                              session held for DU Aspirants Great school , thank all that
                              makes this happen ! First online open session held for DU
                              Aspirants Great school , thank all that makes this happen !
                            </p> */}
                            <p className="namesnotificationheader mt-10">
                              <b> Title : &nbsp; </b>
                              <span className="clamptextwrapper-line-one">
                                {item.website.title}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="rightarrowbox"
                        onClick={() =>
                          readWebsiteDispatch(item._id, item.itemURL, "read")
                        }
                      >
                        <i className="icon-big-right-arrow big-rightarrow"></i>
                      </div>
                    </div>
                  ))
                )
              ) : item.type === "Profile" ? (
                <div
                  className="notificationsectionUpdate bg-silver"
                  key={item._id}
                >
                  {/* <div className="">
                      <p
                        className="uppercase text-xxs mb-2  primary w-400 pointercours"
                        onClick={() =>
                          readNotificationsDispatch(
                            item._id,
                            item.itemURL ? item.itemURL : item.profileURL,
                            "patch"
                          )
                        }
                      >
                        {item.title}
                      </p>
                      </div> */}

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
                          className="box-shadow border-radius-50 pointercours"
                          alt=""
                        />
                      )}
                      <div>
                        <h4
                          className="text-xxs primary w-500 pointercours  notificationprofiletextlinline"
                          onClick={() =>
                            readNotificationsDispatch(
                              item._id,
                              item.profileURL,
                              "patch"
                            )
                          }
                        >
                          {item.sender_name}
                          <span className="text-xxs w-400 gray clamptextwrapper-line-one">
                            {item.desc}
                          </span>
                        </h4>
                        <p className="text-2xs gray w-400">
                          {moment(item.createdAt).fromNow()}
                        </p>
                      </div>
                    </div>

                    <div className="rightarrowboxprofilearrow ">
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
                  className="notificationsectionone bg-silver"
                  key={item._id}
                >
                  <div className="">
                    <p
                      className="uppercase text-xxs mb-2  primary w-400 pointercours"
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
                    <p className="text-2xs gray w-400">
                      {moment(item.createdAt).fromNow()}
                    </p>
                    <h4 className="mt-10 text-xs w-400">{item.desc}</h4>
                    <ul className="BreadCrumb notificationbreadcrumbli mt-10">
                      <li className="text-xxs gray w-300">
                        <p>{item.classname}</p>
                      </li>
                      <li className="text-xxs gray w-300">
                        <p className="active">{item.subject}</p>
                      </li>
                    </ul>
                  </div>
                  <div className="rightarrowbox primary-o">
                    <i
                      className="icon-big-right-arrow big-rightarrow"
                      onClick={() =>
                        readNotificationsDispatch(
                          item._id,
                          item.itemURL,
                          "patch"
                        )
                      }
                    ></i>
                  </div>
                </div>
              ) : (
                item.type === "Website" &&
                (item.ActionPerform === "Vacancy" ||
                  item.ActionPerform === "Admission" ? (
                  <div className="notificationsectionupdatenew  bg-silver">
                    <div className="">
                      <p
                        className="uppercase text-xxs mb-2  primary w-400 pointercours"
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
                      <p className="text-2xs gray w-400">
                        {moment(item.createdAt).fromNow()}
                      </p>
                      <div className="notificationthumImg mt-10">
                        <div>
                          <p className="mt-10 text-xs w-400 clamptextwrapper">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="rightarrowbox"
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
                ) : item.ActionPerform === "Add_Gallery" ||
                  item.ActionPerform === "Gallery_Updated" ? (
                  <div className="notificationsectionupdatenew  bg-silver">
                    <div className="">
                      <p
                        className="uppercase text-xxs mb-2  primary w-400 pointercours"
                        onClick={() =>
                          readWebsiteDispatch(item._id, item.itemURL, "patch")
                        }
                      >
                        {item.title}
                      </p>
                      <p className="text-2xs gray w-400">
                        {moment(item.createdAt).fromNow()}
                      </p>
                      <div className="notificationthumImg mt-10">
                        <div>
                          <p className="mt-10 text-xs w-400 clamptextwrapper">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="rightarrowbox"
                      onClick={() =>
                        readWebsiteDispatch(item._id, item.itemURL, "patch")
                      }
                    >
                      <i className="icon-big-right-arrow big-rightarrow"></i>
                    </div>
                  </div>
                ) : (
                  <div className="notificationsectionupdatenew  bg-silver">
                    <div className="">
                      <p
                        className="uppercase text-xxs mb-2  primary w-400 pointercours"
                        onClick={() =>
                          readWebsiteDispatch(item._id, item.itemURL, "patch")
                        }
                      >
                        {item.title}
                      </p>
                      <p className="text-2xs gray w-400">
                        {moment(item.createdAt).fromNow()}
                      </p>
                      <div className="notificationthumImg mt-10">
                        <div>
                          {/* <p className="mt-10 text-xs w-400 clamptextwrapper">
                                First online open session held for DU Aspirants Great school
                                , thank all that makes this happen ! First online open
                                session held for DU Aspirants Great school , thank all that
                                makes this happen ! First online open session held for DU
                                Aspirants Great school , thank all that makes this happen !
                              </p> */}
                          <p className="namesnotificationheader mt-10">
                            <b> Title : &nbsp; </b>
                            <span className="clamptextwrapper-line-one">
                              {item.website.title}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="rightarrowbox"
                      onClick={() =>
                        readWebsiteDispatch(item._id, item.itemURL, "patch")
                      }
                    >
                      <i className="icon-big-right-arrow big-rightarrow"></i>
                    </div>
                  </div>
                ))
              );
            })
          ) : (
            <NoDataAvailable title="No New Notification" />
          )
        ) : (
          <div className="LogingNotificationData pb-20">
            <p>Loading...</p>
          </div>
        )}

        {/* 
         <div className="notificationsectionone">
            <div className="">
              <p className="uppercase text-xxs mb-2  primary w-400 pointercours">
                Online Test
              </p>
              <p className="text-2xs gray w-400">
                22 Oct.. 2021 11:00 am - 12:00 am
              </p>
              <h4 className="mt-10 text-xs w-400">
                Class 5-D, Math Test conducted by Ravindra Singh
              </h4>
            </div>
            <div className="rightarrowbox primary-o">
              <i className="icon-big-right-arrow big-rightarrow"></i>
            </div>
          </div> */}
        {/* 
          <div className="notificationsectionone  bg-silver">
            <div className="">
              <p className="uppercase text-xxs mb-2  primary w-400 pointercours">
                Review Added
              </p>
              <p className="text-2xs gray w-400">
                22 Oct.. 2021 11:00 am - 12:00 am
              </p>
              <div className="notificationthumImg mt-10">
                <img
                  src={NotificationThumImg}
                  width="50"
                  height="50"
                  className="box-shadow border-radius-50"
                  alt=""
                />

                <div>
                  <h4 className="text-xs w-400">Robina Thomcha</h4>
                  <p className="text-xxs w-400 gray">Write a review</p>
                </div>
              </div>
            </div>
            <div className="rightarrowbox primary-o">
              <i className="icon-big-right-arrow big-rightarrow"></i>
            </div>
          </div>  */}

        {/* <div className="notificationsectionupdatenew  bg-silver">
            <div className="">
              <p className="uppercase text-xxs mb-2  primary w-400 pointercours">
                Review Added
              </p>
              <p className="text-2xs gray w-400">
                22 Oct.. 2021 11:00 am - 12:00 am
              </p>
              <div className="notificationthumImg mt-10">
                <div>
                  <p className="mt-10 text-xs w-400 clamptextwrapper">
                    First online open session held for DU Aspirants Great school
                    , thank all that makes this happen ! First online open
                    session held for DU Aspirants Great school , thank all that
                    makes this happen ! First online open session held for DU
                    Aspirants Great school , thank all that makes this happen !
                  </p>
                  <p className="namesnotificationheader mt-10">
                    <b> Name : &nbsp; </b>
                    <span className="clamptextwrapper-line-one"> Kunal</span>
                  </p>
                  <p className="namesnotificationheader">
                    <b> Email : &nbsp; </b>
                    <span className="clamptextwrapper-line-one">
                      {" "}
                      Kunaldhawale.edneed@gmail.com
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="rightarrowbox">
              <i className="icon-big-right-arrow big-rightarrow"></i>
            </div>
          </div>

          <div className="notificationsectionupdatenew  bg-silver">
            <div className="">
              <p className="uppercase text-xxs mb-2  primary w-400 pointercours">
                Review Added
              </p>
              <p className="text-2xs gray w-400">
                22 Oct.. 2021 11:00 am - 12:00 am
              </p>
              <div className="notificationthumImg mt-10">
                <div>
                  <p className="mt-10 text-xs w-400 clamptextwrapper">
                    First online open session held for DU Aspirants Great school
                    , thank all that makes this happen ! First online open
                    session held for DU Aspirants Great school , thank all that
                    makes this happen ! First online open session held for DU
                    Aspirants Great school , thank all that makes this happen !
                  </p>
                  <ul className="BreadCrumb notificationbreadcrumbli mt-10">
                    <li className="text-xxs gray w-300">
                      <p>Classroom 5D</p>
                    </li>
                    <li className="text-xxs gray w-300">
                      <p className="active">Online Class</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="rightarrowbox">
              <i className="icon-big-right-arrow big-rightarrow"></i>
            </div>
          </div> */}
      </div>
      <HomeFooter />
    </React.Fragment>
  );
};

export default Notifications;
