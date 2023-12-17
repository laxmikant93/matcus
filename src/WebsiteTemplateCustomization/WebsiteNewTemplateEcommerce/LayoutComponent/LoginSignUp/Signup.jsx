import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "./signup.scss";
import "./login.scss";
import FormInput from "../../../../Common/Form/FormInput"
import { getCustomerSignup, getSignupOtp, resetCustomerOtpVerification, resetCustomerSignUp } from '../../../../store/actions/ecommerce/action/auth';
import FormError from '../../../../Common/Form/FormError';
import ValidationFile from '../../../../Classes/ValidationFile';
import image from "../../assets/images/banner.jpg"
import AppLinkUrl from '../../../../Common/AppLink/AppLinkUrl';

const Signup = () => {
  const user = useSelector((state) => state.user);
  const subdomainuser = useSelector((state) => state.subdomainuser);
  const { signUpSuccess, signUpLoading, signUpData, signUpOtpVeificationData, signUpOtpVeificationLoading,
    signUpOtpVeificationSuccess, businessData, businessSuccess } = useSelector((state) => {
      return {
        signUpData: state.ecomAuth.signUpOtp.data,
        signUpSuccess: state.ecomAuth.signUpOtp.success,
        signUpLoading: state.ecomAuth.signUpOtp.loading,
        signUpOtpVeificationSuccess: state.ecomAuth.customerDetail.success,
        signUpOtpVeificationLoading: state.ecomAuth.customerDetail.loading,
        signUpOtpVeificationData: state.ecomAuth.customerDetail.data,
        businessData: state.businessInfo.ecomWebsite.data,
        businessSuccess: state.businessInfo.ecomWebsite.success
      }
    })
  const [activeradio, setActiveRadio] = useState(-1);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [contact, setContact] = useState('');
  const [contactError, setContactError] = useState(false)
  const [otp, setOtp] = useState("")
  const [receiveOtp, setReceiveOtp] = useState(false);
  const [route, setRoute] = useState(false)
  const dispatch = useDispatch();
  const history = useNavigate();


  const [arrowsKeyState, setArrowKeyState] = useState(false)
  let textInput1 = React.createRef();
  let textInput2 = React.createRef();
  let textInput3 = React.createRef();
  let textInput4 = React.createRef();
  let textInput5 = React.createRef();
  let textInput6 = React.createRef();
  const [symbolsArr] = useState(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

  const [inputOtp1, setInputOtp1] = useState("")
  const [inputOtp2, setInputOtp2] = useState("")
  const [inputOtp3, setInputOtp3] = useState("")
  const [inputOtp4, setInputOtp4] = useState("")
  const [inputOtp5, setInputOtp5] = useState("")
  const [inputOtp6, setInputOtp6] = useState("")
  const [OTPError, setOTPError] = useState(false)
  const switchHandelChange = (key, elmnt) => {
    let value = elmnt.target.value
    setOTPError(false)
    dispatch(resetCustomerOtpVerification())
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
      // setSubmitOtp(true)
      setRoute(true)
      if (AppLinkUrl.privateDomain()) {
        if (type === "email") {
          dispatch(getCustomerSignup(AppLinkUrl.getHost(), {
            email: email,
            fullname: name,
            otp: validOtp,
            password: password
          }, "privateDomain"));
        } else {
          dispatch(getCustomerSignup(AppLinkUrl.getHost(), {
            contact: contact,
            country_code: 91,
            fullname: name,
            otp: validOtp,
            password: password
          }, "privateDomain"));
        }
      } else {
        if (type === "email") {
          dispatch(getCustomerSignup(window.location.href.split("//")[1].split(".")[0], {
            email: email,
            fullname: name,
            otp: validOtp,
            password: password
          }));
        } else {
          dispatch(getCustomerSignup(window.location.href.split("//")[1].split(".")[0], {
            contact: contact,
            country_code: 91,
            fullname: name,
            otp: validOtp,
            password: password
          }));
        }
      }

      setOTPError(false)
    } else {
      setOTPError(true)
    }
  }

  const [type, setType] = useState("email")
  const handleMouseClick = (e) => {
    setArrowKeyState(!arrowsKeyState)
  }
  // const [cssOtpError, setCssOtpError] = useState(false)
  // useEffect(() => {
  //   let otp = [inputOtp1, inputOtp2, inputOtp3, inputOtp4, inputOtp5, inputOtp6]
  //   let validOtp = otp.join("")
  //   if (validOtp.length === 6) {
  //     setCssOtpError(false)
  //   } else {
  //     setCssOtpError(true)
  //   }
  // }, [inputOtp1, inputOtp2, inputOtp3, inputOtp4, inputOtp5, inputOtp6])

  const inputHandler = (t, v) => {
    dispatch(resetCustomerSignUp())
    if (t === 'pw') {
      setPassword(v);
      setPasswordError(false)
    }
    if (t === 'name') {
      setName(v);
      setNameError(false)
    }
    if (t === "contact") {
      setContact(v)
      setContactError(false)
    }
    if (t === 'email') {
      setEmail(v);
      setEmailError(false)
    }
  };

  const createAccountHandler = () => {
    if (type === "email") {
      if (ValidationFile.isEmpty(name)) {
        setNameError(true)
      }
      if (!ValidationFile.isEmail(email)) {
        setEmailError(true)
      }
      if (ValidationFile.isEmpty(password) || password.length < 4) {
        setPasswordError(true)
      }

      let body = {
        // email: "kunbhfg@gmai.com",
        // fullname: "rfrr"
      };
      if (email) {
        body.email = email;
      }
      if (name) {
        body.fullname = name;
      }
      if (!ValidationFile.isEmpty(name) && ValidationFile.isEmail(email) && !ValidationFile.isEmpty(password) && password.length > 3 && !receiveOtp) {
        if (AppLinkUrl.privateDomain()) {
          dispatch(getSignupOtp(AppLinkUrl.getHost(), body, "privateDomain"));

        } else {
          dispatch(getSignupOtp(window.location.href.split("//")[1].split(".")[0], body));
        }
      }
      // if (otp0 && otp1 && otp2 && otp3 && otp4 && otp5) {
      //   body.otp = otp0 + otp1 + otp2 + otp3 + otp4 + otp5;
      // }
      if (password) {
        body.password = password
      }
    } else {
      if (ValidationFile.isEmpty(name)) {
        setNameError(true)
      }
      if (ValidationFile.isEmpty(contact) || contact.length !== 10) {
        setContactError(true)
      }
      if (ValidationFile.isEmpty(password) || password.length < 4) {
        setPasswordError(true)
      }

      let body = {
        // email: "kunbhfg@gmai.com",
        // fullname: "rfrr"
      };
      if (type === "email") {
        if (email) {
          body.email = email;
        }
      } else {
        if (contact) {
          body.contact = contact;
          body.country_code = 91
        }
      }

      if (name) {
        body.fullname = name;
      }
      if (!ValidationFile.isEmpty(name) && ValidationFile.isNotEmpty(contact) && contact.length === 10 && !ValidationFile.isEmpty(password) && password.length > 3 && !receiveOtp) {
        if (AppLinkUrl.privateDomain()) {
          dispatch(getSignupOtp(AppLinkUrl.getHost(), body, "privateDomain"));

        } else {
          dispatch(getSignupOtp(window.location.href.split("//")[1].split(".")[0], body));
        }
      }
      // if (otp0 && otp1 && otp2 && otp3 && otp4 && otp5) {
      //   body.otp = otp0 + otp1 + otp2 + otp3 + otp4 + otp5;
      // }
      if (password) {
        body.password = password
      }
    }


    if (receiveOtp) {
      handleVerify()
    }
  };
  useEffect(() => {
    return () => {
      dispatch(resetCustomerSignUp())
      dispatch(resetCustomerOtpVerification())
      setRoute(false)
    }
  }, [dispatch])

  useEffect(() => {
    if (signUpSuccess) {
      if (signUpData.message === "email is taken") {

        setReceiveOtp(false)
      }
      else {
        setReceiveOtp(true)
      }
    }
  }, [signUpData.message, signUpSuccess])
  useEffect(() => {
    if (signUpOtpVeificationSuccess && route && signUpOtpVeificationData.message !== "Error Occured") {
      history('/');
    }
  }, [history, route, signUpOtpVeificationData.message, signUpOtpVeificationSuccess])
  return (
    <>
      <div className="signup-wrapper pb-45 ">
        <div className='signup-container'>

          <div className="signup_wrap">
            {receiveOtp ?
              <>
                <div className="banner">
                  {
                    businessSuccess && businessData && businessData.banners ? (
                      businessData.banners.length ?
                        <img src={businessData.banners[0].business_featured_banner ? businessData.banners[0].business_featured_banner : image} className="img-fluid" alt="" />

                        : <React.Fragment>
                          <img src={image} className="img-fluid" alt="" />
                        </React.Fragment>) : <img src={image} className="img-fluid" alt="" />

                  }
                  {/* <img src={image} className="img-fluid" alt="" /> */}
                </div>
                <div className='signup-otp-wrap'>
                  <h2 className="font mb-0">Verify with OTP</h2>
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

                    <FormError show={signUpOtpVeificationData.message === "Error Occured"} error="Invalid OTP." />
                  </div>
                </div>
                {/* <button className="button-secondary">CONTINUE</button> */}
              </> :
              <>
                <div className='signup-otp-wrap'>
                  <h2>Sign up</h2>
                  {/* <p>Full Name</p> */}
                  <div className="formFieldwrap formpaddingbottom">
                    <FormInput
                      placeholder="Name"
                      onChange={(vl) => inputHandler('name', vl.target.value)}
                    />
                    <FormError show={nameError} error="Fullname required." />
                  </div>
                  <div className="formFieldwrap formpaddingbottom">
                    <div className="input-custom-type inline">
                      <label className={type === "email" ? "active" : ""}>
                        <input
                          value={type}
                          onChange={() => setType("email")}
                          checked={type === "email"}
                          type="radio"
                        />
                        Email
                      </label>
                      <label className={type === "contact" ? "active" : ""}>
                        <input
                          type="radio"
                          value={type}
                          onChange={() => setType("contact")}
                          checked={type === "contact"}
                        />
                        Mobile Number
                      </label>
                    </div>
                  </div>
                  {
                    type === "email" ?
                      <div className="formFieldwrap formpaddingbottom mt-8">
                        <FormInput placeholder="Email" onChange={(vl) => inputHandler('email', vl.target.value)} />
                        <FormError show={!email && emailError} error="Email required." />
                        <FormError show={email && emailError} error="Email invalid." />
                        <FormError show={signUpData.message === "email is taken"} error="Email is taken. try another one." />
                      </div> :
                      <div className="formFieldwrap formpaddingbottom mt-8">
                        <FormInput placeholder="Mobile No." onChange={(vl) => inputHandler('contact', vl.target.value)} />
                        <FormError show={!contact && contactError} error="Contact required." />
                        <FormError show={contact && contactError} error="Contact should be valid." />
                        <FormError show={signUpData.message === "email is taken"} error="Contact is taken. try another one." />
                      </div>
                  }

                  <div className="formFieldwrap formpaddingbottom  ">
                    <FormInput type={"password"} placeholder="Create Password" onChange={(vl) => inputHandler('pw', vl.target.value)} />
                    <FormError show={passwordError} error="Password required." />
                    <FormError show={passwordError && password} error="Password should be 4 characters." />
                  </div>
                </div>
              </>
            }
            {

              signUpLoading || signUpOtpVeificationLoading ? <div className='signup-btn-wrap'><button className="button-secondary btn-createAccount">Creating...</button> </div>
                : <div className='signup-btn-wrap'> <button className="button-secondary btn-createAccount" onClick={createAccountHandler}>CREATE ACCOUNT</button> </div>
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

export default Signup