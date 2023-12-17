import React, { useEffect, useState } from 'react'
import AuthLayout from '../AuthLayout'
import FormInput from '../../../Common/Form/FormInput';
import iconGoogle from "../../../assets/Icons/icon-google.svg";
import AppLink from "../../../Common/AppLink";
// import { useParams } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import FormError from '../../../Common/Form/FormError';
import ValidationUtils from '../../../Classes/ValidationUtils';
import CommonSignupProcess from "./CommonSignupProcess";
import { useNavigate, useParams } from 'react-router-dom';
import GoogleLoginSingup from '../Login/GoogleLoginSingup';
import ReactGA from "react-ga";
import { data, isWebView } from '../../../CommonFunctions';

const Signup = () => {
  // const { type } = useParams();
  const history = useNavigate();
  const [type, setType] = useState("")
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false)
  const [contact, setContact] = useState("");
  const [country_code, setCountry_Code] = useState("91");
  const [valueIsValid, setValueIsValid] = useState(false);
  // const [isType, setIsType] = useState("");
  const [isError, setIsError] = useState(false)
  const [symbolsArr] = useState([" "]);
  const [formSubmit, setSumited] = useState(false);
  // const [invalidContactLength, setInvalidContactLength] = useState(false);
  // const [contactTaken, setContactTaken] = useState(false);
  // const [EmailTaken, setEmailTaken] = useState(false);
  const [fullName, setFullName] = useState("")
  // const [passwordisValid, setPasswordisValid] = useState(false);
  const [password, setPassword] = useState("");
  // const [confirmPasswordisValid, setConfirmPasswordisValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [samePasswordValid, setSamePasswordValid] = useState(false);
  // const [successResponse, setSuccessResponse] = useState("")
  const [successMessage, success, errorMessage, error, ContactSignupWithOtpSent, EmailSignupWithOtpSent, resetAll] = CommonSignupProcess()
  // useEffect(() => {
  //   if (value) {
  //     if (type === "email") {
  //       setEmail(value)
  //     } else {
  //       setContact(value)
  //     }
  //     setValueIsValid(true)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const handlePassword = (e) => {
    if (e.target.checked) {
      setPasswordShown(true);
    } else {
      setPasswordShown(false);
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
  const passwordSameCheck = () => {
    if (confirmPassword === password) {
      setSamePasswordValid(true)
      return true
    } else {
      setSamePasswordValid(false)
      return false
    }
  }
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

  const [loading, setLoading] = useState(false)
  const onSubmit = async (e) => {
    ReactGA.event({
      category: "SignUp",
      action: "click",
      label: "Submit",
    })
    resetAll()
    e.preventDefault();
    setSumited(true)
    if (isFormValid()) {
      if (passwordSameCheck()) {
        if (fullName) {
          setLoading(true)
          if (type === "contact") {
            await ContactSignupWithOtpSent(contact, country_code)
          } else {
            await EmailSignupWithOtpSent(email.toLowerCase(), fullName)
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
  const [enteredValue, setEnteredValue] = useState("");

  const onChangeValue = async (e) => {
    let value = e.target.value;
    // setEnteredValue(value)
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

  useEffect(() => {
    setLoading(false)
    if (type === "contact") {
      if (successMessage === "Otp Sent Successfully" && success) {
        history(`/auth/signup-otp-verifyv1/contact/${country_code}-${contact}`, {state:{
          fullname: fullName,
          password: password,
        }})
      }
    } else if (type === "email") {
      history(`/auth/signup-otp-verifyv1/email/${email}`, {state:{
        fullname: fullName,
        password: password,
      }})
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successMessage])

  useEffect(() => {
    if (error || errorMessage === "email is taken") {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successMessage, errorMessage])
  useEffect(() => {
    setContact("")
    setPassword("")
    setConfirmPassword("")
    setFullName("")
    setEmail("")
  }, [])

  const loginGaEventClcik = () => {
    ReactGA.event({
      category: "LogIn",
      action: "click",
      label: "LogIn",
    })

  }
  function isCharacter(str) {
    return /^[A-Za-z]*$/.test(str);
  }
  const handleKeyDown =(e)=>{
    // const regex = /[a-z]/;
    if(e.key!=="Backspace"){
    if (isCharacter(e.key)){
     setType("email")
     let data = e.target.value.split(" ")
     setEmail(data[1])
    }}
  }
  return (
    <AuthLayout>
      <form onSubmit={(e) => onSubmit(e)} autoComplete="off">
        <div className='main_form'>
          <div className="inputsform-wrap">
            <h2 className='pt-40'>Create account</h2>
           {isWebView()?"": <GoogleLoginSingup />}
           {isWebView()?"": <div className='posi_border'>
              or
            </div>
            }
            {
              type === "" && (
                <div className="formFieldwrap">
                  <FormInput className={`primary ${isError && formSubmit
                    ? "errorInput"
                    : ""
                    }`
                  }
                    autoFocus={true}
                    label="Enter phone number or e-mail" placeholder="Enter phone number or e-mail" onChange={(e) => onChangeValue(e)}
                    value={enteredValue} onWheel={(e) => e.target.blur()} onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()} />
                  <FormError
                    show={enteredValue === "" && isError && formSubmit}
                    error="Please enter email or phone number."
                  />
                </div>
              )
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
                        ? "errorInput"
                        : ""
                    }
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
                    onKeyDown={(e)=>handleKeyDown(e)}
                  />
                  <label className="animLabel" htmlFor="mobile_number">
                    Mobile Number
                  </label>

                </div>
                <FormError
                  show={contact === "" && valueIsValid === false && isError}
                  error="Contact number is required."
                />
                <FormError
                  show={contact && valueIsValid === false && isError}
                  error="Invalid contact number."
                />
                <FormError
                  show={error && errorMessage === "email is taken"}
                  error="Contact taken. Please recheck and enter again"
                />
                <FormError show={errorMessage === "Invalid Phone Number - Check Number Format"} error={errorMessage} />
              </div>
            )}



            {type === "email" && (
              <div className="formFieldwrap">
                <FormInput
                  className={`primary ${isError && formSubmit && valueIsValid === false
                    ? "errorInput"
                    : ""
                    }`
                  }
                  autoFocus={true}
                  autoComplete="off"
                  label="Enter e-mail" value={email} placeholder="Enter e-mail"
                  onWheel={(e) => e.target.blur()} onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()} onChange={(e) => onChangeEmail(e)} />
                <FormError
                  show={email === "" && valueIsValid === false && isError}
                  error="Email is required."
                />
                <FormError
                  show={email && emailError && isError}
                  error="Invalid Email."
                />
                <FormError
                  show={error && errorMessage === "email is taken"}
                  error="Email taken. Please recheck and enter again."
                />
              </div>
            )}
            <div className="formFieldwrap">
              <FormInput
                className={
                  fullName === "" && isError
                    ? "errorInput"
                    : ""
                }
                name="fullName"
                type="text"
                label="Full name"
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
                error="Full Name required."
              />
            </div>
            <div className="formFieldwrap">
              <FormInput
                className={
                  password === "" && isError
                    ? "errorInput"
                    : ""
                }
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
                error="Password required."
              />
              <FormError
                show={password && password.length < 4 && isError}
                error="Min. 4 characters should be there."
              />
            </div>
            <div className="formFieldwrap">
              <FormInput
                className={
                  confirmPassword === "" && isError
                    ? "errorInput"
                    : ""
                }
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
                error="Confirm Password required."
              />
              <FormError
                show={confirmPassword && password && !samePasswordValid && isError}
                error="Confirm Password should be same as Password."
              />
            </div>
            <div className='check_sec'>
              <div className=''>
                {/* <label
                className=""
                onClick={handlePassword}
              >
                <input
                  onChange={handlePassword}
                  type="checkbox" checked={passwordShown === true}
                />&nbsp;&nbsp;<span className='check-text'>Show password</span>
              </label> */}

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
          </div>

          <div className="buttoncontent-wrap">
            {
              loading ? (
                <button className='button button-primary btn-sm button-block' type='button'>Loading... <div className='loader loader25'></div></button>
              ) : (
                <button className='button button-primary btn-sm button-block' type='submit' onClick={(e) => onSubmit(e)}>Continue</button>
              )
            }


            {/* <button className='button button-white google_btn'>
            <img src={iconGoogle} alt="" />&nbsp;&nbsp;
            Sign in with Google</button> */}
            <div className='text-change mt-20'>
              <p>Already have a account? <span className='primary'><AppLink to="/auth/login" onClick={() => loginGaEventClcik()}>Login</AppLink></span></p>
            </div>
          </div>
        </div>
      </form>

    </AuthLayout>
  )
}

export default Signup