/* eslint-disable jsx-a11y/no-distracting-elements */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
// import DefaultAboutImage from "../defaultImage.svg";
import AboutHeroImage from "./about-hero.jpg";
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";
import { Container } from '../../../CommonComponent/Container.styled';
const AboutHeroSection = styled.div`
margin-top: 48px;
`;
const SectionContent = styled.div`
width: 80%;
margin: auto;
@media screen and (max-width: 768px) {
  width: 100%;
}
`;

const SectionHead = styled.div`
margin-bottom: ${({ theme }) => theme.AboutUsHero.SectionHead.MarginBottom};
text-align: ${({ theme }) => theme.AboutUsHero.SectionHead.Alignment};
h2{
font-weight: ${({ theme }) => theme.AboutUsHero.h2.FontWeight};
font-size: ${({ theme }) => theme.AboutUsHero.h2.FontSize};
line-height: ${({ theme }) => theme.AboutUsHero.h2.LineHeight};
font-style: ${({ theme }) => theme.AboutUsHero.h2.FontStyle};
font-family: ${({ theme }) => theme.AboutUsHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUsHero.h2.LetterSpacing};
color: ${({ theme }) => theme.AboutUsHero.h2.Color};
text-align: ${({ theme }) => theme.AboutUsPage.h2.Alignment};
text-transform: ${({ theme }) => theme.AboutUsPage.h2.TextTransform};
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
text-align: ${({ theme }) => theme.AboutUsPage.h3.Alignment};
text-transform: ${({ theme }) => theme.AboutUsPage.h3.TextTransform};
position: relative;
display: inline-block;
text-transform: uppercase;
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
`;
const SectionDescription = styled.div`
display: -webkit-box;
-webkit-line-clamp: 14;
-webkit-box-orient: vertical;
overflow: hidden;
p{
text-align: ${({ theme }) => theme.AboutUsHero.p.Alignment};
font-weight: ${({ theme }) => theme.AboutUsHero.p.FontWeight};
font-size: ${({ theme }) => theme.AboutUsHero.p.FontSize};
line-height: ${({ theme }) => theme.AboutUsHero.p.LineHeight};
font-style: ${({ theme }) => theme.AboutUsHero.p.FontStyle};
font-family: ${({ theme }) => theme.AboutUsHero.p.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUsHero.p.LetterSpacing};
letter-spacing: 0.02em;
color: ${({ theme }) => theme.AboutUsHero.p.Color};
}
`;
const ViewMoreSection = styled.div`
display: flex;
justify-content: center;
margin-top: ${({ theme }) => theme.AboutUsHero.ViewMoreSection.MarginTop};
}
`;
const SectionImage = styled.div`
width: 100%;
// height: 478px;
margin-top: 48px;
img{
  width: 100%;
  height: 100%;
  display: block;
  // object-fit: cover;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
iframe, video{
  width: 100%;
  height: 478px;
  border: none;
  border-radius: 8px;
  display: block;
}
@media screen and (max-width: 768px) {
  width: 100%;
  height: auto;
}
`;
const ViewMoreButton = styled.a`
font-weight: ${({ theme }) => theme.AboutUsHero.ViewMoreButton.FontWeight};
font-size: ${({ theme }) => theme.AboutUsHero.ViewMoreButton.FontSize};
line-height: ${({ theme }) => theme.AboutUsHero.ViewMoreButton.LineHeight};
border-radius: ${({ theme }) => theme.AboutUsHero.ViewMoreButton.BorderRadius};
color: ${({ theme }) => theme.AboutUsHero.ViewMoreButton.Color};
padding: 8px 24px 8px 8px;
cursor: pointer;
position: relative;
text-decoration: none;
&::after{
  content: '';
  width: 6px;
  height: 6px;
  border-right: 2px solid  ${({ theme }) => theme.AboutUsHero.ViewMoreButton.Hover.Color};
  border-bottom: 2px solid ${({ theme }) => theme.AboutUsHero.ViewMoreButton.Hover.Color};
  position: absolute;
  right: 0;
  left: auto;
  transform: rotate(-45deg);
  top: 16px;
}
&::before{  
  content: '';
  width: 16px;
  height: 2px;
 background:   ${({ theme }) => theme.AboutUsHero.ViewMoreButton.Hover.Color};
 position: absolute;
 right: 0px;
 left: auto;
 top: 19px;
}
&:hover{
color: ${({ theme }) => theme.AboutUsHero.ViewMoreButton.Hover.Color};
text-decoration: underline;
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
&::after{
  border-color: ${({ theme }) => theme.AboutUsHero.ViewMoreButton.Hover.Color};
}
&::before{  
 background: ${({ theme }) => theme.AboutUsHero.ViewMoreButton.Hover.Color};
}
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
const AboutHero = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { instituteData } = useSelector((state) => state.serviceTemplate.getTemplate.data)

  const { preview } = useSelector((state) => {
    return {
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
      <AboutHeroSection>
        <SectionContent>
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
         {  instituteData.business_about? <ViewMoreSection>
            <ViewMoreButton onClick={handleViewMoreButton}>
              Learn More
            </ViewMoreButton>
          </ViewMoreSection>:""}
        </SectionContent>
        {(instituteData.business_about_upload || instituteData.business_about_upload) &&
          <SectionImage>
            {instituteData.business_intro_video &&
              instituteData.business_intro_video.includes(".mp4") ? (
              <video
                // height="180"
                src={instituteData.business_intro_video && instituteData.business_intro_video}
                controls
                // className="gallery-thumnail"
                alt=""
              ></video>
            ) : instituteData.business_intro_video &&
              instituteData.business_intro_video.includes("embed") ? (
              <iframe
                title="youtube video"
                src={instituteData.business_intro_video && instituteData.business_intro_video}
                frameborder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : instituteData.business_about_upload ?
              <>
                <img src={instituteData.business_about_upload ? instituteData.business_about_upload : DefaultImage} alt="" />
                <SectionHeroBorderBottom>
                  <SectionHeroBorderBottomL></SectionHeroBorderBottomL>
                  <SectionHeroBorderBottomM></SectionHeroBorderBottomM>
                  <SectionHeroBorderBottomR></SectionHeroBorderBottomR>
                </SectionHeroBorderBottom>
              </>
              :
              (<video
                src=""
                alt=""
              ></video>
              )}

            {/* <img src={instituteData.business_about_upload ? instituteData.business_about_upload : DefaultImage} loading="eager" alt="About Us" /> */}
            <SectionHeroBorderBottom>
              <SectionHeroBorderBottomL></SectionHeroBorderBottomL>
              <SectionHeroBorderBottomM></SectionHeroBorderBottomM>
              <SectionHeroBorderBottomR></SectionHeroBorderBottomR>
            </SectionHeroBorderBottom>
          </SectionImage>}
      </AboutHeroSection>
    </Container>
  )
}

export default AboutHero