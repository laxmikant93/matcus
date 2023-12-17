/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ComputerFacilities1 from "../School_facilities.png";
import ComputerFacilities from "../../../assets/Vespertine/ComputerFacilities.svg";
import LibraryFacilities from "../../../assets/Vespertine/LibraryFacilities.svg";
import { useDispatch, useSelector } from 'react-redux';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../../CommonComponent/Container.styled';
import ImageViewer from '../../../../Common/ImageViewer';



const GalleryHomeHeroSection = styled.div`
padding: 32px 0;
`;
const FacilitiesHomeHero = styled.div`
.slick-prev{
content: '';
width: 2rem;
height: 2rem;
border-right: 2px solid ${({ theme }) => theme.Facility.FacilitiesHero.SlickArrowColor.Color};
border-bottom: 2px solid ${({ theme }) => theme.Facility.FacilitiesHero.SlickArrowColor.Color};
z-index: 1;
margin-left: -30px;
transform: rotate(135deg);
-webkit-transform: rotate(135deg);
&::before{
color: transparent;
}
}
.slick-next{
content: '';
width: 2rem;
height: 2rem;
border-left: 2px solid ${({ theme }) => theme.Facility.FacilitiesHero.SlickArrowColor.Color};
border-bottom: 2px solid ${({ theme }) => theme.Facility.FacilitiesHero.SlickArrowColor.Color};
z-index: 1;
margin-right: -30px;
transform: rotate(-135deg);
-webkit-transform: rotate(-135deg);
&::before{
color: transparent;
}
}
/* the slides */
.slick-slide {
    margin: 0 0;
}

/* the parent */
.slick-list {
    margin: 0 0;
}
`;
const FacilitiesHomeHeroHead = styled.div`
margin-bottom: 48px;
display: flex;
align-items: center;
flex-direction: column;
h2{

font-weight: ${({ theme }) => theme.Facility.FacilitiesHero.h2.FontWeight};
font-size: ${({ theme }) => theme.Facility.FacilitiesHero.h2.FontSize};
line-height: ${({ theme }) => theme.Facility.FacilitiesHero.h2.LineHeight};
text-align: ${({ theme }) => theme.Facility.FacilitiesHero.h2.Alignment};
font-style: ${({ theme }) => theme.Facility.FacilitiesHero.h2.FontStyle};
font-family: ${({ theme }) => theme.Facility.FacilitiesHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Facility.FacilitiesHero.h2.LetterSpacing};
color: ${({ theme }) => theme.Facility.FacilitiesHero.h2.Color};
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
}
h3{

font-weight: ${({ theme }) => theme.Facility.FacilitiesHero.h3.FontWeight};
font-size: ${({ theme }) => theme.Facility.FacilitiesHero.h3.FontSize};
line-height: ${({ theme }) => theme.Facility.FacilitiesHero.h3.LineHeight};
text-align: ${({ theme }) => theme.Facility.FacilitiesHero.h3.Alignment};
font-style: ${({ theme }) => theme.Facility.FacilitiesHero.h3.FontStyle};
font-family: ${({ theme }) => theme.Facility.FacilitiesHero.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.Facility.FacilitiesHero.h3.LetterSpacing};
color: ${({ theme }) => theme.Facility.FacilitiesHero.h3.Color};
position: relative;
display: inline-block;
&::after{
position: absolute;
width: 100%;
height: ${({ theme }) => theme.Facility.FacilitiesHero.BorderBottom.BorderWidth};
background-color: ${({ theme }) => theme.Facility.FacilitiesHero.BorderBottom.Background};
bottom: ${({ theme }) => theme.Facility.FacilitiesHero.BorderBottom.BottomSpace};
}
}
`;
const FacilitiesSliderItem = styled.div`
display: grid !important;
grid-template-columns: 1fr 1fr;
gap: 0;
// width: 550px !important;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
}
`;
const FacilitiesSliderImage = styled.div`
width: 300px;
height: 374px;
@media screen and (max-width: 768px) {
  width: 100%;
height: 100%;
  }
img{
width: 100%;
height: 100%;
object-fit: initial;
@media screen and (max-width: 768px) {
  /* object-fit: cover; */
  }
}
`;
const FacilitiesSliderDescription = styled.div`
width: 100%;
height: 374px;
padding: ${({ theme }) => theme.Facility.FacilitiesHero.FacilitiesSliderDescription.Padding};
background: ${({ theme }) => theme.Facility.FacilitiesHero.FacilitiesSliderDescription.Background};
box-shadow: 0px 0px 19px -23px rgba(0, 0, 0, 0.69);
@media screen and (max-width: 768px) {
height: 250px;
}
h4{
font-weight: ${({ theme }) => theme.Facility.FacilitiesHero.h3.FontWeight};
font-size: ${({ theme }) => theme.Facility.FacilitiesHero.h3.FontSize};
line-height: ${({ theme }) => theme.Facility.FacilitiesHero.h3.LineHeight};
font-style: ${({ theme }) => theme.Facility.FacilitiesHero.h3.FontStyle};
font-family: ${({ theme }) => theme.Facility.FacilitiesHero.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.Facility.FacilitiesHero.h3.LetterSpacing};
color: ${({ theme }) => theme.Facility.FacilitiesHero.h3.Color};
word-break: break-all;
position: relative;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
}
ul{
display: -webkit-box;
-webkit-line-clamp: 8;
-webkit-box-orient: vertical;
overflow: hidden;
@media screen and (max-width: 768px) {
  -webkit-line-clamp: 5;
  }
}
li{

font-weight: ${({ theme }) => theme.Facility.FacilitiesHero.p.FontWeight};
font-size: ${({ theme }) => theme.Facility.FacilitiesHero.p.FontSize};
line-height: ${({ theme }) => theme.Facility.FacilitiesHero.p.LineHeight};
font-style: ${({ theme }) => theme.Facility.FacilitiesHero.p.FontStyle};
font-family: ${({ theme }) => theme.Facility.FacilitiesHero.p.FontFamily};
letter-spacing: ${({ theme }) => theme.Facility.FacilitiesHero.p.LetterSpacing};
color: ${({ theme }) => theme.Facility.FacilitiesHero.p.Color};
margin-top: ${({ theme }) => theme.Facility.FacilitiesHero.p.MarginTop};
}
`;

const FacilitiesSliderHead = styled.div`
position: relative;
&::after{
  width: 100%;
  height: ${({ theme }) => theme.Facility.FacilitiesHero.FacilitiesSliderDescription.BorderBottom.Height};
  background-color: ${({ theme }) => theme.Facility.FacilitiesHero.FacilitiesSliderDescription.BorderBottom.Background};
  bottom: ${({ theme }) => theme.Facility.FacilitiesHero.FacilitiesSliderDescription.BorderBottom.BottomSpace};
  }
`;
const Divider = styled.div`
width: 100%;
height: ${({ theme }) => theme.Facility.FacilitiesHero.FacilitiesSliderDescription.BorderBottom.Height};
background-color: ${({ theme }) => theme.Facility.FacilitiesHero.FacilitiesSliderDescription.BorderBottom.Background};
// bottom: ${({ theme }) => theme.Facility.FacilitiesHero.FacilitiesSliderDescription.BorderBottom.BottomSpace};
margin: 10px 0;
`;

const FacilitiesHomeHeroSlide = styled.div`
.slick-prev{
  content: '';
  width: 1.5rem;
  height: 1.5rem;
  border-right: 2px solid ${({ theme }) => theme.Facility.FacilitiesHero.SlickArrowColor.Color};
  border-bottom: 2px solid ${({ theme }) => theme.Facility.FacilitiesHero.SlickArrowColor.Color};
  z-index: 1;
  margin-left: 0;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  left: -35px!important;
  
@media screen and (max-width: 768px) {
  width: 1rem;
  height: 1rem;
  left: -16px!important;
  }
  &::before{
  color: transparent;
  }
  &:hover{
    border-right: 2px solid ${({ theme }) => theme.Facility.FacilitiesHero.SlickArrowColor.Hover.Color};
    border-bottom: 2px solid ${({ theme }) => theme.Facility.FacilitiesHero.SlickArrowColor.Hover.Color};    
  }
  }
  .slick-next{
  content: '';
  width: 1.5rem;
  height: 1.5rem;
  border-left: 2px solid ${({ theme }) => theme.Facility.FacilitiesHero.SlickArrowColor.Color};
  border-bottom: 2px solid ${({ theme }) => theme.Facility.FacilitiesHero.SlickArrowColor.Color};
  z-index: 1;
  margin-right: 3.5rem;
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  right: -90px!important;
  @media screen and (max-width: 768px) {
    width: 1rem;
    height: 1rem;
    right: -72px!important;
    }
  &::before{
  color: transparent;
  }
  &:hover{
    border-left: 2px solid ${({ theme }) => theme.Facility.FacilitiesHero.SlickArrowColor.Hover.Color};
    border-bottom: 2px solid ${({ theme }) => theme.Facility.FacilitiesHero.SlickArrowColor.Hover.Color};    
  }
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

const FacilitiesHero = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { facilitiesData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { route, preview } = useSelector((state) => {
    return {
      route: state.websiteTemplate.route,
      preview: state.websiteTemplate.preview
    }
  })
  const settingsFacilitiesHomeHeroSlide = {
    className: "slider variable-width",
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: facilitiesData.length > 2 ? 2 : 2,
    slidesToScroll: 1,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  };

  const handleViewMoreButton = () => {
    if (preview) {
      dispatch(selectRouteForPreview("/services", true))
    }
    else {
      history("/services")
    }
  }
  return (
    <Container>
    <GalleryHomeHeroSection>
      <FacilitiesHomeHero>
        <FacilitiesHomeHeroHead>
          <h2>{(subheadersData && subheadersData['servicehead']) || "School’s Facilities"}</h2>
          <h3>{(subheadersData && subheadersData['servicesubhead']) || ""}</h3>
        </FacilitiesHomeHeroHead>
        <FacilitiesHomeHeroSlide>
          {
            facilitiesData.length ?
              <Slider {...settingsFacilitiesHomeHeroSlide}>
                {facilitiesData.map((item, key) => {
                  return (
                    <FacilitiesSliderItem key={key}>
                      <FacilitiesSliderImage>
                    <ImageViewer object={item.thumbnail} defaultImage={ComputerFacilities1}/>

                        {/* <img src={item.thumbnail && item.thumbnail !== "" ? item.thumbnail : ComputerFacilities1} alt="" /> */}
                      </FacilitiesSliderImage>
                      <FacilitiesSliderDescription>
                        <h4>{item.title ? item.title : ""}</h4>
                        <Divider />
                        {item.details ?
                          <ul>
                            <li dangerouslySetInnerHTML={{
                              __html:
                                item.details,
                            }}></li>
                          </ul>
                          :
                          ""
                        }
                      </FacilitiesSliderDescription>
                    </FacilitiesSliderItem>
                  )
                })}

              </Slider> : <>
                <Slider {...settingsFacilitiesHomeHeroSlide}>
                  <FacilitiesSliderItem>
                    <FacilitiesSliderImage>
                      <img src={ComputerFacilities} alt="" />
                    </FacilitiesSliderImage>
                    <FacilitiesSliderDescription>
                      <h4>Computer Laboratory</h4>
                      <ul>
                        <li>Computer Education is compulsory for classes from Std. I to X.</li>
                        <li>
                          A fully-fledged computer laboratory has been established with a sufficient number of computer sets and able teachers run the computer classes efficiently.
                        </li>
                        <li>
                          Computer education keeping pace with the latest trends in information technology is provided compulsorily to all the student's well-equipped computer centers with latest machine and software are the most resource houses.
                        </li>
                      </ul>
                    </FacilitiesSliderDescription >
                  </FacilitiesSliderItem>
                  <FacilitiesSliderItem>
                    <FacilitiesSliderImage>
                      <img src={LibraryFacilities} alt="" />
                    </FacilitiesSliderImage>
                    <FacilitiesSliderDescription>
                      <h4>Computer Laboratory</h4>
                      <ul>
                        <li>Computer Education is compulsory for classes from Std. I to X.</li>
                        <li>
                          A fully-fledged computer laboratory has been established with a sufficient number of computer sets and able teachers run the computer classes efficiently.
                        </li>
                        <li>
                          Computer education keeping pace with the latest trends in information technology is provided compulsorily to all the student's well-equipped computer centers with latest machine and software are the most resource houses.
                        </li>
                      </ul>
                    </FacilitiesSliderDescription >
                  </FacilitiesSliderItem>
                </Slider>
              </>
          }
        </FacilitiesHomeHeroSlide >
        <ViewMoreButtonSection>
          <ViewMoreFacilitiesButton onClick={() => handleViewMoreButton()}>
            View More
          </ViewMoreFacilitiesButton>
        </ViewMoreButtonSection>
      </FacilitiesHomeHero >
    </GalleryHomeHeroSection >
    </Container>
  )
}

export default FacilitiesHero