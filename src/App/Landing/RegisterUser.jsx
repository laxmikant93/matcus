/* eslint-disable no-unused-vars */
// ALL THE DEPENDENCIES AND UTILITY REQUIRED FOR THIS COMPONENT
import React, { useState, useEffect, useCallback } from "react";
import FormInput from "../../Common/Form/FormInput";
import FormError from "../../Common/Form/FormError";
import FormInputWithIcon from "../../Common/Form/FormInputWithIcon";
import UserRequest from "../../store/actions/user/UserRequest";
import SessionStorage from "../../Classes/SessionStorage";
import ValidationFile from "../Auth/ValidationFile";
import Card from "../../Common/Card";
import CardBody from "../../Common/Card/CardBody";
import "./RegisterUser.scss";
import PhoneInput from "react-phone-input-2";
import FailIcon from "./fail.svg";
import SuccessIcon from "./success.svg";
import Request from "../../Classes/Request";
import AppLinkUrl from "../../Common/AppLink/AppLinkUrl";
import AppLink from "../../Common/AppLink";

// FUNCTIONAL COMPONENT RECIEVING PROPS FOR  USER REGISTRATION

const RegisterUser = ({
  submitRegisterUser,
  ChangeSubmitValidationCheck,
  regUserData,
}) => {
  const OtpRequest = new Request();
  // LOCAL STATE VARIBALE FOR USER REGISTRATION
  const [showLoginError, setShowLoginError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [verifyOtpEnter, setVerifyOtpEnter] = useState(false);
  const [createAccount, setcreateAccountData] = useState({
    fullName: {
      value: "",
      isValid: false,
    },
    contact: {
      value: "",
      isValid: false,
    },
    country_code: {
      value: "",
      isValid: true,
    },
    email: {
      value: "",
      isValid: true,
    },
    password: {
      value: "",
      isValid: false,
    },
    validation: false,
  });

  // useEffect(() => {
  //   if (SessionStorage.alive(registrationWorkDone)) {
  //     if (SessionStorage.getBool(registrationWorkDone) === "true") {
  //       setDisableTrue(true)
  //     }
  //   }
  // }, [])

  useEffect(() => {
    if (submitRegisterUser) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitRegisterUser]);

  // RETURN TRUE FOR VALID FORM DATA AND FALSE FOR INVALID FORM DATA
  const isFormValid = useCallback(() => {
    return createAccount.contact.isValid &&
      createAccount.password.isValid &&
      createAccount.country_code.isValid &&
      createAccount.fullName.isValid &&
      createAccount.email.isValid
      ? true
      : false;
  }, [createAccount]);

  // HANDLING FORM INPUT TO STATE VARIABLE

  // const [showFormError, setShowFormError] = useState(false);

  const handleInput = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setShowLoginError(false)
    if (inputName === "email" && inputValue === "") {
      const createAccountData = {
        ...createAccount,
        [inputName]: {
          value: inputValue.trim(),
          isValid: true,
        },
        validation: isFormValid(),
      };
      setEmailError(false);
      setShowLoginError(false);
      setEmailSuccess(false);
      setVerifyOtpShow(false)
      setSendOtpLoading(false)
      setOtpInvalid(false)
      setVerifyOtpEnter(false)
      setcreateAccountData(createAccountData);
    } else {
      const createAccountData = {
        ...createAccount,
        [inputName]: {
          value: inputValue.length > 1 ? (inputValue[inputValue.length - 2] === " " && inputValue[inputValue.length - 1] === " " ? createAccount[inputName].value : inputValue) : inputValue.trim(),
          isValid: validationConfirm(inputValue.length > 1 ? (inputValue[inputValue.length - 2] === " " && inputValue[inputValue.length - 1] === " " ? createAccount[inputName].value : inputValue) : inputValue.trim(), inputName),
        },
        validation: isFormValid(),
      };
      setEmailError(false);
      setShowLoginError(false);
      setEmailSuccess(false);
      setVerifyOtpShow(false)
      setSendOtpLoading(false)
      setOtpInvalid(false)
      setVerifyOtpEnter(false)
      setcreateAccountData(createAccountData);
      ChangeSubmitValidationCheck();

    }

  };

  // let passwordRegEx = ["!", "@", "#", "$", "?", "%", "&", "*", "/", "|", "+"];
  // const passwordRegExCheck = (inputValue) => {
  //   for (let i = 0; i < inputValue.split("").length; i++) {
  //     if (passwordRegEx.includes(inputValue.split("")[i])) {
  //       return false
  //     } else {

  //     }
  //   }
  //   return true
  // }
  // IT CHECK FOR VALIDATION REQUIRED FIELD IN FORM
  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "fullName":
        return ValidationFile.validEmpty(inputValue);
      case "password":

        return inputValue.length > 3 && !checkSpaces()
      case "email":
        return ValidationFile.validEmail(inputValue)
      default:
        break;
    }
  };

  // VALIDATION FOR RESTRICTING SPACE
  const checkSpaces = () => {
    const val = createAccount.password.value;
    const space = val.split(" ");
    if (space.length > 1) {
      return true;
    }
  };

  // RETURNS INSTITUTE USER DATA IN OBJECT
  const getUserData = () => {
    return {
      fullname: createAccount.fullName.value,
      contact: createAccount.contact.value,
      country_code: createAccount.country_code.value,
      password: createAccount.password.value,
      email: createAccount.email.value,
    };
  };

  // const [mainVerifyOtp, setMainVerifyOtp] = useState(false)
  // FINAL FORM SUBMIT HANDLER
  const handleSubmit = () => {
    setShowLoginError(true);
    setOtpInvalid(false)
    if (verifyOtpEnter) {
      onSubmitOtp()
    } else {
      setOtpValue("")
      const isValid = isFormValid();
      if (isValid) {
        setSendOtpLoading(true)
        UserRequest.signupInfoCheck(
          createAccount.contact.value,
          createAccount.country_code.value,
          createAccount.email.value,
          (success) => {
            if (success.data.message === "contact is available") {
              OtpRequest.post(
                OtpRequest.url("authService/sendotp"),
                { country_code: createAccount.country_code.value, contact: createAccount.contact.value, action: "other" },
                (success) => {
                  if (success.status === 200 && success.data.Status === "Success") {
                    setVerifyOtpShow(!verifyyOtpShow)
                    // setMainVerifyOtp(true)
                    ChangeSubmitValidationCheck();
                    setVerifyOtpEnter(true)
                    // setEmailSuccess(true);
                    // const userData = getUserData();
                    // SessionStorage.setJson("UserRegistration", userData);
                    // regUserData();

                  } else {
                    setSendOtpLoading(false)
                    setEmailError(true);
                    ChangeSubmitValidationCheck();
                  }
                },
                (error) => {
                  setSendOtpLoading(false)
                  setEmailError(true);
                  ChangeSubmitValidationCheck();
                }
              );

            } else {
              if (success.data.message === "contact is taken") {
                setContactTaken(true)
                setSendOtpLoading(false);
                setEmailError(false);
                ChangeSubmitValidationCheck();
              }
              if (success.data.message === "email is taken") {
                setSendOtpLoading(false)
                setEmailError(true);
                setContactTaken(false)
                ChangeSubmitValidationCheck();
              }
            }
          },
          (error) => {
            ChangeSubmitValidationCheck();
          }
        );
      } else {
        ChangeSubmitValidationCheck();
        setSendOtpLoading(false)
      }
    }
  };

  // FINAL SUBMIT METHOD IS INVOKED IF CONTINUE BUTTON IS PRESSED
  // if (submitRegisterUser && !isSubmitCheck) {
  //   steIsSubmitCheck(true);
  //   handleSubmit();
  // }

  // FINAL SUBMIT IS INVOKED IF ALL THE VALIDATION IS TRUE
  // if (
  //   createAccount.email &&
  //   createAccount.password &&
  //   createAccount.fullName &&
  //   !isFilled
  // ) {
  //   setIsfilled(true);
  //   handleSubmit();
  // }

  // REACT HOOK METHOD FOR RETRIEVING INSTITUTE USER DETAILS FOR EDITING
  useEffect(() => {
    setShowLoginError(false);
    // if (Storage.alive("UserRegistration")) {
    //   const userValue = Storage.getJson("UserRegistration");
    if (SessionStorage.alive("UserRegistration")) {
      const userValue = SessionStorage.getJson("UserRegistration");
      const fullName = userValue.fullname;
      const contact = userValue.contact;
      const country_code = userValue.country_code;
      const password = userValue.password;
      const email = userValue.email;

      const createAccountData = {
        ...createAccount,
        fullName: {
          value: fullName,
          isValid: ValidationFile.validEmpty(fullName),
        },
        email: {
          value: email,
          isValid: true,
        },
        contact: {
          value: contact,
          isValid: true,
        },
        country_code: {
          value: country_code,
          isValid: true,
        },
        password: {
          value: password,
          isValid: ValidationFile.validEmpty(password),
        },
        validation: isFormValid(),
      };
      setcreateAccountData(createAccountData);
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputContact = (value, formattedValue) => {
    const dialCode = formattedValue.dialCode;
    let mobile = value.replace(dialCode, "");
    let inputValue = mobile;
    let data = {
      ...createAccount,
      contact: {
        value: inputValue,
        isValid: checkValidationContact(formattedValue, value),
      },
      country_code: {
        value: dialCode,
        isValid: checkValidationContact(formattedValue, value),
      },
      validation: isFormValid(),
    };
    setcreateAccountData(data);
    setEmailError(false);
    setContactTaken(false)
    setVerifyOtpShow(false)
    setSendOtpLoading(false)
    setOtpInvalid(false)
    setEmailSuccess(false)
    setVerifyOtpEnter(false)
    setShowLoginError(false)
    ChangeSubmitValidationCheck();
  };

  const checkValidationContact = (formattedValue, value) => {
    if (formattedValue.dialCode === "91") {
      if (value.length < 13 && value.length > 11 && value !== "") {
        return true;
      } else {
        return false;
      }
    } else {
      if (value.length < 10 && value.length > 4 && value !== "") {
        return false;
      } else {
        return true;
      }
    }
  };
  const [contactTaken, setContactTaken] = useState(false);
  const [verifyyOtpShow, setVerifyOtpShow] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const [sendOtpLoading, setSendOtpLoading] = useState(false);
  const [otpEmpty, setOtpEmpty] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpInvalid, setOtpInvalid] = useState(false);

  const sendOtp = () => {
    handleSubmit()
  }

  const editAction = () => {
    setVerifyOtpShow(false)
    setSendOtpLoading(false)
    setEmailSuccess(false)
    setVerifyOtpEnter(false)
    ChangeSubmitValidationCheck();
  }
  const onChangeOtp = (e) => {
    let Value = e.target.value;
    setOtpInvalid(false);
    if (Value.toString().length > 6) {

    } else {
      setOtpValue(Value)
      setOtpEmpty(false)
    }

  }
  const onSubmitOtp = () => {
    if (otpValue) {
      setVerifyOtpLoading(true)

      OtpRequest.post(
        OtpRequest.url('authService/verifyotp'),
        { "contact": createAccount.contact.value, otp: otpValue, country_code: createAccount.country_code.value },
        (success) => {
          setVerifyOtpLoading(false)
          if (success.data.Details === "OTP Mismatch") {
            ChangeSubmitValidationCheck();
            setOtpInvalid(true)
          } else {
            setOtpInvalid(false)
            setEmailSuccess(true);
            const userData = getUserData();
            SessionStorage.setJson("UserRegistration", userData);
            regUserData();
          }
        },
        (error) => {
          setVerifyOtpLoading(false)
          setOtpInvalid(true);
          ChangeSubmitValidationCheck();
        }
      )
    } else {
      setOtpEmpty(true)
      ChangeSubmitValidationCheck();
    }
  }
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);

  return (
    <Card className="cardPadding bg-silver mt-60 edContainer">
      <CardBody className="mt-20 mb-20">
        <div className="RegisterPersonalInstituteHead">
          <p className="text-sm">Add your personal detail</p>
          {/* <p className="sub-heading text-xs">
            We will send your login credential information on your email
          </p> */}
        </div>
        <div className="RegisterPersonalInstitute">
          <div className="formFieldwrap">
            <FormInput
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              className={
                !createAccount.fullName.isValid && showLoginError
                  ? "errorInput"
                  : ""
              }
              // onBlur={handleSubmit}
              name="fullName"
              type="text"
              label="Full name*"
              placeholder="Full name"
              defaultValue={createAccount.fullName.value}
              onChange={handleInput}
              onKeyUp={handleInput}
            />
            <FormError
              show={!createAccount.fullName.isValid && showLoginError}
              error="Full Name required."
            />
          </div>
          <div className="formFieldwrap">
            <FormInput
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              className={
                createAccount.email.isValid === false && createAccount.email.value !== "" && showLoginError
                  ? "errorInput"
                  : ""
              }
              name="email"
              type="email"
              label="Email-id"
              placeholder="Email-Id (Optional)"
              value={createAccount.email.value}
              onKeyUp={handleInput}
              onChange={handleInput}
            />
            <FormError
              show={createAccount.email.isValid === false && createAccount.email.value !== "" && showLoginError}
              error="Enter valid email."
            />
            <FormError
              show={createAccount.email.value && emailError}
              error="Email taken. Please recheck and enter again"
            />
            <br></br>
            {/* {
              createAccount.email.value && emailError &&

              <AppLink to={`/auth/forgot-password`}
                className="button btn-o-silver primary btn-xs">
                RESET PASSWORD
              </AppLink>
            } */}

          </div>
          <div className="formFieldwrap">
            <div className="cstmPhoneInput">
              <PhoneInput
                autoComplete="off"
                autoCorrect="off"
                spellCheck="off"
                countryCodeEditable={false}
                disabled={verifyyOtpShow}
                className={
                  !createAccount.contact.isValid && showLoginError
                    ? "errorInput"
                    : ""
                }
                containerClass="form-group"
                inputClass="form-control"
                specialLabel="hii"
                country={"in"}
                value={`${createAccount.country_code.value}${createAccount.contact.value} `}
                inputProps={{
                  name: "phone",
                  required: true,
                  // autoFocus: true,
                }}
                // disabled={contactAlreadyExist ? true : false}
                enableSearch
                disableSearchIcon
                onChange={(value, formattedValue) => {
                  handleInputContact(value, formattedValue);
                }}
                onKeyUp={(value, formattedValue) => {
                  handleInputContact(value, formattedValue);
                }}
              />
              <label className="animLabel" htmlFor="mobile_number">
                Mobile Number*
              </label>
              {
                verifyyOtpShow && <button
                  className="btnText primary InputOverlayRightAlign"
                  onClick={() => editAction()}
                >
                  Edit
                </button>
              }

            </div>
            <FormError
              show={!createAccount.contact.isValid && createAccount.contact.value === "" && showLoginError}
              error="Contact number required."
            />
            <FormError
              show={!createAccount.contact.isValid && createAccount.contact.value && showLoginError}
              error="Contact number is invalid."
            />
            <FormError
              show={createAccount.contact.value && contactTaken}
              error="Contact taken. Please recheck and enter again"
            />
          </div>

          {/* <div className="chech-domain-error secondary">
            {emailSuccess && (
              <p>
                Congrats{" "}
                <strong>
                  {createAccount.country_code.value}-
                  {createAccount.contact.value}
                </strong>{" "}
                is available!
              </p>
            )}
          </div> */}

          <div className="formFieldwrap">
            <FormInputWithIcon
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              className={
                !createAccount.password.isValid && showLoginError
                  ? "errorInput"
                  : ""
              }
              name="password"
              // onBlur={handleSubmit}
              type="text"
              label="Password*"
              value={createAccount.password.value}
              minLength={8}
              placeholder="Password"
              onKeyUp={handleInput}
              onChange={handleInput}
            />
            <FormError
              show={!createAccount.password.value && showLoginError}
              error="Password required."
            />
            <FormError
              show={
                !checkSpaces() &&
                createAccount.password.value.length < 4 &&
                !createAccount.password.isValid &&
                createAccount.password.value &&
                showLoginError
              }
              error="Password must be minimum 4 character"
            />
            <FormError
              show={checkSpaces()}
              error="Password cannot contain space"
            />
            {/* <FormError
              show={!ValidationFile.ValidPasswordHard(createAccount.password.value) && createAccount.password.value.length > 3 && !createAccount.password.isValid && showLoginError}
              error="Password can only contain a-z|A-Z|0-9."
            /> */}
          </div>
        </div>
        {verifyyOtpShow === false &&
          <>
            {sendOtpLoading === false ? (
              <button type="button" className="button button-primary btn-sm" onClick={() => sendOtp()}>
                SEND OTP
              </button>
            ) : (
              <button type="button" className="button button-primary btn-sm">
                LOADING...
              </button>
            )}
          </>
        }

        {verifyyOtpShow &&
          <div className="otp-verify-cst">
            <div className="otp-verify-input mb-5">


              {emailSuccess === false &&
                <div className="formFieldwrap">
                  <FormInput type="number" placeholder="Enter OTP" onChange={(e) => onChangeOtp(e)} value={otpValue}
                    onWheel={(e) => e.target.blur()}
                    onKeyDown={(e) =>
                      symbolsArr.includes(e.key) && e.preventDefault()
                    }

                  />
                  <FormError
                    show={otpEmpty}
                    error="OTP is required."
                  />

                </div>
              }
              {emailSuccess === false && verifyOtpLoading === false &&
                <button type="button" className="button btn-sm" onClick={() => onSubmitOtp()}>
                  Verify OTP
                </button>
              }

              {
                verifyOtpLoading && <button type="button btn-sm" className="button" >
                  Loading...
                </button>
              }

            </div>
            {
              emailSuccess === false &&
              <div className="secondary w-500 text-xxs">
                OTP has been sent to {createAccount.country_code.value + `-` + createAccount.contact.value}
              </div>
            }


            {otpInvalid && emailSuccess === false &&
              <div className="otp-verify-denied-message">
                <img src={FailIcon} alt="Fail Icon" />
                Incorrect OTP entered
              </div>
            }
            {
              emailSuccess && otpInvalid === false && <div className="otp-verify-success-message">
                <img src={SuccessIcon} alt="Fail Icon" />
                OTP verified successfully
              </div>
            }
          </div>
        }

      </CardBody>
    </Card>
  );
};

export default RegisterUser;
