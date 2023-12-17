// import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ValidationFile from "../../../../Classes/ValidationFile";
import CheckboxInput from "../../../../Common/Form/CheckboxInput";
import FormError from "../../../../Common/Form/FormError";
import FormInput from "../../../../Common/Form/FormInput";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import InputDatePicker from "../../../../Common/Form/InputDatePicker";
import Modal from "../../../../Common/Modal";
import ModalBody from "../../../../Common/Modal/ModalBody";
import ModalFooter from "../../../../Common/Modal/ModalFooter";
import ModalHeader from "../../../../Common/Modal/ModalHeader";
import {
  editCertificate,
  getCertificate,
  // postCertificate,
} from "../../../../store/actions/publicProfile";

function AddNewCertificate({
  showprop,
  closeModalStateprop,
  Id,
  editCertificateData,
}) {
  const dispatch = useDispatch();
  const [onCheck, setOnCheck] = useState(editCertificateData.notExpire);
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
      value: false,
    },
    validation: false,
  });

  useEffect(() => {
    setNewCertificate({
      certificate_from: {
        value: editCertificateData.certificate_from,
        isValid: editCertificateData.certificate_from ? true : false,
      },
      certificate_to: {
        value: editCertificateData.certificate_to,
        isValid: editCertificateData.certificate_to ? true : false,
      },
      certificate_name: {
        value: editCertificateData.certificate_name,
        isValid: editCertificateData.certificate_name ? true : false,
      },
      certificate_by: {
        value: editCertificateData.certificate_by,
        isValid: editCertificateData.certificate_by ? true : false,
      },
      certificate_about: {
        value: editCertificateData.certificate_about,
      },
      notExpire: {
        value: editCertificateData.notExpire,
      },
      validation: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editCertificateData]);

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

  const handleCertificate = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    let newCertificateData = {
      ...newCertificate,
      [inputName]: {
        value: inputValue,
        isValid: validationConfirm(inputValue, inputName),
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

  const CertificateEditData = {
    certificate_from: newCertificate.certificate_from.value,
    certificate_to: newCertificate.certificate_to.value,
    certificate_name: newCertificate.certificate_name.value,
    certificate_by: newCertificate.certificate_by.value,
    certificate_about: newCertificate.certificate_about.value,
    notExpire: newCertificate.notExpire.value,
    _id: editCertificateData._id,
  };

  const submitCertificate = () => {
    setCertificateValid(true);
    setStartDateValue(true);
    setEndDateValue(true);

    if (
      isFormValid() &&
      (newCertificate.notExpire.value || newCertificate.certificate_to.isValid)
    ) {
      dispatch(editCertificate(Id, CertificateEditData));
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
  return (
    <Modal show={showprop}>
      <ModalHeader
        closeButton={true}
        title="Update Certificate"
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
              onChange={handleCertificate}
              value={newCertificate.certificate_name.value}
            />
            <FormError
              show={
                !newCertificate.certificate_name.isValid && certificateValid
              }
              error="Please enter certificate Title."
            />
          </div>
          <div className="formFieldwrap">
            <FormInput
              type="text"
              placeholder="Issuing organization name"
              label="Issuing organization name"
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
              error="Please enter certificate Issue On."
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
                error="Please enter Expiration."
              />
            </div>
          )}
          <div className="formFieldwrap">
            <div className="input-custom-type">
              <CheckboxInput
                LabelClass={`small ${checkedMark && "active"}`}
                name="notExpire"
                label="This certificate doesn't expire"
                onChange={checkedMark}
                defaultChecked={onCheck}
              />
            </div>
          </div>

          <div className="formFieldwrap">
            <FormTextArea
              type="text"
              placeholder="Something about this certification "
              name="certificate_about"
              value={newCertificate.certificate_about.value}
              onChange={handleCertificate}
              maxlength={220}
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
