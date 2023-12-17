import React from "react";
import { useSelector } from "react-redux";
import AppLink from "../../../Common/AppLink";

const ProfileStartServices = () => {
  const { userId, profile } = useSelector((state) => {
    return {
      userId: state.user._id,
      profile: state.publicProfile.singleProfile.data.userInfo,
    };
  });

  const IsFound = (profile && profile.user) !== userId;
  return (
    IsFound && (
      <div className="ProfileStartServicesWrap">
        {/* <div className="ProfileStartServicesWrap"> */}
        <div className="ProfileStartServicesItem-1">
          <p className="text-xs">
            Build your institute's website <br /> within 120 sec with Edneed.
          </p>
          <p className="text-xxs mt-10">
            Manage your faculties, teachers, students, classes, courses, fee
            structure, admissions, jobs and services.
          </p>
          {/* <button className="button btn-sm button-base mt-10">
          Add your Institute<i className="animate-r-arrow-icon"></i>
        </button> */}
          {/* <AppLink
            to="/register-institute"
            target="_blank"
            className="button btn-sm button-base mt-10"
          >
            Add Your Institute<i className="animate-r-arrow-icon"></i>
          </AppLink> */}
        </div>
        <div className="ProfileStartServicesItem-2">
          <p className="text-xs">
            Are you a private tutor, coach, trainer, chef, dancer, film maker,
            photographer, artist etc.?
          </p>
          <p className="text-xxs mt-10">
            Start your digital journey with Edneed. Schedule and conduct live
            classes, assignments and tests, to share your knowledge.
          </p>
          {/* <AppLink
            to="/register-institute"
            target="_blank"
            className="button btn-sm button-secondary mt-10"
          >
            Let's Start<i className="animate-r-arrow-icon"></i>
          </AppLink> */}
        </div>
      </div>
    )
  );
};

export default ProfileStartServices;
