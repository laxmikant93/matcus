/* eslint-disable jsx-a11y/no-distracting-elements */
import { Fragment } from 'react';
import styled from 'styled-components';
import AppLink from '../../../../Common/AppLink';
import { Container } from '../../../CommonComponent/Container.styled'
import ContactHero from './contactHero';
import emailIcon from "./emailIcon.svg";
import addressIcon from "./address-icon.svg";
import phoneIcon from "./phone-icon.svg";
import { useSelector } from 'react-redux';

const ContactSection = styled.div`
padding: 40px 0;
`;
const Contact = styled.div`

`;
const ContactHead = styled.div`
margin-bottom: ${({ theme }) => theme.Contact.ContactPage.ContactHead.MarginBottom};
text-align: ${({ theme }) => theme.Contact.ContactPage.ContactHead.Alignment};
h2{

font-weight: ${({ theme }) => theme.Contact.ContactPage.h2.FontWeight};
font-size: ${({ theme }) => theme.Contact.ContactPage.h2.FontSize};
line-height: ${({ theme }) => theme.Contact.ContactPage.h2.LineHeight};
font-style: ${({ theme }) => theme.Contact.ContactPage.h2.FontStyle};
font-family: ${({ theme }) => theme.Contact.ContactPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Contact.ContactPage.h2.LetterSpacing};
color: ${({ theme }) => theme.Contact.ContactPage.h2.Color};
}
h3{
  
  font-weight: ${({ theme }) => theme.Contact.ContactPage.h3.FontWeight};
  font-size: ${({ theme }) => theme.Contact.ContactPage.h3.FontSize};
  line-height: ${({ theme }) => theme.Contact.ContactPage.h3.LineHeight};
  font-style: ${({ theme }) => theme.Contact.ContactPage.h3.FontStyle};
  font-family: ${({ theme }) => theme.Contact.ContactPage.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.Contact.ContactPage.h3.LetterSpacing};
  color: ${({ theme }) => theme.Contact.ContactPage.h3.Color};
  position: relative;
display: inline-block;
  &::after{
  width: 100%;
  height: ${({ theme }) => theme.Contact.ContactPage.h3.BorderBottom.BorderWidth};
  background-color: ${({ theme }) => theme.Contact.ContactPage.h3.BorderBottom.Background};
  bottom: ${({ theme }) => theme.Contact.ContactPage.h3.BorderBottom.BottomSpace};
  }
  }
}
`;
const ContactContentList = styled.ul`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 30px;
`;
const ContactContentListItem = styled.li`
h6{
  
  font-weight: ${({ theme }) => theme.Contact.ContactPage.h6.FontWeight};
  font-size: ${({ theme }) => theme.Contact.ContactPage.h6.FontSize};
  line-height: ${({ theme }) => theme.Contact.ContactPage.h6.LineHeight};
  font-style: ${({ theme }) => theme.Contact.ContactPage.h6.FontStyle};
  font-family: ${({ theme }) => theme.Contact.ContactPage.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.Contact.ContactPage.h6.LetterSpacing};
  color: ${({ theme }) => theme.Contact.ContactPage.h6.Color};
  text-decoration:  underline;
  }
`;
const ContactListItemDetailInner = styled.li`
display: flex;
flex-direction: column;
gap: 10px;
a{
  
  font-weight: ${({ theme }) => theme.Contact.ContactPage.a.FontWeight};
  font-size: ${({ theme }) => theme.Contact.ContactPage.a.FontSize};
  line-height: ${({ theme }) => theme.Contact.ContactPage.a.LineHeight};
  font-style: ${({ theme }) => theme.Contact.ContactPage.a.FontStyle};
  font-family: ${({ theme }) => theme.Contact.ContactPage.a.FontFamily};
  letter-spacing: ${({ theme }) => theme.Contact.ContactPage.a.LetterSpacing};
  color: ${({ theme }) => theme.Contact.ContactPage.a.Color};  
  &:hover{
    color: ${({ theme }) => theme.Contact.ContactPage.a.Hover.Color};
  }
  }
  p{
    
    font-weight: ${({ theme }) => theme.Contact.ContactPage.p.FontWeight};
    font-size: ${({ theme }) => theme.Contact.ContactPage.p.FontSize};
    line-height: ${({ theme }) => theme.Contact.ContactPage.p.LineHeight};
    font-style: ${({ theme }) => theme.Contact.ContactPage.p.FontStyle};
    font-family: ${({ theme }) => theme.Contact.ContactPage.p.FontFamily};
    letter-spacing: ${({ theme }) => theme.Contact.ContactPage.p.LetterSpacing};
    color: ${({ theme }) => theme.Contact.ContactPage.p.Color};
    }
`;
const ContactListItemDetail = styled.div`
display: grid;
grid-template-columns: auto 1fr;
gap: 10px;
align-items: center;
margin-top: 20px;
.addressIcon{
  width: 20px;
  height: 20px;
  display: block;
  cursor: pointer;
  background-color: ${({ theme }) => theme.Contact.ContactPage.AddressIcon.Background};
  -webkit-mask: url(${addressIcon}) no-repeat center;
  mask-image: url(${addressIcon}) no-repeat center;
}
.phoneIcon{
  width: 20px;
  height: 20px;
  display: block;
  cursor: pointer;
  background-color: ${({ theme }) => theme.Contact.ContactPage.PhoneIcon.Background};
 -webkit-mask: url(${phoneIcon}) no-repeat center;
  mask-image: url(${phoneIcon}) no-repeat center;
}
.emailIcon{
 width: 20px;
  height: 20px;
  display: block;
  cursor: pointer;
  background-color: ${({ theme }) => theme.Contact.ContactPage.MailIcon.Background};
  -webkit-mask: url(${emailIcon}) no-repeat center;
  mask-image: url(${emailIcon}) no-repeat center;
}
`;
const ContactPage = () => {

  const { institutePhone, instituteEmail, instituteAddress } = useSelector((state) => {
    return {
      instituteAddress: state.websiteTemplate.getTemplate.data.instituteData.institute_address,
      institutePhone: state.websiteTemplate.getTemplate.data.instituteData.institute_phone,
      instituteEmail: state.websiteTemplate.getTemplate.data.instituteData.institute_email
    }
  })
  return (
    <Fragment>
      {/* <Container>
        <ContactSection>
          <Contact>
            <ContactHead>
              <h2>Reach us at</h2>
              <h3>We'd love to hear from you. Here's how to reach us.</h3>
            </ContactHead>
            <ContactContentList>
              <ContactContentListItem>
                <h6>Call us at</h6>
                <ContactListItemDetail>
                  <i className="phoneIcon"></i>
                  <ContactListItemDetailInner>
                    <AppLink to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open("tel:", { institutePhone });
                      }}
                      rel="noopener noreferrer">{institutePhone ? institutePhone : "9871947372"}</AppLink>
                  </ContactListItemDetailInner>
                </ContactListItemDetail>
              </ContactContentListItem>
              <ContactContentListItem>
                <h6>Address</h6>
                <ContactListItemDetail>
                  <i className="addressIcon"></i>
                  <ContactListItemDetailInner>
                    <p>{instituteAddress ? instituteAddress : "lorem ipsum is simply dummy text"}</p>
                  </ContactListItemDetailInner>
                </ContactListItemDetail>
              </ContactContentListItem>
              <ContactContentListItem>
                <h6>Write us at</h6>
                <ContactListItemDetail>
                  <i className="emailIcon"></i>
                  <ContactListItemDetailInner>
                    <AppLink to="#" onClick={(e) => {
                      e.preventDefault();
                      window.open("mailto:", { instituteEmail });
                    }} rel="noopener noreferrer">{instituteEmail ? instituteEmail : "Zarathos@Kira.com"}</AppLink>
                  </ContactListItemDetailInner>
                </ContactListItemDetail>
              </ContactContentListItem>
            </ContactContentList>
          </Contact>
        </ContactSection>
      </Container> */}
      <ContactHero />
    </Fragment>
  )
}

export default ContactPage