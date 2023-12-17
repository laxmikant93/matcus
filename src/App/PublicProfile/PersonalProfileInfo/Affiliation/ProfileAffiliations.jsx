import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { IconAffiliations } from "../../../../Common/Icon";
import {
  // getAffiliate,
  getProffessionalAffilates,
} from "../../../../store/actions/publicProfile";
import AddNewAffiliate from "./AddNewAffiliate";
import EditAffiliate from "./EditAffiliate";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import { useRef } from "react";
import moment from "moment";
import { deleteProffessionalAffilates } from "../../../../store/actions/publicProfile";
const ProfileAffiliations = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [affiliateID, setAffiliateId] = useState("");
  // const ProfileAffiliationsData = useSelector(state => state.publicProfile)
  const [editData, setEditData] = useState("");
  const { user, singleProfile, ProfileAffiliations } = useSelector((state) => {
    return {
      user: state.user,
      singleProfile: state.publicProfile.singleProfile.data.userInfo,
      ProfileAffiliations: state.publicProfile.Proffesional_Affilates,
    };
  });
  const profileId = singleProfile && singleProfile.user;
  const IsUser = (user && user._id) === (singleProfile && singleProfile.user);

  const [visibleCount, setVisibleCount] = useState(4);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  useEffect(() => {
    profileId && dispatch(getProffessionalAffilates(profileId));
  }, [dispatch, profileId]);
  const seeMoreAffiliateCard = () => {
    setVisibleCount((prev) => prev + 2);
  };
  const onClickBtnDropDownRemove = (_id, isActive) => {
    setAffiliateId(_id);
    setIsActive(isActive);
  };
  const removeEducation = (id, isActive) => {
    let _id = { _id: id };
    dispatch(deleteProffessionalAffilates(profileId, _id));
    setTimeout(() => {
      dispatch(getProffessionalAffilates(profileId));
    }, 800);
    setIsActive(isActive);
  };

  const [EditAffiliationsModal, SetEditAffiliationsModal] = useState(false);
  const [AddAffiliationModal, setAddAffiliationModal] = useState(false);
  const closeModalState = () => {
    SetEditAffiliationsModal(false);
    setAddAffiliationModal(false);
  };
  const EditAffiliationsModalState = (ProfileAffiliations) => {
    SetEditAffiliationsModal(!EditAffiliationsModal);
    setEditData(ProfileAffiliations);
  };
  const AddAffiliationsModalState = () => {
    setAddAffiliationModal(!AddAffiliationModal);
  };
  return (
    <React.Fragment>
      <div className="ProfileAffiliationsCst">
        <div className="ProfileAffiliations">
          <div className="ProfileAffiliationsHead">
            {<p className="text-sm w-500">Professional Affiliations</p>}
            {IsUser && (
              <button
                className="button btn-xs button-primary"
                onClick={() => AddAffiliationsModalState()}
              >
                <i className="ed-icon icon-plus-add i-xs white"></i>
                Add New
              </button>
            )}
          </div>
          <div className="ProfileAffiliationsContent">
            {/* {ProfileAffiliations &&
            ProfileAffiliations.data &&
            ProfileAffiliations.length === 0 ? (
              <p className="text-xxs mb-10">Not added.</p>
            ) : (
              ""
            )} */}
            {/* {user === userId && (
            <React.Fragment>
              <button
                className="button btn-sm btn-o-primary primary"
                onClick={() => EditAffiliationsModalState()}
              >
                Add Affiliations
              </button>
            </React.Fragment>
             )}  */}
            <ul className="ProfileAffiliationsContentList mt-20">
              {ProfileAffiliations &&
                ProfileAffiliations.data &&
                ProfileAffiliations.data.length > 0 ? (
                ProfileAffiliations.data
                  .slice(0, visibleCount)
                  .map((ProfileAffiliations) => {
                    return (
                      <li key={ProfileAffiliations.id}>
                        <p className="text-xxs gray">
                          {moment(ProfileAffiliations.affiliation_date).format(
                            "MMM, YYYY"
                          )}
                        </p>
                        <p className="text-xs primary mt-8">
                          {ProfileAffiliations.affiliation_name}
                        </p>
                        <p className="text-xxs mt-8">
                          {ProfileAffiliations.affiliation_about}
                        </p>
                        {IsUser && (
                          <div className="PublicProfileActionButtonAfter">
                            <button
                              className="button btn-xs btn-o-primary primary"
                              onClick={() =>
                                EditAffiliationsModalState(ProfileAffiliations)
                              }
                            >
                              <i className="ed-icon icon-edit i-xxs primary"></i>
                              Edit
                            </button>
                            <button
                              className="button btn-xs btn-o-primary primary"
                              onClick={() =>
                                onClickBtnDropDownRemove(
                                  ProfileAffiliations._id,
                                  true
                                )
                              }
                            >
                              <i className="ed-icon icon-delete i-xs primary"></i>
                              Delete
                            </button>
                          </div>
                        )}
                        {ProfileAffiliations._id === affiliateID && (
                          <div
                            ref={dropdownRef}
                            className={`popup removePopup ${isActive ? "active" : "inactive"
                              }`}
                          >
                            <p className="heading text-xxs">
                              You are about to remove this professional
                              affiliations.
                            </p>
                            <p className="sub-heading red text-xxs">
                              Are you sure?
                            </p>
                            <div className="removePopBtn">
                              <button
                                className="button btn-xs btn-o-primary primary"
                                onClick={() =>
                                  EditAffiliationsModalState(
                                    ProfileAffiliations
                                  )
                                }
                              >
                                Edit
                              </button>
                              <button
                                className="button btn-xs btn-o-primary primary"
                                onClick={() =>
                                  onClickBtnDropDownRemove(
                                    ProfileAffiliations._id,
                                    true
                                  )
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                        {ProfileAffiliations._id === affiliateID && (
                          <div
                            ref={dropdownRef}
                            className={`popup removePopup ${isActive ? "active" : "inactive"
                              }`}
                          >
                            <p className="heading text-xxs">
                              You are about to remove this professional
                              affiliation.
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
                                  removeEducation(
                                    ProfileAffiliations._id,
                                    false
                                  )
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
                <p className="text-xxs mb-10">Not added.</p>
              )}
            </ul>
            {ProfileAffiliations &&
              ProfileAffiliations.data &&
              ProfileAffiliations.data.length > visibleCount && (
                <p
                  className="btnText primary text-xs underline mt-20"
                  onClick={seeMoreAffiliateCard}
                >
                  See more
                </p>
              )}
          </div>
        </div>
      </div>
      <AddNewAffiliate
        closeModalStateprop={closeModalState}
        showprop={AddAffiliationModal}
        singleProfile={singleProfile}
      />
      <EditAffiliate
        closeModalStateprop={closeModalState}
        showprop={EditAffiliationsModal}
        singleProfile={singleProfile}
        editData={editData}
      />
    </React.Fragment>
  );
};

export default ProfileAffiliations;
