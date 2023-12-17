import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SessionStorage from "../../Classes/SessionStorage";
import AppLink from "../../Common/AppLink";
import { privateDomainAddNewIns } from "../../Constant/auth";
import FeedHead from "./FeedHead";

const FeedHeroContent = () => {
  const user = useSelector((state) => state.user);

  const history = useNavigate();
  const AddNewInstitute = () => {
    SessionStorage.setBool(privateDomainAddNewIns, true);
    history("/check-domain");
  };
  return (
    <React.Fragment>
      <div className="ED-FeedHeadWrapper">
        <div className="ED-FeedHeadItem mt-30">
          <FeedHead />
        </div>
        {/* <div className="ED-FeedHeadItem mt-30">
          <AppLink
            to="/edneed-video"
            target="_blank"
            className="button btn-o-primary btn-oval ED-WatchVideoBtn"
          >
            <span className="ED-WatchVideoIcon">
              <i className="ed-icon icon-video i-md white"></i>
            </span>
            Watch our videos
            <br /> for more help
          </AppLink>
        </div> */}
      </div>
      <div className="FeedHeroContWrap">
        <div className="FeedHeroContent">
          {user.user_usertype === "InstituteOwner" ||
            user.user_usertype === "Other" ? (
            <div className="FeedHeroContentItem">
              <p className="text-xs primary w-500">
                Are you an institute owner?
              </p>
              <p className="text-xxs base w-300 mt-10">
                Digitize your institute and conduct online classes, assignments
                and tests with Edneed's Learning Management System.
              </p>
              <div className="FeedHeroContentAction mt-20">
                <button className="button button-primary btn-sm" onClick={AddNewInstitute}>
                  Add Institute
                </button>
                {/* <AppLink
                  to="/register-institute"
                  className="button button-primary btn-sm"
                >
                  Add Institute
                </AppLink> */}
                <AppLink
                  to="/request-demo"
                  className="button button-primary btn-sm"
                >
                  Book Free Demo
                </AppLink>
              </div>
            </div>
          ) : (
            ""
          )}

          {user.user_usertype === "InstituteOwner" ||
            user.user_usertype === "Teacher" ||
            user.user_usertype === "Other" ? (
            <div className="FeedHeroContentItem">
              <p className="text-xs secondary w-500">
                Are you a private tutor or trainer?
              </p>
              <p className="text-xxs base w-300 mt-10">
                On Edneed you can digitize your classes in just 120 seconds
                seamlessly.
              </p>
              <div className="FeedHeroContentAction mt-20">
                <button className="button button-secondary btn-sm" onClick={AddNewInstitute}>
                  Get Started
                </button>
                {/* <AppLink
                  to="/register-institute"
                  className="button button-secondary btn-sm"
                >
                  Get Started
                </AppLink> */}
                <AppLink
                  to="/request-demo"
                  className="button button-secondary btn-sm"
                >
                  Book Free Demo
                </AppLink>
              </div>
            </div>
          ) : (
            ""
          )}
          {user.user_usertype === "Teacher" ||
            user.user_usertype === "Other" ? (
            <div className="FeedHeroContentItem">
              <p className="text-xs secondary w-500">Are you a teacher?</p>
              <p className="text-xxs base w-300 mt-10">
                Are you associated with any institute? Find them on Edneed.
              </p>
              <div className="FeedHeroContentAction mt-20">
                <AppLink
                  to="/Institute/institute-listing"
                  className="button button-secondary btn-sm"
                >
                  Discover Institutes
                </AppLink>
              </div>
            </div>
          ) : (
            ""
          )}
          {user.user_usertype === "Student" ||
            user.user_usertype === "Other" ? (
            <div className="FeedHeroContentItem">
              <p className="text-xs purple w-500">Are you a student?</p>
              <p className="text-xxs base w-300 mt-10">
                Don't miss out on your classes and assignments. Send Add Request
                to your Institute.
              </p>
              <div className="FeedHeroContentAction mt-20">
                <AppLink
                  to="/Institute/institute-listing"
                  className="button button-purple btn-sm"
                >
                  Discover Institutes
                </AppLink>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="FeedHeroContentItem">
            <p className="text-xs bsPink w-500">Join our learning community</p>
            <p className="text-xxs base w-300 mt-10">
              Practice knowledge sharing, productive networking and build the
              best practices in education-together
            </p>
            <div className="FeedHeroContentAction mt-20">
              <AppLink
                to="/community"
                className="button button-bsPink btn-sm"
              >
                Discover Community
              </AppLink>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FeedHeroContent;
