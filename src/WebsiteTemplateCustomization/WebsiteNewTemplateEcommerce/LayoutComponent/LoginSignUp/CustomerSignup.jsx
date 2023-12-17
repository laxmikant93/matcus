import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "./signup.scss";

import BannerImage from "../../../assets/TheTranquill/banner-hero.jpg";
import image from "../../assets/images/banner.jpg"
import './login.scss'
import FormInput from "../../../../Common/Form/FormInput"
import { getCustomerSignup, getSignupOtp, resetCustomerOtpVerification, resetCustomerSignUp } from '../../../../store/actions/ecommerce/action/auth';
import FormError from '../../../../Common/Form/FormError';
import ValidationFile from '../../../../Classes/ValidationFile';
import PhoneInput from 'react-phone-input-2';
import ReactGA from "react-ga";
import ValidationUtils from '../../../../Classes/ValidationUtils';
import CustomerSignupProcess from "./CustomerSignupProcess";


const CustomerSignup = () => {
  const [successMessage, success, errorMessage, error, ContactSignupWithOtpSent, EmailSignupWithOtpSent, resetAll] = CustomerSignupProcess()
  const { user } = useSelector((state) => {
    return {
      user: state.user
    }
  })
  const { successTemplate, websiteType } = useSelector((state) => {
    return {
      successTemplate: state.websiteTemplate.getTemplate.success,
      websiteType: state.websiteTemplate.getTemplate.websiteType
    }
  })
  const { businessData, businessSuccess, Ecomdata } = useSelector((state) => {
    return {
      businessData: state.businessInfo.ecomWebsite.data,
      businessSuccess: state.businessInfo.ecomWebsite.success,
      Ecomdata: state.serviceTemplate.getTemplate.data
    }
  });
  // const { instituteData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const history = useNavigate();
  const [type, setType] = useState("")
  const [symbolsArr] = useState([" "]);
  const [email, setEmail] = useState("");
  const [country_code, setCountry_Code] = useState("91");
  const [contact, setContact] = useState("");
  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //Error
  const [isError, setIsError] = useState(false)
  const [valueIsValid, setValueIsValid] = useState(false);
  const [emailError, setEmailError] = useState(false)
  const [samePasswordValid, setSamePasswordValid] = useState(false);

  const [passwordShown, setPasswordShown] = useState(false);
  const [enteredValue, setEnteredValue] = useState("");
  const [loading, setLoading] = useState(false)

  const onChangeValue = async (e) => {
    let value = e.target.value

    if (/^(\(?\+?[0-9]*\)?)?[0-9(\)]*$/.test(value)) {
      await setType("contact")
      await setContact(value)
      ReactGA.event({
        category: "SignUp",
        action: "input",
        label: "phone",
      })
    } else {
      await setType("email")
      await setEmail(value)
      ReactGA.event({
        category: "SignUp",
        action: "input",
        label: "email",
      })
    }
  }

  const handleInputContact = (value, formattedValue) => {
    const dialCode = formattedValue.dialCode;
    let mobile = value.replace(dialCode, "");
    let inputValue = mobile;
    if (inputValue === "") {
      setContact(inputValue)
      setType("")
    } else {
      setCountry_Code(dialCode)
      setContact(inputValue)
      setIsError(false)
      resetAll()
    }
  }

  const onChangeEmail = (e) => {
    let value = e.target.value;

    if (value === "") {
      setEmail(value)
      setType("")
    } else {
      setEmail(value)
      if (ValidationUtils.isEmail(value)) {
        setValueIsValid(true)
        setEmailError(false)
      } else {
        setValueIsValid(false)
        setEmailError(true)
      }
      setIsError(false)
      resetAll()
    }
  }
  const handleChangeFullName = (e) => {
    ReactGA.event({
      category: "SignUp",
      action: "input",
      label: "fullName",
    })
    let value = e.target.value;
    setFullName(value.length > 1 ? (value[value.length - 2] === " " && value[value.length - 1] === " " ? fullName : value) : value.trim());
    setIsError(false)
    resetAll()
  }
  const handleChangePassword = (e) => {
    ReactGA.event({
      category: "SignUp",
      action: "input",
      label: "password",
    })
    let value = e.target.value;
    setPassword(value)
    setIsError(false)
    resetAll()
  }
  const handleChangeConfirmPassword = (e) => {
    ReactGA.event({
      category: "SignUp",
      action: "input",
      label: "confirm-password",
    })
    let value = e.target.value;
    setConfirmPassword(value);
    setIsError(false)
    resetAll()
  }
  const handlePassword = (e) => {
    if (e.target.checked) {
      setPasswordShown(true);
    } else {
      setPasswordShown(false);
    }
  }

  const passwordSameCheck = () => {
    if (confirmPassword === password) {
      setSamePasswordValid(true)
      return true
    } else {
      setSamePasswordValid(false)
      return false
    }
  }

  useEffect(() => {
    setLoading(false)
    if (type === "contact") {
      if (successMessage === "Otp Sent Successfully" && success) {
        history(`/customer-signup-otp-verify/contact/${country_code}-${contact}`, {
          fullname: fullName,
          password: password,
        })
      }
    } else if (type === "email") {
      history(`/customer-signup-otp-verify/email/${email}`, {
        fullname: fullName,
        password: password,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successMessage])

  useEffect(() => {
    if (error || errorMessage === "email is taken") {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successMessage, errorMessage])

  const checkValidationContact = (formattedValue, value) => {
    if (formattedValue !== "91") {
      if (value !== "") {
        // setInvalidContactLength(true)
        setValueIsValid(true)
        return true;
      } else {
        setValueIsValid(false)
        // setInvalidContactLength(false)
        return false;
      }
    } else {
      if (value.length === 10) {
        setValueIsValid(true)
        return true;

      } else {
        setValueIsValid(false)
        return false;
      }
    }
  };
  const isFormValid = () => {
    let result = false
    if (type === "contact") {
      if (checkValidationContact(country_code, contact) && !ValidationUtils.isEmpty(password) && password.length > 3 && !ValidationUtils.isEmpty(confirmPassword)) {
        result = true
      } else {
        result = false
      }
    }
    if (type === "email") {
      if (!ValidationUtils.isEmail(email)) {
        setEmailError(true)
      }
      if (ValidationUtils.isEmail(email) && !ValidationUtils.isEmpty(password) && password.length > 3 && !ValidationUtils.isEmpty(confirmPassword)) {
        result = true
      } else {
        result = false
      }
    }
    return result
  }
  // , user.user_business_business_subdomain
  const onSubmit = async (e) => {
    ReactGA.event({
      category: "SignUp",
      action: "click",
      label: "Submit",
    })
    resetAll()
    e.preventDefault();
    // setSumited(true)
    if (isFormValid()) {
      if (passwordSameCheck()) {
        if (fullName) {
          setLoading(true)
          if (type === "contact") {
            await ContactSignupWithOtpSent(successTemplate && websiteType === "Ecommerce" ? "e" : "s", contact, country_code, fullName, password)
          } else {
            await EmailSignupWithOtpSent(successTemplate && websiteType === "Ecommerce" ? "e" : "s", email, fullName, password)
          }
          setIsError(false)
        } else {
          setIsError(true)
        }
      } else {
        setIsError(true)
      }
    } else {
      setIsError(true)
    }
  }
  useEffect(() => {
    setContact("")
    setPassword("")
    setConfirmPassword("")
    setFullName("")
    setEmail("")
  }, [])
  return (
    <>
      <div className="signup-wrapper pb-45 ">
        <div className='signup-container'>
          <div className="signup_wrap">
            <div className="banner">
              {
                websiteType === "Services" ?
                  <React.Fragment>
                    {Ecomdata.instituteData && Ecomdata.instituteData && Ecomdata.instituteData.banners ? (
                      Ecomdata.instituteData.banners.length ?
                        <img src={Ecomdata.instituteData.banners[0].business_featured_banner ? Ecomdata.instituteData.banners[0].business_featured_banner : BannerImage} className="img-fluid" alt="" />

                        : <React.Fragment>
                          <img src={BannerImage} className="img-fluid" alt="" />
                        </React.Fragment>) : <img src={BannerImage} className="img-fluid" alt="" />}
                  </React.Fragment>
                  : businessSuccess && businessData && businessData.banners ? (
                    businessData.banners.length ?
                      <img src={businessData.banners[0].business_featured_banner ? businessData.banners[0].business_featured_banner : image} className="img-fluid" alt="" />

                      : <React.Fragment>
                        <img src={image} className="img-fluid" alt="" />
                      </React.Fragment>) : <img src={image} className="img-fluid" alt="" />

              }

            </div>
            <div className='signup-otp-wrap'>
              <h2>Sign up</h2>
              <>
                {
                  type === "" && (
                    <div className="formFieldwrap formpaddingbottom mt-8">
                      <FormInput label="Enter phone number or e-mail" placeholder="Enter phone number or e-mail."
                        onChange={(e) => onChangeValue(e)}
                        value={enteredValue} onWheel={(e) => e.target.blur()} onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                      />
                      <FormError
                        show={enteredValue === "" && isError}
                        error="Please enter email or phone number." />
                    </div>
                  )
                }

                {
                  type === "contact" && (
                    <div className="formFieldwrap formpaddingbottom">
                      <div className='cstmPhoneInput'>
                        <PhoneInput
                          placeholder="Mobile Number."
                          label=" Mobile Number"
                          autoComplete="off"
                          autoCorrect="off"
                          spellCheck="off"
                          containerClass="form-group"
                          inputClass="form-control"
                          specialLabel="hii"
                          country={"in"}
                          value={`${country_code}${contact}`}
                          inputProps={{
                            name: "phone",
                            required: true,
                            autoFocus: true,
                          }}
                          // disabled={contactAlreadyExist ? true : false}
                          enableSearch
                          disableSearchIcon
                          onChange={(value, formattedValue) => {
                            handleInputContact(value, formattedValue);
                          }}
                          onKeyUp={(value, formattedValue) => {
                            handleInputContact(value, formattedValue);
                          }}
                        />
                      </div>
                      <FormError
                        show={contact === "" && valueIsValid === false && isError}
                        error="Contact required." />
                      <FormError
                        show={contact && valueIsValid === false && isError}
                        error="Invalid contact number." />
                      <FormError
                        show={error && errorMessage === "email is taken"}
                        error="Contact is taken.Please recheck and enter again" />
                    </div>
                  )}
                {
                  type === "email" && (
                    <div className="formFieldwrap formpaddingbottom mt-8">
                      <FormInput
                        label="Enter e-mail"
                        placeholder="Enter e-mail"
                        autoFocus={true}
                        autoComplete="off"
                        value={email}
                        onWheel={(e) => e.target.blur()}
                        onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                        onChange={(e) => onChangeEmail(e)}
                      />
                      <FormError
                        show={email === "" && valueIsValid === false && isError}
                        error="Email is required." />
                      <FormError
                        show={email && emailError && isError}
                        error="Invalid Email." />
                      <FormError
                        show={error && errorMessage === "email is taken"}
                        error="Email taken. Please recheck and enter again." />
                    </div>
                  )}
                <div className="formFieldwrap formpaddingbottom">
                  <FormInput
                    name="fullName"
                    type="text"
                    label="Fullame"
                    placeholder="Full name"
                    value={fullName}
                    readOnly
                    onFocus={(e) => e.target.removeAttribute('readOnly')}
                    autoComplete="off"
                    onChange={(e) => handleChangeFullName(e)}
                    onKeyUp={(e) => handleChangeFullName(e)}
                  />
                  <FormError
                    show={fullName === "" && isError}
                    error="Full Name required." />
                </div>
                <div className="formFieldwrap formpaddingbottom">
                  <FormInput
                    name="password"
                    label="Password"
                    placeholder="Password"
                    type={passwordShown ? "text" : "password"}
                    onKeyUp={(e) => handleChangePassword(e)}
                    onChange={(e) => handleChangePassword(e)}
                    readOnly
                    onFocus={(e) => e.target.removeAttribute('readOnly')}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="off"
                    value={password}
                    onWheel={(e) => e.target.blur()}
                    onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                  />
                  <FormError
                    show={password === "" && isError}
                    error="Password required." />
                  <FormError
                    show={password && password.length < 4 && isError}
                    error="Min. 4 characters should be there."
                  />
                </div>
                <div className="formFieldwrap formpaddingbottom">
                  <FormInput
                    name="confirm_password"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    type={passwordShown ? "text" : "password"}
                    onKeyUp={(e) => handleChangeConfirmPassword(e)}
                    onChange={(e) => handleChangeConfirmPassword(e)}
                    autoComplete="off"
                    readOnly
                    onFocus={(e) => e.target.removeAttribute('readOnly')}
                    autoCorrect="off"
                    spellCheck="off"
                    value={confirmPassword}
                    onWheel={(e) => e.target.blur()}
                    onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                  />
                  <FormError
                    show={confirmPassword === "" && isError}
                    error="Confirm Password required." />
                  <FormError
                    show={confirmPassword && password && !samePasswordValid && isError}
                    error="Confirm Password should be same as Password."
                  />
                </div>
                <div className='check_sec'>
                  <div className=''>
                    <label
                      className=""
                    >
                      <input
                        type="checkbox"
                        onChange={handlePassword}
                        checked={passwordShown === true}
                      />&nbsp;&nbsp;<span className='check-text'>Show password</span>
                    </label>
                  </div>
                </div>

              </>
            </div>
            {
              loading ?
                <div className='signup-btn-wrap mt-15'>    <button className="buttonTrue btnTrue-primary btn-block">Creating...</button></div>
                // btn active state  'buttonTrue' 'btnTrue-primary' 'btn-block'
                // disable state 'buttonTrue' 'btn-disable' 'btn-block'
                :
                <div className='signup-btn-wrap mt-15'>  <button className="buttonTrue btnTrue-primary btn-block" type='submit' onClick={(e) => onSubmit(e)}>CREATE ACCOUNT</button></div>
            }
            <div className='login-login-links signup-btn-wrap'>
              <Link to={'/customer-login'} className='login-p'>Already have an account ?</Link>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerSignup