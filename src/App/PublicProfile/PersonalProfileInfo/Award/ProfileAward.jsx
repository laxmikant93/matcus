import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import {
  deleteAward,
  getAwards,
} from "../../../../store/actions/publicProfile";
import AddNewAward from "./AddNewAward";
import EditAward from "./EditAward";
import moment from "moment";

// const ProfileAward = memo(() => {
function ProfileAward() {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const { userInfo } = useSelector((state) => {
    return {
      userInfo: state.publicProfile.singleProfile.data.userInfo,
      userId: state.user._id,
    };
  });

  const profileId = userInfo && userInfo.user;

  useEffect(() => {
    profileId && dispatch(getAwards(profileId));
  }, [dispatch, profileId]);

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [profileAwardId, setProfileAwardId] = useState("");

  const userId = useSelector((state) => state.user._id);

  const isUserFound = profileId === userId;

  const { fetchAwardsDataSuccess, ProfileAwardsData } = useSelector((state) => {
    return {
      fetchAwardsDataSuccess: state.publicProfile.awards.success,
      ProfileAwardsData: state.publicProfile.awards.data,
    };
  });

  const [visibleCountAward, setVisibleCountAward] = useState(3);
  const seeMoreAwardCard = () => {
    setVisibleCountAward((prev) => prev + 3);
  };

  const [AddAwardModal, SetAddAwardModal] = useState(false);
  const [EditAwardModal, SetEditAwardModal] = useState(false);
  const [editAwardData, setEditAwardData] = useState("");

  const closeAddModalState = () => {
    SetAddAwardModal(false);
  };

  const AddAwardModalState = () => {
    SetAddAwardModal(!AddAwardModal);
  };

  const closeEditModalState = () => {
    SetEditAwardModal(false);
  };

  const EditAwardModalState = (awardData) => {
    SetEditAwardModal(!EditAwardModal);
    setEditAwardData(awardData);
  };

  const onClickBtnDropDownRemove = (_id, isActive) => {
    setProfileAwardId(_id);
    setIsActive(isActive);
  };

  const removeAward = (id, isActive) => {
    dispatch(deleteAward(profileId, id));
    setIsActive(isActive);
  };

  return (
    <div className="ProfileAwardCst">
      <div className="ProfileAwards">
        <div className="ProfileAwardsHead">
          <p className="text-sm w-500">Awards</p>
          {isUserFound && (
            <button
              className="button btn-xs button-primary"
              onClick={() => AddAwardModalState()}
            >
              <i className="ed-icon icon-plus-add i-xs white"></i>
              Add Award
            </button>
          )}
        </div>

        <div className="ProfileAwardsContent mt-20">
          <ul className="ProfileAwardsContentList">
            {fetchAwardsDataSuccess && ProfileAwardsData.length > 0 ? (
              ProfileAwardsData.slice(0, visibleCountAward).map(
                (ProfileAwards) => {
                  return (
                    <li key={ProfileAwards._id}>
                      <p className="text-xxs">
                        {moment(ProfileAwards.award_date).format("MMM, YYYY")}
                      </p>
                      <p className="text-xs w-500 mt-8">
                        {ProfileAwards.award_name}
                      </p>
                      <p className="text-xs primary mt-8">
                        {ProfileAwards.award_by}
                      </p>
                      {isUserFound && (
                        <div className="ProfileAwardsAction mt-30">
                          <button
                            className="button btn-xs btn-o-primary primary"
                            onClick={() => EditAwardModalState(ProfileAwards)}
                          >
                            <i className="ed-icon icon-edit i-xxs primary"></i>
                            Edit
                          </button>
                          <button
                            className="button btn-xs btn-o-primary primary"
                            onClick={() =>
                              onClickBtnDropDownRemove(ProfileAwards._id, true)
                            }
                          >
                            <i className="ed-icon icon-delete i-xs primary"></i>
                            Delete
                          </button>
                        </div>
                      )}
                      {/* delete popup */}
                      {ProfileAwards._id === profileAwardId && (
                        <div
                          ref={dropdownRef}
                          className={`popup removePopup ${isActive ? "active" : "inactive"
                            }`}
                        >
                          <p className="heading text-xxs">
                            You are about to remove this award.
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
                                removeAward(ProfileAwards._id, false)
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
              <p>Not Added</p>
            )}
          </ul>
          {ProfileAwardsData.length > visibleCountAward && (
            <p
              className="btnText primary text-xs underline mt-20"
              onClick={seeMoreAwardCard}
            >
              See more
            </p>
          )}

          {AddAwardModal && (
            <AddNewAward
              closeModalStateprop={closeAddModalState}
              showprop={AddAwardModal}
              Id={profileId}
            />
          )}

          {EditAwardModal && (
            <EditAward
              closeModalStateprop={closeEditModalState}
              showprop={EditAwardModal}
              editAwardData={editAwardData}
              Id={profileId}
            />
          )}
        </div>
      </div>
    </div>
  );
}
// );

export default ProfileAward;
