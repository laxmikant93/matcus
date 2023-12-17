/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerImage from "./banner-hero.jpg";
import BannerImage1 from "../banner.png";
import { Container } from '../../../CommonComponent/Container.styled'
import { useSelector } from 'react-redux';
import React from 'react';
import ImageViewer from '../../../../Common/ImageViewer';

const Banner = styled.div`
.slick-slider{
  height: 100%;
  @media screen and (max-width: 992px) {
    height: auto;
  }
}
background:  ${({ theme }) => theme.Banner.Background};
position: relative;
width: 100%;
.slick-dots{
bottom: -30px;
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
width: 100%;
height: 100%;
position: relative;
img{
width: 100%;
height: inherit;
display: block;
object-fit: cover;
}
@media screen and (max-width: 992px) {
  height: 200px;
  display: block;
}
`;
const BannerOverlay = styled.div`
position: absolute;
top: 0;
bottom: 0;
Right: 0;
Left: auto;
width: 100%;
height: 100%;
background:  linear-gradient(
  rgba(0, 0, 0, 0.5),
  rgba(0, 0, 0, 0.5)
);
padding: ${({ theme }) => theme.Banner.BannerOverlay.Padding};
border-radius: ${({ theme }) => theme.Banner.BannerOverlay.BorderRadius};
display: flex;
align-items: center;
justify-content: center;
@media screen and (max-width: 992px) {
  padding: 24px 32px;
  }
  @media screen and (max-width: 468px) {
  padding: 8px 16px;
  }
`;

const BannerOverlayCaption = styled.div`
text-align:center;
h1{
font-weight: ${({ theme }) => theme.Banner.h1.FontWeight};
font-size: ${({ theme }) => theme.Banner.h1.FontSize};
line-height: ${({ theme }) => theme.Banner.h1.LineHeight};
color: #FFF;
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
color: #FFF;
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
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };
  return (
    <Banner>
      <Slider {...settings}>
        {
          instituteData.banners ? (
            instituteData.banners.length ?
              instituteData.banners.map((item, key) => {
                return (
                  <React.Fragment key={key}>
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
                        {
                          item.institute_featured_banner_Url && item.institute_featured_banner_Url !== "" ?
                            <a target="_blank" rel="noreferrer" href={item.institute_featured_banner_Url}>
                              <BannerOverlay>
                                <BannerOverlayCaption>
                                  <h1>{item.institute_featured_headline ? item.institute_featured_headline : ""}</h1>
                                  <h3 dangerouslySetInnerHTML={{
                                    __html:
                                      item.institute_short_description ? item.institute_short_description : ""
                                  }}
                                  ></h3>
                                  {/* <h3>{item.institute_short_description ? item.institute_short_description : "Welcome to all of our students"}</h3> */}
                                </BannerOverlayCaption>
                              </BannerOverlay>
                            </a> :
                            <BannerOverlay>
                              <BannerOverlayCaption>
                                <h1>{item.institute_featured_headline ? item.institute_featured_headline : ""}</h1>
                                <h3 dangerouslySetInnerHTML={{
                                  __html:
                                    item.institute_short_description ? item.institute_short_description : ""
                                }}
                                ></h3>
                                {/* <h3>{item.institute_short_description ? item.institute_short_description : "Welcome to all of our students"}</h3> */}
                              </BannerOverlayCaption>
                            </BannerOverlay>
                        }
                      </Container>
                    </SliderImage>
                  </React.Fragment>

                )
              }) :
              <SliderImage>
                <img src={BannerImage} alt="" />
                <BannerOverlay>
                  <BannerOverlayCaption>
                    <h1>OUR GOALS</h1>
                    <h3>We strive to communicate effectively build strong character
                      and social responsibilty and use high levels of thinking skills.</h3>
                  </BannerOverlayCaption>
                </BannerOverlay>
              </SliderImage>
          )
            :
            <SliderImage>
              <img src={BannerImage} alt="" />
              <BannerOverlay>
                <BannerOverlayCaption>
                  <h1>OUR GOALS</h1>
                  <h3>We strive to communicate effectively build strong character
                    and social responsibilty and use high levels of thinking skills.</h3>
                </BannerOverlayCaption>
              </BannerOverlay>
            </SliderImage>
        }
        {/* <SliderImage>
            <img src={BannerImage} alt="" />
            <BannerOverlay>
              <BannerOverlayCaption>
                <h1>OUR GOALS</h1>
                <h3>We strive to communicate effectively build strong character
                  and social responsibilty and use high levels of thinking skills.</h3>
              </BannerOverlayCaption>
            </BannerOverlay>
          </SliderImage>
          <SliderImage>
            <img src={BannerImage} alt="" />
            <BannerOverlay>
              <BannerOverlayCaption>
                <h1>OUR GOALS</h1>
                <h3>We strive to communicate effectively build strong character
                  and social responsibilty and use high levels of thinking skills.</h3>
              </BannerOverlayCaption>
            </BannerOverlay>
          </SliderImage>
          <SliderImage>
            <img src={BannerImage} alt="" />
            <BannerOverlay>
              <BannerOverlayCaption>
                <h1>OUR GOALS</h1>
                <h3>We strive to communicate effectively build strong character
                  and social responsibilty and use high levels of thinking skills.</h3>
              </BannerOverlayCaption>
            </BannerOverlay>
          </SliderImage> */}
      </Slider>
    </Banner>
  )
}

export default BannerHero