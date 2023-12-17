/* eslint-disable jsx-a11y/no-distracting-elements */
import { Fragment } from 'react';
import styled from 'styled-components';
import AppLink from '../../../../Common/AppLink';
import { Container } from '../../../CommonComponent/Container.styled'
import FromContactHero from './formContactHero';
import emailIcon from "./emailIcon.svg";
import addressIcon from "./address-icon.svg";
import phoneIcon from "./phone-icon.svg";
import { useSelector } from 'react-redux';
import Request from '../../../../Classes/Request';
import EmailIcon from "../../../assets/TheTranquill/email-icon.svg";
import PhoneIcon from "../../../assets/TheTranquill/phone-icon.svg";
import AddressIcon from "../../../assets/TheTranquill/address-icon.svg";
import WorkingHour from "../../../assets/TheTranquill/hours.svg";

const ContactSection = styled.div`
margin-top: 72px;
`;
const ContactPageHead = styled.div`
h2{

  font-weight: ${({ theme }) => theme.TeamHero.h2.FontWeight};
  font-size: ${({ theme }) => theme.TeamHero.h2.FontSize};
  line-height: ${({ theme }) => theme.TeamHero.h2.LineHeight};
  font-style: ${({ theme }) => theme.TeamHero.h2.FontStyle};
  font-family: ${({ theme }) => theme.TeamHero.h2.FontFamily};
  letter-spacing: ${({ theme }) => theme.TeamHero.h2.LetterSpacing};
  text-align: ${({ theme }) => theme.TeamHero.h2.Alignment};
  color: ${({ theme }) => theme.TeamHero.h2.Color};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  }
  h3{
    font-weight: ${({ theme }) => theme.AboutUsHero.h3.FontWeight};
    font-size: ${({ theme }) => theme.AboutUsHero.h3.FontSize};
    line-height: ${({ theme }) => theme.AboutUsHero.h3.LineHeight};
    font-style: ${({ theme }) => theme.AboutUsHero.h3.FontStyle};
    font-family: ${({ theme }) => theme.AboutUsHero.h3.FontFamily};
    letter-spacing: ${({ theme }) => theme.AboutUsHero.h3.LetterSpacing};
    color: ${({ theme }) => theme.AboutUsHero.h3.Color};
    text-align: ${({ theme }) => theme.AboutUsHero.h2.Alignment};
    position: relative;
    display: inline-block;
    text-transform: uppercase;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    }
`;
const ContactPageList = styled.ul`
margin-top: 56px;
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 32px;
align-items: center;
@media screen and (max-width: 1310px) {
  grid-template-columns: repeat(2, 1fr);
}

@media screen and (max-width: 768px) {
  grid-template-columns: repeat(1, 1fr);
}
li{
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
background: #FDEDE1;
border-radius: 5px;
width: 100%;
height: 216px;
cursor: pointer;
@media screen and (max-width: 576px) {
  width: 100%;
}
&:hover{
  background: #006f9c;
  -webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
h4{
  color: #FDEDE1;
}
p{
  color: #FDEDE1;
}
.icon{
  background-color: #FDEDE1;
 }

}
  h4{

    font-weight: ${({ theme }) => theme.TeamHero.h4.FontWeight};
    font-size: ${({ theme }) => theme.TeamHero.h4.FontSize};
    line-height: ${({ theme }) => theme.TeamHero.h4.LineHeight};
    font-style: ${({ theme }) => theme.TeamHero.h4.FontStyle};
    font-family: ${({ theme }) => theme.TeamHero.h4.FontFamily};
    letter-spacing: ${({ theme }) => theme.TeamHero.h4.LetterSpacing};
    color: ${({ theme }) => theme.TeamHero.h4.Color};
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    }
    p{
      font-weight: ${({ theme }) => theme.ContactHero.p.FontWeight};
      font-size: ${({ theme }) => theme.ContactHero.p.FontSize};
      line-height: ${({ theme }) => theme.ContactHero.p.LineHeight};
      font-style: ${({ theme }) => theme.ContactHero.p.FontStyle};
      font-family: ${({ theme }) => theme.ContactHero.p.FontFamily};
      letter-spacing: ${({ theme }) => theme.ContactHero.p.LetterSpacing};
      color: ${({ theme }) => theme.ContactHero.p.Color};
    }
    .icon{
      margin-bottom: 16px;
    }
    .phone-icon{
      width: 40px;
       height: 40px;
       display: block;
       cursor: pointer;
       background-color: ${({ theme }) => theme.ContactHero.Icon.Color};
       -webkit-mask: url(${PhoneIcon}) no-repeat center;
       mask-image: url(${PhoneIcon}) no-repeat center;
     }
     .email-icon{
             width: 40px;
             height: 40px;
       display: block;
       cursor: pointer;
       background-color: ${({ theme }) => theme.ContactHero.Icon.Color};
       -webkit-mask: url(${EmailIcon}) no-repeat center;
       mask-image: url(${EmailIcon}) no-repeat center;
     }
     .address-icon{
             width: 40px;
             height: 40px;
       display: block;
       cursor: pointer;
       background-color: ${({ theme }) => theme.ContactHero.Icon.Color};
       -webkit-mask: url(${AddressIcon}) no-repeat center;
       mask-image: url(${AddressIcon}) no-repeat center;
     }
     .hours-icon{
             width: 40px;
             height: 40px;
       display: block;
       cursor: pointer;
       background-color: ${({ theme }) => theme.ContactHero.Icon.Color};
       -webkit-mask: url(${WorkingHour}) no-repeat center;
       mask-image: url(${WorkingHour}) no-repeat center;
     }
}
`;
const ContactPage = () => {
  const { instituteData } = useSelector((state) => state.serviceTemplate.getTemplate.data)

  return (
    <Fragment>
      <ContactSection>
        <Container>
          <ContactPageHead>
            <h2>Contact</h2>
            <h3>Get in Touch</h3>
          </ContactPageHead>
          <ContactPageList>
            <li>
              <i className="icon phone-icon"></i>
              <h4>Call</h4>
              <p>{instituteData.business_phone ? (`${instituteData.business_phone_country_code} - ${instituteData.business_phone}`) : "1800 309 0777"}</p>
              {/* <p>1800 309 0777</p> */}

            </li>
            <li>
              <i className="icon address-icon"></i>
              <h4>Location</h4>
              <p>{instituteData.business_address ? instituteData.business_address : "Jeewan Nagar"},{instituteData.business_address_line2 && instituteData.business_address_line2}&nbsp;{instituteData.business_address_line3 && instituteData.business_address_line3}{instituteData.business_city ? instituteData.business_city : "New Delhi"},&nbsp;{instituteData.business_country ? instituteData.business_country : "India"},&nbsp;{instituteData.business_zipcode ? instituteData.business_zipcode : "110086"}</p>
            </li>
            <li>
              <i className="icon email-icon"></i>
              <h4>Email</h4>
              <p> {instituteData.business_email ? instituteData.business_email : "info@jeewanhospital.in"}</p>
              {/* <p>work@jeewanhospital.in</p> */}
            </li>
            <li>
              <i className="icon hours-icon"></i>
              <h4>Opening Hours</h4>
              <p>Mon - Sun : 08:00 am - 22:00 pm</p>
            </li>
          </ContactPageList>
        </Container>
        <FromContactHero />
      </ContactSection>
    </Fragment>
  )
}

export default ContactPage