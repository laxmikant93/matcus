import Request from "../../../Classes/Request";
import { useState } from "react";
const CommonSignupProcess = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const SignUpRequest = new Request();
  const [verifyOtpoading, setLoading] = useState(false)
  const resetAll = () => {
    setSuccessMessage("")
    setSuccess(false)
    setErrorMessage("")
    setError(false)
    setLoading(false)
  }
  const ContactSignupWithOtpSent = async (contact, country_code) => {


    let action = "checkemail"
    await SignUpRequest.post(SignUpRequest.url("authManagement"), { contact, country_code, action },
      (success) => {
        if (success.data.message === "email is available") {
          SignUpRequest.post(SignUpRequest.url("/authorization-middleware/signup", "middleware"),
            { country_code: country_code, contact: contact, action: "other" },
            (success) => {
              if (success.status === 200 && success.data.Status === "Success") {
                setSuccess(true)
                setSuccessMessage("Otp Sent Successfully")
              } if (success.status === 200 && success.data.message === "Verification link sent") {
                setSuccess(true)
                setSuccessMessage("Otp Sent Successfully")
              } else {
                setError(true)
                setErrorMessage(success.data.Details)
              }
            },
            (error) => {
              setError(true)
              setErrorMessage("There was some error.")
            }
          );
        } else {
          setError(true)
          setErrorMessage(success.data.message)
        }
      },
      (error) => {
        setErrorMessage("There was some error.")
      }
    );
  }
  const EmailSignupWithOtpSent = async (email, fullname) => {
    let action = "checkEmailExist"
    await SignUpRequest.post(SignUpRequest.url("authManagement"), { email, action },
      (success) => {
        if (success.data.message === "email is available") {
          SignUpRequest.post(SignUpRequest.url("/authorization-middleware/signup", "middleware"),
            { email: email.toLowerCase(), fullname: fullname },
            (success) => {
              if (success.status === 200 && (success.data.Status === "Success" || success.data.message === "Verification link sent")) {
                setSuccess(true)
                setSuccessMessage("Verification link sent")
              }
              else {
                setError(true)
                setErrorMessage(success.data.message);
              }
            },
            (error) => {
              setError(true)
              setErrorMessage("There was some error.")
            }
          );
        } else {
          setError(true)
          setErrorMessage(success.data.message)
        }
      },
      (error) => {
        setErrorMessage("There was some error.")
      }
    );
  }

  const verifyContactSignUpOtp = async (data) => {
    setLoading(true)
    await SignUpRequest.post(SignUpRequest.url("/authorization-middleware/signup?otpCheck=true", "middleware"),
      data,
      (success) => {
        if (success.data.status === 201) {
          // Updating states for login
          setSuccessMessage(success.data); // Set response data
          setSuccess(true); // Registration done.
          // Storage.remove(accountStorageData); // Remove prefill data from storage
        } else {
          // Contact Exixt
          if (success.data.message === "Contact Already Exist.") {
            setErrorMessage(success.data.message);
            setError(true)
          }
          else if (success.data.message === "Email Already Exist.") {
            setErrorMessage(success.data.message);
            setError(true)
          }
          else {
            setErrorMessage("Invalid OTP. Please try again");
            setError(true)
          }
          setLoading(false)
          // setRegError(true)
        }
        // setCreateLoading(false);
        // history(`/auth/thank-you/${createAccount.email.value}`);
      },
      () => {
        setLoading(false)
      }
    );
  }
  const verifyEmailSignUpOtp = async (data) => {
    setLoading(true)
    await SignUpRequest.post(SignUpRequest.url("/authorization-middleware/signup?otpCheck=true", "middleware"),
      data,
      (success) => {
        if (success.data.status === 201) {
          // Updating states for login
          setSuccessMessage(success.data); // Set response data
          setSuccess(true); // Registration done.
          // Storage.remove(accountStorageData); // Remove prefill data from storage
        } else {
          // Contact Exixt
          if (success.data.message === "Contact Already Exist.") {
            setErrorMessage(success.data.message);
            setError(true)
          }
          else if (success.data.message === "Email Already Exist.") {
            setErrorMessage(success.data.message);
            setError(true)
          }
          else if (success.data.message === "Error Occured") {
            setErrorMessage("Invalid OTP. Please try again");
            setError(true)
          }
          setLoading(false)
          // setRegError(true)
        }
        // setCreateLoading(false);
        // history(`/auth/thank-you/${createAccount.email.value}`);
      },
      () => {
        setLoading(false)
      }
    );
  }
  return [successMessage, success, errorMessage, error, ContactSignupWithOtpSent, EmailSignupWithOtpSent, resetAll, verifyContactSignUpOtp, verifyOtpoading, verifyEmailSignUpOtp];
}

export default CommonSignupProcess