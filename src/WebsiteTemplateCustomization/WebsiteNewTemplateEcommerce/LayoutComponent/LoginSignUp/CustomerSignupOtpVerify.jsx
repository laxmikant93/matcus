import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormError from '../../../../Common/Form/FormError';
import CustomerSignupProcess from './CustomerSignupProcess';
import useDownTimer from '../../../../App/Auth/Hooks/useTimer';
import useSetLogin from '../../../../App/Auth/Hooks/useSetLogin';
import "./signup.scss";

import BannerImage from "../../../assets/TheTranquill/banner-hero.jpg";
import image from "../../assets/images/banner.jpg"
import { useSelector } from 'react-redux';
const CustomerSignupOtpVerify = (props) => {
  const { type, value } = useParams();
  const history = useNavigate()
  const [successMessage, success, errorMessage, error, ContactSignupWithOtpSent, EmailSignupWithOtpSent, resetAll, verifyContactSignUpOtp, verifyOtpoading, verifyEmailSignUpOtp] = CustomerSignupProcess()
  const [symbolsArr] = useState(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  const [contact, setContact] = useState("")
  const [countryCode, setCountryCode] = useState("")
  const { successTemplate, websiteType, Ecomdata } = useSelector((state) => {
    return {
      successTemplate: state.websiteTemplate.getTemplate.success,
      websiteType: state.websiteTemplate.getTemplate.websiteType,
      Ecomdata: state.serviceTemplate.getTemplate.data
    }
  })
  // const { instituteData } = useSelector((state) => state.serviceTemplate.getTemplate.data);
  const { businessData, businessSuccess } = useSelector((state) => {
    return {
      businessData: state.businessInfo.ecomWebsite.data,
      businessSuccess: state.businessInfo.ecomWebsite.success
    }
  });
  // console.log(type, "typee")
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useDownTimer();
  const [otp, setOtp] = useState("")
  const [resendButton, setResendButton] = useState(false)
  const [OTPError, setOTPError] = useState(false)
  const [cssOtpError, setCssOtpError] = useState(false)
  const verificationData = props.history && props?.history?.location && props.history?.location?.state && props.history?.location?.state.fullname && props.history?.location?.state.password ? { fullname: props.history?.location?.state.fullname, password: props.history.location.state.password } : ""
  if (!verificationData) {
    history("/ecom-signup")
  }


  const [arrowsKeyState, setArrowKeyState] = useState(false)
  const [inputOtp1, setInputOtp1] = useState("")
  const [inputOtp2, setInputOtp2] = useState("")
  const [inputOtp3, setInputOtp3] = useState("")
  const [inputOtp4, setInputOtp4] = useState("")
  const [inputOtp5, setInputOtp5] = useState("")
  const [inputOtp6, setInputOtp6] = useState("")

  let textInput1 = React.createRef();
  let textInput2 = React.createRef();
  let textInput3 = React.createRef();
  let textInput4 = React.createRef();
  let textInput5 = React.createRef();
  let textInput6 = React.createRef();

  const handleMouseClick = (e) => {
    setArrowKeyState(!arrowsKeyState)
  }
  const switchHandelChange = (key, elmnt) => {
    let value = elmnt.target.value
    resetAll()
    setOTPError(false)
    switch (key) {
      case 0:
        setInputOtp1(value)
        onKeyUpChange(0, elmnt)
        break;
      case 1:
        setInputOtp2(value)
        onKeyUpChange(1, elmnt)
        break;
      case 2:
        setInputOtp3(value)
        onKeyUpChange(2, elmnt)
        break;
      case 3:
        setInputOtp4(value)
        onKeyUpChange(3, elmnt)
        break;
      case 4:
        setInputOtp5(value)
        onKeyUpChange(4, elmnt)
        break;
      case 5:
        setInputOtp6(value)
        onKeyUpChange(5, elmnt)
        break;
      default:
        break;
    }
  }
  const onKeyUpChange = (key, elmnt) => {

    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      switch (key) {
        case 0:
          textInput1.current.focus()
          break;
        case 1:
          textInput1.current.focus()
          break;
        case 2:
          textInput2.current.focus()
          break;
        case 3:
          textInput3.current.focus()
          break;
        case 4:
          textInput4.current.focus()
          break;
        case 5:
          textInput5.current.focus()
          break;
        default:
          break;
      }
    } else if (elmnt.key === "ArrowRight") {
      // if (elmnt.target.value) {
      setArrowKeyState(!arrowsKeyState)
      switch (key) {
        case 0:
          textInput2.current.focus()
          break;
        case 1:
          textInput3.current.focus()
          break;
        case 2:
          textInput4.current.focus()
          break;
        case 3:
          textInput5.current.focus()
          break;
        case 4:
          textInput6.current.focus()
          break;
        case 5:
          textInput6.current.focus()
          break;

        default:
          break;
      }
      // }
    }
    else if (elmnt.key === "ArrowLeft") {
      setArrowKeyState(!arrowsKeyState)
      switch (key) {
        case 0:
          textInput1.current.focus()
          break;
        case 1:
          textInput1.current.focus()
          break;
        case 2:
          textInput2.current.focus()
          break;
        case 3:
          textInput3.current.focus()
          break;
        case 4:
          textInput4.current.focus()
          break;
        case 5:
          textInput5.current.focus()
          break;

        default:
          break;
      }

    }
    else {
      if (elmnt.target.value) {
        switch (key) {
          case 0:
            textInput2.current.focus()
            break;
          case 1:
            textInput3.current.focus()
            break;
          case 2:
            textInput4.current.focus()
            break;
          case 3:
            textInput5.current.focus()
            break;
          case 4:
            textInput6.current.focus()
            break;
          case 5:
            textInput6.current.focus()
            break;
          default:
            break;
        }
      }
    }
  }
  useEffect(() => {
    if (value && type === "contact") {
      let data = value.split("-")
      setCountryCode(data[0])
      setContact(data[1])
    }
  }, [type, value])

  useSetLogin(successMessage, resendButton === false ? success : false)
  useEffect(() => {
    setTimer('30')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (success) {
      setLoading(false)
      setTimer('30')
      resetAll()
      if (!resendButton) {
        history('/')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetAll, success])
  function registrationPayload() {
    if (type === "contact") {
      return {
        contact: contact,
        country_code: countryCode,
        otp: otp,
        fullname: verificationData.fullname,
        password: verificationData.password,
      };
    } else {
      return {
        email: value,
        otp: otp,
        fullname: verificationData.fullname,
        password: verificationData.password,
      };
    }
  }
  const verifyOTP = async () => {
    let otp = [inputOtp1, inputOtp2, inputOtp3, inputOtp4, inputOtp5, inputOtp6]
    setResendButton(false)
    let validOtp = otp.join("")
    if (validOtp.length === 6) {
      setOtp(validOtp)
      setOTPError(false)
    } else {
      setOTPError(true)
    }
  }

  useEffect(() => {
    if (otp) {
      if (type === "contact") {
        verifyContactSignUpOtp(successTemplate && websiteType === "Ecommerce" ? "e" : "s", registrationPayload())
      } else {
        verifyEmailSignUpOtp(successTemplate && websiteType === "Ecommerce" ? "e" : "s", registrationPayload())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp])
  useEffect(() => {
    let otp = [inputOtp1, inputOtp2, inputOtp3, inputOtp4, inputOtp5, inputOtp6]
    let validOtp = otp.join("")
    if (validOtp.length === 6) {
      setCssOtpError(false)
    } else {
      setCssOtpError(true)
    }
  }, [inputOtp1, inputOtp2, inputOtp3, inputOtp4, inputOtp5, inputOtp6])
  useEffect(() => {
    // Moving cursor to the end
    textInput1.current.selectionStart = textInput1.current.value.length;
    textInput1.current.selectionEnd = textInput1.current.value.length;
    textInput2.current.selectionStart = textInput2.current.value.length;
    textInput2.current.selectionEnd = textInput2.current.value.length;
    textInput3.current.selectionStart = textInput3.current.value.length;
    textInput3.current.selectionEnd = textInput3.current.value.length;
    textInput4.current.selectionStart = textInput4.current.value.length;
    textInput4.current.selectionEnd = textInput4.current.value.length;
    textInput5.current.selectionStart = textInput5.current.value.length;
    textInput5.current.selectionEnd = textInput5.current.value.length;
    textInput6.current.selectionStart = textInput6.current.value.length;
    textInput6.current.selectionEnd = textInput6.current.value.length;
  }, [textInput1, textInput2, textInput3, textInput4, textInput5, textInput6, arrowsKeyState]);

  const resend = async () => {
    // console.log("jadkjashdkjh")
    setLoading(true)
    // console.log(loading, "loading")
    setResendButton(true)
    if (type === "contact") {
      await ContactSignupWithOtpSent(successTemplate && websiteType === "Ecommerce" ? "e" : "s", contact, countryCode)
    } else {
      await EmailSignupWithOtpSent(successTemplate && websiteType === "Ecommerce" ? "e" : "s", value, verificationData.fullname)
    }
    setOtp("")
    setInputOtp1("")
    setInputOtp2("")
    setInputOtp3("")
    setInputOtp4("")
    setInputOtp5("")
    setInputOtp6("")
  }
  return (
    <>
      <div className="signup-wrapper pb-45">
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
                        </React.Fragment>) : <img src={image} className="img-fluid" alt="" />}
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
              <h2 className="font mb-0 ">Verify with OTP</h2>
              <p className='opt-numner-display'> {type === "contact" ? "OTP sent to your number" : "OTP sent to your email"} <span>{value}</span>  </p>
              <h4>Enter OTP</h4>

              <div className='formFieldwrap formpaddingbottom'>
                <div className="OTP_inputfields">
                  <input ref={textInput1} className={`form-control ${OTPError ? "errorInput" : ""}`} type="text" id="first" tabIndex="1" maxlength="1" value={inputOtp1} onChange={(elmnt) => switchHandelChange(0, elmnt)}
                    onKeyUp={(elmnt) => onKeyUpChange(0, elmnt)}
                    onClick={handleMouseClick}
                    onKeyPress={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()}
                    onKeyDown={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()} autoFocus={true} />
                  <input onClick={handleMouseClick} ref={textInput2} className={`form-control ${OTPError ? "errorInput" : ""}`} type="text" id="second" tabIndex="2" maxlength="1" value={inputOtp2} onChange={(elmnt) => switchHandelChange(1, elmnt)} onKeyUp={(elmnt) => onKeyUpChange(1, elmnt)} onKeyDown={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()} onKeyPress={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()}
                  />
                  <input onClick={handleMouseClick} ref={textInput3} className={`form-control ${OTPError ? "errorInput" : ""}`} type="text" id="third" tabIndex="3" maxlength="1" value={inputOtp3} onChange={(elmnt) => switchHandelChange(2, elmnt)} onKeyUp={(elmnt) => onKeyUpChange(2, elmnt)} onKeyDown={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()} onKeyPress={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()}
                  />
                  <input onClick={handleMouseClick} ref={textInput4} className={`form-control ${OTPError ? "errorInput" : ""}`} type="text" id="fourth" tabIndex="4" maxlength="1" value={inputOtp4} onChange={(elmnt) => switchHandelChange(3, elmnt)} onKeyUp={(elmnt) => onKeyUpChange(3, elmnt)} onKeyDown={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()} onKeyPress={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()}
                  />
                  <input onClick={handleMouseClick} ref={textInput5} className={`form-control ${OTPError ? "errorInput" : ""}`} type="text" id="fifth" tabIndex="5" maxlength="1" value={inputOtp5} onChange={(elmnt) => switchHandelChange(4, elmnt)} onKeyUp={(elmnt) => onKeyUpChange(4, elmnt)} onKeyDown={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()} onKeyPress={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()}
                  />
                  <input onClick={handleMouseClick} ref={textInput6} className={`form-control ${OTPError ? "errorInput" : ""}`} type="text" id="sixth" tabIndex="6" maxlength="1" value={inputOtp6} onChange={(elmnt) => switchHandelChange(5, elmnt)} onKeyUp={(elmnt) => onKeyUpChange(5, elmnt)} onKeyDown={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()} onKeyPress={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()}
                  />
                </div>
                <FormError show={OTPError} error="Enter Valid OTP." />
                <FormError show={error} error={errorMessage} />
                {/* <p className='mt-10 mb-20 center-xs w-100'>
                  {
                    loading ? <button className='primary otp-link'>Sending...</button> : <button onClick={resend} disabled={timer !== "0s"} className='primary otp-link'>Resend code {timer !== "0s" ? `in ${timer}` : ""} </button>
                  }</p> */}

                <div className='otpTime-wrapper'>
                  <h6 className='otp-text'>Didn’t recieve OTP?</h6>
                  {
                    loading ? <button type='button' className='btn-trasnparent' >Sending...</button> :
                      <button type='button' onClick={resend} disabled={timer !== "0s"} className='btn-trasnparent inline otp-timer otp-text items-center'> {timer !== "0s" ? `${timer}` : ""} Resend OTP</button>
                  }
                  {/* <h6 className='otp-timer otp-text'> {timer !== "0s" ? `in ${timer}` : ""}</h6>
                  <button className='btn-trasnparent'>{loading ? "Sending..." : "resend"} Resend OTP</button> */}
                </div>
              </div>

              {/* <FormError show={signUpOtpVeificationData.message === "Error Occured"} error="Invalid OTP." /> */}
              {/* // btn active state  'buttonTrue' 'btnTrue-primary' 'btn-block'
                // disable state 'buttonTrue' 'btn-disable' 'btn-block' */}
              {

                verifyOtpoading ?
                  <button className=" buttonTrue  btnTrue-primary btn-block btn-createAccount mt-40">Creating...</button>
                  :
                  <button className=" buttonTrue  btnTrue-primary   btn-block button-gray btn-createAccount mt-40" disabled={loading} onClick={verifyOTP} >CREATE ACCOUNT</button>
              }

              {/* <div className='login-login-links'>
                  <Link to={'/ecom-login'} className='login-p'>Already have an account</Link>
                </div> */}
            </div>
          </div>

          {/* <FormError show={signUpOtpVeificationData.message === "Error Occured"} error="Invalid OTP." /> */}
          {/* // btn active state  'buttonTrue' 'btnTrue-primary' 'btn-block'
                // disable state 'buttonTrue' 'btn-disable' 'btn-block' */}
          {/* {

            verifyOtpoading ?
              <button className=" buttonTrue  btnTrue-primary btn-block btn-createAccount mt-40">Creating...</button>
              :
              <button className=" buttonTrue  btnTrue-primary   btn-block button-gray btn-createAccount mt-40" disabled={loading} onClick={verifyOTP} >CREddATE ACCOUNT</button>
          } */}
          {/* verifyOtpoading ?
            <button className=" buttonTrue  btnTrue-primary btn-block btn-createAccount mt-40">Creating...</button>
            :
            <button className=" buttonTrue  btnTrue-primary   btn-block button-gray btn-createAccount mt-40" disabled={loading} onClick={verifyOTP} >CREATE ACCOUNT</button> */}

          {/* <div className='login-login-links'>
                  <Link to={'/ecom-login'} className='login-p'>Already have an account</Link>
                </div> */}
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  )
}

export default CustomerSignupOtpVerify