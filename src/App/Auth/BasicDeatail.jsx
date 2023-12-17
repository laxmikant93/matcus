/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import PhoneInput from 'react-phone-input-2'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ValidationFile from '../../Classes/ValidationFile'
import FormError from '../../Common/Form/FormError'
import FormInput from '../../Common/Form/FormInput'
import { changeUserInfo } from '../../store/actions/user'
import AuthTimeLineLayout from "./AuthTimeLineLayout"
import BasicDetailsOtpVerification from './BasicDetailsOtpVerification'
// import AppLink from "../../../Common/AppLink";
import CommonOtpVerificationPersonal from "../Auth/AuthV1/CommonOtpVerificationPersonal";
const BasicDeatail = () => {
  const history = useNavigate();
  const [basicDetailsVerified, setBasicDetailsVerified] = useState(false)
  const { user } = useSelector((state) => {
    return {
      user: state.user
    }
  })
  useEffect(() => {
    if (user.user_email &&
      user.user_contact) {
      setBasicDetailsVerified(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.user_email, user.user_contact])
  const [symbolsArr] = useState([" "]);
  // const [fullname, setFullname] = useState("")
  // const history = useNavigate()
  // const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [countryCode, setCountryCode] = useState("91")
  const [contact, setContact] = useState("")
  const [emailError, setEmailError] = useState(false);
  const [contactError, setContactError] = useState(false)
  // const [contactAlreadyExit, setContactAlreadyExit] = useState(false)
  // const [emailAlreadyExit, setemailAlreadyExit] = useState(false)
  const [showError, setShowError] = useState(false);
  const [successMessage, success, errorMessage, error, resetAll, verifyOtpLoading, loading, sendEmailVerificationMail, VerifyEmailMail, sendContactVerificationOtp, VerifyContactOtp] = CommonOtpVerificationPersonal();

  useEffect(() => {
    if (user) {
      // setFullname(user.user_fullname)
      setEmail(user.user_email ? user.user_email : "")
      setCountryCode(user.user_country_code ? user.user_country_code : "91")
      setContact(user.user_contact ? user.user_contact : "")
    }
  }, [user])
  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    if (inputName === "email") {
      setEmail(inputValue)
      setEmailError(!ValidationFile.isEmail(inputValue))
    }
    setotpVerifySend(false)
    setShowError(false)
    resetAll()
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

  const [otpVerifySend, setotpVerifySend] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  useEffect(() => {
    if (success && sendingOtp) {
      resetAll()
      setSendingOtp(false);
      setotpVerifySend(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])

  const updateUser = async (e) => {
    setShowError(true);
    e.preventDefault();
    const isEmailValid = validEmailId();
    const isContactValid = validContact();
    if (isEmailValid && isContactValid) {
      setSendingOtp(true);
      if (user.user_email_verify) {
        await sendContactVerificationOtp({ contact: contact, country_code: countryCode });
      } else {
        await sendEmailVerificationMail({ email: email, userID: user._id });
      }
    }
  }
  const DetailsVerified = () => {
    history(`/institutedetailsV1`)
  }
  return (
    <AuthTimeLineLayout>
      <div className="form-wrapper">
        <div className='mb-20'>
          <h1>Hi, <span className='w-400 primary'>{user.user_fullname}</span></h1>
        </div>
        <form onSubmit={updateUser}>
          <div className="basicdetail_form">
            {user.user_email_verify ? (
              <>
                <div className="formFieldwrap">
                  <FormInput label="Enter e-mail"
                    placeholder="Email" name="email" value={email} onKeyUp={handleInput} onChange={handleInput} disabled={user.user_email_verify} />
                </div>
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
                    show={errorMessage === "email is taken" && showError && error}
                    error="contact already exist."
                  />
                </div>
              </>
            ) : (
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
                </div>
                <div className="formFieldwrap">
                  <FormInput label="Enter e-mail"
                    placeholder="Email" name="email" value={email} onKeyUp={handleInput} onChange={handleInput}
                    onWheel={(e) => e.target.blur()} onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()} disabled={user.user_email_verify} />
                  <FormError
                    show={email === "" && emailError && showError}
                    error="email is required."
                  />
                  <FormError
                    show={email !== "" && emailError && showError}
                    error="email is invalid."
                  />
                  <FormError
                    show={errorMessage === "email is taken" && showError && error}
                    error="email already exist."
                  />
                </div>
              </>
            )}
          </div>
          {
            basicDetailsVerified ? (
              <React.Fragment>
                <p className="text-xxs secondary mt-3">
                  Your details are verified, you may continue.
                </p>
                <button className='button button-primary btn-sm white next_btn' type='button' onClick={() => DetailsVerified()}>Continue</button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {
                  otpVerifySend ? (
                    <BasicDetailsOtpVerification contact={contact} country_code={countryCode} email={email} />
                  ) : (
                    <button className='button button-primary btn-sm white next_btn' type='submit'>{loading ? "Loading.." : "Send Otp"}</button>
                  )
                }
              </React.Fragment>
            )
          }

        </form>
      </div>
    </AuthTimeLineLayout>
  )
}

export default BasicDeatail