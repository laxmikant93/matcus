import React from 'react'
import AuthLayout from '../AuthLayout'
import PhoneInput from "react-phone-input-2";

const ForgotPasswordWithNumber = () => {

  return (
    <AuthLayout>
      <div className='main_form'>
        <div className="column_center">
          <h2 className='pt-40 mb-20'>Forgot Password</h2>
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

          <p className='center-xs forg_text mb-20'>We will send an OTP(One Time Password) to your mobile</p>
          <button className='button button-primary btn-sm button-block'>Request OTP</button>
        </div>
      </div>
    </AuthLayout>
  )
}

export default ForgotPasswordWithNumber