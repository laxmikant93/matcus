import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ValidationFile from '../../../../Classes/ValidationFile';
import FormError from '../../../../Common/Form/FormError'
import FormInput from '../../../../Common/Form/FormInput'
import FormInputWithIcon from '../../../../Common/Form/FormInputWithIcon';
import FormTextArea from '../../../../Common/Form/FormTextArea';
import { DeleteUserInfoReset } from '../../../../store/actions/user';
import AccountPopup from '../AccountPopup/AccountPopup';
import MessageDisplay from '../MessageDisplay/MessageDisplay';
import '../SettingControl/settingControl.scss';

const DeleteAccount = ({ componentCollap, setComponentCollap }) => {

  let dispatch = useDispatch();

  const { user } = useSelector((state) => {
    return {
      user: state.user,
    }
  })

  const [PasswordArr] = useState([" "]);
  const deleteRef = useRef(null);

  const [deleteCollaps, setDeleteCollaps] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //error states
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [reasonError, setReasonError] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (componentCollap === "password") {
      setDeleteCollaps(false);
    }
  }, [componentCollap])

  const handleDeleteCollaps = () => {
    setDeleteCollaps(!deleteCollaps);
    setComponentCollap("delete");
    setConfirmPassword("");
    setCurrentPassword("");
    setReason("");
    setConfirmPasswordError(false);
    setCurrentPasswordError(false);
    setReasonError("");
    setShowError(false);
    setErrorMessage("");
  }

  const handleCancelButton = () => {
    setDeleteCollaps(false);
    setComponentCollap("");
    setConfirmPassword("");
    setCurrentPassword("");
    setReason("");
    setConfirmPasswordError(false);
    setCurrentPasswordError(false);
    setReasonError("");
    setShowError(false);
    setErrorMessage("");
  }

  const handleInput = (e, type) => {
    let inputvalue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputvalue);

    if (type === "confirm") {
      setConfirmPassword(value);
      setConfirmPasswordError(false);
    }
    else if (type === "reason") {
      setReason(value);
      setReasonError(false);
    }
    else {
      setCurrentPassword(value);
      setCurrentPasswordError(false);
    }
    setShowError(false);
    if (user.error && user.error === true) {
      dispatch(DeleteUserInfoReset());
    }
  }

  useEffect(() => {
    if (!user.error) {
      setErrorMessage("");
    }
  }, [user.error])

  const PasswordScenarios = () => {
    let isValid = true;
    if (currentPassword && confirmPassword && currentPassword !== confirmPassword) {
      setShowError(true);
      isValid = false;
    }
    return isValid;
  }

  const handleDeleteButton = () => {
    let validPassword = PasswordScenarios();
    if (ValidationFile.isEmpty(currentPassword)) {
      setCurrentPasswordError(true);
    }

    if (ValidationFile.isEmpty(confirmPassword)) {
      setConfirmPasswordError(true);
    }

    if (ValidationFile.isEmpty(reason)) {
      setReasonError(true);
    }

    if (validPassword && ValidationFile.isNotEmpty(currentPassword) &&
      ValidationFile.isNotEmpty(confirmPassword) && ValidationFile.isNotEmpty(reason)) {
      deleteRef.current.open();
    }
  }

  const closeAccountpopup = () => {
    deleteRef.current.close();
  }
  return (
    <div className='changePassword-wrapper mt-20'>
      <p className='text-xs w-500 base '>Delete Account</p>
      {
        !deleteCollaps && componentCollap !== "delete" ? (
          <div className='changePassword-beforeCollp-wrap'>
            <div className='beforeCollp-text-wrap'>
              <p className='text-xxs w-300 base pb-20'>Do you want to delete your account?</p>
            </div>

            <div className='beforeCollp-btn-wrap'>
              <button className='button btn-sm primary w-500 btn-trasp' onClick={() => handleDeleteCollaps()}>Delete Account</button>
            </div>
          </div>
        ) : (
          <>
            <div className='changePassword-afterCollp-wrap pb-20'>
              <div className='afterCollap-wrap afterCollap-delete'>
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
                </div>
                <div className='textArea-wrap '>
                  <FormTextArea
                    value={reason}
                    onChange={(e) => handleInput(e, "reason")}
                    onKeyUp={(e) => handleInput(e, "reason")}
                    rows={'3'}
                    placeholder={'Write the reason for deleting your account'}
                    label={'Reason:'}
                    labelPosition="top"
                  />
                  <FormError
                    show={reasonError}
                    error="Reason required."
                  />
                </div>
                <FormError
                  show={showError}
                  error="Password Doesn't Match!"
                />
                <FormError
                  show={errorMessage === "Password doesn't exist!"}
                  error={errorMessage}
                />
                <div className='afterCollap-btn'>
                  <button className='button btn-xs button-primary' onClick={handleDeleteButton}>Delete</button>
                  <button className='button btn-xs button-o-silver' onClick={handleCancelButton}>Cancel</button>
                </div>
                {
                  <AccountPopup ref={deleteRef} onclose={closeAccountpopup} type={"Delete"} setErrorMessage={(val) => setErrorMessage(val)}
                    pass={confirmPassword} title={"Close Your Edneed Account?"} text={`You’re about to permanently close your Edneed account 
                    for ${user.user_email}. All your data will be lost. `} />
                }
                {
                  // <MessageDisplay type={'error'} text={'Account Deleted'} />
                }
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

export default DeleteAccount