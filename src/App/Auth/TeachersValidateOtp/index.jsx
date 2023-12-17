import React, { useState } from "react";
import ValidationFile from "../ValidationFile";
import AuthContainer from "../AuthContainer";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormError from "../../../Common/Form/FormError";
import FormInput from "../../../Common/Form/FormInput";
import {
  getValidateTeacherData,
  postValidateTeacherData,
} from "../../../store/actions/teachervalidate";
import "./TeachersValidateOtp.scss";

export default () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect((_id) => {
    dispatch(getValidateTeacherData(_id));
  }, []);
  const [teacherValidateOtp, setteacherValidateOtp] = useState({
    otp: {
      value: "",
      isvalid: false,
    },
    validation: false,
  });
  const [formSubmit, setSumited] = useState(true);
  const [showLoginError, setShowLoginError] = useState(false);
  const [serverError, setServerError] = useState("");

  const isFormValid = () => {
    return teacherValidateOtp.otp.isValid;
  };

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let otpData = {
      ...teacherValidateOtp,
      [inputName]: {
        value: inputValue,
        isValid: ValidationFile.validEmpty(inputValue),
      },
      validation: isFormValid(),
    };
    setteacherValidateOtp(otpData);
    setServerError("");
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setShowLoginError(true);
    if (
      teacherValidateOtp.validation &&
      teacherValidateOtp.otp.value === emailotp
    ) {
      setSumited(true);

      dispatch(postValidateTeacherData());
    } else {
    }
  };

  return;
  <AuthContainer>
    <React.Fragment>
      <FormInput
        className=""
        onChange={handleInput}
        name="otp"
        type="text"
        label="otp"
        placeholder="*otp"
      />
      <FormError
        show={!teacherValidateOtp.otp.isValid && showLoginError}
        error="Please check your username to make sure you typed them correctly"
      />
      <button
        className="button btn-md button-theme button-block"
        onClick={handelSubmit}
      >
        Validate
      </button>
    </React.Fragment>
  </AuthContainer>;
};
