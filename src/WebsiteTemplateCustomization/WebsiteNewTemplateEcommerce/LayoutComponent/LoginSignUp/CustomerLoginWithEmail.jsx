import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import image from "../../assets/images/banner.jpg"
import "./login.scss"
import FormInput from '../../../../Common/Form/FormInput';
import ValidationFile from '../../../../Classes/ValidationFile';
import { useDispatch, useSelector } from 'react-redux';
import FormError from '../../../../Common/Form/FormError';
import PhoneInput from 'react-phone-input-2';
import AppLink from '../../../../Common/AppLink';

import BannerImage from "../../../assets/TheTranquill/banner-hero.jpg";
import CustomerSendOtp from './CustomerSendOTP';
import UserRequest from '../../../../store/actions/user/UserRequest';
import AppLinkUrl from '../../../../Common/AppLink/AppLinkUrl';
import Auth from '../../../../Classes/Auth';
import { redirectToUrl } from '../../../../Constant/auth';
import GoogleLoginSingup from '../../../../App/Auth/Login/GoogleLoginSingup';
import GoogleLogin from '../../CommonComponent/CommonJsx/GoogleLogin/GoogleLogin';
import SocialMediaLogin from '../../CommonComponent/CommonJsx/SocialMediaLogin/SocialMediaLogin';
import { setLoginToStore } from '../../../../store/actions/user';
import { setSubdomainLoginToStore } from '../../../../store/actions/subdomainuser';
import { LOGIN_CUSTOMER_SUCCESS } from '../../../../store/actions/ecommerce/type/auth';

const CustomerLoginWithEmail = () => {

  const [enteredValue, setEnteredValue] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [country_code, set_country_code] = useState("91")
  const [loginUsing, setLoginUsing] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [privateDomainLogin, setPrivateDomainLogin] = useState(false);
  const [success, setSuccess] = useState("");

  //error states 
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [serverErrorLogin, setserverErrorLogin] = useState("");
  const [showLoginError, setShowLoginError] = useState(false);
  const [usernameError, setUserNameError] = useState(false)

  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const [symbolsArr] = useState([" "]);
  const { successTemplate, isOld, websiteType } = useSelector((state) => {
    return {
      successTemplate: state.websiteTemplate.getTemplate.success,
      isOld: state.websiteTemplate.getTemplate.isOld,
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

  const [isLoading,
    isError,
    errorMessage,
    isSuccess,
    sendOtp,
    mobileloginpassword,
    resetOtpState,
    handleLoggedInProcess,
    isPasswordLoinSuccesss] = CustomerSendOtp();

  const { InstituteDetails } = useSelector((state) => {
    return {
      InstituteDetails: state.institutewebsite.data,
    };
  });

  useEffect(() => {
    if (AppLinkUrl.privateDomain()) {
      setPrivateDomainLogin(true);
    }
  }, []);

  const onChangeValue = async (e) => {
    let value = e.target.value;
    if (e.target.value) {
      setEnteredValue(value)
      if (/^(\(?\+?[0-9]*\)?)?[0-9(\)]*$/.test(value)) {
        await setType("contact")
        await setContact(value)
      } else if (ValidationFile.isEmail(value)) {
        await setType("email")
        await setEmail(value)
      } else {
        await setType("username")
        await setUserName(value)
      }
    }
    // setPassword("");
  }

  const handleChange = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value
    if (inputName === "email" || inputName === "username") {
      if (!inputValue) {
        setType("")
        setEnteredValue("")
      }
    }
    if ((inputValue.includes("@") || inputValue.includes(".")) && inputName === "username") {
      setType("email")
      setEmail(inputValue)
    }
    if (!inputValue.includes("@") && inputName === "email") {
      setType("username")
      setUserName(inputValue)
    }
    setServerError(false);
    setShowLoginError(false);
    switch (inputName) {
      case "email":
        setEmail(inputValue);
        setEmailError(!ValidationFile.isEmail(inputValue));
        break;
      case "username":
        setUserName(inputValue);
        setUserNameError(ValidationFile.isEmail(inputValue) || ValidationFile.isEmpty(inputValue));
        break;
      case "password":
        setPassword(inputValue);
        setPasswordError(ValidationFile.isEmpty(inputValue));
        break;
      default:
        return false;
    }
    resetOtpState();
    // setPassword("");
  }

  const handleInputContact = (value, formattedValue) => {
    const dialCode = formattedValue.dialCode;
    let mobile = value.replace(dialCode, "");
    let inputValue = mobile;
    resetOtpState()
    if (inputValue === "") {
      set_country_code(dialCode);
      setContact(inputValue);
      setContactError(false);
      setType("")
      setEnteredValue("")
    } else {
      set_country_code(dialCode);
      setContact(inputValue);
      setContactError(ValidationFile.isEmpty(inputValue));
    }
    resetOtpState();
  }

  const showHidePassword = (e) => {
    if (e.target.checked) {
      setShowPassword(true)
    } else {
      setShowPassword(false)
    }
  }

  const ServerLoginErrorSwitch = (message) => {
    switch (message) {
      case "Incorrect Password":
        setserverErrorLogin("Incorrect Password.");
        break;
      case "Invalid Login":
        setserverErrorLogin("Invalid Login.");
        break;
      default:
        setserverErrorLogin(message);
    }
  };

  const handleLogInProcess = (success) => {
    setSuccess(success);
    if (success.data) {
      ServerLoginErrorSwitch(success.data);
      setServerError(true);
      setFormSubmit(false)
    }
    if (success.data === "Invalid Login!") {
      ServerLoginErrorSwitch("Invalid Login!");
      setServerError(true);
      setFormSubmit(false)
    }
    if (success.data.data.hasOwnProperty("_id")) {
      if (AppLinkUrl.subdomain()) {
        Auth.setUserLogin(success.data, true); // Set Cookies of user login
        dispatch(setSubdomainLoginToStore(Auth.subdomainUser())); // Set Userdata to redux store
      } else {
        Auth.setUserLogin(success.data, false); // Set Cookies of user login
        dispatch(setLoginToStore(Auth.user())); // Set Userdata to redux store
      }

      // localStorage.setItem(`E_CUSTOMER_${window.location.href.split("//")[1].split(".")[0]}`, JSON.stringify(success.data));
      dispatch({ type: LOGIN_CUSTOMER_SUCCESS, payload: success.data });
      if (location.pathname !== "/") {
        if (Storage.alive(redirectToUrl)) {
          let redirectUrl = "/";
          if (AppLinkUrl.subdomain()) {
            redirectUrl = AppLinkUrl.createSubdomain(
              AppLinkUrl.subdomain(),
              Storage.getString(redirectToUrl)
            );
          } else {
            redirectUrl = AppLinkUrl.mainBaseUrl(
              Storage.getString(redirectToUrl)
            );
          }
          Storage.remove(redirectToUrl);
          window.location.href = redirectUrl;
        }
        // else {
        //   window.location.reload();
        // }
      } else {
        window.location.href = "/";
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowLoginError(true)
    if (type === "email") {
      if (!ValidationFile.isEmail(email)) {
        setEmailError(true)
      }
    }
    else if (type === "contact") {
      if (contact.length < 8) {
        setContactError(true)
      }
      if (loginUsing === "password") {
        if (ValidationFile.isEmpty(contact)) {
          setContactError(true)
        }
        if (ValidationFile.isEmpty(password)) {
          setPasswordError(true)
        }
      } else {
        if (ValidationFile.isEmpty(contact)) {
          setPasswordError(true)
        }
      }
    } else {
      if (ValidationFile.isEmpty(email)) {
        setEmailError(true)
      }
    }
    if (ValidationFile.isEmpty(password)) {
      setPasswordError(true)
    }
    if (type === "email") {
      if (ValidationFile.isEmail(email) && !ValidationFile.isEmpty(password)) {
        e.preventDefault();
        setFormSubmit(true)
        if (privateDomainLogin) {
          setFormSubmit(true)
          UserRequest.PrivateDomainlogin(
            email.toLowerCase(),
            AppLinkUrl.getDomainName(),
            password,
            "email",
            websiteType,
            handleLogInProcess,
            (error) => {
              setFormSubmit(false)
            }
          );
        }
        else {
          setFormSubmit(true)
          UserRequest.login(
            email.toLowerCase(),
            password,
            "email",
            websiteType,
            handleLogInProcess,
            (error) => {
              setFormSubmit(false)
            }
          );
        }
      }
    }
    else if (type === "username") {
      if (!ValidationFile.isEmpty(userName) && !ValidationFile.isEmpty(password)) {
        e.preventDefault();
        setFormSubmit(true);
        if (privateDomainLogin) {
          setFormSubmit(true)
          UserRequest.PrivateDomainlogin(
            userName,
            AppLinkUrl.getDomainName(),
            password,
            "email",
            websiteType,
            handleLogInProcess,
            (error) => {
              setFormSubmit(false)
            }
          );
        }
        else {
          setFormSubmit(true)
          UserRequest.login(
            userName,
            password,
            "username",
            websiteType,
            handleLogInProcess,
            (error) => {
              setFormSubmit(false)
            }
          );
        }
      }
    } else if (type === "contact") {
      if (loginUsing === "password") {
        let action = "contactpasswordlogin";
        if (!ValidationFile.isEmpty(contact) && contact.length > 7 && !ValidationFile.isEmpty(password)) {
          mobileloginpassword(country_code, contact, action, privateDomainLogin, password,
            successTemplate && websiteType === "Ecommerce" ? "e" : "s");
        }
      } else {
        if (!ValidationFile.isEmpty(contact) && contact.length > 7) {
          let action = "checkexist"
          sendOtp(successTemplate && websiteType === "Ecommerce" ? "e" : "s", country_code, contact, action, privateDomainLogin, InstituteDetails);
        }
      }
    }
    else {
      if (!ValidationFile.isEmpty(email) && !ValidationFile.isEmail(email) && !ValidationFile.isEmpty(password)) {
      }
    }

  }

  useEffect(() => {
    if (success.status === 200 && success.data !== "Incorrect Password" && success.data !== "Invalid Email" &&
      success.data !== "Invalid Contact" && success.data !== "Invalid Login!" && success.data !== "Invalid Username") {
      history("/");
    }
  }, [history, success])

  useEffect(() => {
    if (isPasswordLoinSuccesss) {
      history("/");
    }
  }, [history, isPasswordLoinSuccesss])

  useEffect(() => {
    if (loginUsing === "otp" && type === "contact" && isSuccess) {
      history(`/customer-login-with-otpv1/${country_code}-${contact}`)
    }
  }, [contact, country_code, history, isSuccess, loginUsing, type])

  // useEffect(() => {
  //   if (success && data.data !== "Incorrect Password" && data.data !== "Invalid Email" && data.data !== "Invalid Contact") {
  //     history("/")
  //   }
  // }, [data.data, history, success])

  return (
    <React.Fragment>
      {/* {
        successTemplate && websiteType === "Ecommerce" ? <Header /> : ""
      } */}
      <div className='loginsignup-wrapper pb-45 '>
        <div className="login_wrap">
          <div className="banner">
            {
              websiteType === "Services" ?
                <React.Fragment>
                  {Ecomdata && Ecomdata.instituteData && Ecomdata.instituteData.banners ? (
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
          <div className="login-content">

            <>
              <h2 className="font">
                <button>Login</button>
              </h2>
              <div>
                <form
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="off"
                >
                  {type === "" &&
                    <div className="formFieldwrap ">

                      <FormInput
                        className={`primary ${isError && formSubmit
                          ? "errorInput"
                          : ""
                          }`
                        }
                        autoFocus={true}
                        onKeyUp={(e) => onChangeValue(e)}
                        onPaste={(e) => onChangeValue(e)}
                        label="Enter phoneNumber or e-mail or UserName" placeholder="Enter phone number or e-mail or Username"
                        onChange={(e) => onChangeValue(e)}
                        value={enteredValue} onWheel={(e) => e.target.blur()} onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                      />
                    </div>
                  }
                  {(type === "email" || type === "username" || type === "contact") &&
                    <div className="formFieldwrap ">
                      {
                        type === "email" &&
                        <div className="formFieldwrap">
                          <FormInput label={"Enter e-mail"} placeholder={"Enter e-mail"} name={"email"}
                            value={email}
                            onChange={handleChange}
                            onKeyUp={handleChange}
                            className={(emailError && !email && showLoginError) || (emailError && email !== "" && showLoginError) ? "errorInput" : ""}
                            autoFocus={true} onWheel={(e) => e.target.blur()} onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                          />

                          <FormError show={emailError && !email && showLoginError} error={`${type === "email" ? "Email" : "Username"} required.`} />
                          <FormError show={emailError && email !== "" && showLoginError} error={`${type === "email" ? "Email" : "Username"} is invalid.`} />

                        </div>
                      }
                      {
                        type === "username" &&
                        <div className="formFieldwrap">
                          <FormInput
                            label={"Enter Username"}
                            placeholder={"Enter Username"}
                            name={"username"}
                            value={userName}
                            onChange={handleChange}
                            onKeyUp={handleChange}
                            autoFocus={true} onWheel={(e) => e.target.blur()} onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()} />
                        </div>
                      }

                      {type === "contact" && (
                        <div className="formFieldwrap">
                          <div className="cstmPhoneInput">
                            <PhoneInput
                              autoComplete="off"
                              autoCorrect="off"
                              spellCheck="off"
                              countryCodeEditable={false}
                              // className={
                              //   !valueIsValid && isError
                              //     ?
                              //     "errorInput"
                              //     : ""
                              // }
                              containerClass="form-group"
                              inputClass="form-control"
                              specialLabel="hii"
                              country={"in"}
                              value={`${country_code}${contact} `}

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
                            <label className="animLabel" htmlFor="mobile_number">
                              Mobile Number
                            </label>

                          </div>
                          <FormError show={contactError && !contact && showLoginError} error="Contact is required." />
                          <FormError show={contactError && contact !== ""} error="Contact is invalid." />
                          <FormError show={(errorMessage === "Invalid number. Please recheck and enter again." || errorMessage === "Invalid Login!" || errorMessage === "Invalid Contact") && showLoginError} error={errorMessage} />
                        </div>
                      )}
                    </div>}
                  {
                    type === "contact" &&
                    <div className="formFieldwrap ">

                      <div className='radio_text mt-15 mb-20 radio-btn-div'>
                        <label className="small">
                          <input
                            type="radio"
                            name="radio"
                            checked={loginUsing === "password"}
                            onChange={() => setLoginUsing("password")}
                          />&nbsp;&nbsp;
                          Password
                        </label>
                        <label className="small">
                          <input
                            type="radio"
                            name="radio"
                            checked={loginUsing === "otp"}
                            onChange={() => setLoginUsing("otp")}
                          />&nbsp;&nbsp;
                          OTP
                        </label>
                      </div>
                    </div>
                  }
                  {
                    type === "email" || (type === "contact" && loginUsing === "password") || type === "username" ?
                      <React.Fragment>
                        <div className="formFieldwrap mt-20">
                          <FormInput label="Password"
                            className={`mb-0 ${type === "email" ? (passwordError && !password && showLoginError) || (serverError && showLoginError) ? "errorInput" : ""
                              : (passwordError && !password && showLoginError) || (passwordError && password !== "") || (isError && password !== "") ? "errorInput" : ""
                              }`}
                            placeholder="Password" name="password"
                            value={password}
                            onChange={handleChange} onKeyUp={handleChange}
                            type={showPassword ? "text" : "password"}
                            onWheel={(e) => e.target.blur()}
                            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                          />
                          {
                            type === "email" || type === "username" ?
                              <React.Fragment>
                                <FormError
                                  show={passwordError && !password && showLoginError}
                                  error="Password required" />
                                <FormError
                                  show={serverError && showLoginError}
                                  error={serverErrorLogin}
                                /></React.Fragment> :
                              <React.Fragment>
                                <FormError show={passwordError && !password && showLoginError} error="Password is required." />
                                <FormError show={passwordError && password !== ""} error="Password is invalid." />
                                <FormError show={errorMessage === "Incorrect Password"} error={errorMessage} />
                              </React.Fragment>
                          }
                        </div>
                        <div className='check_sec mb-20'>
                          <div className='mt-5'>
                            <label
                              className=""
                            >
                              <input
                                type="checkbox"
                                onChange={showHidePassword}
                                checked={showPassword === true}
                              />&nbsp;&nbsp;<span className='check-text'>Show password</span>
                            </label>
                          </div>
                          {/* <div className='mt-5'>
                            <small><AppLink to="/auth/forgot-password">Forgot Password?</AppLink></small>
                          </div> */}
                        </div>
                      </React.Fragment> : ""
                  }
                </form>

              </div>
              <div>
                {
                  type === "email" ?
                    <button
                      className={`buttonTrue btnTrue-primary btn-block btn-sm ${!emailError && password ? "button-primary" : "btn-disable"}`}
                      onClick={handleSubmit}
                      type={formSubmit ? 'button' : 'submit'}>
                      {formSubmit ?
                        <React.Fragment>
                          Logging In...
                          {/* <div className='loader loader25'></div> */}
                        </React.Fragment>
                        : "Continue"}</button>
                    : type === "username" ?
                      <button
                        className={`buttonTrue btnTrue-primary Login-btn btn-block btn-sm ${userName && password ? "button-primary" : "btn-disable"}`}
                        onClick={handleSubmit}
                        type={formSubmit ? 'button' : 'submit'}>
                        {formSubmit ?
                          <React.Fragment>
                            Logging In...
                            {/* <div className='loader loader25'></div> */}
                          </React.Fragment>
                          : "Continue"}</button>
                      // btn active state  'buttonTrue' 'btnTrue-primary' 'btn-block'
                      // disable state 'buttonTrue' 'btn-disable' 'btn-block'
                      : type === "contact" ?
                        <React.Fragment>
                          {isLoading ?
                            <button
                              className={`${loginUsing === "password" ?
                                contact && password ?
                                  "buttonTrue btnTrue-primary btn-sm btn-block white Login-btn" :
                                  "buttonTrue btn-block btn-sm Login-btn btn-disable"
                                : "buttonTrue btnTrue-primary btn-block btn-sm white Login-btn"}`}

                              onClick={handleSubmit}
                              type='button'>
                              {loginUsing === "password" ? "Loading..." : "Sending..."}
                              {/* <div className='loader loader25'></div> */}
                            </button> :
                            <button
                              className={`${loginUsing === "password" ?
                                contact && password ?
                                  " buttonTrue btnTrue-primary button-primary btn-sm  btn-block white Login-btn" :
                                  "buttonTrue btn-block btn-sm Login-btn btn-disable"
                                : " buttonTrue btnTrue-primary button-primary btn-block btn-sm white Login-btn"}`}
                              onClick={handleSubmit}
                              type='submit'>
                              {loginUsing === "password" ? "Continue" : "Send OTP"}
                            </button>
                          }
                        </React.Fragment>
                        : ""
                }
                <p className='mt-15'>By continuing, I agree to the  <Link to="#" className="secondaryLink">Terms of Use</Link> & <Link to="#" className="secondaryLink">Privacy Policy</Link></p>
              </div>

            </>

            <div className='social-media-wrapper'>
              <Link to="/customer-signup">Create Account</Link>
              {/* <div className='social-login-text'>or sign up with</div> */}
            </div>
            {/* <div className='social-login'>
              {/* <button className='google-loginBtn'>

                </button> */}
            {/* <GoogleLogin /> 
            <SocialMediaLogin />
          </div> */}

          </div>
        </div>
      </div>
    </React.Fragment >
  )
}
export default CustomerLoginWithEmail;