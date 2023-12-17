import { useState, useEffect } from 'react'
import Request from '../../../Classes/Request';
const EmailVerificationRequest = new Request();
/**
 * 
 * @param {*} email : Email input
 * @description : Hook for email validation
 * @default : undefined
 * @returns : return array of isEmailValid, isEmailError, isEmailLoading, emailMessage, setValidateEmail. Example : [isEmailValid, isEmailError, isEmailLoading, emailMessage, setValidateEmail]
 */

const useEmailSignVerify = (email = undefined) => {
  const textResponse = "Verification link resent";
  const [isEmailValid, setisEmailValid] = useState(false); // Email Validation state and default is false
  const [isEmailError, setIsEmailError] = useState(false); // Error start and default is false
  const [emailMessage, setEmailMessage] = useState(""); // Error message and default is blank
  const [isEmailLoading, setIsEmailLoading] = useState(false); // Loading state for email API request and default is false


  /**
   * 
   * @param {*} emailInput : Email input or string for email validation
   * @default : undefined
   * @description : Business login of email validation
   */
  const setValidateEmail = (emailInput = undefined) => {
    resetEmailVerificationStates() // Resetting all states as default before new request


    if (emailInput && emailInput !== "") { // Check empty email
      setIsEmailLoading(true)

      EmailVerificationRequest.post(
        EmailVerificationRequest.url('authManagement'),
        {
          action: "resendverification",
          email: email || emailInput
        },
        (successResult) => {
          if (successResult.data.status && successResult.data.message === textResponse) {
            setisEmailValid(true)
            setIsEmailLoading(false)
          }
          else {
            setIsEmailError(true)
            setEmailMessage(successResult.data.message)
            setIsEmailLoading(false)
          }
        },
        (errorResult) => {
          setIsEmailError(true)
          setEmailMessage(errorResult.message)
        }

      )
    }
    else {
      setIsEmailError(true)
      setEmailMessage("Invalid email")
    }



  }


  const resetEmailVerificationStates = () => {
    setisEmailValid(false)
    setIsEmailError(false)
    setEmailMessage("");
    setIsEmailLoading(false)
  }

  // Reset the hook states as defaults
  useEffect(() => {
    return resetEmailVerificationStates
  }, [])

  return [
    isEmailValid,
    isEmailError,
    isEmailLoading,
    emailMessage,
    setValidateEmail,
    resetEmailVerificationStates
  ]
}

export default useEmailSignVerify
