import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormError from "../Common/Form/FormError";
import FormInput from "../Common/Form/FormInput";
import FormTextArea from "../Common/Form/FormTextArea";
import { submitContactInfo } from "../store/actions/contactus/";
import { forwardRef } from "react";
import ValidationFile from "../App/Auth/ValidationFile";
import "../App/StaticPages/Contact.scss";
const Contactus = forwardRef((props, disabledButton = false, ref) => {
  // Getting data of institue website from redux store
  const {
    institutePhone,
    instituteEmail,
    instituteAddress,
    instituteCountry,
    instituteState,
    instituteCity,
    instituteZipcode,
    instituteName,
    instituteId,
  } = useSelector((state) => {
    return {
      institutePhone: state.institutewebsite.data.institute_phone,
      instituteEmail: state.institutewebsite.data.institute_email,
      instituteAddress: state.institutewebsite.data.institute_address,
      instituteCountry: state.institutewebsite.data.institute_country,
      instituteState: state.institutewebsite.data.institute_state,
      instituteCity: state.institutewebsite.data.institute_city,
      instituteZipcode: state.institutewebsite.data.institute_zipcode,
      instituteName: state.institutewebsite.data.institute_name,
      instituteId: state.institutewebsite.data._id,
    };
  });

  const dispatch = useDispatch();

  const symbolsArr = [",", '"', `'`, "!", "@", "`", "~", "#", "$", "%", "^", "&", "*", "(", ")", "_",
    "-", "=", "+", "<", ">", "/", "?", ":", ";", "{", "}", "[", "]", `|`, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]


  // Creating local state variable for contactus form
  let emptyField = {
    fullname: {
      value: "",
      isValid: false,
    },
    email: {
      value: "",
      isValid: false,
    },
    subjectTitle: {
      value: "",
    },
    message: {
      value: "",
    },
    validation: false,
  };

  const [contactInfoData, setContactInfoData] = useState(emptyField);

  const [showLoginError, setShowLoginError] = useState(false);

  // Checking for valid name and email in the form
  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "fullname":
        return ValidationFile.validEmpty(inputValue.trim());
      case "email":
        return (
          ValidationFile.validEmpty(inputValue) &&
          ValidationFile.validEmail(inputValue)
        );
      default:
        return false;
    }
  };

  // Getting form valodation status either true or false
  const isFormValid = () => {
    return contactInfoData.fullname.isValid && contactInfoData.email.isValid
      ? true
      : false;
  };

  const [isEmpty, setIsEmpty] = useState(false);

  // Handling form name:value input in this method
  function handleInput(e) {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    const infoData = {
      ...contactInfoData,
      [inputName]: {
        value: inputValue,
        isValid: validationConfirm(inputValue, inputName),
      },
      validation: isFormValid(),
    };

    // updating state variable data
    setContactInfoData(infoData);
    setIsEmpty(false);
  }

  const getFormData = () => {
    return {
      type: "Institute",
      name: contactInfoData.fullname.value,
      email: contactInfoData.email.value,
      title: contactInfoData.subjectTitle.value,
      message: contactInfoData.message.value,
      institute_id: instituteId,
      institute_name: instituteName,
      institute_email: instituteEmail,
      industry: "LMS"
    };
  };

  // Final submit method for checking validations before storing in database
  const submitUserinfo = () => {
    setShowLoginError(true);
    if (ValidationFile.validEmail(contactInfoData.email.value)) {
      setIsEmpty(false);
      if (contactInfoData.validation) {
        contactInfoData.validation &&
          dispatch(submitContactInfo(getFormData()));
        setTimeout(() => {
          setShowLoginError(false);
          setContactInfoData(emptyField);
        }, 100);
      } else {
      }
    } else {
      setIsEmpty(true);
    }
  };

  return (
    <div className="ContactUsWrapper" ref={ref}>
      <div className="sectionCntrWrap">
        <div className="PageTopHead">
          <div className="PTH-Item secHeadWrap">
            <h3 className="heading">Hello there!</h3>
            <p className="subheading">
              We'd love to hear from you. Here's how to reach us.
            </p>
          </div>
        </div>
        <div className="C-ContactBasicDetail">
          <div className="item">
            <p className="text-xxs w-700">Call us</p>
            <p
              className="textLink"
              onClick={(e) => {
                e.preventDefault();
                window.open("tel:", { institutePhone });
              }}
              rel="noopener noreferrer"
            >
              {institutePhone}
            </p>
          </div>
          <div className="item">
            <p className="text-xxs w-500">Write a message</p>
            <p
              className="textLink"
              onClick={(e) => {
                e.preventDefault();
                window.open("mailto:", { instituteEmail });
              }}
              rel="noopener noreferrer"
            >
              {instituteEmail}
            </p>
          </div>
          <div className="item">
            <p className="text-xxs">Coffee with {instituteName}</p>
            <address>
              {instituteAddress}
              {", "}
              {instituteCity}
              {", "}
              <br />
              {instituteState}
              {" - "}
              {instituteZipcode} {" - "}
              {instituteCountry}
            </address>
          </div>
        </div>
        <div className="C-ContactFormHead">
          <p className="heading text-sm w-600">Drop us a line</p>
          <p className="sub-heading text-xs">
            If you have any question or need help, please fill out the form
            below. We do our best to respond quickly.
          </p>
        </div>
        <div className="C-ContactForm">
          <div className="C-ContactFormCst">
            <div className="formFieldwrap">
              <FormInput
                className={isEmpty ? "errorInput" : ""}
                name="fullname"
                type="text"
                maxlength={79}
                label="Full Name"
                placeholder="Full name"
                onChange={handleInput}
                onKeyUp={handleInput}
                value={contactInfoData.fullname.value}
                onKeyDown={(e) =>
                  symbolsArr.includes(e.key) && e.preventDefault()
                }
              />
              <FormError
                show={!contactInfoData.fullname.isValid && showLoginError}
                error="Full Name is required."
              />
            </div>
            <div className="formFieldwrap">
              <FormInput
                className={isEmpty ? "errorInput" : ""}
                type="email"
                name="email"
                label="Email"
                placeholder="Email"
                onChange={handleInput}
                value={contactInfoData.email.value}
              />
              <FormError
                show={!contactInfoData.email.isValid && showLoginError}
                error="Valid Email is required."
              />
            </div>
            <div className="formFieldwrap">
              <FormInput
                type="text"
                name="subjectTitle"
                label="Subject Title"
                placeholder="Subject Title"
                maxlength={79}
                onChange={handleInput}
                value={contactInfoData.subjectTitle.value}
              />
            </div>
            <div className="formFieldwrap">
              <FormTextArea
                id="Message"
                name="message"
                label="Message"
                maxlength={500}
                placeholder="Message"
                onChange={handleInput}
                value={contactInfoData.message.value}
              />
              <small>Max. 500 characters allowed.</small>
            </div>
            {!disabledButton ? (
              <button className="button" onClick={submitUserinfo}>
                Send Message
              </button>
            ) : (
              <button className="button">Send Message</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Contactus;
