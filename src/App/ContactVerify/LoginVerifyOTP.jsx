import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../Common/Form/FormInput";
import useDownTimer from "../Auth/Hooks/useTimer";
import FormError from "../../Common/Form/FormError";
import { postOtpRequestReset, postOtpValidate, postOtpRequest } from "../../store/actions/verifycontact";

const LoginVerifyOTP = ({ contactNumber, ContactVerifySkip,
  countryCode,
  SameNumberToggle, ChangeContact, whatsappcontactNumber, whatsappCountryCode }) => {

  const dispatch = useDispatch();

  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);
  const [startOtpTimer, setStartOtpTimer] = useState(false);
  const [timer, setTimer] = useDownTimer();
  const [otpError, setOtpError] = useState(false);
  const [otpMismatchError, setOtpMismatchError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [otpInput, setOtpInput] = useState("");

  const {
    otpVerifySuccess,
    otpVerifyError,
    otpSendSuccess,
    otpVerifyLoading,
    users,
  } = useSelector((state) => {
    return {
      users: state.user,
      otpVerifySuccess: state.verifycontact.otpVerify.success,
      otpVerifyLoading: state.verifycontact.otpVerify.loading,
      otpSendSuccess: state.verifycontact.OtpRequest.success,
      otpVerifyError: state.verifycontact.otpVerify.error,
    };
  });
  useEffect(() => {
    return () => {
      setOtpError(false);
      setSubmitted(false);
      setStartOtpTimer(false);
      setOtpInput("");
      setOtpMismatchError(false);
    };
  }, []);

  useEffect(() => {
    if (!startOtpTimer) {
      setStartOtpTimer(true);
      setTimer(60);
    }
  }, [setTimer, startOtpTimer]);

  useEffect(() => {
    if (otpVerifyError) {
      setOtpMismatchError(true);
    }
  }, [otpVerifyError]);

  const handelOtpInput = (e) => {
    let Value = e.target.value;
    setOtpInput(Value);
    setSubmitted(false);
  };

  const ResendOtp = () => {
    dispatch(postOtpRequest(otpRequestData()));
  };
  const otpRequestData = () => {
    return {
      contact: contactNumber,
      country_code: countryCode,
      userId: users._id,
    };
  };

  useEffect(() => {
    if (otpVerifySuccess) {
      ContactVerifySkip();
    }
  }, [ContactVerifySkip, otpVerifySuccess]);

  const submitOtpValidate = () => {
    setSubmitted(true);
    if (otpInput) {
      if (SameNumberToggle) {
        dispatch(postOtpValidate(otpVerifyData()));
      } else {
        dispatch(postOtpValidate(otpVerifyDataWhatsapp()));
      }
    } else {
      setOtpError(true);
    }
  };

  const otpVerifyData = () => {
    return {
      "userId": users._id,
      "country_code": countryCode,
      "contact": contactNumber,
      "otp": otpInput,
      "whatsapp_country_code": countryCode,
      "whatsapp_contact": contactNumber,
    }
  }

  const otpVerifyDataWhatsapp = () => {
    return {
      "userId": users._id,
      "country_code": countryCode,
      "contact": contactNumber,
      "otp": otpInput,
      "whatsapp_country_code": whatsappCountryCode,
      "whatsapp_contact": whatsappcontactNumber,
    }
  }

  useEffect(() => {
    if (otpSendSuccess) {
      setTimer(60);
      dispatch(postOtpRequestReset());
    }
  }, [dispatch, otpSendSuccess, setTimer]);

  return (
    <div className="LoginMobileVerification">
      <div className="MobileVerificationCst mt-20">
        <div className="LoginOTPVerificationTop">
          <p className="text-sm">OTP Verification</p>
          <p className="text-xxs">Please enter the one-time password sent to</p>
          <p className="text-xxs">
            {countryCode}{contactNumber}
            &nbsp;
            <span className="underline primary" onClick={() => ChangeContact()}>
              Change
            </span>
          </p>
        </div>
        <div className="formFieldwrap LoginVerifyFieldWrap">
          <FormInput
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
            type="number"
            label="One time password"
            placeholder="One time password"
            maxLength="5"
            onKeyUp={handelOtpInput}
          />
          <FormError
            show={otpError && submitted}
            error="OTP is required."
          ></FormError>
          <FormError
            show={otpMismatchError && submitted}
            error="Incorrect OTP or expired."
          ></FormError>
          {timer === "0s" ? (
            <div className="ResendOTP text-left" onClick={() => ResendOtp()}>
              <p className="base">Haven't received the code yet?</p>
              <p className="underline priamry w-600">ResendOTP</p>
            </div>
          ) : (
            <div className="CoundownOTP text-left">
              <p className="base">Haven't received the code yet?</p>
              <p className="base">
                You can request a new one in&nbsp;
                <span className="red">{timer}</span>
              </p>
            </div>
          )}
        </div>

        {otpVerifyLoading ? (
          <button className="button btn-md button-theme button-block">
            Validating...
          </button>
        ) : (
          <button
            className="button btn-md button-theme button-block"
            onClick={submitOtpValidate}
          >
            Validate & Continue
          </button>
        )}
        <p
          className="SkipVerificationText underline text-xxs primary"
          onClick={() => ContactVerifySkip()}
        >
          Skip for now. I will complete verification later
        </p>
      </div>
    </div>
  );
};

export default LoginVerifyOTP;
