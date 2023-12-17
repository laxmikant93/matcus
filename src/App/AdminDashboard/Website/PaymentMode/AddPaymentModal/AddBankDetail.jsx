import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../../../Common/Form/FormInput";
import FormTextArea from "../../../../../Common/Form/FormTextArea";
import FormError from "../../../../../Common/Form/FormError";
import { useDispatch, useSelector } from "react-redux";
import ValidationFile from "../../../../../Classes/ValidationFile";
import { postBankDetails, updatePaymentDetails, paymentLists, ifscValidation }
  from "../../../../../store/actions/paymentmode"
const AddBankDetail = ({ updateItem, onclose, PopUpClose }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
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
  })



  useEffect(() => {
    if (PopUpClose) {
      setBankDetails({
        acname: { value: "", isValid: false },
        acnumber: { value: "", isValid: false },
        ifscCode: { value: "", isValid: false },
        bankname: { value: "", isValid: false },
        branchname: { value: "", isValid: false },
        branchaddress: { value: "", isValid: false }
      })
    }

  }, [PopUpClose])

  // const [once, setOnce] = useState(false)

  useEffect(() => {
    if (updateItem) {
      const temp = {

        newacname: updateItem.bankDetails.acname,
        newacnumber: updateItem.bankDetails.acnumber,
        newifscCode: updateItem.bankDetails.ifscCode,
        newbankname: updateItem.bankDetails.bankname,
        newbranchname: updateItem.bankDetails.branchname,
        newbranchaddress: updateItem.bankDetails.branchaddress,
      }
      const data = {
        "acname":
        {
          value: temp.newacname,
          isValid: ValidationFile.validEmpty(temp.newacname)
        },
        "acnumber":
        {
          value: temp.newacnumber,
          isValid: ValidationFile.validEmpty(temp.newacnumber)
        },
        "ifscCode":
        {
          value: temp.newifscCode,
          isValid: ValidationFile.alphaNumeric(temp.newifscCode)
        },
        "bankname":
        {
          value: temp.newbankname,
          isValid: ValidationFile.validEmpty(temp.newbankname)
        },
        "branchname":
        {
          value: temp.newbranchname,
          isValid: true
        },
        "branchaddress":
        {
          value: temp.newbranchaddress,
          isValid: true
        }
      }
      const spread = { ...data }
      if (success) {
        const temp = {
          ...spread
        }
        setBankDetails(temp)
      }
    }
  }, [updateItem, success])
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
      acname: bankDetails.acname.value,
      acnumber: bankDetails.acnumber.value,
      ifscCode: bankDetails.ifscCode.value,
      bankname: bankDetails.bankname.value,
      branchname: bankDetails.branchname.value,
      branchaddress: bankDetails.branchaddress.value
    }
  }

  const handleSubmit = (event) => {
    setError(true)
    event.preventDefault();
    const data = { bankDetails: getFormData(), type: "bank", owner: owner, institute: institute, status: "Active" }
    if (isFormValid()) {
      dispatch(postBankDetails(data));
      onclose();
      history("/payment-mode-details")
      setError(false)
    }
  }

  const handleUpdate = (event) => {
    setError(true)
    event.preventDefault();
    const data = { bankDetails: getFormData(), type: "bank", owner: owner, institute: institute }
    isFormValid()
    if (updateItem && isFormValid()) {
      dispatch(updatePaymentDetails(updateItem._id, data));
      dispatch(paymentLists(institute))
      dispatch(paymentLists(institute))
      onclose();
      setError(false)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BANK, BRANCH, ADDRESS, bankDetails.ifscCode.value])


  return (
    <React.Fragment>
      <div className="AddBankDetailModal">
        <div className="formFieldwrap">
          <FormInput
            name="acname"
            value={bankDetails.acname.value}
            onChange={handleChange}
            label="A/C Name"
            placeholder="A/C Name"
            className={`${error && !bankDetails.acname.isValid ? "errorInput" : ""}`}
          />
          <FormError
            show={error && !bankDetails.acname.isValid}
            error="A/C name is required."
          />
        </div>

        <div className="ColumnWrapper col2">
          <div className="formFieldwrap">
            <FormInput
              value={bankDetails.acnumber.value}
              name="acnumber"
              type="number"
              onWheel={(e) => e.target.blur()}
              onChange={handleChange}
              label="A/C Number"
              placeholder="A/C Number"
              className={`${error && !bankDetails.acnumber.isValid ? "errorInput" : ""}`}
            />
            <FormError
              show={error && !bankDetails.acnumber.isValid}
              error="A/C number is required."
            />
          </div>
          <div className="formFieldwrap">
            <FormInput
              name="ifscCode"
              value={bankDetails.ifscCode.value}
              onChange={handleChange}
              onBlur={blurHandle}
              label="IFSC Code"
              placeholder="IFSC Code"
              className={`
              ${(error && !bankDetails.ifscCode.value) || (error && bankDetails.ifscCode.value && !bankDetails.ifscCode.isValid) || (error && bankDetails.ifscCode.value && bankDetails.ifscCode.isValid && ifscValidationMessage)
                  ? "errorInput" : ""}`
              }
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
            value={bankDetails.bankname.value}
            onChange={handleChange}
            label="Bank Name"
            placeholder="Bank Name"
            className={`${error && !bankDetails.bankname.isValid ? "errorInput" : ""}`}
          />
          <FormError
            show={error && !bankDetails.bankname.isValid}
            error="Bank name is required."
          />
        </div>
        <div className="formFieldwrap">
          <FormInput
            name="branchname"
            value={bankDetails.branchname.value}
            onChange={handleChange}
            label="Branch Name"
            placeholder="Branch Name"
          />
        </div>
        <div className="formFieldwrap">
          <FormTextArea
            name="branchaddress"
            value={bankDetails.branchaddress.value}
            onChange={handleChange}
            label="Branch Address"
            rows="3"
            placeholder="Branch Address"
            maxlength={80}
          />
        </div>
      </div>
      {updateItem ?
        (<button
          className="button btn-md button-theme btn-md"
          onClick={handleUpdate}
        >
          Update Bank Details
        </button>)
        : (<button
          className="button btn-md button-theme btn-md"
          onClick={handleSubmit}
        >
          Save Bank Details
        </button>)}
    </React.Fragment>
  );
};

export default AddBankDetail;
