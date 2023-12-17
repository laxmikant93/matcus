import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ValidationFile from "../../../Classes/ValidationFile";
import FormError from "../../../Common/Form/FormError";
import FormTextArea from "../../../Common/Form/FormTextArea";
import Modal from "../../../Common/Modal";
import ModalBody from "../../../Common/Modal/ModalBody";
import ModalFooter from "../../../Common/Modal/ModalFooter";
import ModalHeader from "../../../Common/Modal/ModalHeader";
import { editProfileReviews } from "../../../store/actions/publicProfile";
import StarRating from "./StarRating";

function EditReviews({
  showprop,
  closeModalStateprop,
  editReviewData,
  ratingData,
}) {
  const dispatch = useDispatch();
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

  const handleRating = (value) => {
    setRating(value);
  };

  const reviewDescription = (e) => {
    const inputValue = e.target.value.trimStart();
    setDescription(inputValue);
    setIsReviewValid(ValidationFile.validEmpty(inputValue));
  };

  useEffect(() => {
    setRating(ratingData);
  }, [ratingData]);



  const ratingValidation = () => {
    if (rating > 0) {
      setIsRatingValid(true);
    } else {
      setIsRatingValid(false);
    }
  };

  useEffect(() => {
    setDescription(editReviewData.review);
    setIsReviewValid(ValidationFile.validEmpty(editReviewData.review));
    // if (rating > 0) {
    //   setIsRatingValid(true);
    // } else {
    //   setIsRatingValid(false);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editReviewData]);

  const postData = {
    _id: editReviewData._id,
    reviewerid: user && user._id,
    review: description,
    rating: rating,
  };

  const updateReview = () => {
    ratingValidation();
    setCheckValid(true);
    if (isRatingValid && isReviewValid) {
      dispatch(editProfileReviews(id, postData));
      closeModalStateprop();
    }
  };

  const editCancel = () => {
    setDescription(editReviewData.review);
    closeModalStateprop();
  };

  return (
    <Modal show={showprop}>
      <ModalHeader
        closeButton={true}
        onclose={closeModalStateprop}
      ></ModalHeader>
      <ModalBody>
        <React.Fragment>
          <div className="formFieldwrap">
            Choose Star Rating
            <StarRating
              onRatingClick={(e) => handleRating(e)}
              // ratingValue={ratingData}
              ratingValue={rating}
              IsClickable={true}
            />
            <FormError
              show={!isRatingValid && checkValid}
              error="Please Add Rating."
            />
          </div>

          <div className="formFieldwrap">
            <FormTextArea
              label="Review"
              rows="4"
              placeholder="Write your review here"
              onChange={reviewDescription}
              value={description}
            />
            <FormError
              show={!isReviewValid && checkValid}
              error="Please Enter Description."
            />
          </div>
        </React.Fragment>
      </ModalBody>
      <ModalFooter>
        <button
          className="button button-primary btn-xs"
          type="submit"
          onClick={updateReview}
        >
          Update Review
        </button>
        <button
          className="button btn-o-primary primary btn-xs"
          type="button"
          onClick={editCancel}
        >
          Cancel
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default EditReviews;
