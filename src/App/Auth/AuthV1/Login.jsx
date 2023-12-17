import React, { useState } from 'react'
import AuthLayout from '../AuthLayout'
import FormInput from '../../../Common/Form/FormInput';
import iconGoogle from "../../../assets/Icons/icon-google.svg";
import AppLink from '../../../Common/AppLink';
import ValidationUtils from '../../../Classes/ValidationUtils';
import { useNavigate } from 'react-router-dom';
import FormError from '../../../Common/Form/FormError';
import AppLinkUrl from '../../../Common/AppLink/AppLinkUrl';

const Login = () => {
  const [inputData, setInputData] = useState("")
  const [isError, setIsError] = useState(false)
  const history = useNavigate()
  const handleChange = (e) => {
    let inputValue = e.target.value;
    setInputData(inputValue)
    setIsError(ValidationUtils.isEmpty(inputValue))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let isType = ""
    if (ValidationUtils.isEmpty(inputData)) {
      setIsError(true)
    }
    if (ValidationUtils.isEmail(inputData)) {
      isType = "email"
    } else if (ValidationUtils.contactNumber(inputData)) {
      if (inputData.length < 8) {
        setIsError(true)
      }
      isType = "contact"
    } else {
      isType = "userName"
    }
    if (!ValidationUtils.isEmpty(inputData)) {
      if (isType === "contact") {
        if (inputData.length > 7) {
          history(`/auth/login-with-numberv1/${inputData}/${isType}`)
        }
      } else {
        history(`/auth/login-with-emailv1/${inputData}/${isType}`)
      }
    }
  }
  return (
    <AuthLayout>
      <div className='main_form'>
        <h2 className='pt-40'>Welcome back</h2>
        <p className='mb-30'>Welcome back! Please enter your details.</p>
        <div className="main_form_input">
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="off"
          >
            <div className="formFieldwrap">
              <FormInput label="Enter e-mail" onChange={handleChange} onKeyUp={handleChange} value={inputData} placeholder="Enter phone number or e-mail" className={isError ? "errorInput" : ""} />
              <FormError show={isError && !inputData} error="Input Value required." />
              <FormError show={isError && inputData !== ""} error="contact num should be more than 7 digits." />
            </div>
            <button type="submit" className='button white Login-btn'>Login</button>
          </form>

          <p className='small mt-10 w-100 end-xs primary'><a href="/" target="_blank" rel="noreferrer">Forgot Password?</a></p>
          <div className='posi_border'>
            {
              AppLinkUrl.privateDomain() ? "" : "or"
            }
          </div>
          {
            AppLinkUrl.privateDomain() ? "" : <button className='button button-white google_btn'>
              <img src={iconGoogle} alt="" />&nbsp;&nbsp;
              Sign in with Google</button>
          }
          <div className='text-change mt-10'>
            {
              AppLinkUrl.privateDomain() ? "" :
                <p>Don’t have account? <span className='primary'><AppLink to="/" target="_blank" rel="noreferrer">Sign up for free</AppLink></span></p>
            }   </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login