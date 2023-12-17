import React, { useRef, useState } from "react";
import { useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { useSelector } from "react-redux";
import ValidationFile from "../../Classes/ValidationFile";
import FormError from "../../Common/Form/FormError";
import FormInput from "../../Common/Form/FormInput";
import Modals from "../../Common/Modals/index";
import ModalsBody from "../../Common/Modals/ModalsBody";
import ModalsHeader from "../../Common/Modals/ModalsHeader";
import CommonOtpVerificationPersonal from "../Auth/AuthV1/CommonOtpVerificationPersonal";
import BasicDetailsOtpVerification from "../Auth/BasicDetailsOtpVerification";
import VerifyImage from './InstituteDashboard/Verified-img.png';
import './contactEmailVerify.scss';
const ContactEmailVerify = ({ verifyState, testModals, closeMainPopUp, setSendOTP,
  accountContact, accountCountryCode, sendOTP, accountEmail }) => {

  const [successMessage, success, errorMessage, error, resetAll, verifyOtpLoading, loading, sendEmailVerificationMail,
    VerifyEmailMail, sendContactVerificationOtp, VerifyContactOtp] = CommonOtpVerificationPersonal();

  const { user } = useSelector((state) => {
    return {
      user: state.user
    }
  })
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [contact, setContact] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [contactError, setContactError] = useState(false)
  const [otpVerifySend, setotpVerifySend] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [showError, setShowError] = useState(false);
  const [basicDetailsVerified, setBasicDetailsVerified] = useState(false);
  const [pageloading, setLoading] = useState(false);
  const [symbolsArr] = useState(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const updateUser = async (e) => {
    setShowError(true);
    e.preventDefault();

    if (verifyState === "addContact") {
      const isContactValid = validContact();
      if (isContactValid) {
        setSendingOtp(true);
        await sendContactVerificationOtp({ contact: contact, country_code: countryCode });
      }
    } else {
      const isEmailValid = validEmailId();
      if (isEmailValid) {
        setSendingOtp(true);
        await sendEmailVerificationMail({ email: email, userID: user._id });
      }
    }
  }
  // useEffect(() => {
  //   if (user.user_email &&
  //     user.user_contact) {
  //     setBasicDetailsVerified(true)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user.user_email, user.user_contact])

  // console.log(accountContact, accountCountryCode, "line no 63");

  useEffect(() => {
    if (accountContact && accountCountryCode && verifyState === "addContact") {
      setContact(accountContact);
      setCountryCode(accountCountryCode);
    }
  }, [accountContact, accountCountryCode, verifyState])

  useEffect(() => {
    if (accountEmail && verifyState === "addEmail") {
      setEmail(accountEmail);
    }
  }, [accountEmail, verifyState])

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
  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value
    if (inputName === "email") {
      setEmail(inputValue)
      setEmailError(!ValidationFile.isEmail(inputValue))
    }
    setotpVerifySend(false)
    setShowError(false)
    resetAll()
  }

  useEffect(() => {
    if (success && sendingOtp) {
      resetAll()
      setSendingOtp(false);
      setotpVerifySend(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  const ClosePopUp = (item) => {
    resetAll();
    setSendingOtp(false);
    setotpVerifySend(false);
    setEmail("")
    setCountryCode("91")
    // setContact("");
    closeMainPopUp(item)
  }
  const changeNumberEmail = () => {
    setotpVerifySend(false);
    setSendOTP(false);
  }

  return (
    <React.Fragment>
      <Modals ref={testModals} Position="center" slide="top" ClosePopUp={() => ClosePopUp("closePopup")}>
        <ModalsHeader title={"OTP Verification"} />
        <ModalsBody>
          {
            otpVerifySend ? (
              <BasicDetailsOtpVerification contact={contact} country_code={countryCode} email={email} verifyState={verifyState} handleChangeValue={() => changeNumberEmail()} ClosePopUp={() => ClosePopUp()}
              />
            ) : sendOTP ?
              <BasicDetailsOtpVerification contact={contact} country_code={countryCode} email={email} verifyState={verifyState} handleChangeValue={() => changeNumberEmail()} ClosePopUp={() => ClosePopUp()}
              />
              :
              (

                <form onSubmit={updateUser}>
                  <div className="basicdetail_form">
                    {verifyState === "addContact" ? (
                      <>
                        {/* Contact SECTION  */}
                        <div className='popupemail-container'>
                          <div className="popup-left-sidebar">
                            <img src={VerifyImage} className="img-fluid" alt="" />
                          </div>
                          <div className="popup-right-sidebar">
                            <div className="pop-input-wrapper">
                              <h1 className="text-sm w-500 base">Verify Contact Number</h1>
                              <p className="text-xs w-400 base mt-8">Enter your contact number to verify</p>
                              <div className="formFieldwrap mt-25">
                                <div className="cstmPhoneInput">
                                  <PhoneInput
                                    autoComplete="off"
                                    autoCorrect="off"
                                    spellCheck="off"
                                    countryCodeEditable={true}
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
                              <button className='button button-primary btn-sm button-block white next_btn' type='submit'>{loading ? "Loading.." : "Send Otp"}</button>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* EMAIL SECTION  */}
                        <div className='popupemail-container'>
                          <div className="popup-left-sidebar">
                            <img src={VerifyImage} className="img-fluid" alt="" />
                          </div>
                          <div className="popup-right-sidebar otp-rightsidebar">
                            <div className="pop-input-wrapper">
                              <h1 className="text-sm w-500 base">Verify Email Address</h1>
                              <p className="text-xs w-300 base mt-15">Enter your Email address</p>
                              <div className="formFieldwrap mt-25">
                                <FormInput
                                  placeholder="Enter email address here" name="email" value={email} onKeyUp={handleInput} onChange={handleInput}
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
                              <button className='button button-primary btn-sm button-block white next_btn' type='submit'>{loading ? "Loading.." : "Send Otp"}</button>
                            </div>
                          </div>
                        </div>

                      </>
                    )}
                  </div>

                </form>
              )
          }
        </ModalsBody>
      </Modals>
    </React.Fragment >
  )
}
export default ContactEmailVerify