import React from 'react'
import AuthLayout from '../AuthLayout'
import AppLink from "../../../Common/AppLink";

const SignupVerifyEmail = () => {

  return (
    <AuthLayout>
      <div className='main_form note_form'>
        <div className="column_center">
          <h2 className='pt-40 mb-20 start-xs'>Verify your email</h2>
          <p className='mb-30 note_text'>We sent  an email to <span className='primary'><AppLink to="#">abc@gmail.com</AppLink></span>&nbsp;
            to make sure you own it. Please check
            inbox and follow the steps to finish setting
            up your Edneed account.</p>
          <AppLink to="#" className='text_link mb-40'>Use a different email address as your Edneed
            account</AppLink>
          <button className='button button-primary btn-sm button-block'>Resend email</button>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignupVerifyEmail