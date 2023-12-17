import React from 'react'
import { useState } from 'react'
import FormError from '../../../../Common/Form/FormError'
import FormInput from '../../../../Common/Form/FormInput';
import '../SettingControl/settingControl.scss';
import MessageDisplay from '../MessageDisplay/MessageDisplay';
import ValidationFile from '../../../../Classes/ValidationFile';
import FormInputWithIcon from '../../../../Common/Form/FormInputWithIcon';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeUserPassword, ChangeUserPasswordReset } from '../../../../store/actions/user';
import { useEffect } from 'react';

const ChangePassword = ({ componentCollap, setComponentCollap }) => {

  let dispatch = useDispatch();

  const { user } = useSelector((state) => {
    return {
      user: state.user,
    }
  })

  const [PasswordArr] = useState([" "]);

  const [passwordCollap, setPasswordCollap] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //error states
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (componentCollap === "delete") {
      setPasswordCollap(false);
    }
  }, [componentCollap])

  const handleCollapsPassword = () => {
    setPasswordCollap(!passwordCollap);
    setComponentCollap("password")
    setNewPassword("");
    setCurrentPassword("");
    setNewPasswordError(false);
    setCurrentPasswordError(false);
    setShowError(false);
    setErrorMessage("");
  }

  const handleCancelButton = () => {
    setPasswordCollap(false);
    setComponentCollap("")
    setNewPassword("");
    setCurrentPassword("");
    setNewPasswordError(false);
    setCurrentPasswordError(false);
    setShowError(false);
    setErrorMessage("");
  }

  const handleInput = (e, type) => {
    let inputvalue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputvalue);

    if (type === "new") {
      setNewPassword(value);
      setNewPasswordError(false);
    }
    else {
      setCurrentPassword(value);
      setCurrentPasswordError(false);
    }
    setShowError(false);
    if (user.error && user.error === true) {
      dispatch(ChangeUserPasswordReset());
    }
  }

  const PasswordScenarios = () => {
    let isValid = true;
    if (currentPassword && newPassword && currentPassword === newPassword) {
      setShowError(true);
      isValid = false;
    }
    return isValid;
  }

  const handleUpdateButton = () => {
    let data = { password: currentPassword }
    let validPassword = PasswordScenarios();
    if (ValidationFile.isEmpty(currentPassword)) {
      setCurrentPasswordError(true);
    }
    if (ValidationFile.isEmpty(newPassword)) {
      setNewPasswordError(true);
    }

    if (ValidationFile.isNotEmpty(currentPassword) && ValidationFile.isNotEmpty(newPassword) && validPassword) {
      dispatch(ChangeUserPassword(data, user._id, user.user_business_type, newPassword));
    }
  }

  useEffect(() => {
    if (user.error && user.error === true) {
      setErrorMessage("Password doesn't exist!");
    }
  }, [setErrorMessage, user.error])

  useEffect(() => {
    if (!user.error) {
      setErrorMessage("");
    }
  }, [user.error])

  useEffect(() => {
    if (user.success && user.success === true) {
      handleCollapsPassword();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.success])

  return (
    <div className='changePassword-wrapper'>
      <p className='text-xs w-500 base '>Change Password</p>
      {
        !passwordCollap && componentCollap !== "password" ? (
          <div className='changePassword-beforeCollp-wrap'>
            <div className='beforeCollp-text-wrap'>
              <p className='text-xxs w-300 base pb-20'>Do you want to change your account password?</p>
            </div>

            <div className='beforeCollp-btn-wrap'>
              <button className='button btn-sm primary w-500 btn-trasp' onClick={() => handleCollapsPassword()}>Change Password</button>
            </div>
          </div>
        ) : (
          <>
            <div className='changePassword-afterCollp-wrap pb-20'>
              <div className='afterCollap-wrap'>
                <div className='afterCollap-form'>
                  <div className="formFieldwrap width-100">
                    <FormInputWithIcon
                      name="currentPassword"
                      value={currentPassword}
                      type="password"
                      onChange={(e) => handleInput(e, "current")}
                      onKeyUp={(e) => handleInput(e, "current")}
                      maxLength={30}
                      labelPosition="top"
                      placeholder="Current Password"
                      onKeyDown={(e) =>
                        PasswordArr.includes(e.key) && e.preventDefault()
                      }
                    />
                    <FormError
                      show={currentPasswordError}
                      error="Current Password required."
                    />
                  </div>
                  {/* 
                   {/* new PAssword */}
                  <div className="formFieldwrap width-100">
                    <FormInputWithIcon
                      name="newPassword"
                      value={newPassword}
                      type="password"
                      onChange={(e) => handleInput(e, "new")}
                      onKeyUp={(e) => handleInput(e, "new")}
                      maxLength={30}
                      labelPosition="top"
                      placeholder="New Password"
                      onKeyDown={(e) =>
                        PasswordArr.includes(e.key) && e.preventDefault()
                      }
                    />
                    <FormError
                      show={newPasswordError}
                      error="New Password required."
                    />
                  </div>
                  <FormError
                    show={showError}
                    error="New Password cannot be same as current password!"
                  />
                  <FormError
                    show={errorMessage === "Password doesn't exist!"}
                    error={errorMessage}
                  />
                </div>
                <div className='afterCollap-btn'>
                  <button className='button btn-xs button-primary' onClick={handleUpdateButton}>Update</button>
                  <button className='button btn-xs button-o-silver' onClick={handleCancelButton}>Cancel</button>
                </div>

                {/* when password is chanaged message will be display */}
                {/* <MessageDisplay type={'success'} text={'Password Updated'} /> */}

              </div>
            </div>
            <div className='cross-icon'>
              <i className='ed-icon i-xs  icon-cross' onClick={handleCancelButton}></i>
            </div>
          </>
        )
      }
      <div className='hr-line'></div>
    </div>
  )
}

export default ChangePassword