import React, { useState } from "react";
import FormInput from "../../Common/Form/FormInput";
import FormError from "../../Common/Form/FormError";
import { useDispatch, useSelector } from "react-redux";
import ValidationFile from "../../Classes/ValidationFile";
import { paymentDetailStore, emailCheckUniquePost, emailCheckUniqueReset }
  from "../../store/actions/paymentmode"
import { useEffect } from "react";
const AddAccountDetails = ({ onclose, viewShow, paymentModeData }) => {
  const dispatch = useDispatch();
  const { uniqueEmailLoading, uniqueEmailSuccess, uniqueEmailData, userInsititue } =
    useSelector((state) => {
      return {
        userInsititue: state.user.user_institute,
        uniqueEmailLoading: state.paymentmode.uniqueEmail.loading,
        uniqueEmailSuccess: state.paymentmode.uniqueEmail.success,
        uniqueEmailData: state.paymentmode.uniqueEmail.data,
      };
    });
  const [error, setError] = useState(false)
  const [bankDetails, setBankDetails] = useState({
    acname: { value: "", isValid: false },
    acnumber: { value: "", isValid: false },
    ifscCode: { value: "", isValid: false },
    insituteEmail: { value: "", isValid: false },
  });
  const handleChange = (e) => {
    if (showUniqueError) {
      dispatch(emailCheckUniqueReset())
      setLoadinguUniqueCheck(false)
    }
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
    setShowUniqueError(false);
    setError(false)
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
      case "insituteEmail":
        return ValidationFile.isEmail(inputValue);
      default:
        break;
    }
  };

  const isFormValid = () => {
    return (bankDetails.acname.isValid && bankDetails.acnumber.isValid
      && bankDetails.ifscCode.isValid && bankDetails.insituteEmail.isValid) ? true : false
  };


  const getFormData = () => {
    return {
      account_type: accountType,
      account_beneficiary_name: bankDetails.acname.value,
      account_number: bankDetails.acnumber.value,
      account_ifsc_code: bankDetails.ifscCode.value,
      institute_email: bankDetails.insituteEmail.value,
    }
  }
  const [showUniqueError, setShowUniqueError] = useState(false);
  const [loadinguUniqueCheck, setLoadinguUniqueCheck] = useState(false);

  useEffect(() => {
    if (uniqueEmailSuccess && !uniqueEmailLoading) {
      if (uniqueEmailData.message === "Email Already Exist") {
        setShowUniqueError(true);
      } else {
        handleSubmit()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueEmailSuccess, uniqueEmailLoading])

  const checkUniqueEmail = () => {
    setError(true)
    if (isFormValid()) {
      setLoadinguUniqueCheck(true)
      dispatch(emailCheckUniquePost(emailCheckData()))
    }
  }
  const emailCheckData = () => {
    return {
      "email": bankDetails.insituteEmail.value,
      "institute": userInsititue
    }
  }

  const handleSubmit = () => {
    setLoadinguUniqueCheck(false)
    dispatch(paymentDetailStore(getFormData()))
    onclose();

  }

  const [accountType, setAccountType] = useState("Current");
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);

  useEffect(() => {
    if (paymentModeData !== "") {
      setBankDetails({
        acname: { value: paymentModeData.account_beneficiary_name ? paymentModeData.account_beneficiary_name : "", isValid: true },
        acnumber: { value: paymentModeData.account_number ? paymentModeData.account_number : "", isValid: true },
        ifscCode: { value: paymentModeData.account_ifsc_code ? paymentModeData.account_ifsc_code : "", isValid: true },
        insituteEmail: { value: paymentModeData.institute_email ? paymentModeData.institute_email : "", isValid: true },
      });
    }
  }, [paymentModeData])
  return (
    <React.Fragment>
      <div className="AddBankDetailModal">
        <div className="formFieldwrap">
          <FormInput
            onWheel={(e) => e.target.blur()}
            onKeyDown={(e) =>
              symbolsArr.includes(e.key) &&
              e.preventDefault()
            }
            type="number"
            name="acnumber"
            value={bankDetails.acnumber.value}
            onChange={handleChange}
            label="Account Number"
            placeholder="Account Number"
            disabled={viewShow}
          />
          <FormError
            show={error && !bankDetails.acnumber.value}
            error="Account Number is required."
          />
        </div>
        <div className="formFieldwrap">
          <FormInput
            name="acname"
            value={bankDetails.acname.value}
            onChange={handleChange}
            label="Account Beneficiary name"
            placeholder="Account Beneficiary name"
            disabled={viewShow}
          />
          <FormError
            show={error && !bankDetails.acname.isValid}
            error="A/C name is required."
          />
        </div>
        <div className="ColumnWrapper  col3">
          <div className="formFieldwrap freeStrusture-banktype-radio">
            <label className="small">
              <input
                type="radio"
                name="Account Type"
                value="Saving"
                onChange={() => setAccountType("Saving")}
                checked={accountType === "Saving"}
                disabled={viewShow}
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
                disabled={viewShow}
              />
              Current
            </label>
          </div>
          <div className="formFieldwrap">
            <FormInput
              name="ifscCode"
              value={bankDetails.ifscCode.value}
              onChange={handleChange}
              label="IFSC Code"
              placeholder="IFSC Code"
              disabled={viewShow}
              maxLength="11"
            />
            <FormError
              show={error && !bankDetails.ifscCode.value}
              error="IFSC code is required."
            />
          </div>
          <div className="formFieldwrap">
            <FormInput
              name="insituteEmail"
              value={bankDetails.insituteEmail.value}
              onChange={handleChange}
              label="Insititue Email*"
              placeholder="Insititue Email*"
              disabled={viewShow}
            />
            <FormError
              show={error && !bankDetails.insituteEmail.value}
              error="Insitiute Email is required."
            />
            <FormError
              show={error && bankDetails.insituteEmail.value && !bankDetails.insituteEmail.isValid}
              error="Insitiute Email is invalid."
            />
            <FormError
              show={showUniqueError}
              error="Insitiute Email is already in use."
            />
          </div>
        </div>
      </div>

      {uniqueEmailSuccess && showUniqueError &&
        < button
          className="button btn-md button-theme"
          onClick={checkUniqueEmail}
        >
          Save Bank Details
        </button>
      }
      {!viewShow && !loadinguUniqueCheck && !uniqueEmailSuccess &&
        < button
          className="button btn-md button-theme"
          onClick={checkUniqueEmail}
        >
          Save Bank Details
        </button>

      }
      {loadinguUniqueCheck && !uniqueEmailSuccess && !viewShow && (
        < button
          className="button btn-md button-theme"
        >
          Loading...
        </button>)
      }
    </React.Fragment >
  );
};

export default AddAccountDetails;
