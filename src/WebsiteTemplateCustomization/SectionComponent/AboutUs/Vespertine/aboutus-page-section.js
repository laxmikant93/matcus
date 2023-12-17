import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from '../../../CommonComponent/Container.styled'
import styled from 'styled-components';



const AboutSection = styled.div`
background: ${({ theme }) => theme.AboutUs.AboutUsPage.AboutSection.Background};
padding: 56px 0;
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
}
h3{
font-weight: ${({ theme }) => theme.AboutUs.AboutUsPage.h3.FontWeight};
font-size: ${({ theme }) => theme.AboutUs.AboutUsPage.h3.FontSize};
line-height: ${({ theme }) => theme.AboutUs.AboutUsPage.h3.LineHeight};
font-style: ${({ theme }) => theme.AboutUs.AboutUsPage.h3.FontStyle};
font-family: ${({ theme }) => theme.AboutUs.AboutUsPage.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsPage.h3.LetterSpacing};
color: ${({ theme }) => theme.AboutUs.AboutUsPage.h3.Color};
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
p{
  text-align: center;
  
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
`;
const AboutUsPageSection=()=>{
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  return(
        <AboutSection>
          <Container>
            <SectionHead>
              <h2>{instituteData.institute_about_head ? instituteData.institute_about_head : ""}</h2>
              <h3>{instituteData.institute_about_subhead ? instituteData.institute_about_subhead : ""}</h3>
            </SectionHead>
            <SectionDescription>
              <p dangerouslySetInnerHTML={{
                __html:
                  instituteData.institute_about ? instituteData.institute_about : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
              }}></p>
              {/* <p>{instituteData.institute_about ? instituteData.institute_about : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."}</p> */}
            </SectionDescription>
          </Container>
        </AboutSection>
  )
}
export default AboutUsPageSection