/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ModalBody from "../../Common/Modal/ModalBody";
import Modal from "../../Common/Modal";
import AppLink from "../../Common/AppLink";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LoginVerifyOTP from "./LoginVerifyOTP";
import FormError from "../../Common/Form/FormError";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postOtpRequest,
  postOtpRequestReset,
} from "../../store/actions/verifycontact";

const LoginMobileVerification = ({ modalState, ContactVerifySkip }) => {
  const dispatch = useDispatch();

  const [SameNumberToggle, SetSameNumberToggle] = useState("true");
  const [countryCode, setCountryCode] = useState("91");
  const [VerifyOtpModal, SetVerifyOtpModal] = useState(false);
  const [contactNumber, setContactNumber] = useState("");
  const [whatsappcontactNumber, setWhatsappContactNumber] = useState("");
  const [contactValid, setContactValid] = useState(false);
  const [whatsappContactValid, setWhatsappContactValid] = useState(false);
  const [contactAlreadyExist, setContactAlreadyExist] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [usedContactErr, setUsedContactErr] = useState(false);
  const [whatsappCountryCode, setWhatsappCountryCode] = useState("");
  const [contactEdit, setContactEdit] = useState(false);
  const [whatsappContactCheckFilled, setWhatsappContactCheckFilled] =
    useState(false);

  const { user, otpSendSuccess, otpSendLoading, otpSendErrorMessage } =
    useSelector((state) => {
      return {
        user: state.user,
        otpSendSuccess: state.verifycontact.OtpRequest.success,
        otpSendErrorMessage: state.verifycontact.OtpRequest.Errormessage,
        otpSendLoading: state.verifycontact.OtpRequest.loading,
      };
    });

  // useEffect(() => {

  //   if (user.user_contact) {
  //     setContactAlreadyExist(true)
  //     if (user.user_contact && user.user_country_code) {
  //       setContactNumber(`${user.user_country_code}${user.user_contact}`);
  //     } else {
  //       setContactNumber(`${91}${user.user_contact}`);
  //     }
  //   } else {
  //     setContactAlreadyExist(false)
  //   }

  // }, [user])

  useEffect(() => {
    if (otpSendErrorMessage) {
      setUsedContactErr(true);
    } else {
      setUsedContactErr(false);
    }
  }, [otpSendErrorMessage]);

  useEffect(() => {
    if (user.user_contact) {
      setContactAlreadyExist(true);
      setContactNumber(`${user.user_contact}`);
      setWhatsappContactNumber(`${user.user_contact}`);
      setContactEdit(true);
    } else {
      setContactAlreadyExist(false);
    }
  }, [user]);

  const handleInputContact = (value, formattedValue) => {
    setContactEdit(false);
    setSubmitted(false);
    const dialCode = formattedValue.dialCode;
    let mobile = value.replace(dialCode, "");
    let inputValue = mobile;
    setCountryCode(dialCode);
    setContactNumber(inputValue);
    if (formattedValue.dialCode === "91") {
      if (value.length < 12 && value.length > 2 && value !== "") {
        setContactValid(true);
      } else {
        setContactValid(false);
      }
    } else {
      if (value.length < 10 && value.length > 4 && value !== "") {
        setContactValid(true);
      } else {
        setContactValid(false);
      }
    }
  };

  const handleInputWhatsappContact = (value, formattedValue) => {
    const dialCode = formattedValue.dialCode;
    let mobile = value.replace(dialCode, "");
    let inputValue = mobile;
    setWhatsappCountryCode(dialCode);
    setWhatsappContactNumber(inputValue);
    setSubmitted(false);
    if (formattedValue.dialCode === "91") {
      if (value.length < 12 && value.length > 2 && value !== "") {
        setWhatsappContactValid(true);
      } else {
        setWhatsappContactValid(false);
      }
    } else {
      if (value.length < 10 && value.length > 4 && value !== "") {
        setWhatsappContactValid(true);
      } else {
        setWhatsappContactValid(false);
      }
    }
  };

  const SameContactToggleTrue = () => {
    SetSameNumberToggle(true);
    setWhatsappContactValid(false);
  };
  const SameContactToggleFalse = () => {
    SetSameNumberToggle(false);
    setWhatsappContactValid(true);
    setWhatsappContactNumber("");
  };

  if (!SameNumberToggle && !whatsappContactCheckFilled) {
    setWhatsappContactCheckFilled(true);
    setWhatsappContactValid(true);
  }

  const ContactVerifySubmit = () => {
    setSubmitted(true);
    if (contactNumber) {
      if (!contactValid) {
        dispatch(postOtpRequest(otpRequestData()));
      }
    } else {
      setContactValid(true);
    }
  };

  const otpRequestData = () => {
    return {
      contact: contactNumber,
      country_code: countryCode,
      userId: user._id,
    };
  };

  useEffect(() => {
    if (otpSendSuccess) {
      SetVerifyOtpModal(true);
      dispatch(postOtpRequestReset());
    }
  }, [dispatch, otpSendSuccess]);

  const ChangeContact = () => {
    SetVerifyOtpModal(false);
  };

  const editchange = () => {
    setContactEdit(false);
    setContactAlreadyExist(false);
  };

  return (
    <div className="PTH-Item">
      <Modal show={modalState}>
        <ModalBody>
          {!VerifyOtpModal ? (
            <div className="LoginMobileVerification mt-30">
              <p className="LMV-GuidelineText text-xxs text-center">
                Now you can easily access your Edneed account with your mobile
                number. Complete mobile verification below or go to{" "}
                <AppLink
                  to="/account-setting"
                  onClick={() => ContactVerifySkip()}
                >
                  {" "}
                  Manage Profile
                </AppLink>{" "}
                and manually enable the mobile verification.
              </p>
              <div className="MobileVerificationCst mt-20">
                <div className="cstmPhoneInput">
                  <PhoneInput
                    countryCodeEditable={false}
                    containerClass="form-group"
                    inputClass="form-control"
                    specialLabel="hii"
                    country={"in"}
                    value={`${countryCode}${contactNumber}`}
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: true,
                    }}
                    disabled={contactAlreadyExist ? true : false}
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
                    Mobile Number
                  </label>
                  {contactEdit ? (
                    <button
                      className="btnText primary InputOverlayRightAlign"
                      onClick={() => editchange()}
                    >
                      Edit
                    </button>
                  ) : (
                    ""
                  )}

                  <FormError
                    show={contactValid && submitted}
                    error="Please enter your mobile number."
                  ></FormError>
                  <FormError
                    show={usedContactErr && !contactValid && submitted}
                    error="Contact is used or Invalid."
                  ></FormError>
                </div>

                {/* <div className="TurnWhatsappNotification">
                  <p className="TWN-HeadText text-xs secondary w-500">
                    <i className="ed-icon icon-whatsapp i-xs"></i>
                    Turn on WhatsApp notifications.
                  </p>
                  <div className="TWN-InputCst">
                    <div className="input-custom-type inline mt-10">
                      <label className="small">
                        <input
                          type="radio"
                          name="WhatsappNumber"
                          onChange={() => SameContactToggleTrue()}
                          checked={SameNumberToggle}
                        />
                        Yes, My WhatsApp number is same.
                      </label>
                    </div>
                    <div className="input-custom-type inline mt-10">
                      <label className="small">
                        <input
                          type="radio"
                          name="WhatsappNumber"
                          onChange={() => SameContactToggleFalse()}
                          checked={!SameNumberToggle}
                        />
                        No, I use another number for WhatsApp.
                      </label>
                    </div>
                    {!SameNumberToggle && (
                      <div className="cstmPhoneInput mt-20">
                        <
                          containerClass="form-group"
                          inputClass="form-control"
                          specialLabel="hii"
                          country={"in"}
                          inputProps={{
                            name: "phone",
                            required: true,
                            autoFocus: true,
                          }}
                          onChange={(value, formattedValue) => {
                            handleInputWhatsappContact(value, formattedValue);
                          }}
                          onKeyUp={(value, formattedValue) => {
                            handleInputWhatsappContact(value, formattedValue);
                          }}
                          enableSearch
                          disableSearchIcon
                        />
                        <label className="animLabel" htmlFor="mobile_number">
                          Mobile Number
                        </label>
                        <FormError
                          show={whatsappContactValid && submitted}
                          error="Contact No is invalid."
                        ></FormError>
                      </div>
                    )}
                  </div>
                </div> */}
                {otpSendLoading ? (
                  <button className="button btn-md button-theme button-block btn-md">
                    Requesting OTP...
                  </button>
                ) : (
                  <button
                    className="button btn-md button-theme button-block btn-md"
                    onClick={() => ContactVerifySubmit()}
                  >
                    Request OTP
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
          ) : (
            <LoginVerifyOTP
              SameNumberToggle={SameNumberToggle}
              whatsappcontactNumber={whatsappcontactNumber}
              countryCode={countryCode}
              contactNumber={contactNumber}
              whatsappCountryCode={whatsappCountryCode}
              ContactVerifySkip={() => ContactVerifySkip()}
              ChangeContact={() => ChangeContact()}
            />
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoginMobileVerification;
