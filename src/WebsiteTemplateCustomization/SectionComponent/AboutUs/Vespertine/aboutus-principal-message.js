import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled';
import ImageViewer from '../../../../Common/ImageViewer';
import MessageDeskDummyProfile from "../Principal.png";

const MessageDeskSection = styled.div`
padding:40px 0;
`;
const MessageDeskSectionHead = styled.div`
margin-bottom: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.MessageDeskSectionHead.MarginBottom};
text-align: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.MessageDeskSectionHead.Alignment};
h2{

font-weight: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h2.FontWeight};
font-size: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h2.FontSize};
line-height: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h2.LineHeight};
font-style: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h2.FontStyle};
font-family: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h2.LetterSpacing};
color: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h2.Color};
}
h3{
font-weight: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h3.FontWeight};
font-size: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h3.FontSize};
line-height: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h3.LineHeight};
font-style: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h3.FontStyle};
font-family: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h3.LetterSpacing};
color: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h3.Color};
position: relative;
display: inline-block;
&::after{
width: 100%;
height: ${({ theme }) => theme.AboutUs.AboutUsPage.BorderBottom.BorderWidth};
background-color: ${({ theme }) => theme.AboutUs.AboutUsPage.BorderBottom.Background};
bottom: ${({ theme }) => theme.AboutUs.AboutUsPage.BorderBottom.BottomSpace};
}
}
`;
const MessageDeskGrid = styled.div`
display: grid;
grid-template-columns:  1fr;
gap: 100px;
align-items: center;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
  gap: 20px;
}
`;

const MessageWrapper = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
justify-content: space-between;
gap: 45px;

&:nth-child(odd) {

  .left {
    order: 2;
  }

}

&:nth-child(even) {
  .right {
    order: 4;
  }

}
@media screen and (max-width: 600px) {
  grid-template-columns: 1fr;
  gap: 25px;
}
`;


const MessageDeskGridLeft = styled.div`

`;
const MessageDeskGridRight = styled.div`

h4{
  
  font-weight: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h4.FontWeight};
  font-size: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h4.FontSize};
  line-height: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h4.LineHeight};
  font-style: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h4.FontStyle};
  font-family: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h4.FontFamily};
  letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h4.LetterSpacing};
  color: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h4.Color};
};
h5{
  
  font-weight: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h5.FontWeight};
  font-size: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h5.FontSize};
  line-height: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h5.LineHeight};
  font-style: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h5.FontStyle};
  font-family: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h5.FontFamily};
  letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h5.LetterSpacing};
  color: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.h5.Color};
};
p{
  
  font-weight: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.p.FontWeight};
  font-size: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.p.FontSize};
  line-height: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.p.LineHeight};
  font-style: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.p.FontStyle};
  font-family: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.p.LetterSpacing};
  color: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.p.Color};
  margin-top: 16px;
}
`;
const MessageDeskProfileImage = styled.div`
width: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.MessageDeskProfileImage.Width};
height: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.MessageDeskProfileImage.Height};
img{
  width: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.AboutUs.AboutUsPage.MessageDeskSection.MessageDeskProfileImage.BorderRadius};
  background: #D9D9D9;
  }
  @media screen and (max-width: 768px) {
    width: auto;
    height: auto;
  }
`;
const AboutUsPrinciple = () => {
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data);
  console.log('instituteData', instituteData.institute_owner_details);
  return (
    <Container>
      <MessageDeskSection>
        <MessageDeskSectionHead>
          <h2>{instituteData.institute_owner_name_head ? instituteData.institute_owner_name_head : ``}</h2>

        </MessageDeskSectionHead>
        <MessageDeskGrid>
          {instituteData?.institute_owner_details.filter((item)=>item.institute_owner_name!=="")?.length >0? instituteData.institute_owner_details.map((vl, i) => {
            return (
              <MessageWrapper>
                <MessageDeskGridLeft className="left">
                  <MessageDeskProfileImage>
                    <ImageViewer object={vl.institute_owner_profile_photo} defaultImage={MessageDeskDummyProfile}/>
                    {/* <img src={vl.institute_owner_profile_photo ? vl.institute_owner_profile_photo : MessageDeskDummyProfile} alt="" /> */}
                  </MessageDeskProfileImage>
                </MessageDeskGridLeft  >
                <MessageDeskGridRight className="right">
                  <h4>{vl.institute_owner_name ? vl.institute_owner_name : ""}</h4>
                  <h5>{vl.institute_owner_designation ? vl.institute_owner_designation : ""}</h5>
                  <p dangerouslySetInnerHTML={{
                    __html:
                      vl.institute_owner_message ? vl.institute_owner_message : ""
                  }}
                  ></p>
                </MessageDeskGridRight>
              </MessageWrapper>
            )
          })
            :
            <MessageWrapper>
              <MessageDeskGridLeft>
                <MessageDeskProfileImage>
                  <img src={MessageDeskDummyProfile} alt="" />
                </MessageDeskProfileImage>
              </MessageDeskGridLeft>
              <MessageDeskGridRight>
                <h4>{"Rajat Kumar"}</h4>
                <h5>{"Institute Owner"}</h5>
                <p dangerouslySetInnerHTML={{
                  __html:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                }}
                ></p>
              </MessageDeskGridRight>
            </MessageWrapper>
          }
        </MessageDeskGrid>
      </MessageDeskSection>
    </Container>
  )
}
export default AboutUsPrinciple