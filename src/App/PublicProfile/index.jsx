import React, { useEffect, useState } from "react";
import ProfileHero from "./ProfileHero";
import ProfileHeroInfo from "./ProfileHeroInfo";
import ProfileTabBar from "./ProfileTabBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getpublicprofileById,
  getPublicProfiles,
} from "../../store/actions/publicProfile";
import { useLocation } from "react-router-dom";
import ComponentLoader from "../../Common/Loader/ComponentLoader";
import "./PublicProfile.scss";
import GetNotification from "../Notifications/GetNotification";

const PublicProfile = () => {
  const dispatch = useDispatch();
  const param = useLocation();
  const username = param.pathname.split("/");
  const [tabbar, setTabbar] = useState("ProfilePersonalInfo");
  const { userData, dataLoaded } = useSelector((state) => {
    return {
      userData: state.publicProfile.singleProfile.data,
      dataLoaded: state.publicProfile.singleProfile.loaded,
      userEdit: state.publicProfile.editLink.data,
    };
  });

  const Profileuser = userData.userInfo && userData.userInfo.user;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [Profileuser]);

  // useEffect(() => {
  //   dispatch(createUserProfile({ id: user._id }));
  // }, [dispatch, user._id]);

  useEffect(() => {
    dispatch(getpublicprofileById(username.pop()));
    dispatch(getPublicProfiles(10, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="PublicProfileWrapper">
        {userData && dataLoaded ? (
          <>
            <ProfileHero setTabbar={setTabbar} />
            <ProfileHeroInfo />
            <ProfileTabBar setTabbar={setTabbar} tabbar={tabbar} />
          </>
        ) : (
          <ComponentLoader />
        )}
      </div>
    </React.Fragment>
  );
};

export default PublicProfile;
