import React, { useEffect, useState } from 'react'
import AuthLayout from '../AuthLayout'
import FormInput from '../../../Common/Form/FormInput';
// import iconGoogle from "../../../assets/Icons/icon-google.svg";
import AppLink from "../../../Common/AppLink";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import ValidationFile from '../../../Classes/ValidationFile';
import FormError from '../../../Common/Form/FormError';
import AppLinkUrl from '../../../Common/AppLink/AppLinkUrl';
import UserRequest from '../../../store/actions/user/UserRequest';
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../../../Classes/Auth';
import { setLoginToStore } from '../../../store/actions/user';
import { redirectToUrl } from '../../../Constant/auth';
import Storage from '../../../Classes/Storage';
import useSendOtp from '../Hooks/useSendOtp';
import PhoneInput from 'react-phone-input-2';
import GoogleLoginSingup from '../Login/GoogleLoginSingup';
import ReactGA from "react-ga";
import Signup from './Signup';
import { isWebView } from '../../../CommonFunctions';

const LoginWithEmail = (props) => {
  const [type, setType] = useState("")
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [usernameError, setUserNameError] = useState(false)
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const history = useNavigate()
  const [valueIsValid, setValueIsValid] = useState(false);
  const [privateDomainLogin, setPrivateDomainLogin] = useState(false);
  const dispatch = useDispatch()
  const location = useLocation();
  const [serverErrorLogin, setserverErrorLogin] = useState("");
  const [serverError, setServerError] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false)
  const [showLoginError, setShowLoginError] = useState(false);
  const [contact, setContact] = useState("")
  const [contactError, setContactError] = useState(false)
  const [loginUsing, setLoginUsing] = useState("password")
  const [country_code, set_country_code] = useState("91")
  const [isLoading,
    isError,
    errorMessage,
    isSuccess,
    sendOtp,
    mobileloginpassword,
    resetOtpState] = useSendOtp()
  const { InstituteDetails } = useSelector((state) => {
    return {
      InstituteDetails: state.institutewebsite.data,
    };
  });
  // let numbersCheck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const changeNumber = props.history && props.history.location && props.history.location.state && props.history.location.state.changeNumber ? props.history.location.state.changeNumber : ""
  const [symbolsArr] = useState([" "]);
  const [enteredValue, setEnteredValue] = useState("");
  useEffect(() => {
    if (changeNumber) {
      let data = changeNumber.split("-")
      set_country_code(data[0])
      setContact(data[1])
      setType("contact")
    }
  }, [changeNumber])
  const onChangeValue = async (e) => {
    let value = e.target.value;
    if (e.target.value) {
      setEnteredValue(value)
      if (/^(\(?\+?[0-9]*\)?)?[0-9(\)]*$/.test(value)) {
        await setType("contact")
        await setContact(value)
        ReactGA.event({
          category: "LogIn",
          action: "input",
          label: "phone",
        })
      } else if (ValidationFile.isEmail(value)) {
        await setType("email")
        await setEmail(value)
      } else {
        await setType("username")
        await setUserName(value)
        ReactGA.event({
          category: "LogIn",
          action: "input",
          label: "email",
        })
      }
    }
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
    setServerError(false)
    setShowLoginError(false)
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
        ReactGA.event({
          category: "LogIn",
          action: "input",
          label: "password",
        })
        break;
      default:
        return false;
    }
    resetOtpState()
  }
  useEffect(() => {
    if (AppLinkUrl.privateDomain()) {
      setPrivateDomainLogin(true);
    }
  }, []);
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

  const handleLoggedInProcess = (success) => {
    if (success.data.message) {
      ServerLoginErrorSwitch(success.data.message);
      setServerError(true);
      setFormSubmit(false)
    }
    if (success.data === "Invalid Login!") {
      ServerLoginErrorSwitch("Invalid Login!");
      setServerError(true);
      setFormSubmit(false)
    }

    if (success.data && success.data.data && success.data.data.hasOwnProperty("_id")) {
      Auth.setUserLogin(success.data); // Set Cookies of user login
      dispatch(setLoginToStore(Auth.user())); // Set Userdata to redux store
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
        } else {
          window.location.reload();
        }
      } else {
        window.location.href = "/";
      }
    }
  }
  const handleInputContact = (value, formattedValue) => {
    const dialCode = formattedValue.dialCode;
    let mobile = value.replace(dialCode, "");
    let inputValue = mobile;
    console.log('value', value, typeof value);
    if (inputValue === "") {
      set_country_code(dialCode);
      setContact(inputValue);
      setContactError(false)
      setType("")
      setEnteredValue("")
    } else {
      set_country_code(dialCode);
      setContact(inputValue);
      setContactError(ValidationFile.isEmpty(inputValue))
    }
    resetOtpState()
  }

  if (loginUsing === "otp" && type === "contact" && isSuccess) {
    history(`/auth/login-with-otpv1/${country_code}-${contact}`)
  }




  const handleSubmit = (e) => {
    e.preventDefault()
    ReactGA.event({
      category: "LogIn",
      action: "click",
      label: "submit",
    })
    setShowLoginError(true)
    if (type === "email") {
      if (!ValidationFile.isEmail(email)) {
        setEmailError(true)
      }
    } else if (type === "contact") {
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
            "",
            handleLoggedInProcess,
            (error) => {
              setFormSubmit(false)
            }
          );
        } else {
          setFormSubmit(true)
          UserRequest.login(
            email.toLowerCase(),
            password,
            "email",
            "",
            handleLoggedInProcess,
            (error) => {
              setFormSubmit(false)
            }
          );
        }
      }
    } else if (type === "username") {
      setFormSubmit(true)
      if (privateDomainLogin) {
        setFormSubmit(true)
        UserRequest.PrivateDomainlogin(
          userName,
          AppLinkUrl.getDomainName(),
          password,
          "email",
          "",
          handleLoggedInProcess,
          (error) => {
            setFormSubmit(false)
          }
        );
      } else {
        setFormSubmit(true)
        UserRequest.login(
          userName,
          password,
          "username",
          "",
          handleLoggedInProcess,
          (error) => {
            setFormSubmit(false)
          }
        );
      }
    } else if (type === "contact") {
      if (loginUsing === "password") {
        let action = "contactpasswordlogin";
        if (!ValidationFile.isEmpty(contact) && contact.length > 7 && !ValidationFile.isEmpty(password)) {
          mobileloginpassword(country_code, contact, action, privateDomainLogin, password)
        }
      } else {
        if (!ValidationFile.isEmpty(contact) && contact.length > 7) {
          let action = "checkexist"
          sendOtp(country_code, contact, action, privateDomainLogin, true, false);
        }
      }
    }
    else {
      if (!ValidationFile.isEmpty(email) && !ValidationFile.isEmail(email) && !ValidationFile.isEmpty(password)) {
      }
    }

  }


  const SignupClickgaEvents = () => {
    ReactGA.event({
      category: "SignUp",
      action: "click",
      label: "SignUp",
    })
  }

  function isCharacter(str) {
    return /^[A-Za-z]*$/.test(str);
  }
  const handleKeyDown = (e) => {
    // const regex = /[a-z]/;
    if (e.key !== "Backspace") {
      if (isCharacter(e.key)) {
        setType("email")
        let data = e.target.value.split(" ")
        setEmail(data[1])
      }
    }
  }
  //   ? "errorInput"
  //   : "", "line 34666")
  return (
    <AuthLayout>
      <div className="main_form">
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="off"
        >
          <div className='inputsform-wrap'>
            <h2 className='pt-40'>Welcome back</h2>
            <p className='login-para'>Please enter your details.</p>

            {/* <button className='button button-white google_btn'>
          <img src={iconGoogle} alt="" />&nbsp;&nbsp;
          Sign in with Google</button> */}
            {
              AppLinkUrl.privateDomain() ? "" :
               isWebView()?"": <GoogleLoginSingup />
            }
            {
              AppLinkUrl.privateDomain() ? "" : 
              isWebView()?"": <div className='posi_border'>
                or
              </div>
            }

            {
              type === "" && (
                <div className="formFieldwrap pb-0">
                  <FormInput
                    className={`primary ${isError && formSubmit
                      ? "errorInput"
                      : ""
                      }`
                    }
                    autoFocus={true}
                    onKeyUp={(e) => onChangeValue(e)}
                    onPaste={(e) => onChangeValue(e)}
                    label="Enter phone number or e-mail or Username" placeholder="Enter phone number or e-mail or Username" onChange={(e) => onChangeValue(e)}
                    value={enteredValue} onWheel={(e) => e.target.blur()} onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                  />
                  <FormError
                    show={enteredValue === "" && isError && formSubmit}
                    error="Please enter email or phone number."
                  />
                </div>
              )
            }
            {
              type === "email" && <div className="formFieldwrap">
                <FormInput label={type === "email" ? "Enter e-mail" : "Enter Username"} placeholder={type === "email" ? "Enter e-mail" : "Enter Username"} name={type === "email" ? "email" : "username"} value={email} onChange={handleChange} onKeyUp={handleChange} className={(emailError && !email && showLoginError) || (emailError && email !== "" && showLoginError) ? "errorInput" : "primary"} autoFocus={true} onWheel={(e) => e.target.blur()} onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()} />
                <FormError show={emailError && !email && showLoginError} error={`${type === "email" ? "Email" : "Username"} required.`} />
                <FormError show={emailError && email !== "" && showLoginError} error={`${type === "email" ? "Email" : "Username"} is invalid.`} />
              </div>
            }
            {
              type === "username" && <div className="formFieldwrap">
                <FormInput label={"Enter Username"} placeholder={"Enter Username"} name={"username"} value={userName} onChange={handleChange} onKeyUp={handleChange} className={"primary"} autoFocus={true} onWheel={(e) => e.target.blur()} onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()} />
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
                    className={
                      !valueIsValid && isError
                        ?
                        "errorInput"
                        : ""
                    }
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
                    onKeyDown={(e) => handleKeyDown(e)}
                  />
                  <label className="animLabel" htmlFor="mobile_number">
                    Mobile Number
                  </label>

                </div>
                <FormError show={contactError && !contact && showLoginError} error="Contact is required." />
                <FormError show={contactError && contact !== ""} error="Contact is invalid." />
                <FormError show={(errorMessage === "Invalid number. Please recheck and enter again." || errorMessage === "Invalid Login!") && showLoginError} error={errorMessage} />
              </div>
            )}
            {
              type === "contact" &&
              <div className='radio_text mb-20'>
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
            }
            {
              type === "email" || (type === "contact" && loginUsing === "password") || type === "username" ?
                <React.Fragment>
                  <div className="formFieldwrap">
                    <FormInput label="Password"
                      className={`mb-0 ${type === "email" ? (passwordError && !password && showLoginError) || (serverError && showLoginError) ? "errorInput" : ""
                        : (passwordError && !password && showLoginError) || (passwordError && password !== "") || (isError && password !== "") ? "errorInput" : ""
                        }`} placeholder="Password" name="password" value={password} onChange={handleChange} onKeyUp={handleChange} type={showPassword ? "text" : "password"}
                      onWheel={(e) => e.target.blur()}
                      onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()} />
                    {
                      type === "email" || type === "username" ?
                        <React.Fragment><FormError show={passwordError && !password && showLoginError} error="Password required" />
                          <FormError
                            show={serverError && showLoginError}
                            error={serverErrorLogin}
                          /></React.Fragment> :
                        <React.Fragment><FormError show={passwordError && !password && showLoginError} error="Password is required." />
                          <FormError show={passwordError && password !== ""} error="Password is invalid." />
                          <FormError show={isError && password !== ""} error={errorMessage} /></React.Fragment>
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
                    {AppLinkUrl.privateDomain() && AppLinkUrl.getHost() === "intelligencevidyarthi.in" ? "" :
                      <div className='mt-5'>
                        <small><AppLink to="/auth/forgot-password">Forgot Password?</AppLink></small>
                      </div>
                    }
                  </div>
                </React.Fragment> : ""
            }
          </div>
          <div className="buttoncontent-wrap">
            {
              type === "email" ?
                <button className={`button Login-btn btn-sm ${!emailError && password ? "button-primary" : "button-gray"}`} onClick={handleSubmit} type={formSubmit ? 'button' : 'submit'}>{formSubmit ?
                  <React.Fragment>Logging In... <div className='loader loader25'></div></React.Fragment>
                  : "Login"}</button> :
                type === "username" ? <button className={`button Login-btn btn-sm ${userName && password ? "button-primary" : "button-gray"}`} onClick={handleSubmit} type={formSubmit ? 'button' : 'submit'}>{formSubmit ?
                  <React.Fragment>Logging In... <div className='loader loader25'></div></React.Fragment>
                  : "Login"}</button>
                  : type === "contact" ?
                    <React.Fragment>
                      {
                        isLoading ? <button className={`${loginUsing === "password" ?
                          contact && password ?
                            "button button-primary btn-sm white Login-btn" :
                            "button button-gary btn-sm Login-btn"
                          : "button button-primary btn-sm white Login-btn"}`} onClick={handleSubmit} type='button'>{loginUsing === "password" ? "Loading..." : "Sending..."}<div className='loader loader25'></div></button> :
                          <button className={`${loginUsing === "password" ?
                            contact && password ?
                              "button button-primary btn-sm white Login-btn" :
                              "button button-gray btn-sm Login-btn"
                            : "button button-primary btn-sm white Login-btn"}`} onClick={handleSubmit} type='submit'>{loginUsing === "password" ? "Continue" : "Send OTP"}</button>
                      }
                    </React.Fragment>
                    : ""
            }

            <div className='text-change mt-10'>
              {
                AppLinkUrl.privateDomain() ? "" :
                  <React.Fragment>
                    <p>Don’t have account? <span className='primary'><AppLink to="/auth/create-account" onClick={() => SignupClickgaEvents()}>Sign up for free</AppLink></span></p>
                  </React.Fragment>} </div>
          </div>

        </form>
      </div>
    </AuthLayout >
  )
}

export default LoginWithEmail