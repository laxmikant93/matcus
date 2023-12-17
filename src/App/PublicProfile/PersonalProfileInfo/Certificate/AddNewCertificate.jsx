import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ValidationFile from "../../../../Classes/ValidationFile";
import FormError from "../../../../Common/Form/FormError";
import FormInput from "../../../../Common/Form/FormInput";
import InputDatePicker from "../../../../Common/Form/InputDatePicker";
import Modal from "../../../../Common/Modal";
import ModalBody from "../../../../Common/Modal/ModalBody";
import ModalFooter from "../../../../Common/Modal/ModalFooter";
import CheckboxInput from "../../../../Common/Form/CheckboxInput";
import ModalHeader from "../../../../Common/Modal/ModalHeader";
import {
  getCertificate,
  // getCertificates,
  postCertificate,
} from "../../../../store/actions/publicProfile";
import FormTextArea from "../../../../Common/Form/FormTextArea";

function AddNewCertificate({ showprop, closeModalStateprop, Id }) {
  const dispatch = useDispatch();

  const [onCheck, setOnCheck] = useState(true);
  const [newCertificate, setNewCertificate] = useState({
    certificate_from: {
      value: "",
      isValid: false,
    },
    certificate_to: {
      value: "",
      isValid: false,
    },
    certificate_name: {
      value: "",
      isValid: false,
    },
    certificate_by: {
      value: "",
      isValid: false,
    },
    certificate_about: {
      value: "",
    },
    notExpire: {
      value: true,
    },
    validation: false,
  });

  const [startdateValue, setStartDateValue] = useState(false);
  const [endDateValue, setEndDateValue] = useState(false);
  const [certificateValid, setCertificateValid] = useState(false);

  const isFormValid = () => {
    return newCertificate.certificate_from.isValid &&
      newCertificate.certificate_name.isValid &&
      newCertificate.certificate_by.isValid
      ? true
      : false;
  };

  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "certificate_from":
        return ValidationFile.validEmpty(inputValue);
      case "certificate_to":
        return ValidationFile.validEmpty(inputValue);
      case "certificate_name":
        return ValidationFile.validEmpty(inputValue);
      case "certificate_by":
        return ValidationFile.validEmpty(inputValue);
      default:
        return false;
    }
  };
  const checkedMark = (e) => {
    setOnCheck(e.target.checked);

    let checkbox = {
      ...newCertificate,
      notExpire: {
        value: e.target.checked,
      },
      certificate_to: {
        value: e.target.checked ? "" : newCertificate.certificate_to.value,
        isValid: !e.target.checked && false,
      },
    };
    setNewCertificate(checkbox);
  };
  const handleCertificate = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    let newCertificateData = {
      ...newCertificate,
      [inputName]: {
        value: ValidationFile.spaceNotAccept(inputValue),
        isValid: validationConfirm(ValidationFile.spaceNotAccept(inputValue), inputName),
      },
      validation: isFormValid(),
    };
    setNewCertificate(newCertificateData);
  };

  const handleDatePicker = (datetime) => {
    let StartdateData = {
      ...newCertificate,
      certificate_from: {
        value: datetime,
        isValid: ValidationFile.validEmpty(datetime),
      },

      validation: isFormValid(),
    };
    setNewCertificate(StartdateData);
    setStartDateValue(false);
  };

  const handleEndDatePicker = (datetime) => {
    let EndDateData = {
      ...newCertificate,
      certificate_to: {
        value: datetime,
        isValid: ValidationFile.validEmpty(datetime),
      },

      validation: isFormValid(),
    };
    setNewCertificate(EndDateData);
    setEndDateValue(false);
  };

  const postCertificateData = {
    certificate_from: newCertificate.certificate_from.value,
    certificate_to: newCertificate.certificate_to.value,
    certificate_name: newCertificate.certificate_name.value,
    certificate_by: newCertificate.certificate_by.value,
    certificate_about: newCertificate.certificate_about.value,
    notExpire: newCertificate.notExpire.value,
  };

  // certificate_from: { type: String },
  // certificate_to: { type: String },
  // certificate_name: { type: String },
  // certificate_by: { type: String },

  const submitCertificate = () => {
    setCertificateValid(true);
    setStartDateValue(true);
    setEndDateValue(true);

    if (
      isFormValid() &&
      (newCertificate.notExpire.value || newCertificate.certificate_to.isValid)
    ) {
      dispatch(postCertificate(Id, postCertificateData));
      setTimeout(() => {
        dispatch(getCertificate(Id));
      }, 800);
      closeModalStateprop();
    }
  };

  const cancelPopUp = () => {
    closeModalStateprop();
    setStartDateValue(false);
    setEndDateValue(false);
    setCertificateValid(false);
  };

  return (
    <Modal show={showprop}>
      <ModalHeader
        closeButton={true}
        title="Add Certificate"
        onclose={closeModalStateprop}
      ></ModalHeader>
      <ModalBody>
        <React.Fragment>
          <div className="formFieldwrap">
            <FormInput
              type="text"
              placeholder="Certificate Title"
              label="Certificate Title"
              name="certificate_name"
              value={newCertificate.certificate_name.value}
              onChange={handleCertificate}
            />
            <FormError
              show={
                !newCertificate.certificate_name.isValid && certificateValid
              }
              error="Please enter certificate title."
            />
          </div>

          <div className="formFieldwrap">
            <FormInput
              type="text"
              placeholder="Issuing Organization"
              label="Issuing Organization"
              name="certificate_by"
              onChange={handleCertificate}
              value={newCertificate.certificate_by.value}
            />
            <FormError
              show={!newCertificate.certificate_by.isValid && certificateValid}
              error="Please enter organization name."
            />
          </div>

          <div className="datePickerWrap">
            <InputDatePicker
              name="certificate_from"
              type="date"
              onSelect={(stdate) => {
                handleDatePicker(stdate);
              }}
              label="Issue On"
              placeholder="Issue On"
              value={newCertificate.certificate_from.value}
              maxDate={new Date()}
            />
            <FormError
              show={!newCertificate.certificate_from.isValid && startdateValue}
              error="Please enter certificate issue on."
            />
          </div>
          {!onCheck && (
            <div className="datePickerWrap">
              <InputDatePicker
                name="certificate_to"
                type="date"
                onSelect={(stdate) => {
                  handleEndDatePicker(stdate);
                }}
                label="Expiration"
                placeholder="Expiration"
                value={newCertificate.certificate_to.value}
                minDate={newCertificate.certificate_from.value}
                disabled={newCertificate.certificate_from.value ? false : true}
              />
              <FormError
                show={!newCertificate.certificate_to.isValid && endDateValue}
                error="Please enter certificate expiration."
              />
            </div>
          )}
          <div className="formFieldwrap">
            <div className="input-custom-type">
              <CheckboxInput
                LabelClass={`small ${newCertificate.notExpire.value ? "active" : ""
                  }`}
                name="notExpire"
                label="This certificate doesn't expire"
                onChange={checkedMark}
                defaultChecked
              />
            </div>
          </div>

          <div className="formFieldwrap">
            <FormTextArea
              type="text"
              placeholder="Something about this certification "
              name="certificate_about"
              onChange={handleCertificate}
              maxlength={220}
              value={newCertificate.certificate_about.value}
            />
          </div>
        </React.Fragment>
      </ModalBody>
      <ModalFooter>
        <button
          className="button button-primary btn-sm"
          type="submit"
          onClick={submitCertificate}
        >
          Save Certificate
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

export default AddNewCertificate;
