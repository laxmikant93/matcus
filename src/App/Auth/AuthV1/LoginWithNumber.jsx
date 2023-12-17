import React, { useState, useEffect } from 'react'
import AuthLayout from '../AuthLayout'
import PhoneInput from "react-phone-input-2";
import { useNavigate, useParams } from 'react-router-dom';
import FormInput from '../../../Common/Form/FormInput';
import ValidationFile from '../../../Classes/ValidationFile';
import AppLink from '../../../Common/AppLink';
import FormError from '../../../Common/Form/FormError';
import AppLinkUrl from '../../../Common/AppLink/AppLinkUrl';
import useSendOtp from "../Hooks/useSendOtp";
import { useSelector } from 'react-redux';
const LoginWithNumber = () => {
  const { value, type } = useParams()
  const [country_code, set_country_code] = useState("")
  const history = useNavigate()
  const [contact, set_contact] = useState("")
  const [contactError, setContactError] = useState(false)
  const [loginUsing, setLoginUsing] = useState("password")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [privateDomainLogin, setPrivateDomainLogin] = useState(false);
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
  useEffect(() => {
    set_contact(value)
    set_country_code("+91")
  }, [value])

  useEffect(() => {
    if (AppLinkUrl.privateDomain()) {
      setPrivateDomainLogin(true);
    }
  }, []);
  const handleContact = (value, formattedValue) => {
    const dialCode = formattedValue.dialCode;
    let mobile = value.replace(dialCode, "");
    let inputValue = mobile;
    set_country_code(dialCode);
    set_contact(inputValue);
    setContactError(ValidationFile.isEmpty(inputValue))
  }
  const handlePassword = (e) => {
    let inputValue = e.target.value;
    setPassword(inputValue)
    setPasswordError(ValidationFile.isEmpty(inputValue))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
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

    if (loginUsing === "password") {
      let action = "contactpasswordlogin";
      if (!ValidationFile.isEmpty(contact) && contact.length > 7 && !ValidationFile.isEmpty(password)) {
        mobileloginpassword(country_code, contact, action, privateDomainLogin, password)
      }
    } else {
      if (!ValidationFile.isEmpty(contact) && contact.length > 7) {
        let action = "other"
        sendOtp(country_code, contact, action, privateDomainLogin, InstituteDetails);
      }
    }
    if (loginUsing === "otp" && isSuccess) {
      history(`/auth/login-with-otpv1`)
    }

  }
  return (
    <AuthLayout>
      <div className='main_form'>
        <h2 className='pt-40'>Welcome back</h2>
        <p className='mb-30'>Welcome back! Please enter your details.</p>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="off"
        >
          <div className="cstmPhoneInput mb-10">
            <PhoneInput
              containerClass="form-group"
              inputClass="form-control"
              specialLabel="hii"
              value={`${country_code} ${contact}`}
              country={"in"}
              countryCodeEditable={false}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: false,
              }}
              onChange={(value, formattedValue) => {
                handleContact(value, formattedValue);
              }}
              onKeyUp={(value, formattedValue) => {
                handleContact(value, formattedValue);
              }}
              enableSearch
              disableSearchIcon
            />
            <label className="animLabel" htmlFor="mobile_number">
              Mobile Number
            </label>
            <FormError show={contactError && !contact} error="Contact is required." />
            <FormError show={contactError && contact !== ""} error="Contact is invalid." />
          </div>
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
          {
            loginUsing === "password" ? <React.Fragment>
              <div className="formFieldwrap">
                <FormInput label="Password" placeholder="Password" onChange={handlePassword} onKeyUp={handlePassword} type={showPassword ? "text" : "password"} className="mb-0" />
                <FormError show={passwordError && !password} error="Password is required." />
                <FormError show={passwordError && password !== ""} error="Password is invalid." />
                <FormError show={isError && password !== ""} error={errorMessage} />
              </div>

              <div className='check_sec mb-20'>
                <div className='mt-5'>
                  <label
                    className=""
                  >
                    <input
                      type="checkbox"
                      onChange={() => setShowPassword(!showPassword)}
                      checked={showPassword === true}
                    />&nbsp;&nbsp;<span className='check-text'>Show password</span>
                  </label>
                </div>
                <div className='mt-5'>
                  <small><AppLink to="#">Forgot Password?</AppLink></small>
                </div>
              </div>

            </React.Fragment> : ""
          }
          {
            isLoading ? <button className='button button-primary btn-xs white send_otp' type='button'>{loginUsing === "password" ? "Loading..." : "Sending..."}</button> :
              <button className='button button-primary btn-xs white send_otp' type='submit'>{loginUsing === "password" ? "Continue" : "Send OTP"}</button>
          }
        </form>

      </div>
    </AuthLayout>
  )
}

export default LoginWithNumber