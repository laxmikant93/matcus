import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ValidationFile from "../../../../Classes/ValidationFile";
import FormError from "../../../../Common/Form/FormError";
import FormInput from "../../../../Common/Form/FormInput";
import InputDatePicker from "../../../../Common/Form/InputDatePicker";
import Modal from "../../../../Common/Modal";
import ModalBody from "../../../../Common/Modal/ModalBody";
import ModalFooter from "../../../../Common/Modal/ModalFooter";
import ModalHeader from "../../../../Common/Modal/ModalHeader";
import {
  getEducations,
  postEducation,
} from "../../../../store/actions/publicProfile";

function AddNewEducation({ showprop, closeModalStateprop, Id }) {
  const dispatch = useDispatch();

  const [newEducation, setNewEducation] = useState({
    education_from: {
      value: "",
      isValid: false,
    },
    education_to: {
      value: "",
      isValid: false,
    },
    education_name: {
      value: "",
      isValid: false,
    },
    education_organisation: {
      value: "",
      isValid: false,
    },
    validation: false,
  });

  const [startdateValue, setStartDateValue] = useState(false);
  const [endDateValue, setEndDateValue] = useState(false);
  const [EducationValid, setEducationValid] = useState(false);

  const isFormValid = () => {
    return newEducation.education_from.isValid &&
      newEducation.education_to.isValid &&
      newEducation.education_name.isValid &&
      newEducation.education_organisation.isValid
      ? true
      : false;
  };

  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "education_from":
        return ValidationFile.validEmpty(inputValue);
      case "education_to":
        return ValidationFile.validEmpty(inputValue);
      case "education_name":
        return ValidationFile.validEmpty(inputValue);
      case "education_organisation":
        return ValidationFile.validEmpty(inputValue);
      default:
        return false;
    }
  };

  const handleEducation = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    let newEducationData = {
      ...newEducation,
      [inputName]: {
        value: ValidationFile.spaceNotAccept(inputValue),
        isValid: validationConfirm(ValidationFile.spaceNotAccept(inputValue), inputName),
      },
      validation: isFormValid(),
    };
    setNewEducation(newEducationData);
  };

  const handleDatePicker = (datetime) => {
    let StartdateData = {
      ...newEducation,
      education_from: {
        value: datetime,
        isValid: ValidationFile.validEmpty(datetime),
      },

      validation: isFormValid(),
    };
    setNewEducation(StartdateData);
    setStartDateValue(false);
  };

  const handleEndDatePicker = (datetime) => {
    let EndDateData = {
      ...newEducation,
      education_to: {
        value: datetime,
        isValid: ValidationFile.validEmpty(datetime),
      },

      validation: isFormValid(),
    };
    setNewEducation(EndDateData);
    setEndDateValue(false);
  };

  const postEducationData = {
    education_from: newEducation.education_from.value,
    education_to: newEducation.education_to.value,
    education_name: newEducation.education_name.value,
    education_organisation: newEducation.education_organisation.value,
  };

  const submitEducation = () => {
    setEducationValid(true);
    setStartDateValue(true);
    setEndDateValue(true);

    if (isFormValid()) {
      dispatch(postEducation(Id, postEducationData));
      setTimeout(() => {
        dispatch(getEducations(Id));
      }, 800);
      closeModalStateprop();
    }
  };

  const cancelPopUp = () => {
    closeModalStateprop();
    setStartDateValue(false);
    setEndDateValue(false);
    setEducationValid(false);
  };

  return (
    <Modal show={showprop}>
      <ModalHeader
        closeButton={true}
        onclose={closeModalStateprop}
        title="Add Education"
      ></ModalHeader>
      <ModalBody>
        <React.Fragment>
          <div className="datePickerWrap">
            <InputDatePicker
              name="education_from"
              type="date"
              onSelect={(stdate) => {
                handleDatePicker(stdate);
              }}
              label="Education Start Date"
              placeholder="Education Start Date"
              value={newEducation.education_from.value}
              maxDate={new Date()}
            />
            <FormError
              show={!newEducation.education_from.isValid && startdateValue}
              error="Please enter education start date."
            />
          </div>

          <div className="datePickerWrap">
            <InputDatePicker
              name="education_to"
              type="date"
              onSelect={(stdate) => {
                handleEndDatePicker(stdate);
              }}
              label="Education End Date"
              placeholder="Education End Date"
              value={newEducation.education_to.value}
              minDate={newEducation.education_from.value}
              disabled={!newEducation.education_from.value ? true : false}
            />
            <FormError
              show={!newEducation.education_to.isValid && endDateValue}
              error="Please enter education end date."
            />
          </div>
          <div className="formFieldwrap">
            <FormInput
              type="text"
              placeholder="Education Name"
              label="Education Name"
              name="education_name"
              onChange={(e) => handleEducation(e)}
              value={newEducation.education_name.value}
            />
            <FormError
              show={!newEducation.education_name.isValid && EducationValid}
              error="Please enter education name."
            />
          </div>
          <div className="formFieldwrap">
            <FormInput
              type="text"
              placeholder="Organization"
              label="Organization"
              name="education_organisation"
              onChange={(e) => handleEducation(e)}
              value={newEducation.education_organisation.value}
            />
            <FormError
              show={
                !newEducation.education_organisation.isValid && EducationValid
              }
              error="Please enter organisation name."
            />
          </div>
        </React.Fragment>
      </ModalBody>
      <ModalFooter>
        <button
          className="button button-primary btn-sm"
          type="submit"
          onClick={submitEducation}
        >
          Save Education
        </button>
        <button
          className="button btn-o-primary primary btn-sm"
          type="button"
          onClick={cancelPopUp}
        >
          Cancel
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default AddNewEducation;
