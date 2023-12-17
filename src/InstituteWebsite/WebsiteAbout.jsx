// import { DummyProfile, IconStar } from "../Common/Icon";
import { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DirectorCard from "./WebsiteComponents/DirectorCard";
import FormatText from "../Common/FormatText";
import { NavLink } from "react-router-dom";
import AppLink from "../Common/AppLink";
import React from "react";
import ImageViewer from "../Common/ImageViewer";

const WebsiteAbout = forwardRef(({ instituteid, ...props }, ref) => {
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
                      <p className="subheading">{data.institute_about_subhead}</p>
                    ) : (
                      <p className="subheading">Changing lives, one student at a time.</p>
                    )}
                  </div>
                </div>
                {data.institute_about ? (
                  <React.Fragment>
                    <FormatText text={data.institute_about}>
                      {({ formatedText }) => (
                        <p className="sun-editor-output"
                          dangerouslySetInnerHTML={{ __html: formatedText }}
                        ></p>
                      )}
                    </FormatText>
                  </React.Fragment>
                ) : (
                  <>
                    {isLoggedIn ? (
                      <React.Fragment>
                        <FormatText text={data.institute_about}>
                          {({ formatedText }) => (
                            <p
                              className="sun-editor-output"
                              dangerouslySetInnerHTML={{ __html: formatedText }}
                            ></p>
                          )}
                        </FormatText>
                        <NavLink
                          className="button mt-20"
                          to="/aboutus"
                        >
                          Know more about us
                        </NavLink>
                      </React.Fragment>
                    ) : (
                      <p className="NoContentFoundCst">No Data Found</p>
                    )}
                  </>
                )}
              </React.Fragment>
            </div>
            <div
              className={`SD-Item ${data.institute_about_upload || !isLoggedIn ? "" : "SD-AbtBanner"
                }`}
            >
              {data.institute_about_upload ? (
                <ImageViewer
                  object={data.institute_about_upload}
                  height="300"
                  className="gallery-thumnail"
                  loading="lazy"
                  alt=""
                />
              ) : (
                <>
                  {isLoggedIn ? (
                    <div className="DefaultOverlay">
                      <div className="DefaultOverlayWrap">
                        <p className="text-2xs">No Banner Added</p>
                        <AppLink
                          className="linkbtn text-xxs p-0"
                          to="/institute-info-manage"
                          target="_blank"
                        >
                          Add Here
                        </AppLink>
                      </div>
                    </div>
                  ) : (
                    <p className="NoContentFoundCst">No Image Found</p>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="SD-AboutSection mt-60">
            <div className="SD-Item">
              <div className="institute-missionVision-text">
                <div className="PageTopHead">
                  <div className="PTH-Item secHeadWrap">
                    {data.institute_mission_head ? (
                      <h3 className="heading">{data.institute_mission_head}</h3>
                    ) : (
                      <h3 className="heading">Our Mission</h3>
                    )}
                    {data.institute_mission_subhead ? (
                      <p className="subheading">{data.institute_mission_subhead}</p>
                    ) : (
                      <p className="subheading">Strive for progress, not perfection.</p>
                    )}
                  </div>
                </div>

                {data.institute_mission ? (
                  <FormatText text={data.institute_mission}>
                    {({ formatedText }) => (
                      <p
                        className="sun-editor-output"
                        dangerouslySetInnerHTML={{ __html: formatedText }}
                      ></p>
                    )}
                  </FormatText>
                ) : (
                  <>
                    {isLoggedIn ? (
                      <React.Fragment>
                        <p className="text-xxs">
                          Our mission statement field is empty. Tell visitors
                          what your institute stands for.
                        </p>
                        <AppLink
                          className="linkbtn text-xxs"
                          to="/institute-info-manage"
                          target="_blank"
                        >
                          Add Mission Statement
                        </AppLink>
                      </React.Fragment>
                    ) : (
                      <p className="NoContentFoundCst">No Data Found</p>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="SD-Item">
              <div className="institute-missionVision-text">
                <div className="PageTopHead">
                  <div className="PTH-Item secHeadWrap">
                    {data.institute_vision_head ? (
                      <h3 className="heading">{data.institute_vision_head}</h3>
                    ) : (
                      <h3 className="heading">Our Vision</h3>
                    )}
                    {data.institute_vision_subhead ? (
                      <p className="subheading">{data.institute_vision_subhead}</p>
                    ) : (
                      <p className="subheading">Excellence is not a skill. It is an attitude.</p>
                    )}
                  </div>
                </div>
                {data.institute_vision ? (
                  <FormatText text={data.institute_vision}>
                    {({ formatedText }) => (
                      <p
                        className="sun-editor-output"
                        dangerouslySetInnerHTML={{ __html: formatedText }}
                      ></p>
                    )}
                  </FormatText>
                ) : (
                  <>
                    {isLoggedIn ? (
                      <React.Fragment>
                        <p className="text-xxs">
                          Our vision field is empty. Tell visitors about the
                          meaning and purpose behind your institute.
                        </p>
                        <AppLink
                          className="linkbtn text-xxs"
                          to="/institute-info-manage"
                          target="_blank"
                        >
                          Add Vision Statement
                        </AppLink>
                      </React.Fragment>
                    ) : (
                      <p className="NoContentFoundCst">No Data Found</p>
                    )}
                  </>
                )}
                <p className="mt-20"></p>
              </div>
            </div>
          </div>

          <div className="SD-AboutSection mt-60">
            <div className="SD-Item">
              <DirectorCard
                profile={data.institute_owner_profile_photo}
                name={data.institute_owner_name}
                position={data.institute_owner_designation}
                message={data.institute_owner_message}
              />
            </div>
            <div
              className={`SD-Item ${data.institute_intro_video ? "" : "SD-IntroVideo"
                }`}
            >
              <div
                className={`institute-about-video ${data.institute_intro_video || !isLoggedIn
                  ? ""
                  : "SD-IntroVideo"
                  }`}
              >
                {data.institute_intro_video ? (
                  <React.Fragment>
                    <div className="PageTopHead">
                      <div className="PTH-Item secHeadWrap">
                        <h3>{data.institute_intro_title}</h3>
                        <p>{data.institute_intro_description}</p>
                      </div>
                    </div>
                    {data.institute_intro_video.includes(".mp4") ? (
                      <video
                        src={data.institute_intro_video}
                        controls
                        className="IntroVideoCst"
                        alt=""
                      />
                    ) : (
                      <iframe
                        title="youtube video"
                        src={data.institute_intro_video}
                        frameborder="0"
                        width="350"
                        height="250"
                      ></iframe>
                    )}
                  </React.Fragment>
                ) : (
                  <>
                    {isLoggedIn ? (
                      <div className="DefaultOverlay">
                        <div className="DefaultOverlayWrap NoBg">
                          <i className="ed-icon icon-upload-video i-65 mgray"></i>
                          <p className="text-2xs">
                            Videos are 85% more engaging than photos.
                          </p>
                          <p className="text-2xs">
                            You have not added one yet.
                          </p>
                          <AppLink
                            className="linkbtn text-xxs p-0"
                            to="/institute-info-manage"
                            target="_blank"
                          >
                            Upload Video
                          </AppLink>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
});

export default WebsiteAbout;
