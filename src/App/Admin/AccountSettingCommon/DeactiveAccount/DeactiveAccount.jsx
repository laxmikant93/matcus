import React from 'react'
import { useRef } from "react";
import { useState } from 'react';
import { useStackState } from 'rooks'
import ValidationFile from '../../../../Classes/ValidationFile';
import FormError from '../../../../Common/Form/FormError'
import FormInput from '../../../../Common/Form/FormInput';
import FormInputWithIcon from '../../../../Common/Form/FormInputWithIcon';
import AccountPopup from '../AccountPopup/AccountPopup';
import MessageDisplay from '../MessageDisplay/MessageDisplay';
import '../SettingControl/settingControl.scss';

const DeactiveAccount = () => {

  const [PasswordArr] = useState([" "]);
  const deactivateRef = useRef(null);

  const [deactiveCollaps, setDeactiveCollaps] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //error states
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [showError, setShowError] = useState(false);


  const handleDeactiveCollaps = () => {
    setDeactiveCollaps(!deactiveCollaps);
    setConfirmPassword("");
    setCurrentPassword("");
    setConfirmPasswordError(false);
    setCurrentPasswordError(false);
    setShowError(false);
  }


  const handleInput = (e, type) => {
    let inputvalue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputvalue);

    if (type === "confirm") {
      setConfirmPassword(value);
      setConfirmPasswordError(false);
    }
    else {
      setCurrentPassword(value);
      setCurrentPasswordError(false);
    }
    setShowError(false);
  }


  const PasswordScenarios = () => {
    let isValid = true;
    if (currentPassword && confirmPassword && currentPassword !== confirmPassword) {
      setShowError(true);
      isValid = false;
    }
    return isValid;
  }


  const handleDeactivateButton = () => {
    let validPassword = PasswordScenarios();
    if (ValidationFile.isEmpty(currentPassword)) {
      setCurrentPasswordError(true);
    }

    if (ValidationFile.isEmpty(confirmPassword)) {
      setConfirmPasswordError(true);
    }

    if (validPassword && ValidationFile.isNotEmpty(currentPassword) && ValidationFile.isNotEmpty(confirmPassword)) {
      deactivateRef.current.open();
    }
  }

  const closeAccountpopup = () => {
    deactivateRef.current.close();
  }


  return (
    <div className='changePassword-wrapper mt-20'>
      <p className='text-xs w-500 base '>Deactivate Account</p>
      {
        !deactiveCollaps ? (
          <div className='changePassword-beforeCollp-wrap'>
            <div className='beforeCollp-text-wrap'>
              <p className='text-xxs w-300 base pb-20'>Do you want to deactivate your account?</p>
            </div>

            <div className='beforeCollp-btn-wrap'>
              <button className='button btn-sm primary w-500 btn-trasp' onClick={() => handleDeactiveCollaps()}>Deactivate Account</button>
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
                  {/*  confirm Password */}
                  <div className="formFieldwrap width-100">
                    <FormInputWithIcon
                      name="confirm_Passowrd"
                      value={confirmPassword}
                      type="password"
                      onChange={(e) => handleInput(e, "confirm")}
                      onKeyUp={(e) => handleInput(e, "confirm")}
                      maxLength={30}
                      labelPosition="top"
                      placeholder="Confirm Password"
                      onKeyDown={(e) =>
                        PasswordArr.includes(e.key) && e.preventDefault()
                      }
                    />
                    <FormError
                      show={confirmPasswordError}
                      error="Please enter password."
                    />
                  </div>
                  <FormError
                    show={showError}
                    error="Password Doesn't Match!"
                  />
                </div>
                <div className='afterCollap-btn'>
                  <button className='button btn-xs button-primary' onClick={handleDeactivateButton}>Deactivate</button>
                  <button className='button btn-xs button-o-silver' onClick={handleDeactiveCollaps}>Cancel</button>

                </div>
                {
                  <AccountPopup ref={deactivateRef} onclose={closeAccountpopup} type={"Deactivate"} pass={confirmPassword}
                    title={"Deactivate Account"} text={"Do you wish to deactivate your account?"} />
                }
                {/* when account is deactive show this message */}
                {/* <MessageDisplay type={'error'} text={'Account Deactivated'} /> */}
              </div>
            </div>
            <div className='cross-icon'>
              <i className='ed-icon i-xs  icon-cross' onClick={handleDeactiveCollaps}></i>
            </div>
          </>
        )
      }
      <div className='hr-line'></div>
    </div>
  )
}

export default DeactiveAccount