import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ValidationFile from "../../../../Classes/ValidationFile";
import FormError from "../../../../Common/Form/FormError";
import FormInput from "../../../../Common/Form/FormInput";
import InputDatePicker from "../../../../Common/Form/InputDatePicker";
import Modal from "../../../../Common/Modal";
import ModalBody from "../../../../Common/Modal/ModalBody";
import ModalFooter from "../../../../Common/Modal/ModalFooter";
import ModalHeader from "../../../../Common/Modal/ModalHeader";
import { editAward } from "../../../../store/actions/publicProfile";

function EditAward({ showprop, closeModalStateprop, Id, editAwardData }) {
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

  useEffect(() => {
    setNewAwards({
      award_date: {
        value: editAwardData.award_date,
        isValid: editAwardData.award_date ? true : false,
      },
      award_name: {
        value: editAwardData.award_name,
        isValid: editAwardData.award_name ? true : false,
      },
      award_by: {
        value: editAwardData.award_by,
        isValid: editAwardData.award_by ? true : false,
      },
      validation: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editAwardData]);

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
        value: inputValue,
        isValid: validationConfirm(inputValue, inputName),
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

  const AwardData = {
    award_date: newAwards.award_date.value,
    award_name: newAwards.award_name.value,
    award_by: newAwards.award_by.value,
    _id: editAwardData._id,
  };

  const submitAward = () => {
    setAwardValid(true);
    setStartDateValue(true);

    if (isFormValid()) {
      dispatch(editAward(Id, AwardData));
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
        title="Update Awards"
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
          Update Award
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

export default EditAward;
