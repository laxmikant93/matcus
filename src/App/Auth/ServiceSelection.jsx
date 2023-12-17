import React, { useRef } from 'react';
import SearchControl from '../../Common/SearchControl';
import Arrow from '../../assets/Icons/arrow-right.svg'
import './servicesSelection.scss'
import { useSelector } from 'react-redux';
import Request from '../../Classes/Request';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import FormInput from '../../Common/Form/FormInput';
import ValidationFile from '../../Classes/ValidationFile';
import FormError from '../../Common/Form/FormError';
import { setUserActiveRoleUpdate, updateBusinessType, updateCreateInstituteInfoNew, updateDashboardStepper, updateUserInstituteInfo } from '../../store/actions/user';
import { useEffect } from 'react';
import "./businessname.scss"
import PhoneInput from 'react-phone-input-2';
import CommonOtpVerificationPersonal from './AuthV1/CommonOtpVerificationPersonal';
import BasicDetailsOtpVerification from './BasicDetailsOtpVerification';
import { useNavigate } from 'react-router-dom';
import AppLink from '../../Common/AppLink';
import Auth from '../../Classes/Auth';
import './IndustrySelectionPopup';
import IndustrySelectionPopup from './IndustrySelectionPopup';

const ServicesSelection = () => {

  const createref = useRef(null);

  const WebsiteTypeRequest = new Request();
  const { user } = useSelector((state) => {
    return {
      user: state.user
    }
  })
  const [popup, setPopup] = useState(true)
  const [pageloading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [institute_name, set_institute_name] = useState("")
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [contact, setContact] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [contactError, setContactError] = useState(false)
  const [institute_name_error, set_institute_name_error] = useState(false);
  const [type, setType] = useState({ websiteType: "LMS",
    modelType: "institute"});
  const [otpVerifySend, setotpVerifySend] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [showError, setShowError] = useState(false)
  const [basicDetailsVerified, setBasicDetailsVerified] = useState(false);

  // const [symbolsArr] = useState(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9])


  const [successMessage, success, errorMessage, error, resetAll, verifyOtpLoading, loading, sendEmailVerificationMail,
    VerifyEmailMail, sendContactVerificationOtp, VerifyContactOtp] = CommonOtpVerificationPersonal();

  const history = useNavigate();

  useEffect(() => {
    if (user.user_email) {
      setEmail(user.user_email);
    }
    else if (user.user_contact) {
      setContact(user.user_contact);
    }

  }, [user.user_contact, user.user_email])


  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value
    if (inputName === "email") {
      setEmail(inputValue)
      setEmailError(!ValidationFile.isEmail(inputValue))
    }
    else {
      set_institute_name(ValidationFile.spaceNotAccept(inputValue));
      set_institute_name_error(ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue)));

    }
    setotpVerifySend(false)
    setShowError(false)
    resetAll()
  }
  const handleWebsite = (websiteType, modelType) => {
    setPopup(!popup)
    setType({
      websiteType: websiteType,
      modelType: modelType
    })
  }

  const payloadData = () => {
    return {
      owner: user._id,
      type: type.websiteType,
      model_type: type.modelType,
      business_category: type.websiteType,
      business_name: institute_name,
      ecommerce_industry: selectedCategory,
      business_shop_type: selectedCategory,
      // email: email,
      // contact: contact,
      // country_code: countryCode,
      // contact_verify: true,
      // email_verify: true,
      isVerified: true
    }
  }

  const handleCancel = () => {
    set_institute_name_error(false)
    setPopup(false)
  }
  const [categoryError, setCategoryError] = useState(false)
  const checkCategoryValid = () => {
    if (type.websiteType === "Ecommerce") {
      if (ValidationFile.isNotEmpty(selectedCategory)) {
        setCategoryError(false)
        return true
      } else {
        setCategoryError(true)
        return false
      }
    } else {
      setCategoryError(false)
      return true
    }
  }
  // console.log(containsSpecialChars(institute_name), "console.log(containsSpecialChars('hello!'));");
  const createBusiness = async () => {
    if (ValidationFile.isEmpty(ValidationFile.spaceNotAccept(institute_name))) {
      set_institute_name_error(true)
    }

    let categoryValid = checkCategoryValid()
    if (!ValidationFile.isEmpty(ValidationFile.spaceNotAccept(institute_name)) && categoryValid) {
      setLoading(true)
      await WebsiteTypeRequest.post(WebsiteTypeRequest.url("/authorization-middleware/type", "middleware"),
        payloadData(),
        (success) => {
          // if (type.modelType === "institute") {
          //   dispatch(updateUserInstituteInfo(success.data.company.institute_subdomain))
          //   dispatch(updateCreateInstituteInfoNew(success.data.website.business, success.data.company.institute_name, success.data.company.institute_address))
          //   dispatch(setUserActiveRoleUpdate(success.data.userRole.role))
          //   dispatch(updateBusinessType(success.data.website.type, success.data.token_data.token, success.data.website.user))
          //   dispatch(updateDashboardStepper(success.data.DashboardStepper))

          // } else {
          //   dispatch(updateUserInstituteInfo(success.data.company.business_subdomain))
          //   dispatch(updateCreateInstituteInfoNew(success.data.website.business, success.data.company.business_name, success.data.company.business_address))
          //   dispatch(setUserActiveRoleUpdate(success.data.userRole.role))
          //   dispatch(updateBusinessType(success.data.website.type, success.data.token_data.token, success.data.website.user))
          //   dispatch(updateDashboardStepper(success.data.DashboardStepper))
          // }
          if (success.data.website.type === "LMS") {
            dispatch(updateUserInstituteInfo(success.data.company.institute_subdomain))
            dispatch(updateCreateInstituteInfoNew(success.data.website.business, success.data.company.institute_name, success.data.company.institute_address))
            dispatch(setUserActiveRoleUpdate(success.data.userRole.role))
            dispatch(updateBusinessType(success.data.website.type, success.data.token_data.token, success.data.token_data.hash, success.data.website.user, email, contact))
            // Auth.updateUserDetail("user_institute_institute_subdomain", success.data.company.institute_subdomain);
            dispatch(updateDashboardStepper(success.data.DashboardStepper,success.data.website.type))
          } else {
            dispatch(updateUserInstituteInfo(success.data.company.business_subdomain))
            dispatch(updateCreateInstituteInfoNew(success.data.website.business, success.data.company.business_name, success.data.company.business_address))
            dispatch(setUserActiveRoleUpdate(success.data.userRole.role))
            dispatch(updateBusinessType(success.data.website.type, success.data.token_data.token, success.data.token_data.hash, success.data.website.user, email, contact))
            // Auth.updateUserDetail("user_institute_institute_subdomain", success.data.company.business_subdomain);
            dispatch(updateDashboardStepper(success.data.DashboardStepper,success.data.website.type))

          }
          // window.reload()
          setLoading(false)
        },
        (error) => {

        }
      );
    }
  }

  // useEffect(() => {
  //   if (user.user_email) {
  //     setEmail(user.user_email);
  //   }
  //   else if (user.user_contact) {
  //     setContact(user.user_contact);
  //   }

  // }, [user.user_contact, user.user_email])

  useEffect(() => {
    if (success && sendingOtp) {
      resetAll()
      setSendingOtp(false);
      setotpVerifySend(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  useEffect(() => {
    if (user.user_email &&
      user.user_contact) {
      setBasicDetailsVerified(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.user_email, user.user_contact])

  const validEmailId = () => {
    let isValid = true;
    if (email) {
      if (!ValidationFile.isEmail(email)) {
        isValid = false;
      } else {
        isValid = true;
      }
    } else {
      isValid = false;
    }
    if (isValid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
    return isValid;
  };
  const validContact = () => {
    let isValid = true;
    if (contact && countryCode) {
      if (countryCode.toString() === "91" && contact.toString().length === 10) {
        isValid = true;
      } else if (countryCode !== "91" && (contact.length > 4 && contact.length.length < 17)) {
        isValid = true;
      } else {
        isValid = false;
      }
    } else {
      isValid = false;
    }
    if (isValid) {
      setContactError(false);
    } else {
      setContactError(true);
    }
    return isValid;
  };

  // useEffect(() => {
  //   if (verificationDone) {
  //     createBusiness()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [verificationDone])

  const updateUser = async (e) => {
    setShowError(true);
    e.preventDefault();
    const isEmailValid = validEmailId();
    const isContactValid = validContact();
    if (ValidationFile.isEmpty(ValidationFile.spaceNotAccept(institute_name))) {
      set_institute_name_error(true);
    }
    if ((isEmailValid && isContactValid) &&
      !ValidationFile.isEmpty(ValidationFile.spaceNotAccept(institute_name))) {
      setSendingOtp(true);
      if (user.user_email_verify) {
        await sendContactVerificationOtp({ contact: contact, country_code: countryCode });
      } else {
        await sendEmailVerificationMail({ email: email, userID: user._id });
      }
    }
  }

  const handleInputContact = (value, formattedValue) => {
    const dialCode = formattedValue.dialCode;
    let mobile = value.replace(dialCode, "");
    let inputValue = mobile;
    setCountryCode(dialCode);
    setContact(inputValue);
    setotpVerifySend(false)
    setShowError(false)
    setContactError(ValidationFile.isEmpty(inputValue))
    resetAll()
  }

  const logoutHandle = () => {
    history('/auth/logout')
  }

  const OpenIndustryPopUp = () => {
    createref.current.open()
  }
  const onclose = () => {
    createref.current.close()
  }

  const [selectedCategory, setSelectedCategory] = useState("")
  const handleTick = (cat) => {
    setSelectedCategory(cat)
  }
  return (

    <React.Fragment>
      {
        popup === false ? (
          <div className='servicesSelectionWrapper'>
            <div className="servicefooter_Buttons">
              <button type="button" onClick={() => logoutHandle()} className="buttons"><i className="icon-exit"></i> Logout</button>

            </div>
            <div className='servicesTopSection text-center'>
              <div className='topheadingDiv'>
                <h2 >What kind of website are you creating?</h2>
              </div>
              {/* <div className='searchSection'>
                <SearchControl
                  placeholder="Search for your business or website type"
                  classNameWrappper={'ServicesSearchForm'}
                />
              </div> */}
            </div>
            {/* bottom card section  */}
            <div className='servicesBottomSection'>
              <div className='servicesWrapperSection'>
                <div className='service bg-blue' >
                  <div>
                    <h3 className='capitalize text-sm'>Institution</h3>
                    <p className='servicePara text-xxs'>Educate beyond physical boundaries. Get an educational website integrated with Learning Management System and Enterprise Resource Planning</p>
                  </div>
                  <button className='service-btn' onClick={() => handleWebsite("LMS", "institute")}>
                    <span>Continue as</span>
                    <span className='right-arrow'> <img src={Arrow} alt="" /></span>
                  </button>
                  {/* <div className='serviceOverlay'>
                    <p className='text-sm'>Coming soon...</p>
                  </div> */}
                </div>
                {/* E-commerce */}
                <div className='service bg-gray'>
                  <div>
                    <h3 className='capitalize text-sm'>E-Commerce</h3>
                    <p className='servicePara text-xxs'>Commence your Ecommerce journey, Get a website with Inventory Management feature. Display product catalogue through Product List option. </p>
                  </div>
                  <button className='service-btn' onClick={() => handleWebsite("Ecommerce", "business")}>
                    <span>Continue as</span>
                    <span className='right-arrow'> <img src={Arrow} alt="" /></span>
                  </button>

                </div>
                {/* Medical card */}
                <div className='service bg-skyblue'>
                  <div>
                    <h3 className='capitalize text-sm'>Booking services</h3>
                    <p className='servicePara text-xxs'>Easy management of bookings. Schedule appointments effortlessly with your own website.</p>
                  </div>
                  <button className='service-btn' onClick={() => handleWebsite("Services", "business")}>
                    <span>Continue as</span>
                    <span className='right-arrow'> <img src={Arrow} alt="" /></span>
                  </button>
                  {/* <div className='serviceOverlay'>
                    <p className='text-sm'>Coming soon...</p>
                  </div> */}
                </div>
                {/* food section  */}
                <div className='service bg-orange'>
                  <div>
                    <h3 className='capitalize text-sm'>Food & Restaurant</h3>
                    <p className='servicePara text-xxs'>Create an appetising website, attract food lovers. Display your culinary skills, manage table bookings with an added feature of time slots.</p>
                  </div>
                  <button className='service-btn' onClick={() => handleWebsite("Services", "business")}>
                    <span>Continue as</span>
                    <span className='right-arrow'> <img src={Arrow} alt="" /></span>
                  </button>
                  <div className='serviceOverlay'>
                    <p className='text-sm'>Coming soon...</p>
                  </div>
                </div>
                {/* Portfolio section */}
                <div className='service bg-purple'>
                  <div>
                    <h3 className='capitalize text-sm'>Portfolio</h3>
                    <p className='servicePara text-xxs'>Showcase your skill set on the internet. Attract clients and employers through a personalised website with a professional touch.</p>
                  </div>
                  <button className='service-btn' onClick={() => handleWebsite("Services", "business")}>
                    <span>Continue as</span>
                    <span className='right-arrow'> <img src={Arrow} alt="" /></span>
                  </button>
                  <div className='serviceOverlay'>
                    <p className='text-sm'>Coming soon...</p>
                  </div>
                </div>
                {/* coming soon */}
                {/* <div className='service bg-green'>
              <div>
                <h3 className='capitalize text-sm'>Event</h3>
                <p className='servicePara text-xxs'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium quis saepe odio debitis quis saepe odio debitis </p>
              </div>
              <button className='service-btn'>
                <span>Continue as</span>
                <span className='right-arrow'> <img src={Arrow} alt="" /></span>
              </button>
              <div className='serviceOverlay'>
                <p className='text-sm'>Coming soon...</p>
              </div>
            </div> */}
              </div>
              <div className="servicefooter_Buttons">
                {/* <AppLink to="/community" className="buttons">Skip to Community &#10132;</AppLink> */}
              </div>
            </div>

          </div>
        ) : (
          <div className="edContainer">
            <div className="BusinessName-wrapper">
              <div className="button-group logout-button">
                <button type="button" onClick={() => logoutHandle()}><i className="icon-exit"></i> Logout</button>

                {/* <div className="button-group">
                  <button type="button" onClick={handleCancel}><i className="arrow-icon"></i> Back</button> */}
                  {/* <button type="button">Skip</button> */}
                {/* </div> */}
              </div>
              <div>
                <h1 className="text-md w-600">What is the name of your {type.websiteType === "LMS" ? "Institute" : type.websiteType === "Services" ? "Service" : "Ecommerce"}</h1>
                <p className="text-xxs w-400">You can change it anytime</p>
                <div className="formFieldwrap position-relative">
                  <input onChange={handleInput}
                    onKeyUp={handleInput}
                    value={institute_name}
                    name="institute_name" type="text" placeholder="Institute name" aria-describedby="Institute name"
                  // onKeyDown={(e) =>
                  //   symbolsArr.includes(e.key) && e.preventDefault()
                  // }
                  />
                  <FormError
                    show={!institute_name && institute_name_error}
                    error="Institute name required."
                  />

                </div>

                {/* new industry Selection screen */}

                {
                  type.websiteType === "Ecommerce" ?

                    <div className='industry-Selection-wrapper'>

                      {
                        selectedCategory ?
                          <div className="formFieldwrap position-relative" onClick={() => OpenIndustryPopUp()}>
                            <input
                              // onKeyUp={handleInput}
                              value={selectedCategory}
                              name="institute_name" type="text" aria-describedby=" industry name" disable={true} className="cursor-pointer" />
                            {/* <FormError
                      show={!institute_name && institute_name_error}
                      error="Business name required."
                    /> */}

                          </div>
                          :
                          <button className='text-xs w-500 primary industy-btn' onClick={() => OpenIndustryPopUp()}>Select Industry Type
                            <FormError show={!selectedCategory && categoryError} error="Category required." /></button>

                      }

                    </div>

                    : ""
                }

                <IndustrySelectionPopup onclose={() => onclose()} createref={createref} ModalsSize={'modal-m'} handleTick={handleTick} />

                {/* <form onSubmit={updateUser}>
                  <div className="basicdetail_form">
                    {user.user_email_verify ? (
                      <>
                        <div className="formFieldwrap">
                          <div className="cstmPhoneInput">
                            <PhoneInput
                              autoComplete="off"
                              autoCorrect="off"
                              spellCheck="off"
                              countryCodeEditable={false}
                              containerClass="form-group"
                              inputClass="form-control"
                              specialLabel="hii"
                              country={"in"}
                              value={`${countryCode}${contact} `}
                              inputProps={{
                                name: "phone",
                                required: true,
                                autoFocus: true,
                              }}
                              enableSearch
                              disableSearchIcon
                              onChange={(value, formattedValue) => {
                                handleInputContact(value, formattedValue);
                              }}
                              onKeyUp={(value, formattedValue) => {
                                handleInputContact(value, formattedValue);
                              }}
                              disabled={user.user_contact_verify}
                            />
                            <label className="animLabel" htmlFor="mobile_number">
                              Mobile Number
                            </label>
                          </div>
                          <FormError
                            show={contact === "" && contactError && showError}
                            error="contact is required."
                          />
                          <FormError
                            show={contact !== "" && contactError && showError}
                            error="invalid contact number."
                          />
                          <FormError
                            show={errorMessage === "Contact Not Available" && showError && error}
                            error="contact already exist."
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="formFieldwrap">
                          <FormInput
                            placeholder="Email" name="email" value={email} onKeyUp={handleInput} onChange={handleInput}
                            onWheel={(e) => e.target.blur()} onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()} />
                          <FormError
                            show={email === "" && emailError && showError}
                            error="email is required."
                          />
                          <FormError
                            show={email !== "" && emailError && showError}
                            error="email is invalid."
                          />
                          <FormError
                            show={errorMessage === "Email Not Available" && showError && error}
                            error="email already exist."
                          />
                        </div>
                      </>
                    )}
                  </div>
                  {
                    basicDetailsVerified ? (
                      <React.Fragment>
                        {
                          pageloading ? (
                            <button className="button btn-oval button-primary btn-sm" >Loading.... </button>
                          ) : (
                            <button type="submit" className="button btn-oval button-primary btn-sm" onClick={createBusiness}>Continue </button>
                          )
                        }
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {
                          otpVerifySend ? (
                            <BasicDetailsOtpVerification contact={contact} country_code={countryCode} email={email}
                              institute_name={institute_name} type={type} />
                          ) : (
                            <button className='button button-primary btn-sm white next_btn' type='submit'>{loading ? "Loading.." : "Send Otp"}</button>
                          )
                        }
                      </React.Fragment>
                    )
                  }

                </form> */}



                {
                  pageloading ? (<button className="button btn-oval button-primary btn-sm" >Loading.... </button>) : (
                    <button type="submit" className="button btn-oval button-primary btn-sm" onClick={createBusiness}>Continue </button>
                  )
                }
              </div>

            </div>
          </div>
        )
      }

      {/* {
        popup ?
          <React.Fragment>
            <BusinessName /> */}
      {/* <div className="formFieldwrap">
              <FormInput
                onChange={handleInput}
                onKeyUp={handleInput}
                value={institute_name}
                name="institute_name"
                type="text"
                label="* Business Name"
                placeholder="* Business name"
              />
              <FormError
                show={!institute_name && institute_name_error}
                error="Business name required."
              />
            </div>
            {
              loading ?
                <button>Loading...</button> :
                <button onClick={createBusiness}>Continue</button>
            }
            <button onClick={handleCancel}>Cancell</button> */}
      {/* </React.Fragment> : "" */}
      {/* }
    </React.Fragment> */}
      {/* </InstituteTheme> */}
    </React.Fragment>
  )
}

export default ServicesSelection