/* eslint-disable no-unused-vars */
import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLink from "../../Common/AppLink";
import SingleSelectDropdown from "../../Common/Form/SingleSelectDropdown";
import { SearchIcon } from "../../Common/Icon";
import NoDataAvailable from "../../Common/NoDataAvailable";
import Popup from "../../Common/Popup";
import Rating from "../../Common/Rating";
import SearchControl from "../../Common/SearchControl";
import UseOutsideClick from "../../Common/UseOutsideClick";
import {
  deleteEdneedReview,
  getAllReviewsForUser,
  resetReviews,
  searchForUserReviews,
} from "../../store/actions/Testimonial";

const ReviewList = () => {
  const {
    user,
    reviewList,
    deleteReviewSuccess,
    reviewListSuccess,
    deleteReviewLoading,
    industryType
  } = useSelector((state) => {
    return {
      user: state.user,
      reviewList: state.testimonial.ReviewListForUser.data,
      reviewListSuccess: state.testimonial.ReviewListForUser.success,
      deleteReviewLoading: state.testimonial.deleteEdneedReview.loading,
      deleteReviewSuccess: state.testimonial.deleteEdneedReview.success,
      industryType: state.user.user_business_type
    };
  });
  const [previewModel, setpreviewModel] = useState(false);
  const [galleryPopup, setGalleryPopup] = useState({});
  const [RemovePop, setRemovePop] = useState(false);
  const [deleteID, setDeleteID] = useState("");

  const [readMoreText, setReadMoreText] = useState("");
  const [toggle, setTogget] = useState(false);

  const ReadMoreButton = (id, active) => {
    setReadMoreText(id);
    setTogget(active);
  };

  const dispatch = useDispatch();
  const RemovePopState = (_id) => {
    setRemovePop(!RemovePop);
    setDeleteID(_id);
  };
  const RemovePopToggleRef = useRef();

  UseOutsideClick(RemovePopToggleRef, () => {
    if (RemovePop) setRemovePop(false);
  });
  useEffect(() => {
    dispatch(getAllReviewsForUser(user._id, industryType));
  }, [dispatch, user]);

  //readMore try

  useEffect(() => {
    !deleteReviewLoading && deleteReviewSuccess && setRemovePop(false);
  }, [deleteReviewLoading, deleteReviewSuccess]);

  // handle Search
  const [searchTerm, setSearchTerm] = useState("");
  let typing;

  const handleDelete = (_id) => {
    dispatch(deleteEdneedReview(_id, industryType));
  };
  const handleSearch = (event) => {
    event.preventDefault();
    clearTimeout(typing);
    typing = setTimeout(() => {
      setSearchTerm(event.target.value);
    }, 400);

    if (!event.target.value) {
      clearTimeout(typing);
      setSearchTerm("");
    }
  };
  useEffect(() => {
    if (searchTerm) {
      dispatch(searchForUserReviews(user._id, "search", searchTerm, industryType));
    } else {
      dispatch(getAllReviewsForUser(user._id, industryType));
    }
  }, [dispatch, user, searchTerm]);

  useEffect(() => {
    return () => {
      dispatch(resetReviews());
    };
  }, [dispatch]);

  const selectGroup = [
    "Submitted On",
    "Recent to Old",
    "Old to Recent",
    "Status",
    "Pending Approval",
    "Approved",
    "Not Approved",
    "Star Ratings",
    "High to Low",
    "Low to High",
  ];

  const filterValues = ["Submitted On", "Status", "Star Ratings"];
  //
  const SingleSelectHandel = (value) => {
    const selectedValue = value;
    switch (selectedValue) {
      case "ALL":
        dispatch(getAllReviewsForUser(user._id, industryType));
        break;

      case "Recent to Old":
        dispatch(searchForUserReviews(user._id, "createdAt", "otr", industryType));
        break;

      case "Old to Recent":
        dispatch(searchForUserReviews(user._id, "createdAt", "rto", industryType));
        break;

      case "Pending Approval":
        dispatch(
          searchForUserReviews(
            user._id,
            "featuredFlagEdneed",
            "pendingApproval",
            industryType
          )
        );
        break;

      case "Approved":
        dispatch(
          searchForUserReviews(user._id, "featuredFlagEdneed", "Approved", industryType)
        );
        break;

      case "Not Approved":
        dispatch(
          searchForUserReviews(user._id, "featuredFlagEdneed", "notApproved", industryType)
        );
        break;

      case "High to Low":
        dispatch(searchForUserReviews(user._id, "userRating", "htl", industryType));
        break;

      case "Low to High":
        dispatch(searchForUserReviews(user._id, "userRating", "lth", industryType));
        break;

      default:
    }
  };

  const selectReviewGroup = ["Text", "Audio", "Video"];

  const filterReviewValues = [];
  //
  const SingleReviewSelectHandel = (value) => {
    const selectedValue = value;
    switch (selectedValue) {
      case "ALL":
        dispatch(getAllReviewsForUser(user._id, industryType));
        break;
      case "Text":
        dispatch(searchForUserReviews(user._id, "feedbackFormat", "Text", industryType));
        break;

      case "Audio":
        dispatch(searchForUserReviews(user._id, "feedbackFormat", "Audio", industryType));
        break;

      case "Video":
        dispatch(searchForUserReviews(user._id, "feedbackFormat", "Video", industryType));
        break;

      default:
    }
  };

  return (
    <React.Fragment>
      <p className="text-sm w-300 mt-20 mb-20">
        <span className="primary">
          {reviewListSuccess ? reviewList.length : ""}
        </span>{" "}
        {reviewListSuccess
          ? reviewList.length > 1
            ? "Reviews"
            : "Review"
          : ""}
      </p>
      <div className="PageTopHead PTH-ReviewList">
        <div className="PTH-Item">
          <SingleSelectDropdown
            SingleSelectHandel={SingleSelectHandel}
            selectGroup={selectGroup}
            filterValues={filterValues}
          />
        </div>
        <div className="PTH-Item">
          <SingleSelectDropdown
            name="Review Type"
            SingleSelectHandel={SingleReviewSelectHandel}
            selectGroup={selectReviewGroup}
            filterValues={filterReviewValues}
            SingleSelectLabelName="Review Type"
          />
        </div>
        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar"
            id="search"
            name="search"
            onChange={handleSearch}
            onKeyUp={handleSearch}
            placeholder="Search Review"
          />
        </div>
        <div className="PTH-Item P-Right">
          <AppLink
            to="/edneed-review"
            className="button button-primary btn-oval btn-sm button-block"
          >
            <i className="ed-icon icon-plus-add white i-xs"></i>
            Write a review for Edneed
          </AppLink>
        </div>
      </div>
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-4">Review</li>
          <li className="col col-2">Star Ratings</li>
          <li className="col col-2">Summited on</li>
          <li className="col col-2">Status</li>
          <li className="col col-2">&nbsp;</li>
        </ul>
        <div className="gridBody">
          {reviewListSuccess ? (
            reviewList.length > 0 ? (
              reviewList.map((item, key) => {
                return (
                  <div className="gridRow" key={key}>
                    <ul className="topInfo">
                      <li className="col col-4" data-head="Review">
                        {item.feedbackFormat === "Video" ? (
                          <div
                            className="g-thumb-video-wrap"
                            onClick={() => {
                              setGalleryPopup(item);
                              setpreviewModel(true);
                            }}
                          >
                            <video
                              src={item.videos}
                              className="gallery-thumnail"
                              alt={item.videos}
                            />
                            <span className="g-thumb-video-overlay">
                              <i className="ed-icon icon-video white i-s"></i>
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                        <React.Fragment>
                          {item.feedbackFormat === "Text" ? (
                            <React.Fragment>
                              {item._id === readMoreText && toggle
                                ? item.feedbackData
                                : item.feedbackData.slice(0, 180)}

                              <div
                                className={`${item.feedbackData.length > 180
                                  ? "ToggleBtnSectionCst"
                                  : ""
                                  } `}
                              >
                                <span
                                  className={
                                    item._id === readMoreText && toggle
                                      ? "active"
                                      : ""
                                  }
                                  onClick={() =>
                                    ReadMoreButton(item._id, !toggle)
                                  }
                                >
                                  <React.Fragment>
                                    {!toggle && item.feedbackData.length > 180
                                      ? "Read More"
                                      : item._id === readMoreText &&
                                        item.feedbackData.length > 180 &&
                                        toggle
                                        ? "Read Less"
                                        : item._id !== readMoreText &&
                                          item.feedbackData.length > 180 &&
                                          toggle
                                          ? "Read More"
                                          : ""}
                                  </React.Fragment>
                                </span>
                              </div>
                            </React.Fragment>
                          ) : (
                            ""
                          )}
                        </React.Fragment>
                        {item.feedbackFormat === "Audio" ? (
                          <React.Fragment>
                            {" "}
                            <audio controls>
                              <source
                                src={item.feedbackData}
                                type="audio/mpeg"
                              />
                            </audio>
                          </React.Fragment>
                        ) : (
                          ""
                        )}
                      </li>
                      <li className="col col-2" data-head="Star Ratings">
                        <Rating ratingStar={item.userRating} />{" "}
                      </li>
                      <li className="col col-2" data-head="Summited on">
                        <p className="text-xxs">
                          {moment(item.createdAt).format("DD-MM-YYYY")}
                        </p>
                        <p className="text-xxs">
                          {moment(item.createdAt).format("hh:mm a")}
                        </p>
                      </li>
                      <li className="col col-2" data-head="Status">
                        {item.featuredFlagEdneed === "Approved" ? (
                          <p className="secondary">Approved</p>
                        ) : item.featuredFlagEdneed === "notApproved" ? (
                          <p className="red">Not Approved</p>
                        ) : (
                          <p>Pending Approval</p>
                        )}
                      </li>
                      <li className="col col-2 actionCols">
                        <div className="actionBtn">
                          {item.featuredFlagEdneed === "pendingApproval" ? (
                            <React.Fragment>
                              <AppLink
                                to={`/edneed-update-review/${item._id}`}
                                className="btn-square"
                                title="Edit"
                              >
                                <span className="cssIcon">
                                  <i className="ed-pen"></i>
                                </span>
                              </AppLink>
                              <button
                                className="btn-square"
                                onClick={() => RemovePopState(item._id)}
                                title="Remove"
                              >
                                <span className="cssIcon">
                                  <i className="ed-trash"></i>
                                </span>
                              </button>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <p className="text-xxs">
                                {moment(item.updatedAt).format("DD-MM-YYYY")}
                              </p>
                              <p className="text-xxs">
                                {moment(item.updatedAt).format("hh:mm a")}
                              </p>
                            </React.Fragment>
                          )}
                        </div>
                        {item._id === deleteID && RemovePop && (
                          <Popup
                            show={RemovePop}
                            RemovePopToggleRef={RemovePopToggleRef}
                            CancelProp={() => setRemovePop(!RemovePop)}
                            RemoveProp={() => handleDelete(item._id)}
                            loading={deleteReviewLoading}
                          >
                            <p className="gray text-xxs w-300">
                              You are about to remove this review.
                            </p>
                            <p className="dgray text-xxs w-400">Are you sure?</p>
                          </Popup>
                        )}
                      </li>
                    </ul>
                  </div>
                );
              })
            ) : (
              <ul>
                <li>
                  <NoDataAvailable title="No Records Found." />
                </li>
              </ul>
            )
          ) : (
            <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div>
          )}
        </div>
      </div>
      {previewModel && (
        <>
          {
            <div className="ThumnailPopWrapper">
              <div className="ThumnailPopBody">
                {galleryPopup.feedbackFormat === "Video" ? (
                  <video
                    src={galleryPopup.feedbackData}
                    alt={galleryPopup.feedbackData}
                    controls
                    autoPlay
                    loop
                  />
                ) : (
                  ""
                )}
              </div>
              <span
                className="closeModal"
                onClick={() => setpreviewModel(false)}
              ></span>
            </div>
          }
        </>
      )}
    </React.Fragment>
  );
};

export default ReviewList;
