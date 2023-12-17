import Request from "../../../../Classes/Request";
import { useState } from "react";
import AppLinkUrl from "../../../../Common/AppLink/AppLinkUrl";
const CustomerSignupProcess = () => {
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
  const ContactSignupWithOtpSent = async (type, contact, country_code, fullName, password) => {


    let action = "checkemail"
    await SignUpRequest.post(SignUpRequest.url(`/${type}-authorization/signup?${AppLinkUrl.subdomain() ? "subdomain" : "domain"}=${AppLinkUrl.subdomain() ? AppLinkUrl.subdomain() : AppLinkUrl.getHost()}`, `${type === "e" ? "ecommerce" : ""}`), { contact, country_code, fullName, password, action },
      (success) => {
        if (success.data.message === "Verification link sent") {
          // SignUpRequest.post(SignUpRequest.url(`/e-authorization/signup?subdomain=${AppLinkUrl.subdomain()}`),
          //   { country_code: country_code, contact: contact, fullName: fullName, password: password, action: "other" },
          //   (success) => {
          //     if (success.status === 200 && success.data.Status === "Success") {
          //       setSuccess(true)
          //       setSuccessMessage("Otp Sent Successfully")
          //     } if (success.status === 200 && success.data.message === "Verification link sent") {
          //       setSuccess(true)
          //       setSuccessMessage("Otp Sent Successfully")
          //     } else {
          //       setError(true)
          //       setErrorMessage(success.data.Details)
          //     }
          //   },
          //   (error) => {
          //     setError(true)
          //     setErrorMessage("There was some error.")
          //   }
          // );
          setSuccess(true)
          setSuccessMessage("Otp Sent Successfully")
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
  const EmailSignupWithOtpSent = async (type, email, fullName, password) => {
    let action = "checkEmailExist"
    await SignUpRequest.post(SignUpRequest.url(`/${type}-authorization/signup?${AppLinkUrl.subdomain() ? "subdomain" : "domain"}=${AppLinkUrl.subdomain() ? AppLinkUrl.subdomain() : AppLinkUrl.getHost()}`, `${type === "e" ? "ecommerce" : ""}`), { email, fullName, password, action },
      (success) => {
        if (success.data.message === "email is taken") {
          // SignUpRequest.post(SignUpRequest.url(`/e-authorization/signup?subdomain=${AppLinkUrl.subdomain()}`),
          //   { email: email, fullName: fullName, password: password, },
          //   (success) => {
          //     if (success.status === 200 && (success.data.Status === "Success" || success.data.message === "Verification link sent")) {
          //       setSuccess(true)
          //       setSuccessMessage("Verification link sent")
          //     } else {
          //       setError(true)
          //       setErrorMessage("There was some error.")
          //       // setErrorMessage("There was some error.")
          //     }
          //   },
          //   (error) => {
          //     setError(true)
          //     setErrorMessage("There was some error.")
          //   }
          // );
          setError(true)
          setErrorMessage(success.data.message)
        } else {
          setSuccess(true)
          setSuccessMessage("Verification link sent")
        }
      },
      (error) => {
        setErrorMessage("There was some error.")
      }
    );
  }

  const verifyContactSignUpOtp = async (type, data) => {
    setLoading(true)
    await SignUpRequest.post(SignUpRequest.url(`/${type}-authorization/signup?${AppLinkUrl.subdomain() ? "subdomain" : "domain"}=${AppLinkUrl.subdomain() ? AppLinkUrl.subdomain() : AppLinkUrl.getHost()}&otpCheck=true`, `${type === "e" ? "ecommerce" : ""}`),
      data,
      (success) => {
        if (success.status === 200 && success.data.data) {
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
  const verifyEmailSignUpOtp = async (type, data) => {
    setLoading(true)
    await SignUpRequest.post(SignUpRequest.url(`/${type}-authorization/signup?${AppLinkUrl.subdomain() ? "subdomain" : "domain"}=${AppLinkUrl.subdomain() ? AppLinkUrl.subdomain() : AppLinkUrl.getHost()}&otpCheck=true`, `${type === "e" ? "ecommerce" : ""}`),
      data,
      (success) => {
        if (success.status === 200 && success.data.data) {
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
            // setErrorMessage(success.data.message);
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

export default CustomerSignupProcess