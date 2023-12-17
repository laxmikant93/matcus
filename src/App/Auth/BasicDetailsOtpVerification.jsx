/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import FormError from '../../Common/Form/FormError';
import useDownTimer from './Hooks/useTimer';
import CommonOtpVerificationPersonal from './AuthV1/CommonOtpVerificationPersonal';
import useSetLogin from "./Hooks/useSetLogin";
import { useDispatch, useSelector } from 'react-redux';
import { changeUserInfo, setUserActiveRoleUpdate, updateBusinessType, updateCreateInstituteInfoNew, updateEmailContactVerify, updateUserInstituteInfo } from '../../store/actions/user';
import Auth from '../../Classes/Auth';
import Request from '../../Classes/Request';
import '../Dashboard/contactEmailVerify.scss'
import VerifyImage from '../Dashboard/InstituteDashboard/Verified-img.png'
import AppLink from '../../Common/AppLink';
const BasicDetailsOtpVerification = (props, type) => {
  const [symbolsArr] = useState(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  const [successMessage, success, errorMessage, error, resetAll, verifyOtpLoading, loading, sendEmailVerificationMail, VerifyEmailMail, sendContactVerificationOtp, VerifyContactOtp] = CommonOtpVerificationPersonal();
  const email = props.email;
  const contact = props.contact;
  const country_code = props.country_code;
  const institute_name = props.institute_name;
  const modal_type = props.type;
  const [timer, setTimer] = useDownTimer();
  const [otp, setOtp] = useState("");
  const [resendButton, setResendButton] = useState(false);
  const [OTPError, setOTPError] = useState(false);
  const [cssOtpError, setCssOtpError] = useState(false);

  const { user } = useSelector((state) => {
    return {
      user: state.user
    }
  })

  // const finalSubmit = {
  //   email: email,
  //   contact: contact,
  //   country_code: country_code,
  //   contact_verify: true,
  //   email_verify: true,
  //   isVerified: true
  // }

  // useEffect(() => {
  //   if (value && type === "contact") {
  //     let data = value.split("-")
  //     setCountryCode(data[0])
  //     setContact(data[1])
  //   }
  // }, [type, value]);

  // useSetLogin(successMessage, resendButton === false ? success : false)
  const [arrowsKeyState, setArrowKeyState] = useState(false)

  let textInput1 = React.createRef();
  let textInput2 = React.createRef();
  let textInput3 = React.createRef();
  let textInput4 = React.createRef();
  let textInput5 = React.createRef();
  let textInput6 = React.createRef();

  const [inputOtp1, setInputOtp1] = useState("")
  const [inputOtp2, setInputOtp2] = useState("")
  const [inputOtp3, setInputOtp3] = useState("")
  const [inputOtp4, setInputOtp4] = useState("")
  const [inputOtp5, setInputOtp5] = useState("")
  const [inputOtp6, setInputOtp6] = useState("")
  const WebsiteTypeRequest = new Request();

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
  const resend = async () => {
    // setLoading(true)
    setResendButton(true)
    if (user.user_email) {
      await sendContactVerificationOtp({ contact: contact, country_code: country_code })
    } else {
      await sendEmailVerificationMail({ email: email, userID: user._id })
    }
    setOtp("")
    setInputOtp1("")
    setInputOtp2("")
    setInputOtp3("")
    setInputOtp4("")
    setInputOtp5("")
    setInputOtp6("")
  }
  // if (isSuccess) {
  //   resetOtpState()
  //   setTimer('30')
  // }

  useEffect(() => {
    setTimer('30')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
  // console.log(props.verifyState, "line no 235");
  const userData = (state) => {
    if (state === "addContact") {
      return {
        contact: contact,
        country_code: country_code,
        contact_verify: true,
        email_verify: true
      }
    } else {
      return {
        email: email,
        contact_verify: true,
        email_verify: true
      }
    }

  }
  const dispatch = useDispatch();
  // const history = useNavigate();
  useEffect(() => {
    if (success && !resendButton) {
      // setLoading(false)
      // dispatch(changeUserInfo(user._id, userData()))
      WebsiteTypeRequest.patch(WebsiteTypeRequest.url(`/authorization-middleware/user/${user._id}?industry=${user.user_business_type}`, "middleware"),
        userData(props.verifyState),
        (success) => {
          if (props.verifyState === "addContact") {
            let stepperData = {
              addContact: true,
              condition: "Contact",
              industry: user.user_business_type,
              institute: user.user_institute,
              business: user.user_institute,
              owner: user._id
            }
            WebsiteTypeRequest.post(
              WebsiteTypeRequest.url(`/authService/DashboardStepperUpdate`),
              stepperData, (success) => {
                dispatch(updateEmailContactVerify(userData(props.verifyState), user.user_dashboard_stepper))
                props.ClosePopUp()
                // let steup = {
                //   ...user.user_dashboard_stepper, addBuisnessDetails: true,
                // }
                // Auth.updateUserDetail("user_dashboard_stepper", steup);
                // dispatch(updateDashboardStepper(steup))
              }, (error) => {
                props.ClosePopUp()
              })
          } else {
            let stepperData = {
              addEmail: true,
              condition: "Email",
              industry: user.user_business_type,
              institute: user.user_institute,
              business: user.user_institute,
              owner: user._id
            }
            WebsiteTypeRequest.post(
              WebsiteTypeRequest.url(`/authService/DashboardStepperUpdate`),
              stepperData, (success) => {
                dispatch(updateEmailContactVerify(userData(props.verifyState), user.user_dashboard_stepper))
                props.ClosePopUp()
                // let steup = {
                //   ...user.user_dashboard_stepper, addBuisnessDetails: true,
                // }
                // Auth.updateUserDetail("user_dashboard_stepper", steup);
                // dispatch(updateDashboardStepper(steup))
              }, (error) => {
                props.ClosePopUp()
              })
          }


        },
        (error) => {
          props.ClosePopUp()
        }
      );

      // history(`/institutedetailsV1`)
      setTimer('30')
      resetAll()
    } else {
      setResendButton(false);
      if (timer === "0s") {
        setTimer('30')
      }
      resetAll()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success])
  // Payload for API
  function registrationPayload() {
    if (props.verifyState === "addContact") {
      return {
        contact: contact,
        country_code: country_code,
        otp: otp,
      };
    } else {
      return {
        userID: user._id,
        email: email,
        otp: otp,
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
      if (props.verifyState === "addContact") {
        VerifyContactOtp(registrationPayload())
      } else {
        VerifyEmailMail(registrationPayload())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp])
  const handleMouseClick = (e) => {
    setArrowKeyState(!arrowsKeyState)
  }
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
  return (
    <div className='popupemail-container'>
      <div className="popup-left-sidebar">
        <img src={VerifyImage} className="img-fluid" alt="" />
      </div>
      <div className="popup-right-sidebar otp-rightsidebar">
        <div className="pop-input-wrapper">
          <h1 className="text-sm w-500 base">{props.verifyState === "addContact" ? "Verify Contact" : "Verify Email Address"}</h1>
          {props.verifyState === "addContact" ?
            <p className="text-xs w-300 base mt-8">OTP sent to {country_code + contact} <button className='otp-link-pop text-xs w-300 primary' onClick={() => props.handleChangeValue()}> Change  Contact?</button> </p>
            : <p className="text-xs w-300 base mt-8">OTP sent to {email} <button className='otp-link-pop text-xs w-300 primary' onClick={() => props.handleChangeValue()}> Change  Email?</button> </p>
          }<div className='main_form Timelineotp'>
            <h4 className='text-xs base mt-20'>Enter OTP</h4>
            <div className='formFieldwrap'>
              <div className="otp_inputs timeline_gap mt-5">
                <input ref={textInput1} onClick={handleMouseClick} className={`form-control ${OTPError || error ? "errorInput" : ""}`} type="text" id="first" tabIndex="1" maxlength="1" value={inputOtp1} onChange={(elmnt) => switchHandelChange(0, elmnt)}
                  onKeyUp={(elmnt) => onKeyUpChange(0, elmnt)}
                  onKeyPress={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()}
                  onKeyDown={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()} autoFocus={true} />
                <input ref={textInput2} onClick={handleMouseClick} className={`form-control ${OTPError || error ? "errorInput" : ""}`} type="text" id="second" tabIndex="2" maxlength="1" value={inputOtp2} onChange={(elmnt) => switchHandelChange(1, elmnt)} onKeyUp={(elmnt) => onKeyUpChange(1, elmnt)}
                  onKeyPress={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()}
                  onKeyDown={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()} />
                <input ref={textInput3} onClick={handleMouseClick} className={`form-control ${OTPError || error ? "errorInput" : ""}`} type="text" id="third" tabIndex="3" maxlength="1" value={inputOtp3} onChange={(elmnt) => switchHandelChange(2, elmnt)} onKeyUp={(elmnt) => onKeyUpChange(2, elmnt)} onKeyDown={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()} onKeyPress={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()}
                />
                <input ref={textInput4} onClick={handleMouseClick} className={`form-control ${OTPError || error ? "errorInput" : ""}`} type="text" id="fourth" tabIndex="4" maxlength="1" value={inputOtp4} onChange={(elmnt) => switchHandelChange(3, elmnt)} onKeyUp={(elmnt) => onKeyUpChange(3, elmnt)} onKeyDown={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()} onKeyPress={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()}
                />
                <input ref={textInput5} onClick={handleMouseClick} className={`form-control ${OTPError || error ? "errorInput" : ""}`} type="text" id="fifth" tabIndex="5" maxlength="1" value={inputOtp5} onChange={(elmnt) => switchHandelChange(4, elmnt)} onKeyUp={(elmnt) => onKeyUpChange(4, elmnt)} onKeyDown={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()} onKeyPress={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()}
                />
                <input ref={textInput6} onClick={handleMouseClick} className={`form-control ${OTPError || error ? "errorInput" : ""}`} type="text" id="sixth" tabIndex="6" maxlength="1" value={inputOtp6} onChange={(elmnt) => switchHandelChange(5, elmnt)} onKeyUp={(elmnt) => onKeyUpChange(5, elmnt)} onKeyDown={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()} onKeyPress={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()}
                />
              </div>
            </div>
            <FormError show={OTPError} error="Enter Valid OTP." />
            <FormError show={error && errorMessage !== ""} error={errorMessage} />
            <p className='mt-10 mb-20 center-xs text-right w-100'>{
              loading ? <button className='primary otp-link otp-link-pop'>Sending...</button> : <button onClick={() => resend()} disabled={timer !== "0s"} className='primary otp-link otp-link-pop'>Resend code {timer !== "0s" ? `in ${timer}` : ""} </button>
            }</p>
            {
              verifyOtpLoading ?
                <button className={cssOtpError ? "button button-primary button-block btn-sm white continue_btn" : "button button-primary button-block  btn-sm white continue_btn"} type='button'>Verifying...<div className='loader loader25'></div></button> :
                <button className={cssOtpError ? "button button-primary button-block btn-sm white continue_btn" : "button button-primary button-block  btn-sm white continue_btn"} disabled={loading} type='button' onClick={verifyOTP}>Verify</button>
            }
          </div>
        </div>
      </div>
    </div>

  )
}

export default BasicDetailsOtpVerification