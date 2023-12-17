import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2';
import FormError from '../../Common/Form/FormError';
import FormInput from '../../Common/Form/FormInput';
import './commonform.scss'
import Request from '../../Classes/Request';
import { array } from 'prop-types';
import { useDispatch } from 'react-redux';
import { showSuccessPopup } from '../../store/actions/successmessagepopup';
import ValidationUtils from '../../Classes/ValidationUtils';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ScrollPageTop from '../../Common/ScrollPageTop';

const Commonform = () => {
  const contactRequest = new Request()
  const { user } = useSelector((state) => {
    return {
      user: state.user
    }
  })
  let { state } = useParams()

  const [fullName, setFullName] = useState("")
  const [countryCode, seCountryCode] = useState("91");
  const [contact, setContact] = useState("")
  const [email, setEmail] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [serviceName, setServiceName] = useState([])
  //Error
  const [contactError, setContactError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const history = useNavigate()
  const inputHandle = (e) => {
    let inputValue = e.target.value
    let inputName = e.target.name
    if (inputName === "full_name") {
      setFullName(inputValue)
    }
    if (inputName === "email") {
      setEmail(inputValue)
      setEmailError(false)
    }
    if (inputName === "company_name") {
      setCompanyName(inputValue)
    }
  }

  const handlePhoneInput = (inputValue, countryDetail) => {
    if (inputValue > 9) {
      let dialCode = countryDetail.dialCode;
      let mobile = inputValue.replace(dialCode, "");
      setContact(mobile);
      seCountryCode(dialCode);
      setContactError(ValidationUtils.isEmpty(mobile));
    }
  }
  const numberValidation = () => {
    let isValid = true
    if (contact && countryCode === "91") {
      if (contact.length < 10) {
        isValid = false;
        setContactError(true)
      } else {
        isValid = true
      }
    } else {
      isValid = false
    }
    return isValid
  }
  const validEmail = () => {
    let isValid = true
    if (email) {
      if (!ValidationUtils.isEmail(email)) {
        isValid = false
        setEmailError(true)
      } else {
        isValid = true
      }
    } else {
      isValid = true
    }
    return isValid
  }
  let data = {
    name: fullName,
    email: email,
    countryCode: countryCode,
    contact: contact,
    companyName: companyName,
    serviceName: serviceName,
    action: user.user_business_type === "LMS" ? "edneed" : "webneed"
  }
  const handleRoute = () => {
    setLoading(false)
    history("/thank-you")
  }
  const handleSubmit = async () => {
    let numberValid = numberValidation()
    setContactError(!numberValid)
    let emailValid = validEmail()
    setEmailError(!emailValid)

    if (numberValid && emailValid) {
      setLoading(true)
      contactRequest.post(contactRequest.url("/contact/submitrequestedneed", "commonservices"),
        data,
        (success) => {
          handleRoute()
          dispatch(showSuccessPopup("Your Request is Submitted"))
        },
        (error) => {
        }
      )
    }
  }

  // const handleCheckboxes = (e) => {
  //   let inputChecked = e.target.checked;
  //   let value = e.target.value
  //   let array = serviceName;
  //   if (inputChecked) {
  //     array.push(value)
  //   }
  //   else {
  //     let index = array.indexOf(value);
  //     array.splice(index, 1);
  //   }
  //   setServiceName([...array]);
  // }
  const handleCheck = (e) => {
    let inputChecked = e.target.checked;
    let value = e.target.value
    let array = serviceName;
    if (inputChecked) {
      array.push(value)
    } else {
      let index = array.indexOf(value)
      array.splice(index, 1)
    }
    setServiceName([...array])
  }

  return (
    <React.Fragment>
      <ScrollPageTop/>
      <form action="">
        <div className="formFieldwrap">
          <FormInput
            type="text"
            // label="name"
            id="Full Name"
            name="full_name"
            value={fullName}
            placeholder="Full Name"
            maxLength="80"
            label="Full Name"
            onChange={inputHandle}
          />
          <FormError
            error=" Full Name is required."
          />
        </div>

        <div className="formFieldwrap">
          <FormInput
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Email Address"
            maxLength="80"
            label="Email"
            onChange={inputHandle}
          />
          <FormError
            show={email && emailError}
            error="Invalid Email."
          />
        </div>

        <div className="formFieldwrap">
          <div className="cstmPhoneInput">
            <PhoneInput
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              countryCodeEditable={true}
              containerClass="form-group"
              inputClass="form-control"
              specialLabel="hii"
              country={"in"}
              value={`${countryCode}${contact} `}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              onChange={(value, country) => {
                handlePhoneInput(value, country);
              }}
              onKeyUp={(value, country) => {
                handlePhoneInput(value, country);
              }}
              enableSearch
              disableSearchIcon

            />
            <label className="animLabel" htmlFor="mobile_number">
              Mobile Number
            </label>
          </div>
          <FormError
            show={!contact && contactError}
            error="contact is required."
          />
          <FormError
            show={contact && contactError}
            error="Invalid contact number."
          />
        </div>

        <div className="formFieldwrap">
          <FormInput
            type="text"
            id="company"
            name="company_name"
            value={companyName}
            placeholder="Company Name"
            maxLength="80"
            label="Company Name"
            onChange={inputHandle}
          />
          <FormError
            error="Company Name is required."
          />
        </div>

      </form>
      <p className='service-text'>Select the services you need</p>
      <div className='inline main-checkbox-container'>
        {state === "seo" ? <div className='inline form-cheqbox'>
          <input className='checkbox-wrap' type="checkbox"
            // onClick={(e, value) => handleCheckboxes(e, value)}
            value="seo"
            onChange={(e) => handleCheck(e)}
            checked
          />
          <p className='check-fields'>SEO</p>
        </div> :
          <div className='inline form-cheqbox'>
            <input className='checkbox-wrap' type="checkbox"
              // onClick={(e, value) => handleCheckboxes(e, value)}
              value="seo"
              onChange={(e) => handleCheck(e)}
            />
            <p className='check-fields'>SEO</p>
          </div>
        }
        <div className='inline form-cheqbox'>
          <input className='checkbox-wrap' type="checkbox"
            // onClick={(e, value) => handleCheckboxes(e, value)}
            value="Email Marketing"
            onChange={(e) => handleCheck(e)} />
          <p className='check-fields'>Email Marketing</p>
        </div>
        <div className='inline form-cheqbox'>
          <input className='checkbox-wrap' type="checkbox"
            // onClick={(e, value) => handleCheckboxes(e, value)}
            value="Digital Marketing"
            onChange={(e) => handleCheck(e)} />
          <p className='check-fields'>Digital Marketing</p>
        </div>
      </div>
      <div className='inline  main-checkbox-container2 '>
        <div className='inline form-cheqbox'>
          <input className='checkbox-wrap' type="checkbox"
            // onClick={(e, value) => handleCheckboxes(e, value)}
            value="Business Cards"
            onChange={(e) => handleCheck(e)} />
          <p className='check-fields'>Business Cards</p>
        </div>
        <div className='inline form-cheqbox'>
          <input className='checkbox-wrap' type="checkbox"
            // onClick={(e, value) => handleCheckboxes(e, value)}
            value="Logos"
            onChange={(e) => handleCheck(e)} />
          <p className='check-fields'>Logos</p>
        </div>
      </div>
      <button className=' button button-primary btn-sm button-block mt-20' onClick={handleSubmit} >Submit Rquest</button>
    </React.Fragment>
  )
}

export default Commonform;