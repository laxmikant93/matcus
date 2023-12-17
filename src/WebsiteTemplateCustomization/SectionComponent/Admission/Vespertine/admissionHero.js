/* eslint-disable jsx-a11y/no-distracting-elements */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import DefaultAdmissionImage1 from "../Admissions.png";
import DefaultAdmissionImage from "../defaultImage.svg";
import { useNavigate } from 'react-router-dom';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import { Container } from '../../../CommonComponent/Container.styled';
import ImageViewer from '../../../../Common/ImageViewer';
const AdmissionHomeHeroSection = styled.div`
padding: 32px 0;
`;
const AdmissionHomeHero = styled.div`
display: grid;
grid-template-columns: 635px 1fr;
gap: 64px;
align-items: center;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
  }
`;
const AdmissionHomeHeroImage = styled.div`
width: 635px;
height: 433px;
box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

img{
object-fit: cover;
  width: 100%;
  border-radius: 24px;  
  height: 100%;
}
@media screen and (max-width: 768px) {
 width: 100%;
 height: auto;
  }
`;
const AdmissionHomeHeroGridLeft = styled.div`
`;
const AdmissionHomeHeroGridRight = styled.div`

`;
const AdmissionHomeHeroHead = styled.div`
margin-bottom: 48px;
display: flex;
align-items: center;
flex-direction: column;
h2{
font-weight: ${({ theme }) => theme.Admission.AdmissionHero.h2.FontWeight};
font-size: ${({ theme }) => theme.Admission.AdmissionHero.h2.FontSize};
line-height: ${({ theme }) => theme.Admission.AdmissionHero.h2.LineHeight};
font-style: ${({ theme }) => theme.Admission.AdmissionHero.h2.FontStyle};
font-family: ${({ theme }) => theme.Admission.AdmissionHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Admission.AdmissionHero.h2.LetterSpacing};
text-align: ${({ theme }) => theme.Admission.AdmissionHero.h2.Alignment};
color: ${({ theme }) => theme.Admission.AdmissionHero.h2.Color};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
h3{
  font-weight: ${({ theme }) => theme.Admission.AdmissionHero.h3.FontWeight};
  font-size: ${({ theme }) => theme.Admission.AdmissionHero.h3.FontSize};
  line-height: ${({ theme }) => theme.Admission.AdmissionHero.h3.LineHeight};
  font-style: ${({ theme }) => theme.Admission.AdmissionHero.h3.FontStyle};
  font-family: ${({ theme }) => theme.Admission.AdmissionHero.h3.FontFamily};
  letter-spacing: ${({ theme }) => theme.Admission.AdmissionHero.h3.LetterSpacing};
  color: ${({ theme }) => theme.Admission.AdmissionHero.h3.Color};
  text-align: ${({ theme }) => theme.Admission.AdmissionHero.h3.Alignment};
  position: relative;
  display: inline-block;
  &::after{
  position: absolute;
  width: 100%;
  height: ${({ theme }) => theme.Admission.AdmissionHero.BorderBottom.BorderWidth};
  background-color: ${({ theme }) => theme.Admission.AdmissionHero.BorderBottom.Background};
  bottom: ${({ theme }) => theme.Admission.AdmissionHero.BorderBottom.BottomSpace};
  }
  }
`;
const AdmissionHomeHeroDescription = styled.div`
h4{
  
  font-weight: ${({ theme }) => theme.Admission.AdmissionHero.h4.FontWeight};
  font-size: ${({ theme }) => theme.Admission.AdmissionHero.h4.FontSize};
  line-height: ${({ theme }) => theme.Admission.AdmissionHero.h4.LineHeight};
  font-style: ${({ theme }) => theme.Admission.AdmissionHero.h4.FontStyle};
  font-family: ${({ theme }) => theme.Admission.AdmissionHero.h4.FontFamily};
  letter-spacing: ${({ theme }) => theme.Admission.AdmissionHero.h4.LetterSpacing};
  color: ${({ theme }) => theme.Admission.AdmissionHero.h4.Color};
},
h5{
text-align: ${({ theme }) => theme.Admission.AdmissionHero.h5.Alignment};
margin: ${({ theme }) => theme.Admission.AdmissionHero.h5.MarginY} ${({ theme }) => theme.Admission.AdmissionHero.h5.MarginX};

font-weight: ${({ theme }) => theme.Admission.AdmissionHero.h5.FontWeight};
font-size: ${({ theme }) => theme.Admission.AdmissionHero.h5.FontSize};
line-height: ${({ theme }) => theme.Admission.AdmissionHero.h5.LineHeight};
font-style: ${({ theme }) => theme.Admission.AdmissionHero.h5.FontStyle};
font-family: ${({ theme }) => theme.Admission.AdmissionHero.h5.FontFamily};
letter-spacing: ${({ theme }) => theme.Admission.AdmissionHero.h5.LetterSpacing};
letter-spacing: 0.02em;
color: ${({ theme }) => theme.Admission.AdmissionHero.h5.Color};
display: -webkit-box;
-webkit-line-clamp: 8;
-webkit-box-orient: vertical;
overflow: hidden;
}
`;
const ViewMoreAdmissionHeroSection = styled.div`
display: flex;
justify-content: ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroSection.Alignment};
margin-top: 22px;
}
`;
const ViewMoreAdmissionHeroButton = styled.a`

font-weight: ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.FontWeight};
font-size: ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.FontSize};
line-height: ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.LineHeight};
background: ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.Background};
border: 1px solid ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.BorderColor};
border-radius: ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.BorderRadius};
color: ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.Color};
padding: ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.PaddingY} ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.Hover.Background};
color: ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Admission.AdmissionHero.ViewMoreAdmissionHeroButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;

const ViewMoreButtonSection = styled.div`
display: flex;
align-items: center;
justify-content: center;
`;
const ViewMoreFacilitiesButton = styled.a`

font-weight: ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.FontWeight};
font-size: ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.FontSize};
line-height: ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.LineHeight};
font-style: ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.FontStyle};
font-family: ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.FontFamily};
letter-spacing: ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.LetterSpacing};
background: ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.Background};
border: 1px solid ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.BorderColor};
border-radius: ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.BorderRadius};
color: ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.Color};
padding: ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.PaddingY} ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.PaddingX};
cursor: pointer;
margin-top: ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.MarginTop};
&:hover{
background: ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.Hover.Background};
color: ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;

const AdmissionHero = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { admissionsData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { route, preview } = useSelector((state) => {
    return {
      route: state.websiteTemplate.route,
      preview: state.websiteTemplate.preview
    }
  })

  const handleViewMoreButton = () => {
    if (preview) {
      dispatch(selectRouteForPreview("/admission", true))
    }
    else {
      history("/admission")
    }
  }

  return (
    <React.Fragment>
       <Container>
      <AdmissionHomeHeroHead>
        <h2>{(subheadersData && subheadersData['admissionhead']) || "Admissions"}</h2>
        <h3>{(subheadersData && subheadersData['admissionsubhead']) || ""}</h3>
      </AdmissionHomeHeroHead>
      <AdmissionHomeHeroSection>
        {
          admissionsData.length ?
            admissionsData.slice(0, 1).map((item, key) => {
              return (
                <AdmissionHomeHero key={key}>
                  <AdmissionHomeHeroGridLeft>
                    <AdmissionHomeHeroImage>
                      <ImageViewer object={item.thumbnail} defaultImage={DefaultAdmissionImage1}/>
                      {/* <img src={item.thumbnail && item.thumbnail !== "" ? item.thumbnail : DefaultAdmissionImage1} loading="eager" alt="Admission Us" /> */}
                    </AdmissionHomeHeroImage>
                  </AdmissionHomeHeroGridLeft>
                  <AdmissionHomeHeroGridRight>
                    {/* <AdmissionHomeHeroHead>
                      <h2>Admissions</h2>
                    </AdmissionHomeHeroHead> */}
                    <AdmissionHomeHeroDescription>
                      <h4>{item.title}</h4>
                      <h5 dangerouslySetInnerHTML={{
                        __html:
                          item.description,
                      }}></h5>
                    </AdmissionHomeHeroDescription>
                    {/* <ViewMoreAdmissionHeroSection>
                      <ViewMoreAdmissionHeroButton to="">
                        View More
                      </ViewMoreAdmissionHeroButton>
                    </ViewMoreAdmissionHeroSection> */}
                  </AdmissionHomeHeroGridRight>
                </AdmissionHomeHero>
              )
            }) :
            <AdmissionHomeHero>
              <AdmissionHomeHeroGridLeft>
                <AdmissionHomeHeroImage>
                  <img src={DefaultAdmissionImage} loading="eager" alt="Admission Us" />
                </AdmissionHomeHeroImage>
              </AdmissionHomeHeroGridLeft>
              <AdmissionHomeHeroGridRight>
                <AdmissionHomeHeroDescription>
                  <h4>Our Admissions</h4>
                  <h5>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</h5>
                </AdmissionHomeHeroDescription>
              </AdmissionHomeHeroGridRight>
            </AdmissionHomeHero>
        }
        <ViewMoreButtonSection>
          <ViewMoreFacilitiesButton onClick={() => handleViewMoreButton()}>
            View More
          </ViewMoreFacilitiesButton>
        </ViewMoreButtonSection>
      </AdmissionHomeHeroSection>
      </Container>
    </React.Fragment>
  )
}

export default AdmissionHero