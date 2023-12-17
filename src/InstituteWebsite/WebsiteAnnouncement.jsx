import React, { useEffect, useState } from "react";
import InstituteAnnouncementHoc from "../Hoc/InstituteAnnouncementHoc";
import AnnouncementPopup from "./WebsiteComponents/AnnouncementPopup";
import Card from "../Common/Card/index";
import CardMedia from "../Common/Card/CardMedia";
import AppLink from "../Common/AppLink";
import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { DynamicHeaderConsumer } from "../Context/DynamicHeaderContext";
import { NavLink } from "react-router-dom";
import ImageViewer from "../Common/ImageViewer";
const WebsiteAnnouncement = forwardRef(
  ({ instituteid, announcementLimit, homePage, disabledButton = false }, ref) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const insWebsiteDetails = useSelector(
      (state) => state.institutewebsite.heading
    );
    const { users, instituteWebsite } = useSelector((state) => {
      return {
        instituteWebsite: state.institutewebsite.data,
        users: state.user,
      };
    });

    useEffect(() => {
      if (users.token) {
        if (
          users._id === instituteWebsite.owner &&
          users.user_activeRole === process.env.REACT_APP_PAGE_OWNER &&
          users.user_institute_institute_subdomain ===
          instituteWebsite.institute_subdomain
        ) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    }, [users, instituteWebsite]);
    return (
      instituteid && (
        <>
          <InstituteAnnouncementHoc instituteId={instituteid}>
            {({ data, loading, moreloading, more, loadmore, viewPopup }) => (
              <React.Fragment>
                {
                  homePage ?
                    data.length > 0 && (
                      <div className="announcement-sec" ref={ref}>
                        <div className="sectionCntrWrap">
                          <div className="PageTopHead">
                            <DynamicHeaderConsumer>
                              {(value) => (
                                <div className="PTH-Item secHeadWrap">
                                  <h3 className="heading">
                                    {value.announcementhead || "Announcements"}
                                  </h3>
                                  <p className="subheading">
                                    {value.announcementsubhead ||
                                      "Stay updated with our latest announcements."}
                                  </p>
                                </div>
                              )}
                            </DynamicHeaderConsumer>
                          </div>
                          {loading ? (
                            <div>Loading...</div>
                          ) : data.length > 0 ? (
                            <div className="announcement-grid-wrapper">
                              {data
                                .slice(
                                  0,
                                  announcementLimit ? announcementLimit : data.length
                                )
                                .map((announcement, index) => (
                                  <Card
                                    key={`announcement_${index}`}
                                    className="WA-Card"
                                  >
                                    <CardMedia className="WA-CardMedia">
                                      {announcement.thumbnail ? (
                                        <ImageViewer
                                          object={announcement.thumbnail}
                                          alt={announcement.title}
                                          loading="lazy"
                                        />
                                      ) : (
                                        ""
                                      )}
                                      <div
                                        className={`thumbOverlay ${announcement.thumbnail
                                          ? ""
                                          : "thumbOverlayNoImage"
                                          }`}
                                        onClick={() => viewPopup(announcement._id)}
                                      >
                                        {announcement.title}
                                      </div>
                                    </CardMedia>
                                  </Card>
                                ))}
                            </div>
                          ) : (
                            <>
                              {isLoggedIn ? (
                                <React.Fragment>
                                  <p className="text-xxs">
                                    You have not made an announcement yet. Keep visitors
                                    updated.
                                  </p>
                                  {!disabledButton ? (
                                    <AppLink
                                      className="button mt-20"
                                      to="/announcement-list"
                                      target="_blank"
                                    >
                                      Add{" "}
                                      {insWebsiteDetails.announcementhead
                                        ? insWebsiteDetails.announcementhead
                                        : "Announcement"}
                                    </AppLink>
                                  ) : (
                                    <button
                                      className="button mt-20"
                                      to="/announcement-list"
                                      target="_blank"
                                    >
                                      Add{" "}
                                      {insWebsiteDetails.announcementhead
                                        ? insWebsiteDetails.announcementhead
                                        : "Announcement"}
                                    </button>
                                  )}
                                </React.Fragment>
                              ) : (
                                `No ${insWebsiteDetails.announcementhead
                                  ? insWebsiteDetails.announcementhead
                                  : "Announcement"
                                }`
                              )}
                            </>
                          )}
                          {data.length > 0 ? (
                            <React.Fragment>
                              {" "}
                              {announcementLimit ? (
                                <NavLink to="announcements" className="button mt-20">
                                  View all{" "}
                                  {insWebsiteDetails.announcementhead
                                    ? insWebsiteDetails.announcementhead
                                    : "Announcement"}
                                </NavLink>
                              ) : (
                                <React.Fragment>
                                  {moreloading ? (
                                    <div>Loading...</div>
                                  ) : (
                                    more && (
                                      <span
                                        className="button mt-50"
                                        onClick={() => loadmore()}
                                      >
                                        View all{" "}
                                        {insWebsiteDetails.announcementhead
                                          ? insWebsiteDetails.announcementhead
                                          : "Announcement"}
                                      </span>
                                    )
                                  )}
                                </React.Fragment>
                              )}
                            </React.Fragment>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="announcement-sec" ref={ref}>
                        <div className="sectionCntrWrap">
                          <div className="PageTopHead">
                            <DynamicHeaderConsumer>
                              {(value) => (
                                <div className="PTH-Item secHeadWrap">
                                  <h3 className="heading">
                                    {value.announcementhead || "Announcements"}
                                  </h3>
                                  <p className="subheading">
                                    {value.announcementsubhead ||
                                      "Stay updated with our latest announcements."}
                                  </p>
                                </div>
                              )}
                            </DynamicHeaderConsumer>
                          </div>
                          {loading ? (
                            <div>Loading...</div>
                          ) : data.length > 0 ? (
                            <div className="announcement-grid-wrapper">
                              {data
                                .slice(
                                  0,
                                  announcementLimit ? announcementLimit : data.length
                                )
                                .map((announcement, index) => (
                                  <Card
                                    key={`announcement_${index}`}
                                    className="WA-Card"
                                  >
                                    <CardMedia className="WA-CardMedia">
                                      {announcement.thumbnail ? (
                                        <ImageViewer
                                          object={announcement.thumbnail}
                                          alt={announcement.title}
                                          loading="lazy"
                                        />
                                      ) : (
                                        ""
                                      )}
                                      <div
                                        className={`thumbOverlay ${announcement.thumbnail
                                          ? ""
                                          : "thumbOverlayNoImage"
                                          }`}
                                        onClick={() => viewPopup(announcement._id)}
                                      >
                                        {announcement.title}
                                      </div>
                                    </CardMedia>
                                  </Card>
                                ))}
                            </div>
                          ) : (
                            <>
                              {isLoggedIn ? (
                                <React.Fragment>
                                  <p className="text-xxs">
                                    You have not made an announcement yet. Keep visitors
                                    updated.
                                  </p>
                                  {!disabledButton ? (
                                    <AppLink
                                      className="button mt-20"
                                      to="/announcement-list"
                                      target="_blank"
                                    >
                                      Add{" "}
                                      {insWebsiteDetails.announcementhead
                                        ? insWebsiteDetails.announcementhead
                                        : "Announcement"}
                                    </AppLink>
                                  ) : (
                                    <button
                                      className="button mt-20"
                                      to="/announcement-list"
                                      target="_blank"
                                    >
                                      Add{" "}
                                      {insWebsiteDetails.announcementhead
                                        ? insWebsiteDetails.announcementhead
                                        : "Announcement"}
                                    </button>
                                  )}
                                </React.Fragment>
                              ) : (
                                `No ${insWebsiteDetails.announcementhead
                                  ? insWebsiteDetails.announcementhead
                                  : "Announcement"
                                }`
                              )}
                            </>
                          )}
                          {data.length > 0 ? (
                            <React.Fragment>
                              {" "}
                              {announcementLimit ? (
                                <NavLink to="announcements" className="button mt-20">
                                  View all{" "}
                                  {insWebsiteDetails.announcementhead
                                    ? insWebsiteDetails.announcementhead
                                    : "Announcement"}
                                </NavLink>
                              ) : (
                                <React.Fragment>
                                  {moreloading ? (
                                    <div>Loading...</div>
                                  ) : (
                                    more && (
                                      <span
                                        className="button mt-50"
                                        onClick={() => loadmore()}
                                      >
                                        View all{" "}
                                        {insWebsiteDetails.announcementhead
                                          ? insWebsiteDetails.announcementhead
                                          : "Announcement"}
                                      </span>
                                    )
                                  )}
                                </React.Fragment>
                              )}
                            </React.Fragment>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    )
                }
              </React.Fragment>

            )}
          </InstituteAnnouncementHoc>
          <AnnouncementPopup />
        </>
      )
    );
  }
);

export default WebsiteAnnouncement;
