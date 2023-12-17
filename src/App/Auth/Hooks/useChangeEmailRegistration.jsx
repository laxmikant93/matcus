import { useState } from 'react'
import Storage from '../../../Classes/Storage';
import { emailSignupData } from "../../../Constant/auth"
import UserRequest from '../../../store/actions/user/UserRequest';

const useChangeEmailRegistration = () => {
  const txtUsingEmail = "Entered email is already in use."; // Text for duplicate email
  const [createAccountLoading, setCreateAccountLoading] = useState(false); // loading states
  const [createAccountError, setCreateAccountError] = useState(null); // error states
  const [createAccountSuccess, setCreateAccountSuccess] = useState(false); // success states

  // Resetting states
  const resetRegistrationStates = () => {
    setCreateAccountLoading(false);
    setCreateAccountError(null);
    setCreateAccountSuccess(false);
  }

  // Create account
  const createAccount = (email) => {
    resetRegistrationStates() // resetting states before request sent
    let userData = Storage.getJson(emailSignupData); // fetch data from local storage
    if (userData.email !== email) {
      userData = { ...userData, email } // New email is updating with previuous data
      setCreateAccountLoading(true); // Enable loading
      UserRequest.register(
        userData.fullName,
        userData.email,
        userData.password,
        userData.role,
        () => {
          Storage.setJson(emailSignupData, userData) // Set updated data in local storage
          setCreateAccountLoading(false)
          setCreateAccountSuccess(true);
        },
        (error) => {
          setCreateAccountLoading(false)
          setCreateAccountError(error.message);
        }
      );
    }
    else {
      setCreateAccountError(txtUsingEmail);
    }

  }
  return [
    createAccountLoading,
    createAccountError,
    createAccountSuccess,
    createAccount
  ]

}

export default useChangeEmailRegistration
