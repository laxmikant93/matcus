/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import emailIcon from "../../../assets/Vespertine/emailIcon.svg";
import addressIcon from "../../../assets/Vespertine/address-icon.svg";
import phoneIcon from "../../../assets/Vespertine/phone-icon.svg";
import { Container } from '../../../CommonComponent/Container.styled'
import FormError from '../../../../Common/Form/FormError';
import ValidationFile from '../../../../Classes/ValidationFile';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Request from '../../../../Classes/Request';
import { showSuccessPopup } from '../../../../store/actions/successmessagepopup';
const ContactHomeHeroSection = styled.div`
background: #FDEDE1;
margin-top: 48px;
padding: 64px 0;
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
font-weight: ${({ theme }) => theme.FormContactHero.h2.FontWeight};
font-size: ${({ theme }) => theme.FormContactHero.h2.FontSize};
line-height: ${({ theme }) => theme.FormContactHero.h2.LineHeight};
font-style: ${({ theme }) => theme.FormContactHero.h2.FontStyle};
font-family: ${({ theme }) => theme.FormContactHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.FormContactHero.h2.LetterSpacing};
color: ${({ theme }) => theme.FormContactHero.h2.Color};
text-transform: ${({ theme }) => theme.FormContactHero.h2.TextTransform};
}
h3{

font-weight: ${({ theme }) => theme.FormContactHero.h3.FontWeight};
font-size: ${({ theme }) => theme.FormContactHero.h3.FontSize};
line-height: ${({ theme }) => theme.FormContactHero.h3.LineHeight};
font-style: ${({ theme }) => theme.FormContactHero.h3.FontStyle};
font-family: ${({ theme }) => theme.FormContactHero.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.FormContactHero.h3.LetterSpacing};
color: ${({ theme }) => theme.FormContactHero.h3.Color};
text-transform: ${({ theme }) => theme.FormContactHero.h3.TextTransform};

}
ul{
margin-top: 25px;
li{
display: grid;
grid-template-columns: auto auto 1fr;
gap: 10px;
align-items: flex-start;
font-weight: ${({ theme }) => theme.FormContactHero.p.FontWeight};
font-size: ${({ theme }) => theme.FormContactHero.p.FontSize};
line-height: ${({ theme }) => theme.FormContactHero.p.LineHeight};
font-style: ${({ theme }) => theme.FormContactHero.p.FontStyle};
font-family: ${({ theme }) => theme.FormContactHero.p.FontFamily};
letter-spacing: ${({ theme }) => theme.FormContactHero.p.LetterSpacing};
color: ${({ theme }) => theme.FormContactHero.p.Color};
margin-bottom: ${({ theme }) => theme.FormContactHero.p.MarginBottom};
&:last-child{
margin-bottom: 0;
}
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
}

}
}
`;
const ContactHomeHeroForm = styled.div`
form{
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 16px 32px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
}
.form-group{
input::placeholder,
textarea::placeholder {
font-weight: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.PlaceHolder.FontWeight};
font-size: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.PlaceHolder.FontSize};
line-height: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.PlaceHolder.LineHeight};
color: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.PlaceHolder.Color};
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
font-weight: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.PlaceHolder.FontWeight};
font-size: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.PlaceHolder.FontSize};
line-height: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.PlaceHolder.LineHeight};
color: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.PlaceHolder.Color};
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
font-weight: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.PlaceHolder.FontWeight};
font-size: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.PlaceHolder.FontSize};
line-height: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.PlaceHolder.LineHeight};
color: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.PlaceHolder.Color};
}
&:nth-child(3), &:nth-child(4){
grid-column: 1/3;
@media screen and (max-width: 768px) {
  grid-column: 1;
}
}
.input-control, .textarea-control{
 border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.Input.BorderColor};
  height: 44px;
  padding: 12px 24px;
  width: 100%;
  color: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.Input.Color};
  font-weight: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.Input.FontWeight};
  font-size: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.Input.FontSize};
  line-height: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.Input.LineHeight};
  outline: 0;
  outline: none;
  box-shadow: none;
  font-family: inherit;
  resize: none;
}
.textarea-control{
height: auto;
}
}
button{
  
font-weight: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.SubmitButton.FontWeight};
font-size: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.SubmitButton.FontSize};
line-height: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.SubmitButton.LineHeight};
background: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.SubmitButton.Background};
border: 1px solid ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.SubmitButton.Background};
border-radius: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.SubmitButton.BorderRadius};
color: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.SubmitButton.Color};
padding: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.SubmitButton.PaddingY} ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.SubmitButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.SubmitButton.Hover.Background};
color: ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.SubmitButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.FormContactHero.ContactHomeHeroForm.SubmitButton.Hover.Background};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
}
}
`;

const FromContactHero = () => {

  const ContactRequest = new Request();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const [loading, setLoading] = useState(false)

  let dispatch = useDispatch();

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
      institute_email: instituteData.business_email,
      institute_id: instituteData._id,
      business: instituteData._id ? instituteData._id : "",
      business_name: instituteData.business_name,
      institute_name: instituteData.business_name,
      message: message,
      name: name,
      title: title,
      type: "Institute",
      industry: "Services"
    }
  }
  const ResetAllValue = () => {
    setName("");
    setEmail("");
    setNameError("")
    setEmailError("")
    setTitle("")
    setMessage("")
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
      await ContactRequest.post(ContactRequest.url("/contact/contactus/", "commonservices"),
        payloadData(),
        (success) => {
          ResetAllValue();
          dispatch(showSuccessPopup('Thank You, We will get back to you soon !'));
        },
        (error) => {
          // console.log(error)
        }
      );
    }
  }

  return (
    <ContactHomeHeroSection>
      <Container>
        <ContactHomeHero>
          <ContactHomeHeroAddress>
            <h2>Got questions?</h2>
            <h3>Ask us anything or Say hi</h3>
          </ContactHomeHeroAddress>
          <ContactHomeHeroForm>
            <form
              onSubmit={handleSubmit}
            >
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
                <textarea className="textarea-control" placeholder="Subject title" name="title" value={title} rows="1" onChange={handleInput}></textarea>
              </div>
              <div className="form-group">
                <textarea className="textarea-control" maxLength={320} placeholder="Write your message here..." name="message" value={message} rows="3" onChange={handleInput}></textarea>
              </div>
              {
                loading ?
                  <button type="button">Loading...</button> :
                  <button type="submit">Send Message</button>
              }
            </form>
          </ContactHomeHeroForm>
        </ContactHomeHero>
      </Container>
    </ContactHomeHeroSection>
  )
}

export default FromContactHero