import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ValidationFile from '../../../Classes/ValidationFile'
import ValidationUtils from '../../../Classes/ValidationUtils'
import FormError from '../../../Common/Form/FormError'
import FormInput from '../../../Common/Form/FormInput'
import FormTextArea from '../../../Common/Form/FormTextArea'
import { PostBookingFormData } from '../../../store/actions/bookAppointment'
import { BookingForm, DropHead, DropBody, FormFieldWrap, TextInfo } from './Header.styled'

const BookingFrom = ({ setBookingForm }) => {

  const dispatch = useDispatch()
  const { users, businesstype } = useSelector((state) => {
    return {
      users: state.user,
      businesstype: state.user.user_business_type,

    };
  })
  const { instituteData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  //  STATES
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPhone, setUserPhone] = useState("")
  const [userSubjectTitle, setSubjectTitle] = useState("")
  const [userMessage, setUserMessage] = useState("")

  // ERROR STATES
  const [userNameError, setUserNameError] = useState(false)
  const [userEmailError, setUserEmailError] = useState(false)
  const [invalidEmailError, setInvalidEmailError] = useState(false);

  const [userSubjectTitleError, setSubjectTitleError] = useState(false)
  const [userMessageError, setUserMessageError] = useState(false)


  const handleClose = () => {
    setBookingForm(false)
  }


  const handleInput = (e) => {
    let inputName = e.target.name
    let inputValue = e.target.value
    switch (inputName) {
      case "user_name":
        setUserName(inputValue);
        break;
      case "user_email":
        setUserEmail(inputValue);
        setInvalidEmailError(ValidationUtils.isEmpty(inputValue));
        break;
      case "user_Phone":
        setUserPhone(inputValue);
        break;
      case "subject_title":
        setSubjectTitle(inputValue);
        break;
      case "user_message":
        setUserMessage(inputValue);
        break;
      default:
        return false;
    }
  }

  const validEmail = () => {
    let isValid = true
    if (userEmail) {
      if (!ValidationUtils.isEmail(userEmail)) {
        isValid = false
        setUserEmailError(true)
      } else {
        isValid = true
      }
    } else {
      isValid = true
    }
    return isValid
  }
  const payloadData = () => {
    return {
      email: userEmail,
      institute_id: instituteData._id,
      business: instituteData._id ? instituteData._id : "",
      business_name: instituteData.business_name,
      institute_name: instituteData.business_name,
      message: userMessage,
      name: userName,
      title: userSubjectTitle,
      type: "Institute",
      industry: "Services",
      tileStatus: "booking_form",
      contact_number: userPhone,
      institute_email: instituteData.business_email
    }
  }

  // console.log(users)
  const handleSave = (e) => {
    e.preventDefault();

    let emailValid = validEmail()
    setUserEmailError(!emailValid)

    if (!ValidationFile.isEmpty(userName) &&
      emailValid &&
      !ValidationFile.isEmpty(userSubjectTitle) &&
      !ValidationFile.isEmpty(userMessage)
    ) {
      setBookingForm(false)
      dispatch(PostBookingFormData(businesstype, payloadData()))
    } else {
      setUserNameError(true)
      setInvalidEmailError(true)
      setSubjectTitleError(true)
      setUserMessageError(true)
    }
  }

  return (
    <BookingForm>
      <DropHead>
        <h5>Booking Form</h5>
        <button className="Closebtn" onClick={() => handleClose()}></button>
      </DropHead>
      <form>
        <DropBody>
          <FormFieldWrap>
            <FormInput
              labelPosition="top"
              name="user_name"
              label="Name"
              maxlength="100"
              placeholder="Enter your name"
              onChange={handleInput}
              value={userName}
            />
            <FormError
              show={!userName && userNameError}
              error="Enter Your Name."
            />
          </FormFieldWrap>
          <FormFieldWrap>
            <FormInput
              labelPosition="top"
              type="email"
              label="Email"
              name="user_email"
              value={userEmail}

              placeholder="Enter your email"
              onChange={handleInput}
              onKeyUp={handleInput}
            />

            <FormError
              show={!userEmail && invalidEmailError}
              error=" Email is required."
              className='visitorFormError'
            />
            <FormError
              show={userEmail && userEmailError}
              error="Invalid Email."
            />
          </FormFieldWrap>
          <FormFieldWrap>
            <FormInput
              labelPosition="top"
              type="number"
              label="Phone number"
              name="user_Phone"
              maxlength={10}
              placeholder="Enter your phone number"
              onChange={handleInput}
              value={userPhone}
            />
          </FormFieldWrap>
          <FormFieldWrap>
            <FormInput
              labelPosition="top"
              label="Subject title"
              name="subject_title"
              placeholder="Subject title"
              onChange={handleInput}
              value={userSubjectTitle}
            />
            <FormError
              show={!userSubjectTitle && userSubjectTitleError}
              error="Enter Subject title"
            />
          </FormFieldWrap>
          <FormFieldWrap>
            <FormTextArea
              labelPosition="top"
              label="Message"
              name="user_message"
              onChange={handleInput}
              value={userMessage}
              maxlength="320"
              placeholder="Enter your message"
            />
            <FormError
              show={!userMessage && userMessageError}
              error="Enter your message."
            />
            <FormError />
            <TextInfo>
              <small>500 char. max</small>
            </TextInfo>
          </FormFieldWrap>
          <button className="Submit-btn" onClick={handleSave}>Book Consultation</button>
        </DropBody>
      </form>
    </BookingForm>
  )
}
export default BookingFrom