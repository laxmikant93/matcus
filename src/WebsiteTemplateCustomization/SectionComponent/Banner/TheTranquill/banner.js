/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerImage from "../../../assets/TheTranquill/banner-hero.jpg";
import BannerImage1 from "../banner.png";
import { Container } from '../../../CommonComponent/Container.styled'
import { useSelector } from 'react-redux';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const Banner = styled.div`
.slick-slider{
  // height: ${({ theme }) => theme.Banner.SliderImage.Height};
  @media screen and (max-width: 992px) {
    height: auto;
  }
}
background:  ${({ theme }) => theme.Banner.Background};
position: relative;
width: 100%;
.slick-dots{
bottom: 25px;
.slick-active{
margin: 0;
button{
&::before{
font-size: 12px;
color: ${({ theme }) => theme.Banner.Dots.Active.Color};
}
}
}
button{
&::before{
font-size: 12px;
color: ${({ theme }) => theme.Banner.Dots.Color};
}
}
}
.slick-slide {
  visibility: hidden;
}
.slick-slide{
  &.slick-active {
  visibility: visible;
  }
}
.slick-prev{
  content: '';
  width: 1.3rem;
  height: 1.3rem;
  border-right: 2px solid ${({ theme }) => theme.Banner.SlickArrowColor.Color};
  border-bottom: 2px solid ${({ theme }) => theme.Banner.SlickArrowColor.Color};
  z-index: 1;
  margin-left: 3.5rem;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  &::before{
  color: transparent;
  }
  &:hover{
    border-right: 2px solid ${({ theme }) => theme.Banner.SlickArrowColor.Hover.Color};
    border-bottom: 2px solid ${({ theme }) => theme.Banner.SlickArrowColor.Hover.Color};    
  }
  }
  .slick-next{
  content: '';
  width: 1.3rem;
  height: 1.3rem;
  border-left: 2px solid ${({ theme }) => theme.Banner.SlickArrowColor.Color};
  border-bottom: 2px solid ${({ theme }) => theme.Banner.SlickArrowColor.Color};
  z-index: 1;
  margin-right: 3.5rem;
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  &::before{
  color: transparent;
  }
  &:hover{
    border-left: 2px solid ${({ theme }) => theme.Banner.SlickArrowColor.Hover.Color};
    border-bottom: 2px solid ${({ theme }) => theme.Banner.SlickArrowColor.Hover.Color};    
  }
  }
`;

const SliderImage = styled.div`
// width: 100%;
// height: ${({ theme }) => theme.Banner.SliderImage.Height};
position: relative;
img{
  // object-fit: cover;
width: 100%;
height: inherit;
display: block;
}
@media screen and (max-width: 992px) {
  height: auto;
}
`;
const BannerOverlay = styled.div`
position: absolute;
top: ${({ theme }) => theme.Banner.BannerOverlay.Top};
min-width: ${({ theme }) => theme.Banner.BannerOverlay.MinWidth};
max-width: ${({ theme }) => theme.Banner.BannerOverlay.MaxWidth};
// background: ${({ theme }) => theme.Banner.BannerOverlay.Background};
padding: ${({ theme }) => theme.Banner.BannerOverlay.Padding};
border-radius: ${({ theme }) => theme.Banner.BannerOverlay.BorderRadius};
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: space-between;
@media screen and (max-width: 992px) {
width: 70%;
padding: 24px 32px;
bottom: 24px; 
}
@media screen and (max-width: 468px) {
width: 70%;
padding: 8px 16px;
bottom: 24px; 
}
`;

const BannerOverlayCaption = styled.div`
h1{
font-weight: ${({ theme }) => theme.Banner.h1.FontWeight};
font-size: ${({ theme }) => theme.Banner.h1.FontSize};
line-height: ${({ theme }) => theme.Banner.h1.LineHeight};
font-family: ${({ theme }) => theme.Banner.h1.FontFamily};
font-style: ${({ theme }) => theme.Banner.h1.FontStyle};
letter-spacing: ${({ theme }) => theme.Banner.h1.LetterSpacing};
color: ${({ theme }) => theme.Banner.h1.Color};
word-break: break-all;
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
@media screen and (max-width: 768px) {
font-size: 32px;
line-height: 42px;
margin-bottom: 0;
  }
@media screen and (max-width: 468px) {
font-size: 16px;
line-height: 24px;
margin-bottom: 0;
  }
}
h3{
font-weight: ${({ theme }) => theme.Banner.h3.FontWeight};
font-size: ${({ theme }) => theme.Banner.h3.FontSize};
line-height: ${({ theme }) => theme.Banner.h3.LineHeight};
font-style: ${({ theme }) => theme.Banner.h3.FontStyle};
font-family: ${({ theme }) => theme.Banner.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.Banner.h3.LetterSpacing};
color: ${({ theme }) => theme.Banner.h3.Color};
word-break: break-all;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
@media screen and (max-width: 768px) {
  font-size: 16px;
  line-height: 26px;
    }
@media screen and (max-width: 468px) {
  font-size: 8px;
  line-height: 14px;
    }
}`;

const BannerHero = () => {

  const { instituteData } = useSelector((state) => state.serviceTemplate.getTemplate.data)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Banner>
      <Slider {...settings}>
        {
          instituteData?.banners ? (
            instituteData?.banners.length ?
              instituteData.banners.map((item, key) => {
                return (
                  <React.Fragment key={key}>
                    {
                      windowSize.width <= 768 ? (

                        < SliderImage >
                          <a href={item.business_featured_banner_Url ? item.business_featured_banner_Url : '#'}>
                            <img src={item.business_featured_mobile_banner && item.business_featured_mobile_banner !== "" ? item.business_featured_mobile_banner : BannerImage1} alt="" />
                          </a>
                          {/* {item.business_featured_headline || item.business_short_description ?
                          <Container>
                            <BannerOverlay>
                              <BannerOverlayCaption>
                                <h1>{item.business_featured_headline ? item.business_featured_headline : ""}</h1>
                                <h3>{item.business_short_description ? item.business_short_description : ""}</h3>
                              </BannerOverlayCaption>
                            </BannerOverlay>
                          </Container> : ""} */}
                        </SliderImage>
                      ) : (
                        <SliderImage>
                          <a href={item.business_featured_banner_Url ? item.business_featured_banner_Url : '#'}>
                            <img src={item.business_featured_banner && item.business_featured_banner !== "" ? item.business_featured_banner : BannerImage1} alt="" />
                          </a>
                          {/* {item.business_featured_headline || item.business_short_description ?
                          <Container>
                            <BannerOverlay>
                              <BannerOverlayCaption>
                                <h1>{item.business_featured_headline ? item.business_featured_headline : ""}</h1>
                                <h3>{item.business_short_description ? item.business_short_description : ""}</h3>
                              </BannerOverlayCaption>
                            </BannerOverlay>
                          </Container> : ""} */}
                        </SliderImage>
                      )
                    }
                    {/* <SliderImage>
                      <a href='https://google.com'>
                        <img src={item.business_featured_banner && item.business_featured_banner !== "" ? item.business_featured_banner : BannerImage1} alt="" />
                      </a> */}
                    {/* {item.business_featured_headline || item.business_short_description ?
                        <Container>
                          <BannerOverlay>
                            <BannerOverlayCaption>
                              <h1>{item.business_featured_headline ? item.business_featured_headline : ""}</h1>
                              <h3>{item.business_short_description ? item.business_short_description : ""}</h3>
                            </BannerOverlayCaption>
                          </BannerOverlay>
                        </Container> : ""} */}
                    {/* </SliderImage> */}
                  </React.Fragment>
                )
              }) : <React.Fragment>
                <SliderImage>
                  <img src={BannerImage} alt="" />
                  {/* <Container>
                    <BannerOverlay>
                      <BannerOverlayCaption>
                        <h1>We take careeee!</h1>
                        <h3>We are available for you 24x7</h3>
                      </BannerOverlayCaption>
                    </BannerOverlay>
                  </Container> */}
                </SliderImage>
              </React.Fragment>) :
            <React.Fragment>
              <SliderImage>
                <img src={BannerImage} alt="" />
                {/* <Container>
                  <BannerOverlay>
                    <BannerOverlayCaption>
                      <h1>We take care!</h1>
                      <h3>We are available for you 24x7</h3>
                    </BannerOverlayCaption>
                  </BannerOverlay>
                </Container> */}
              </SliderImage>
            </React.Fragment>
        }
      </Slider>

    </Banner >
  )
}

export default BannerHero