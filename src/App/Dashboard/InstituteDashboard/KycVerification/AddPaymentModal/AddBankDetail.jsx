/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import FormInput from "../../../../../Common/Form/FormInput";
import FormTextArea from "../../../../../Common/Form/FormTextArea";
import FormError from "../../../../../Common/Form/FormError";
import { useDispatch, useSelector } from "react-redux";
import ValidationFile from "../../../../../Classes/ValidationFile";
import { updatePaymentDetails, paymentDetailStore, paymentLists, ifscValidation }
  from "../../../../../store/actions/paymentmode"


const AddBankDetail = ({ onclose }) => {

  const dispatch = useDispatch();
  const { owner, institute } = useSelector((state) => {
    return {
      institute: state.user.user_institute,
      owner: state.user._id
    };
  });


  // use selector for ifsc
  const { ifscValidationMessage, success } = useSelector((state) => {
    return {
      ifscValidationMessage: state.paymentmode.ifscValidate.data,
      success: state.paymentmode.ifscValidate.success,
    };
  });

  const { BANK, BRANCH, ADDRESS } = ifscValidationMessage;


  const [error, setError] = useState(false)
  const [bankDetails, setBankDetails] = useState({
    acname: { value: "", isValid: false },
    acnumber: { value: "", isValid: false },
    ifscCode: { value: "", isValid: false },
    bankname: { value: "", isValid: false },
    branchname: { value: "", isValid: false },
    branchaddress: { value: "", isValid: false }
  });

  // useEffect(() => {
  //   if (PopUpClose) {
  //     setBankDetails({
  //       acname: { value: "", isValid: false },
  //       acnumber: { value: "", isValid: false },
  //       ifscCode: { value: "", isValid: false },
  //       bankname: { value: "", isValid: false },
  //       branchname: { value: "", isValid: false },
  //       branchaddress: { value: "", isValid: false }
  //     })
  //   }

  // }, [PopUpClose])

  // const [once, setOnce] = useState(false)

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    const bankDetailsData = {
      ...bankDetails,
      [inputName]:
      {
        value: inputValue,
        isValid: inputValidation(inputName, inputValue)
      }
    };
    setBankDetails(bankDetailsData);
  }

  const inputValidation = (inputName, inputValue) => {
    switch (inputName) {
      case "acname":
        return ValidationFile.validEmpty(inputValue);
      case "acnumber":
        return ValidationFile.validEmpty(inputValue);
      case "ifscCode":
        return ValidationFile.alphaNumeric(inputValue);
      case "bankname":
        return ValidationFile.validEmpty(inputValue);
      default:
        break;
    }
  };

  const isFormValid = () => {
    return (bankDetails.acname.isValid && bankDetails.acnumber.isValid
      && bankDetails.ifscCode.isValid && bankDetails.bankname.isValid) ? true : false
  };


  const getFormData = () => {
    return {
      account_type: accountType,
      account_beneficiary_name: bankDetails.acname.value,
      account_number: bankDetails.acnumber.value,
      account_ifsc_code: bankDetails.ifscCode.value,
      bankname: bankDetails.bankname.value,
      branchname: bankDetails.branchname.value,
      branchaddress: bankDetails.branchaddress.value
    }
  }

  const handleSubmit = (event) => {
    setError(true)
    event.preventDefault();

    if (isFormValid()) {
      dispatch(paymentDetailStore(getFormData()))
      onclose();
    }
  }

  const blurHandle = () => {
    dispatch(ifscValidation(bankDetails.ifscCode.value))
    ifIfScInputValid_SetData();
  }


  const ifIfScInputValid_SetData = () => {
    const spread = { ...bankDetails }
    if (ifscValidationMessage === "ifsc is not valid") {
      const temp = {
        ...spread,
        bankname: {
          value: "",
          isValid: false
        },
        branchname: {
          value: "",
          isValid: false
        },
        branchaddress: {
          value: "",
          isValid: false
        }
      }
      setBankDetails(temp)
    }
  }


  useEffect(() => {
    const spread = { ...bankDetails }
    if (success) {
      const temp = {
        ...spread,
        bankname: {
          value: BANK,
          isValid: true
        },
        branchname: {
          value: BRANCH,
          isValid: true
        },
        branchaddress: {
          value: ADDRESS,
          isValid: true
        }
      }
      setBankDetails(temp)
    }
    else if (ifscValidationMessage === "ifsc is not valid") {
      ifIfScInputValid_SetData();
    }
    blurHandle();
  }, [BANK, BRANCH, ADDRESS, bankDetails.ifscCode.value])

  const [accountType, setAccountType] = useState("Saving")
  return (
    <React.Fragment>
      <div className="AddBankDetailModal">
        <div className="formFieldwrap">
          <FormInput
            name="acname"
            value={bankDetails.acname.value}
            onChange={handleChange}
            label="Account Beneficiary name"
            placeholder="Account Beneficiary name"
          />
          <FormError
            show={error && !bankDetails.acname.isValid}
            error="A/C name is required."
          />
        </div>
        <div className="ColumnWrapper col2">
          <p>Account Type :</p>
          <div className="formFieldwrap">
            <label className="small">
              <input
                type="radio"
                name="Account Type"
                value="Saving"
                onChange={() => setAccountType("Saving")}
                checked={accountType === "Saving"}
              />
              Saving
            </label>
            <label className="small">
              <input
                type="radio"
                name="Account Type"
                value="Current"
                onChange={() => setAccountType("Current")}
                checked={accountType === "Current"}
              />
              Current
            </label>
          </div>
          <div className="formFieldwrap">
            <FormInput
              name="ifscCode"
              value={bankDetails.ifscCode.value}
              onChange={handleChange}
              onBlur={blurHandle}
              label="IFSC Code"
              placeholder="IFSC Code"
            />
            <FormError
              show={error && !bankDetails.ifscCode.value}
              error="IFSC code is required."
            />
            <FormError
              show={error && bankDetails.ifscCode.value && !bankDetails.ifscCode.isValid}
              error="Invalid IFSC Code"
            />
            <FormError
              show={error && bankDetails.ifscCode.value && bankDetails.ifscCode.isValid && ifscValidationMessage === "ifsc is not valid"}
              error="Invalid IFSC Code"
            />
          </div>
        </div>
        <div className="formFieldwrap">
          <FormInput
            name="bankname"
            readOnly
            value={bankDetails.bankname.value}
            onChange={handleChange}
            label="Bank Name"
            placeholder="Bank Name"
          />
          <FormError
            show={error && !bankDetails.bankname.isValid}
            error="Bank name is required."
          />
        </div>
        <div className="formFieldwrap">
          <FormInput
            name="branchname"
            readOnly
            value={bankDetails.branchname.value}
            onChange={handleChange}
            label="Branch Name"
            placeholder="Branch Name"
          />
        </div>
        <div className="formFieldwrap">
          <FormTextArea
            name="branchaddress"
            readOnly
            value={bankDetails.branchaddress.value}
            onChange={handleChange}
            label="Branch Address"
            rows="3"
            placeholder="Branch Address"
          />
        </div>
      </div>
      <button
        className="button btn-md button-theme"
        onClick={handleSubmit}
      >
        Save Bank Details
      </button>

    </React.Fragment>
  );
};

export default AddBankDetail;
