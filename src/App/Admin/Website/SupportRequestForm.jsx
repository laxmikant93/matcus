import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ValidationFile from "../../../Classes/ValidationFile";
import FormError from "../../../Common/Form/FormError";
import FormInput from "../../../Common/Form/FormInput";
import InputDateTimePicker from "../../../Common/Form/InputDateTimePicker";
import {
  postSupportMail,
  supportMailRequest,
} from "../../../store/actions/privateDomain";
import ValidationFileCommon from "../../../Classes/ValidationFile";
import { useEffect } from "react";
import "./SupportRequestForm.scss";
import moment from "moment";

const SupportRequestForm = ({ closeSendSupportRequest, ecommerce }) => {
  const dispatch = useDispatch();
  const [supportForm, setSupportForm] = useState(false);

  const { usersID, users, postSupportMailDataSuccess, postSupportMailData } =
    useSelector((state) => {
      return {
        usersID: state.user._id,
        users: state.user,
        InstituteInfo: state.checkdomain.list.data,
        InstituteInfoSuccess: state.checkdomain.list.success,
        patch_support_mail_succes: state.checkdomain.list.success,
        patch_support_mail_loading: state.checkdomain.list.loading,
        postSupportMailDataSuccess:
          state.privatedomain.postSupportMailData.success,
        postSupportMailDataLoading:
          state.privatedomain.postSupportMailData.loading,
        postSupportMailData: state.privatedomain.postSupportMailData,
        institute_Exit_Domain:
          state.privatedomain.postSupportMailData.data.institute_Exit_Domain,
        institute_private_domain:
          state.checkdomain.list.data.institute_private_domain,
        institute_private_domain_success: state.checkdomain.list.success,
      };
    });
  const mailerData = () => {
    return {
      userId: usersID,
    };
  };
  useEffect(() => {
    if (postSupportMailDataSuccess) {
      dispatch(supportMailRequest(mailerData()));
      setFormInput({
        institute_Exit_Domain_Name: {
          value: "",
          isValid: false,
        },
        institute_Exit_Domain_Provider: {
          value: "",
          isValid: false,
        },
        institute_Exit_Domain_Message: {
          value: "",
          isValid: false,
        },
        institute_Exit_Domain_Expiry_Date: {
          value: "",
          isValid: false,
        },
        validation: false,

        institute_Exit_Domain: true,
      });
    }
    setShowFormError(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postSupportMailDataSuccess]);

  const [formInput, setFormInput] = useState({
    institute_Exit_Domain_Name: {
      value: "",
      isValid: false,
    },
    institute_Exit_Domain_Provider: {
      value: "",
      isValid: false,
    },
    institute_Exit_Domain_Message: {
      value: "",
      isValid: false,
    },
    institute_Exit_Domain_Expiry_Date: {
      value: "",
      isValid: false,
    },
    validation: false,

    institute_Exit_Domain: true,
  });

  const [showFormError, setShowFormError] = useState(false);

  const handleChange = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let createInputData = {
      ...formInput,
      [inputName]: {
        value: inputValue,
        isValid: validationConfirm(inputValue, inputName),
      },
      validation: isFormValid(),
    };

    setFormInput(createInputData);

    setShowFormError(false);
  };

  const handleDatePicker = (date) => {
    let admissionInfoData = {
      ...formInput,
      institute_Exit_Domain_Expiry_Date: {
        value: date,
        isValid: ValidationFileCommon.compareCurrentDateTime(date),
      },
      validation: isFormValid(),
    };
    setFormInput(admissionInfoData);
  };

  const isFormValid = () => {
    return formInput.institute_Exit_Domain_Name.isValid &&
      formInput.institute_Exit_Domain_Provider.isValid &&
      formInput.institute_Exit_Domain_Expiry_Date.isValid
      ? true
      : false;
  };

  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "institute_Exit_Domain_Name":
        return (
          ValidationFile.validEmpty(inputValue) &&
          ValidationFile.validWebsiteLinkPrivateDomain(inputValue)
        );
      case "institute_Exit_Domain_Provider":
        return ValidationFile.validEmpty(inputValue);
      default:
        return false;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowFormError(true);
    let mailData = {
      instituteId: users.user_institute,
      institute_Exit_Domain_Name: formInput.institute_Exit_Domain_Name.value,
      institute_Exit_Domain_Provider:
        formInput.institute_Exit_Domain_Provider.value,
      institute_Exit_Domain_Message:
        formInput.institute_Exit_Domain_Message.value,
      institute_Exit_Domain_Expiry_Date: moment(
        formInput.institute_Exit_Domain_Expiry_Date.value
      ).toISOString(),
    };
    if (isFormValid()) {
      dispatch(postSupportMail(mailData, ecommerce ? ecommerce : ""));
      closeSendSupportRequest();
      setFormInput({
        institute_Exit_Domain_Name: {
          value: "",
          isValid: false,
        },
        institute_Exit_Domain_Provider: {
          value: "",
          isValid: false,
        },
        institute_Exit_Domain_Message: {
          value: "",
          isValid: false,
        },
        institute_Exit_Domain_Expiry_Date: {
          value: "",
          isValid: false,
        },
        validation: false,

        institute_Exit_Domain: true,
      });
      setSupportForm(!supportForm);
    }
  };

  const handleCancel = () => {
    closeSendSupportRequest();
    setFormInput({
      institute_Exit_Domain_Name: {
        value: "",
        isValid: false,
      },
      institute_Exit_Domain_Provider: {
        value: "",
        isValid: false,
      },
      institute_Exit_Domain_Message: {
        value: "",
        isValid: false,
      },
      institute_Exit_Domain_Expiry_Date: {
        value: "",
        isValid: false,
      },
      validation: false,

      institute_Exit_Domain: true,
    });
    setSupportForm(!supportForm);
    setShowFormError(false);
  };

  return (
    <React.Fragment>
      <div className="supportRequestForm">
        <p className="text-sm">Share your Domain Details</p>
        <p className="text-xxs base w-500 mb-20">
          Our technical team will configure with below details.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="formFieldwrap">
            <FormInput
              type="text"
              name="institute_Exit_Domain_Name"
              value={formInput.institute_Exit_Domain_Name.value}
              onChange={handleChange}
              label="Existing Domain Name"
            />
            <FormError
              show={
                showFormError && !formInput.institute_Exit_Domain_Name.value
              }
              error="Domain Name is required."
            />
            <FormError
              show={
                showFormError &&
                formInput.institute_Exit_Domain_Name.value &&
                !formInput.institute_Exit_Domain_Name.isValid
              }
              error="Invalid Domain name."
            />
          </div>
          <div className="formFieldwrap">
            <FormInput
              type="text"
              name="institute_Exit_Domain_Provider"
              value={formInput.institute_Exit_Domain_Provider.value}
              onChange={handleChange}
              label="Domain Provider"
            />

            <FormError
              show={
                !formInput.institute_Exit_Domain_Provider.isValid &&
                showFormError
              }
              error="Domain Provider is required."
            />
          </div>
          <div className="datePickerWrap">
            <InputDateTimePicker
              className={`form-control ${!formInput.institute_Exit_Domain_Expiry_Date.isValid &&
                showFormError
                ? "errorInput"
                : ""}`}
              value={formInput.institute_Exit_Domain_Expiry_Date.value}
              onSelect={(date) => handleDatePicker(date)}
              label="Domain Expiry Date"
              name="institute_Exit_Domain_Expiry_Date"
              id="class_timing"
              type="datetime-local"
              placeholder="Domain expiry date."
              minDate={new Date()}
            />
            <FormError
              show={
                !formInput.institute_Exit_Domain_Expiry_Date.value &&
                !formInput.institute_Exit_Domain_Expiry_Date.isValid &&
                showFormError
              }
              error="Expiry date is required."
            />
            <FormError
              show={
                formInput.institute_Exit_Domain_Expiry_Date.value &&
                !formInput.institute_Exit_Domain_Expiry_Date.isValid &&
                showFormError
              }
              error="Date must be in future."
            />
          </div>
          <div className="formFieldwrap">
            <FormInput
              type="text"
              name="institute_Exit_Domain_Message"
              value={formInput.institute_Exit_Domain_Message.value}
              onChange={handleChange}
              label="Message"
            />
          </div>

          <div className="supportRequestFormAction">
            {postSupportMailData.loading ? (
              <button className="button btn-md button-theme btn-sm" type="button">
                Loading...
              </button>
            ) : (
              <button className="button btn-md button-theme btn-sm" type="submit">
                Send Request
              </button>
            )}

            <button
              className="button btn-o-primary primary btn-sm"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SupportRequestForm;
