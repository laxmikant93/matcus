/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
// import MessageProfile1 from "../Message.png";
import MessageProfile from "./Message.jpg";
import StaticImage from "./static-image.jpg";
import Slider from "react-slick";

import DefaultImage from "../../../assets/TheTranquill/default-bg.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from '../../../CommonComponent/Container.styled'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import React from 'react';

const MessageDeskHomeHero = styled.div`
display: grid;
align-items: flex-start;
gap: 56px;
margin-bottom:48px;
&:nth-child(odd) {
  grid-template-columns: auto 1fr;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
&:nth-child(even) {
  grid-template-columns: 1fr auto;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  .profile-image{
    order: 2;
    @media screen and (max-width: 768px) {
      order: unset;
    }
  }
  .profile-content{
    padding: 0 16px 0 0;
  }
}
&:last-child{
margin-bottom:0;
}
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;

}
`;



const MessageDeskHeroSection = styled.div`
margin-top: 48px;
h4{
  font-weight: ${({ theme }) => theme.MessageHero.h4.FontWeight};
  font-size: ${({ theme }) => theme.MessageHero.h4.FontSize};
  line-height: ${({ theme }) => theme.MessageHero.h4.LineHeight};
  font-style: ${({ theme }) => theme.MessageHero.h4.FontStyle};
  font-family: ${({ theme }) => theme.MessageHero.h4.FontFamily};
  letter-spacing: ${({ theme }) => theme.MessageHero.h4.LetterSpacing};
  color: ${({ theme }) => theme.MessageHero.h4.Color};
  }
  h5{
  font-weight: ${({ theme }) => theme.MessageHero.h5.FontWeight};
  font-size: ${({ theme }) => theme.MessageHero.h5.FontSize};
  line-height: ${({ theme }) => theme.MessageHero.h5.LineHeight};
  font-style: ${({ theme }) => theme.MessageHero.h5.FontStyle};
  font-family: ${({ theme }) => theme.MessageHero.h5.FontFamily};
  letter-spacing: ${({ theme }) => theme.MessageHero.h5.LetterSpacing};
  color: ${({ theme }) => theme.MessageHero.h5.Color};
  }
  p{
  font-weight: ${({ theme }) => theme.MessageHero.p.FontWeight};
  font-size: ${({ theme }) => theme.MessageHero.p.FontSize};
  line-height: ${({ theme }) => theme.MessageHero.p.LineHeight};
  font-style: ${({ theme }) => theme.MessageHero.p.FontStyle};
  font-family: ${({ theme }) => theme.MessageHero.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.MessageHero.p.LetterSpacing};
  color: ${({ theme }) => theme.MessageHero.p.Color};

  }
  ul{
    padding-top: 32px;
    padding-left: 16px;
    @media screen and (max-width: 768px) {
      padding-left: 24px;
    }
    li{
  font-weight: ${({ theme }) => theme.MessageHero.p.FontWeight};
  font-size: ${({ theme }) => theme.MessageHero.p.FontSize};
  line-height: ${({ theme }) => theme.MessageHero.p.LineHeight};
  font-style: ${({ theme }) => theme.MessageHero.p.FontStyle};
  font-family: ${({ theme }) => theme.MessageHero.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.MessageHero.p.LetterSpacing};
  color: ${({ theme }) => theme.MessageHero.p.Color};
  list-style-type: disc;
  &:first-child{
    margin-left: -20px;
    list-style-type: none;
    margin-bottom: 8px;
  }
    }
  }
  
  position: relative;
  width: 100%;
  .slick-dots{
  bottom: -30px;
  .slick-active{
  margin: 0;
  button{
  &::before{
  font-size: 12px;
  color: ${({ theme }) => theme.MessageHero.Dots.Active.Color};
  }
  }
  }
  button{
  &::before{
  font-size: 12px;
  color: ${({ theme }) => theme.MessageHero.Dots.Color};
  }
  }
  }
  .slick-prev{
    content: '';
    width: 1.3rem;
    height: 1.3rem;
    border-right: 2px solid ${({ theme }) => theme.MessageHero.SlickArrowColor.Color};
    border-bottom: 2px solid ${({ theme }) => theme.MessageHero.SlickArrowColor.Color};
    z-index: 0;
    margin-left: -0.5rem;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    &::before{
    color: transparent;
    }
    &:hover{
      border-right: 2px solid ${({ theme }) => theme.MessageHero.SlickArrowColor.Hover.Color};
      border-bottom: 2px solid ${({ theme }) => theme.MessageHero.SlickArrowColor.Hover.Color};    
    }
    @media screen and (max-width: 768px) {
      width: 1rem;
      height: 1rem;
      margin-left: 0.5rem;
      }
    }
    .slick-next{
    content: '';
    width: 1.3rem;
    height: 1.3rem;
    border-left: 2px solid ${({ theme }) => theme.MessageHero.SlickArrowColor.Color};
    border-bottom: 2px solid ${({ theme }) => theme.MessageHero.SlickArrowColor.Color};
    z-index: 0;
    margin-right: -0.5rem;
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    &::before{
    color: transparent;
    }
    &:hover{
      border-left: 2px solid ${({ theme }) => theme.MessageHero.SlickArrowColor.Hover.Color};
      border-bottom: 2px solid ${({ theme }) => theme.MessageHero.SlickArrowColor.Hover.Color};    
    }
    @media screen and (max-width: 768px) {
      width: 1rem;
      height: 1rem;
      margin-right: 0.5rem;
      }
    }
`;
const MessageProfileImage = styled.div`
img{
object-fit: cover;
// width: ${({ theme }) => theme.MessageHero.MessageProfileImage.Width};
// height: ${({ theme }) => theme.MessageHero.MessageProfileImage.Height};
width: 100%;
max-width: 363px;
min-width: 363px;
max-height: 363px;
min-height: 363px;
height: 100%;
border-radius: ${({ theme }) => theme.MessageHero.MessageProfileImage.BorderRadius};
display: block;
@media screen and (max-width: 768px) {
  width: 100%;
  height: 100%;
  max-width: 100%;
min-width: 100%;
max-height: 100%;
min-height: 100%;
}
}
`;
const ViewMoreButton = styled.a`

font-weight: ${({ theme }) => theme.MessageHero.ViewMoreButton.FontWeight};
font-size: ${({ theme }) => theme.MessageHero.ViewMoreButton.FontSize};
line-height: ${({ theme }) => theme.MessageHero.ViewMoreButton.LineHeight};
background: transparent;
border: 1px solid ${({ theme }) => theme.MessageHero.ViewMoreButton.BorderColor};
border-radius: ${({ theme }) => theme.MessageHero.ViewMoreButton.BorderRadius};
color: ${({ theme }) => theme.MessageHero.ViewMoreButton.Color};
padding: ${({ theme }) => theme.MessageHero.ViewMoreButton.PaddingY} ${({ theme }) => theme.MessageHero.ViewMoreButton.PaddingX};
cursor: pointer;
text-decoration: underline;
&:hover{
background: transparent;
color: ${({ theme }) => theme.MessageHero.ViewMoreButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.MessageHero.ViewMoreButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;
const MessageProfileContent = styled.div`
height: 100%;
max-height: 400px;
overflow: hidden;
overflow-y: auto;
padding: 0 16px 0 56px;
@media screen and (max-width: 768px) {
  padding: 0 8px 0 0;
 }
/* width */
::-webkit-scrollbar {
  width: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #006f9c; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #f48631; 
}
`;
const MessageDeskHero = () => {
  const settingsMessageDeskHero = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const dispatch = useDispatch();
  const history = useNavigate();
  const { dynamicHeaderData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { instituteData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { route, preview } = useSelector((state) => {
    return {
      route: state.serviceTemplate.route,
      preview: state.serviceTemplate.preview
    }
  })

  const handleViewMoreButton = () => {
    if (preview) {
      dispatch(selectRouteForPreview("/aboutus", true))
    }
    else {
      history("/aboutus")
    }
  }
  return (
    <Container>
      <MessageDeskHeroSection>

        {instituteData.business_owner_details && instituteData.business_owner_details.length ?
          instituteData.business_owner_details.map((item, key) => {
            return (
              <React.Fragment>
                <MessageDeskHomeHero>
                  <MessageProfileImage className='profile-image'>
                    <img src={item.business_owner_profile_photo && item.business_owner_profile_photo !== "" ? item.business_owner_profile_photo : (item.business_owner_name || item.business_owner_designation || item.business_owner_message) ? DefaultImage : MessageProfile} alt="" />
                  </MessageProfileImage>
                  <MessageProfileContent className='profile-content'>
                    <h4>{item.business_owner_name && item.business_owner_name}</h4>
                    <h5>{item.business_owner_designation && item.business_owner_designation}</h5>
                    <p className='sun-editor-output'
                      dangerouslySetInnerHTML={{
                        __html:
                          item.business_owner_message && item.business_owner_message
                      }}
                    ></p>
                  </MessageProfileContent>
                </MessageDeskHomeHero>
              </React.Fragment>
            );
          })
          :
          <React.Fragment>
            <MessageDeskHomeHero>
              <MessageProfileImage>
                <img src={MessageProfile} alt="" />
              </MessageProfileImage>
              <MessageProfileContent>
                <h4> Dr. Davinder Sabherwal</h4>
                <h5>Neurology</h5>
                <p>
                  Dr. Davinder Sabherwal having the total expertise spanning over 45 years, expert in dealing with
                  complicated cases of Chest and critical care. He is trained and worked at UK top elite hospitals for 10 years
                  such as Royal Berkshire Hospital and St. Luke's Hospital. He is current heading the Department of
                  Medicine and caring 10 beds ICU which is equipped with world class infrastructure and equipments such
                  as ventilator from Drager Company.
                </p>
                <ul>
                  <li>Qualification</li>
                  <li>M.B.B.S</li>
                  <li>M.R.C.P.</li>
                  <li>D.T.M&H (ENG)</li>
                  <li>M D.T.C.D (Cardiff)</li>
                </ul>
              </MessageProfileContent>
            </MessageDeskHomeHero>
          </React.Fragment>
        }


        {/* <Slider {...settingsMessageDeskHero}>
        <MessageDeskHomeHero>
          <MessageProfileImage>
            <img src={instituteData.business_owner_profile_photo && instituteData.business_owner_profile_photo !== "" ? instituteData.business_owner_profile_photo : (instituteData.business_owner_name || instituteData.business_owner_designation || instituteData.business_owner_message) ? DefaultImage : MessageProfile} alt="" />
          </MessageProfileImage>
          <MessageProfileContent>
            <h4>{instituteData.business_owner_name ? instituteData.business_owner_name : "Dr. Davinder Sabherwal"}</h4>
            <h5>{instituteData.business_owner_designation ? instituteData.business_owner_designation : "Neurology"}</h5>
            <p>
              {instituteData.business_owner_message ? instituteData.business_owner_message : `Dr. Davinder Sabherwal having the total expertise spanning over 45 years, expert in dealing with
complicated cases of Chest and critical care. He is trained and worked at UK top elite hospitals for 10 years
such as Royal Berkshire Hospital and St. Luke's Hospital. He is current heading the Department of
Medicine and caring 10 beds ICU which is equipped with world class infrastructure and equipments such
as ventilator from Drager Company.`}


            </p>
            <ul>
              <li>Qualification</li>
              <li>M.B.B.S</li>
              <li>M.R.C.P.</li>
              <li>D.T.M&H (ENG)</li>
              <li>M D.T.C.D (Cardiff)</li>
            </ul>
          </MessageProfileContent>
        </MessageDeskHomeHero>
      </Slider> */}
      </MessageDeskHeroSection >
    </Container>
  )
}

export default MessageDeskHero