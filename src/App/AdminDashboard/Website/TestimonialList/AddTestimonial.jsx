/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import Card from "../../../../Common/Card";
import CardBody from "../../../../Common/Card/CardBody";
import FormInput from "../../../../Common/Form/FormInput";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import FormError from "../../../../Common/Form/FormError";
import { useDispatch, useSelector } from "react-redux";
import { postTestimonial } from "../../../../store/actions/Testimonial";
import { useNavigate } from "react-router-dom";
import ValidationUtils from "../../../../Classes/ValidationUtils";
import Rating from "./Rating";
import ImageCropper from "../../../../Common/Cropper";
import TextEditor from "../../../../Common/Form/TextEditor";
import UploadButton from "../../../../Common/UploadButton";
import Uploader from "../../../../Common/ImageUploader";

const AddTestimonial = () => {
  const titleRef = useRef(null);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [questionError, setQuestionError] = useState(false);
  const [answerError, setAnswerError] = useState(false);
  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";
  const InsID = useSelector((state) =>
    state.user.user_institute);
    const [index,setIndex]=useState("")
  const businesstype = useSelector((state) =>
    state.user.user_business_type);
  let [testimonials, setTestimonials] = useState([
    {
      type: "Institute",
      institute: InsID,
      business: InsID,
      industry: businesstype,
      name: "",
      message: "",
      rating: "",
      isFeatureMarked: "Yes",
      isNameValid: false,
      isMessageValid: false,
      thumbnail: ""
    },
  ]);

  const addMoreTestimonial = () => {
    const testimonial = {
      type: "Institute",
      institute: InsID,
      business: InsID,
      industry: businesstype,
      name: "",
      message: "",
      rating: "",
      isFeatureMarked: "Yes",
      isNameValid: false,
      isMessageValid: false,
      thumbnail: ""
    };
    setTestimonials([...testimonials, testimonial]);
  };

  const isTestimonialNameValid = () => {
    let isValid = true;
    for (let key = 0; key < testimonials.length; key++) {
      const element = testimonials[key];
      if (ValidationUtils.isEmpty(element.name)) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      setQuestionError(false);
    } else {
      setQuestionError(true);
    }
    return isValid;
  };

  const isTestimonialMessageValid = () => {
    let isValid = true;
    for (let key = 0; key < testimonials.length; key++) {
      const element = testimonials[key];
      if (ValidationUtils.isEmpty(element.message)) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      setAnswerError(false);
    } else {
      setAnswerError(true);
    }
    return isValid;
  };

  const handleQuestionChange = (e, key) => {
    let testimonialsField = e.target.value.trimStart();
    testimonials[key]["name"] = testimonialsField;
    testimonials[key]["isNameValid"] =
      ValidationUtils.isNotEmpty(testimonialsField);
    setTestimonials([...testimonials]);
    setQuestionError(false)
  };

  const handleAnswerChange = (value, key) => {
    let testimonialsField = value
    testimonials[key]["message"] = testimonialsField;
    testimonials[key]["isMessageValid"] =
      ValidationUtils.isNotEmpty(testimonialsField);
    setTestimonials([...testimonials]);
    setAnswerError(false)
  };

  // const [currentValue, setCurrentValue] = useState(0);

  const handleRating = (value, key) => {
    let allratings = testimonials;
    allratings[key]["rating"] = value;
    setTestimonials([...allratings]);
  };

  const removeTestimonial = (key) => {
    let testimonial = [...testimonials];
    testimonial.splice(key, 1);
    setTestimonials([...testimonial]);
  };

  const saveTestimonial = (e) => {
    e.preventDefault();
    setQuestionError(true);
    setAnswerError(true);
    const isValidName = isTestimonialNameValid();
    const isValidMessage = isTestimonialMessageValid();
    if (isValidName && isValidMessage) {
      dispatch(postTestimonial(testimonials));
      setTimeout(() => {
        history("/testimonial-list");
      }, 100);
    }
  };

  const uploadImage = (data, key) => {
    let imgData = data;
    let allinputs = testimonials;
    allinputs[key]["thumbnail"] = imgData;
    setTestimonials([...allinputs]);
  };
  const removeImage = (key) => {
    let imgData = "";
    let allinputs = testimonials;
    allinputs[key]["thumbnail"] = imgData;
    setTestimonials([...allinputs]);
  };

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/testimonial-list" title="Testimonial" />
        <BreadcrumbItem to="/add-testimonial" title="Add Testimonial" />
      </Breadcrumb>
      <div className="PageTopHead PTH-AddTestimonial mt-30">
        <div className="PTH-Item">
          <p className="heading text-sm">Add Testimonial</p>
          <p className="sub-heading text-xxs">
            You can add up to 5 testimonials at a time.
          </p>
        </div>
      </div>
      {testimonials.map((testimonialData, key) => {
        return (
          <div key={key} className="AddTestimonialListCst mt-10">
            <div className="AddTestimonialList">
              <Card className="cardPadding">
                <CardBody>
                  <form>
                    <p className="mb-10 text-right">
                      {testimonials.length !== 1 && (
                        <button
                          type="button"
                          className="btnText primary"
                          onClick={() => {
                            removeTestimonial(key);
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </p>
                    <div className="formFieldwrap">
                      <FormInput
                        label="Sender's Name"
                        placeholder="Sender's Name"
                        name={key}
                        maxLength={500}
                        value={testimonialData.name}
                        onChange={(e) => handleQuestionChange(e, key)}
                        onKeyUp={(e) => handleQuestionChange(e, key)}
                      />
                      {questionError === true && (
                        <FormError
                          show={!testimonials[key]["isNameValid"]}
                          error="Sender's name is required."
                        ></FormError>
                      )}
                    </div>
                    <div className="formFieldwrap">
                      {/* <FormTextArea
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
                        value={testimonialData.message}
                        onChange={(e) => handleAnswerChange(e, key)}
                        onKeyUp={(e) => handleAnswerChange(e, key)}
                      ></FormTextArea> */}
                      <TextEditor
                        preFilledData={testimonialData.message}
                        currentResponse={(value) => handleAnswerChange(value, key)}
                      />
                      {answerError === true && (
                        <FormError
                          show={answerError && !testimonials[key]["isMessageValid"]}
                          error="Message is required."
                        ></FormError>
                      )}
                    </div>

                    <div className="AddTestimonialRating">
                      <p className="text-xs w-500">
                        Star rating by sender
                        <Rating
                          name={key}
                          onRatingClick={(e) => handleRating(e, key)}
                          ratingStar={testimonialData.rating}
                          IsClickable={true}
                        />
                      </p>
                    </div>

                    <div className="mt-15">
                      <p className='text-xxs mb-2'>- Accept only .jpg or .png.</p>
                      {/* <ImageCropper
                        ref={titleRef}
                        minWidth={120}
                        maxWidth={400}
                        defaultRatio={1 / 1}
                        onUploaded={(e) => uploadImage(e, key)}
                        BtnName="Upload Image"
                        IconClassName="i-md gray"
                        array={true}
                        BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                      /> */}
                       <UploadButton
                      ref={titleRef}
                      BtnName="Upload Image"
                      array={true}
                      IconClassName="i-md gray"
                      BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                      onClick={()=>{titleRef.current.open();setIndex(key)}}
                      showLink={true}
                      object={testimonialData.thumbnail}
                    />
               <Uploader size={5}
      accept="image/png, image/jpeg, image/jpg, image/PNG, image/webp, image/WEBP"
       onclose={() => titleRef.current.close()}
      multiSelect={false} discartRef={titleRef} onUploaded={(data)=>uploadImage(data,index)}  uploadLimit={1} />
                      {/* {testimonialData.thumbnail && (
                        <a
                          className="btnText priamry text-2xs attachmentwithtext mt-3"
                          href={testimonialData.thumbnail}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="ed-icon icon-attachment gray i-xs"></i>
                          {testimonialData.thumbnail.replace(s3Url, "")}
                        </a>
                      )} */}

                      <div>
                        {testimonialData.thumbnail ? (
                          <button
                            onClick={(e) => removeImage(key)}
                            className="button btn-sm btn-o-red red mt-8"
                          >
                            Remove
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </div>
          </div>
        );
      })}
      {testimonials.length < 5 && (
        <button
          className="button btn-sm button-primary mt-10"
          onClick={addMoreTestimonial}
        >
          Add More
        </button>
      )}
      <div className="mt-40">
        <button className="button btn-md button-theme btn-md" onClick={saveTestimonial}>
          Publish Testimonial
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddTestimonial;
