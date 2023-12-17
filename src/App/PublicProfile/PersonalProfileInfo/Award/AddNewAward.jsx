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
import { getAwards, postAward } from "../../../../store/actions/publicProfile";

function AddNewAward({ showprop, closeModalStateprop, Id }) {
  const dispatch = useDispatch();

  const [newAwards, setNewAwards] = useState({
    award_date: {
      value: "",
      isValid: false,
    },
    award_name: {
      value: "",
      isValid: false,
    },
    award_by: {
      value: "",
      isValid: false,
    },
    validation: false,
  });
  const [startdateValue, setStartDateValue] = useState(false);
  const [awardValid, setAwardValid] = useState(false);

  const isFormValid = () => {
    return newAwards.award_date.isValid &&
      newAwards.award_name.isValid &&
      newAwards.award_by.isValid
      ? true
      : false;
  };

  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "award_date":
        return ValidationFile.validEmpty(inputValue);
      case "award_name":
        return ValidationFile.validEmpty(inputValue);
      case "award_by":
        return ValidationFile.validEmpty(inputValue);
      default:
        return false;
    }
  };

  const handleAwards = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    let newAwardData = {
      ...newAwards,
      [inputName]: {
        value: ValidationFile.spaceNotAccept(inputValue),
        isValid: validationConfirm(ValidationFile.spaceNotAccept(inputValue), inputName),
      },
      validation: isFormValid(),
    };
    setNewAwards(newAwardData);
  };

  const handleDatePicker = (datetime) => {
    let StartdateData = {
      ...newAwards,
      award_date: {
        value: datetime,
        isValid: ValidationFile.validEmpty(datetime),
      },

      validation: isFormValid(),
    };
    setNewAwards(StartdateData);
    setStartDateValue(false);
  };

  const postAwardData = {
    award_date: newAwards.award_date.value,
    award_name: newAwards.award_name.value,
    award_by: newAwards.award_by.value,
  };

  const submitAward = () => {
    setAwardValid(true);
    setStartDateValue(true);

    if (isFormValid()) {
      dispatch(postAward(Id, postAwardData));
      setTimeout(() => {
        dispatch(getAwards(Id));
      }, 800);
      closeModalStateprop();
    }
  };

  const cancelPopUp = () => {
    closeModalStateprop();
    setStartDateValue(false);
    setAwardValid(false);
  };

  return (
    <Modal show={showprop}>
      <ModalHeader
        closeButton={true}
        onclose={closeModalStateprop}
        title="Add Awards"
      ></ModalHeader>
      <ModalBody>
        <React.Fragment>
          <div className="datePickerWrap">
            <InputDatePicker
              name="award_date"
              type="date"
              onSelect={(stdate) => {
                handleDatePicker(stdate);
              }}
              label="Award Received Date"
              placeholder="Award Received Date"
              value={newAwards.award_date.value}
              maxDate={new Date()}
            />
            <FormError
              show={!newAwards.award_date.isValid && startdateValue}
              error="Please enter award receive date."
            />
          </div>
          <div className="formFieldwrap">
            <FormInput
              type="text"
              placeholder="Award Name"
              label="Award Name"
              name="award_name"
              onChange={handleAwards}
              value={newAwards.award_name.value}
            />
            <FormError
              show={!newAwards.award_name.isValid && awardValid}
              error="Please enter award name."
            />
          </div>

          <div className="formFieldwrap">
            <FormInput
              type="text"
              placeholder="Organization"
              label="Organization"
              name="award_by"
              onChange={handleAwards}
              value={newAwards.award_by.value}
            />
            <FormError
              show={!newAwards.award_by.isValid && awardValid}
              error="Please enter organisation name."
            />
          </div>
        </React.Fragment>
      </ModalBody>
      <ModalFooter>
        <button
          className="button button-primary btn-sm"
          type="submit"
          onClick={submitAward}
        >
          Save Award
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

export default AddNewAward;
