import React, { useState } from 'react'
import AuthLayout from '../AuthLayout'
import FormInput from '../../../Common/Form/FormInput';
import iconGoogle from "../../../assets/Icons/icon-google.svg";
import AppLink from "../../../Common/AppLink";
import ValidationUtils from '../../../Classes/ValidationUtils';
import FormError from '../../../Common/Form/FormError';
import { useNavigate } from 'react-router-dom';

const CreateAccountSignUp = () => {

  const history = useNavigate();
  const [enteredValue, setEnteredValue] = useState("");
  const [isType, setIsType] = useState("");
  const [isError, setIsError] = useState(false)
  const [symbolsArr] = useState([" "]);
  const [formSubmit, setSumited] = useState(false);
  const [invalidContactLength, setInvalidContactLength] = useState(false);

  const onChangeValue = (e) => {
    let value = e.target.value;
    setEnteredValue(value)
    if (ValidationUtils.isEmpty(value)) {
      setIsError(true)
    } else {
      if (ValidationUtils.isEmail(value)) {
        setIsType("email")
        setIsError(false)
      }
      else if (ValidationUtils.contactNumber(value)) {
        setIsType("contact")
        setIsError(false)
      } else {
        setIsError(true)
      }
    }
    setSumited(false);
    setInvalidContactLength(false)
  }
  const isFormValid = () => {
    let result = false
    if (ValidationUtils.isEmpty(enteredValue)) {
      setIsError(true)
      result = false
    } else {
      if (isType === "email") {
        if (ValidationUtils.isEmail(enteredValue)) {
          setIsError(true)
          result = true
        } else {
          result = false
        }
      } else {
        if (ValidationUtils.contactNumber(enteredValue) && enteredValue.length > 7) {
          result = true
          setInvalidContactLength(false)
          setIsError(false)
        } else {
          result = false
          setInvalidContactLength(true)
          setIsError(true)
        }
      }
    }
    return result
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (isFormValid()) {
      history(`/auth/signup-password/${isType}/${enteredValue}`)
    }
    setSumited(true)
  }

  return (
    <AuthLayout>
      <div className='main_form'>
        <h2 className='pt-40 mb-30'>Create account</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="formFieldwrap">
            <FormInput className={`primary ${isError && formSubmit
              ? "errorInput"
              : ""
              }`
            }
              label="Enter phone number or e-mail" placeholder="Enter phone number or e-mail" onChange={(e) => onChangeValue(e)}
              value={enteredValue} onWheel={(e) => e.target.blur()} onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()} />
            <FormError
              show={enteredValue === "" && isError && formSubmit}
              error="Please enter email or phone number."
            />
            <FormError
              show={enteredValue && isError && formSubmit && invalidContactLength === false}
              error="Please enter valid email or phone number."
            />
            <FormError
              show={enteredValue && invalidContactLength === true && isError && formSubmit}
              error="Phone number cannot be less than 8 digits."
            />
          </div>
          <button className='button button-primary btn-sm button-block' type="submit">Continue</button>
        </form>

        <div className='posi_border'>
          or
        </div>
        <button className='button button-white google_btn'>
          <img src={iconGoogle} alt="" />&nbsp;&nbsp;
          Sign in with Google</button>
        <div className='text-change mt-10'>
          <p>Already have a account? <span className='primary'><AppLink to="#">Login</AppLink></span></p>
        </div>
      </div>
    </AuthLayout>
  )
}

export default CreateAccountSignUp