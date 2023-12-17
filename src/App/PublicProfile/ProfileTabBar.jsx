import React, { useState } from "react";
import ProfilePersonalInfo from "../PublicProfile/PersonalProfileInfo";
import ProfileReviews from "../PublicProfile/ProfileReviews";
import ProfileGallery from "./ProfileGallery";
import ProfileVideos from "./ProfileVideos";
import ProfileContact from "./ProfileContact";
import ProfileAskQuestion from "./ProfileAskQuestion";
import { useDispatch, useSelector } from "react-redux";
import {
  getContact,
  getprimaryAddress,
  getWorkAddress,
} from "../../store/actions/publicProfile";
import { useEffect } from "react";
const ProfileTabBar = ({ tabbar, setTabbar }) => {
  const { user, singleProfile, contactData, primaryAddress, workAddress } =
    useSelector((state) => {
      return {
        user: state.user,
        singleProfile: state.publicProfile.singleProfile.data.userInfo,
        contactData: state.publicProfile.contact.data,
        primaryAddress: state.publicProfile.primaryAddress.data,
        workAddress: state.publicProfile.workAddress.data,
      };
    });
  const dispatch = useDispatch();
  const profileId = singleProfile && singleProfile.user;
  const isUser = (user && user._id) === profileId;
  const [focus, setfocus] = useState(false);
  useEffect(() => {
    profileId && dispatch(getContact(profileId));
    profileId && dispatch(getprimaryAddress(profileId));
    profileId && dispatch(getWorkAddress(profileId));
  }, [dispatch, profileId]);
  const [toggle, setToggle] = useState("ProfilePersonalInfo");
  const emailprivate =
    contactData &&
    contactData.primary_email &&
    contactData.primary_email.visibility === "Private";
  const contactprivate =
    contactData &&
    contactData.primary_contact &&
    contactData.primary_contact.visibility === "Private";
  const addressprivate =
    primaryAddress &&
    primaryAddress[0] &&
    primaryAddress[0].visibility === "Private";
  const workprivate =
    workAddress && workAddress[0] && workAddress[0].visibility === "Private";

  const privateContact = () => {
    if (emailprivate && contactprivate && addressprivate && workprivate) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    setToggle(tabbar);
    tabbar === "ProfileReviews" && setfocus(true);
    setTimeout(() => {
      setfocus(false)
    }, 800)
    document.getElementById("tabfocus").focus()
  }, [tabbar]);
  const changeProfilepersonal = () => {
    setToggle("ProfilePersonalInfo");
    setTabbar("ProfilePersonalInfo");
  };
  const changeProfilegallery = () => {
    setToggle("ProfileGallery");
    setTabbar("ProfileGallery");
  };
  const changeProfilevideos = () => {
    setToggle("ProfileVideos");
    setTabbar("ProfileVideos");
  };
  const changeProfilecontact = () => {
    setToggle("ProfileContact");
    setTabbar("ProfileContact");
  };
  return (
    <div className="ProfileTabBar">
      <div className="ProfileTabBarCst">
        <div className="scroll-nav-tab-wrapper">
          <ul className="ProfileTabList scroll-nav-tab">
            <li
              className={toggle === "ProfilePersonalInfo" ? "active" : ""}
              onClick={() => changeProfilepersonal()}
            >
              Personal Info
            </li>
            <li
              className={toggle === "ProfileReviews" ? "active" : ""}
              onClick={() => setToggle("ProfileReviews")}
            >
              Reviews
            </li>
            <li
              className={toggle === "ProfileGallery" ? "active" : ""}
              onClick={() => changeProfilegallery()}
            >
              Photos
            </li>
            <li
              className={toggle === "ProfileVideos" ? "active" : ""}
              onClick={() => changeProfilevideos()}
            >
              Videos
            </li>

            {!privateContact() && !isUser && singleProfile ? (
              <li
                className={toggle === "ProfileContact" ? "active" : ""}
                onClick={() => changeProfilecontact()}
              >
                Contact
              </li>
            ) : (
              isUser &&
              singleProfile && (
                <li
                  className={toggle === "ProfileContact" ? "active" : ""}
                  onClick={() => changeProfilecontact()}
                >
                  Contact
                </li>
              )
            )}
            {/* <li
              className={toggle === "ProfileAskQuestion" ? "active" : ""}
              onClick={() => setToggle("ProfileAskQuestion")}
            >
              Ask a Question
            </li> */}
          </ul>
        </div>
        <div className="ProfileTabListContent" id="tabfocus">
          {toggle === "ProfilePersonalInfo" ? (
            <ProfilePersonalInfo />
          ) : toggle === "ProfileReviews" ? (
            <ProfileReviews focus={focus} />
          ) : toggle === "ProfileGallery" ? (
            <ProfileGallery />
          ) : toggle === "ProfileVideos" ? (
            <ProfileVideos />
          ) : toggle === "ProfileContact" ? (
            <ProfileContact />
          ) : toggle === "ProfileAskQuestion" ? (
            <ProfileAskQuestion />
          ) : (
            <ProfilePersonalInfo />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileTabBar;
