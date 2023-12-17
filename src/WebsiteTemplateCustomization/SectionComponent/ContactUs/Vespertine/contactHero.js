/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import emailIcon from "../../../assets/Vespertine/emailIcon.svg";
import addressIcon from "../../../assets/Vespertine/address-icon.svg";
import phoneIcon from "../../../assets/Vespertine/phone-icon.svg";
import { Container } from '../../../CommonComponent/Container.styled'
import { useState } from 'react';
import ValidationFile from '../../../../Classes/ValidationFile';
import FormError from '../../../../Common/Form/FormError';
import { useDispatch, useSelector } from 'react-redux';

import Request from '../../../../Classes/Request';
import { showSuccessPopup } from '../../../../store/actions/successmessagepopup';
import PhoneInput from 'react-phone-input-2';


const ContactHomeHeroSection = styled.div`
background: rgba(55, 125, 239, 0.05);
padding: 32px 0;
`;
const ContactHomeHero = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 40px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
}
`;
const ContactHomeHeroAddress = styled.div`
h2{

font-weight: ${({ theme }) => theme.Contact.ContactHero.h2.FontWeight};
font-size: ${({ theme }) => theme.Contact.ContactHero.h2.FontSize};
line-height: ${({ theme }) => theme.Contact.ContactHero.h2.LineHeight};
font-style: ${({ theme }) => theme.Contact.ContactHero.h2.FontStyle};
font-family: ${({ theme }) => theme.Contact.ContactHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Contact.ContactHero.h2.LetterSpacing};
color: ${({ theme }) => theme.Contact.ContactHero.h2.Color};
}
h3{

font-weight: ${({ theme }) => theme.Contact.ContactHero.h3.FontWeight};
font-size: ${({ theme }) => theme.Contact.ContactHero.h3.FontSize};
line-height: ${({ theme }) => theme.Contact.ContactHero.h3.LineHeight};
font-style: ${({ theme }) => theme.Contact.ContactHero.h3.FontStyle};
font-family: ${({ theme }) => theme.Contact.ContactHero.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.Contact.ContactHero.h3.LetterSpacing};
color: ${({ theme }) => theme.Contact.ContactHero.h3.Color};
}
ul{
margin-top: 95px;
@media screen and (max-width: 768px) {
  margin-top: 35px;
}
li{
display: grid;
grid-template-columns: auto 1fr;
gap: 10px;
align-items: center;
font-weight: ${({ theme }) => theme.Contact.ContactHero.p.FontWeight};
font-size: ${({ theme }) => theme.Contact.ContactHero.p.FontSize};
line-height: ${({ theme }) => theme.Contact.ContactHero.p.LineHeight};
font-style: ${({ theme }) => theme.Contact.ContactHero.p.FontStyle};
font-family: ${({ theme }) => theme.Contact.ContactHero.p.FontFamily};
letter-spacing: ${({ theme }) => theme.Contact.ContactHero.p.LetterSpacing};
color: ${({ theme }) => theme.Contact.ContactHero.p.Color};
margin-bottom: ${({ theme }) => theme.Contact.ContactHero.p.MarginBottom};
word-break: break-all;
&:last-child{
margin-bottom: 0;
}
label{
  display: flex;
  align-items: center;
  gap: 10px;
}
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
  margin-bottom: 20px;
  gap: 0;
}
.addressIcon{
  width: 20px;
  height: 20px;
  display: block;
  cursor: pointer;
  background-color: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroAddress.AddressIcon.Background};
  -webkit-mask: url(${addressIcon}) no-repeat center;
  mask-image: url(${addressIcon}) no-repeat center;
}
.phoneIcon{
  width: 20px;
  height: 20px;
  display: block;
  cursor: pointer;
  background-color: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroAddress.PhoneIcon.Background};
 -webkit-mask: url(${phoneIcon}) no-repeat center;
  mask-image: url(${phoneIcon}) no-repeat center;
}
.emailIcon{
 width: 20px;
  height: 20px;
  display: block;
  cursor: pointer;
  background-color: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroAddress.MailIcon.Background};
  -webkit-mask: url(${emailIcon}) no-repeat center;
  mask-image: url(${emailIcon}) no-repeat center;
}
}
}
`;
const ContactHomeHeroForm = styled.div`
form{
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 24px 32px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
}
.form-group{
  &.react-tel-input {
          .flag-dropdown {
            .country-list {
              .search {
                z-index: 10;
              }
            }
          }
        }
        @media screen and (max-width: 768px) {
          grid-column: 1/3;
        }
input::placeholder,
textarea::placeholder {
font-weight: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.PlaceHolder.FontWeight};
font-size: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.PlaceHolder.FontSize};
line-height: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.PlaceHolder.LineHeight};
color: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.PlaceHolder.Color};
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
font-weight: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.PlaceHolder.FontWeight};
font-size: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.PlaceHolder.FontSize};
line-height: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.PlaceHolder.LineHeight};
color: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.PlaceHolder.Color};
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
font-weight: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.PlaceHolder.FontWeight};
font-size: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.PlaceHolder.FontSize};
line-height: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.PlaceHolder.LineHeight};
color: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.PlaceHolder.Color};
}
&:nth-child(3), &:nth-child(4){
grid-column: 1/3;
@media screen and (max-width: 768px) {
  grid-column: 1/3;
}
}
.input-control, .textarea-control{
 border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.Input.BorderColor};
  height: 44px;
  padding: 12px 24px;
  width: 100%;
  color: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.Input.Color};
  font-weight: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.Input.FontWeight};
  font-size: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.Input.FontSize};
  line-height: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.Input.LineHeight};
  outline: 0;
  outline: none;
  box-shadow: none;
  font-family: inherit;
}
.textarea-control{
height: auto;
}
}
button{
font-weight: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.SubmitButton.FontWeight};
font-size: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.SubmitButton.FontSize};
line-height: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.SubmitButton.LineHeight};
background: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.SubmitButton.Background};
border: 1px solid ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.SubmitButton.BorderColor};
border-radius: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.SubmitButton.BorderRadius};
color: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.SubmitButton.Color};
padding: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.SubmitButton.PaddingY} ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.SubmitButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.SubmitButton.Hover.Background};
color: ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.SubmitButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Contact.ContactHero.ContactHomeHeroForm.SubmitButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
}
}

.btn-wrapper {
  grid-column: 1/3;
}

.formArea-wrapper {
  grid-column: 1/3;
}
.phoneInput-wrapper {
  width: 100%;
  .flag-dropdown {
    height: 40px;

  }
  .form-control {
    height: 40px;
    width: 100%;
  }
}
`;

const ContactHero = () => {
  const { success, websiteType } = useSelector((state) => {
    return {
      success: state.websiteTemplate.getTemplate.success,
      websiteType: state.websiteTemplate.getTemplate.websiteType
    }
  })
  const dispatch = useDispatch()
  const ContactRequest = new Request();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [contact, setContact] = useState("")
  const [contactCode, setContactCode] = useState(91)
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const [loading, setLoading] = useState(false)
  const handleInput = (e) => {
    let inputValue = e.target.value
    let inputName = e.target.name
    switch (inputName) {
      case "name":
        setName(ValidationFile.spaceNotAccept(inputValue))
        setNameError(ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue)))
        break;
      case "email":
        setEmail(inputValue)
        setEmailError(!ValidationFile.isEmail(inputValue))
        break;
      case "title":
        setTitle(inputValue)
        break
      case "message":
        setMessage(inputValue)
        break
      default:
        return false
    }
  }
  const payloadData = () => {
    return {
      email: email,
      contact: contact,
      country_code: contactCode,
      institute_email: instituteData.institute_email,
      institute_id: instituteData._id,
      institute_name: instituteData.institute_name,
      message: message,
      name: name,
      title: title,
      type: "Institute",
      industry: success ? websiteType : "LMS",
    }
  }
  const ResetAllValue = () => {
    setName("");
    setEmail("");
    setNameError("")
    setEmailError("")
    setTitle("")
    setMessage("")
    setContactCode(91)
    setContact("")
    setLoading(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (ValidationFile.isEmpty(name)) {
      setNameError(true)
    }
    if (!ValidationFile.isEmail(email)) {
      setEmailError(true)
    }
    if (ValidationFile.isNotEmpty(name) && ValidationFile.isEmail(email)) {


      setLoading(true)
      await ContactRequest.post(ContactRequest.url("/contact/contactus", "commonservices"),
        payloadData(),
        (success) => {
          ResetAllValue();
          dispatch(showSuccessPopup("Sent Request Successfully."))
        },
        (error) => {

        }
      );
    }
  }

  const handlePhoneInput = (countryDetail, inputValue) => {
    const { dialCode } = countryDetail;
    setContactCode(dialCode);
    let mobile = inputValue.replace(dialCode, "");
    setContact(mobile);
  };

  return (
    <ContactHomeHeroSection>
      <Container>
        <ContactHomeHero>
          <ContactHomeHeroAddress>
            <h2>Got questions?</h2>
            <h3>Ask us anything or just say Hi.</h3>
            <ul>
              {instituteData.institute_address ?
                <li>
                  <label>
                    <i className="addressIcon"></i>Address -
                  </label>
                  {instituteData.institute_address}
                </li>
                : ""
              }
              {instituteData.institute_phone ?
                <li>
                  <label>
                    <i className="phoneIcon"></i>Phone -
                  </label>
                  {instituteData.institute_phone}
                </li>
                : ""
              }
              {instituteData.institute_email ?
                <li>
                  <label>
                    <i className="emailIcon"></i>
                    Email -
                  </label>
                  {instituteData.institute_email ? instituteData.institute_email : "xotov47974@satedly.com"}
                </li>
                : ""
              }

            </ul>
          </ContactHomeHeroAddress>
          <ContactHomeHeroForm>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input className="input-control" type="text" name="name" placeholder="Full name" onChange={handleInput} value={name} />
                <FormError show={nameError && !name} error="Name required" />
              </div>
              <div className="form-group">
                <input className="input-control" type="email" name="email" placeholder="Enter your email" onChange={handleInput} value={email} />
                <FormError show={emailError && !email} error="Email required" />
                <FormError show={emailError && email} error="Email invalid" />
              </div>
              <div className="form-group">
                <PhoneInput
                  onChange={(value, country) => {
                    handlePhoneInput(country, value);
                  }}
                  value={`${contactCode} ${contact}`}
                  countryCodeEditable={false}
                  containerClass="form-group phoneInput-wrapper"
                  inputClass="form-control"
                  country={"in"}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                  enableSearch
                  disableSearchIcon
                />
                <label className="animLabel" htmlFor="mobile_number">
                  Mobile Number
                </label>
              </div>
              <div className="form-group">
                <textarea className="textarea-control" placeholder="Subject title" name="title" rows="1" onChange={handleInput} value={title}></textarea>
              </div>
              <div className="form-group formArea-wrapper">
                <textarea className="textarea-control" maxLength={320} value={message} placeholder="Write your message here..." name="message" rows="3" onChange={handleInput}></textarea>
              </div>


              <div className='btn-wrapper'>
                {
                  loading ?
                    <button type="button">Loading...</button> :
                    <button type="submit">Send Message</button>
                }
              </div>

            </form>
          </ContactHomeHeroForm>
        </ContactHomeHero>
      </Container>
    </ContactHomeHeroSection>
  )
}

export default ContactHero