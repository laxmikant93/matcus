import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../../../Common/Form/FormInput";
import Upload from "../../../../../Common/Upload/index";
import FormError from "../../../../../Common/Form/FormError";
import { useDispatch, useSelector } from "react-redux";
import ValidationFile from "../../../../Auth/ValidationFile";
import {
  postChequeDetails,
  updatePaymentDetails,
  paymentLists,
} from "../../../../../store/actions/paymentmode";

const AddCheque = ({ updateItem, onclose }) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { owner, institute } = useSelector((state) => {
    return {
      institute: state.user.user_institute,
      owner: state.user._id,
    };
  });

  const [invalidError, setInvalidError] = useState(false);
  const [error, setError] = useState(false);
  const [chequeDetails, setChequeDetails] = useState({
    bankname: { value: "", isValid: false },
    payto: { value: "", isValid: false },
    upload: { value: "", isValid: false },
  });

  const [once, setOnce] = useState(false);
  if (updateItem && !once) {
    setOnce(true);
    const temp = {
      newbankname: updateItem.cancelledCheque.bankname,
      newpayto: updateItem.cancelledCheque.payto,
      newupload: updateItem.cancelledCheque.upload,
    };
    const data = {
      bankname: {
        value: temp.newbankname,
        isValid: ValidationFile.validEmpty(temp.newbankname),
      },
      payto: {
        value: temp.newpayto,
        isValid: ValidationFile.validEmpty(temp.newpayto),
      },
      upload: {
        value: temp.newupload,
        isValid: ValidationFile.validEmpty(temp.newupload),
      },
    };
    setChequeDetails({ ...data });
  }

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    const chequeDetailsData = {
      ...chequeDetails,
      [inputName]: {
        value: inputValue,
        isValid: inputValidation(inputName, inputValue),
      },
    };
    setChequeDetails(chequeDetailsData);
  };

  const [temp, setTemp] = useState(false);
  const uploadCheque = (data) => {
    setTemp(true);
    const imgData = data.location;
    const chequeDetailsData = {
      ...chequeDetails,
      upload: { value: imgData, isValid: true },
    };
    setChequeDetails(chequeDetailsData);
  };

  const inputValidation = (inputName, inputValue) => {
    switch (inputName) {
      case "bankname":
        return ValidationFile.validEmpty(inputValue);
      case "payto":
        return ValidationFile.validEmpty(inputValue);
      case "upload":
        return ValidationFile.validEmpty(inputValue);
      default:
        break;
    }
  };

  const isFormValid = () => {
    return chequeDetails.bankname.isValid &&
      chequeDetails.payto.isValid &&
      chequeDetails.upload.isValid
      ? true
      : false;
  };

  const getFormData = () => {
    return {
      bankname: chequeDetails.bankname.value,
      payto: chequeDetails.payto.value,
      upload: chequeDetails.upload.value,
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(true);
    const data = {
      cancelledCheque: getFormData(),
      type: "cheque",
      owner: owner,
      institute: institute,
      status: "Active",
    };
    if (isFormValid()) {
      dispatch(postChequeDetails(data));
      onclose();
      history("/payment-mode-details");
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    setError(true);
    const data = {
      cancelledCheque: getFormData(),
      type: "cheque",
      owner: owner,
      institute: institute,
    };
    if (updateItem && isFormValid()) {
      dispatch(updatePaymentDetails(updateItem._id, data));
      dispatch(paymentLists(institute));
      dispatch(paymentLists(institute));
      onclose();
    }
  };

  return (
    <React.Fragment>
      <div className="AddChequeModal">
        <div className="formFieldwrap">
          <FormInput
            name="bankname"
            defaultValue={chequeDetails.bankname.value}
            onChange={handleChange}
            label="Bank Name"
            placeholder="Bank Name"
          />
          <FormError
            show={error && !chequeDetails.bankname.isValid}
            error="Bank name is required."
          />
        </div>
        <div className="formFieldwrap">
          <FormInput
            name="payto"
            defaultValue={chequeDetails.payto.value}
            onChange={handleChange}
            label="A/C Holder's Name"
            placeholder="A/C Holder's Name"
          />
          <FormError
            show={error && !chequeDetails.payto.isValid}
            error="A/C holder's name is required."
          />
        </div>
        <p className="text-xs w-600"> Upload Cheque</p>
        <ul className="DashedInstructionList">
          <li className="text-xxs">
            For images accept only .PDF, .PNG or .JPG file format.
          </li>
          <li className="text-xxs">Maximum file size 10MB.</li>
        </ul>
        <div className="formFieldwrap mt-15">
          <Upload
            onUploaded={uploadCheque}
            size="1"
            label="Upload File"
            invalidError={() => {
              setInvalidError(true);
            }}
            IconFileUploadClass="icon-file-upload base i-xs"
          />
          {updateItem && chequeDetails.upload.value && !temp && (
            <a
              href={chequeDetails.upload.value}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Image
            </a>
          )}
          <FormError
            show={!invalidError && error && !chequeDetails.upload.value}
            error="File required"
          />
        </div>
      </div>
      {updateItem ? (
        <button
          type="submit"
          className="button btn-md button-theme"
          onClick={handleUpdate}
        >
          Update Cheque
        </button>
      ) : (
        <button
          type="submit"
          className="button btn-md button-theme"
          onClick={handleSubmit}
        >
          Save Cheque
        </button>
      )}
    </React.Fragment>
  );
};

export default AddCheque;
