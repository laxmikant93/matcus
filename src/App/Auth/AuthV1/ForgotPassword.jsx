import React from 'react'
import AuthLayout from '../AuthLayout'
import FormInput from '../../../Common/Form/FormInput';

const ForgotPassword = () => {

  return (
    <AuthLayout>
      <div className='main_form'>
        <h2 className='pt-40 mb-20'>Forgot Password</h2>
        <FormInput label="Enter e-mail" placeholder="Enter phone number or e-mail" />
        <button className='button button-primary btn-sm button-block'>Continue</button>
      </div>
    </AuthLayout>
  )
}

export default ForgotPassword