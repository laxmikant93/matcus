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

const useProfileEmailVerify = () => {
  const [emailValid, setisEmailValid] = useState(false); // Email Validation state and default is false
  const [emailError, setIsEmailError] = useState(false); // Error start and default is false
  const [emailLoading, setIsEmailLoading] = useState(false); // Loading state for email API request and default is false


  /**
   * 
   * @param {*} emailInput : Email input or string for email validation
   * @default : undefined
   * @description : Business login of email validation
   */
  const validateEmail = (oldemail, newemail) => {
    resetVerification() // Resetting all states as default before new request

    if (oldemail && newemail !== "") { // Check empty email
      setIsEmailLoading(true)
      EmailVerificationRequest.post(
        EmailVerificationRequest.url('authService/accountverification'),
        {
          oldemail: oldemail,
          newemail: newemail
        },
        (successResult) => {
          if (successResult.status === 200) {
            setisEmailValid(true)
            setIsEmailLoading(false)
          }
          else {
            setIsEmailError(true)
            setIsEmailLoading(false)
          }
        },
        (errorResult) => {
          setIsEmailError(true)
          setIsEmailLoading(false)
        }

      )
    }
    else {
      setIsEmailError(true)
    }
  }


  const resetVerification = () => {
    setisEmailValid(false)
    setIsEmailError(false)
    setIsEmailLoading(false)
  }

  // Reset the hook states as defaults
  useEffect(() => {
    return resetVerification
  }, [])

  return [
    emailValid,
    emailError,
    emailLoading,
    validateEmail,
    resetVerification
  ]
}

export default useProfileEmailVerify
