import React from 'react'
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled';
import MessageProfile from "../.././../assets/Vespertine/PrincipalProfile.svg";
import ImageViewer from '../../../../Common/ImageViewer';

const MessageDesk = styled.div`
display: flex!important;
align-items: center;
justify-content: center;
flex-direction: column;
`;

const MessageDeskSection = styled.div`
margin: 48px 0;
h4{
  font-weight: ${({ theme }) => theme.AboutUs.AboutUsPage.h4.FontWeight};
  font-size: ${({ theme }) => theme.AboutUs.AboutUsPage.h4.FontSize};
  line-height: ${({ theme }) => theme.AboutUs.AboutUsPage.h4.LineHeight};
  font-style: ${({ theme }) => theme.AboutUs.AboutUsPage.h4.FontStyle};
  font-family: ${({ theme }) => theme.AboutUs.AboutUsPage.h4.FontFamily};
  letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsPage.h4.LetterSpacing};
  color: ${({ theme }) => theme.AboutUs.AboutUsPage.h4.Color};
  }
  h5{
  font-weight: ${({ theme }) => theme.AboutUs.AboutUsPage.h5.FontWeight};
  font-size: ${({ theme }) => theme.AboutUs.AboutUsPage.h5.FontSize};
  line-height: ${({ theme }) => theme.AboutUs.AboutUsPage.h5.LineHeight};
  font-style: ${({ theme }) => theme.AboutUs.AboutUsPage.h5.FontStyle};
  font-family: ${({ theme }) => theme.AboutUs.AboutUsPage.h5.FontFamily};
  letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsPage.h5.LetterSpacing};
  color: ${({ theme }) => theme.AboutUs.AboutUsPage.h5.Color};
  }
  p{
  font-weight: ${({ theme }) => theme.AboutUs.AboutUsPage.p.FontWeight};
  font-size: ${({ theme }) => theme.AboutUs.AboutUsPage.p.FontSize};
  line-height: ${({ theme }) => theme.AboutUs.AboutUsPage.p.LineHeight};
  font-style: ${({ theme }) => theme.AboutUs.AboutUsPage.p.FontStyle};
  font-family: ${({ theme }) => theme.AboutUs.AboutUsPage.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsPage.p.LetterSpacing};
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.02em;
  padding-top: ${({ theme }) => theme.AboutUs.AboutUsPage.p.PaddingTop};
  color: ${({ theme }) => theme.AboutUs.AboutUsPage.p.Color};
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
  color: ${({ theme }) => theme.AboutUs.AboutUsPage.Dots.Active.Color};
  }
  }
  }
  button{
  &::before{
  font-size: 12px;
  color: ${({ theme }) => theme.AboutUs.AboutUsPage.Dots.Color};
  }
  }
  }
  .slick-prev{
    content: '';
    width: 1.3rem;
    height: 1.3rem;
    border-right: 2px solid ${({ theme }) => theme.AboutUs.AboutUsPage.SlickArrowColor.Color};
    border-bottom: 2px solid ${({ theme }) => theme.AboutUs.AboutUsPage.SlickArrowColor.Color};
    z-index: 1;
    margin-left: -0.5rem;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    &::before{
    color: transparent;
    }
    &:hover{
      border-right: 2px solid ${({ theme }) => theme.AboutUs.AboutUsPage.SlickArrowColor.Hover.Color};
      border-bottom: 2px solid ${({ theme }) => theme.AboutUs.AboutUsPage.SlickArrowColor.Hover.Color};    
    }
    }
    .slick-next{
    content: '';
    width: 1.3rem;
    height: 1.3rem;
    border-left: 2px solid ${({ theme }) => theme.AboutUs.AboutUsPage.SlickArrowColor.Color};
    border-bottom: 2px solid ${({ theme }) => theme.AboutUs.AboutUsPage.SlickArrowColor.Color};
    z-index: 1;
    margin-right: -0.5rem;
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    &::before{
    color: transparent;
    }
    &:hover{
      border-left: 2px solid ${({ theme }) => theme.AboutUs.AboutUsPage.SlickArrowColor.Hover.Color};
      border-bottom: 2px solid ${({ theme }) => theme.AboutUs.AboutUsPage.SlickArrowColor.Hover.Color};    
    }
    }
`;
const MessageProfileImage = styled.div`
img{
width: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageProfileImage.Width};
height: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageProfileImage.Height};
border-radius: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageProfileImage.BorderRadius};
background: #D9D9D9;
margin-bottom: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageProfileImage.MarginBottom};
}
`;

const FounderMessage = () => {
  const settingsMessageDesk = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data);
  console.log('instituteData', instituteData.institute_owner_details);
  return (
    <Container>
      <MessageDeskSection>
        <Slider {...settingsMessageDesk}>
          {instituteData?.institute_owner_details.filter((item)=>item.institute_owner_name!=="")?.length ? instituteData.institute_owner_details.map((vl, i) => {
            return (
              <MessageDesk key={i}>
                <MessageProfileImage>
                <ImageViewer object={vl.institute_owner_profile_photo} deafultImage={MessageProfile}/>
                  {/* <img src={vl.institute_owner_profile_photo ? vl.institute_owner_profile_photo : MessageProfile} alt="" /> */}
                </MessageProfileImage>
                <h4>{vl.institute_owner_name ? vl.institute_owner_name : ""} </h4>
                <h5>{vl.institute_owner_designation ? vl.institute_owner_designation : ""}</h5>
                <p dangerouslySetInnerHTML={{
                  __html:
                  vl.institute_owner_message ? vl.institute_owner_message : ""
                }}
                ></p>
                {/* <p>
                  {vl.institute_owner_message ? vl.institute_owner_message : ""}
                </p> */}
              </MessageDesk>
            )
          })
            :
            <MessageDesk>
              <MessageProfileImage>
                <img src={MessageProfile} alt="" />
              </MessageProfileImage>
              <h4>Rajat Kumar</h4>
              <h5>Institute Owner</h5>
              <p>
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </MessageDesk>
          }
          
        </Slider>
      </MessageDeskSection>
    </Container>
  )
}
export default FounderMessage