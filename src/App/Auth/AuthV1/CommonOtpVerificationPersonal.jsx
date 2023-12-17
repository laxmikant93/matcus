import Request from "../../../Classes/Request";
import { useState } from "react";
const CommonOtpVerificationPersonal = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const SignUpRequest = new Request();
  const [verifyOtpLoading, setverifyOtpLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const resetAll = () => {
    setSuccessMessage("")
    setSuccess(false)
    setErrorMessage("")
    setError(false)
    setverifyOtpLoading(false)
    setLoading(false)
  }
  const sendEmailVerificationMail = async (data) => {
    setLoading(true)
    await SignUpRequest.post(SignUpRequest.url("/authorization-middleware/userverification", "middleware"),
      { email: data.email },
      (success) => {
        if (success.data === "Email Not Available") {
          setErrorMessage(success.data);
          setError(true)
          setLoading(false)
        }
        else {
          // SignUpRequest.post(SignUpRequest.url("/authorization-middleware/userverification"),
          //   { newMail: data.email },
          //   (success) => {
          //     setLoading(false)
          //     setSuccessMessage(success.data); // Set response data
          //     setSuccess(true);
          //   }, (error) => {
          //     setLoading(false)
          //     setErrorMessage("Invalid Email Please try again.");
          //     setError(true)
          //   }
          // )
          setLoading(false)
          setSuccessMessage(success.data); // Set response data
          setSuccess(true);
        }
      },
      (error) => {
        setLoading(false)
        setErrorMessage("Invalid OTP. Please try again");
        setError(true)
      }
    );
  }

  const sendContactVerificationOtp = async (data) => {
    setLoading(true)
    await SignUpRequest.post(SignUpRequest.url("/authorization-middleware/userverification", "middleware"),
      { contact: data.contact, country_code: data.country_code },
      (success) => {

        if (success.data === "Otp Sent") {
          // SignUpRequest.post(SignUpRequest.url("/authorization-middleware/userverification"),
          //   { country_code: data.country_code, contact: data.contact, },
          //   (success) => {
          //     setLoading(false)
          //     setSuccessMessage(success.data); // Set response data
          //     setSuccess(true);
          //   }, 
          //   (error) => {
          //     setSuccess(false);
          //     setLoading(false)
          //     setErrorMessage("Invalid Contact Please try again");
          //     setError(true)
          //   }
          // )
          // // setSuccessMessage(success.data.message); // Set response data
          // // setSuccess(true);
          setLoading(false)
          setSuccessMessage(success.data); // Set response data
          setSuccess(true);
        }
        else {
          setSuccess(false);
          setLoading(false)
          setErrorMessage(success.data);
          setError(true)
        }
      },
      (error) => {
        setLoading(false)
        setErrorMessage("Invalid contact.");
        setError(true)
        setSuccess(false);
      }
    );
  }
  const VerifyEmailMail = async (data) => {
    setverifyOtpLoading(true)
    await SignUpRequest.post(SignUpRequest.url("/authorization-middleware/userverification?otpCheck=true", "middleware"),
      { email: data.email, otp: data.otp },
      (success) => {
        if (success.data === "Verification Successfull") {
          setSuccessMessage(success.data); // Set response data
          setSuccess(true);
          setverifyOtpLoading(false)
        } else {
          setErrorMessage("Invalid OTP. Please try again");
          setError(true);
          setverifyOtpLoading(false);
        }

      }, (error) => {
        setverifyOtpLoading(false);
        setErrorMessage("Invalid OTP. Please try again");
        setError(true);
      }
    )
  }
  const VerifyContactOtp = async (data) => {
    setverifyOtpLoading(true)
    await SignUpRequest.post(SignUpRequest.url("/authorization-middleware/userverification?otpCheck=true", "middleware"),
      { contact: data.contact, country_code: data.country_code, otp: data.otp },
      (success) => {
        if (success.data === "Verification Successfull") {
          setSuccessMessage(success.data); // Set response data
          setSuccess(true);
          setverifyOtpLoading(false)
        } else {
          setverifyOtpLoading(false)
          setErrorMessage("Invalid OTP. Please try again");
          setError(true)
          setSuccess(false);
        }

      }, (error) => {
        setverifyOtpLoading(false)
        setErrorMessage("Invalid OTP. Please try again");
        setError(true)
        setSuccess(false);
      }
    )
  }
  return [successMessage, success, errorMessage, error, resetAll, verifyOtpLoading, loading, sendEmailVerificationMail, VerifyEmailMail, sendContactVerificationOtp, VerifyContactOtp];
}

export default CommonOtpVerificationPersonal