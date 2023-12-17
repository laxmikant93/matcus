import React from 'react'
import { useSelector } from 'react-redux';
import { Container } from '../../../CommonComponent/Container.styled';
import styled from 'styled-components';
import ImageViewer from '../../../../Common/ImageViewer';

const AboutUsPageSection = styled.div`
margin: 48px 0;
`;
const SectionGrid = styled.div`
background: ${({theme}) => theme.AboutUs.AboutUsPage.SectionGrid.Background};
`;
const SectionHead = styled.div`
margin-bottom: ${({ theme }) => theme.AboutUs.AboutUsPage.SectionHead.MarginBottom};
text-align: ${({ theme }) => theme.AboutUs.AboutUsPage.SectionHead.Alignment};
h2{
font-weight: ${({ theme }) => theme.AboutUs.AboutUsPage.h2.FontWeight};
font-size: ${({ theme }) => theme.AboutUs.AboutUsPage.h2.FontSize};
line-height: ${({ theme }) => theme.AboutUs.AboutUsPage.h2.LineHeight};
font-style: ${({ theme }) => theme.AboutUs.AboutUsPage.h2.FontStyle};
font-family: ${({ theme }) => theme.AboutUs.AboutUsPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsPage.h2.LetterSpacing};
color: ${({ theme }) => theme.AboutUs.AboutUsPage.h2.Color};
text-align: ${({ theme }) => theme.AboutUs.AboutUsPage.h2.Alignment};
}
h3{
font-weight: ${({ theme }) => theme.AboutUs.AboutUsPage.h3.FontWeight};
font-size: ${({ theme }) => theme.AboutUs.AboutUsPage.h3.FontSize};
line-height: ${({ theme }) => theme.AboutUs.AboutUsPage.h3.LineHeight};
font-style: ${({ theme }) => theme.AboutUs.AboutUsPage.h3.FontStyle};
font-family: ${({ theme }) => theme.AboutUs.AboutUsPage.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsPage.h3.LetterSpacing};
color: ${({ theme }) => theme.AboutUs.AboutUsPage.h3.Color};
text-align: ${({ theme }) => theme.AboutUs.AboutUsPage.h2.Alignment};
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
const SectionDescription = styled.div`
 width: 100%;
 margin-top: 16px;

 .videoTag {
   width: 100%;
   height: 478px;
 margin-top: 20px;
 }

margin: auto;
p{
text-align: ${({ theme }) => theme.AboutUs.AboutUsPage.p.Alignment};

font-weight: ${({ theme }) => theme.AboutUs.AboutUsPage.p.FontWeight};
font-size: ${({ theme }) => theme.AboutUs.AboutUsPage.p.FontSize};
line-height: ${({ theme }) => theme.AboutUs.AboutUsPage.p.LineHeight};
font-style: ${({ theme }) => theme.AboutUs.AboutUsPage.p.FontStyle};
font-family: ${({ theme }) => theme.AboutUs.AboutUsPage.p.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsPage.p.LetterSpacing};
letter-spacing: 0.02em;
color: ${({ theme }) => theme.AboutUs.AboutUsPage.p.Color};
display: -webkit-box;
-webkit-line-clamp: 8;
-webkit-box-orient: vertical;
overflow: hidden;
}
img{
  
  display: block;
  margin: auto;
  width: auto;
  height: auto;
  border-radius: 8px;
  margin-top: 32px;
  
}
`;

const AboutUsMain = () => {
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  return (
    <React.Fragment>
      <Container>
        <AboutUsPageSection>
          <SectionGrid>
            <SectionHead>
              <h2>{instituteData.institute_about_head ? instituteData.institute_about_head : "About us"}</h2>
              <h3>{instituteData.institute_about_subhead ? instituteData.institute_about_subhead : ""}</h3>
            </SectionHead>
            <SectionDescription>
              <p dangerouslySetInnerHTML={{
                __html:
                  instituteData.institute_about ? instituteData.institute_about : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
              }}></p>
              {instituteData.institute_about_upload_type && instituteData.institute_about_upload?.src && instituteData.institute_about_upload_type === "video" ?
                instituteData.institute_about_upload?.src&&instituteData.institute_about_upload.src.includes("embed")?         
               <iframe
                 title="youtube video"
                 src={instituteData.institute_about_upload&&instituteData.institute_about_upload.src && instituteData.institute_about_upload.src}
                 frameborder="0"
                 width="350"
                 height="250"
                 autoPlay={true}
                 allow='autoplay'
                 className='videoTag'
               ></iframe>:
                <video src={instituteData.institute_about_upload.src} alt="" controls   autoPlay={true}
                muted />
                :
                <ImageViewer object={instituteData.institute_about_upload} />
                // <img src={instituteData.institute_about_upload} alt="" />
              }
              {/* <img src={instituteData.institute_about_upload} alt="" /> */}
            </SectionDescription>
          </SectionGrid>
        </AboutUsPageSection>
      </Container>
    </React.Fragment>
  )
}
export default AboutUsMain;