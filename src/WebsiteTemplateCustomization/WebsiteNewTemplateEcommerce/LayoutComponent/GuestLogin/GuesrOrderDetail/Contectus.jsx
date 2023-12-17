/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Request from '../../../../../Classes/Request';
import ValidationFile from '../../../../../Classes/ValidationFile';
import FormError from '../../../../../Common/Form/FormError';
import FormInput from '../../../../../Common/Form/FormInput';
import FormTextArea from '../../../../../Common/Form/FormTextArea';
import { showSuccessPopup } from '../../../../../store/actions/successmessagepopup';
import './contactUs.scss';


export default function Contectus({ closeModalState }) {

  const ContactRequest = new Request();
  let dispatch = useDispatch();
  let history = useNavigate();

  const { user, subdomainuser, privacypolicydata, successTemplate } = useSelector((state) => {
    return {
      user: state.user,
      subdomainuser: state.subdomainuser,
      successTemplate: state.websiteTemplate.getTemplate.success,
      privacypolicydata: state.websiteTemplate.getTemplate.policy_info,
    }
  });


  const { data, success } = useSelector((state) => state.businessInfo.ecomWebsite)

  //data fields
  const [requester_name, setrequester_name] = useState("");
  const [requester_email, setrequester_email] = useState("");
  const [requester_contact, setrequester_contact] = useState("");
  const [requester_country_code, setrequester_country_code] = useState(91);
  const [requester_question, setrequester_question] = useState("");
  const [loading, setLoading] = useState(false)

  //error fields
  const [requester_name_error, setrequester_name_error] = useState("");
  const [requester_email_error, setrequester_email_error] = useState("");
  const [requester_contact_error, setrequester_contact_error] = useState("");
  const [requester_question_error, setrequester_question_error] = useState("");

  const handleInput = (e, field) => {
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    switch (field) {
      case "name":
        setrequester_name(value);
        setrequester_name_error(ValidationFile.isEmpty(value));
        break;
      case "email":
        setrequester_email(value);
        setrequester_email_error(!ValidationFile.isEmail(value));
        break;
      default:
        setrequester_question(value);
        setrequester_question_error(ValidationFile.isEmpty(value));
    }
  }

  const handlePhoneInput = (inputValue, countryDetail) => {
    if (inputValue > 9) {
      let dialCode = countryDetail.dialCode;
      let mobile = inputValue.replace(dialCode, "");
      setrequester_contact(mobile);
      setrequester_country_code(dialCode);
      setrequester_contact_error(ValidationFile.isEmpty(mobile));
    }
  }

  const FormValidations = () => {
    let isValid = true;
    if (ValidationFile.isEmpty(requester_name)) {
      setrequester_name_error(true);
      isValid = false;
    }
    // if (ValidationFile.isEmpty(requester_contact)) {
    //   setrequester_contact_error(true);
    //   isValid = false;
    // }
    if (!ValidationFile.isEmail(requester_email)) {
      setrequester_email_error(true);
      isValid = false;
    }
    if (ValidationFile.isEmpty(requester_question)) {
      setrequester_question_error(true);
      isValid = false;
    }
    // if (requester_email) {
    //   if (!ValidationFile.isEmail(requester_email)) {
    //     setrequester_email_error(true);
    //     isValid = false;
    //   }
    //   else {
    //     isValid = true;
    //   }
    // }
    // else {
    //   isValid = true;
    // }
    return isValid;
  }
  // console.log(data)
  const payloadData = () => {
    return {
      email: requester_email,
      message: requester_question,
      name: requester_name,
      contact: requester_contact,
      type: "Institute",
      industry: "Ecommerce",
      institute_email: success && data ? data.business_email : "",
      institute_id: success && data ? data._id : "",
      institute_name: success && data ? data.business_name : "",
    }
  }

  const handleSubmitButton = async (e) => {
    e.preventDefault();
    let formValid = FormValidations();
    if (formValid) {
      setLoading(true);
      await ContactRequest.post(ContactRequest.url("/contact/contactus", "commonservices"),
        payloadData(),
        (success) => {
          setLoading(false);
          dispatch(showSuccessPopup("Sent Request Successfully."));
          closeModalState()
        },
        (error) => {

        }
      );
    }
  }

  return (
    <React.Fragment>
      <div className='guest-contectus-container'>
        <form onSubmit={handleSubmitButton}>
          <div className="formFieldwrap">
            <FormInput type="text"
              label="Name"
              value={requester_name}
              onChange={(e) => handleInput(e, "name")}
              placeholder="Enter your name*"
            />
            <FormError
              show={requester_name_error}
              error="Name is required."
              className='visitorFormError'
            />
          </div>
          <div className="formFieldwrap">
            <FormInput type="text"
              label="Email"
              value={requester_email}
              onChange={(e) => handleInput(e, "email")}
              placeholder="Enter your email*"
            />
            <FormError
              show={!requester_email && requester_email_error}
              error="Email is required."
              className='visitorFormError'
            />
            <FormError
              show={requester_email && requester_email_error}
              error="Invalid Email. Please recheck and enter again."
              className='visitorFormError'
            />
          </div>
          <div className="formFieldwrap">
            <FormInput type="text"
              label="Subject title"
              placeholder="Subject title"
            />
          </div>
          {/* <div className="formFieldwrap">
            <PhoneInput
              countryCodeEditable={false}
              containerClass="form-group"
              inputClass="form-control"
              specialLabel
              country={"in"}

              inputProps={{
                name: "phone",
                required: true,
                autoFocus: false,
                placeholder: "Enter mobile",
              }}
              enableSearch
              name="mobileNo"
              value={`${requester_country_code} ${requester_contact}`}
              searchPlaceholder="Search Country"
              onChange={(value, country) => {
                handlePhoneInput(value, country);
              }}
              onKeyUp={(value, country) => {
                handlePhoneInput(value, country);
              }}
              disableSearchIcon
            />
            <label className="animLabel" htmlFor="mobile_number">
              Mobile Number
            </label>
            <FormError
              show={requester_contact_error}
              error="Contact is required."
              className='visitorFormError'
            />
          </div> */}
          <div className="formFieldwrap mb-3 question-formwrap">
            <FormTextArea
              rows="5"
              label="Question"
              value={requester_question}
              maxlength={120}
              onChange={(e) => handleInput(e, "question")}
              placeholder='Write your question*'
            />
            <FormError
              show={requester_question_error}
              error="Please write your question."
              className='visitorFormError'
            />
          </div>
          <p className='privary-p'>By sending the message you agree to our
            {/* <Link to="/ecom-tnc" className='privary-link'> */}

            {/* </Link> */}
            <a href={`/policy/${successTemplate && privacypolicydata?.terms_of_service[0]?.slug}`}>
              Privacy Policy
            </a>
          </p>
          {loading ?
            <button
              type='button'
              className='buttonTrue btnTrue-primary btn-block '>
              Sending...
            </button>
            :
            <button
              type='submit'
              className='buttonTrue btnTrue-primary btn-block '>
              Send
            </button>}
        </form>
      </div>
    </React.Fragment >
  )
}