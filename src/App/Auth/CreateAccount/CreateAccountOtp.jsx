/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import UserRequest from "../../../store/actions/user/UserRequest";
import FormInputWithIcon from "../../../Common/Form/FormInputWithIcon";
import ValidationFile from "../../../Classes/ValidationFile";
import FormError from "../../../Common/Form/FormError";
import FormInput from "../../../Common/Form/FormInput";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { string, func } from "prop-types";
import ResendOtp from "../Otp/ResendOtp";
import useEmailVerification from "../Hooks/useEmailVerification";
import useSetLogin from "../Hooks/useSetLogin";
import useSelectedRole from "../Hooks/useSelectedRole";
import Storage from "../../../Classes/Storage";
import { accountStorageData } from "../../../Constant/auth";
import { useCallback } from "react";

const CreateAccountOtp = ({ mobile, countryCode, editAction }) => {
  const [defaultValue, setDefaultValue] = useState(true);
  const [role] = useSelectedRole();
  const [
    isEmailValid,
    isEmailError,
    isEmailLoading,
    emailMessage,
    setValidateEmail,
  ] = useEmailVerification();
  const [createLoading, setCreateLoading] = useState(false);
  const [createAccount, setcreateAccountData] = useState({
    fullName: {
      value: "",
      isValid: false,
    },
    // email: {
    //   value: "",
    //   isValid: false,
    // },
    otp: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
    validation: false,
  });

  const [showLoginError, setShowLoginError] = useState(false);
  const [RegExPassword, setRegExPassword] = useState(false);
  const [regError, setRegError] = useState(null);

  // Successfull registration
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [regResponse, setRegResponse] = useState({});

  useSetLogin(regResponse, isRegistrationSuccess);
  const handleInput = (e) => {

    let inputName = e.target.name;
    let inputValue = e.target.value;
    setRegError(false)
    if (inputName === "password") {

      let createAccountData = {
        ...createAccount,
        [inputName]: {
          value: inputValue.replace(" ", ""),
          isValid: validationConfirm(inputValue.replace(" ", ""), inputName),
        },
        validation: isFormValid(),
      };
      // Storage.setJson(accountStorageData, createAccountData);
      setcreateAccountData(createAccountData);
      setShowLoginError(false);
      setRegExPassword(false);
    } else if (inputName === "otp") {

      if (inputValue.toString().length > 6) {

      } else {

        let createAccountData = {
          ...createAccount,
          [inputName]: {
            value: inputValue,
            isValid: validationConfirm(inputValue, inputName),
          },
          validation: isFormValid(),
        };

        setcreateAccountData(createAccountData);
        setShowLoginError(false);
        setRegExPassword(false);
      }

    } else {

      let createAccountData = {
        ...createAccount,
        [inputName]: {
          value: inputValue.length > 1 ? (inputValue[inputValue.length - 2] === " " && inputValue[inputValue.length - 1] === " " ? createAccount[inputName].value : inputValue) : inputValue.trim(),
          isValid: validationConfirm(inputValue.length > 1 ? (inputValue[inputValue.length - 2] === " " && inputValue[inputValue.length - 1] === " " ? createAccount[inputName].value : inputValue) : inputValue.trim(), inputName),
        },
        validation: isFormValid(),
      };
      // Storage.setJson(accountStorageData, createAccountData);
      setcreateAccountData(createAccountData);
      setShowLoginError(false);
      setRegExPassword(false);
    }
  };

  const isFormValid = () => {
    // return createAccount.email.isValid && createAccount.password.isValid && createAccount.fullName.isValid && createAccount.username.isValid ? true : false;
    return createAccount.password.isValid &&
      createAccount.fullName.isValid &&
      createAccount.otp.isValid ? true
      : false;
  };

  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "fullName":
        return ValidationFile.validEmpty(inputValue);
      // case "role":
      //   return ValidationFile.validEmpty(inputValue);
      case "otp":
        return !isNaN(inputValue) && inputValue.length >= 6;
      // case "email":
      //   return ValidationFile.validEmail(inputValue);
      case "password":

        return ValidationFile.validEmpty(inputValue) && inputValue.length >= 4;
      default:
        return false;
    }
  };
  // Payload for API
  function registrationPayload() {
    return {
      contact: mobile,
      country_code: countryCode,
      otp: createAccount.otp.value,
      fullname: createAccount.fullName.value,
      // email: createAccount.email.value,
      password: createAccount.password.value,
      usertype: role,
    };
  }

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoginError(true);

    if (createAccount.password.value.length > 3) {
      setRegExPassword(false);
      if (createAccount.validation) {
        // && role
        setCreateLoading(true);
        setRegError(null); // Reset error state
        UserRequest.registrationByOtp(
          registrationPayload(),
          (success) => {
            if (success.data.status === 201) {
              // Updating states for login
              setRegResponse(success.data); // Set response data
              setIsRegistrationSuccess(true); // Registration done.
              Storage.remove(accountStorageData); // Remove prefill data from storage
            } else {
              // Contact Exixt
              if (success.data.message === "Contact Already Exist.") {
                setRegError(success.data.message);
              }
              else if (success.data.message === "Email Already Exist.") {
                setRegError(success.data.message);
              }
              else {
                setRegError("Invalid OTP. Please try again");
              }
              setCreateLoading(false);
              // setRegError(true)
            }
            // setCreateLoading(false);
            // history(`/auth/thank-you/${createAccount.email.value}`);
          },
          () => {
            setCreateLoading(false);
          }
        );
      } else {
      }
    } else {
      setRegExPassword(true);
    }
  };

  // Set pre-filled input on create account OTP
  const sePreviousInput = useCallback(() => {
    if (Storage.alive(accountStorageData)) {
      let storageData = Storage.getJson(accountStorageData);
      storageData = {
        ...storageData,
        otp: {
          value: "",
          isValid: false,
        },
        password: {
          value: "",
          isValid: false,
        },
        validation: false,
      };
      // Initiate email validation
      // if (storageData.email.value) {
      //   setValidateEmail(storageData.email.value);
      // }
      setcreateAccountData(storageData);
    }
  }, []);

  // Auto fill the create account form (by OTP)
  useEffect(() => {
    if (defaultValue) {
      setDefaultValue(false);
      sePreviousInput();
    }
  }, [defaultValue, sePreviousInput]);
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      autoCorrect="off"
      spellCheck="off"
      method="post"
    >
      <h1 className="text-sm w-500">Mobile Verification</h1>
      <p className="text-xxs mb-20">We've sent an OTP to your mobile number</p>
      <div className="formFieldwrap">
        <div className="cstmPhoneInput">
          <PhoneInput
            countryCodeEditable={false}
            disabled={true}
            value={`${countryCode}${mobile}`}
            containerClass="form-group"
            inputClass="form-control"
            country={"in"}
            inputProps={{
              name: "phone",
              required: true,
              autoFocus: true,
            }}
            enableSearch
            disableSearchIcon
          />
          <label className="animLabel" htmlFor="mobile_number">
            Mobile Number
          </label>
          <button
            className="btnText primary InputOverlayRightAlign"
            onClick={editAction}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="formFieldwrap">
        <FormInput
          className={
            !createAccount.otp.isValid && showLoginError ? "errorInput" : ""
          }
          name="otp"
          onKeyUp={handleInput}
          onChange={handleInput}
          type="number"
          value={createAccount.otp.value}
          onWheel={(e) => e.target.blur()}
          label="One time Password"
          placeholder="One time Password"
          autoCapitalize="off"
          onKeyDown={(e) =>
            symbolsArr.includes(e.key) && e.preventDefault()}
        />

        <ResendOtp countrycode={countryCode} mobile={mobile} />
        <FormError
          show={!createAccount.otp.isValid && showLoginError}
          error="OTP is required"
        />
      </div>
      <div className="formFieldwrap">
        <FormInput
          className={
            !createAccount.fullName.isValid && showLoginError
              ? "errorInput"
              : ""
          }
          value={createAccount.fullName.value}
          name="fullName"
          type="text"
          label="Full name"
          placeholder="Full name"
          onChange={handleInput}
          onKeyUp={handleInput}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="off"
        />
        <FormError
          show={!createAccount.fullName.isValid && showLoginError}
          error="Full Name required."
        />
      </div>
      {/* 
      <div className="formFieldwrap">
        <FormInput
          className={
            !createAccount.email.isValid && showLoginError ? "errorInput" : ""
          }
          name="email"
          defaultValue={createAccount.email.value}
          type="email"
          label="Email"
          placeholder="Email"
          onChange={handleInput}
          onKeyUp={handleInput}
          onBlur={(evt) => setValidateEmail(evt.target.value)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="off"
        />
        {isEmailLoading && <span className="CoundownOTP">Checking...</span>}
        <FormError
          show={!createAccount.email.value && showLoginError}
          error="Email is required"
        />

        <FormError
          show={
            !createAccount.email.isValid &&
            createAccount.email.value &&
            showLoginError
          }
          error="Email is Invalid."
        />

        <FormError show={isEmailError} error={emailMessage} />
      </div> */}
      <div className="formFieldwrap">
        <FormInputWithIcon
          className={
            !createAccount.password.isValid && showLoginError
              ? "errorInput"
              : ""
          }
          value={createAccount.password.value}
          name="password"
          type="text"
          label="Password"
          placeholder="Password"
          onKeyUp={handleInput}
          onChange={handleInput}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="off"
        />
        <FormError
          show={!createAccount.password.isValid && showLoginError && createAccount.password.value === ""}
          error="Password required."
        />
        <FormError
          show={RegExPassword && !createAccount.password.isValid && createAccount.password.value !== ""}
          error="Min. 4 characters should be there."
        />
        <FormError show={!role && showLoginError} error="Role is required." />

        <FormError show={regError !== null} error={regError} />
      </div>


      <div className="row">
        <div className="col-xs-12">
          {createLoading ? (
            <button type="button" className="button btn-md button-theme button-block">
              Loading...
            </button>
          ) : (
            <>
              <button
                type="submit"
                className="button btn-md button-theme button-block"
                disabled={isEmailLoading}
              >
                Agree & Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

CreateAccountOtp.defaultProps = {
  mobile: undefined,
  editAction: () => { },
  countryCode: "91",
};

CreateAccountOtp.propTypes = {
  mobile: string.isRequired,
  editAction: func,
  countryCode: string.isRequired,
};

export default CreateAccountOtp;
