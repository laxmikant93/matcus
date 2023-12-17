import { forwardRef, useEffect, useState } from "react";
import DummyProfile from "../assets/images/img/DummyProfile.png";

import { useDispatch, useSelector } from "react-redux";
import {
  loadFacultyList,
  loadFacultyListMore,
} from "../store/actions/institutefaculty";
import React from "react";
import { NavLink } from "react-router-dom";
import AppLink from "../Common/AppLink";
import { DynamicHeaderConsumer } from "../Context/DynamicHeaderContext";
import ImageViewer from "../Common/ImageViewer";

const WebsiteFaculty = forwardRef(
  ({ instituteid, ShowFacultyLimit, homePage, disabledButton = false }, ref) => {
    const loadlimit = ShowFacultyLimit ? ShowFacultyLimit : 8;
    const { loading, more, moreloading, data, total, skip } = useSelector((state) => state.institutefaculty);

    const insWebsiteDetails = useSelector(
      (state) => state.institutewebsite.heading
    );
    const { websiteType } = useSelector((state) =>
      state.websiteTemplate.getTemplate);


    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(loadFacultyList(instituteid, loadlimit, "", websiteType));
    }, [dispatch, websiteType, instituteid, loadlimit]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      <React.Fragment>
        {
          homePage ?
            instituteid && data.length > 0 && (
              <div className="team-gallery-sec" ref={ref}>
                <div className="sectionCntrWrap">
                  <div className="PageTopHead">
                    {
                      <DynamicHeaderConsumer>
                        {(value) => (
                          <div className="PTH-Item secHeadWrap">
                            <h3 className="heading">
                              {value.facultyhead || "Our Faculty"}
                            </h3>
                            <p className="subheading">
                              {value.facultysubhead ||
                                "To be the best, you must learn from the best."}
                            </p>
                          </div>
                        )}
                      </DynamicHeaderConsumer>
                    }
                  </div>

                  {loading ? (
                    <div>Loading...</div>
                  ) : data.length > 0 ? (
                    <div className="team-gallery-wrapper">
                      {data.map((user, index) => (
                        <div key={`team_${index}`} className="team-gallery">
                          <div key={`faculty_${index}`} className="team-gallery-img">
                            {user.profileurl ? (
                              <ImageViewer
                                object={user.profileurl}
                                alt={user.fullname}
                                loading="lazy"
                              />
                            ) : (
                              <img
                                src={DummyProfile}
                                alt={user.fullname}
                                loading="lazy"
                              />
                            )}
                          </div>
                          <div className="team-gallery-caption mt-10">
                            <p className="text-xs w-600">{user.fullname}</p>
                            <p className="text-xxs">{user.designation}</p>
                            {/* <a
                          href={`profile/${user.user_username}`}
                          rel="noreferrer"
                          target="_blank"
                        >
                          View Profile
                        </a> */}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      {isLoggedIn ? (
                        <React.Fragment>
                          <p className="text-xxs">
                            Team work makes the dream work. Your visitors are
                            interested in this information.
                          </p>
                          <AppLink
                            className="button mt-20"
                            to="/add-faculty"
                            target="_blank"
                          >
                            Add{" "}
                            {insWebsiteDetails.facultyhead
                              ? insWebsiteDetails.facultyhead
                              : "Faculties"}
                          </AppLink>
                        </React.Fragment>
                      ) : (
                        "No Faculty"
                      )}
                    </>
                  )}
                  {data.length === 0 ? (
                    ""
                  ) : (
                    <React.Fragment>
                      {ShowFacultyLimit ? (
                        !disabledButton ? (
                          <NavLink className="button mt-20" to="/faculty">
                            View all{" "}
                            {insWebsiteDetails.facultyhead
                              ? insWebsiteDetails.facultyhead
                              : "Faculties"}
                          </NavLink>
                        ) : (
                          <button className="button mt-20">
                            View all{" "}
                            {insWebsiteDetails.facultyhead
                              ? insWebsiteDetails.facultyhead
                              : "Faculties"}
                          </button>
                        )
                      ) : (
                        <React.Fragment>
                          {moreloading ? (
                            <div>Loading...</div>
                          ) : (
                            more && (
                              <p>
                                {/* <span
                                  className="text-xxs w-600 base primary linkbtn"
                                  onClick={() =>
                                    dispatch(
                                      loadFacultyListMore(
                                        instituteid,
                                        loadlimit,
                                        skip,
                                        industryType
                                      )
                                    )
                                  }
                                >
                                  Load More
                                </span> */}
                              </p>
                            )
                          )}
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  )}
                </div>
              </div>
            ) : (
              <div className="team-gallery-sec" ref={ref}>
                <div className="sectionCntrWrap">
                  <div className="PageTopHead">
                    {
                      <DynamicHeaderConsumer>
                        {(value) => (
                          <div className="PTH-Item secHeadWrap">
                            <h3 className="heading">
                              {value.facultyhead || "Our Faculty"}
                            </h3>
                            <p className="subheading">
                              {value.facultysubhead ||
                                "To be the best, you must learn from the best."}
                            </p>
                          </div>
                        )}
                      </DynamicHeaderConsumer>
                    }
                  </div>

                  {loading ? (
                    <div>Loading...</div>
                  ) : data.length > 0 ? (
                    <div className="team-gallery-wrapper">
                      {data.map((user, index) => (
                        <div key={`team_${index}`} className="team-gallery">
                          <div key={`faculty_${index}`} className="team-gallery-img">
                            {user.profileurl ? (
                              <ImageViewer
                                object={user.profileurl}
                                alt={user.fullname}
                                loading="lazy"
                              />
                            ) : (
                              <img
                                src={DummyProfile}
                                alt={user.fullname}
                                loading="lazy"
                              />
                            )}
                          </div>
                          <div className="team-gallery-caption mt-10">
                            <p className="text-xs w-600">{user.fullname}</p>
                            <p className="text-xxs">{user.designation}</p>
                            {/* <a
                          href={`profile/${user.user_username}`}
                          rel="noreferrer"
                          target="_blank"
                        >
                          View Profile
                        </a> */}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      {isLoggedIn ? (
                        <React.Fragment>
                          <p className="text-xxs">
                            Team work makes the dream work. Your visitors are
                            interested in this information.
                          </p>
                          <AppLink
                            className="button mt-20"
                            to="/add-faculty"
                            target="_blank"
                          >
                            Add{" "}
                            {insWebsiteDetails.facultyhead
                              ? insWebsiteDetails.facultyhead
                              : "Faculties"}
                          </AppLink>
                        </React.Fragment>
                      ) : (
                        `No ${insWebsiteDetails.facultyhead
                          ? insWebsiteDetails.facultyhead
                          : "Faculty"}`
                      )}
                    </>
                  )}
                  {data.length === 0 ? (
                    ""
                  ) : (
                    <React.Fragment>
                      {ShowFacultyLimit ? (
                        !disabledButton ? (
                          <NavLink className="button mt-20" to="/faculty">
                            View all{" "}
                            {insWebsiteDetails.facultyhead
                              ? insWebsiteDetails.facultyhead
                              : "Faculties"}
                          </NavLink>
                        ) : (
                          <button className="button mt-20">
                            View all{" "}
                            {insWebsiteDetails.facultyhead
                              ? insWebsiteDetails.facultyhead
                              : "Faculties"}
                          </button>
                        )
                      ) : (
                        <React.Fragment>
                          {moreloading ? (
                            <div>Loading...</div>
                          ) : (
                            more && (
                              <p>
                                {/* <span
                                  className="text-xxs w-600 base primary linkbtn"
                                  onClick={() =>
                                    dispatch(
                                      loadFacultyListMore(
                                        instituteid,
                                        loadlimit,
                                        skip,
                                        industryType
                                      )
                                    )
                                  }
                                >
                                  Load More
                                </span> */}
                              </p>
                            )
                          )}
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  )}
                </div>
              </div>
            )
        }
      </React.Fragment>

    );
  }
);

export default WebsiteFaculty;
