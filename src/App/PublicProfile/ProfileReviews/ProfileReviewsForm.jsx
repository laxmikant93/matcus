import React, { useState, useRef, useEffect } from "react";
import UseOutsideClick from "../../../Common/UseOutsideClick";
import FormTextArea from "../../../Common/Form/FormTextArea";
import StarRating from "./StarRating";
import { useDispatch, useSelector } from "react-redux";
import {
  // getProfileReviews,
  postProfileReviews,
} from "../../../store/actions/publicProfile";
import FormError from "../../../Common/Form/FormError";
import ValidationFile from "../../../Classes/ValidationFile";
import Login from "../../Auth/Login";

const ProfileReviewsHead = ({ focus }) => {
  const dispatch = useDispatch();
  const [ReviewForm, SetReviewForm] = useState();
  const ReviewFormRef = useRef();

  // const rating = useSelector((state) => state.publicProfile.storeRating);
  const userInfo = useSelector(
    (state) => state.publicProfile.singleProfile.data.userInfo
  );

  const user = useSelector((state) => state.user);
  const id = userInfo && userInfo.user;
  const [description, setDescription] = useState("");

  const [isRatingValid, setIsRatingValid] = useState(false);
  const [isReviewValid, setIsReviewValid] = useState(false);
  const [checkValid, setCheckValid] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewAutofocus, setReviewAutofocus] = useState(false);
  const handleRating = (value) => {
    setRating(value);
  };

  useEffect(() => {
    if (rating > 0) {
      setIsRatingValid(true);
    } else {
      setIsRatingValid(false);
    }
  }, [rating]);

  useEffect(() => {
    focus && user._id && SetReviewForm(!ReviewForm);
    focus && setReviewAutofocus(true);
    window.scroll(0, 800);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id, focus]);

  const reviewDescription = (e) => {
    const inputValue = e.target.value.trimStart();
    setDescription(inputValue);
    setIsReviewValid(ValidationFile.validEmpty(inputValue));
  };

  UseOutsideClick(ReviewFormRef, () => {
    if (ReviewForm) SetReviewForm(false);
    setCheckValid(false);
    setDescription("");
    setIsReviewValid(false);
  });

  const closePopUp = () => {
    SetReviewForm(false);
    setCheckValid(false);
    setDescription("");
    setIsReviewValid(false);
    setRating(0);
    setReviewAutofocus(false);
  };

  const postData = {
    name: user.user_fullname,
    profile: userInfo && userInfo._id,
    reviewerid: user && user._id,
    review: description,
    rating: rating,
    isDeleted: false,
  };

  const submitReview = () => {
    setCheckValid(true);
    if (isRatingValid && isReviewValid) {
      dispatch(postProfileReviews(id, postData));
      // setTimeout(() => {
      //   dispatch(getProfileReviews(id));
      // }, 800);
      SetReviewForm(false);
      setRating(0);
    }
  };

  const [modalState, setModalState] = useState(false);

  const closeModalState = () => {
    setModalState(false);
  };

  const manageModalState = () => {
    setModalState(!modalState);
  };

  return (
    <div className="ProfileReviewFormCst">
      {user._id !== id && (
        <button
          className="button btn-sm button-primary"
          onClick={() =>
            user._id ? SetReviewForm(!ReviewForm) : manageModalState()
          }
        >
          <i className="ed-icon icon-plus-add white i-xs"></i>Add Review
        </button>
      )}
      {ReviewForm && (
        <React.Fragment>
          <div className="ProfileReviewFormWrap" ref={ReviewFormRef}>
            <div className="ProfileReviewForm">
              <span
                className="ProfileReviewFormCloseBtn text-xxs"
                onClick={closePopUp}
              >
                Close
              </span>
              <div className="formFieldwrap">
                Choose Star Rating
                <StarRating
                  ratingStar={rating}
                  onRatingClick={(e) => handleRating(e)}
                  IsClickable={true}
                />
                <FormError
                  show={!isRatingValid && checkValid}
                  error="Please Add Rating."
                />
                {/* <Rating
                          onRatingClick={(e) => handleRating(e, key)}
                          ratingStar={testimonialData.rating}
                          IsClickable={true}
                        /> */}
              </div>

              <div className="formFieldwrap">
                <FormTextArea
                  label="Review Description"
                  rows="4"
                  placeholder="Write your review description here"
                  onChange={reviewDescription}
                  value={description}
                  autoFocus={reviewAutofocus}
                />
                <FormError
                  show={!isReviewValid && checkValid}
                  error="Please Enter Description."
                />
              </div>
              <button
                className="button btn-md button-theme button-block"
                onClick={submitReview}
              >
                Submit Review
              </button>
            </div>
          </div>
        </React.Fragment>
      )}
      {/* LOGIN POPUP */}
      <div className={`modal c-modal modalShowing-${modalState}`}>
        <div className="modalwrapper">
          <div className="modalHead">
            <span
              className="closeModal text-xxs gray"
              onClick={() => closeModalState()}
            >
              {" "}
              Close
            </span>
          </div>
          <div className="modalbody">
            <div className="pageFullCenter">
              {/* <Login hideSignup /> */}
              <Login hideGoogleLogin={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileReviewsHead;
