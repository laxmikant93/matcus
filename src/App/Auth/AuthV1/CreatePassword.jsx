import React, { useState } from 'react'
import AuthLayout from '../AuthLayout'
import FormInput from '../../../Common/Form/FormInput';

const CreatePassword = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  const handlePassword = (e) => {
    setPasswordShown(!passwordShown);
    e.preventDefault();
  }

  return (
    <AuthLayout>
      <div className='main_form'>
        <h2 className='pt-40 mb-30'>Create Password</h2>
        <FormInput label="Create New Password" placeholder="Create New Password" type={passwordShown ? "text" : "password"} />
        <FormInput label="Confirm New Password" placeholder="Confirm New Password" type={passwordShown ? "text" : "password"} />
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
        <button className='button button-primary btn-sm button-block'>Set New password</button>
      </div>
    </AuthLayout>
  )
}

export default CreatePassword