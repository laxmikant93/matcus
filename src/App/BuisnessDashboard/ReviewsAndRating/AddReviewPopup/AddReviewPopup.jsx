import React from 'react';
import './addReviewPopup.scss';
import Modals from '../../../../Common/Modals/index'
import ModalHeader from '../../../../Common/Modals/ModalsHeader'
import ModalBody from '../../../../Common/Modals/ModalsBody'
import { useState } from 'react';
import './addReviewPopup.scss';
import ImageCropper from '../../../../Common/Cropper';
import Cropper from '../../../../Common/Cropper';
import { useRef } from 'react';
import ReviewImage from '../../../Dashboard/EcommerceDashboard/assets/images/reviewImage.png';
import AddReviewForm from './AddReviewForm/AddReviewForm';
import UploadMedia from './UploadMedia/UploadMedia';
import UploadImage from './uploadImage.png'
import { useDispatch } from 'react-redux';
import { patchReviewDetails, postReviewDetails } from '../../../../store/actions/ecomReviews';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import ValidationFile from '../../../../Classes/ValidationFile';

const AddReviewPopup = ({ openpopup, onclose }) => {

  const [reviewer_name, setreviewer_name] = useState("");
  const [review_date, setreview_date] = useState("");
  const [review_stars, setreview_stars] = useState("");
  const [review_description, setreview_description] = useState("");
  const [selected_product, setselected_product] = useState("");
  const [reviewImage, setReviewImage] = useState("");
  const [reviewMedia, setReviewMedia] = useState([]);
  const [isFilled, setIsFilled] = useState(false);
  const [disableButton, setDisablebutton] = useState(true);

  //error states
  const [reviewer_name_error, setreviewer_name_error] = useState(false);
  const [review_stars_error, setreview_stars_error] = useState(false);
  const [review_description_error, setreview_description_error] = useState(false);
  const [selected_product_error, setselected_product_error] = useState(false);

  const ref = useRef();
  let dispatch = useDispatch();

  const { user, postReviewSuccess, getSingleReviewDetails, getSingleReviewSuccess, patchReviewSuccess, reviewId } = useSelector((state) => {
    return {
      user: state.user,
      postReviewSuccess: state.ecomReviews.postReviewData.success,
      getSingleReviewDetails: state.ecomReviews.getSingleReviewData.data,
      getSingleReviewSuccess: state.ecomReviews.getSingleReviewData.success,
      patchReviewSuccess: state.ecomReviews.patchReviewData.success,
      reviewId: state.ecomReviews.reviewId
    }
  });

  const closeModal = () => {
    onclose();
    setreviewer_name("");
    setreview_stars("");
    setreview_description("");
    setselected_product("");
    setReviewImage("");
    setReviewMedia([]);
    setIsFilled(false);
    setDisablebutton(true);
  }

  const uploadImagePopup = () => {
    ref.current.open();
  }

  const uploadReviewImage = (data) => {
    let imgData = data.location;
    setReviewImage(imgData);
    setDisablebutton(false);
  }

  const handleRemoveReviewImage = () => {
    let imgData = "";
    setReviewImage(imgData);
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
    if (ValidationFile.isNotEmpty(reviewer_name) && ValidationFile.isNotEmpty(review_stars) &&
      ValidationFile.isNotEmpty(review_description) && ValidationFile.isNotEmpty(selected_product)) {
      isvalid = true;
    }
    else {
      isvalid = false;
    }
    return isvalid;
  }

  const handlePublishButton = () => {
    let valid = validation();
    if (ValidationFile.isEmpty(reviewer_name)) {
      setreviewer_name_error(true);
    }
    if (ValidationFile.isEmpty(review_stars)) {
      setreview_stars_error(true);
    }
    if (ValidationFile.isEmpty(review_description)) {
      setreview_description_error(true);
    }
    if (ValidationFile.isEmpty(selected_product)) {
      setselected_product_error(true);
    }
    let data = {
      "product": selected_product,
      "business": user.user_business,
      "rating": review_stars,
      "message": review_description,
      "images": reviewMedia,
      "date": review_date,
      "creator": "admin",
      "reviewer_name": reviewer_name,
      "profile_image": reviewImage,
      "publish_date": new Date(),
      "status": "Published"
    };
    let patchData = {
      "product": selected_product,
      "business": user.user_business,
      "rating": review_stars,
      "message": review_description,
      "images": reviewMedia,
      "date": review_date,
      "creator": "admin",
      "reviewer_name": reviewer_name,
      "profile_image": reviewImage,
      "publish_date": new Date(),
      "status": "Published",
      "_id": reviewId
    }
    if (reviewId) {
      if (valid) {
        dispatch(patchReviewDetails(user.user_business, patchData));
      }
    }
    else {
      if (valid) {
        dispatch(postReviewDetails(user.user_business, data));
      }
    }
  }

  const handleReviewDetails = (data) => {
    setreviewer_name(data.reviewer_name);
    setreview_date(data.date);
    setreview_description(data.message);
    setreview_stars(data.rating);
    setselected_product(data.product);
    if (data.reviewer_name) {
      setreviewer_name_error(false);
    }
    if (data.rating) {
      setreview_stars_error(false);
    }
    if (data.message) {
      setreview_description_error(false);
    }
    if (data.product) {
      setselected_product_error(false);
    }
  }

  useEffect(() => {
    if (postReviewSuccess || patchReviewSuccess) {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patchReviewSuccess, postReviewSuccess])

  useEffect(() => {
    if (getSingleReviewSuccess && getSingleReviewDetails && !isFilled && getSingleReviewDetails) {
      setIsFilled(true);
      setReviewImage(getSingleReviewDetails?.profile_image);
      setReviewMedia(getSingleReviewDetails?.images);
    }
  }, [getSingleReviewDetails, getSingleReviewSuccess, isFilled])

  return (
    <Modals ref={openpopup} Position="center" slide="center" ClosePopUp={() => closeModal()} ModalsSize={'modal-xl'}>
      <ModalHeader title={reviewId ? "Update review" : 'Add a review'}>  </ModalHeader>
      <ModalBody>
        <div className='addReviewpop-container'>
          <div className='addReviewpop-topSection'>
            <div className='addReviewPop-leftSidebar'>
              <AddReviewForm onLoadReviewData={handleReviewDetails} setDisablebutton={setDisablebutton}
                reviewer_name_error={reviewer_name_error} review_description_error={review_description_error}
                review_stars_error={review_stars_error} selected_product_error={selected_product_error}
              />
            </div>
            <div className='addReviewPop-rightSidebar'>
              <p className='text-xs w-400 base pb-5'>Profile Picture</p>
              {reviewImage ?
                <div className='image-wrpper'>
                  <img className="gallery_img" src={reviewImage} alt="Collection" />
                  <div className='productOverlay'>
                    <div className='productIcon-wrap'>
                      {/* <div className='product-circle'>
                            <i className='ed-icon  white icon-pencial'></i>
                          </div> */}
                      <div className='product-circle' onClick={() => setReviewImage("")}>
                        <i className='ed-icon i-xs white icon-cross' onClick={handleRemoveReviewImage}></i>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div className="image-drag">
                  <div className="dragbutton" onClick={uploadImagePopup}>
                    <div className="set__icon">
                      <i className='icon-plus'>&#43;</i>
                    </div>
                  </div>
                  <Cropper
                    minWidth={100}
                    maxWidth={1000}
                    ref={ref}
                    onUploaded={uploadReviewImage}
                    IconClassName=""
                    BtnPropClass="button-o-silver button-block CropUploadBtn"
                    customCropper={true}
                  />
                </div>
              }
            </div>
          </div>
          <div className='uploadMedia-section'>
            <div className='uploadMedia-btn'>
              <p className='text-xs w-400 base pb-5'>Upload Media</p>
              <UploadMedia reviewMedia={reviewMedia} setReviewMedia={(val) => setReviewMedia(val)} setDisablebutton={setDisablebutton} />
            </div>
            {reviewMedia.length ? <div className='v-line'></div> : ""}

            <div className='uploadMedia-images-section'>
              {reviewMedia && reviewMedia.length ?
                reviewMedia.map((item) => (
                  <div className='uploadMedia-image-wrap'>
                    <img src={item} alt="" />
                    <div className='productOverlay'>
                      <div className='productIcon-wrap'>
                        {/* <div className='product-circle'>
                            <i className='ed-icon  white icon-pencial'></i>
                          </div> */}
                        <div className='product-circle'>
                          <i className='ed-icon i-xs white icon-cross' onClick={() => handleCrossIcon(item)}></i>
                        </div>

                      </div>
                    </div>
                  </div>
                ))
                : ""
              }
            </div>
          </div>
          <hr className='hr-line' />
          {/* aria-disable will be true when button is disable */}
          <div className='reviewPopup-btn-section' aria-disabled={disableButton}>
            <button className='button btn-2xs button-primary' onClick={handlePublishButton} disabled={disableButton}>Publish Review</button>
          </div>
        </div>
      </ModalBody>

    </Modals>

  )
}

export default AddReviewPopup