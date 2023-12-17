import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormError from "../../Common/Form/FormError";
import FormInput from "../../Common/Form/FormInput";
import FormTextArea from "../../Common/Form/FormTextArea";
import { postContactReset, submitContactInfo } from "../../store/actions/contactus/";
import ValidationFile from "../Auth/ValidationFile";
import Address from "./address.svg";
import Phone from "./phone.svg";
import "./Contact.scss";
import ReactGA from "react-ga"
import AppLink from "../../Common/AppLink";
import { useNavigate, useLocation } from "react-router-dom";
import Auth from "../../Classes/Auth";
import { useEffect } from "react";

function ContactUs() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();

  const { postSuccess } = useSelector((state) => {
    return {
      postSuccess: state.contactUs.success,
    }
  })

  const emptyInfoData = {
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
  const [contactInfoData, setContactInfoData] = useState(emptyInfoData);
  const [showLoginError, setShowLoginError] = useState(false);

  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "fullname":
        return ValidationFile.validEmpty(inputValue);
      case "email":
        return (
          ValidationFile.validEmpty(inputValue) &&
          ValidationFile.validEmail(inputValue)
        );
      default:
        return false;
    }
  };

  const isFormValid = () => {
    return contactInfoData.fullname.isValid && contactInfoData.email.isValid
      ? true
      : false;
  };

  const [isEmpty, setIsEmpty] = useState(false);

  function handleInput(e) {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    let infoData = {
      ...contactInfoData,
      [inputName]: {
        value: inputValue,
        isValid: validationConfirm(inputValue.trim(), inputName),
      },
      validation: isFormValid(),
    };

    // updating state
    setContactInfoData(infoData);
    setIsEmpty(false);
  }

  const getFormData = () => {
    return {
      type: "Edneed",
      name: contactInfoData.fullname.value,
      email: contactInfoData.email.value,
      title: contactInfoData.subjectTitle.value,
      message: contactInfoData.message.value,
    };
  };

  const submitUserInfo = () => {
    setShowLoginError(true);
    if (ValidationFile.validEmail(contactInfoData.email.value)) {
      setIsEmpty(false);
      if (contactInfoData.validation) {
        contactInfoData.validation &&
          dispatch(submitContactInfo(getFormData()));
        // setContactInfoData(clearForm);
        setTimeout(() => {
          setShowLoginError(false);
          setContactInfoData(emptyInfoData);
        }, 300);
      } else {
      }
    } else {
      setIsEmpty(true);
    }
  };

  useEffect(() => {
    if (postSuccess) {
      history('/contact/thankyou')
    }
  }, [history, postSuccess])

  useEffect(() => {
    return () => {
      dispatch(postContactReset());
    }
  }, [dispatch])

  ReactGA.event({
    category: "First_Fold",
    action: "click",
    label: "Home_Expert",
  })

  return (
    <div className="contact_us_sec_wrap">
      <div className={`${Auth.isLogin() && location.pathname === "/contact" ? "mb-40" : "contactUsSec_1"}`}>
        <div className={`${Auth.isLogin() && location.pathname === "/contact" ? null : "edContainer"}`}>
          <div className="ContactUsHeading">
            <h1 className="primary w-700">Let's Talk</h1>
            <p className="text-xs">
              Ask us anything or just say hi...
            </p>
          </div>

          <div className="ContactUsWrap mt-40">
            <div className="ContactUsLeftItem">
              <div className="item">
                <p className="text-xs w-700 primary underline mb-3">Mail Us</p>
                <a
                  className="text-xs w-500 base cursor"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   window.open("mailto:", "sales@edneed.com");
                  // }}
                  href="mailto:sales@edneed.com"
                  rel="noopener noreferrer"
                >
                  sales@edneed.com
                </a>
                <a
                  className="text-xs w-500 base cursor mt-3"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   window.open("mailto:", "support@edneed.com");
                  // }}
                  href="mailto:support@edneed.com"
                  rel="noopener noreferrer"
                >
                  support@edneed.com
                </a>
              </div>
              <div className="item">
                <p className="text-xs w-700 primary underline mb-3">Call us at</p>
                <a
                  className="text-xs w-500 base cursor"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   window.open("tel:", "+919740450419");
                  // }}
                  href="tel:8368214889"
                  rel="noopener noreferrer"
                >
                  +91 8368214889
                </a>
              </div>
            </div>
            <div className="ContactUsRightItem">

              <div className="formFieldwrap">
                <FormInput
                  className={isEmpty ? "errorInput" : ""}
                  name="fullname"
                  type="text"
                  label="Full name"
                  placeholder="Full name"
                  onChange={handleInput}
                  value={contactInfoData.fullname.value}
                />
                <FormError
                  show={!contactInfoData.fullname.isValid && showLoginError}
                  error="Full name is required."
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
                  error="Valid email is required."
                />
              </div>
              <div className="formFieldwrap">
                <FormInput
                  type="text"
                  name="subjectTitle"
                  label="Subject Title"
                  placeholder="Subject title"
                  onChange={handleInput}
                  value={contactInfoData.subjectTitle.value}
                />
              </div>
              <div className="formFieldwrap">
                <FormTextArea
                  id="message"
                  name="message"
                  label="message"
                  maxlength={500}
                  placeholder="Message"
                  onChange={handleInput}
                  value={contactInfoData.message.value}
                />
                <small>Max. 500 characters allowed.</small>
              </div>
              <button
                className="button button-primary btn-sm button-block"
                onClick={submitUserInfo}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>

      </div>
      {/* <div className="contactUsSec_2">
        <div className="contact-card">
          <p className="officeLocationGrid_head text-xs w-600 underline primary">Office Locations</p>
          <div className="officeLocationGrid">
            <div className="olgItem">
              <h3 className="uppercase primary text-sm w-600">USA</h3>
              <address id="usa_address">
                9009 N Plaza,
                <br />
                UNIT 141, Austin
                <br />
                TX 78753
              </address>
              <p className="mapPointerBtn">
                <img src={Address} alt="Address Icon" />
                <span
                  className="w-600 text-xxs primary"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(
                      "https://www.google.com/maps/place/9009+N+Plaza+%23141austin,+Austin,+TX+78753,+USA/@30.352730298260106,-97.68614908325408,17z/data=!3m1!4b1!4m5!3m4!1s0x8644c977180bf3a9:0x360aebcf7a14d099!8m2!3d30.3527118!4d-97.6863422",
                      "_blank"
                    );
                  }}
                  rel="noopener noreferrer"
                >
                  Find us on Google Map
                </span>
              </p>
              <div className="contactNumberHead mt-10">
                <img src={Phone} alt="Address Icon" />
                Call Us at
              </div>
              <p className="contactNumber">
                <a
                  className="text-xs w-500 base"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   window.open("tel:", "+12546403448");
                  // }}
                  href="tel:+12546403448"
                  rel="noopener noreferrer"
                >
                  +1 (254) 640-3448
                </a>
              </p>
              <p className="contactNumber">
                <a
                  className="text-xs w-500 base"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   window.open("tel:", "+919315675847");
                  // }}
                  href="tel:9315675847"
                  rel="noopener noreferrer"
                >
                  +91 93156 75847
                </a>
              </p>
            </div>
            <div className="olgItem">
              <h3 className="uppercase primary text-sm w-600">Noida</h3>
              <address id="usa_address">
                203, Tower C, I-Thum
                <br />
                Sector-62, Noida
                <br />
                Uttar Pradesh, 201301 (INDIA)
              </address>
              <p className="mapPointerBtn">
                <img src={Address} alt="Address Icon" />
                <span
                  className="w-600 text-xxs primary"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(
                      "https://www.google.co.in/maps/place/IThum+Tower+B+-+Lift+Entry/@28.6262525,77.3722049,19z/data=!4m5!3m4!1s0x390ce54de4dc2f2d:0xa4a968baca30d045!8m2!3d28.6261925!4d77.372795",
                      "_blank"
                    );
                  }}
                  rel="noopener noreferrer"
                >
                  Find us on Google Map
                </span>
              </p>
              <div className="contactNumberHead mt-10">
                <img src={Phone} alt="Address Icon" />
                Call Us at
              </div>
              <p className="contactNumber">
                <a
                  className="text-xs w-500 base"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   window.open("tel:", "+918368214889");
                  // }}
                  href="tel:8368214889"
                  rel="noopener noreferrer"
                >
                  +91 83682 14889
                </a>
              </p>
              <p className="contactNumber">
                <a
                  className="text-xs w-500 base"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   window.open("tel:", "+919625921074");
                  // }}
                  href="tel:9625921074"
                  rel="noopener noreferrer"
                >
                  +91 96259 21074
                </a>
              </p>
            </div>
            <div className="olgItem">
              <h3 className="uppercase primary text-sm w-600">Manipur</h3>
              <address id="usa_address">
                Sega Road, Konjeng hajari leikai
                <br />
                Above Khadim, Imphal est
                <br />
                Manipur - 795001
              </address>
              <p className="mapPointerBtn">
                <img src={Address} alt="Address Icon" />
                <span
                  className="w-600 text-xxs primary"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(
                      "https://www.google.com/maps/dir//Khadim's+Keishampat+Branch,+Tiddim+Rd,+Sagolband,+Imphal,+Manipur+795001/@24.7917234,93.9193849,15z/data=!4m17!1m7!3m6!1s0x3749279c3510e491:0x1e7484326f704bb0!2sKhadim's+Keishampat+Branch!8m2!3d24.7940709!4d93.928533!15sCjhLaGFkaW0ncyBLZWlzaGFtcGF0IEJyYW5jaCwgVGlkZGltIFJkLCBTYWdvbGJhbmQsIEltcGhhbFo3IjVraGFkaW0ncyBrZWlzaGFtcGF0IGJyYW5jaCB0aWRkaW0gcmQgc2Fnb2xiYW5kIGltcGhhbJIBDmNsb3RoaW5nX3N0b3Jl!4m8!1m0!1m5!1m1!1s0x3749279c3510e491:0x1e7484326f704bb0!2m2!1d93.928533!2d24.7940709!3e3",
                      "_blank"
                    );
                  }}
                  rel="noopener noreferrer"
                >
                  Find us on Google Map
                </span>
              </p>
              <div className="contactNumberHead mt-10">
                <img src={Phone} alt="Address Icon" />
                Call Us at
              </div>
              <p className="contactNumber">
                <a
                  className="text-xs w-500 base"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   window.open("tel:", "+919740450419");
                  // }}
                  href="tel:9740450419"
                  rel="noopener noreferrer"
                >
                  +91 97404 50419
                </a>
              </p>
            </div>
          </div>
        </div>
      </div> */}


    </div>
  );
}

export default ContactUs;
