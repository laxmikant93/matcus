import React from 'react'
import AuthLayout from '../AuthLayout'
import AppLink from "../../../Common/AppLink";

const EmailcheckNote = () => {

  return (
    <AuthLayout>
      <div className="main_form note_form">
        <div className="column_center">
          <h2 className='pt-40 mb-10 '>Check Your Email </h2>
          <p className="mb-80 forg_note">We have sent password recover instructions
            to your email <span className="primary"><AppLink to="#">abcd@gmail.com</AppLink></span></p>
          <div className='flex center-xs middle-sm'>
            <p className='text-dark forg_note'>Didn't receive the email?</p>&nbsp;&nbsp;
            <button className='button button-primary btn-xs white email_btn'>Resend email</button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default EmailcheckNote