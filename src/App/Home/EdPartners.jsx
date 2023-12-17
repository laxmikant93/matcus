/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import AppLink from '../../Common/AppLink';
import FormInput from '../../Common/Form/FormInput';
import './home.scss';
import PartnerArrow from "./partner-arrow.svg";
import FreelancersIcon from "./PartnerIcons/freelancers-icon.svg";
import SchoolErpIcon from "./PartnerIcons/school-erp.svg";
import Professional from "./PartnerIcons/professional.svg";
import Developer from "./PartnerIcons/developer.svg";
import UserIcon from "./PartnerIcons/user-icon.svg";
import PassionateStudent from "./PartnerIcons/passionate-student.svg";
import BloggerIcon from "./PartnerIcons/blogger-icon.svg";
import FormTextArea from '../../Common/Form/FormTextArea';
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ValidationFile from '../../Classes/ValidationFile';
import ValidationUtils from '../../Classes/ValidationUtils';
import FormError from '../../Common/Form/FormError';
import { postPartnerDetail, resetPostPartnerDetail } from '../../store/actions/edPartners';
import ReactGA from "react-ga";
import useScrollTracker from '../../Common/GoogleAnalytics/useScrollTracker';



const EdPartners = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [currentProfession, setCurrentProfession] = useState("");
  const [location, setLocation] = useState("");
  const [reason, setReason] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [fullnameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const [countryCodeError, setCountryCodeError] = useState("");

  let dispatch = useDispatch();
  let history = useNavigate();
  const symbolsArr = [",", '"', `'`, "!", "@", "`", "~", "#", "$", "%", "^", "&", "*", "(", ")",
    "_", "-", "=", "+", ".", "<", ">", "/", "?", ":", ";", "{", "}", "[", "]", `|`,
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

  const { loading, success } = useSelector((state) => {
    return {
      loading: state.EdPartner.postPartner.loading,
      success: state.EdPartner.postPartner.success,
    }
  })

  useScrollTracker([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], ({ scrollY }) => {
    ReactGA.event({
      category: "Edneed_Partner_Scroll",
      action: scrollY,
      label: "scroll-depth",
      value: scrollY
    });
  })

  const handleInputDetails = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    ReactGA.event({
      category: "Edneed_Partner_Form",
      action: "input",
      label: inputName,
    })
    switch (inputName) {
      case "fullname":
        setFullName(value);
        setFullNameError(ValidationUtils.isEmpty(value));
        break;

      case "email":
        setEmail(value);
        setEmailError(ValidationUtils.isEmpty(value));
        setContactNumberError(false);
        break;
      case "current_Profession":
        setCurrentProfession(value);

        break;
      case "location":
        setLocation(value);
        break;

      default:
        setReason(value);
    }
  }

  const handlePhoneInput = (inputValue, countryDetail) => {
    let dialCode = countryDetail.dialCode;
    let mobile = inputValue.replace(dialCode, "");
    setContactNumber(mobile);
    setCountryCode(dialCode);
    setContactNumberError(ValidationUtils.isEmpty(mobile));
    setCountryCodeError(ValidationUtils.isEmpty(dialCode));
    setEmailError(false);
  }

  const EdPartner = {
    name: fullname,
    email: email,
    mobile: contactNumber,
    current_profession: currentProfession,
    current_location: location,
    message: reason,
  }

  const validEmail = () => {
    let isvalid = true;
    if (email) {
      if (!ValidationUtils.isEmail(email)) {
        isvalid = false;
      }
    }
    else if (contactNumber) {
      isvalid = true;
    }
    else {
      isvalid = false;
    }
    return isvalid;
  }

  const validContactDetails = () => {
    let isValid = true;
    if (contactNumber && countryCode === "91") {
      if (contactNumber.length < 10) {
        isValid = false;
      }
      else {
        isValid = true;
      }
    }
    else if (email) {
      isValid = true;
    }
    else {
      isValid = false;
    }
    return isValid;
  }

  const handleSubmitButton = () => {
    ReactGA.event({
      category: "Edneed_Partner_Form",
      action: "click",
       label:"Submit",
    })

    let emailValid = validEmail();
    setEmailError(!emailValid);
    let contactDetailsValid = validContactDetails();
    setContactNumberError(!contactDetailsValid);
    setCountryCodeError(true);
    if (ValidationUtils.isEmpty(fullname)) {
      setFullNameError(true);
    }
    if (emailValid && contactDetailsValid &&
      ValidationUtils.isNotEmpty(fullname)) {
      dispatch(postPartnerDetail(EdPartner));
    }
  }

  if (success) {
    history("/");
  }

  useEffect(() => {
    return () => {
      dispatch(resetPostPartnerDetail());
    }
  }, [dispatch])



  const logoClick = (e) => {
    ReactGA.event({
      category: "Edneed_Partner",
      action: "click",
      label: e,
    })
  }

  return (
    <>
      <section>
        <div className="fullEdContainer">
          <div className="row partnerHero">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <div className="partnerHeroCover"></div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 partnerHeroContent">
              <h1>Become Our Channel Partner</h1>
              <p className="sub">
                We aim at digitizing businesses of every size and help them take
                maximum benefits of the endless possibilities that the online world
                provides to increase their revenue.
              </p>
              <p className="sub">
                Edneed is now inviting channel partners who can refer and sell our
                platform and services to businesses in their territory and earn a
                percentage on each sale.
              </p>
            </div>
          </div>
          <div className="benifitsPartner">
            <div className="edContainer">
              <h3>Benefits of associating with Edneed</h3>
              <ul>
                <li className="benifitsPartnerItem">
                  <span className="checkIconWrap">
                    <i className="checkIcon"></i>
                  </span>
                  Easy to start without any hassle.
                </li>
                <li className="benifitsPartnerItem">
                  <span className="checkIconWrap">
                    <i className="checkIcon"></i>
                  </span>
                  Get a chance to work with a Multinational Company.
                </li>
                <li className="benifitsPartnerItem">
                  <span className="checkIconWrap">
                    <i className="checkIcon"></i>
                  </span>
                  Work at the comfort of your home.
                </li>
                <li className="benifitsPartnerItem">
                  <span className="checkIconWrap">
                    <i className="checkIcon"></i>
                  </span>
                  Build your network and relationships.
                </li>
                <li className="benifitsPartnerItem">
                  <span className="checkIconWrap">
                    <i className="checkIcon"></i>
                  </span>
                  Earn handsome commission on each sale.
                </li>
                <li className="benifitsPartnerItem">
                  <span className="checkIconWrap">
                    <i className="checkIcon"></i>
                  </span>
                  Zero  money investment.
                </li>
              </ul>
            </div>
          </div>
          <div className="whoBecomePartnerWrapper">
            <div className="edContainer">
              <h3>Who can become our Channel Partner ?</h3>
              <ul>
                <li>
                  <div className="whoBecomePartner">
                    <i className="icon">
                      <img src={FreelancersIcon} alt="PartnerArrow" onClick={() => logoClick("FreelancersIcon")} />
                    </i>
                    <div className="caption">
                      Freelancers and Individuals
                    </div>
                  </div>
                </li>
                <li>
                  <div className="whoBecomePartner">
                    <i className="icon">
                      <img src={SchoolErpIcon} alt="PartnerArrow" onClick={() => logoClick("SchoolErpIcon")} />
                    </i>
                    <div className="caption">
                      Institute Solution Providers
                    </div>
                  </div>
                </li>
                <li>
                  <div className="whoBecomePartner">
                    <i className="icon">
                      <img src={Professional} alt="PartnerArrow" onClick={() => logoClick("ProfessionalIcon")} />
                    </i>
                    <div className="caption">
                      IT professionals
                    </div>
                  </div>
                </li>
                <li>
                  <div className="whoBecomePartner">
                    <i className="icon">
                      <img src={Developer} alt="PartnerArrow" onClick={() => logoClick("DeveloperIcon")} />
                    </i>
                    <div className="caption">
                      App and Web Developers
                    </div>
                  </div>
                </li>
                <li>
                  <div className="whoBecomePartner">
                    <i className="icon">
                      <img src={PassionateStudent} alt="PartnerArrow" onClick={() => logoClick("PassionateStudentIcon")} />
                    </i>
                    <div className="caption">
                      Passionate students
                    </div>
                  </div>
                </li>
                <li>
                  <div className="whoBecomePartner">
                    <i className="icon">
                      <img src={BloggerIcon} alt="PartnerArrow" onClick={() => logoClick("BloggerIcon")} />
                    </i>
                    <div className="caption">
                      Bloggers
                    </div>
                  </div>
                </li>
                <li>
                  <div className="whoBecomePartner">
                    <i className="icon">
                      <img src={UserIcon} alt="PartnerArrow" onClick={() => logoClick("UserIcon")} />
                    </i>
                    <div className="caption">
                      Anyone who has the zeal to build
                      relationships, grow their network
                      and make income.
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="howToChannelPartnerWrapper">
            <div className="edContainer">
              <h3>How to  become Edneed channel partner today</h3>
              <ul>
                <li>
                  <div className="item-circle first">
                    Fill the form
                    <i className="nextArrow">
                      <img src={PartnerArrow} alt="PartnerArrow" />
                    </i>
                  </div>
                  <span>First</span>
                </li>
                <li>
                  <div className="item-circle second">
                    Talk to an Expert
                    <i className="nextArrow">
                      <img src={PartnerArrow} alt="PartnerArrow" />
                    </i>
                  </div>
                  <span>Second</span>
                </li>
                <li>
                  <div className="item-circle third">
                    Accept Edneed Partner agreement
                    <i className="nextArrow">
                      <img src={PartnerArrow} alt="PartnerArrow" />
                    </i>
                  </div>
                  <span>Third</span>
                </li>
                <li>
                  <div className="item-circle fourth">
                    Complete the partner training
                    <i className="nextArrow">
                      <img src={PartnerArrow} alt="PartnerArrow" />
                    </i>
                  </div>
                  <span>Fourth</span>
                </li>
                <li>
                  <div className="item-circle fifth">
                    Start Earning
                  </div>
                  <span>Fifth</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="partnerRegisterWrap">
            <div className="edContainer">
              <div className="row partnerRegisterRow middle-xs">
                <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                  <div className="partnerRegisterDescription">
                    <div className="section-heading text-white">
                      <div className="section-subtitle">Ready to talk ?</div>
                      <h1 className="section-title">Fill the form</h1>
                      <div className="design-arrow left"></div>
                    </div>
                    <p className="cnt">
                      Once you fill out the form, our product specialist will reach out to you within 48hours.
                    </p>
                    <p className="cnt">
                      The first objective will be to understand your needs, then help you develop an action plan and start rolling!
                    </p>
                    <p className="cnt">
                      Let’s work together to create a game-changing experience.
                    </p>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7">
                  <div className="partnerHeroFormCnt">
                    <div className="partner-reg-form">
                      <div className="formFieldwrap">
                        <FormInput
                          placeholder="Name"
                          label="Name"
                          type="text"
                          value={fullname}
                          name="fullname"
                          onChange={handleInputDetails}
                          onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                        />
                        <FormError
                          show={fullnameError}
                          error="Full name is required."
                          className='visitorFormError'
                        />
                      </div>
                      <div className="formFieldwrap">
                        <FormInput
                          placeholder="Email Id"
                          label="Email Id"
                          type="text"
                          value={email}
                          name="email"
                          onChange={handleInputDetails}
                        />
                        <FormError
                          show={!email && emailError}
                          error="Email is required."
                          className='visitorFormError'
                        />
                        <FormError
                          show={email && emailError}
                          error="Invalid Email."
                          className='visitorFormError'
                        />
                      </div>
                      <div className="formFieldwrap">
                        <div className="cstmPhoneInput">
                          <PhoneInput
                            countryCodeEditable={false}
                            containerClass="form-group"
                            inputClass="form-control"
                            specialLabel
                            country={"in"}

                            inputProps={{
                              name: "phone",
                              required: true,
                              autoFocus: false,
                              placeholder: "Enter mobile",
                            }}
                            enableSearch
                            name="mobileNo"
                            value={`${countryCode} ${contactNumber}`}
                            searchPlaceholder="Search Country"
                            onChange={(value, country) => {
                              handlePhoneInput(value, country);
                            }}
                            onKeyUp={(value, country) => {
                              handlePhoneInput(value, country);
                            }}
                            disableSearchIcon
                          />
                          <label className="animLabel" htmlFor="mobile_number">
                            Mobile Number
                          </label>
                          <FormError
                            show={!contactNumber && contactNumberError && countryCodeError}
                            error="Contact number is required."
                            className='visitorFormError'
                          />
                          <FormError
                            show={contactNumber && countryCode === "91" && contactNumberError}
                            error="Invalid Contact."
                            className='visitorFormError'
                          />
                        </div>
                      </div>
                      <div className="formFieldwrap">
                        <FormInput
                          placeholder="Current Profession"
                          label="Current Profession"
                          type="text"
                          name="current_Profession"
                          value={currentProfession}
                          onChange={handleInputDetails}
                        />
                      </div>
                      <div className="formFieldwrap">
                        <FormInput
                          placeholder="Location"
                          label="Location"
                          type="text"
                          name="location"
                          value={location}
                          onChange={handleInputDetails}
                        />
                      </div>
                      <div className="formFieldwrap">
                        <FormTextArea
                          label="Reason to join Edneed"
                          rows="2"
                          placeholder="Reason to join Edneed"
                          name="reason"
                          value={reason}
                          onChange={handleInputDetails}
                        />
                      </div>
                      <div className="partner-reg-form-btn">
                        {loading ?
                          <button type="button"
                            className="button button-base button-block uppercase">
                            SUBMITING...
                          </button>
                          :
                          <button type="button"
                            className="button button-base button-block uppercase"
                            onClick={handleSubmitButton}>
                            SUBMIT
                          </button>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default EdPartners