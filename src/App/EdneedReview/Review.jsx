import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ValidationFile from "../../Classes/ValidationFile";
import Breadcrumb from "../../Common/Breadcrumb";
import BreadcrumbItem from "../../Common/Breadcrumb/BreadcrumbItem";
import FormError from "../../Common/Form/FormError";
import FormInput from "../../Common/Form/FormInput";
import FormTextArea from "../../Common/Form/FormTextArea";
import SelectInput from "../../Common/Form/SelectInput";
import Rating from "../../Common/Rating";
import GrayAuthTheme from "../../Common/Theme/GrayAuthTheme";
import Upload from "../../Common/Upload";
import {
  getSignleEdneedReview,
  postEdneedReview,
  resetReviews,
  updateEdneedReview,
} from "../../store/actions/Testimonial";
import "./EdneedReview.scss";

const Review = () => {
  const { _id } = useParams();
  const [FeedbackToggle, SetFeedbackToggle] = useState("Text");
  const [RoleSelectToggle, SetRoleSelectToggle] = useState("No");
  const history = useNavigate();
  const [isFilled, setIsFilled] = useState(false);
  const [reviewError, setReviewError] = useState(false);
  const [feedbackDetails, setFeedbackDetails] = useState("");
  const [rating, setRating] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [websiteUrlError, setWebsiteUrlError] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [specificRole, setSpecificRole] = useState("");
  const [specificError, setSpecificError] = useState(false);
  const [instituteRole, setInstituteRole] = useState("");
  const [ratingError, setRatingError] = useState(false);
  const [feedbackDetailsError, setFeedbackDetailsError] = useState(false);
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const {
    user,
    userRoleData,
    userRoleSuccess,
    singleReview,
    singleReviewDetail,
    postReview,
    updateReview,
    industryType
  } = useSelector((state) => {
    return {
      user: state.user,
      userRoleData: state.userRole.data.arrayData,
      userRoleSuccess: state.userRole.isLoaded,
      singleReview: state.testimonial.updateEdneedReview.data,
      singleReviewDetail: state.testimonial.updateEdneedReview,
      postReview: state.testimonial.postEdneedReview,
      updateReview: state.testimonial.updateReview,
      industryType: state.user.user_business_type
    };
  });

  useEffect(() => {
    if (_id) {
      dispatch(getSignleEdneedReview(_id, industryType));
    }
  }, [dispatch, _id]);

  if (
    !isFilled &&
    _id &&
    !singleReviewDetail.loading &&
    singleReviewDetail.success
  ) {
    setIsFilled(true);
    SetFeedbackToggle(singleReview.feedbackFormat);
    setFeedbackDetails(singleReview.feedbackData);
    setRating(singleReview.userRating);
    setWebsiteUrl(singleReview.websiteUrl);
    setSuggestion(singleReview.suggestion);
    SetRoleSelectToggle(singleReview.roleSpecific);
    setSpecificRole(singleReview.InsName);
  }
  const UploadHandler = (FeedbackToggle) => {
    SetFeedbackToggle(FeedbackToggle);
    setFeedbackDetails("");
  };
  const RoleSelection = (RoleSelectToggle) => {
    SetRoleSelectToggle(RoleSelectToggle);
  };
  const handleSelect = (e) => {
    let inputValue = e.target.value;
    if (inputValue.includes("Student")) {
      setInstituteRole("Student");
    }
    if (inputValue.includes("Teacher")) {
      setInstituteRole("Teacher");
    }
    if (inputValue.includes("Institute Admin")) {
      setInstituteRole("InstituteOwner");
    }
    setSpecificRole(inputValue);
    setSpecificError(ValidationFile.isEmpty(inputValue));
  };

  const handleInput = (e) => {
    let inputValue = e.target.value;
    let inputName = e.target.name;
    switch (inputName) {
      case "feedback":
        setFeedbackDetails(inputValue);
        setFeedbackDetailsError(ValidationFile.isEmpty(inputValue));
        break;
      case "suggestion_box":
        setSuggestion(inputValue);
        break;
      case "websiteUrl":
        setWebsiteUrl(inputValue);
        setWebsiteUrlError(!ValidationFile.validWebsiteLink(inputValue));

        break;
      default:
        return false;
    }
  };
  const uploadVideo = (data) => {
    let videoData = data.location;
    setFeedbackDetails(videoData);
    setFeedbackDetailsError(false);
  };
  const uploadAudio = (data) => {
    let audioData = data.location;
    setFeedbackDetails(audioData);
    setFeedbackDetailsError(false);
  };
  const validUrlLink = () => {
    let isValid = true;
    if (websiteUrl) {
      if (!ValidationFile.validWebsiteLink(websiteUrl)) {
        isValid = false;
      } else {
        isValid = true;
      }
    } else {
      isValid = true;
    }
    return isValid;
  };
  const roleValid = () => {
    let isValid = true;
    if (RoleSelectToggle === "Yes") {
      if (ValidationFile.isEmpty(specificRole)) {
        isValid = false;
      } else {
        isValid = true;
      }
    } else {
      isValid = true;
    }
    return isValid;
  };
  const handleRating = (value) => {
    setRating(value);
    setRatingError(ValidationFile.isEmpty(value));
  };
  const removeAudio = () => {
    let videoData = "";
    setFeedbackDetails(videoData);
  };
  useEffect(() => {
    return () => {
      dispatch(resetReviews());
    };
  }, [dispatch]);
  const postData = () => {
    return {
      feedbackFormat: FeedbackToggle,
      feedbackData: feedbackDetails,
      userRating: rating,
      websiteUrl: websiteUrl,
      suggestion: suggestion,
      roleSpecific: RoleSelectToggle,
      user: user._id,
      userType:
        !user.user_institute || RoleSelectToggle === "No"
          ? user.user_usertype
          : instituteRole,
      InsName: specificRole,
      fullName: user.user_fullname,
      profileImage: user.user_profile_picture,
      industry: industryType,
    };
  };
  const handleSubmit = () => {
    setReviewError(true);
    const validUrl = validUrlLink();
    const validRole = roleValid();
    setWebsiteUrlError(!validUrl);
    setSpecificError(!validRole);
    if (ValidationFile.isEmpty(feedbackDetails)) {
      setFeedbackDetailsError(true);
    }
    if (ValidationFile.isEmpty(rating)) {
      setRatingError(true);
    }

    if (
      !ValidationFile.isEmpty(feedbackDetails) &&
      !ValidationFile.isEmpty(rating) &&
      validUrl &&
      validRole
    ) {
      if (_id) {
        dispatch(updateEdneedReview(_id, industryType, postData()));
      } else {
        dispatch(postEdneedReview(postData()));
      }
    }
  };
  if (_id) {
    if (!submit && updateReview.success) {
      setSubmit(true);
      history(`/edneed-review-list`);
    }
  } else {
    if (!submit && postReview.success) {
      setSubmit(true);
      history(`/edneed-review-list`);
    }
  }

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="/edneed-review-list" title="Review List" />
        {_id ? (
          <BreadcrumbItem to="/edneed-review" title="Update Edneed Review" />
        ) : (
          <BreadcrumbItem to="/edneed-review" title="Edneed Review" />
        )}
      </Breadcrumb>

      <div className="ReviewSectionWrapper">
        <p className="ReviewSectionHead w-300 mt-20">
          {_id ? "Update your review!" : "Send us your review!"}
        </p>
        <p className="ReviewSectionSubHead w-500 gray mb-20">
          Your opinion is important to us. Feel free share your thoughts using
          the form below.
        </p>
        {_id && !singleReviewDetail.success ? (
          <div className="loadingGridData">
            <i className="ed-loadingGrid"></i>
          </div>
        ) : (
          <React.Fragment>
            <p className="text-xxs w-500 mt-20">
              Select a format in which you want to submit your review.
            </p>
            <div className="input-custom-type inline mt-10 mb-10">
              <label
                className={`small ${FeedbackToggle === "text_format" ? "active" : ""
                  }`}
              >
                <input
                  type="radio"
                  name="text"
                  value="Text"
                  checked={FeedbackToggle === "Text"}
                  onChange={(e) => UploadHandler("Text")}
                />
                Text
              </label>
              <label
                className={`small ${FeedbackToggle === "Audio" ? "active" : ""
                  }`}
              >
                <input
                  type="radio"
                  name="audio"
                  value="Audio"
                  checked={FeedbackToggle === "Audio"}
                  onChange={(e) => UploadHandler("Audio")}
                />
                Audio{" "}
              </label>
              <label
                className={`small ${FeedbackToggle === "Video" ? "active" : ""
                  }`}
              >
                <input
                  type="radio"
                  name="video"
                  value="video"
                  checked={FeedbackToggle === "Video"}
                  onChange={(e) => UploadHandler("Video")}
                />
                Video
              </label>
            </div>
            {FeedbackToggle === "Text" && (
              <div className="formFieldwrap">
                <FormTextArea
                  placeholder="Tell us what do think about our product, services and supports!"
                  rows="6"
                  type="text"
                  onChange={handleInput}
                  value={feedbackDetails}
                  name="feedback"
                  maxLength="999"
                  TextareaBtmTxt="1000"
                />
              </div>
            )}
            {FeedbackToggle === "Audio" && (
              <React.Fragment>
                <ul className="DashedInstructionList mb-10">
                  <li className="text-xxs">
                    Supported audio file formats: .MP3, .MPEG, .WAV, .OGG
                    only.
                  </li>
                </ul>
                <div className="formFieldwrap">
                  <Upload
                    label="Upload Audio File"
                    size={10}
                    onlyAudio={true}
                    hidenFileName={true}
                    onUploaded={uploadAudio}
                    IconFileUploadClass="icon-file-upload base i-xs"
                  />
                </div>
                {!feedbackDetails || feedbackDetails === "" ? (
                  ""
                ) : (
                  <a
                    className="btnText priamry text-2xs attachmentwithtext mt-3"
                    href={feedbackDetails}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Audio
                  </a>
                )}
                {feedbackDetails ? (
                  <button
                    onClick={removeAudio}
                    className="button btn-sm btn-o-red red mt-8"
                  >
                    Remove
                  </button>
                ) : (
                  ""
                )}
              </React.Fragment>
            )}
            {FeedbackToggle === "Video" && (
              <React.Fragment>
                <ul className="DashedInstructionList mb-10">
                  <li className="text-xxs">
                    Supported video file formats: .MP4, .Webm, .OGG only.
                  </li>
                </ul>
                <div className="formFieldwrap">
                  <Upload
                    label="Upload Video File"
                    onlyVideo={true}
                    size={10}
                    hidenFileName={true}
                    onUploaded={uploadVideo}
                    IconFileUploadClass="icon-file-upload base i-xs"
                  />
                  {!feedbackDetails || feedbackDetails === "" ? (
                    ""
                  ) : (
                    <a
                      className="btnText priamry text-2xs attachmentwithtext mt-3"
                      href={feedbackDetails}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Video
                    </a>
                  )}
                  {feedbackDetails ? (
                    <button
                      onClick={removeAudio}
                      className="button btn-sm btn-o-red red mt-8"
                    >
                      Remove
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </React.Fragment>
            )}
            <FormError
              show={feedbackDetailsError && reviewError}
              error="This field is required."
            />

            <p className="text-xxs mt-10">
              How would you rate your experience with us?
            </p>
            <div className="formFieldwrap">
              <Rating
                onRatingClick={handleRating}
                ratingStar={rating}
                IsClickable={true}
                ShowRatingStarValue={true}
              />
              <FormError
                show={ratingError && reviewError}
                error="Star Rating cannot be empty."
              />
            </div>
            <p className="text-xxs mt-10 mb-20">
              If you have already posted Edneed's review on any other
              platform, you can share with us by entering the URL. This review
              will be available in our testimonials section only if it is
              relevant.
            </p>
            <div className="formFieldwrap">
              <FormInput
                placeholder="Website URL"
                label="Website URL"
                name="websiteUrl"
                value={websiteUrl}
                onChange={handleInput}
              />
              <FormError
                show={websiteUrlError && websiteUrl && reviewError}
                error="Please enter a valid URL."
              />
            </div>
            <div className="formFieldwrap">
              <FormTextArea
                placeholder="Do you have any suggestions for us?"
                label="Do you have any suggestions for us?"
                rows="6"
                type="text"
                name="suggestion_box"
                onChange={handleInput}
                maxLength="499"
                value={suggestion}
                TextareaBtmTxt="500"
              ></FormTextArea>
            </div>
            {!user.user_institute || user.user_institute === "" ? (
              ""
            ) : (
              <React.Fragment>
                <p className="text-xxs mt-10">
                  Is your review specific to your institute's role with
                  Edneed? If yes, please select the role from the drop down.
                </p>
                <div className="input-custom-type inline mt-10 mb-20">
                  <label
                    className={RoleSelectToggle === "Yes" ? "active" : ""}
                  >
                    <input
                      type="radio"
                      name="yes_role"
                      value="text"
                      checked={RoleSelectToggle === "Yes"}
                      onChange={(e) => RoleSelection("Yes")}
                    />
                    Yes
                  </label>
                  <label
                    className={RoleSelectToggle === "No" ? "active" : ""}
                  >
                    <input
                      type="radio"
                      name="no_role"
                      value="text"
                      checked={RoleSelectToggle === "No"}
                      onChange={(e) => RoleSelection("No")}
                    />
                    No
                  </label>
                </div>
                {RoleSelectToggle === "Yes" && (
                  <div className="formFieldwrap mb-20">
                    <SelectInput
                      id="Rating_Star"
                      name="profession_cat"
                      onChange={handleSelect}
                      value={specificRole}
                      label="Choose user Role"
                    >
                      <option value="">Choose user Role</option>

                      {userRoleSuccess ? (
                        userRoleData.length > 0 ? (
                          userRoleData.map((item, key) => {
                            return (
                              <React.Fragment>
                                <option
                                  key={key}
                                  value={`${item.institute_name} ${item.type}`}
                                >
                                  {item.institute_name} -{" "}
                                  {item.type}
                                </option>
                                {/* <option value="">Gaurav - Institute Admin</option>*/}
                              </React.Fragment>
                            );
                          })
                        ) : (
                          <option value="">No Records</option>
                        )
                      ) : (
                        <option value="">Loading...</option>
                      )}
                    </SelectInput>
                    <FormError
                      show={specificError && reviewError}
                      error="Role is required"
                    />
                  </div>
                )}
              </React.Fragment>
            )}
            {postReview.loading || updateReview.loading ? (
              <button className="button btn-md button-theme">Loading...</button>
            ) : (
              <button className="button btn-md button-theme" onClick={handleSubmit}>
                {_id ? "Update your review" : "Submit your Review"}
              </button>
            )}
            {/* <button

                  onClick={handleSubmit}
                >
                  {_id ? "Update your review" : "Submit your Review"}
                </button> */}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default Review;
