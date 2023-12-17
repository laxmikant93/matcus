import React, { useState } from 'react'
import AuthLayout from '../AuthLayout'
import FormInput from '../../../Common/Form/FormInput';
import iconGoogle from "../../../assets/Icons/icon-google.svg";
import AppLink from "../../../Common/AppLink";

const SignupProcessloader = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  const handlePassword = (e) => {
    setPasswordShown(!passwordShown);
    e.preventDefault();
  }
  return (
    <AuthLayout>
      <div className='main_form'>
        <h2 className='pt-40 mb-30'>Create account</h2>
        <FormInput label="Enter e-mail" placeholder="Enter phone number or e-mail" />
        <FormInput label="Type Password" placeholder="Type password" type={passwordShown ? "text" : "password"} />
        <FormInput label="Re-Type Password" placeholder="Re-type password" type={passwordShown ? "text" : "password"} />
        <div className='check_sec mb-20'>
          <div className='mt-5'>
            <label
              className=""
            >
              <input
                type="checkbox"
              />&nbsp;&nbsp;<span className='check-text'>Save password</span>
            </label>
          </div>
          <div className='mt-5'>
            <label
              className=""
              onClick={handlePassword}
            >
              <input
                type="checkbox"
              />&nbsp;&nbsp;<span className='check-text'>Show password</span>
            </label>
          </div>
        </div>
        <button className='button button-primary btn-sm button-block'>Continue <div className='loader loader25'></div></button>

        <div className='posi_border'>
          or
        </div>
        <button className='button button-white google_btn'>
          <img src={iconGoogle} alt="" />&nbsp;&nbsp;
          Sign in with Google</button>
        <div className='text-change mt-10'>
          <p>Already have a account? <span className='primary'><AppLink to="#">Login</AppLink></span></p>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignupProcessloader