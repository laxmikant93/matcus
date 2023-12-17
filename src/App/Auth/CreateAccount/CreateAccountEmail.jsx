import React, { useState } from 'react'
import UserRequest from "../../../store/actions/user/UserRequest";
import FormInputWithIcon from "../../../Common/Form/FormInputWithIcon";
import ValidationFile from "../ValidationFile";
import FormError from "../../../Common/Form/FormError";
import { useNavigate } from 'react-router-dom';
import FormInput from '../../../Common/Form/FormInput';
import Storage from '../../../Classes/Storage';
import { emailSignupData } from '../../../Constant/auth';

const CreateAccountEmail = ({ role }) => {
  const history = useNavigate();
  const [createLoading, setCreateLoading] = useState(false);
  const [createAccount, setcreateAccountData] = useState({
    fullName: {
      value: "",
      isValid: false,
    },

    email: {
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
  const [regiterError, setregisterError] = useState(false);
  const [regiterInvalidEmailError, setRegisterInvalidEmailError] = useState(false);
  const [RegExPassword, setRegExPassword] = useState(false);
  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    // if(inputName==="username")
    // {
    //     inputValue=inputValue.toLowerCase();
    // }
    // else{

    // }
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
    setregisterError(false);
    setRegExPassword(false);
    setRegisterInvalidEmailError(false);
  };

  const isFormValid = () => {
    // return createAccount.email.isValid && createAccount.password.isValid && createAccount.fullName.isValid && createAccount.username.isValid ? true : false;
    return createAccount.email.isValid &&
      createAccount.password.isValid &&
      createAccount.fullName.isValid
      ? true
      : false;
  };

  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "fullName":
        return ValidationFile.validEmpty(inputValue);
      case "role":
        return ValidationFile.validEmpty(inputValue);
      case "email":
        return ValidationFile.validEmail(inputValue);
      case "password":
        return ValidationFile.validEmpty(inputValue);
      default:
        return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoginError(true);
    if (createAccount.password.value.length > "3") {
      setRegExPassword(false);
      if (createAccount.validation && role) {
        setCreateLoading(true);

        // Email registration data
        const emailRegData = {
          fullName: createAccount.fullName.value,
          role: role,
          email: createAccount.email.value,
          password: createAccount.password.value
        };

        Storage.setJson(emailSignupData, emailRegData) // Set email registration data

        UserRequest.register(
          createAccount.fullName.value,
          createAccount.email.value,
          createAccount.password.value,
          role,
          (success) => {

            if (success.data._id) {
              history(`/auth/thank-you`);
            }

            if (success.data.errorShow.includes(" email. Please recheck and enter again")) {
              setRegisterInvalidEmailError(true)
            }

            if (success.data.errorShow.includes(" already been taken")) {
              setregisterError(true);
            }

            setCreateLoading(false);
          },
          () => {

          }
        );
      } else {
      }
    } else {
      setRegExPassword(true);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      autoCorrect="off"
      spellCheck="off"
      method="post"
    >
      <div className="SignUp_Email">
        <div className="formFieldwrap">
          <FormInput
            className={
              !createAccount.fullName.isValid && showLoginError
                ? "errorInput"
                : ""
            }
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

        <div className="formFieldwrap">
          <FormInput
            className={
              !createAccount.email.isValid && showLoginError
                ? "errorInput"
                : ""
            }
            name="email"
            type="email"
            label="Email"
            placeholder="Email"
            onChange={handleInput}
            onKeyUp={handleInput}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="off"
          />
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

          <FormError
            show={regiterError && showLoginError}
            error="This email is taken, please try another email"
          />
          <FormError
            show={regiterInvalidEmailError && showLoginError}
            error="Please recheck email and enter again"
          />
        </div>
        <div className="formFieldwrap">
          <FormInputWithIcon
            className={
              !createAccount.password.isValid && showLoginError
                ? "errorInput"
                : ""
            }
            name="password"
            type="password"
            label="Password"
            minLength="4"
            placeholder="Password"
            minlength="4"
            onKeyUp={handleInput}
            onChange={handleInput}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="off"
          />
          <FormError
            show={!createAccount.password.isValid && showLoginError}
            error="Password required."
          />
          <FormError
            show={RegExPassword && createAccount.password.isValid}
            error="Min. 4 characters should be there."
          />
        </div>
        <FormError
          show={!role && showLoginError}
          error="Role is required."
        />
        <div className="row">
          <div className="col-xs-12">
            {createLoading ? (
              <button
                type="button"
                className="button btn-md button-theme button-block"
              >
                Loading...
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  className="button btn-md button-theme button-block"
                >
                  Agree & Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}

export default CreateAccountEmail
