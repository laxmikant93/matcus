import React from "react";
import FormInput from "../../Common/Form/FormInput";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import InputDateTimePicker from "../../Common/Form/InputDateTimePicker";
import { useState } from "react";
import ValidationFile from "../../Classes/ValidationFile";
import FormError from "../../Common/Form/FormError";
import { useDispatch, useSelector } from "react-redux";
import {
  postDemoRequestData,
  resetDemoRequestData,
} from "../../store/actions/requestDemo";
import { useNavigate } from "react-router-dom";
import "./RequestDemo.scss";
import Phone from "./phone.svg";
import ReactGA from "react-ga"
import AppLink from "../../Common/AppLink";

const RequestDemo = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [demoError, setDemoError] = useState(false);
  const [insName, setInsName] = useState("");
  const [studentsNo, setStudentsNo] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [date, setDate] = useState("");
  const [fullNameError, setFullNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mobileNoError, setMobileNoError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [insType, setInsType] = useState("");
  // const [apiError, setApiError] = useState(false)
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);
  const dispatch = useDispatch();
  const history = useNavigate();
  // const { demoRequestData, emailApiError } = useSelector((state) => {
  const { demoRequestData } = useSelector((state) => {
    return {
      demoRequestData: state.demoRequest.post,
      // emailApiError: state.demoRequest.emailExistError.error
    };
  });

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    ReactGA.event({
      category: "DEMO_REQUEST",
      action: "inputField",
      label: inputName,
    })

    switch (inputName) {
      case "fullname":
        setFullName(inputValue);
        setFullNameError(ValidationFile.isEmpty(inputValue));
        break;
      case "email":
        setEmail(inputValue);
        setEmailError(!ValidationFile.isEmail(inputValue));
        // if (emailApiError) {
        //   dispatch(resetEmailApiError())
        //   setApiError(false)
        // }
        break;
      case "insName":
        setInsName(inputValue);
        break;
      case "studentsNo":
        setStudentsNo(inputValue);
        break;
      case "date":
        setDate(inputValue);
        break;
      default:
        return false;
    }
  };
  const handleDatePicker = (datetime) => {
    // google Analytics
    ReactGA.event({
      category: "DEMO_REQUEST",
      action: "inputField",
      label: "Demo_Date_Time",
    })
    setDate(datetime);
    setDateError(!ValidationFile.compareCurrentDateTime(datetime));
  };

  const handleInputContact = (value, formattedValue) => {
    // google Analytics
    ReactGA.event({
      category: "DEMO_REQUEST",
      action: "inputField",
      label: "Contact",
    })
    // 
    setMobileNo(value);
    if (formattedValue.dialCode === "91") {
      if (value.length === 12) {
        setMobileNoError(false);
        setMobileNo(value);
      } else {
        setMobileNoError(true);
      }
    } else {
      if (value.length > 4) {
        setMobileNoError(false);
        setMobileNo(value);
      } else {
        setMobileNoError(true);
      }
    }
  };
  const handleRadioButton = (e) => {
    let checked = e.target.checked;
    let inputValue = e.target.value;
    let inputName = e.target.name;
    switch (inputName) {
      case "university":
        if (checked === true) {
          setInsType(inputValue);
        }
        break;
      case "preSchool":
        if (checked === true) {
          setInsType(inputValue);
        }
        break;
      case "school":
        if (checked === true) {
          setInsType(inputValue);
        }
        break;
      case "college":
        if (checked === true) {
          setInsType(inputValue);
        }
        break;
      case "privateTutor":
        if (checked === true) {
          setInsType(inputValue);
        }
        break;
      case "tcCenter":
        if (checked === true) {
          setInsType(inputValue);
        }
        break;
      case "other":
        if (checked === true) {
          setInsType(inputValue);
        }
        break;
      default:
        return false;
    }
  };
  const postDemo = () => {
    return {
      fullname: fullName,
      email: email,
      scheduleDate: date,
      mobileNumber: mobileNo,
      instituteName: insName,
      NumberofStudents: studentsNo,
      instituteTypes: insType,
    };
  };
  const handleSubmit = () => {
    // Google Analytics
    ReactGA.event({
      category: "DEMO_REQUEST",
      action: "click",
      label: "Submit_Demo_Request",
    })
    // 

    setDemoError(true);
    if (ValidationFile.isEmpty(fullName)) {
      setFullNameError(true);
    }
    if (!ValidationFile.isEmail(email)) {
      setEmailError(true);
    }
    if (
      !ValidationFile.isEmpty(fullName) &&
      ValidationFile.isEmail(email) &&
      !mobileNoError &&
      mobileNo !== "" &&
      !dateError
    ) {
      dispatch(postDemoRequestData(postDemo()));
    }
  };
  const [submitted, setSubmitted] = useState(false);
  if (demoRequestData.success && !submitted) {
    setSubmitted(true);
    setEmail("");
    setFullName("");
    setDate("");
    setMobileNo("+91");
    setInsName("");
    setInsType("");
    setStudentsNo("");
    setTimeout(() => {
      dispatch(resetDemoRequestData());
    }, 300);
    setTimeout(() => {
      setSubmitted(false);
      history("/request-demo/thankyou");
    }, 600);
  }
  // if (!apiError && emailApiError) {
  //   setApiError(true);
  //   dispatch(resetDemoRequestData());
  // }



  return (
    <div className="edContainer">
      <div className="book_demo_wrapper_custom">
        <div className="book_demo_wrapper">
          <div className="RequestDemoHeading">
            <p className="base w-700">
              Book a <span className="primary">FREE</span> Demo with our experts
            </p>
            <div className="RequestDemoSubHeading">
              <p>
                Due to the current COVID-19 pandemic, We are conducting virtual
                demo with rich user experience!
              </p>
            </div>
            <div className="RequestDemoDivider"></div>
            <div className="RequestDemoCallhead">
              <img src={Phone} alt="" />Call or Whatsapp us at
            </div>
            <div className="RequestDemoContactNumber">
              <a
                className="text-xs w-500 base"
                href="tel:9560027819"
                rel="noopener noreferrer"
              >
                +91-8368214889
              </a>
            </div>
          </div>
          <div className="vl"></div>
          <div className="RequestDemoBody">
            <div className="RequestDemoForm">
              <div className="formFieldwrap">
                <FormInput
                  placeholder="Full Name"
                  label="Full Name*"
                  type="text"
                  value={fullName}
                  onChange={handleInput}
                  onKeyUp={handleInput}
                  name="fullname"
                />
                <FormError
                  show={!fullName && fullNameError}
                  error="Full Name is required."
                />
              </div>
              <div className="formFieldwrap">
                <FormInput
                  placeholder="Email"
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInput}
                  onKeyUp={handleInput}
                />
                <FormError
                  show={emailError && !email && demoError}
                  error="Valid Email required"
                />
                <FormError
                  show={emailError && email && demoError}
                  error="Invalid Email. Please recheck and enter again."
                />
                {/* <FormError show={emailApiError} error="Invalid Email. Please recheck and enter again." /> */}
              </div>

              <div className="formFieldwrap">
                <div className="cstmPhoneInput">
                  <PhoneInput
                    countryCodeEditable={false}
                    containerClass="form-group"
                    inputClass="form-control"
                    specialLabel
                    country={"in"}
                    value={mobileNo}
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: false,
                      placeholder: "Enter mobile",
                    }}
                    enableSearch
                    name="mobileNo"
                    searchPlaceholder="Search Country"
                    onChange={(value, formattedValue) => {
                      handleInputContact(value, formattedValue);
                    }}
                    onKeyUp={(value, formattedValue) => {
                      handleInputContact(value, formattedValue);
                    }}
                    disableSearchIcon
                  />
                  <label className="animLabel" htmlFor="mobile_number">
                    Mobile Number*
                  </label>
                  <FormError
                    show={mobileNo.length < 3 && demoError}
                    error="Mobile No. required"
                  />
                  <FormError
                    show={mobileNoError && mobileNo.length > 2 && demoError}
                    error="Mobile Number is invalid"
                  />
                </div>
              </div>
              <div className="formFieldwrap">
                <FormInput
                  placeholder="Institute Name"
                  label="Institute Name"
                  type="text"
                  onChange={handleInput}
                  onKeyUp={handleInput}
                  name="insName"
                  value={insName}
                />
              </div>
              <div className="SelectDemoTimeDateInput">
                <div className="datePickerWrap">
                  <InputDateTimePicker
                    label="Demo Date & Time*"
                    name="class_timing"
                    onSelect={(selectedDate) => handleDatePicker(selectedDate)}
                    value={date}
                    id="class_timing"
                    dateFormat="dd MMM, yyyy"
                    showTimeInput={false}
                    type="datetime-local"
                    placeholder="Schedule Demo"
                    minDate={new Date()}
                    className="form-control"
                  />
                  <FormError
                    show={dateError && demoError}
                    error="Schedule time should be in future"
                  />
                </div>
              </div>
            </div>
            {!demoRequestData.loading ? (
              <button className="button button-primary button-block" onClick={handleSubmit}>
                Submit Demo Request
              </button>
            ) : (
              <button className="button button-primary button-block">
                Submitting Demo Request...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDemo;
