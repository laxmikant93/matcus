import React, { useState } from "react";
import FormInput from "../../../Common/Form/FormInput";
import FormError from "../../../Common/Form/FormError";
import ValidationFile from "../../Auth/ValidationFile";
import InputDateTimePicker from "../../../Common/Form/InputDateTimePicker";
import ValidationFileCommon from "../../../Classes//ValidationFile"

export default function AcademicDetail() {
  ////// Value Storing State

  const [infoError, setInfoError] = useState(false);
  const [userDetail, setUserDetail] = useState({
    Admission_No: {
      value: "",
      isValid: false
    },
    datePicker: {
      value: "",
      isValid: false
    },
    ClassRoom: {
      value: "",
      isValid: false
    },
    Subject: {
      value: "",
      isValid: false
    },
    validation: false,
  })

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setInfoError(false)
    setUserDetail({
      ...userDetail,
      [inputName]: {
        value: inputValue,
        isValid: validationConfirm(inputValue, inputName),
      },
      validation: isFormValid(),
    })
  }

  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "Admission_No":
        return ValidationFile.ValidateNumber(inputValue);
      // case "datePicker":
      //   return ValidationFile.ValidateNumber(inputValue);
      case "ClassRoom":
        return ValidationFile.ValidUsername(inputValue);
      case "Subject":
        return ValidationFile.ValidUsername(inputValue);
      default:
        return false;
    }
  };

  const handleDatePicker = (date) => {
    let admissionInfoData = {
      ...userDetail,
      datePicker: {
        value: date,
        isValid: ValidationFileCommon.compareCurrentDateTime(date),
      },
      validation: isFormValid(),
    };
    setUserDetail(admissionInfoData);
  };

  const isFormValid = () => {
    return userDetail.Admission_No.isValid &&
      userDetail.ClassRoom.isValid &&
      userDetail.Subject.isValid
      ? true : false;
  };

  const handleSubmit = (e) => {
    setInfoError(true)
    e.preventDefault();
    if (isFormValid()) {
    }
  }

  return (
    <React.Fragment>
      <div className="row mt-30">
        <div className="col-md-21 text-left">
          <h1 className="heading text-sm w-300">
            Academic Details
          </h1>
        </div>
      </div>
      <div className="formFieldwrap">
        <FormInput
          type="number"
          name="Admission_No"
          value={userDetail.Admission_No.value}
          onChange={handleChange}
          label="Admission NO."
          placeholder="Admission NO."
        />
        <FormError
          show={!userDetail.Admission_No.isValid && infoError}
          error="Admission no is Required."
        />
      </div>
      <div className="datePickerWrap">
        <InputDateTimePicker
          // className={
          //   !userDetail.datePicker.isValid && infoError
          //     ? "errorInput"
          //     : ""
          // }
          value={userDetail.datePicker.value}
          onSelect={(selectedDob) => handleDatePicker(selectedDob)}
          label="Date Of Birth"
          // onChange={handleChange}
          id="class_timing"
          name="datePicker"
          type="datetime-local"
          placeholder="Date Of Birth"
          minDate={new Date()}
        />
        {/* <FormError
          show={
            !userDetail.datePicker.isValid && infoError
          }
          error=" Date Of Birth is required."
        /> */}
      </div>
      <div className="formFieldwrap">
        <FormInput
          name="ClassRoom"
          value={userDetail.ClassRoom.value}
          onChange={handleChange}
          label="ClassRoom"
          placeholder="Enter ClassRoom"
        />
        <FormError
          show={!userDetail.ClassRoom.isValid && infoError}
          error="ClassRoom is Required."
        />
      </div>
      <div className="formFieldwrap">
        <FormInput
          name="Subject"
          value={userDetail.Subject.value}
          onChange={handleChange}
          label="Subject"
          placeholder="Subject"
        />
        <FormError
          show={!userDetail.Subject.isValid && infoError}
          error="Subject is Required."
        />
      </div>
      <button onClick={handleSubmit} type="submit" className="button btn-md button-theme">
        Submit
      </button>
    </React.Fragment>
  )
}