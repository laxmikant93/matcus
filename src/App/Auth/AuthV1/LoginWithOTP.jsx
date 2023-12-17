import React, { useEffect, useState } from 'react'
import AuthLayout from '../AuthLayout'
import { useNavigate, useParams } from 'react-router-dom';
import useSendOtp from '../Hooks/useSendOtp'
import useVerifyOtp from '../Hooks/useVerifyOtp';
import useDownTimer from "../Hooks/useTimer";
import AppLinkUrl from '../../../Common/AppLink/AppLinkUrl';
import FormError from '../../../Common/Form/FormError';
import { useSelector } from 'react-redux';
import useSetLogin from '../Hooks/useSetLogin';
const LoginWithOTP = () => {
  const { contact } = useParams()
  const history = useNavigate()
  const [countryCode, setCountryCode] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [privateDomainLogin, setPrivateDomainLogin] = useState(false);
  const [timer, setTimer] = useDownTimer();
  const { InstituteDetails } = useSelector((state) => {
    return {
      InstituteDetails: state.institutewebsite.data,
    };
  });

  const [arrowsKeyState, setArrowKeyState] = useState(false)
  const [OTPError, setOTPError] = useState(false)
  const [submitOtp, setSubmitOtp] = useState(false)
  const [otp, setOtp] = useState("")
  const [symbolsArr] = useState(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  const [isLoading,
    ,
    ,
    isSuccess,
    sendOtp,
    ,
    resetOtpState] = useSendOtp()
  const [otpLoading, otpSuccess, , otpResponse] = useVerifyOtp(
    contactNumber,
    otp,
    countryCode,
    submitOtp,
    privateDomainLogin,
    InstituteDetails
  );
  useEffect(() => {
    if (contact) {
      let data = contact.split("-")
      setCountryCode(data[0])
      setContactNumber(data[1])
    }
  }, [contact])
  useEffect(() => {
    if (AppLinkUrl.privateDomain()) {
      setPrivateDomainLogin(true);
    }
  }, []);
  const changeNumber = () => {
    history("/auth/login", { changeNumber: contact })
  }
  const resend = () => {
    let action = "other"
    sendOtp(countryCode, contactNumber, action, privateDomainLogin);
    setOtp("")
    setInputOtp1("")
    setInputOtp2("")
    setInputOtp3("")
    setInputOtp4("")
    setInputOtp5("")
    setInputOtp6("")
  }
  if (isSuccess) {
    resetOtpState()
    setTimer('30')
  }
  useEffect(() => {
    setTimer('30')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useSetLogin(otpResponse, otpSuccess);
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

  const switchHandelChange = (key, elmnt) => {
    let value = elmnt.target.value
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
    }
    else if (elmnt.key === "ArrowRight") {
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

  const handleVerify = () => {
    let otp = [inputOtp1, inputOtp2, inputOtp3, inputOtp4, inputOtp5, inputOtp6]
    let validOtp = otp.join("")
    if (validOtp.length === 6) {
      setOtp(validOtp)
      setSubmitOtp(true)
      setOTPError(false)
    } else {
      setOTPError(true)
    }
  }
  const handleMouseClick = (e) => {
    setArrowKeyState(!arrowsKeyState)
  }
  const [cssOtpError, setCssOtpError] = useState(false)
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
    <AuthLayout>
      <div className='main_form'>
        <h2 className='pt-40'>Verify Mobile Number</h2>
        <p className='mb-20 veryfy_text'>An OTP has been sent to the entered mobile
          number {countryCode}-{contactNumber} <span className='primary'>
            <button onClick={changeNumber} className="font-otp otp-link">Change number?</button></span></p>
        <h4>Enter OTP</h4>
        <div className='formFieldwrap'>
          <div className="otp_inputs mt-5 mb-10">
            <input ref={textInput1} className={`form-control ${OTPError || otpResponse.statusText === "failed" || otpResponse.Status === "Error" ? "errorInput" : ""}`} type="text" id="first" tabIndex="1" maxlength="1" value={inputOtp1} onChange={(elmnt) => switchHandelChange(0, elmnt)}
              onKeyUp={(elmnt) => onKeyUpChange(0, elmnt)}
              onClick={handleMouseClick}
              onKeyPress={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()}
              onKeyDown={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()} autoFocus={true} />
            <input onClick={handleMouseClick} ref={textInput2} className={`form-control ${OTPError || otpResponse.statusText === "failed" || otpResponse.Status === "Error" ? "errorInput" : ""}`} type="text" id="second" tabIndex="2" maxlength="1" value={inputOtp2} onChange={(elmnt) => switchHandelChange(1, elmnt)} onKeyUp={(elmnt) => onKeyUpChange(1, elmnt)} onKeyDown={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()} onKeyPress={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()}
            />
            <input onClick={handleMouseClick} ref={textInput3} className={`form-control ${OTPError || otpResponse.statusText === "failed" || otpResponse.Status === "Error" ? "errorInput" : ""}`} type="text" id="third" tabIndex="3" maxlength="1" value={inputOtp3} onChange={(elmnt) => switchHandelChange(2, elmnt)} onKeyUp={(elmnt) => onKeyUpChange(2, elmnt)} onKeyDown={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()} onKeyPress={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()}
            />
            <input onClick={handleMouseClick} ref={textInput4} className={`form-control ${OTPError || otpResponse.statusText === "failed" || otpResponse.Status === "Error" ? "errorInput" : ""}`} type="text" id="fourth" tabIndex="4" maxlength="1" value={inputOtp4} onChange={(elmnt) => switchHandelChange(3, elmnt)} onKeyUp={(elmnt) => onKeyUpChange(3, elmnt)} onKeyDown={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()} onKeyPress={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()}
            />
            <input onClick={handleMouseClick} ref={textInput5} className={`form-control ${OTPError || otpResponse.statusText === "failed" || otpResponse.Status === "Error" ? "errorInput" : ""}`} type="text" id="fifth" tabIndex="5" maxlength="1" value={inputOtp5} onChange={(elmnt) => switchHandelChange(4, elmnt)} onKeyUp={(elmnt) => onKeyUpChange(4, elmnt)} onKeyDown={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()} onKeyPress={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()}
            />
            <input onClick={handleMouseClick} ref={textInput6} className={`form-control ${OTPError || otpResponse.statusText === "failed" || otpResponse.Status === "Error" ? "errorInput" : ""}`} type="text" id="sixth" tabIndex="6" maxlength="1" value={inputOtp6} onChange={(elmnt) => switchHandelChange(5, elmnt)} onKeyUp={(elmnt) => onKeyUpChange(5, elmnt)} onKeyDown={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()} onKeyPress={(e) => symbolsArr.includes(e.key) || e.key === "Backspace" || e.key === "ArrowRight" || e.key === "ArrowLeft" ? (elmnt) => switchHandelChange(0, elmnt) : e.preventDefault()}
            />
          </div>
          <p className='mb-20 center-xs w-100'>
            {
              isLoading ? <button className='primary otp-link'>Sending... </button> : <button onClick={resend} disabled={timer !== "0s"} className='primary otp-link'>Resend code {timer !== "0s" ? `in ${timer}` : ""} </button>
            }
          </p>
        </div>
        <div className="buttoncontent-wrap">
          {
            otpLoading ? <button className={cssOtpError ? "button button-gray btn-sm white continue_btn" : "button button-primary btn-sm white continue_btn"} type='button'>Verifying... <div className='loader loader25'></div></button> : <button className={cssOtpError ? "button button-gray btn-sm white continue_btn" : "button button-primary btn-sm white continue_btn"} onClick={handleVerify}>Verify</button>
          }
        </div>
      </div>
    </AuthLayout>
  )
}

export default LoginWithOTP