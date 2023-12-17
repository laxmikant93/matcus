/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import defaultImage from "../School_facilities.png";
import defaultImage2 from "./defaultImage2.svg";
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../../CommonComponent/Container.styled';
import ImageViewer from '../../../../Common/ImageViewer';


const FacilitiesHeroSection = styled.div`
padding: 24px 0;
position:relative;

.slick-slide {
  padding: 0px 10px;
}

.slick-prev {
  z-index: 1;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid rgba(0, 52, 89, 1);
  left: 0;
  position: absolute;
  top: -80px;
  left: 91%;
  color:rgba(0,52,89,1);
  &:hover{
  color:rgba(0,52,89,1);
  }
  
  @media screen and (max-width:1000px){
    left: 87%;
  }
  @media screen and (max-width:700px){
    left: 84%;
  }
  @media screen and (max-width:500px){
    left: 77%;
  }
}

.slick-dots li button:before{
  display: none;
}

.slick-prev:before {
  border-right: 2px solid rgba(0, 52, 89, 1);
  border-bottom: 2px solid rgba(0, 52, 89, 1);
  transform: translate(-50%,-50%) rotate(137deg);
  color: transparent;
  width: 8px;
  height: 8px;
  top: 50%;
  left: 15px;
  z-index: 3;
}

.slick-prev:after{
  transform: translate(-50%, -50%);
  width: 12px;
  height: 2px;
  background-color: rgba(0, 52, 89, 1);
  top: 50%;
  left: 17px;
}

.slick-next {
  z-index: 1;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid rgba(0, 52, 89, 1);
  right: 0;
  position: absolute;
  top: -80px;
  color:rgba(0,52,89,1);
  &:hover{
  color:rgba(0,52,89,1);
  }
}

.slick-next:before {
  position: absolute;
  font-size: 40px;
  border-right: 2px solid rgba(0, 52, 89, 1);
  border-bottom: 2px solid rgba(0, 52, 89, 1);
  color: transparent;
  width: 8px;
  height: 8px;
  top: 50%;
  left: 17px;
  transform: translate(-50%,-50%) rotate(-45deg);
}


.slick-next:after{
  width: 12px;
  height: 2px;
  background-color: rgba(0, 52, 89, 1);
  transform: translate(-50%,-50%);
  top: 50%;
  left: 15px;
} 

.slick-prev.slick-disabled:before, .slick-next.slick-disabled:before {
  opacity: 1;
}
 {/* .slick-prev:focus:before, .slick-next:focus:before {
  opacity: 0.3;
} */}
.slick-next.slick-disabled:before, .slick-prev.slick-disabled:before {
  opacity: 1;
}
{ /* .slick-next:focus:before, .slick-prev:focus:before {
  opacity: 0.3;
} */}


.slick-prev.slick-disabled:after, .slick-next.slick-disabled:after {
  opacity: 1;
}
 .slick-prev:focus:after, .slick-next:focus:after {
  opacity: 0.3;
}
.slick-next.slick-disabled:after, .slick-prev.slick-disabled:after {
  opacity: 1;
}
.slick-next:focus:after, .slick-prev:focus:after {
  opacity: 0.3;
}


.slick-prev.slick-disabled, .slick-next.slick-disabled {
  opacity: 1;
}
 .slick-prev:focus, .slick-next:focus {
  opacity: 0.3;
}
.slick-next.slick-disabled, .slick-prev.slick-disabled {
  opacity: 1;
}
.slick-next:focus, .slick-prev:focus {
  opacity: 0.3;
}
`;
const FacilitiesHeroHead = styled.div`
margin-bottom: 24px;
h2{

font-weight: ${({ theme }) => theme.Facility.FacilitiesHero.h2.FontWeight};
font-size: ${({ theme }) => theme.Facility.FacilitiesHero.h2.FontSize};
line-height: ${({ theme }) => theme.Facility.FacilitiesHero.h2.LineHeight};
font-style: ${({ theme }) => theme.Facility.FacilitiesHero.h2.FontStyle};
font-family: ${({ theme }) => theme.Facility.FacilitiesHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Facility.FacilitiesHero.h2.LetterSpacing};
text-align: ${({ theme }) => theme.Facility.FacilitiesHero.h2.Alignment};
color: ${({ theme }) => theme.Facility.FacilitiesHero.h2.Color};
}
`;
const FacilitiesHeroGrid = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
gap:20px;

@media (max-width: 768px) {
  grid-template-columns: 1fr;

}
`;
const FacilitiesItem = styled.figure`
position: relative;
${'' /* box-shadow: 0px 4px 12px 2px rgba(0, 0, 0, 0.1); */}
`;
const FacilitiesImage = styled.div`
width: 100%;
height: 202.35px;
img{
width: 100%;
height: 100%;
object-fit: cover;
border-radius: 16px;
}
`;
const FacilitiesDescription = styled.figcaption`
position: absolute;
width: 100%;
bottom: 0;
height: 40px;
border-bottom-left-radius: 16px;
border-bottom-right-radius: 16px;
${'' /* padding: ${({ theme }) => theme.Facility.FacilitiesHero.FacilitiesSliderDescription.Padding}; */}
background: ${({ theme }) => theme.Facility.FacilitiesHero.FacilitiesSliderDescription.Background};
${'' /* box-shadow: 0px 0px 19px -23px rgba(0, 0, 0, 0.69); */}
padding: 8px 14px;

h4{

font-weight: ${({ theme }) => theme.Facility.FacilitiesHero.h4.FontWeight};
font-size: ${({ theme }) => theme.Facility.FacilitiesHero.h4.FontSize};
line-height: ${({ theme }) => theme.Facility.FacilitiesHero.h4.LineHeight};
font-style: ${({ theme }) => theme.Facility.FacilitiesHero.h4.FontStyle};
font-family: ${({ theme }) => theme.Facility.FacilitiesHero.h4.FontFamily};
letter-spacing: ${({ theme }) => theme.Facility.FacilitiesHero.h4.LetterSpacing};
color: ${({ theme }) => theme.Facility.FacilitiesHero.h4.Color};
position: relative;
&::after{
width: 100%;
height: ${({ theme }) => theme.Facility.FacilitiesHero.FacilitiesSliderDescription.BorderBottom.Height};
background-color: ${({ theme }) => theme.Facility.FacilitiesHero.FacilitiesSliderDescription.BorderBottom.Background};
bottom: ${({ theme }) => theme.Facility.FacilitiesHero.FacilitiesSliderDescription.BorderBottom.BottomSpace};
}
}
p{

font-weight: ${({ theme }) => theme.Facility.FacilitiesHero.p.FontWeight};
font-size: ${({ theme }) => theme.Facility.FacilitiesHero.p.FontSize};
line-height: ${({ theme }) => theme.Facility.FacilitiesHero.p.LineHeight};
font-style: ${({ theme }) => theme.Facility.FacilitiesHero.p.FontStyle};
font-family: ${({ theme }) => theme.Facility.FacilitiesHero.p.FontFamily};
letter-spacing: ${({ theme }) => theme.Facility.FacilitiesHero.p.LetterSpacing};
color: ${({ theme }) => theme.Facility.FacilitiesHero.p.Color};
display: -webkit-box;
-webkit-line-clamp: 4;
-webkit-box-orient: vertical;
overflow: hidden;
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
background: transparent;
border: 1px solid ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.Background};
border-radius: ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.BorderRadius};
color: ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.Background};
padding: ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.PaddingY} ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.PaddingX};
cursor: pointer;
margin-top: ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.MarginTop};
&:hover{
background: ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.Hover.Background};
color: ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Facility.FacilitiesHero.ViewMoreFacilitiesButton.Hover.Background};
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


  const handleViewMoreButton = () => {
    if (preview) {
      dispatch(selectRouteForPreview("/services", true))
    }
    else {
      history("/services")
    }
  }


  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [

      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Container>
      <FacilitiesHeroSection>
        <FacilitiesHeroHead>
        <h2>{(subheadersData && subheadersData['servicehead']) || "SERVICES"}</h2>
        <h3>{(subheadersData && subheadersData['servicesubhead']) || ""}</h3>
        </FacilitiesHeroHead>
        {/* <FacilitiesHeroGrid> */}
        <Slider {...settings}>
          {facilitiesData.length ?
            facilitiesData.map((item, key) => {
              return (
                <FacilitiesItem key={key}>
                  <FacilitiesImage>
                  <ImageViewer object={item.thumbnail} defaultImage={defaultImage}/>

                    {/* <img src={item.thumbnail && item.thumbnail !== "" ? item.thumbnail : defaultImage} alt="" /> */}
                  </FacilitiesImage>
                  <FacilitiesDescription>
                    <h4> {item.title ? item.title : "Smart Class"} </h4>
                    {/* {item.details ?
                          <ul>
                            <li dangerouslySetInnerHTML={{
                              __html:
                                item.details,
                            }}></li>
                          </ul>
                          :
                          ""
                        } */}
                    {/* <p> {item.details ? item.details : " SmartClass is the education technology platform for K-12 and higher education, serving hundreds of thousands in many saa countries around the world , serving hundreds of thousands in many education technology platform for"}.</p> */}
                  </FacilitiesDescription>
                </FacilitiesItem>
              )
            }) :

            <FacilitiesItem>
              <FacilitiesImage>
                <img src={defaultImage2} alt="" />
              </FacilitiesImage>
              <FacilitiesDescription>
                <h4>Robotics Class </h4>
                <p>SmartClass is the education technology platform for K-12 and higher education, serving hundreds of thousands in many saa countries around the world , serving hundreds of thousands in many education technology platform for.</p>
              </FacilitiesDescription>
            </FacilitiesItem>
          }
        </Slider>
        {/* </FacilitiesHeroGrid> */}
        <ViewMoreButtonSection>
          <ViewMoreFacilitiesButton onClick={() => handleViewMoreButton()}>
            View All
          </ViewMoreFacilitiesButton>
        </ViewMoreButtonSection>
      </FacilitiesHeroSection>
    </Container>
  )
}

export default FacilitiesHero