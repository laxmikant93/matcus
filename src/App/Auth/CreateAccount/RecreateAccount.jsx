import React, { useEffect, useState } from 'react'
import FormInput from "../../../Common/Form/FormInput";
import useEmailVerification from '../Hooks/useEmailVerification';
import FormError from "../../../Common/Form/FormError";
import useChangeEmailRegistration from "../Hooks/useChangeEmailRegistration";
import { useDispatch } from 'react-redux';
import { func } from 'prop-types';
import { showSuccessPopup } from '../../../store/actions/successmessagepopup';
/**
 * 
 * @param {*} onSuccess : onSuccess is s prop that accept the function only and it returns true for success 
 * @description : Create account with another email for email registration process
 */
const RecreateAccount = React.memo(({ onSuccess }) => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("")
  const [creatingAccount, setCreatingAccount] = useState(true);

  // Email verification hook along with states
  const [isEmailValid, isEmailError, isEmailLoading, emailMessage, setValidateEmail] = useEmailVerification()
  // Email registration hook for create a new account with updated email
  const [createAccountLoading, createAccountError, createAccountSuccess, createAccount] = useChangeEmailRegistration()

  if (isEmailValid) {
    if (creatingAccount) {
      setCreatingAccount(false)
      createAccount(email)
    }
  }

  // Handle for submit
  const handleSubmit = (evt) => {
    evt.preventDefault()
    setValidateEmail(email); // Email Validation
  }


  useEffect(() => {
    if (createAccountSuccess) {
      onSuccess({ status: true, email });
      dispatch(showSuccessPopup('confirmation link has been sent successfully !'));
    }
  }, [createAccountSuccess, dispatch, email, onSuccess])


  return (
    <form onSubmit={handleSubmit}>

      <div className="formFieldwrap mt-20">
        <FormInput type="text" label="Email" placeholder="Email" autoCapitalize="off" onKeyUp={(e) => setEmail(e.target.value)} />
        {isEmailLoading && <span className="CoundownOTP">Checking...</span>}
        <FormError
          show={isEmailError}
          error={emailMessage}
        />

        <FormError
          show={createAccountError !== null}
          error={createAccountError}
        />

      </div>
      {
        createAccountLoading ?
          <button
            type="button"
            className="button btn-md button-theme button-block"
            disabled={isEmailLoading}>Processing...</button>
          :
          <button
            type="submit"
            className="button btn-md button-theme button-block"
            disabled={isEmailLoading || isEmailLoading}>Validate</button>
      }
    </form>
  )
})

RecreateAccount.defaultProps = {
  onSuccess: () => { }
}

RecreateAccount.defaultProps = {
  onSuccess: func
}

export default RecreateAccount
