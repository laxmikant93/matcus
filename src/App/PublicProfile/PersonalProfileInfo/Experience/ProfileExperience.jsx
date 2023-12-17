import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import {
  deleteExperience,
  getExperience,
} from "../../../../store/actions/publicProfile";
import EditExperience from "./EditExperience";
import ProfileExperienceAddNew from "./ProfileExperienceAddNew";
import moment from "moment";

const ProfileExperience = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [profileExperienceId, setProfileExperienceId] = useState("");

  const { userProfile, ProfileExperienceData, experienceSuccess } = useSelector(
    (state) => {
      return {
        experienceSuccess: state.publicProfile.experience.success,
        userProfile: state.publicProfile.singleProfile.data.userInfo,
        profileInfo: state.publicProfile.singleProfile.data.profileInfo,
        ProfileExperienceData: state.publicProfile.experience.data,
      };
    }
  );

  const Id = userProfile && userProfile.user;
  useEffect(() => {
    Id && dispatch(getExperience(Id));
  }, [dispatch, Id]);

  const onClickBtnDropDownRemove = (_id, isActive) => {
    setProfileExperienceId(_id);
    setIsActive(isActive);
  };

  const userId = useSelector((state) => state.user._id);

  const [visibleCount, setVisibleCount] = useState(4);
  const [editData, setEditData] = useState("");
  const seeMoreExperienceCard = () => {
    setVisibleCount((prev) => prev + 2);
  };

  const [AddExperienceModal, SetAddExperienceModal] = useState(false);
  const [EditExperienceModal, SetEditExperienceModal] = useState(false);

  const closeModalState = () => {
    SetAddExperienceModal(false);
  };

  const AddExperienceModalState = (ProfileExperience) => {
    SetAddExperienceModal(!AddExperienceModal);
    // SetEditExperienceEditModal(!EditExperienceEditModal);
    // setEditData(ProfileExperience);
  };

  const closeModalStateForEdit = () => {
    SetEditExperienceModal(false);
    setEditData("");
  };

  const EditExperienceModalState = (ProfileExperience) => {
    SetEditExperienceModal(!EditExperienceModal);
    setEditData(ProfileExperience);
  };

  const expDelete = (id, isActive) => {
    dispatch(deleteExperience(Id, id));
    setIsActive(isActive);
  };

  return (
    <React.Fragment>
      <div className="ProfileExperienceCst">
        <div className="ProfileExperience">
          <div className="ProfileExperienceHead">
            <p className="text-sm w-500">Experience</p>
            {(userProfile && userProfile.user) === userId && (
              <button
                className="button btn-xs button-primary"
                // className="button btn-xs btn-o-primary primary"
                onClick={() => AddExperienceModalState()}
              >
                <i className="ed-icon icon-plus-add i-xs white"></i>
                Add Experience
              </button>
            )}
          </div>
          <div className="ProfileExperienceContent mt-20">
            {/* {profileInfo && profileInfo.experiences.length === 0 && (
              <p className="text-xxs mb-10">Not added.</p>
            )}

            {(userProfile && userProfile.user) === userId &&
              profileInfo &&
              profileInfo.experiences.length === 0 && (
                <button
                  className="button btn-xs btn-o-primary primary"
                  onClick={() => AddExperienceModalState()}
                >
                  Add Experience
                </button>
              )} */}
            <ul className="ProfileExperienceContentList">
              {experienceSuccess && ProfileExperienceData.length > 0 ? (
                ProfileExperienceData.slice(0, visibleCount).map(
                  (ProfileExperience) => {
                    return (
                      <li key={ProfileExperience._id}>
                        <p className="text-xxs">
                          {moment(ProfileExperience.experience_from).format(
                            "MMM, YYYY"
                          )}{" "}
                          -{" "}
                          {/* {ProfileExperience.isworking || !ProfileExperience.to */}
                          {ProfileExperience.isworking
                            ? "Present"
                            : moment(ProfileExperience.experience_to).format(
                              "MMM, YYYY"
                            )}
                        </p>
                        <p className="text-xs mt-8">
                          {ProfileExperience.experience_in}
                        </p>
                        <p className="text-xs primary mt-8">
                          {ProfileExperience.school}
                        </p>
                        <p className="text-xs mt-8">
                          {ProfileExperience.about_ex}
                        </p>
                        {(userProfile && userProfile.user) === userId && (
                          <div className="PublicProfileActionButtonAfter">
                            <button
                              className="button btn-xs btn-o-primary primary"
                              onClick={() =>
                                EditExperienceModalState(ProfileExperience)
                              }
                            >
                              <i className="ed-icon icon-edit i-xxs primary"></i>
                              Edit
                            </button>
                            <button
                              className="button btn-xs btn-o-primary primary"
                              onClick={() =>
                                onClickBtnDropDownRemove(
                                  ProfileExperience._id,
                                  true
                                )
                              }
                            >
                              <i className="ed-icon icon-delete i-xs primary"></i>
                              Delete
                            </button>
                          </div>
                        )}
                        {/* delete popup */}
                        {ProfileExperience._id === profileExperienceId && (
                          <div
                            ref={dropdownRef}
                            className={`popup removePopup ${isActive ? "active" : "inactive"
                              }`}
                          >
                            <p className="heading text-xxs">
                              You are about to remove this experience.
                            </p>
                            <p className="sub-heading red text-xxs">
                              Are you sure?
                            </p>
                            <div className="removePopBtn">
                              <button
                                className="button btn-o-silver dgray btn-sm"
                                onClick={() => setIsActive(false)}
                              >
                                Cancel
                              </button>
                              <button
                                className="button button-red btn-sm"
                                onClick={() =>
                                  expDelete(ProfileExperience._id, false)
                                }
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  }
                )
              ) : (
                <p>Not Added.</p>
              )}
            </ul>
            {experienceSuccess && ProfileExperienceData.length > visibleCount && (
              <p
                className="btnText primary text-xs underline mt-20"
                onClick={seeMoreExperienceCard}
              >
                See more<i className="animate-r-arrow-icon"></i>
              </p>
            )}
          </div>
        </div>
      </div>
      {AddExperienceModal && (
        <ProfileExperienceAddNew
          closeModalStateprop={closeModalState}
          showprop={AddExperienceModal}
        />
      )}
      {EditExperienceModal && (
        <EditExperience
          editExperienceData={editData}
          closeModalStateprop={closeModalStateForEdit}
          showModal={EditExperienceModal}
        />
      )}
    </React.Fragment>
  );
};

export default ProfileExperience;
