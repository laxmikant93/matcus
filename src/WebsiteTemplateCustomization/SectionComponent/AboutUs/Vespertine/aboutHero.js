/* eslint-disable jsx-a11y/no-distracting-elements */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
// import DefaultAboutImage from "../defaultImage.svg";
// import DefaultAboutImagePlaceHolder from "../AboutUs.png";
import { Container } from '../../../CommonComponent/Container.styled';
const AboutHeroSection = styled.div`
padding: 32px 0;
`;
const SectionGrid = styled.div`
background: #EBECF0;
padding: 32px 42px;
border-radius: 24px;
/* display: grid;
grid-template-columns: 1fr auto;
align-items: center;
gap: 64px;
position: relative;
height: 100%;
@media screen and (max-width: 992px) {
  grid-template-columns: 1fr 1fr;
}
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
} */
`;
const SectionGridLeft = styled.div`

`;
const SectionGridRight = styled.div`
width: 340px;
height: 100%;
display: flex;
align-items: center;
@media screen and (max-width: 992px) {
  width: 100%;
  height: 100%;
}
img{
object-fit: contain;
  width: 100%;
  /* height: 100%; */
  border-radius: 24px;
  display: block;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
@media screen and (max-width: 768px) {
  width: 100%;
  height: auto;
}
`;
const SectionHead = styled.div`
margin-bottom: ${({ theme }) => theme.AboutUs.AboutUsHero.SectionHead.MarginBottom};
text-align: ${({ theme }) => theme.AboutUs.AboutUsHero.SectionHead.Alignment};
h2{
font-weight: ${({ theme }) => theme.AboutUs.AboutUsHero.h2.FontWeight};
font-size: ${({ theme }) => theme.AboutUs.AboutUsHero.h2.FontSize};
line-height: ${({ theme }) => theme.AboutUs.AboutUsHero.h2.LineHeight};
font-style: ${({ theme }) => theme.AboutUs.AboutUsHero.h2.FontStyle};
font-family: ${({ theme }) => theme.AboutUs.AboutUsHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsHero.h2.LetterSpacing};
color: ${({ theme }) => theme.AboutUs.AboutUsHero.h2.Color};
text-align: ${({ theme }) => theme.AboutUs.AboutUsHero.h2.Alignment};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
word-break: break-all;
}
h3{
font-weight: ${({ theme }) => theme.AboutUs.AboutUsHero.h3.FontWeight};
font-size: ${({ theme }) => theme.AboutUs.AboutUsHero.h3.FontSize};
line-height: ${({ theme }) => theme.AboutUs.AboutUsHero.h3.LineHeight};
font-style: ${({ theme }) => theme.AboutUs.AboutUsHero.h3.FontStyle};
font-family: ${({ theme }) => theme.AboutUs.AboutUsHero.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsHero.h3.LetterSpacing};
color: ${({ theme }) => theme.AboutUs.AboutUsHero.h3.Color};
text-align: ${({ theme }) => theme.AboutUs.AboutUsHero.h2.Alignment};
position: relative;
display: inline-block;
&::after{
position: absolute;
width: 100%;
height: ${({ theme }) => theme.AboutUs.AboutUsHero.BorderBottom.BorderWidth};
background-color: ${({ theme }) => theme.AboutUs.AboutUsHero.BorderBottom.Background};
bottom: ${({ theme }) => theme.AboutUs.AboutUsHero.BorderBottom.BottomSpace};
}
}
`;
const SectionDescription = styled.div`
p{
text-align: ${({ theme }) => theme.AboutUs.AboutUsHero.p.Alignment};

font-weight: ${({ theme }) => theme.AboutUs.AboutUsHero.p.FontWeight};
font-size: ${({ theme }) => theme.AboutUs.AboutUsHero.p.FontSize};
line-height: ${({ theme }) => theme.AboutUs.AboutUsHero.p.LineHeight};
font-style: ${({ theme }) => theme.AboutUs.AboutUsHero.p.FontStyle};
font-family: ${({ theme }) => theme.AboutUs.AboutUsHero.p.FontFamily};
letter-spacing: ${({ theme }) => theme.AboutUs.AboutUsHero.p.LetterSpacing};
letter-spacing: 0.02em;
color: ${({ theme }) => theme.AboutUs.AboutUsHero.p.Color};
display: -webkit-box;
-webkit-line-clamp: 8;
-webkit-box-orient: vertical;
overflow: hidden;
}
`;
const ViewMoreSection = styled.div`
display: flex;
justify-content: center;
margin-top: ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreSection.MarginTop};

`;
const ViewMoreButton = styled.a`

font-weight: ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreButton.FontWeight};
font-size: ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreButton.FontSize};
line-height: ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreButton.LineHeight};
background: ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreButton.Background};
border: 1px solid ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreButton.BorderColor};
border-radius: ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreButton.BorderRadius};
color: ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreButton.Color};
padding: ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreButton.PaddingY} ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreButton.Hover.Background};
color: ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.AboutUs.AboutUsHero.ViewMoreButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;

const AboutHero = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { preview } = useSelector((state) => {
    return {
      preview: state.websiteTemplate.preview
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
        <SectionGrid>
          <SectionGridLeft>
            <SectionHead>
              <h2>{instituteData.institute_about_head ?
                instituteData.institute_about_head
                : (
                  "About Us"
                )}</h2>
              <h3>{instituteData.institute_about_subhead ?
                instituteData.institute_about_subhead
                : (
                  "Changing lives, one student at a time."
                )}</h3>
            </SectionHead>
            <SectionDescription>
              <p  dangerouslySetInnerHTML={{
                __html:
                  instituteData.institute_about ? instituteData.institute_about.replaceAll("<p>","").replaceAll("</p>","") : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
              }}></p>
            </SectionDescription>
            <ViewMoreSection>
              <ViewMoreButton onClick={handleViewMoreButton}>
                View More
              </ViewMoreButton>
            </ViewMoreSection>
          </SectionGridLeft>
          {/* <SectionGridRight>
            {instituteData.institute_about_upload_type
              && instituteData.institute_about_upload_type === "video"
              ?
              instituteData.institute_about_upload.includes("embed")?         
                <iframe
                  title="youtube video"
                  src={instituteData.institute_about_upload && instituteData.institute_about_upload}
                  frameborder="0"
                  width="350"
                  height="250"
                  autoPlay={true}
                ></iframe>
              :
              <video src={instituteData.institute_about_upload ?
                instituteData.institute_about_upload
                : (instituteData.institute_about_head
                  || instituteData.institute_about_subhead
                  || instituteData.institute_about ?
                  DefaultAboutImagePlaceHolder :
                  DefaultAboutImage)}
                loading="eager"
                alt="About Us"
                controls autoPlay={true}
                muted />
              :
              <img src={instituteData.institute_about_upload ? instituteData.institute_about_upload : (instituteData.institute_about_head || instituteData.institute_about_subhead || instituteData.institute_about ? DefaultAboutImagePlaceHolder : DefaultAboutImage)} loading="eager" alt="About Us" />
            }
          </SectionGridRight> */}
        </SectionGrid>
      </AboutHeroSection>
    </Container>
  )
}

export default AboutHero