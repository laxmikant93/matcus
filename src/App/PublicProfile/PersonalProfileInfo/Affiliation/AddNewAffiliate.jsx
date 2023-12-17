import React from "react";
import FormInput from "../../../../Common/Form/FormInput";
import Modal from "../../../../Common/Modal";
import ModalBody from "../../../../Common/Modal/ModalBody";
import ModalFooter from "../../../../Common/Modal/ModalFooter";
import ModalHeader from "../../../../Common/Modal/ModalHeader";
import InputDatePicker from "../../../../Common/Form/InputDatePicker";
import FormError from "../../../../Common/Form/FormError";
import ValidationFile from "../../../Auth/ValidationFile";
import Validation from "../../../../Classes/ValidationFile";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  postProffessionalAffilates,
  getProffessionalAffilates,
} from "../../../../store/actions/publicProfile";
function AddNewAffiliate({ showprop, closeModalStateprop, singleProfile }) {
  const [valid, setValid] = useState(false);
  const dispatch = useDispatch();
  const UserId = singleProfile && singleProfile.user;
  const [affiliatesValue, setAffiliatesValue] = useState({
    affiliation_date: { value: "", isValid: false },
    affiliation_name: { value: "", isValid: false },
    affiliation_about: { value: "", isValid: false },
  });
  useEffect(() => {
    setAffiliatesValue({
      affiliation_date: { value: "", isValid: false },
      affiliation_name: { value: "", isValid: false },
      affiliation_about: { value: "", isValid: false },
    });
    setValid(false);
  }, [closeModalStateprop]);
  const postdata = {
    affiliation_date: affiliatesValue.affiliation_date.value,
    affiliation_name: affiliatesValue.affiliation_name.value,
    affiliation_about: affiliatesValue.affiliation_about.value,
  };
  const onChangehandle = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let data = {
      ...affiliatesValue,
      [inputName]: {
        value: Validation.spaceNotAccept(inputValue),
        isValid: verfication(inputName, Validation.spaceNotAccept(inputValue)),
      },
    };
    setValid(false);

    setAffiliatesValue(data);
  };

  const onChangeData = (date) => {
    setValid(false);
    let inputValue = date;
    let inputName = "affiliation_date";
    let data = {
      ...affiliatesValue,
      affiliation_date: {
        value: date,
        isValid: verfication(inputName, inputValue),
      },
    };

    setAffiliatesValue(data);
  };
  const IsValid = () => {
    return affiliatesValue.affiliation_about.isValid &&
      affiliatesValue.affiliation_date.isValid &&
      affiliatesValue.affiliation_name.isValid
      ? true
      : false;
  };
  const onSUbmitData = (e) => {
    // e.preventDefault();
    setValid(true);
    if (!valid && IsValid()) {
      dispatch(postProffessionalAffilates(UserId, postdata));
      setTimeout(() => {
        dispatch(getProffessionalAffilates(UserId));
      }, 800);
      closeModalStateprop();

      setValid(false);
    }
  };

  const verfication = (inputName, inputValue) => {
    switch (inputName) {
      case "affiliation_date": {
        return ValidationFile.validEmpty(inputValue);
      }
      case "affiliation_name": {
        return ValidationFile.validEmpty(inputValue);
      }
      case "affiliation_about": {
        return ValidationFile.validEmpty(inputValue);
      }
      default:
        return false;
    }
  };
  return (
    <Modal show={showprop}>
      <ModalHeader
        closeButton={true}
        onclose={closeModalStateprop}
        title="Add Professional Affiliation"
      ></ModalHeader>
      <ModalBody>
        <React.Fragment>
          <form
            autoComplete="off"
            autoCorrect="off"
            spellCheck="off"
            method="post"
          >
            <div className="datePickerWrap">
              <InputDatePicker
                name="affiliation_date"
                type="date"
                onSelect={(stdate) => {
                  onChangeData(stdate);
                }}
                label="Affiliation Date"
                placeholder="Affiliation Date"
                value={affiliatesValue.affiliation_date.value}
                maxDate={new Date()}
              />
              <FormError
                show={!affiliatesValue.affiliation_date.isValid && valid}
                error="Please enter affiliation date."
              />
            </div>
            <div className="formFieldwrap">
              <FormInput
                type="text"
                placeholder="Affiliation Name"
                label="Affiliation Name"
                name="affiliation_name"
                onChange={(e) => onChangehandle(e)}
                value={affiliatesValue.affiliation_name.value}
              />
              <FormError
                show={!affiliatesValue.affiliation_name.isValid && valid}
                error="Please enter affiliation name."
              />
            </div>
            <div className="formFieldwrap">
              <FormInput
                type="text"
                placeholder="Affiliation Details"
                label="Affiliation Details"
                name="affiliation_about"
                onChange={(e) => onChangehandle(e)}
                value={affiliatesValue.affiliation_about.value}
              />
              <FormError
                show={!affiliatesValue.affiliation_about.isValid && valid}
                error="Please enter affiliation details."
              />
            </div>
          </form>
        </React.Fragment>
      </ModalBody>
      <ModalFooter>
        <button
          className="button button-primary btn-sm"
          type="submit"
          onClick={onSUbmitData}
        >
          Save Affiliation
        </button>
        <button
          className="button btn-o-primary primary btn-sm"
          type="button"
          onClick={closeModalStateprop}
        >
          Cancel
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default AddNewAffiliate;
