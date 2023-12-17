import React from 'react'
import RatingStar from '../../../../../../App/BuisnessDashboard/ReviewsAndRating/RatingStar/RatingStar';
import Modals from '../../../../../../Common/Modals';
import ModalBody from '../../../../../../Common/Modals/ModalsBody';
import ModalHeader from '../../../../../../Common/Modals/ModalsHeader';
import FormTextArea from '../../../../../../Common/Form/FormTextArea';
import UploadImage from './uploadImg.png';
import reviewImage from './reviewImage.png';
import Cropper from '../../../../../../Common/Cropper';
import './writeReviewPop.scss';
import { useRef } from 'react';
import Rating from '../../../../../../Common/Rating';
import { useState } from 'react';
import ValidationFile from '../../../../../../Classes/ValidationFile';
import { useDispatch, useSelector } from 'react-redux';
import { postReviewDetails } from '../../../../../../store/actions/ecomReviews';
import FormError from '../../../../../../Common/Form/FormError';
import { useEffect } from 'react';

const WriteReviewPopup = ({ openpopup, onclose, id }) => {

  const openCropperRef = useRef();
  let dispatch = useDispatch();

  const { user, postReviewSuccess,subdomainuser,businessInfoSuccess,businessInfoData } = useSelector((state) => {
    return {
      user: state.user,
      postReviewSuccess: state.ecomReviews.postReviewData.success,
      subdomainuser:state.subdomainuser,
      businessInfoSuccess: state.businessInfo.ecomWebsite.success,
      // businessinfo: state.businessInfo.getInstituiteData.data,
      businessInfoData: state.businessInfo.ecomWebsite.data,
    }
  });

  const [ratings, setRatings] = useState("");
  const [reviewDesc, setReviewDesc] = useState("");
  const [reviewMedia, setReviewMedia] = useState([]);
  const [disableButton, setDisablebutton] = useState(true);

  //error states
  const [ratingsError, setRatingsError] = useState("");
  const [reviewDescError, setReviewDescError] = useState("");

  const handleRatingStars = (value) => {
    setRatings(value);
    setRatingsError(ValidationFile.isEmpty(value));
    setDisablebutton(false);
  }

  const handleOnChange = (e) => {
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    setReviewDesc(value);
    setReviewDescError(ValidationFile.isEmpty(value));
    setDisablebutton(false);
  }

  const closeModal = () => {
    onclose();
    setRatings("");
    setReviewDesc("");
    setReviewMedia([]);
    setDisablebutton(true);
  }

  const openCropper = () => {
    if(reviewMedia.length!==5){
      openCropperRef.current.open();
    }
  }

  const uploadReviewMedia = (data) => {
    let array = reviewMedia;
    let imgData = data.location;
    array.push(imgData);
    setReviewMedia([...array]);
    setDisablebutton(false);
  }

  const handleCrossIcon = (item) => {
    let array = reviewMedia;
    let index = array.indexOf(item);
    array.splice(index, 1);
    setReviewMedia([...array]);
    setDisablebutton(false);
  }

  const validation = () => {
    let isvalid = true;
    if (ValidationFile.isNotEmpty(ratings) && ValidationFile.isNotEmpty(reviewDesc)){
      isvalid = true;
    }
    else {
      isvalid = false;
    }
    return isvalid;
  }

  const handlePublishButton = () => {
    let valid = validation();
    if (ValidationFile.isEmpty(ratings)) {
      setRatingsError(true);
    }
    if (ValidationFile.isEmpty(reviewDesc)) {
      setReviewDescError(true);
    }
    let data = {
      "product": id,
      "user": subdomainuser._id,
      "business": businessInfoSuccess&&businessInfoData._id,
      "rating": ratings,
      "message": reviewDesc,
      "images": reviewMedia,
      "creator": "user",
      "date": new Date(),
      "status": "Pending"
    };
    if (valid) {
      dispatch(postReviewDetails(user.user_business, data, "user"));
    }
  }

  useEffect(() => {
    if (postReviewSuccess) {
      closeModal();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postReviewSuccess])

  return (
    <React.Fragment> 
    <Modals ref={openpopup} Position="center" slide="center" ClosePopUp={() => closeModal()} ModalsSize={'modal-md'}>
      <ModalHeader title={'Write a review'} className={'writeReviewpopup-haeder'}></ModalHeader>
      <hr className='review-line' />
      <ModalBody>
        <div className='writeReviewPopup'>
          <div className='selectRating-wrapper'>
            <div className='selectRating-text-wrap'>
              <p className='selectRating-para'>Select Rating</p>
            </div>
            <div className='selectRating-star'>
              <Rating onRatingClick={handleRatingStars} ratingStar={ratings} IsClickable={true} />
              <FormError
                show={ratingsError}
                error="Please select stars."
              />
            </div>
          </div>

          <div className='review-wrapper'>
            <FormTextArea
              rows={4}
              label={'Review'}
              labelPosition={'top'}
              value={reviewDesc}
              onChange={handleOnChange}
              maxlength={350}
              placeholder='Your message here'
            />
            <FormError
              show={reviewDescError}
              error="Please enter your review."
            />
          </div>

          <div className='uploadMedia-section'>
            <label className='animLabelTop'>Upload Media</label>
            <div className='uploadImage-wrapper' aria-disabled={reviewMedia.length === 5 ? true : false} onClick={openCropper}>
              <div className='uploadImage-wrap'>
                <img src={UploadImage} alt="" />
                <p className='imgeUpload-text'>Upload Image</p>
              </div>
              <div className='browse-media-wrap'>
                <p className='borowse-media-p'>Browse Media</p>
              </div>
           
            </div>
            <p className='imageUploaderLimit-text'>Max Limit : 5 images</p>
            <div className='imageWrapper'>
              {reviewMedia.length ?
                reviewMedia.map((item,key) => (
                  <div className='imageWrap' key={key}>
                    <img src={item} alt="" />
                    <div className='circle'>
                      <i className='icon-cross' onClick={() => handleCrossIcon(item)}></i>
                    </div>
                  </div>
                )) : ""
              }
            </div>
          </div>
          <hr className='hr-line' />
          <div className='imgeUploaderButton_wrap' aria-disabled={disableButton}>
            <button className='buttonTrue btnTrue-primary' disabled={disableButton} onClick={handlePublishButton}>Publish Review</button>
          </div>
        </div>

      </ModalBody>
    </Modals>
    <Cropper
    minWidth={400}
    maxWidth={1200}
    defaultRatio={1 / 1}
    InputOvelapLabel="upload now"
    InputUploadIconClass="upload"
    InputOvelapClass="button btn-xs btn-o-silver browserbtn-fabadd"
    customCropper={true}
    IconClassName="text-center upload-icon"
    ref={openCropperRef}
    onUploaded={uploadReviewMedia}
  />
  </React.Fragment>

  )
}

export default WriteReviewPopup