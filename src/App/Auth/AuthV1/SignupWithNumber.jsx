import React, { useState } from 'react'
import AuthLayout from '../AuthLayout'
import FormInput from '../../../Common/Form/FormInput';
import PhoneInput from "react-phone-input-2";

const SignupWithNumber = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  const handlePassword = (e) => {
    setPasswordShown(!passwordShown);
    e.preventDefault();
  }

  return (
    <AuthLayout>
      <div className='main_form'>
        <h2 className='pt-40 mb-30'>Create account</h2>
        <div className="cstmPhoneInput mb-20">
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
        <FormInput label="Type Password" placeholder="Type new password" type={passwordShown ? "text" : "password"} />
        <FormInput label="Re-Type Password" placeholder="Re-type new password" type={passwordShown ? "text" : "password"} />
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
        <button className='button button-primary btn-sm button-block'>Continue</button>


      </div>
    </AuthLayout>
  )
}

export default SignupWithNumber