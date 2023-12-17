import React, { useState } from "react";
import ModalHeader from "../../../../Common/Modal/ModalHeader";
import ModalFooter from "../../../../Common/Modal/ModalFooter";
import Modal from "../../../../Common/Modal";
import ModalBody from "../../../../Common/Modal/ModalBody";
import FormInput from "../../../../Common/Form/FormInput";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import InputDatePicker from "../../../../Common/Form/InputDatePicker";
import ValidationFile from "../../../../Classes/ValidationFile";
import CheckboxInput from "../../../../Common/Form/CheckboxInput";
import FormError from "../../../../Common/Form/FormError";
import {
  addExperience,
  getExperience,
} from "../../../../store/actions/publicProfile";
import { useDispatch, useSelector } from "react-redux";

export const ProfileExperienceAddNew = ({ closeModalStateprop, showprop }) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => {
    return {
      userInfo: state.publicProfile.singleProfile.data.userInfo,
      userId: state.user._id,
      expSuccess: state.publicProfile.experience.success,
    };
  });

  const [expField, setExField] = useState(false);
  // const [EditModal, SetEditModal] = useState(false);
  // const [addnew, setAddnew] = useState(false);

  const [onCheck, setOnCheck] = useState(false);
  const [startdateValue, setStartDateValue] = useState(false);
  const [lastdateValue, setLastDateValue] = useState(false);

  // const IsValidUser = (userInfo && userInfo.user) === userId;
  const profileId = userInfo && userInfo.user;

  const [newexperience, setNewexperience] = useState({
    job_title: {
      value: "",
      isValid: false,
    },
    company_name: {
      value: "",
      isValid: false,
    },
    startdate: {
      value: "",
      isValid: false,
    },
    lastdate: {
      value: "",
      isValid: false,
    },
    still_working: {
      value: false,
    },
    description: {
      value: "",
      isValid: false,
    },
    validation: false,
  });

  const isFormValid = () => {
    return newexperience.job_title.isValid &&
      newexperience.company_name.isValid &&
      newexperience.startdate.isValid
      ? // newexperience.lastdate.isValid &&
      // newexperience.description.isValid
      true
      : false;
  };

  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "job_title":
        return ValidationFile.validEmpty(inputValue);
      case "company_name":
        return ValidationFile.validEmpty(inputValue);
      case "startdate":
        return ValidationFile.validEmpty(inputValue);
      case "lastdate":
        return ValidationFile.validEmpty(inputValue);
      case "description":
        return ValidationFile.validEmpty(inputValue);
      default:
        return false;
    }
  };

  const handleOnchange = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    let newexperienceData = {
      ...newexperience,
      [inputName]: {
        value: ValidationFile.spaceNotAccept(inputValue),
        isValid: validationConfirm(ValidationFile.spaceNotAccept(inputValue), inputName),
      },
      validation: isFormValid(),
    };
    setNewexperience(newexperienceData);
    // setExField(false);
    // setAddnew(false);
  };

  const handlStarteDatePicker = (datetime) => {
    let StartdateData = {
      ...newexperience,
      startdate: {
        value: datetime,
        isValid: ValidationFile.validEmpty(datetime),
      },

      validation: isFormValid(),
    };
    setNewexperience(StartdateData);
    setStartDateValue(false);
  };

  const handlLasteDatePicker = (date) => {
    let LastdateData = {
      ...newexperience,
      lastdate: {
        value: date,
        isValid: ValidationFile.validEmpty(date),
      },

      validation: isFormValid(),
    };
    setNewexperience(LastdateData);
    setLastDateValue(false);
  };

  const postData = {
    experience_from: newexperience.startdate.value,
    experience_to: newexperience.still_working.value
      ? ""
      : newexperience.lastdate.value,
    experience_in: newexperience.job_title.value,
    school: newexperience.company_name.value,
    about_ex: newexperience.description.value,
    isworking: newexperience.still_working.value,
  };

  const handleSubmit = (e) => {
    setExField(true);
    setStartDateValue(true);
    setLastDateValue(true);

    if (
      isFormValid() &&
      (newexperience.lastdate.isValid || newexperience.still_working.value)
    ) {
      dispatch(addExperience(profileId, postData));
      setTimeout(() => {
        dispatch(getExperience(profileId));
      }, 600);
      closeModalStateprop();
    }
  };

  const checkedMark = (e) => {
    setOnCheck(e.target.checked);

    let checkbox = {
      ...newexperience,
      still_working: {
        value: e.target.checked,
      },
      lastdate: {
        value: e.target.checked ? newexperience.lastdate.value : "",
        isValid: !e.target.checked && false,
      },
    };
    setNewexperience(checkbox);
  };

  const cancelPopUp = () => {
    closeModalStateprop();
    setExField(false);
    setStartDateValue(false);
    setLastDateValue(false);
  };

  return (
    <>
      <Modal show={showprop}>
        <ModalHeader
          closeButton={true}
          onclose={closeModalStateprop}
          title="Add Experience"
        ></ModalHeader>
        <ModalBody>
          <React.Fragment>
            <div className="formFieldwrap">
              <FormInput
                type="text"
                placeholder="Job Title"
                label="Job Title"
                name="job_title"
                value={newexperience.job_title.value}
                onChange={handleOnchange}
              />
              <FormError
                show={!newexperience.job_title.isValid && expField}
                error="Please enter job title"
              />
            </div>

            <div className="formFieldwrap">
              <FormInput
                type="text"
                placeholder="Company Name"
                label="Company Name"
                value={newexperience.company_name.value}
                name="company_name"
                onChange={handleOnchange}
              />
              <FormError
                show={!newexperience.company_name.isValid && expField}
                error="Please enter company name"
              />
            </div>

            <div className="Edit-exp-calenderwrap">
              <div className="datePickerWrap">
                <InputDatePicker
                  name="startdate"
                  type="date"
                  onSelect={(stdate) => {
                    handlStarteDatePicker(stdate);
                  }}
                  label="Start date"
                  placeholder="Start date"
                  value={newexperience.startdate.value}
                  maxDate={new Date()}
                />
                <FormError
                  show={!newexperience.startdate.isValid && startdateValue}
                  error="Please enter Start date"
                />
              </div>

              {!onCheck && (
                <div className="datePickerWrap">
                  <InputDatePicker
                    name="lastdate"
                    type="date"
                    onSelect={(lsdate) => {
                      handlLasteDatePicker(lsdate);
                    }}
                    label="Last Date"
                    placeholder="Last Date"
                    value={newexperience.lastdate.value}
                    minDate={newexperience.startdate.value}
                    maxDate={new Date()}
                    disabled={!newexperience.startdate.value ? true : false}
                  />
                  <FormError
                    show={!newexperience.lastdate.isValid && lastdateValue}
                    error="Please enter last date"
                  />
                </div>
              )}
            </div>
            <div className="formFieldwrap">
              <div className="input-custom-type">
                <CheckboxInput
                  LabelClass={`small ${newexperience.still_working.value && "active"
                    }`}
                  name="still_working"
                  label="Still Working"
                  onChange={checkedMark}
                />
              </div>
            </div>
            <div className="formFieldwrap">
              <FormTextArea
                label="Description"
                placeholder="Describe your job role & responsibilities"
                rows="5"
                name="description"
                value={newexperience.description.value}
                onChange={handleOnchange}
              />
            </div>

            <button
              className="button button-primary btn-sm"
              type="submit"
              onClick={handleSubmit}
            >
              Save Experience
            </button>
            <button
              className="button btn-o-primary primary btn-sm"
              type="button"
              onClick={cancelPopUp}
            >
              Cancel
            </button>
          </React.Fragment>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
};

export default ProfileExperienceAddNew;
