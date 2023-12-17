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
import { editExperience } from "../../../../store/actions/publicProfile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const EditExperience = ({
  closeModalStateprop,
  editExperienceData,
  showModal,
  // ProfileExperience,
}) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => {
    return {
      userInfo: state.publicProfile.singleProfile.data.userInfo,
      // userId: state.user._id,
      // expSuccess: state.publicProfile.experience.success,
    };
  });

  const [expField, setExField] = useState(false);

  // const [onCheck, setOnCheck] = useState(false);
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

  useEffect(() => {
    setNewexperience({
      job_title: {
        value: editExperienceData.experience_in,
        isValid: editExperienceData.experience_in ? true : false,
      },
      company_name: {
        value: editExperienceData.school,
        isValid: editExperienceData.school ? true : false,
      },
      startdate: {
        value: editExperienceData.experience_from,
        isValid: editExperienceData.experience_from ? true : false,
      },
      lastdate: {
        value: editExperienceData.experience_to,
        isValid: editExperienceData.experience_to ? true : false,
      },
      still_working: {
        value: editExperienceData.isworking,
      },
      description: {
        value: editExperienceData.about_ex,
        isValid: editExperienceData.about_ex ? true : false,
      },
      validation: false,
    });
    // setIsReviewValid(ValidationFile.validEmpty(editReviewData.review));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editExperienceData]);

  const isFormValid = () => {
    return newexperience.job_title.isValid &&
      newexperience.company_name.isValid &&
      newexperience.startdate.isValid
      ? true
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
        value: inputValue,
        isValid: validationConfirm(inputValue, inputName),
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

  const checkedMark = (e) => {
    // setOnCheck(e.target.checked);

    let checkbox = {
      ...newexperience,
      still_working: {
        value: e.target.checked,
      },
    };
    setNewexperience(checkbox);
  };

  const editData = {
    experience_from: newexperience.startdate.value,
    experience_to: newexperience.lastdate.value,
    experience_in: newexperience.job_title.value,
    school: newexperience.company_name.value,
    about_ex: newexperience.description.value,
    isworking: newexperience.still_working.value,
    _id: editExperienceData._id,
  };

  const handleSubmit = (e) => {
    setExField(true);
    setStartDateValue(true);
    setLastDateValue(true);

    if (
      isFormValid() &&
      (newexperience.lastdate.isValid || newexperience.still_working.value)
    ) {
      dispatch(editExperience(profileId, editData));
      closeModalStateprop();
    }
  };

  const cancelPopUp = () => {
    closeModalStateprop();
    setExField(false);
    setStartDateValue(false);
    setLastDateValue(false);
  };

  return (
    <Modal show={showModal}>
      <ModalHeader
        closeButton={true}
        onclose={closeModalStateprop}
        title="Update Experience"
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
              name="company_name"
              value={newexperience.company_name.value}
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
                label="Start Date"
                placeholder="Start Date"
                value={newexperience.startdate.value}
                maxDate={new Date()}
              />
              <FormError
                show={!newexperience.startdate.isValid && startdateValue}
                error="Please enter Start Date"
              />
            </div>

            {!newexperience.still_working.value && (
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
                checked={newexperience.still_working.value}
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
            Update Experience
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
  );
};

export default EditExperience;
