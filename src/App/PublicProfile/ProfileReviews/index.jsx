import React, { useEffect, useRef, useState } from "react";
import ProfileReviewsForm from "./ProfileReviewsForm";
import DummyProfile from "../../../assets/images/img/DummyProfile.png";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  deleteReview,
  getProfileReviews,
  // postProfileReviews,
} from "../../../store/actions/publicProfile";
import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
import StarRating from "./StarRating";
import EditReviews from "./EditReviews";

const ProfileReviews = ({ focus }) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const { ProfileReviewData, profileReviewSuccess, postData } = useSelector(
    (state) => {
      return {
        ProfileReviewData: state.publicProfile.reviews.allReviews,
        postData: state.publicProfile.reviews.postReview,
        profileReviewSuccess: state.publicProfile.reviews.success,
      };
    }
  );

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [profileReviewId, setProfileReviewId] = useState("");

  const userInfo = useSelector(
    (state) => state.publicProfile.singleProfile.data.userInfo
  );
  const userID = useSelector((state) => state.user._id);

  const id = userInfo && userInfo.user;
  // const isUserFound = id === userID;

  useEffect(() => {
    dispatch(getProfileReviews(id));
  }, [dispatch, id, postData]);

  const [visibleCount, setVisibleCount] = useState(8);

  const seeMoreReviews = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const reviewCount = () => {
    let count = visibleCount;
    let totalCount = 0;
    if (ProfileReviewData.length <= count) {
      totalCount = ProfileReviewData.length;
      return totalCount;
    } else if (ProfileReviewData.length > count) {
      totalCount = count;
      return totalCount;
    }
  };

  // handle Remove POPUP
  const onClickBtnDropDownRemove = (_id, isActive) => {
    setProfileReviewId(_id);
    setIsActive(isActive);
  };

  const removeProfileReview = (userId, isActive) => {
    dispatch(deleteReview(id, { reviewerid: id, _id: userId }));
    setIsActive(isActive);
  };

  const [EditAffiliationsModal, SetEditAffiliationsModal] = useState(false);
  const [editReviewData, setEditReviewData] = useState("");
  const [dataRating, setDataRating] = useState(0);

  const closeModalState = () => {
    SetEditAffiliationsModal(false);
  };
  const EditAffiliationsModalState = (data) => {
    SetEditAffiliationsModal(!EditAffiliationsModal);
    setEditReviewData(data);
    setDataRating(data.rating);
  };

  return (
    <React.Fragment>
      <div className="ProfileReviewsCst">
        <div className="ProfileReviewsHead">
          <p className="text-sm PR-Head">
            {/* <span>{profileReviewSuccess && ProfileReviewData.length}</span> */}
            <span>{ProfileReviewData.length}</span>
            &nbsp; Reviews
          </p>
          <ProfileReviewsForm focus={focus} />
        </div>
        <div className="ProfileReviewsBody">
          <ul className="mt-20">
            {profileReviewSuccess && ProfileReviewData.length > 0 ? (
              ProfileReviewData.slice(0, visibleCount).map((ProfileReview) => {
                return (
                  <React.Fragment>
                    <li className="ProfileReviewContent">
                      <ul
                        className="ProfileReviewContentList"
                        key={ProfileReview._id}
                      >
                        <li className="ReviewProfileImage">
                          <a
                            href={ProfileReview.username}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              src={
                                ProfileReview.profile_pic
                                  ? ProfileReview.profile_pic
                                  : DummyProfile
                              }
                              alt="User Profile"
                            />
                          </a>
                        </li>
                        <li>
                          <a
                            href={ProfileReview.username}
                            target="_blank"
                            rel="noreferrer"
                            className="base"
                          >
                            <p className="text-xs w-600">
                              {ProfileReview.name}
                            </p>
                          </a>
                          <p className="text-xxs gray">
                            {/* {ProfileReview.createdAt} */}
                            {moment(ProfileReview.createdAt).format("ll")}
                          </p>
                          <StarRating
                            ratingStar={ProfileReview.rating}
                            IsClickable={false}
                          />
                        </li>
                        <li className="ProfileReviewText">
                          <p>{ProfileReview.review}</p>
                        </li>
                      </ul>
                      <div className="ProfileReviewContentAction mt-10">
                        {userID ===
                          (ProfileReview.reviewer ||
                            ProfileReview.reviewerid) && (
                            <>
                              {/* <button className="button btn-xs btn-o-primary primary">
                          Report Review
                        </button> */}
                              <button
                                className="button btn-xs btn-o-primary primary"
                                onClick={() =>
                                  EditAffiliationsModalState(ProfileReview)
                                }
                              >
                                Edit
                              </button>
                              <button
                                className="button btn-xs btn-o-primary primary"
                                onClick={() =>
                                  onClickBtnDropDownRemove(
                                    ProfileReview._id,
                                    true
                                  )
                                }
                              >
                                Remove
                              </button>
                            </>
                          )}
                        {/* delete popup */}
                        {ProfileReview._id === profileReviewId && (
                          <div
                            ref={dropdownRef}
                            className={`popup removePopup ${isActive ? "active" : "inactive"
                              }`}
                          >
                            <p className="heading text-xxs">
                              You are about to remove this Review.
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
                                  removeProfileReview(ProfileReview._id, false)
                                }
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </li>
                  </React.Fragment>
                );
              })
            ) : ProfileReviewData.length === 0 ? (
              <p>Not Added Yet</p>
            ) : (
              <p>Loading...</p>
            )}
          </ul>
        </div>
      </div>

      <div className="ViewMoreReviewBtn">
        {ProfileReviewData.length > visibleCount && (
          <button
            className="button btn-sm btn-o-mgray"
            onClick={seeMoreReviews}
          >
            view more reviews
          </button>
        )}
      </div>
      {EditAffiliationsModal && (
        <EditReviews
          closeModalStateprop={closeModalState}
          showprop={EditAffiliationsModal}
          editReviewData={editReviewData}
          ratingData={dataRating}
        />
      )}
    </React.Fragment>
  );
};

export default ProfileReviews;
