/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../../../Common/Form/FormInput";
import Upload from "../../../../../Common/Upload/index";
import { IconAttachment } from "../../../../../Common/Icon";
import FormError from "../../../../../Common/Form/FormError";
import { useDispatch, useSelector } from "react-redux";
import ValidationFile from "../../../../../Classes/ValidationFile";
import {
  postUpiDetails,
  updatePaymentDetails,
  paymentLists,
} from "../../../../../store/actions/paymentmode";

const UPI = ({ updateItem, onclose }) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { owner, institute } = useSelector((state) => {
    return {
      institute: state.user.user_institute,
      owner: state.user._id,
    };
  });

  const [error, setError] = useState(false);
  const [upiDetails, setUpiDetails] = useState({
    name: { value: "", isValid: false },
    merchantID: { value: "", isValid: false },
    merchantname: { value: "", isValid: false },
    merchantmobile: { value: "", isValid: false },
    upload: { value: "", isValid: false },
  });

  const [once, setOnce] = useState(false);
  if (updateItem && !once) {
    setOnce(true);
    const temp = {
      newname: updateItem.addUpi.name,
      newmerchantID: updateItem.addUpi.merchantID,
      newmerchantname: updateItem.addUpi.merchantname,
      newmerchantmobile: updateItem.addUpi.merchantmobile,
      newupload: updateItem.addUpi.upload,
    };
    const data = {
      name: {
        value: temp.newname,
        isValid: ValidationFile.validEmpty(temp.newname),
      },
      merchantID: {
        value: temp.newmerchantID,
        isValid: true,
      },
      merchantname: {
        value: temp.newmerchantname,
        isValid: ValidationFile.validEmpty(temp.newmerchantname),
      },
      merchantmobile: {
        value: temp.newmerchantmobile,
        isValid: ValidationFile.validContact(temp.newmerchantmobile),
      },
      upload: {
        value: temp.newupload,
        isValid: true,
      },
    };
    setUpiDetails({ ...data });
  }

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    const upiDetailsData = {
      ...upiDetails,
      [inputName]: {
        value: inputValue,
        isValid: inputValidation(inputName, inputValue),
      },
    };
    setUpiDetails(upiDetailsData);
  };

  const uploadUpi = (data) => {
    const imgData = data.location;
    const upiDetailsData = {
      ...upiDetails,
      upload: { value: imgData, isValid: true },
    };
    setUpiDetails(upiDetailsData);
  };

  const removeUploadUpi = () => {
    const temp = {
      ...upiDetails,
      upload: "",
    };
    setUpiDetails(temp);
  };

  const inputValidation = (inputName, inputValue) => {
    switch (inputName) {
      case "name":
        return ValidationFile.validEmpty(inputValue);
      case "merchantname":
        return ValidationFile.validEmpty(inputValue);
      case "merchantmobile":
        return ValidationFile.validContact(inputValue);
      default:
        break;
    }
  };

  const isFormValid = () => {
    return upiDetails.name.isValid &&
      upiDetails.merchantname.isValid &&
      upiDetails.merchantmobile.isValid
      ? true
      : false;
  };

  const getFormData = () => {
    return {
      name: upiDetails.name.value,
      merchantID: upiDetails.merchantID.value,
      merchantname: upiDetails.merchantname.value,
      merchantmobile: upiDetails.merchantmobile.value,
      upload: upiDetails.upload.value,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(true);
    const data = {
      addUpi: getFormData(),
      type: "upi",
      owner: owner,
      institute: institute,
      status: "Active",
    };
    if (isFormValid()) {
      dispatch(postUpiDetails(data));
      onclose();
      history("/payment-mode-details");
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setError(true);
    const data = {
      addUpi: getFormData(),
      type: "upi",
      owner: owner,
      institute: institute,
    };
    if (isFormValid()) {
      dispatch(updatePaymentDetails(updateItem._id, data));
      dispatch(paymentLists(institute));
      dispatch(paymentLists(institute));
      onclose();
    }
  };


  useEffect(() => {
    setUpiDetails({
      name: { value: "", isValid: false },
      merchantID: { value: "", isValid: false },
      merchantname: { value: "", isValid: false },
      merchantmobile: { value: "", isValid: false },
      upload: { value: "", isValid: false },
    })
    setOnce(false)
    setError(false)
  }, [onclose])


  return (
    <React.Fragment>
      <div className="AddBankDetailModal">
        <div className="formFieldwrap">
          <FormInput
            name="name"
            value={upiDetails.name.value}
            onChange={handleChange}
            label="UPI Payment App Name"
            placeholder="Payment app such as G Pay, Paytm, BHIM, or any other banking app."
            className={error && !upiDetails.name.isValid ? "errorInput" : ""}
          />
          <FormError
            show={error && !upiDetails.name.isValid}
            error="UPI name is required."
          />
        </div>
        <div className="ColumnWrapper col2">
          <div className="formFieldwrap">
            <FormInput
              name="merchantID"
              value={upiDetails.merchantID.value}
              onChange={handleChange}
              label="UPI ID"
              placeholder="UPI ID"
            />
          </div>
          <div className="formFieldwrap">
            <FormInput
              name="merchantname"
              value={upiDetails.merchantname.value}
              onChange={handleChange}
              label="Merchant Name"
              placeholder="Merchant Name"
              maxlength={80}

              className={error && !upiDetails.merchantname.isValid ? "errorInput" : ""}
            />
            <FormError
              show={error && !upiDetails.merchantname.isValid}
              error="Merchant name is required."
            />
          </div>
        </div>
        <div className="formFieldwrap">
          <FormInput
            type="number"
            name="merchantmobile"
            onWheel={(e) => e.target.blur()}
            value={upiDetails.merchantmobile.value}
            onChange={handleChange}
            label="Merchant Mobile No."
            placeholder="Merchant Mobile No."
            className={(error && !upiDetails.merchantmobile.value) || (error &&
              upiDetails.merchantmobile.value &&
              !upiDetails.merchantmobile.isValid) ? "errorInput" : ""}
          />
          <FormError
            show={error && !upiDetails.merchantmobile.value}
            error="Merchant mobile number is required."
          />
          <FormError
            show={
              error &&
              upiDetails.merchantmobile.value &&
              !upiDetails.merchantmobile.isValid
            }
            error="Invalid Merchant Mobile."
          />
        </div>
      </div>
      {updateItem ? (
        <button className="button btn-md button-theme btn-md" onClick={handleUpdate}>
          Update UPI Details
        </button>
      ) : (
        <button className="button btn-md button-theme btn-md" onClick={handleSubmit}>
          Save UPI Details
        </button>
      )}
    </React.Fragment>
  );
};

export default UPI;
