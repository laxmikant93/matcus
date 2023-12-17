import React, { useState } from "react";
import FormInput from "../../../../Common/Form/FormInput";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import FormError from "../../../../Common/Form/FormError";
import ValidationFile from "../../../../Classes/ValidationFile";
import {
  updateSingleTestimonial,
  clearSingleTestimonialData,
} from "../../../../store/actions/Testimonial";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";
import Card from "../../../../Common/Card";
import CardBody from "../../../../Common/Card/CardBody";
import { rating } from "../../../../store/actions/Testimonial";
import ImageCropper from "../../../../Common/Cropper";
import { useRef } from "react";
import TextEditor from "../../../../Common/Form/TextEditor";
import UploadButton from "../../../../Common/UploadButton";
import Uploader from "../../../../Common/ImageUploader";

function EditTestimonial({ closePopup, editRating }) {
  const titleRef = useRef(null);
  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false);
  const userRating = useSelector((state) => state.testimonial.rating);
  const getSingleTestimonialData = useSelector(
    (state) => state.testimonial.singleTestimonialData
  );
  const businesstype = useSelector((state) =>
    state.user.user_business_type);
  const [isFilled, setisFilled] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderMessage, setSenderMessage] = useState("");
  const [thumbnail, setThumbnail] = useState();
  const [nameError, setNameError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";

  if (
    getSingleTestimonialData.data &&
    getSingleTestimonialData.success &&
    !isFilled
  ) {
    setisFilled(true);
    setSenderName(getSingleTestimonialData.data.name);
    setSenderMessage(getSingleTestimonialData.data.message);
    setThumbnail(getSingleTestimonialData.data.thumbnail);
  }

  const inputHandel = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value.trimStart();

    switch (inputName) {
      case "name":
        setSenderName(inputValue);
        setNameError(ValidationFile.isEmpty(inputValue));
        break;
      case "message":
        setSenderMessage(inputValue);
        setMessageError(ValidationFile.isEmpty(inputValue));
        break;
      default:
        return false;
    }
  };

  const handleOnChangeInput = (inputValue) => {
    setSenderMessage(inputValue);
    setMessageError(ValidationFile.isEmpty(inputValue));
  }

  // const [resetRating, setResetRating] = useState(true);
  let resetRating = 0;
  const handleClose = () => {
    dispatch(clearSingleTestimonialData());
    setisFilled(false);
    setShowError(false);
    dispatch(rating(resetRating));
    closePopup();
    // setResetRating(false);
  };

  const editTestMData = () => {
    return {
      name: senderName,
      message: senderMessage,
      rating: userRating,
      industry: businesstype,
      thumbnail: thumbnail
    };
  };

  const handleUpdateTestimonial = (e) => {
    setShowError(true);
    e.preventDefault();

    if (ValidationFile.isEmpty(senderName)) {
      setNameError(true);
    }
    if (ValidationFile.isEmpty(senderMessage)) {
      setMessageError(true);
    }
    if (
      !ValidationFile.isEmpty(senderName) &&
      !ValidationFile.isEmpty(senderMessage)
    ) {
      dispatch(
        updateSingleTestimonial(
          getSingleTestimonialData.data._id,
          businesstype,
          editTestMData()
        )
      );
      closePopup();
      dispatch(clearSingleTestimonialData());
      setisFilled(false);
      setShowError(false);
    }
  };

  const uploadImage = (data) => {
    let imgData = data;
    setThumbnail(imgData);
  }
  const removeImage = () => {
    setThumbnail("");
  }

  return (
    <div className="modalwrapper">
      <span className="closeModal dgray text-xxs" onClick={handleClose}>
        Close
      </span>
      <div className="modalHead">
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-sm w-300">Edit Testimonial</h3>
          </div>
        </div>
      </div>

      <div className="EditTestimonialListCst">
        <div className="AddTestimonialList">
          <Card className="cardPadding">
            <CardBody>
              <div className="formFieldwrap">
                <FormInput
                  name="name"
                  value={
                    getSingleTestimonialData.success
                      ? senderName
                      : "Loading....."
                  }
                  onChange={inputHandel}
                  maxLength="500"
                  label="Sender's Name"
                  placeholder="Sender's Name"
                />
                <FormError
                  show={nameError && showError}
                  error="Sender Name required"
                />
              </div>
              <div className="formFieldwrap">
                {/* <FormTextArea
                  id="exampleFormControlTextarea1"
                  rows="5"
                  type="text"
                  placeholder="Sender's Message"
                  label="Sender's Message"
                  name="message"
                  style={{ whiteSpace: " pre-wrap" }}
                  maxLength="1000"
                  TextareaBtmTxt="1000"
                  value={
                    getSingleTestimonialData.success
                      ? senderMessage
                      : "Loading....."
                  }
                  onChange={inputHandel}
                  onKeyUp={inputHandel}
                /> */}
                <TextEditor
                  preFilledData={senderMessage}
                  currentResponse={(value) => handleOnChangeInput(value)}
                />
                <FormError
                  show={messageError && showError}
                  error="Sender Messege required"
                />
              </div>

              <div className="AddTestimonialRating">
                <p className="text-xs w-500">
                  Star Rating given by sender
                  <Rating IsClickable={true} ratingValue={editRating} />
                </p>
              </div>
              <div className="mt-20">
                <p className='text-xxs mb-2'>- Accept only .jpg or .png.</p>
               
                  <UploadButton
                      ref={titleRef}
                      BtnName="Upload Image"
                      IconClassName="i-md gray"
                      BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                      onClick={()=>{titleRef.current.open()}}
                      showLink={true}
                      object={thumbnail}
                    />
               <Uploader size={5}
      accept="image/png, image/jpeg, image/jpg, image/PNG, image/webp, image/WEBP"
       onclose={() => titleRef.current.close()}
      multiSelect={false} discartRef={titleRef} onUploaded={(data)=>uploadImage(data)}  uploadLimit={1} />
                {/* {thumbnail && (
                  <a
                    className="btnText priamry text-2xs attachmentwithtext mt-3"
                    href={thumbnail}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ed-icon icon-attachment gray i-xs"></i>
                    {thumbnail.replace(s3Url, "")}
                  </a>
                )} */}

                <div>
                  {thumbnail?.src ? (
                    <button
                      onClick={removeImage}
                      className="button btn-sm btn-o-red red mt-8"
                    >
                      Remove
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="mt-40">
        <button
          className="button btn-md button-theme btn-md"
          onClick={handleUpdateTestimonial}
        >
          Update Testimonial
        </button>
      </div>
    </div>
  );
}

export default EditTestimonial;
