import React from 'react'
import AuthLayout from '../AuthLayout'
import FormInput from '../../../Common/Form/FormInput';
import PhoneInput from "react-phone-input-2";
import AppLink from "../../../Common/AppLink";

const LoginWithPassword = () => {
  return (
    <AuthLayout>
      <div className='main_form'>
        <h2 className='pt-40'>Welcome back</h2>
        <p className='mb-30'>Welcome back! Please enter your details.</p>
        <div className="cstmPhoneInput mb-10">
          <PhoneInput
            containerClass="form-group"
            inputClass="form-control"
            specialLabel="hii"
            country={"in"}
            inputProps={{
              name: "phone",
              required: true,
              autoFocus: true,
            }}
            enableSearch
            disableSearchIcon
          />
          <label className="animLabel" htmlFor="mobile_number">
            Mobile Number
          </label>
        </div>
        <div className='radio_text mb-20'>
          <label className="small">
            <input
              type="radio"
              name="radio"
              value="Password_1"
            />&nbsp;&nbsp;
            Password
          </label>
          <label className="small">
            <input
              type="radio"
              name="radio"
              value="another_1"
            />&nbsp;&nbsp;
            OTP
          </label>
        </div>
        <FormInput label="Password" placeholder="Password" type="password" className="mb-0" />
        <div className='check_sec mb-20'>
          <div className='mt-5'>
            <label
              className=""
            >
              <input
                type="checkbox"
              />&nbsp;&nbsp;<span className='check-text'>Show password</span>
            </label>
          </div>
          <div className='mt-5'>
            <small><AppLink to="#">Forgot Password?</AppLink></small>
          </div>
        </div>
        <button className='button white Login-btn'>Continue</button>
      </div>
    </AuthLayout>
  )
}

export default LoginWithPassword