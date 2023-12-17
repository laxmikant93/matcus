import React from 'react'
import AuthLayout from '../AuthLayout'
import AppLink from "../../../Common/AppLink";

const ForgotPasswordOtp = () => {

  return (
    <AuthLayout>
      <div className='main_form'>
        <h2 className='pt-40'>Forgot Password</h2>
        <p className='mb-20 text-gray veryfy_text '>An OTP has been sent to the entered mobile
          number +919560625959 <span className='primary'><AppLink to="#">Change number?</AppLink></span></p>
        <h4>Enter OTP</h4>
        <div className="otp_inputs mt-5">
          <input className="form-control" type="text" id="first" maxlength="1" />
          <input className="form-control" type="text" id="second" maxlength="1" />
          <input className="form-control" type="text" id="third" maxlength="1" />
          <input className="form-control" type="text" id="fourth" maxlength="1" />
          <input className="form-control" type="text" id="fifth" maxlength="1" />
          <input className="form-control" type="text" id="sixth" maxlength="1" />
        </div>
        <p className='mt-20 mb-20 center-xs w-100'><AppLink to="#" className='primary'>Resend code in 00:29</AppLink></p>
        <button className='button button-primary btn-sm white continue_btn'>Verify</button>
        <div className='posi_border'>
          or
        </div>
        <button className='button btn-o-primary btn-sm primary continue_btn'>Reset with email</button>
      </div>
    </AuthLayout>
  )
}

export default ForgotPasswordOtp