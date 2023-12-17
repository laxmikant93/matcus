// import { DummyProfile, IconStar } from "../Common/Icon";
import { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormatText from "../Common/FormatText";
import DirectorCard from "./WebsiteComponents/DirectorCard";
import React from "react";
import AppLink from "../Common/AppLink";
import { NavLink } from "react-router-dom";

const WebsiteAbout = forwardRef(
  ({ instituteid, disabledButton = false, ...props }, ref) => {
    const { data, loading } = useSelector((state) => state.institutewebsite);

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
      !loading && (
        <div className="secAboutWrapCnt" ref={ref}>
          <div className="sectionCntrWrap">
            <div className="SD-AboutSection">
              <div className="SD-Item">
                <React.Fragment>
                  <div className="PageTopHead">
                    <div className="PTH-Item secHeadWrap">
                      {data.institute_about_head ? (
                        <h3 className="heading">{data.institute_about_head}</h3>
                      ) : (
                        <h3 className="heading">About {data.institute_name}</h3>
                      )}
                      {data.institute_about_subhead ? (
                        <p className="subheading">
                          {data.institute_about_subhead}
                        </p>
                      ) : (
                        <p className="subheading">
                          Changing lives, one student at a time.
                        </p>
                      )}
                    </div>
                  </div>
                  {data.institute_about ? (
                    <React.Fragment>
                      <FormatText text={data.institute_about}>
                        {({ formatedText }) => (
                          <p
                            className="sun-editor-output"
                            dangerouslySetInnerHTML={{ __html: formatedText }}
                          ></p>
                        )}
                      </FormatText>
                      {/* {!disabledButton ? (
                        <NavLink className="button mt-20" to="/about">
                          Know more about us
                        </NavLink>
                      ) : (
                        <button className="button mt-20">
                          Know more about us
                        </button>
                      )} */}
                    </React.Fragment>
                  ) : (
                    <>
                      {isLoggedIn && (
                        <React.Fragment>
                          <p className="text-xxs">
                            About us field is empty. This is your opportunity to
                            tell visitors about your institute.
                          </p>
                          <AppLink
                            className="linkbtn text-xxs mt-20"
                            to="/institute-info-manage"
                            target="_blank"
                          >
                            Add About Us
                          </AppLink>
                        </React.Fragment>
                      )}
                    </>
                  )}
                </React.Fragment>
              </div>
              <div className="SD-Item">
                <DirectorCard
                  profile={data.institute_owner_profile_photo}
                  name={data.institute_owner_name}
                  position={data.institute_owner_designation}
                  message={data.institute_owner_message}
                />
              </div>

            </div>
          </div>
        </div>
      )
    );
  }
);

export default WebsiteAbout;
