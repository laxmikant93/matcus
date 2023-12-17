import styled from 'styled-components';
// import Layout from "../../.."
// import Footer from "../../../FooterLayout/Vespertine"
// import { Fragment } from 'react';
import { Container } from '../../../CommonComponent/Container.styled'
// import MessageDeskDummyProfile from "../messageDeskDummyProfile.png";
// import DefaultCover from "../defaultCover.svg";
import MessageDeskDummyProfile from "../Principal.png";
import DefaultCover from "../banner.png";
import { useSelector } from 'react-redux';
import MessageDeskHero from './aboutPage-founderMessage';
import AboutusPageMission from './aboutPage-Mission';
import AboutusPageVision from './aboutPage-Vision';
import AboutCoverImage from "./about-hero.jpg";

import DefaultImage from "../../../assets/TheTranquill/default-bg.png";
import React from 'react';
import RenderAboutComponents from './RenderAboutComponents';

const AboutusSection = styled.div`
`;
const AboutSection = styled.div`
background: ${({ theme }) => theme.AboutUsPage.AboutSection.Background};
padding: 72px 0;
`;
const SectionHead = styled.div`
margin-bottom: ${({ theme }) => theme.AboutUsPage.SectionHead.MarginBottom};
text-align: ${({ theme }) => theme.AboutUsPage.SectionHead.Alignment};
h2{
font-weight: ${({ theme }) => theme.AboutUsPage.h2.FontWeight};
font-size: ${({ theme }) => theme.AboutUsPage.h2.FontSize};
line-height: ${({ theme }) => theme.AboutUsPage.h2.LineHeight};
font-style: ${({ theme }) => theme.AboutUsPage.h2.FontStyle};
font-family: ${({ theme }) => theme.AboutUsPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUsPage.h2.LetterSpacing};
text-align: ${({ theme }) => theme.AboutUsPage.h2.Alignment};
text-transform: ${({ theme }) => theme.AboutUsPage.h2.TextTransform};
color: ${({ theme }) => theme.AboutUsPage.h2.Color};
}
h3{
font-weight: ${({ theme }) => theme.AboutUsPage.h3.FontWeight};
font-size: ${({ theme }) => theme.AboutUsPage.h3.FontSize};
line-height: ${({ theme }) => theme.AboutUsPage.h3.LineHeight};
font-style: ${({ theme }) => theme.AboutUsPage.h3.FontStyle};
font-family: ${({ theme }) => theme.AboutUsPage.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUsPage.h3.LetterSpacing};
text-align: ${({ theme }) => theme.AboutUsPage.h3.Alignment};
text-transform: ${({ theme }) => theme.AboutUsPage.h3.TextTransform};
color: ${({ theme }) => theme.AboutUsPage.h3.Color};
position: relative;
display: inline-block;
}
`;
const SectionHeroBorderBottom = styled.div`
display: grid;
grid-template-columns: 25% 50% 25%;
align-items:center;
height: 8px;
`;
const SectionHeroBorderBottomL = styled.div`
width: 100%;
height: 100%;
background:${({ theme }) => theme.AboutUsHero.SectionHeroBorderBottomL.Background} 
`;
const SectionHeroBorderBottomM = styled.div`
width: 100%;
height: 100%;
background:${({ theme }) => theme.AboutUsHero.SectionHeroBorderBottomM.Background} 
`;
const SectionHeroBorderBottomR = styled.div`
width: 100%;
height: 100%;
background:${({ theme }) => theme.AboutUsHero.SectionHeroBorderBottomR.Background} 
`;
const SectionDescription = styled.div`
p{
  font-weight: ${({ theme }) => theme.AboutUsPage.p.FontWeight};
  font-size: ${({ theme }) => theme.AboutUsPage.p.FontSize};
  line-height: ${({ theme }) => theme.AboutUsPage.p.LineHeight};
  font-style: ${({ theme }) => theme.AboutUsPage.p.FontStyle};
  font-family: ${({ theme }) => theme.AboutUsPage.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.AboutUsPage.p.LetterSpacing};
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.AboutUsPage.p.Color};
  
  }
`;

const BannerCoverSection = styled.div`
margin: 48px 0;
`;
const BannerCoverSectionImage = styled.div`
width: 100%;
// height: 478px;
img{
  width: 100%;
  height: 100%;
  display: block;
  // object-fit: cover;
}
iframe, video{
  width: 100%;
  height: 478px;
  border: none;
  border-radius: 8px;
  display: block;
}
@media screen and (max-width: 768px) {
  height: auto;
}
`;
const AboutUsPage = () => {
  const { homecomponenthideData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  return (
    <AboutusSection>
      {/* {
        homecomponenthideData.length > 0 && homecomponenthideData[0].aboutSectionHide.includes("Aboutus") ?

          <AboutSection>
            <Container>

              <SectionHead>
                <h2>{instituteData.business_about_head ?
                  instituteData.business_about_head
                  : (
                    ""
                  )}</h2>
                {instituteData.business_about_subhead ?
                  <h3>{instituteData.business_about_subhead}</h3>
                  : (
                    ""
                  )}
              </SectionHead>
              <SectionDescription>
                <p className='sun-editor-output'
                  dangerouslySetInnerHTML={{
                    __html:
                      instituteData.business_about ? instituteData.business_about :
                        ""
                  }}
                ></p>
              </SectionDescription>
            </Container>
          </AboutSection> : ""
      }


      {
        homecomponenthideData.length > 0 && homecomponenthideData[0].aboutSectionHide.includes("PrincipalWelcome") ?
          <MessageDeskHero /> : ""}
      {
        homecomponenthideData.length > 0 && homecomponenthideData[0].aboutSectionHide.includes("Mission") ?
          <AboutusPageVision /> : ""}
      {
        homecomponenthideData.length > 0 && homecomponenthideData[0].aboutSectionHide.includes("Vission") ?
          <AboutusPageMission /> : ""} */}
      {
        homecomponenthideData.length > 0 && homecomponenthideData[0].aboutSectionHideData.length > 0 && homecomponenthideData[0].aboutSectionHideData.map((item, key) => {
          return (
            <React.Fragment>
              {item.show === true && React.createElement(RenderAboutComponents[item.field])}
            </React.Fragment>
          )
        })
      }

    </AboutusSection >
  )
}

export default AboutUsPage