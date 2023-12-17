import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import {
  deleteEducation,
  getEducations,
} from "../../../../store/actions/publicProfile";
import AddNewEducation from "./AddNewEducation";
import EditEducation from "./EditEducation";
import moment from "moment";

const ProfileEducation = () => {
  const dropdownRef = useRef(null);
  const { userInfo } = useSelector((state) => {
    return {
      userInfo: state.publicProfile.singleProfile.data.userInfo,
      userId: state.user._id,
    };
  });

  const { fetchEducationsDataSuccess, ProfileEducationsData } = useSelector(
    (state) => {
      return {
        fetchEducationsDataSuccess: state.publicProfile.education.success,
        ProfileEducationsData: state.publicProfile.education.data,
      };
    }
  );

  const profileId = userInfo && userInfo.user;

  const dispatch = useDispatch();
  // const ProfileEducationData = useSelector(state => state.publicProfile)

  useEffect(() => {
    profileId && dispatch(getEducations(profileId));
  }, [dispatch, profileId]);

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [profileEducationId, setProfileEducationId] = useState("");

  const userId = useSelector((state) => state.user._id);

  // const [visibleCountEducation, setVisibleCountEducation] = useState(3);

  // const seeMoreEducationCard = () => {
  //   setVisibleCountEducation((prev) => prev + 3);
  // };

  const [AddEducationModal, SetAddEducationModal] = useState(false);
  const [EditEducationModal, SetEditEducationModal] = useState(false);
  const [editEducationData, setEditEducationData] = useState("");

  const AddEducationModalState = () => {
    SetAddEducationModal(!AddEducationModal);
  };
  const closeAddModalState = () => {
    SetAddEducationModal(false);
  };

  const EditEducationModalState = (awardData) => {
    SetEditEducationModal(!EditEducationModal);
    setEditEducationData(awardData);
  };
  const closeEditModalState = () => {
    SetEditEducationModal(false);
  };

  const onClickBtnDropDownRemove = (_id, isActive) => {
    setProfileEducationId(_id);
    setIsActive(isActive);
  };
  const removeEducation = (id, isActive) => {
    dispatch(deleteEducation(profileId, id));
    setIsActive(isActive);
  };

  return (
    <React.Fragment>
      <div className="ProfileEducationCst">
        <div className="ProfileEducation">
          <div className="ProfileEducationHead">
            <p className="text-sm w-500">Education</p>
            {profileId === userId && (
              <button
                className="button btn-xs button-primary"
                onClick={() => AddEducationModalState()}
              >
                <i className="ed-icon icon-plus-add i-xs white"></i>
                Add Education
              </button>
            )}
          </div>
          <div className="ProfileEducationContent">
            <ul className="ProfileEducationContentList mt-20">
              {fetchEducationsDataSuccess &&
                ProfileEducationsData.length > 0 ? (
                ProfileEducationsData.map((ProfileEducation, key) => {
                  return (
                    <li key={key}>
                      <p className="text-xxs">
                        {moment(ProfileEducation.education_from).format(
                          "MMM, YYYY"
                        )}{" "}
                        -{" "}
                        {moment(ProfileEducation.education_to).format(
                          "MMM, YYYY"
                        )}
                        {/* {ProfileEducation.tenure} */}
                      </p>
                      <p className="text-xs w-500 mt-8">
                        {ProfileEducation.education_name}
                      </p>
                      <p className="text-xs primary mt-8">
                        {ProfileEducation.education_organisation}
                      </p>
                      {profileId === userId && (
                        <div className="ProfileEducationAction mt-30">
                          <button
                            className="button btn-xs btn-o-primary primary"
                            onClick={() =>
                              EditEducationModalState(ProfileEducation)
                            }
                          >
                            <i className="ed-icon icon-edit i-xxs primary"></i>
                            Edit
                          </button>
                          <button
                            className="button btn-xs btn-o-primary primary"
                            onClick={() =>
                              onClickBtnDropDownRemove(
                                ProfileEducation._id,
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
                      {ProfileEducation._id === profileEducationId && (
                        <div
                          ref={dropdownRef}
                          className={`popup removePopup ${isActive ? "active" : "inactive"
                            }`}
                        >
                          <p className="heading text-xxs">
                            You are about to remove this education.
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
                                removeEducation(ProfileEducation._id, false)
                              }
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })
              ) : (
                <p>Not Added</p>
              )}
            </ul>

            {/* {fetchEducationsDataSuccess &&
              ProfileEducationsData.length > visibleCountEducation && (
                <p
                  className="btnText primary text-xs underline mt-20"
                  onClick={seeMoreEducationCard}
                >
                  See more<i className="animate-r-arrow-icon"></i>
                </p>
              )} */}
          </div>
        </div>
      </div>
      {AddEducationModal && (
        <AddNewEducation
          // closeModalStateprop={closeModalState}
          // showprop={EditEducationModal}
          closeModalStateprop={closeAddModalState}
          showprop={AddEducationModal}
          Id={profileId}
        />
      )}

      {EditEducationModal && (
        <EditEducation
          closeModalStateprop={closeEditModalState}
          showprop={EditEducationModal}
          editEducationData={editEducationData}
          Id={profileId}
        />
      )}
    </React.Fragment>
  );
};

export default ProfileEducation;
