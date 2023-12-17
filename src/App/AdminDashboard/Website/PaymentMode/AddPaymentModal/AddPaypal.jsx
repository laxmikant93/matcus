import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import FormInput from "../../../../../Common/Form/FormInput";
import FormTextArea from "../../../../../Common/Form/FormTextArea";
import FormError from "../../../../../Common/Form/FormError";
import { useDispatch, useSelector } from "react-redux";
import ValidationFile from "../../../../Auth/ValidationFile";
import { postPaypalDetails, updatePaymentDetails, paymentLists }
  from "../../../../../store/actions/paymentmode"

const AddPaypal = ({ updateItem, onclose }) => {


  const dispatch = useDispatch();
  const history = useNavigate();

  const { owner, institute } = useSelector((state) => {
    return {
      institute: state.user.user_institute,
      owner: state.user._id
    };
  });

  const [error, setError] = useState(false)
  const [paypalDetails, setPaypalDetails] = useState({
    id: { value: "", isValid: false },
    email: { value: "", isValid: false },
    code: { value: "", isValid: false }
  })


  const [once, setOnce] = useState(false)
  if (updateItem && !once) {
    setOnce(true)
    const temp = {
      newid: updateItem.addPaypal.id,
      newemail: updateItem.addPaypal.email,
      newcode: updateItem.addPaypal.code
    }
    const data = {
      "id":
      {
        value: temp.newid,
        isValid: ValidationFile.validEmpty(temp.newid)
      },
      "email":
      {
        value: temp.newemail,
        isValid: ValidationFile.validEmpty(temp.newemail)
      },
      "code":
      {
        value: temp.newcode,
        isValid: ValidationFile.validEmpty(temp.newcode)
      }
    }
    setPaypalDetails({ ...data })
  }


  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    const paypalDetailsData = {
      ...paypalDetails,
      [inputName]:
      {
        value: inputValue,
        isValid: inputValidation(inputName, inputValue)
      }
    };
    setPaypalDetails(paypalDetailsData);
  }

  const inputValidation = (inputName, inputValue) => {
    switch (inputName) {
      case "id":
        return ValidationFile.validEmpty(inputValue);
      case "email":
        return ValidationFile.validEmail(inputValue);
      default:
        break;
    }
  };

  const isFormValid = () => {
    return (paypalDetails.id.isValid && paypalDetails.email.isValid) ? true : false
  };


  const getFormData = () => {
    return {
      id: paypalDetails.id.value,
      email: paypalDetails.email.value,
      code: paypalDetails.code.value
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(true)
    const data = { addPaypal: getFormData(), type: "paypal", owner: owner, institute: institute, status: "Active" }
    if (isFormValid()) {
      dispatch(postPaypalDetails(data))
      onclose();
      history("/payment-mode-details")
    }
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    setError(true)
    const data = { addPaypal: getFormData(), type: "paypal", owner: owner, institute: institute }
    if (updateItem && isFormValid()) {
      dispatch(updatePaymentDetails(updateItem._id, data));
      dispatch(paymentLists(institute))
      dispatch(paymentLists(institute))
      onclose();
    }
  }

  return (
    <React.Fragment>
      <div className="AddPaypalModal">
        <div className="formFieldwrap">
          <FormInput
            name="id"
            defaultValue={paypalDetails.id.value}
            onChange={handleChange}
            label="PayPal ID"
            placeholder="PayPal ID"
          />
          <FormError
            show={error && !paypalDetails.id.isValid}
            error="PayPal ID is required."
          />
        </div>
        <div className="formFieldwrap">
          <FormInput
            name="email"
            defaultValue={paypalDetails.email.value}
            onChange={handleChange}
            label="PayPal Email"
            placeholder="PayPal Email"
          />
          <FormError
            show={error && !paypalDetails.email.value}
            error="PayPal email is required."
          />
          <FormError
            show={error && !paypalDetails.email.isValid && paypalDetails.email.value !== ""}
            error="Invalid email"
          />
        </div>
        <div className="formFieldwrap">
          <FormTextArea
            name="code"
            defaultValue={paypalDetails.code.value}
            onChange={handleChange}
            label="PayPal button code"
            rows="10"
            placeholder="Paste PayPal button code."
          />
        </div>
      </div>
      <div className="AddPaypalModalBtn">
        {updateItem ?
          (<button
            className="button btn-md button-theme"
            onClick={handleUpdate}
          >
            Update PayPal Details
          </button>)
          : (<button
            className="button btn-md button-theme"
            onClick={handleSubmit}
          >
            Save PayPal Details
          </button>)}
        <a
          href="https://www.paypal.com/us/smarthelp/article/how-do-i-add-a-paypal-payment-button-to-my-website-faq3629"
          className="btnText primary"
          target="_blank"
          rel="noopener noreferrer"
          alt=""
        >
          How to add PayPal Button Code
        </a>
      </div>
    </React.Fragment>
  );
};

export default AddPaypal;
