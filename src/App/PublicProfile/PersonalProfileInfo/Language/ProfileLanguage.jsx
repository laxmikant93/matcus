import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getProfileLanguage } from "../../../../store/actions/publicProfile";
import AddNewProfileLanguage from "./AddNewProfileLanguage";
import EditProfileLanguage from "./EditProfileLanguage";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import {
  deleteLanguages,
  getLanguages,
} from "../../../../store/actions/publicProfile";
const ProfileLanguages = () => {
  const dispatch = useDispatch();
  const { ProfileLanguage, user, singleProfile } = useSelector((state) => {
    return {
      ProfileLanguage: state.publicProfile.Languages,
      user: state.user,
      singleProfile: state.publicProfile.singleProfile.data.userInfo,
    };
  });
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [profileAwardId, setProfileAwardId] = useState("");

  const [addlanguage, setAddLanguage] = useState(false);
  const [EditLanguageModal, SetEditLanguageModal] = useState(false);
  const [editdata, setEditdata] = useState("");
  const IsUser = (singleProfile && singleProfile.user) === (user && user._id);
  const profileId = singleProfile && singleProfile.user;

  useEffect(() => {
    // dispatch(getContact(Profileuser));

    profileId && dispatch(getLanguages(profileId));
  }, [dispatch, profileId]);

  const closeModalState = () => {
    setAddLanguage(false);
  };
  const closeEditModal = () => {
    SetEditLanguageModal(false);
    setEditdata("");
  };

  const addLanguageModalState = () => {
    setAddLanguage(!addlanguage);
  };
  const EditLanguageModalState = (Languages) => {
    SetEditLanguageModal(!EditLanguageModal);
    setEditdata(Languages);
  };

  const onClickBtnDropDownRemove = (_id, isActive) => {
    setProfileAwardId(_id);
    setIsActive(isActive);
  };

  const removeAward = (id, isActive) => {
    let objId = { _id: id };
    dispatch(deleteLanguages(profileId, objId));
    setTimeout(() => {
      dispatch(getLanguages(profileId));
    }, 800);
    setIsActive(isActive);
  };

  return (
    <React.Fragment>
      <div className="ProfileLanguagesCst">
        <div className="ProfileLanguages">
          <div className="ProfileLanguagesHead">
            <p className="text-sm w-500">Languages</p>
            {IsUser && (
              <button
                className="button btn-xs button-primary"
                onClick={() => addLanguageModalState()}
              >
                <i className="ed-icon icon-plus-add i-xs white"></i>
                Add New
              </button>
            )}
          </div>
          <div className="ProfileLanguagesContent">
            {/* <p className="text-xxs mb-10">Not added.</p>
            <React.Fragment>
              <button
                className="button btn-sm btn-o-primary primary"
                onClick={() => EditAffiliationsModalState()}
              >
                Add Certificate
              </button>
            </React.Fragment>
       */}
            <ul className="ProfileLanguagesContentList mt-20">
              {ProfileLanguage &&
                ProfileLanguage.data &&
                ProfileLanguage.data.length > 0 ? (
                ProfileLanguage.data.map((Language, key) => {
                  return (
                    <li key={key}>
                      <p className="text-xs w-500 primary">
                        {Language.language_name}
                      </p>
                      <p className="text-xs mt-8">
                        {Language.language_expertise}
                      </p>
                      <div className="ProfileLanguagesContentAction text-xs mt-8">
                        {Language.language_read !== null &&
                          Language.language_read !== "" && (
                            <React.Fragment>
                              <span className="gray">
                                {Language.language_read}
                              </span>{" "}
                              <i>&nbsp;&#10072;&nbsp;</i>
                            </React.Fragment>
                          )}

                        {Language.language_write !== null &&
                          Language.language_write !== "" && (
                            <React.Fragment>
                              <span className="gray">
                                {Language.language_write}
                              </span>
                              <i>&nbsp;&#10072;&nbsp;</i>
                            </React.Fragment>
                          )}
                        {Language.language_speak !== null &&
                          Language.language_speak !== "" && (
                            <span className="gray">
                              {Language.language_speak}
                            </span>
                          )}
                        {IsUser && (
                          <div className="ProfileLanguageAction mt-20">
                            <button
                              type="button"
                              className="button btn-xs btn-o-primary primary"
                              onClick={() => EditLanguageModalState(Language)}
                            >
                              <i className="ed-icon icon-edit i-xxs primary"></i>
                              Edit
                            </button>
                            <button
                              className="button btn-xs btn-o-primary primary"
                              onClick={() =>
                                onClickBtnDropDownRemove(Language._id, true)
                              }
                            >
                              <i className="ed-icon icon-delete i-xs primary"></i>
                              Delete
                            </button>

                            {Language._id === profileAwardId && (
                              <div
                                ref={dropdownRef}
                                className={`popup removePopup ${isActive ? "active" : "inactive"
                                  }`}
                              >
                                <p className="heading text-xxs">
                                  You are about to remove this language.
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
                                      removeAward(Language._id, false)
                                    }
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })
              ) : (
                <p>Not Added.</p>
              )}
            </ul>
            <EditProfileLanguage
              closeModalState={closeEditModal}
              show={EditLanguageModal}
              user={user}
              singleProfile={singleProfile}
              editdata={editdata}
            />
          </div>
        </div>
      </div>
      <AddNewProfileLanguage
        closeModalStateprop={closeModalState}
        showprop={addlanguage}
        user={user}
        singleProfile={singleProfile}
      />
    </React.Fragment>
  );
};

export default ProfileLanguages;
