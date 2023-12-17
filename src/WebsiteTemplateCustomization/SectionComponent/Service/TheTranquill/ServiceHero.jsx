/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Default1 from "./default1.svg";
import Default2 from "./default2.svg";
import Default3 from "./default3.svg";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import React, { useState } from 'react';
import { setParamId } from '../../../../store/actions/serviceWebsiteTemplate';
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";
import { Container } from '../../../CommonComponent/Container.styled';



const ServiceHomeHeroSection = styled.div`
margin-top: 48px;
`;
const ServiceHomeHero = styled.div`
`;
const ServiceHomeHeroHead = styled.div`
h2{

  font-weight: ${({ theme }) => theme.ServiceHero.h2.FontWeight};
  font-size: ${({ theme }) => theme.ServiceHero.h2.FontSize};
  line-height: ${({ theme }) => theme.ServiceHero.h2.LineHeight};
  font-style: ${({ theme }) => theme.ServiceHero.h2.FontStyle};
  font-family: ${({ theme }) => theme.ServiceHero.h2.FontFamily};
  letter-spacing: ${({ theme }) => theme.ServiceHero.h2.LetterSpacing};
  text-align: ${({ theme }) => theme.ServiceHero.h2.Alignment};
  color: ${({ theme }) => theme.ServiceHero.h2.Color};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  }
  h3{
    font-weight: ${({ theme }) => theme.ServiceHero.h3.FontWeight};
    font-size: ${({ theme }) => theme.ServiceHero.h3.FontSize};
    line-height: ${({ theme }) => theme.ServiceHero.h3.LineHeight};
    font-style: ${({ theme }) => theme.ServiceHero.h3.FontStyle};
    font-family: ${({ theme }) => theme.ServiceHero.h3.FontFamily};
    letter-spacing: ${({ theme }) => theme.ServiceHero.h3.LetterSpacing};
    color: ${({ theme }) => theme.ServiceHero.h3.Color};
    text-align: ${({ theme }) => theme.ServiceHero.h3.Alignment};
    position: relative;
    display: inline-block;
    text-transform: uppercase;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    }
`;
const ServiceHeroItem = styled.figure`
position: relative;
cursor: pointer;
`;
const ServiceHeroImage = styled.div`
width: 100%;
height: 100%;
min-height: 166px;
max-height: 332px;
img{
  border-radius: 5px;
  width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  display: block;
}
`;
const ServiceHeroCaption = styled.figcaption`
position: absolute;
width: 100%;
bottom: 0;
height: 100%;
min-height: 100%;
max-height: 100%;
display: flex;
align-items: flex-end;
justify-content: flex-start;
border-radius: 5px;
background: ${({ theme }) => theme.ServiceHero.ServiceHeroCaption.Background};
padding: 32px;
h6{
  font-weight: ${({ theme }) => theme.ServiceHero.h6.FontWeight};
  font-size: ${({ theme }) => theme.ServiceHero.h6.FontSize};
  line-height: ${({ theme }) => theme.ServiceHero.h6.LineHeight};
  font-style: ${({ theme }) => theme.ServiceHero.h6.FontStyle};
  font-family: ${({ theme }) => theme.ServiceHero.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.ServiceHero.h6.LetterSpacing};
  color: #FFFFFF;
  text-align: ${({ theme }) => theme.ServiceHero.h6.Alignment};
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
}
`;
const ServiceHeroGrid = styled.div`
  margin-top: 48px;
  .slick-slide > div {
    margin: 0 10px;
  }
  .slick-list {
    margin: 0 -10px;
  }
  .slick-dots{
    bottom: -30px;
    .slick-active{
    margin: 0;
    button{
    &::before{
    font-size: 12px;
    color: ${({ theme }) => theme.ServiceHero.Dots.Active.Color};
    }
    }
    }
    button{
    &::before{
    font-size: 12px;
    color: ${({ theme }) => theme.ServiceHero.Dots.Color};
    }
    }
    }
    .slick-prev{
      content: '';
      width: 1.3rem;
      height: 1.3rem;
      border-right: 2px solid ${({ theme }) => theme.ServiceHero.SlickArrowColor.Color};
      border-bottom: 2px solid ${({ theme }) => theme.ServiceHero.SlickArrowColor.Color};
      z-index: 1;
      margin-left: -0.5rem;
      transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
      &::before{
      color: transparent;
      }
      &:hover{
        border-right: 2px solid ${({ theme }) => theme.ServiceHero.SlickArrowColor.Hover.Color};
        border-bottom: 2px solid ${({ theme }) => theme.ServiceHero.SlickArrowColor.Hover.Color};    
      }
      @media screen and (max-width: 768px) {
        width: 1rem;
        height: 1rem;
        margin-left: 0;
        left: 15px;
        }
      }
      .slick-next{
      content: '';
      width: 1.3rem;
      height: 1.3rem;
      border-left: 2px solid ${({ theme }) => theme.ServiceHero.SlickArrowColor.Color};
      border-bottom: 2px solid ${({ theme }) => theme.ServiceHero.SlickArrowColor.Color};
      z-index: 1;
      margin-right: -0.5rem;
      transform: rotate(-135deg);
      -webkit-transform: rotate(-135deg);
      &::before{
      color: transparent;
      }
      &:hover{
        border-left: 2px solid ${({ theme }) => theme.ServiceHero.SlickArrowColor.Hover.Color};
        border-bottom: 2px solid ${({ theme }) => theme.ServiceHero.SlickArrowColor.Hover.Color};    
      }
      @media screen and (max-width: 768px) {
        width: 1rem;
        height: 1rem;
        margin-right: 0;
        right: 15px;
        }
      }

`;
const ViewMoreSection = styled.div`
margin-top: ${({ theme }) => theme.ServiceHero.ViewMoreSection.MarginTop};
display: grid;
align-items: center;
grid-template-columns: 1fr auto;
`;

const ViewMoreSectionDivider = styled.div`
    width: 100%;
    height: 2px;
    background:  ${({ theme }) => theme.ServiceHero.ViewMoreSectionDivider.Background};
`;

const ViewMoreButton = styled.a`
font-weight: ${({ theme }) => theme.ServiceHero.ViewMoreButton.FontWeight};
font-size: ${({ theme }) => theme.ServiceHero.ViewMoreButton.FontSize};
line-height: ${({ theme }) => theme.ServiceHero.ViewMoreButton.LineHeight};
border-radius: ${({ theme }) => theme.ServiceHero.ViewMoreButton.BorderRadius};
color: ${({ theme }) => theme.ServiceHero.ViewMoreButton.Color};
padding: 8px 24px 8px 8px;
cursor: pointer;
position: relative;
text-decoration: none;
&::after{
  content: '';
  width: 6px;
  height: 6px;
  border-right: 2px solid  ${({ theme }) => theme.ServiceHero.ViewMoreButton.Hover.Color};
  border-bottom: 2px solid ${({ theme }) => theme.ServiceHero.ViewMoreButton.Hover.Color};
  position: absolute;
  right: 2px;
  left: auto;
  transform: rotate(-45deg);
  top: 16px;
}
&::before{  
  content: '';
  width: 16px;
  height: 2px;
 background:   ${({ theme }) => theme.ServiceHero.ViewMoreButton.Hover.Color};
 position: absolute;
 right: 2px;
 left: auto;
 top: 19px;
}
&:hover{
color: ${({ theme }) => theme.ServiceHero.ViewMoreButton.Hover.Color};
text-decoration: underline;
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
&::after{
  border-color: ${({ theme }) => theme.ServiceHero.ViewMoreButton.Hover.Color};
}
&::before{  
 background: ${({ theme }) => theme.ServiceHero.ViewMoreButton.Hover.Color};
}
}
`;


const ServiceHero = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  // const { data, success } = useSelector((state) => state.websiteTemplate.gallery)
  const  data  = useSelector((state) => state.serviceTemplate.getTemplate.data.bookAppointService)
  const categoryData = useSelector((state) => state.serviceTemplate.getTemplate.data.bookAppointCategory)
  const { subheadersData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { preview } = useSelector((state) => {
    return {
      route: state.serviceTemplate.route,
      preview: state.serviceTemplate.preview
    }
  })

  const handleViewMoreButton = () => {
    if (preview) {
      dispatch(selectRouteForPreview("/service", true))
    }
    else {
      history("/service")
    }
  }

  const settingsServiceHero = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6 > 4 ? 4 : 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  };

  const handleService = (item) => {
    if (preview) {
      dispatch(selectRouteForPreview(`/service-detail/${item._id}`, true))
      dispatch(setParamId(item._id))
    } else {
      history(`/service-detail/${item._id}`)
    }
  }

  return (
    <React.Fragment>
      <Container>
        {
          categoryData.length > 0 && data.length === 0 ? (
            ""
          ) : (
            <ServiceHomeHeroSection>
              <ServiceHomeHero>
                <ServiceHomeHeroHead>
                  <h2>{(subheadersData && subheadersData['bookservicehead']) || "Our Services"}</h2>
                  <h3>{(subheadersData && subheadersData['bookservicesubhead']) || ""}</h3>
                </ServiceHomeHeroHead>

                <ServiceHeroGrid>
                  {data.length > 0 && data.filter((item) => item.markAsFeatured === true).length ?
                    <Slider {...settingsServiceHero}>
                      {data.filter((item) => item.markAsFeatured === true).map((item, key) => {

                        return (
                          <ServiceHeroItem key={key} onClick={() => handleService(item)}>
                            <ServiceHeroImage>
                              <img src={item.image ? item.image : DefaultImage} alt="Album" />
                            </ServiceHeroImage>
                            <ServiceHeroCaption>
                              <h6>{item.title}</h6>
                            </ServiceHeroCaption>
                          </ServiceHeroItem>
                        )
                      })}
                    </Slider>
                    :

                    <>
                      <Slider {...settingsServiceHero}>
                        <ServiceHeroItem>
                          <ServiceHeroImage>
                            <img src={Default1} alt="Album" />
                          </ServiceHeroImage>
                          <ServiceHeroCaption>
                            <h6>Neuro Surgery</h6>
                          </ServiceHeroCaption>
                        </ServiceHeroItem>
                        <ServiceHeroItem>
                          <ServiceHeroImage>
                            <img src={Default2} alt="Album" />
                          </ServiceHeroImage>
                          <ServiceHeroCaption>
                            <h6>X-ray</h6>
                          </ServiceHeroCaption>
                        </ServiceHeroItem>
                        <ServiceHeroItem>
                          <ServiceHeroImage>
                            <img src={Default3} alt="Album" />
                          </ServiceHeroImage>
                          <ServiceHeroCaption>
                            <h6>Dialysis</h6>
                          </ServiceHeroCaption>
                        </ServiceHeroItem>
                        <ServiceHeroItem>
                          <ServiceHeroImage>
                            <img src={Default3} alt="Album" />
                          </ServiceHeroImage>
                          <ServiceHeroCaption>
                            <h6>Laparoscopic surgery</h6>
                          </ServiceHeroCaption>
                        </ServiceHeroItem>
                        <ServiceHeroItem>
                          <ServiceHeroImage>
                            <img src={Default3} alt="Album" />
                          </ServiceHeroImage>
                          <ServiceHeroCaption>
                            <h6>Laparoscopic surgery</h6>
                          </ServiceHeroCaption>
                        </ServiceHeroItem>
                      </Slider>
                    </>
                  }
                </ServiceHeroGrid>

                <ViewMoreSection>
                  <ViewMoreSectionDivider></ViewMoreSectionDivider>
                  <ViewMoreButton onClick={() => handleViewMoreButton()}>
                    View All
                  </ViewMoreButton>
                </ViewMoreSection>
              </ServiceHomeHero>
            </ServiceHomeHeroSection>
          )
        }
      </Container>

    </React.Fragment>
  )
}

export default ServiceHero