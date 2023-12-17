import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../App/AdminDashboard/Website/TestimonialList/Rating'
import ValidationFile from '../Classes/ValidationFile'
import ValidationUtils from '../Classes/ValidationUtils'
// import ImageCropper from '../Common/Cropper'
import FormError from '../Common/Form/FormError'
import FormInput from '../Common/Form/FormInput'
import FormTextArea from '../Common/Form/FormTextArea'
import Modal from '../Common/Modal'
import ModalBody from '../Common/Modal/ModalBody'
import ModalFooter from '../Common/Modal/ModalFooter'
import ModalHeader from '../Common/Modal/ModalHeader'
// import { IMG_ACCEPT } from "../Constant/constants";
import Uploader from '../Common/ImageUploader';
import UploadButton from '../Common/UploadButton';
import { postTestimonial, postTestimonialDataReset } from '../store/actions/Testimonial'
import { useRef } from 'react'


const WebsiteTestimonial = ({ onclose, show }) => {

  const [senderName, setSenderName] = useState();
  const [senderMessage, setSenderMessage] = useState();
  const [ratings, setRatings] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [nameError, setNameError] = useState();
  const [messageError, setMessageError] = useState();

  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";
  let dispatch = useDispatch();

  const closeModal = () => {
    onclose();
  };

  const { insId, success, loading, businesstype } = useSelector((state) => {
    return {
      insId: state.institutewebsite.data._id,
      success: state.testimonial.addTestimonial.success,
      loading: state.testimonial.addTestimonial.isloading,
      businesstype: state.user.user_business_type,

    }
  })

  const testimonials = [{
    institute: insId,
    business: insId,
    isFeatureMarked: "No",
    isMessageValid: true,
    isNameValid: true,
    message: senderMessage,
    name: senderName,
    rating: ratings,
    thumbnail: thumbnail,
    type: "Institute",
    industry: businesstype,

  }];
  const ref = useRef(null)

  const handleQuestionChange = (e) => {
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    setSenderName(value);
    setNameError(false);
  }

  const handleAnswerChange = (e) => {
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    setSenderMessage(value);
    setMessageError(false);
  }

  const handleRating = (value) => {
    setRatings(value);
  }

  const uploadImage = (data) => {
    setThumbnail(data);
  }

  const removeImage = () => {
    setThumbnail("");
  }

  const handleAddTestimonial = () => {
    if (ValidationUtils.isEmpty(senderName)) {
      setNameError(true);
    }
    if (ValidationUtils.isEmpty(senderMessage)) {
      setMessageError(true)
    }

    if (!ValidationUtils.isEmpty(senderName) && (!ValidationUtils.isEmpty(senderMessage))) {
      dispatch(postTestimonial(testimonials));
    }
  }

  if (success) {
    onclose();
  }

  useEffect(() => {
    return () => {
      dispatch(postTestimonialDataReset());
    }
  }, [dispatch, insId]);


  return (
    <Modal show={show}>
      <ModalHeader
        title="Add Testimonial"
        closeButton={true}
        onclose={closeModal}
      />
      <ModalBody className="EditService-MBody">
        {/* <ServicesDetail /> */}
        <div className="formFieldwrap">
          <FormInput
            label="Sender's Name"
            placeholder="Sender's Name"
            name="name"
            maxLength={500}
            value={senderName}
            onChange={handleQuestionChange}
            onKeyUp={handleQuestionChange}
          />
          <FormError
            show={nameError}
            error="Sender's name is required."
          ></FormError>
        </div>
        <div className="formFieldwrap">
          <FormTextArea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
            type="text"
            placeholder="Message"
            label="Message"
            name="institute_about"
            style={{ whiteSpace: " pre-wrap" }}
            maxLength="1000"
            TextareaBtmTxt="1000"
            value={senderMessage}
            onChange={handleAnswerChange}
            onKeyUp={handleAnswerChange}
          ></FormTextArea>
          <FormError
            show={messageError}
            error="Message is required."
          ></FormError>
        </div>

        <div className="AddTestimonialRating">
          <p className="text-xs w-500">
            Star rating by sender
            <Rating
              onRatingClick={handleRating}
              ratingStar={ratings}
              IsClickable={true}
            />
          </p>
        </div>

        <div className='mt-20'>
          <p className='text-xxs'>- Accept only .jpg or .png.</p>
          {/* <ImageCropper
            minWidth={120}
            maxWidth={400}
            defaultRatio={1 / 1}
            onUploaded={uploadImage}
            BtnName="Upload Image"
            IconClassName="i-md white"
            BtnPropClass="button dgray button-block CropUploadBtn"
          /> */}
          <Uploader size={5}
            onclose={() => ref?.current?.close()}
            multiSelect={false} discartRef={ref} onUploaded={(val) => uploadImage(val)} uploadLimit={1} />
          <UploadButton onClick={() => ref?.current?.open()} BtnPropClass={"button dgray button-block CropUploadBtn"} IconClassName="i-md white" BtnName="Upload Image" />
          {thumbnail && (
            <a
              className="btnText priamry text-2xs attachmentwithtext mt-3"
              href={thumbnail}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ed-icon icon-attachment gray i-xs"></i>
              {thumbnail.replace(s3Url, "")}
            </a>
          )}

          <div>
            {thumbnail ? (
              <button
                onClick={removeImage}
                className="button btn-sm  red mt-8"
              >
                Remove
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <React.Fragment>
          {loading ?
            <button
              className="button btn-o-silver dgray btn-sm"
            >
              Adding...
            </button>
            :
            <button
              className="button dgray btn-sm"
              onClick={() => handleAddTestimonial()}
            >
              Add Testimonial
            </button>
          }
        </React.Fragment>

      </ModalFooter>
    </Modal >
  )
}
export default WebsiteTestimonial