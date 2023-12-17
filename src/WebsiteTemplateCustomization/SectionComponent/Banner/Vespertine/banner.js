/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerImage from "../../../assets/Vespertine/banner-hero.jpg";
import BannerImage1 from "../banner.png";
import { Container } from '../../../CommonComponent/Container.styled'
import { useSelector } from 'react-redux';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import ImageViewer from '../../../../Common/ImageViewer';

const Banner = styled.div`

position: relative;
width: 100%;
.slick-dots{
bottom: 8px;
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
  @media screen and (max-width: 992px) {
    margin-left: 2.5rem;
    }
    @media screen and (max-width: 468px) {
      width: 1rem;
      height: 1rem;
      }
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
  @media screen and (max-width: 992px) {
    margin-right: 2.5rem;
    }
  @media screen and (max-width: 468px) {
    width: 1rem;
    height: 1rem;
    }
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
width: 100%;
height: 100%;
position: relative;
img{
object-fit: cover;
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
width: ${({ theme }) => theme.Banner.BannerOverlay.width};
background: ${({ theme }) => theme.Banner.BannerOverlay.Background};
padding: ${({ theme }) => theme.Banner.BannerOverlay.Padding};
border-radius: ${({ theme }) => theme.Banner.BannerOverlay.BorderRadius};
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: space-between;
@media screen and (max-width: 1200px) {
width: 70%;
padding: 16px 24px;
}
@media screen and (max-width: 768px) {
width: 70%;
padding: 16px 24px;
bottom: 104px; 
}
@media screen and (max-width: 468px) {
width: 70%;
padding: 8px 16px;
bottom: 24%; 
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
margin-bottom: 4px;
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
overflow: hidden;
@media screen and (max-width: 992px) {
margin-bottom: 0;
  }
@media screen and (max-width: 768px) {
font-size: 24px;
line-height: 34px;
margin-bottom: 0;
  }
@media screen and (max-width: 468px) {
font-size: 16px;
line-height: 24px;
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
  -webkit-line-clamp: 1;
    }
@media screen and (max-width: 468px) {
  font-size: 10px;
  line-height: 14px;
    }
}`;



const BannerHero = () => {
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const settings = {
    dots: true,
    fade: true,
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
          instituteData.banners ? (
            instituteData.banners.length ?
              instituteData.banners.map((item, key) => {
                return (
                  <React.Fragment key={key}>
                    {
                      windowSize.width <= 768 ? (

                        <React.Fragment>
                          {item?.institute_featured_headline ?

                            <SliderImage>
                              {item.institute_featured_banner_Url && item.institute_featured_banner_Url !== "" ?
                                <a target="_blank" rel="noreferrer" href={item.institute_featured_banner_Url}  >
                                  <ImageViewer object={item.institute_featured_banner} defaultImage={BannerImage1}/>
                                  {/* <img src={item.institute_featured_banner && item.institute_featured_banner !== "" ? item.institute_featured_banner : BannerImage1} alt="" /> */}
                                </a>
                                :
                                <ImageViewer object={item.institute_featured_banner} defaultImage={BannerImage1}/>
                                // <img src={item.institute_featured_banner && item.institute_featured_banner !== "" ? item.institute_featured_banner : BannerImage1} alt="" />
                              }
                              <Container>
                                <BannerOverlay>
                                  <BannerOverlayCaption>
                                    <h1>{item.institute_featured_headline ? item.institute_featured_headline : ""}</h1>
                                    <h3 dangerouslySetInnerHTML={{
                                      __html:
                                        item.institute_short_description ? item.institute_short_description : ""
                                    }}
                                    ></h3>
                                    {/* <h3>{item.institute_short_description ? item.institute_short_description : ""}</h3> */}
                                  </BannerOverlayCaption>
                                </BannerOverlay>
                              </Container>
                            </SliderImage>
                            :
                            <SliderImage>
                              {item.institute_featured_banner_Url && item.institute_featured_banner_Url !== "" ?
                                <a target="_blank" rel="noreferrer" href={item.institute_featured_banner_Url}  >
                                  <ImageViewer object={item.institute_featured_banner} defaultImage={BannerImage1}/>
                                  {/* <img src={item.institute_featured_banner && item.institute_featured_banner !== "" ? item.institute_featured_banner : BannerImage1} alt="" /> */}
                                </a>
                                :
                                <ImageViewer object={item.institute_featured_banner} defaultImage={BannerImage1}/>
                                // <img src={item.institute_featured_banner && item.institute_featured_banner !== "" ? item.institute_featured_banner : BannerImage1} alt="" />
                              }
                              <Container>
                                {/* <BannerOverlay>
                                <BannerOverlayCaption>
                                  <h1>{item.institute_featured_headline ? item.institute_featured_headline : ""}</h1>
                                  <h3>{item.institute_short_description ? item.institute_short_description : ""}</h3>
                                </BannerOverlayCaption>
                              </BannerOverlay> */}
                              </Container>
                            </SliderImage>
                          }
                        </React.Fragment>
                      ) :
                        (
                          <React.Fragment>
                            {item?.institute_featured_headline ?

                              <SliderImage>
                                {item.institute_featured_banner_Url && item.institute_featured_banner_Url !== "" ?
                                  <a target="_blank" rel="noreferrer" href={item.institute_featured_banner_Url}  >
                                    <ImageViewer object={item.institute_featured_banner} defaultImage={BannerImage1}/>
                                    {/* <img src={item.institute_featured_banner && item.institute_featured_banner !== "" ? item.institute_featured_banner : BannerImage1} alt="" /> */}
                                  </a>
                                  :
                                  <ImageViewer object={item.institute_featured_banner} defaultImage={BannerImage1}/>
                                  // <img src={item.institute_featured_banner && item.institute_featured_banner !== "" ? item.institute_featured_banner : BannerImage1} alt="" />
                                }

                                <Container>
                                  <BannerOverlay>
                                    <BannerOverlayCaption>
                                      <h1>{item.institute_featured_headline ? item.institute_featured_headline : ""}</h1>
                                      <h3 dangerouslySetInnerHTML={{
                                        __html:
                                          item.institute_short_description ? item.institute_short_description : ""
                                      }}
                                      ></h3>
                                    </BannerOverlayCaption>
                                  </BannerOverlay>
                                </Container>
                              </SliderImage>
                              :
                              <SliderImage>
                                {item.institute_featured_banner_Url && item.institute_featured_banner_Url !== "" ?
                                  <a target="_blank" rel="noreferrer" href={item.institute_featured_banner_Url}>
                                    <ImageViewer object={item.institute_featured_banner} defaultImage={BannerImage1}/>
                                    {/* <img src={item.institute_featured_banner && item.institute_featured_banner !== "" ? item.institute_featured_banner : BannerImage1} alt="" /> */}
                                  </a>
                                  :

                                  <ImageViewer object={item.institute_featured_banner} defaultImage={BannerImage1}/>
                                  // <img src={item.institute_featured_banner && item.institute_featured_banner !== "" ? item.institute_featured_banner : BannerImage1} alt="" />
                                }
                                <Container>
                                  {/* <BannerOverlay>
                                    <BannerOverlayCaption>
                                      <h1>{item.institute_featured_headline ? item.institute_featured_headline : ""}</h1>
                                      <h3>{item.institute_short_description ? item.institute_short_description : ""}</h3>
                                    </BannerOverlayCaption>
                                  </BannerOverlay> */}
                                </Container>
                              </SliderImage>
                            }
                          </React.Fragment>
                        )
                    }
                  </React.Fragment>

                )
              }) : <React.Fragment>
                <SliderImage>
                  <img src={BannerImage} alt="" />
                  <Container>
                    <BannerOverlay>
                      <BannerOverlayCaption>
                        <h1>Back to School</h1>
                        <h3>Welcome to all of our students</h3>
                      </BannerOverlayCaption>
                    </BannerOverlay>
                  </Container>
                </SliderImage>
              </React.Fragment>) :
            <React.Fragment>
              <SliderImage>
                <img src={BannerImage} alt="" />
                <Container>
                  <BannerOverlay>
                    <BannerOverlayCaption>
                      <h1>Back to School</h1>
                      <h3>Welcome to all of our students</h3>
                    </BannerOverlayCaption>
                  </BannerOverlay>
                </Container>
              </SliderImage>
            </React.Fragment>
        }
      </Slider>

    </Banner>
  )
}

export default BannerHero