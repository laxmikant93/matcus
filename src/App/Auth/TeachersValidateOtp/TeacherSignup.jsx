import React, { useState } from "react";
import UserRequest from "../../../store/actions/user/UserRequest";
import ValidationFile from "../ValidationFile";
import AuthContainer from "../AuthContainer";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormError from "../../../Common/Form/FormError";
import FormInput from "../../../Common/Form/FormInput";
import FormInputWithIcon from "../../../Common/Form/FormInputWithIcon";

export default () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [fetchData, setfetchData] = useState([]);
  const [teacherSignUp, setteacherSignUp] = useState({
    fullName: {
      value: "",
      isvalid: false,
    },
    userName: {
      value: "",
      isvalid: false,
    },
    email: {
      value: "",
      isvalid: false,
    },
    Password: {
      value: "",
      isvalid: false,
    },
    validation: false,
  });
  const [formSubmit, setSumited] = useState(true);
  const [showLoginError, setShowLoginError] = useState(false);
  const [serverError, setServerError] = useState("");

  const teacherSignUpFetchData = () => {
    UserRequest.teacherSignUpFetch(
      (success) => {
        let teacherSignUpData = success.data;
        setfetchData({
          fetchData: teacherSignUpData,
        });
      },
      (error) => { }
    );
  };

  const isFormValid = () => {
    return teacherSignUp.userName.isValid && teacherSignUp.Password.isValid
      ? true
      : false;
  };

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let teacherSignUpData = {
      ...teacherSignUp,
      [inputName]: {
        value: inputValue,
        isValid: validationConfirm(inputValue, inputName),
      },
      validation: isFormValid(),
    };
    setteacherSignUp(teacherSignUpData);
    setServerError("");
  };

  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "userName":
        return ValidationFile.validEmpty(inputValue);
        break;
      case "fullName":
        return ValidationFile.validEmpty(inputValue);
        break;
      case "password":
        return ValidationFile.validEmpty(inputValue);
        break;
      default:
        return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoginError(true);
    if (teacherSignUp.validation) {
      setSumited(true);
      UserRequest.teacherSignUp(
        teacherSignUp.userName.value,
        teacherSignUp.Password.value,
        teacherSignUp.fullName.value,
        (success) => { },
        (error) => { }
      );
    } else {
    }
  };

  return (
    <AuthContainer>
      <div className="row center-md">
        <div className="col-xs-12 col-md-10">
          <div className="row between-md">
            <div className="col-xs-12 col-md-7">
              <div className="heroIntro text-left">
                <div className="row">
                  <div className="col-xs-12 col-md-8">
                    <div className="logoCustom"></div>
                    <div className="heroHeading">
                      <h1 className="middle-text w-300">
                        To help expand learning system for everyone
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-xs-12">
              <div className="loginFormSection">
                <div className="orDivider">
                  <span></span>
                </div>
                <div className="loginFormCustom">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-xs-12">
                        <FormInput
                          className=""
                          name="name"
                          type="text"
                          label="FUll Name"
                          placeholder="Full Name"
                          onChange={handleInput}
                          onKeyUp={handleInput}
                        />
                        <FormInput
                          className=""
                          name="userName"
                          type="text"
                          label="User Name"
                          placeholder="Username"
                          onChange={handleInput}
                          onKeyUp={handleInput}
                        />
                        <FormError
                          show={
                            !teacherSignUp.userName.isValid && showLoginError
                          }
                          error="Please check your username to make sure you typed them correctly"
                        />
                        <FormInput
                          className=""
                          name="email"
                          type="email"
                          label="Email"
                          placeholder="Email"
                          value="PreFiXed"
                        />
                        <FormInputWithIcon
                          className=""
                          name="password"
                          type="password"
                          label="Password"
                          placeholder="*Password"
                          onChange={handleInput}
                        />
                        <FormError
                          show={
                            !teacherSignUp.password.isValid && showLoginError
                          }
                          error="Please check your password to make sure you typed them correctly"
                        />
                        <p className="text-xxs gray sign-agree mt-10 w-500">
                          By clicking Agree & Sign Up, you agree to the Edneed{" "}
                          <span className="primary">
                            User Agreement, Privacy Policy,
                          </span>{" "}
                          and <span className="primary">Cookie Policy</span>.
                        </p>
                        <button className="button btn-md button-theme button-block mt-8">
                          Agree & Sign Up
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <h1>Create Account will be here</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};
